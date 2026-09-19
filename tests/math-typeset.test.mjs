import test from "node:test";
import assert from "node:assert/strict";

test("setzt aufeinanderfolgende MathJax-Anfragen zuverlässig", async () => {
  const calls = [];

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
          typesetClear() {},
          async typesetPromise(targets) { calls.push(targets); }
        };
        queueMicrotask(() => script.listeners.load());
      }
    }
  };

  const moduleUrl = new URL(`../math-typeset.js?test=${Date.now()}`, import.meta.url);
  const { mathReady, typesetDocument, typesetMath } = await import(moduleUrl);
  const results = await Promise.all([
    typesetMath(lesson),
    typesetMath(course),
    typesetDocument(),
    mathReady
  ]);

  assert.equal(results.at(-1), true);
  assert.deepEqual(calls, [[lesson], [course], [root]]);

  delete globalThis.document;
  delete globalThis.window;
  delete globalThis.Element;
});
