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

function loadMathJax() {
  if (window.MathJax?.startup?.promise) return window.MathJax.startup.promise.then(() => true);

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
      skipHtmlTags: { "[+]": ["code", "pre", "select", "option", "textarea"] }
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

let typesetQueue = Promise.resolve();

export function clearMath(elements) {
  const targets = normaliseElements(elements);
  if (targets.length && typeof window.MathJax?.typesetClear === "function") {
    window.MathJax.typesetClear(targets);
  }
}

export function typesetMath(elements) {
  const targets = normaliseElements(elements);
  if (!targets.length) return typesetQueue;

  typesetQueue = typesetQueue
    .then(() => mathReady)
    .then((available) => available && window.MathJax.typesetPromise(targets))
    .catch((error) => {
      console.warn("Eine Formel konnte nicht gesetzt werden.", error);
    });
  return typesetQueue;
}

export function typesetDocument() {
  return typesetMath(document.body);
}
