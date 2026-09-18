import test from "node:test";
import assert from "node:assert/strict";
import {
  STORAGE_KEY,
  createDefaultState,
  loadState,
  persistState,
  sanitizeState
} from "../state.js";

function memoryStorage(initial = {}, { failReads = false, failWrites = false } = {}) {
  const values = new Map(Object.entries(initial));
  const reads = [];
  return {
    getItem(key) {
      reads.push(key);
      if (failReads) throw new Error("storage unavailable");
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      if (failWrites) throw new Error("storage unavailable");
      values.set(key, value);
    },
    value(key) { return values.get(key); },
    reads() { return [...reads]; }
  };
}

test("erzeugt fünf Lernstände und vier getrennte Transferstände", () => {
  const state = createDefaultState();
  assert.equal(state.activeCourseId, "inverse-square");
  assert.deepEqual(Object.keys(state.courses), ["inverse-square", "proportional-power", "proportional-constants", "proportional-linear", "capacitor-exponential"]);
  assert.deepEqual(Object.keys(state.transfer.methods), ["inverse-square", "proportional-power", "proportional-constants", "proportional-linear"]);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, []);
  assert.equal(state.transfer.methods["capacitor-exponential"], undefined);
  assert.equal(state.transfer.methods["proportional-power"].deltaU, "5");
  assert.equal(state.transfer.methods["proportional-power"].deltaQ, "0,1");
  assert.equal(state.transfer.methods["proportional-constants"].data.length, 5);
  assert.equal(state.transfer.methods["proportional-linear"].data.length, 5);
  assert.deepEqual(state.sharedModules["uq-largest-single-error"], { completed: false, answers: {} });
});

test("bereinigt die aktuelle Auswahl, Kapitel und unbekannte IDs", () => {
  const state = sanitizeState({
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
  assert.equal(state.courses["proportional-power"].answers["uq-power-context"].q100, "4,3");
  assert.equal(state.transfer.activeMethod, "proportional-power");
  assert.equal(state.student.name, "Ada");
});

test("ergänzt unvollständige aktuelle Daten mit sicheren Standardwerten", () => {
  const state = sanitizeState({
    activeCourseId: "proportional-constants",
    lessonMode: "compact",
    courses: {
      "proportional-constants": { currentStep: 2, completedSteps: ["uq-constant-context"], answers: {} }
    },
    transfer: {
      activeMethod: "proportional-constants",
      methods: {
        "proportional-constants": {
          data: [{ u: 50, q: 2 }, { u: 100, q: 4.3 }, { u: 150, q: 6.4 }],
          deltaU: "4",
          deltaQ: "0,2",
          reflection: "Die Werte streuen wenig.",
          result: { type: "constants", mean: 0.041 }
        }
      }
    },
    student: { name: "Ada", course: "Q1" }
  });

  assert.equal(state.lessonMode, "compact");
  assert.deepEqual(state.courses["proportional-constants"].completedSteps, ["uq-constant-context"]);
  assert.deepEqual(state.courses["proportional-linear"].completedSteps, []);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, []);
  assert.equal(state.transfer.methods["proportional-constants"].data.length, 3);
  assert.equal(state.transfer.methods["proportional-constants"].deltaU, "4");
  assert.equal(state.transfer.methods["proportional-linear"].data.length, 5);
  assert.equal(state.transfer.methods["capacitor-exponential"], undefined);
  assert.deepEqual(state.sharedModules["uq-largest-single-error"], { completed: false, answers: {} });
  assert.equal(state.student.name, "Ada");
});

test("speichert den gemeinsamen Fehlerabschluss einmal für alle Q-U-Wege", () => {
  const state = sanitizeState({
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

test("hält beim Aufladungskurs ein gültiges Transferverfahren getrennt", () => {
  const state = sanitizeState({
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

test("liest ausschließlich den aktuellen Speicherschlüssel", () => {
  const storage = memoryStorage({
    "retired-state-a": JSON.stringify({ activeCourseId: "proportional-linear" }),
    "retired-state-b": JSON.stringify({ activeCourseId: "capacitor-exponential" })
  });
  const state = loadState(storage);

  assert.equal(state.activeCourseId, "inverse-square");
  assert.deepEqual(storage.reads(), [STORAGE_KEY]);
});

test("lädt einen gültigen aktuellen Speicherstand", () => {
  const storage = memoryStorage({
    [STORAGE_KEY]: JSON.stringify({
      activeCourseId: "capacitor-exponential",
      lessonMode: "compact",
      courses: {
        "capacitor-exponential": { currentStep: 3, completedSteps: ["charging-context"], answers: {} }
      },
      transfer: { activeMethod: "proportional-linear", methods: {} },
      sharedModules: {},
      student: { name: "Mina", course: "Q2" }
    })
  });
  const state = loadState(storage);

  assert.equal(state.activeCourseId, "capacitor-exponential");
  assert.equal(state.lessonMode, "compact");
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, ["charging-context"]);
  assert.equal(state.student.name, "Mina");
});

test("fällt bei beschädigtem oder nicht verfügbarem Speicher sicher zurück", () => {
  const damaged = loadState(memoryStorage({ [STORAGE_KEY]: "{" }));
  const unavailable = loadState(memoryStorage({}, { failReads: true }));

  assert.equal(damaged.activeCourseId, "inverse-square");
  assert.equal(unavailable.activeCourseId, "inverse-square");
});

test("speichert ausschließlich das aktuelle Datenformat", () => {
  const storage = memoryStorage();
  const state = createDefaultState();
  state.student.name = "Mina";
  state.unused = true;

  assert.equal(persistState(storage, state), true);
  const saved = JSON.parse(storage.value(STORAGE_KEY));
  assert.deepEqual(Object.keys(saved).sort(), ["activeCourseId", "courses", "lessonMode", "sharedModules", "student", "transfer", "updatedAt"]);
  assert.equal(saved.student.name, "Mina");
  assert.equal(persistState(memoryStorage({}, { failWrites: true }), state), false);
});
