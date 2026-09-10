import test from "node:test";
import assert from "node:assert/strict";
import {
  EXAMPLE_DATA,
  analyzePoints,
  isWithin,
  parseLocaleNumber,
  powerRegression,
  validatePowerPoints
} from "../regression.js";

test("liest Dezimalkomma, Dezimalpunkt und gruppierte Zahlen", () => {
  assert.equal(parseLocaleNumber("18,6"), 18.6);
  assert.equal(parseLocaleNumber("18.6"), 18.6);
  assert.equal(parseLocaleNumber("1.234,56"), 1234.56);
  assert.equal(parseLocaleNumber("1,234.56"), 1234.56);
  assert.ok(Number.isNaN(parseLocaleNumber("")));
});

test("berechnet die Referenz-Potenzregression wie GeoGebra", () => {
  const regression = powerRegression(EXAMPLE_DATA);
  assert.ok(regression);
  assert.ok(Math.abs(regression.a - 28.9022293453304) < 1e-9);
  assert.ok(Math.abs(regression.b - (-2.0750054529173)) < 1e-9);

  const analysis = analyzePoints(EXAMPLE_DATA, regression);
  assert.equal(analysis.rows.length, 6);
  assert.ok(Math.abs(analysis.rows[0].predicted - 0.3863800509749) < 1e-10);
  assert.equal(analysis.maxDeviation.r, 12.4);
  assert.ok(Math.abs(analysis.maxDeviation.deviation - 15.66371072198) < 1e-9);
});

test("akzeptiert die geplanten Antworttoleranzen", () => {
  assert.equal(isWithin("-2,075", -2.075, 0.01), true);
  assert.equal(isWithin("16.7", 16.7, 0.7), true);
  assert.equal(isWithin("17,5", 16.7, 0.7), false);
});

test("weist unvollständige, nicht positive und ungeeignete Messreihen zurück", () => {
  assert.equal(validatePowerPoints([{ r: 1, f: 2 }, { r: 2, f: 1 }]).valid, false);
  assert.equal(validatePowerPoints([{ r: 1, f: 2 }, { r: 2, f: 1 }, { r: "", f: 0.5 }]).valid, false);
  assert.equal(validatePowerPoints([{ r: 1, f: 2 }, { r: 2, f: -1 }, { r: 3, f: 0.5 }]).valid, false);
  assert.equal(validatePowerPoints([{ r: 1, f: 3 }, { r: 1, f: 2 }, { r: 1, f: 1 }]).valid, false);
});

test("akzeptiert drei bis dreißig positive Messwertpaare mit verschiedenen r-Werten", () => {
  const data = [{ r: "1", f: "3" }, { r: "2,0", f: "1,5" }, { r: "4", f: "0,75" }];
  const result = validatePowerPoints(data);
  assert.equal(result.valid, true);
  assert.deepEqual(result.points, [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }]);
});
