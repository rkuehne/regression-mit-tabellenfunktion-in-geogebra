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

let mathOperationQueue = Promise.resolve();
let pendingMathOperations = 0;

function enqueueMathOperation(operation) {
  pendingMathOperations += 1;
  const run = async () => {
    try {
      return await operation();
    } finally {
      pendingMathOperations -= 1;
    }
  };
  const result = mathOperationQueue.then(run, run);
  mathOperationQueue = result.catch(() => undefined);
  return result;
}

function afterNextPaint() {
  if (typeof window.requestAnimationFrame === "function") {
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    });
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function containsUnrenderedMath(targets) {
  const delimiterPattern = /\\(?:\(|\[)/;
  const skippedParents = "code, pre, select, option, textarea, script, style, mjx-container";

  return targets.some((target) => {
    if (typeof document.createTreeWalker !== "function" || typeof NodeFilter === "undefined") {
      return delimiterPattern.test(target.textContent || "");
    }

    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (!node.parentElement?.closest(skippedParents) && delimiterPattern.test(node.nodeValue || "")) {
        return true;
      }
      node = walker.nextNode();
    }
    return false;
  });
}

async function performTypeset(targets) {
  await afterNextPaint();
  let firstError = null;
  try {
    await window.MathJax.typesetPromise(targets);
  } catch (error) {
    firstError = error;
  }

  if (firstError || containsUnrenderedMath(targets)) {
    await afterNextPaint();
    await window.MathJax.typesetPromise(targets);
  }
  return true;
}

async function runTypeset(targets) {
  const available = await mathReady;
  if (!available) return false;
  return performTypeset(targets);
}

export function typesetMath(elements) {
  const targets = normaliseElements(elements);
  if (!targets.length) return mathOperationQueue;

  return enqueueMathOperation(() => runTypeset(targets))
    .catch((error) => {
      console.warn("Eine Formel konnte nicht gesetzt werden.", error);
      return false;
    });
}

export function replaceMath(elements, updateContent) {
  const targets = normaliseElements(elements);
  if (!targets.length || typeof updateContent !== "function") {
    updateContent?.();
    return mathOperationQueue;
  }

  if (pendingMathOperations === 0 && typeof window.MathJax?.typesetClear === "function") {
    try {
      window.MathJax.typesetClear(targets);
    } catch (error) {
      console.warn("Alte Formeln konnten nicht aus MathJax entfernt werden.", error);
    }
  }
  updateContent();

  return enqueueMathOperation(async () => {
    const available = await mathReady;
    if (!available) return false;
    return performTypeset(targets);
  }).catch((error) => {
    console.warn("Der aktualisierte Inhalt konnte nicht als Formel gesetzt werden.", error);
    return false;
  });
}

export function typesetDocument() {
  return typesetMath(document.body);
}
