import test from "node:test";
import assert from "node:assert/strict";

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test("serialisiert initialen Formelsatz sowie schnelle Kapitel- und Lernwegwechsel", async () => {
  const startupGate = deferred();
  const initialTypesetGate = deferred();
  const initialTypesetStarted = deferred();
  const events = [];
  let activeTypesets = 0;
  let maxConcurrentTypesets = 0;

  class FakeElement {
    constructor(name, parent = null) {
      this.name = name;
      this.parent = parent;
      this.textContent = "";
      this.isConnected = true;
    }
    contains(candidate) {
      for (let current = candidate; current; current = current.parent) {
        if (current === this) return true;
      }
      return false;
    }
  }

  const root = new FakeElement("document");
  const course = new FakeElement("course", root);
  const summary = new FakeElement("summary", root);
  globalThis.Element = FakeElement;
  globalThis.window = {};
  globalThis.document = {
    body: root,
    createElement() {
      const listeners = {};
      return {
        dataset: {},
        addEventListener(type, listener) { listeners[type] = listener; },
        listeners
      };
    },
    head: {
      append(script) {
        const configuration = window.MathJax;
        window.MathJax = {
          ...configuration,
          startup: { promise: startupGate.promise },
          typesetClear(targets) {
            assert.equal(activeTypesets, 0, "typesetClear darf nicht während eines Satzlaufs erfolgen");
            events.push(`clear:${targets.map(({ name }) => name).join("+")}`);
          },
          async typesetPromise(targets) {
            activeTypesets += 1;
            maxConcurrentTypesets = Math.max(maxConcurrentTypesets, activeTypesets);
            const names = targets.map(({ name }) => name).join("+");
            events.push(`typeset:${names}`);
            if (targets[0] === root) {
              initialTypesetStarted.resolve();
              await initialTypesetGate.promise;
            }
            activeTypesets -= 1;
          }
        };
        queueMicrotask(() => script.listeners.load());
      }
    }
  };

  const moduleUrl = new URL(`../math-typeset.js?test=${Date.now()}`, import.meta.url);
  const { replaceMath, typesetDocument } = await import(moduleUrl);
  const initial = typesetDocument();

  startupGate.resolve();
  await initialTypesetStarted.promise;
  assert.deepEqual(events, ["typeset:document"]);

  const chapterA = replaceMath(course, () => {
    course.textContent = "Kapitel A mit \\(a\\)";
    events.push("update:chapter-a");
  });
  const chapterB = replaceMath(course, () => {
    course.textContent = "Kapitel B mit \\(b\\)";
    events.push("update:chapter-b");
  });
  const learningPath = replaceMath([course, summary], () => {
    course.textContent = "Anderer Lernweg mit \\(c\\)";
    summary.textContent = "Neuer Nachweis";
    events.push("update:learning-path");
  });

  assert.equal(course.textContent, "Anderer Lernweg mit \\(c\\)");
  assert.equal(summary.textContent, "Neuer Nachweis");
  assert.deepEqual(events, [
    "typeset:document",
    "update:chapter-a",
    "update:chapter-b",
    "update:learning-path"
  ]);

  initialTypesetGate.resolve();
  await Promise.all([initial, chapterA, chapterB, learningPath]);

  assert.deepEqual(events, [
    "typeset:document",
    "update:chapter-a",
    "update:chapter-b",
    "update:learning-path",
    "typeset:course+summary"
  ]);
  assert.equal(course.textContent, "Anderer Lernweg mit \\(c\\)");
  assert.equal(summary.textContent, "Neuer Nachweis");
  assert.equal(maxConcurrentTypesets, 1);

  delete globalThis.document;
  delete globalThis.window;
  delete globalThis.Element;
});
