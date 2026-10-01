import test from "node:test";
import assert from "node:assert/strict";
import {
  CURRENT_STEP_IDS,
  OLD_COURSE_STEP_IDS,
  PRACTICE_TASK_IDS,
  SCHEMA_VERSION,
  STORAGE_KEY,
  createDefaultState,
  loadState,
  migrateState,
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

test("erzeugt fünf Lernstände ohne Transferzustand im Schema Version 2", () => {
  const state = createDefaultState();
  assert.equal(state.schemaVersion, 2);
  assert.equal(state.activeCourseId, "inverse-square");
  assert.equal(state.lessonMode, "compact");
  assert.deepEqual(Object.keys(state.courses), [
    "inverse-square",
    "proportional-power",
    "proportional-constants",
    "proportional-linear",
    "capacitor-exponential"
  ]);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, []);
  assert.equal(Object.hasOwn(state, "transfer"), false);
  assert.equal(Object.hasOwn(state, "reflection"), false);
  assert.deepEqual(state.sharedModules["uq-largest-single-error"], { completed: false, answers: {} });
  assert.equal(state.documentation.selectedExampleId, "capacitor-exponential");
  assert.equal(state.documentation.view, "model");
  assert.deepEqual(state.documentation.selfChecks["inverse-square"], {});

  // Practice state
  assert.ok(state.practice);
  assert.equal(state.practice.selectedTaskId, "linear-7");
  assert.deepEqual(Object.keys(state.practice.tasks).sort(), ["exponential-7", "linear-7", "power-7"]);
  for (const taskId of PRACTICE_TASK_IDS) {
    assert.deepEqual(state.practice.tasks[taskId], { answers: {}, completedChecks: [], selfChecks: {} });
  }
});

test("bereinigt Auswahl, Kapitel und unbekannte IDs und verwirft alte Zusatzdaten", () => {
  const state = sanitizeState({
    schemaVersion: 2,
    activeCourseId: "proportional-power",
    lessonMode: "unknown",
    courses: {
      "proportional-power": {
        currentStep: 99,
        completedSteps: ["uq-power-context", "uq-power-context", "unbekannt"],
        answers: { "uq-power-context": { q100: "4,3" } }
      }
    },
    transfer: { activeMethod: "proportional-power", methods: { old: true } },
    reflection: "wird nicht übernommen",
    student: { name: "Ada", course: "Q1" }
  });

  assert.equal(state.schemaVersion, 2);
  assert.equal(state.lessonMode, "compact");
  assert.ok(state.courses["proportional-power"].currentStep <= 8);
  assert.deepEqual(state.courses["proportional-power"].completedSteps, ["uq-power-context"]);
  assert.equal(state.courses["proportional-power"].answers["uq-power-context"].q100, "4,3");
  assert.equal(Object.hasOwn(state, "transfer"), false);
  assert.equal(Object.hasOwn(state, "reflection"), false);
  assert.equal(state.student.name, "Ada");
});

test("ergänzt unvollständige aktuelle Daten mit sicheren Standardwerten", () => {
  const state = sanitizeState({
    schemaVersion: 2,
    activeCourseId: "proportional-constants",
    lessonMode: "explain",
    courses: {
      "proportional-constants": { currentStep: 2, completedSteps: ["uq-constant-context"], answers: {} }
    },
    student: { name: "Ada", course: "Q1" }
  });

  assert.equal(state.lessonMode, "explain");
  assert.deepEqual(state.courses["proportional-constants"].completedSteps, ["uq-constant-context"]);
  assert.deepEqual(state.courses["proportional-linear"].completedSteps, []);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, []);
  assert.deepEqual(state.sharedModules["uq-largest-single-error"], { completed: false, answers: {} });
  assert.equal(state.student.name, "Ada");
});

