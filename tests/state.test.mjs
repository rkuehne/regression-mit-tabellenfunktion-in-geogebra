import test from "node:test";
import assert from "node:assert/strict";
import {
  LEGACY_STORAGE_KEY,
  STORAGE_KEY,
  V2_STORAGE_KEY,
  V3_STORAGE_KEY,
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

test("erzeugt fünf Lernstände und vier getrennte Transferstände", () => {
  const state = loadState(memoryStorage());
  assert.equal(state.version, 4);
  assert.equal(state.activeCourseId, "inverse-square");
  assert.deepEqual(Object.keys(state.courses), ["inverse-square", "proportional-power", "proportional-constants", "proportional-linear", "capacitor-exponential"]);
  assert.deepEqual(Object.keys(state.transfer.methods), ["inverse-square", "proportional-power", "proportional-constants", "proportional-linear"]);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, []);
  assert.equal(state.transfer.methods["capacitor-exponential"], undefined);
  assert.equal(state.transfer.methods["proportional-power"].deltaU, "5");
  assert.equal(state.transfer.methods["proportional-power"].deltaQ, "0,1");
  assert.equal(state.transfer.methods["proportional-constants"].data.length, 5);
  assert.equal(state.transfer.methods["proportional-linear"].data.length, 5);
  assert.equal(state.transfer.methods["proportional-linear"].deltaU, "5");
  assert.deepEqual(state.sharedModules["uq-largest-single-error"], { completed: false, answers: {} });
});

test("migriert v3-Kursfortschritt und Transfer in den 1/r²-Weg", () => {
  const storage = memoryStorage({
    [V3_STORAGE_KEY]: JSON.stringify({
      version: 3,
      lessonMode: "compact",
      currentStep: 7,
      completedSteps: ["context", "table"],
      answers: { table: { a6: "18,6" } },
      transfer: {
        data: [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }],
        uncertainty: "5",
        reflection: "Passt grob.",
        result: { a: 3, b: -2 }
      },
      student: { name: "Ada", course: "Q1" }
    })
  });
  const state = loadState(storage);
  assert.equal(state.version, 4);
  assert.equal(state.lessonMode, "compact");
  assert.equal(state.courses["inverse-square"].currentStep, 7);
  assert.deepEqual(state.courses["inverse-square"].completedSteps, ["context", "table"]);
  assert.deepEqual(state.courses["proportional-power"].completedSteps, []);
  assert.deepEqual(state.courses["proportional-linear"].completedSteps, []);
  assert.equal(state.transfer.methods["inverse-square"].reflection, "Passt grob.");
  assert.equal(state.student.name, "Ada");
});

test("v2 und v1 behalten Messdaten, aber übernehmen keine alten Quizflags", () => {
  const v2 = loadState(memoryStorage({
    [V2_STORAGE_KEY]: JSON.stringify({
      version: 2,
      currentStep: 7,
      completedSteps: ["table"],
      data: [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }]
    })
  }));
  assert.deepEqual(v2.courses["inverse-square"].completedSteps, []);
  assert.deepEqual(v2.transfer.methods["inverse-square"].data, [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }]);

  const v1 = loadState(memoryStorage({
    [LEGACY_STORAGE_KEY]: JSON.stringify({
      data: [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }],
      modelChecked: true
    })
  }));
  assert.deepEqual(v1.courses["inverse-square"].completedSteps, []);
});

test("bereinigt v4-Auswahl, Kapitel und unbekannte IDs", () => {
  const state = sanitizeState({
    version: 4,
    activeCourseId: "proportional-power",
    lessonMode: "unknown",
    courses: {
      "proportional-power": {
        currentStep: 99,
        completedSteps: ["uq-power-context", "uq-power-context", "unbekannt"],
        answers: { "uq-power-context": { q100: "4,3" } }
      }
    },
    transfer: { activeMethod: "unbekannt", methods: {} },
    student: { name: "Ada", course: "Q1" }
  });
  assert.equal(state.lessonMode, "explain");
  assert.equal(state.courses["proportional-power"].currentStep, 7);
  assert.deepEqual(state.courses["proportional-power"].completedSteps, ["uq-power-context"]);
  assert.equal(state.transfer.activeMethod, "proportional-power");
});

test("speichert unter dem v4-Schlüssel", () => {
  const storage = memoryStorage();
  const state = loadState(storage);
  assert.equal(persistState(storage, state), true);
  assert.equal(JSON.parse(storage.value(STORAGE_KEY)).version, 4);
});

test("speichert den gemeinsamen Fehlerabschluss einmal für alle Q-U-Wege", () => {
  const state = sanitizeState({
    version: 4,
    activeCourseId: "proportional-linear",
    courses: {},
    sharedModules: {
      "uq-largest-single-error": {
        completed: true,
        answers: { uError: "10", qError: "5", maxError: "10", minimumReason: "largest-relative", methodMeaning: "explainable" }
      }
    },
    transfer: { activeMethod: "proportional-linear", methods: {} },
    student: {}
  });
  assert.equal(state.sharedModules["uq-largest-single-error"].completed, true);
  assert.equal(state.sharedModules["uq-largest-single-error"].answers.qError, "5");
  assert.equal(Object.keys(state.sharedModules).length, 1);
});

test("ergänzt einen bestehenden v4-Stand um neue Lernwege und entfernt alte r2-Werte", () => {
  const state = sanitizeState({
    version: 4,
    activeCourseId: "proportional-power",
    lessonMode: "explain",
    courses: {
      "proportional-power": { currentStep: 3, completedSteps: ["uq-power-context"], answers: {} }
    },
    transfer: {
      activeMethod: "proportional-power",
      methods: {
        "proportional-power": {
          data: [{ u: 50, q: 2 }, { u: 100, q: 4.3 }, { u: 150, q: 6.4 }],
          deltaU: "5",
          deltaQ: "0,1",
          result: { type: "power", a: 0.04, b: 1.01, r2: 0.99 }
        }
      }
    },
    student: { name: "Ada", course: "Q1" }
  });

  assert.deepEqual(state.courses["proportional-power"].completedSteps, ["uq-power-context"]);
  assert.deepEqual(state.courses["proportional-linear"].completedSteps, []);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, []);
  assert.equal(state.transfer.methods["proportional-linear"].data.length, 5);
  assert.equal(state.transfer.methods["capacitor-exponential"], undefined);
  assert.deepEqual(state.sharedModules["uq-largest-single-error"], { completed: false, answers: {} });
  assert.equal("r2" in state.transfer.methods["proportional-power"].result, false);
  assert.equal(state.student.name, "Ada");
});

test("hält beim Aufladungskurs ein gültiges bestehendes Transferverfahren getrennt", () => {
  const state = sanitizeState({
    version: 4,
    activeCourseId: "capacitor-exponential",
    courses: {
      "capacitor-exponential": { currentStep: 4, completedSteps: ["charging-context"], answers: {} }
    },
    transfer: { activeMethod: "proportional-linear", methods: {} },
    student: {}
  });
  assert.equal(state.activeCourseId, "capacitor-exponential");
  assert.equal(state.courses["capacitor-exponential"].currentStep, 4);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, ["charging-context"]);
  assert.equal(state.transfer.activeMethod, "proportional-linear");
  assert.equal(Object.hasOwn(state.transfer.methods, "capacitor-exponential"), false);
});
