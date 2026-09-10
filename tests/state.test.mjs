import test from "node:test";
import assert from "node:assert/strict";
import {
  LEGACY_STORAGE_KEY,
  STORAGE_KEY,
  loadState,
  persistState,
  sanitizeState
} from "../state.js";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, value); },
    value(key) { return values.get(key); }
  };
}

test("übernimmt alte Messdaten, aber keine alten Quizflags", () => {
  const storage = memoryStorage({
    [LEGACY_STORAGE_KEY]: JSON.stringify({
      data: [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }],
      modelChecked: true,
      exponentCorrect: true,
      errorCorrect: true
    })
  });

  const state = loadState(storage);
  assert.deepEqual(state.transfer.data, [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }]);
  assert.deepEqual(state.completedSteps, []);
  assert.deepEqual(state.answers, {});
});

test("bereinigt unbekannte Schritte und begrenzt den aktuellen Schritt", () => {
  const state = sanitizeState({
    version: 2,
    currentStep: 99,
    completedSteps: ["table", "table", "unbekannt"],
    answers: { table: { a6: "18,6" } },
    transfer: { data: [{ r: 1, f: 2 }, { r: 2, f: 1 }, { r: 3, f: 0.5 }] },
    student: { name: "Ada", course: "Q1" }
  });

  assert.equal(state.currentStep, 7);
  assert.deepEqual(state.completedSteps, ["table"]);
  assert.equal(state.student.name, "Ada");
});

test("speichert den Zustand unter dem neuen Schlüssel", () => {
  const storage = memoryStorage();
  const state = loadState(storage);
  assert.equal(persistState(storage, state), true);
  assert.equal(JSON.parse(storage.value(STORAGE_KEY)).version, 2);
});
