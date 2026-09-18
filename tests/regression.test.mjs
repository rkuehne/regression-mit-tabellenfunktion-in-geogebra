import test from "node:test";
import assert from "node:assert/strict";
import {
  EXAMPLE_DATA,
  UQ_EXAMPLE_DATA,
  analyzePoints,
  analyzeProportionality,
  analyzeUqLinear,
  analyzeUqPower,
  deviationsWithinLimit,
  greatestSingleRelativeError,
  isWithin,
  linearRegression,
  parseLocaleNumber,
  powerRegression,
  relativeExponentDeviation,
  relativeInterceptShare,
  uqPowerRegression,
  validateUqPoints,
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
  assert.ok(analysis.maxDeviation.deviation > 0);
  assert.ok(analysis.maxDeviation.f > analysis.maxDeviation.predicted);
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
  assert.equal(validatePowerPoints([{ r: 1, f: 2 }, { r: 2, f: 0 }, { r: 3, f: 0.5 }]).valid, false);
  assert.equal(validatePowerPoints([{ r: 1, f: 3 }, { r: 1, f: 2 }, { r: 1, f: 1 }]).valid, false);
  assert.equal(validatePowerPoints(Array.from({ length: 31 }, (_, index) => ({ r: index + 1, f: index + 2 }))).valid, false);
});

test("akzeptiert drei bis dreißig positive Messwertpaare mit verschiedenen r-Werten", () => {
  const data = [{ r: "1", f: "3" }, { r: "2,0", f: "1,5" }, { r: "4", f: "0,75" }];
  const result = validatePowerPoints(data);
  assert.equal(result.valid, true);
  assert.deepEqual(result.points, [{ r: 1, f: 3 }, { r: 2, f: 1.5 }, { r: 4, f: 0.75 }]);

  const thirtyRows = Array.from({ length: 30 }, (_, index) => ({ r: index + 1, f: index + 2 }));
  assert.equal(validatePowerPoints(thirtyRows).valid, true);
});

test("berechnet die U-Q-Potenzregression und ihre Modellabweichungen wie GeoGebra", () => {
  const regression = uqPowerRegression(UQ_EXAMPLE_DATA);
  assert.ok(Math.abs(regression.a - 0.03930111363751862) < 1e-12);
  assert.ok(Math.abs(regression.b - 1.0115661789610593) < 1e-12);
  assert.deepEqual(Object.keys(regression).sort(), ["a", "b"]);

  const analysis = analyzeUqPower(UQ_EXAMPLE_DATA, regression);
  assert.equal(analysis.maxDeviation.u, 100);
  assert.ok(Math.abs(analysis.maxDeviation.deviation - 3.736416356841002) < 1e-10);
});

test("berechnet die lineare U-Q-Regression und ihre Modellabweichungen", () => {
  const regression = linearRegression(UQ_EXAMPLE_DATA);
  assert.ok(regression);
  assert.ok(Math.abs(regression.slope - 0.0408) < 1e-14);
  assert.ok(Math.abs(regression.intercept - 0.12) < 1e-12);

  const analysis = analyzeUqLinear(UQ_EXAMPLE_DATA, regression);
  assert.equal(analysis.invalidPrediction, false);
  [2.16, 4.2, 6.24, 8.28, 10.32].forEach((expected, index) => {
    assert.ok(Math.abs(analysis.rows[index].predicted - expected) < 1e-12);
  });
  assert.equal(analysis.maxDeviation.u, 50);
  assert.ok(Math.abs(analysis.maxDeviation.deviation - (-7.407407407407414)) < 1e-12);
  assert.equal(analysis.interceptShare.minQ, 2);
  assert.ok(Math.abs(analysis.interceptShare.percent - 6) < 1e-12);
});

test("verwirft lineare Modellabweichungen mit nicht positivem Modellwert", () => {
  const points = [{ u: 1, q: 10 }, { u: 2, q: 1 }, { u: 3, q: 1 }];
  const regression = linearRegression(points);
  assert.ok(regression);
  assert.equal(analyzeUqLinear(points, regression).invalidPrediction, true);
  assert.equal(linearRegression([{ u: 1, q: 2 }, { u: 1, q: 3 }, { u: 1, q: 4 }]), null);
});

test("berechnet Kapazitäten, Mittelwert und Konstantenabweichungen", () => {
  const analysis = analyzeProportionality(UQ_EXAMPLE_DATA);
  assert.deepEqual(analysis.rows.map(({ capacity }) => capacity), [
    0.04, 0.043, 0.04266666666666667, 0.0415, 0.040799999999999996
  ]);
  assert.ok(Math.abs(analysis.mean - 0.04159333333333333) < 1e-14);
  assert.ok(Math.abs(analysis.meanPf - 415.9333333333333) < 1e-10);
  assert.equal(analysis.maxDeviation.u, 50);
  assert.ok(Math.abs(analysis.maxDeviation.deviation - (-3.8307421061067366)) < 1e-12);
});

test("bestimmt für U-Q den größten relativen Einzelfehler", () => {
  assert.deepEqual(greatestSingleRelativeError(UQ_EXAMPLE_DATA, 5, 0.1), {
    uPercent: 10, qPercent: 5, limit: 10, minU: 50, minQ: 2
  });
});

test("berechnet die methodenspezifischen Abweichungen zur Fehlergrenze", () => {
  assert.ok(Math.abs(relativeExponentDeviation(1.0115661789610593) - 1.1566178961059326) < 1e-12);
  assert.deepEqual(relativeInterceptShare(UQ_EXAMPLE_DATA, 0.12), { percent: 6, minQ: 2 });
  assert.equal(relativeExponentDeviation(1, 0), null);
  assert.equal(relativeInterceptShare([], 0.12), null);
});

test("wertet Abweichungen unterhalb, gleich und oberhalb des größten Einzelfehlers aus", () => {
  assert.equal(deviationsWithinLimit([1.16, 3.74], 10), true);
  assert.equal(deviationsWithinLimit([10], 10), false);
  assert.equal(deviationsWithinLimit([10.01], 10), false);
  assert.equal(deviationsWithinLimit([3.83], Number.NaN), false);
  assert.equal(deviationsWithinLimit([], 10), false);
});

test("validiert positive U-Q-Paare und verschiedene Spannungswerte", () => {
  assert.equal(validateUqPoints([{ u: 1, q: 2 }, { u: 2, q: 4 }]).valid, false);
  assert.equal(validateUqPoints([{ u: 1, q: 2 }, { u: 1, q: 3 }, { u: 1, q: 4 }]).valid, false);
  assert.equal(validateUqPoints([{ u: 1, q: 2 }, { u: 2, q: 4 }, { u: 3, q: 6 }]).valid, true);
  assert.equal(validateUqPoints([{ u: 1, q: 2 }, { u: 2, q: 0 }, { u: 3, q: 6 }]).valid, false);
});