test("speichert den gemeinsamen Fehlerabschluss einmal für alle Q-U-Wege", () => {
  const state = sanitizeState({
    schemaVersion: 2,
    activeCourseId: "proportional-linear",
    courses: {},
    sharedModules: {
      "uq-largest-single-error": {
        completed: true,
        answers: { uError: "10", qError: "5", maxError: "10", minimumReason: "largest-relative", methodMeaning: "explainable" }
      }
    },
    student: {}
  });

  assert.equal(state.sharedModules["uq-largest-single-error"].completed, true);
  assert.equal(state.sharedModules["uq-largest-single-error"].answers.qError, "5");
  assert.equal(Object.keys(state.sharedModules).length, 1);
});

test("hält den Aufladungskurs als eigenständigen Lernstand", () => {
  const state = sanitizeState({
    schemaVersion: 2,
    activeCourseId: "capacitor-exponential",
    courses: {
      "capacitor-exponential": { currentStep: 3, completedSteps: ["charging-context"], answers: {} }
    },
    student: {}
  });

  assert.equal(state.activeCourseId, "capacitor-exponential");
  assert.equal(state.courses["capacitor-exponential"].currentStep, 3);
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, ["charging-context"]);
  assert.equal(Object.hasOwn(state, "transfer"), false);
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

test("lädt einen gültigen aktuellen Speicherstand und ignoriert zusätzliche Transferdaten", () => {
  const storage = memoryStorage({
    [STORAGE_KEY]: JSON.stringify({
      schemaVersion: 2,
      activeCourseId: "capacitor-exponential",
      lessonMode: "compact",
      courses: {
        "capacitor-exponential": { currentStep: 2, completedSteps: ["charging-context"], answers: {} }
      },
      transfer: { activeMethod: "proportional-linear", methods: {} },
      sharedModules: {},
      student: { name: "Mina", course: "Q2" }
    })
  });
  const state = loadState(storage);

  assert.equal(state.schemaVersion, 2);
  assert.equal(state.activeCourseId, "capacitor-exponential");
  assert.equal(state.lessonMode, "compact");
  assert.deepEqual(state.courses["capacitor-exponential"].completedSteps, ["charging-context"]);
  assert.equal(state.student.name, "Mina");
  assert.equal(Object.hasOwn(state, "transfer"), false);
});

test("fällt bei beschädigtem oder nicht verfügbarem Speicher sicher zurück", () => {
  const damaged = loadState(memoryStorage({ [STORAGE_KEY]: "{" }));
  const unavailable = loadState(memoryStorage({}, { failReads: true }));

  assert.equal(damaged.schemaVersion, 2);
  assert.equal(damaged.activeCourseId, "inverse-square");
  assert.equal(unavailable.schemaVersion, 2);
  assert.equal(unavailable.activeCourseId, "inverse-square");
});

test("speichert ausschließlich das aktuelle Datenformat mit schemaVersion 2", () => {
  const storage = memoryStorage();
  const state = createDefaultState();
  state.student.name = "Mina";
  state.transfer = { old: true };
  state.unused = true;

  assert.equal(persistState(storage, state), true);
  const saved = JSON.parse(storage.value(STORAGE_KEY));
  assert.deepEqual(Object.keys(saved).sort(), [
    "activeCourseId",
    "courses",
    "documentation",
    "lessonMode",
    "practice",
    "schemaVersion",
    "sharedModules",
    "student",
    "updatedAt"
  ]);
  assert.equal(saved.schemaVersion, 2);
  assert.equal(saved.student.name, "Mina");
  assert.equal(saved.documentation.selectedExampleId, "capacitor-exponential");
  assert.equal(Object.hasOwn(saved, "transfer"), false);
  assert.equal(persistState(memoryStorage({}, { failWrites: true }), state), false);
});

test("speichert die Dokumentationsauswahl getrennt vom Lernfortschritt", () => {
  const state = sanitizeState({
    schemaVersion: 2,
    activeCourseId: "inverse-square",
    courses: {
      "inverse-square": { currentStep: 2, completedSteps: ["context"], answers: {} }
    },
    documentation: {
      selectedExampleId: "proportional-linear",
      view: "practice",
      selfChecks: {
        "proportional-linear": { data: true, physical: true, unknown: true }
      }
    },
    student: {}
  });

  assert.equal(state.documentation.selectedExampleId, "proportional-linear");
  assert.equal(state.documentation.view, "practice");
  assert.deepEqual(state.documentation.selfChecks["proportional-linear"], { data: true, physical: true });
  assert.deepEqual(state.courses["inverse-square"].completedSteps, ["context"]);
});

test("migriert Altstand ohne schemaVersion verbindlich auf Version 2", () => {
  // Alter Stand ohne schemaVersion mit diversen Kurszuständen:
  const oldState = {
    activeCourseId: "proportional-constants",
    lessonMode: "explain",
    student: { name: "Lisa", course: "Ph-LK" },
    documentation: {
      selectedExampleId: "proportional-linear",
      view: "practice",
      selfChecks: {
        "proportional-linear": { data: true, physical: true }
      }
    },
    sharedModules: {
      "uq-largest-single-error": {
        completed: true,
        answers: { uError: "10", qError: "5", maxError: "10", minimumReason: "largest-relative", methodMeaning: "explainable" }
      }
    },
    courses: {
      "inverse-square": {
        currentStep: 6, // 'regression'
        completedSteps: ["context", "setup", "regression"],
        answers: {
          regression: { a: "28,9", b: "-2,08", interpretation: "Kraft nimmt mit 1/r^2 ab" }
        }
      },
      "proportional-constants": {
        currentStep: 4, // alter Index 4: 'uq-constant-reference' -> soll zu 'uq-constant-mean' werden!
        completedSteps: ["uq-constant-context", "uq-constant-mean", "uq-constant-reference"],
        answers: {
          "uq-constant-mean": { mean: "0,0416", pf: "416", reason: "Quotient ist konstant" },
          "uq-constant-reference": { d3: "0,0416", constant: "yes" }
        }
      },
      "proportional-linear": {
        currentStep: 4, // 'uq-linear-fit'
        completedSteps: ["uq-linear-context", "uq-linear-fit"],
        answers: {
          "uq-linear-fit": { slope: "0,0408", intercept: "0,12", capacity: "408", degree: "1" }
        }
      },
      "capacitor-exponential": {
        currentStep: 9, // alter Index 9: 'charging-data-check' -> soll zu 'charging-conclusion' werden!
        completedSteps: ["charging-context", "charging-table", "charging-points", "charging-regression", "charging-data-check"],
        answers: {
          "charging-context": { uc0: "0" },
          "charging-table": { deltaU: "3,78" },
          "charging-points": { lastPoint: "(80; 0,332)" },
          "charging-regression": { k: "-0,02836" },
          "charging-data-check": { exclude: "yes" }
        }
      }
    },
    transfer: { old: true },
    reflection: { note: "veraltet" }
  };

  const migrated = sanitizeState(oldState);

  // 1. Grunddaten
  assert.equal(migrated.schemaVersion, 2);
  assert.equal(migrated.activeCourseId, "proportional-constants");
  assert.equal(migrated.lessonMode, "explain");
  assert.equal(migrated.student.name, "Lisa");
  assert.equal(migrated.student.course, "Ph-LK");
  assert.equal(migrated.documentation.selectedExampleId, "proportional-linear");
  assert.equal(migrated.documentation.view, "practice");
  assert.deepEqual(migrated.documentation.selfChecks["proportional-linear"], { data: true, physical: true });
  assert.equal(migrated.sharedModules["uq-largest-single-error"].completed, true);
  assert.equal(migrated.sharedModules["uq-largest-single-error"].answers.qError, "5");
  assert.equal(Object.hasOwn(migrated, "transfer"), false);
  assert.equal(Object.hasOwn(migrated, "reflection"), false);

  // 2. Practice-Bereich initialisiert
  assert.ok(migrated.practice);
  assert.equal(migrated.practice.selectedTaskId, "linear-7");

  // 3. Schritt-Umordnung & Kontroll-Übernahme
  // inverse-square: 'regression' war completed, interpretation wandert nach 'inverse-parameters'
  const invProg = migrated.courses["inverse-square"];
  assert.equal(invProg.answers["inverse-parameters"]?.interpretation, "Kraft nimmt mit 1/r^2 ab");
  assert.equal(invProg.answers.regression.interpretation, undefined);
  assert.equal(invProg.answers.regression.a, "28,9");
  assert.ok(invProg.completedSteps.includes("inverse-parameters"));

  // proportional-constants: uq-constant-reference -> uq-constant-mean (Index 3)
  const constProg = migrated.courses["proportional-constants"];
  assert.equal(constProg.currentStep, 3); // neuer Index von uq-constant-mean
  assert.equal(constProg.answers["uq-constant-parameters"]?.pf, "416");
  assert.equal(constProg.answers["uq-constant-reference"], undefined);
  assert.ok(!constProg.completedSteps.includes("uq-constant-reference"));
  assert.ok(constProg.completedSteps.includes("uq-constant-parameters"));

  // proportional-linear: capacity wandert nach uq-linear-parameters
  const linProg = migrated.courses["proportional-linear"];
  assert.equal(linProg.answers["uq-linear-parameters"]?.capacity, "408");
  assert.ok(linProg.completedSteps.includes("uq-linear-parameters"));

  // 4. capacitor-exponential:
  // alter Index 9 ('charging-data-check') -> 'charging-conclusion' (neuer Index 9)
  const expProg = migrated.courses["capacitor-exponential"];
  assert.equal(expProg.currentStep, 9);
  // charging-points, charging-regression etc. zurückgesetzt:
  assert.ok(!expProg.completedSteps.includes("charging-points"));
  assert.ok(!expProg.completedSteps.includes("charging-regression"));
  assert.ok(!expProg.completedSteps.includes("charging-data-check"));
  assert.equal(expProg.answers["charging-points"], undefined);
  assert.equal(expProg.answers["charging-regression"], undefined);
  // Unveränderte Schritte erhalten:
  assert.ok(expProg.completedSteps.includes("charging-context"));
  assert.ok(expProg.completedSteps.includes("charging-table"));
  assert.equal(expProg.answers["charging-context"].uc0, "0");
  assert.equal(expProg.answers["charging-table"].deltaU, "3,78");

  // 5. Legacy-Kopie und Migrationshinweis
  assert.ok(migrated.legacyChargingProgress);
  assert.equal(migrated.legacyChargingProgress.currentStep, 9);
  assert.ok(migrated.legacyChargingProgress.completedSteps.includes("charging-regression"));
  assert.equal(migrated.legacyChargingProgress.answers["charging-regression"].k, "-0,02836");
  assert.match(migrated.migrationNotice, /neun Messpaare vereinheitlicht/);

  // 6. Idempotenz: Zweite Migration / Sanitize verändert den migrierten Stand nicht mehr
  const secondRun = sanitizeState(migrated);
  assert.deepEqual(secondRun.courses, migrated.courses);
  assert.deepEqual(secondRun.legacyChargingProgress, migrated.legacyChargingProgress);
  assert.equal(secondRun.migrationNotice, migrated.migrationNotice);
  assert.equal(secondRun.practice.selectedTaskId, "linear-7");
});

test("Übungszustand ist unabhängig von Lernwegen und Dokumentation", () => {
  const state = createDefaultState();
  state.practice.selectedTaskId = "power-7";
  state.practice.tasks["power-7"].answers = { a: "32,4", n: "-2,03" };
  state.practice.tasks["power-7"].completedChecks = ["regression"];
  state.practice.tasks["power-7"].selfChecks = { formula: true };

  const sanitized = sanitizeState(state);
  assert.equal(sanitized.practice.selectedTaskId, "power-7");
  assert.equal(sanitized.practice.tasks["power-7"].answers.a, "32,4");
  assert.deepEqual(sanitized.practice.tasks["power-7"].completedChecks, ["regression"]);
  assert.deepEqual(sanitized.practice.tasks["power-7"].selfChecks, { formula: true });

  // Lernwege und Dokumentation unberührt
  assert.deepEqual(sanitized.courses["inverse-square"].completedSteps, []);
  assert.deepEqual(sanitized.documentation.selfChecks["inverse-square"], {});
});
