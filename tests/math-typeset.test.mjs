import test from "node:test";
import assert from "node:assert/strict";

test("tauscht dynamische Inhalte erst nach dem laufenden MathJax-Satz aus", async () => {
  const calls = [];
  const events = [];
  let finishInitialTypeset;

  class FakeElement {}

  const root = new FakeElement();
  const course = new FakeElement();
  const lesson = new FakeElement();
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
          startup: { promise: Promise.resolve() },
          typesetClear(targets) { events.push(["clear", targets]); },
          typesetPromise(targets) {
            calls.push(targets);
            events.push(["typeset", targets]);
            if (calls.length === 1) {
              return new Promise((resolve) => { finishInitialTypeset = resolve; });
            }
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
  const replacement = replaceMath(course, () => events.push(["update", course]));

  await mathReady;
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.deepEqual(events, [["typeset", [root]]]);

  finishInitialTypeset();
  await Promise.all([initialTypeset, replacement, typesetMath(lesson)]);
  assert.deepEqual(events, [
    ["typeset", [root]],
    ["clear", [course]],
    ["update", course],
    ["typeset", [course]],
    ["typeset", [lesson]]
  ]);

  delete globalThis.document;
  delete globalThis.window;
  delete globalThis.Element;
});
