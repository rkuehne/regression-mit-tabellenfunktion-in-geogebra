import test from "node:test";
import assert from "node:assert/strict";

test("wechselt Inhalte sofort und setzt ihre Formeln nach dem laufenden MathJax-Satz", async () => {
  const calls = [];
  const events = [];
  let finishInitialTypeset;

  class FakeElement {}

  const root = new FakeElement();
  const course = new FakeElement();
  const lesson = new FakeElement();
  root.textContent = "";
  course.textContent = "";
  lesson.textContent = "";
  globalThis.Element = FakeElement;
  globalThis.window = {
    requestAnimationFrame(callback) { queueMicrotask(() => callback(0)); }
  };
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
          startup: { promise: Promise.resolve() },
          typesetClear(targets) { events.push(["clear", targets]); },
          typesetPromise(targets) {
            calls.push(targets);
            events.push(["typeset", targets]);
            if (calls.length === 1) {
              return new Promise((resolve) => { finishInitialTypeset = resolve; });
            }
            if (targets[0] === course && calls.length === 3) course.textContent = "";
            return Promise.resolve();
          }
        };
        queueMicrotask(() => script.listeners.load());
      }
    }
  };

  const moduleUrl = new URL(`../math-typeset.js?test=${Date.now()}`, import.meta.url);
  const { mathReady, replaceMath, typesetDocument, typesetMath } = await import(moduleUrl);
  const initialTypeset = typesetDocument();
  const replacement = replaceMath(course, () => {
    course.textContent = "\\(x^2\\)";
    events.push(["update", course]);
  });

  assert.equal(course.textContent, "\\(x^2\\)");
  assert.deepEqual(events, [["update", course]]);
  await mathReady;
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.deepEqual(events, [
    ["update", course],
    ["typeset", [root]]
  ]);

  finishInitialTypeset();
  await Promise.all([initialTypeset, replacement, typesetMath(lesson)]);
  assert.deepEqual(events, [
    ["update", course],
    ["typeset", [root]],
    ["typeset", [course]],
    ["typeset", [course]],
    ["typeset", [lesson]]
  ]);

  const idleReplacement = replaceMath(course, () => {
    course.textContent = "ohne Formel";
    events.push(["idle-update", course]);
  });
  assert.deepEqual(events.slice(-2), [
    ["clear", [course]],
    ["idle-update", course]
  ]);
  await idleReplacement;

  delete globalThis.document;
  delete globalThis.window;
  delete globalThis.Element;
});
