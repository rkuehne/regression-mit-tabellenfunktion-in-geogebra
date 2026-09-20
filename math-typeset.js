const vendorBase = new URL("./assets/vendor/", import.meta.url).href;
const scriptUrl = new URL("./assets/vendor/mathjax/tex-chtml.js", import.meta.url).href;

function normaliseElements(elements) {
  const candidates = elements == null
    ? [document.body]
    : Array.isArray(elements)
      ? elements
      : [elements];
  return candidates.filter((element) => element instanceof Element);
}

function compactTargets(elements) {
  const unique = [...new Set(elements)].filter((element) => element?.isConnected !== false);
  return unique.filter((element) => !unique.some(
    (other) => other !== element && typeof other.contains === "function" && other.contains(element)
  ));
}

function loadMathJax() {
  if (window.MathJax?.startup?.promise) {
    return window.MathJax.startup.promise.then(() => true);
  }

  window.MathJax = {
    loader: {
      paths: { mathjax: new URL("./assets/vendor/mathjax", import.meta.url).href }
    },
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"]],
      processEscapes: true
    },
    output: {
      displayOverflow: "linebreak",
      fontPath: `${vendorBase}%%FONT%%-font`,
      linebreaks: { inline: true, width: "100%", lineleading: 0.2 }
    },
    options: {
      skipHtmlTags: { "[+]": ["code", "pre", "select", "option", "textarea"] },
      enableMenu: false,
      enableEnrichment: false,
      enableComplexity: false,
      enableSpeech: false,
      enableBraille: false,
      enableExplorer: false,
      enableExplorerHelp: false,
      menuOptions: {
        settings: {
          enrich: false,
          speech: false,
          braille: false,
          collapsible: false
        }
      },
      a11y: { speech: false, braille: false }
    },
    startup: { typeset: false }
  };

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.defer = true;
    script.dataset.localMathjax = "4.1.3";

    script.addEventListener("load", async () => {
      try {
        await window.MathJax.startup.promise;
        resolve(true);
      } catch (error) {
        console.warn("MathJax konnte nicht initialisiert werden.", error);
        resolve(false);
      }
    }, { once: true });

    script.addEventListener("error", () => {
      console.warn("Die lokale MathJax-Datei konnte nicht geladen werden.");
      resolve(false);
    }, { once: true });

    document.head.append(script);
  });
}

export const mathReady = loadMathJax();

/*
 * MathJax 4 serialisiert typesetPromise() bereits intern.
 *
 * Wir sammeln zusätzliche Typeset-Anfragen nur noch, damit schnelle
 * Kapitelwechsel zusammengefasst werden. Die DOM-Aktualisierung selbst
 * darf niemals hinter MathJax warten.
 */
const pendingTargets = new Set();
let flushPromise = null;

async function flushPendingTypeset() {
  const available = await mathReady;

  if (!available) {
    pendingTargets.clear();
    return false;
  }

  let typesetOccurred = false;

  /*
   * Während eines laufenden typesetPromise() können neue Kapitelwechsel
   * stattfinden. Diese fügen ihre Container erneut zu pendingTargets hinzu.
   * Nach Abschluss des aktuellen Durchlaufs wird deshalb der aktuelle DOM
   * noch einmal gesetzt. So gewinnt bei schnellen Klicks immer der letzte
   * sichtbare Zustand.
   */
  while (pendingTargets.size > 0) {
    const targets = compactTargets([...pendingTargets]);
    pendingTargets.clear();

    if (!targets.length) continue;

    try {
      await window.MathJax.typesetPromise(targets);
      typesetOccurred = true;
    } catch (error) {
      console.warn("Eine Formel konnte nicht gesetzt werden.", error);
    }
  }

  return typesetOccurred;
}

function requestTypeset(elements) {
  compactTargets(elements).forEach((element) => pendingTargets.add(element));

  if (!pendingTargets.size) {
    return flushPromise || Promise.resolve(false);
  }

  if (!flushPromise) {
    flushPromise = flushPendingTypeset().finally(() => {
      flushPromise = null;

      /*
       * Normalerweise leert flushPendingTypeset() die Menge vollständig.
       * Falls unmittelbar am Ende doch noch ein Ziel hinzugekommen ist,
       * starten wir sicherheitshalber einen weiteren Durchlauf.
       */
      if (pendingTargets.size > 0) {
        requestTypeset([]);
      }
    });
  }

  return flushPromise;
}

function clearMathBeforeDomChange(targets) {
  if (flushPromise || typeof window.MathJax?.typesetClear !== "function") return;

  try {
    window.MathJax.typesetClear(compactTargets(targets));
  } catch (error) {
    console.warn("Alte Formeln konnten nicht aus MathJax entfernt werden.", error);
  }
}

export function typesetMath(elements) {
  const targets = normaliseElements(elements);
  if (!targets.length) return Promise.resolve(false);

  return requestTypeset(targets);
}

export function replaceMath(elements, updateContent) {
  const targets = normaliseElements(elements);

  if (typeof updateContent !== "function") {
    return typesetMath(targets);
  }

  /*
   * Wichtig:
   * 1. Falls MathJax bereits aktiv ist, alte MathItems vor der DOM-Änderung
   *    abmelden.
   * 2. Den DOM SOFORT aktualisieren. Navigation und Lernwegwechsel dürfen
   *    niemals auf mathReady oder typesetPromise() warten.
   * 3. Das neue Math-Rendering asynchron nachziehen.
   *
   * Ist MathJax beim ersten Seitenaufruf noch nicht geladen, gibt es auch
   * noch keine alten MathItems, die vor der DOM-Änderung entfernt werden
   * müssten.
   */
  if (targets.length) clearMathBeforeDomChange(targets);

  updateContent();

  if (!targets.length) return Promise.resolve(false);

  return requestTypeset(targets).catch((error) => {
    console.warn("Der aktualisierte Inhalt konnte nicht als Formel gesetzt werden.", error);
    return false;
  });
}

export function typesetDocument() {
  return typesetMath(document.body);
}
