import test from "node:test";
import assert from "node:assert/strict";

test("bündelt schnelle und überlappende MathJax-Anfragen", async () => {
  const calls = [];
  class FakeElement {
    constructor(parent = null) {
      this.parent = parent;
      this.isConnected = true;
    }
    contains(candidate) {
      for (let current = candidate; current; current = current.parent) {
        if (current === this) return true;
      }
      return false;
    }
  }

  const root = new FakeElement();
  const course = new FakeElement(root);
  const lesson = new FakeElement(course);
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
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], [root]);

  delete globalThis.document;
  delete globalThis.window;
  delete globalThis.Element;
});
