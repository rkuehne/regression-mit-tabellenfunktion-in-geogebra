import test from "node:test";
import assert from "node:assert/strict";
import {
  LEGACY_STORAGE_KEY,
  STORAGE_KEY,
  V2_STORAGE_KEY,
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

test("übernimmt v1-Messdaten, aber keine alten Quizflags", () => {
  const storage = memoryStorage({
    [LEGACY_STORAGE_KEY]: JSON.stringify({
      data: [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }],
      modelChecked: true,
      exponentCorrect: true,
      errorCorrect: true
    })
  });

  const state = loadState(storage);
  assert.equal(state.version, 3);
  assert.equal(state.lessonMode, "explain");
  assert.deepEqual(state.transfer.data, [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }]);
  assert.deepEqual(state.completedSteps, []);
  assert.deepEqual(state.answers, {});
});

test("übernimmt aus v2 Transfer und Nachweisdaten, setzt aber den Kurs zurück", () => {
  const transferResult = { a: 3, b: -2, r2: 0.99, maxDeviation: 4, uncertainty: 5 };
  const storage = memoryStorage({
    [V2_STORAGE_KEY]: JSON.stringify({
      version: 2,
      currentStep: 7,
      completedSteps: ["table", "conclusion"],
      answers: { table: { a6: "18,6" } },
      transfer: {
        data: [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }],
        uncertainty: "5",
        reflection: "Das Modell passt grob.",
        result: transferResult
      },
      student: { name: "Ada", course: "Q1" }
    })
  });

  const state = loadState(storage);
  assert.equal(state.currentStep, 0);
  assert.deepEqual(state.completedSteps, []);
  assert.deepEqual(state.answers, {});
  assert.equal(state.lessonMode, "explain");
  assert.equal(state.student.name, "Ada");
  assert.equal(state.student.course, "Q1");
  assert.equal(state.transfer.uncertainty, "5");
  assert.equal(state.transfer.reflection, "Das Modell passt grob.");
  assert.deepEqual(state.transfer.result, transferResult);
});

test("bereinigt einen v3-Zustand und begrenzt das aktuelle Kapitel", () => {
  const state = sanitizeState({
    version: 3,
    lessonMode: "compact",
    currentStep: 99,
    completedSteps: ["context", "context", "conclusion", "unbekannt"],
    answers: { context: { trend: "decreases" } },
    transfer: { data: [{ r: 1, f: 2 }, { r: 2, f: 1 }, { r: 3, f: 0.5 }] },
    student: { name: "Ada", course: "Q1" }
  });

  assert.equal(state.currentStep, 9);
  assert.equal(state.lessonMode, "compact");
  assert.deepEqual(state.completedSteps, ["context", "conclusion"]);
  assert.equal(state.student.name, "Ada");
});

test("unbekannter Modus wird als Erklärmodus geladen", () => {
  const state = sanitizeState({ version: 3, lessonMode: "unknown" });
  assert.equal(state.lessonMode, "explain");
});

test("speichert den Zustand unter dem v3-Schlüssel", () => {
  const storage = memoryStorage();
  const state = loadState(storage);
  assert.equal(persistState(storage, state), true);
  assert.equal(JSON.parse(storage.value(STORAGE_KEY)).version, 3);
});
