import test from "node:test";
import assert from "node:assert/strict";

import {
  PRACTICE_TASKS,
  PRACTICE_LINEAR_DATA,
  PRACTICE_POWER_DATA,
  PRACTICE_EXPONENTIAL_DATA,
  CHEAT_SHEET_COMMANDS,
  SELF_CHECK_STATEMENTS,
  validatePracticeField,
  isTaskNumericallyComplete
} from "../practice-data.js";
import {
  linearRegression,
  analyzeUqLinear,
  powerRegression,
  analyzePoints,
  exponentialRegression,
  analyzeExponential,
  exponentialTimeMeasures
} from "../regression.js";

test("practice-data: genau drei Aufgaben mit jeweils sieben Zeilen", () => {
  const taskIds = Object.keys(PRACTICE_TASKS);
  assert.deepEqual(taskIds, ["linear-7", "power-7", "exponential-7"]);

  assert.equal(PRACTICE_LINEAR_DATA.length, 7);
  assert.equal(PRACTICE_POWER_DATA.length, 7);
  assert.equal(PRACTICE_EXPONENTIAL_DATA.length, 7);

  taskIds.forEach((id) => {
    assert.equal(PRACTICE_TASKS[id].tableRows.length, 7);
    assert.ok(PRACTICE_TASKS[id].hints.length >= 3);
  });
});

test("Aufgabe linear-7: Referenzwerte stimmen rechnerisch mit den Vorgaben überein", () => {
  const task = PRACTICE_TASKS["linear-7"];
  const reg = linearRegression(PRACTICE_LINEAR_DATA);
  const analysis = analyzeUqLinear(PRACTICE_LINEAR_DATA, reg);

  assert.ok(Math.abs(reg.slope - 0.040000) <= 0.0005);
  assert.ok(Math.abs(reg.intercept - 0.0428571428571) <= 0.005);
  assert.ok(Math.abs(Math.abs(analysis.maxDeviation.deviation) - 2.60869565217) <= 0.08);
  assert.equal(analysis.maxDeviation.u, 40);

  // Validate fields
  const slopeField = task.fields.find((f) => f.id === "slope");
  assert.equal(validatePracticeField(slopeField, "0,0400"), true);
  assert.equal(validatePracticeField(slopeField, "0.0400"), true);
  assert.equal(validatePracticeField(slopeField, "0,0500"), false);

  const interceptField = task.fields.find((f) => f.id === "intercept");
  assert.equal(validatePracticeField(interceptField, "0,043"), true);

  const maxDevField = task.fields.find((f) => f.id === "maxDeviation");
  assert.equal(validatePracticeField(maxDevField, "2,61"), true);

  const limitField = task.fields.find((f) => f.id === "limit");
  assert.equal(validatePracticeField(limitField, "6,25"), true);
});

test("Aufgabe power-7: Referenzwerte stimmen rechnerisch mit den Vorgaben überein", () => {
  const task = PRACTICE_TASKS["power-7"];
  const reg = powerRegression(PRACTICE_POWER_DATA);
  const analysis = analyzePoints(PRACTICE_POWER_DATA, reg);

  assert.ok(Math.abs(reg.a - 32.4201759604) <= 0.03);
  assert.ok(Math.abs(reg.b - (-2.02756854821)) <= 0.005);
  assert.ok(Math.abs(Math.abs(analysis.maxDeviation.deviation) - 4.69316149613) <= 0.08);
  assert.equal(analysis.maxDeviation.r, 15);

  const aField = task.fields.find((f) => f.id === "factorA");
  assert.equal(validatePracticeField(aField, "32,42"), true);

  const nField = task.fields.find((f) => f.id === "exponentN");
  assert.equal(validatePracticeField(nField, "−2,028"), true);
  assert.equal(validatePracticeField(nField, "-2.028"), true);

  const limitField = task.fields.find((f) => f.id === "limit");
  assert.equal(validatePracticeField(limitField, "16,67"), true);
});

test("Aufgabe exponential-7: Referenzwerte stimmen rechnerisch mit den Vorgaben überein", () => {
  const task = PRACTICE_TASKS["exponential-7"];
  const reg = exponentialRegression(PRACTICE_EXPONENTIAL_DATA);
  const analysis = analyzeExponential(PRACTICE_EXPONENTIAL_DATA, reg);
  const times = exponentialTimeMeasures(reg.b);

  assert.ok(Math.abs(reg.a - 5.02072200095) <= 0.005);
  assert.ok(Math.abs(reg.b - (-0.0499279557349)) <= 0.00002);
  assert.ok(Math.abs(times.tau - 20.0288592890) <= 0.08);
  assert.ok(Math.abs(Math.abs(analysis.maxDeviation.deviation) - 1.54194530806) <= 0.08);
  assert.equal(analysis.maxDeviation.t, 48);

  const aField = task.fields.find((f) => f.id === "startA");
  assert.equal(validatePracticeField(aField, "5,021"), true);

  const kField = task.fields.find((f) => f.id === "paramK");
  assert.equal(validatePracticeField(kField, "−0,04993"), true);

  const tauField = task.fields.find((f) => f.id === "tau");
  assert.equal(validatePracticeField(tauField, "20,03"), true);

  const limitField = task.fields.find((f) => f.id === "limit");
  assert.equal(validatePracticeField(limitField, "2,5"), true);
});

test("Befehlsübersicht und Selbstkontrolle entsprechen den Vorgaben", () => {
  assert.ok(CHEAT_SHEET_COMMANDS.length >= 5);
  assert.ok(CHEAT_SHEET_COMMANDS.some((c) => c.command.includes("C1:C7")));
  assert.ok(CHEAT_SHEET_COMMANDS.some((c) => c.command.includes("D1:D7")));

  assert.equal(SELF_CHECK_STATEMENTS.length, 3);
  const ids = SELF_CHECK_STATEMENTS.map((s) => s.id);
  assert.deepEqual(ids, ["cells", "formula", "conclusion"]);
});
test("Übungsabschluss verlangt geprüfte und gültige Werte in allen Feldern", () => {
  const task = PRACTICE_TASKS["linear-7"];
  const answers = Object.fromEntries(task.fields.map((field) => [field.id, String(field.expected)]));
  assert.equal(isTaskNumericallyComplete(task, { answers, completedChecks: [] }), false);
  assert.equal(isTaskNumericallyComplete(task, { answers, completedChecks: task.fields.map((field) => field.id) }), true);
  assert.equal(isTaskNumericallyComplete(task, {
    answers: { ...answers, slope: "0,2" },
    completedChecks: task.fields.map((field) => field.id)
  }), false);
});

test("erste Hilfestufe und Fehlerrückmeldungen verraten keine Referenzlösung", () => {
  for (const task of Object.values(PRACTICE_TASKS)) {
    assert.equal(task.hints[0].title, "1. Vorgehen");
    assert.equal(task.hints[0].items.some((item) => /Trend(?:linie|Pot|Exp)|=\(|\*100|C1:/i.test(item)), false, task.id);
    for (const field of task.fields) {
      assert.doesNotMatch(field.incorrect, /\b(?:0[,.]\d|[1-9]\d*[,.]\d|\d+\s*(?:V|cm|s|%|pF))\b/, `${task.id}/${field.id}`);
    }
  }
});