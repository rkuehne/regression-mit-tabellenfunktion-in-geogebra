import {
  linearRegression,
  analyzeUqLinear,
  powerRegression,
  analyzePoints,
  exponentialRegression,
  analyzeExponential,
  exponentialTimeMeasures,
  parseLocaleNumber,
  isWithin
} from "./regression.js";

export const PRACTICE_LINEAR_DATA = Object.freeze([
  Object.freeze({ u: 40, q: 1.6 }),
  Object.freeze({ u: 80, q: 3.3 }),
  Object.freeze({ u: 120, q: 4.8 }),
  Object.freeze({ u: 160, q: 6.5 }),
  Object.freeze({ u: 200, q: 8.0 }),
  Object.freeze({ u: 240, q: 9.7 }),
  Object.freeze({ u: 280, q: 11.2 })
]);

export const PRACTICE_POWER_DATA = Object.freeze([
  Object.freeze({ r: 6, f: 0.85 }),
  Object.freeze({ r: 8, f: 0.47 }),
  Object.freeze({ r: 10, f: 0.30 }),
  Object.freeze({ r: 12, f: 0.22 }),
  Object.freeze({ r: 15, f: 0.14 }),
  Object.freeze({ r: 18, f: 0.09 }),
  Object.freeze({ r: 22, f: 0.06 })
]);

export const PRACTICE_EXPONENTIAL_RAW = Object.freeze([
  Object.freeze({ t: 0, uc: 0.00, deltaU: 5.00 }),
  Object.freeze({ t: 8, uc: 1.65, deltaU: 3.35 }),
  Object.freeze({ t: 16, uc: 2.73, deltaU: 2.27 }),
  Object.freeze({ t: 24, uc: 3.48, deltaU: 1.52 }),
  Object.freeze({ t: 32, uc: 3.98, deltaU: 1.02 }),
  Object.freeze({ t: 40, uc: 4.31, deltaU: 0.69 }),
  Object.freeze({ t: 48, uc: 4.55, deltaU: 0.45 })
]);

export const PRACTICE_EXPONENTIAL_DATA = Object.freeze(
  PRACTICE_EXPONENTIAL_RAW.map(({ t, deltaU }) => Object.freeze({ t, deltaU }))
);

// Compute unrounded references using project regression algorithms
const computedLinearReg = linearRegression(PRACTICE_LINEAR_DATA);
const computedLinearAnalysis = analyzeUqLinear(PRACTICE_LINEAR_DATA, computedLinearReg);

const computedPowerReg = powerRegression(PRACTICE_POWER_DATA);
const computedPowerAnalysis = analyzePoints(PRACTICE_POWER_DATA, computedPowerReg);

const computedExpReg = exponentialRegression(PRACTICE_EXPONENTIAL_DATA);
const computedExpAnalysis = analyzeExponential(PRACTICE_EXPONENTIAL_DATA, computedExpReg);
const computedExpMeasures = exponentialTimeMeasures(computedExpReg.b);

export const SELF_CHECK_STATEMENTS = Object.freeze([
  Object.freeze({
    id: "cells",
    label: "Ich habe die passenden Zellbereiche verwendet (z. B. C1:C7 für 7 Messpaare)."
  }),
  Object.freeze({
    id: "formula",
    label: "Ich habe die physikalische Formel mit Einheiten aufgeschrieben."
  }),
  Object.freeze({
    id: "conclusion",
    label: "Ich habe meine Schlussfolgerung mit Abweichungen und der verwendeten Vergleichsregel begründet."
  })
]);

export const CHEAT_SHEET_COMMANDS = Object.freeze([
  Object.freeze({
    command: "(A1,B1)",
    description: "Erzeugt aus den Tabellenzellen A1 (x-Wert) und B1 (y-Wert) einen Messpunkt in der Tabellenkalkulation."
  }),
  Object.freeze({
    command: "Q=Trendlinie(C1:C7)",
    description: "Berechnet eine freie lineare Regression an 7 Punkte in Spalte C. GeoGebra benennt die Gerade Q."
  }),
  Object.freeze({
    command: "F(x)=TrendPot(C1:C7)",
    description: "Berechnet eine Potenzregression an 7 Punkte mit positiven Koordinaten."
  }),
  Object.freeze({
    command: "U(x)=TrendExp(D1:D7)",
    description: "Berechnet eine Exponentialregression an 7 Punkte mit positiven y-Werten (Spannungsdifferenzen)."
  }),
  Object.freeze({
    command: "=Q(A1) bzw. =F(A1) bzw. =U(A1)",
    description: "Berechnet den Modellwert für die Stelle aus Spalte A. Bis Zeile 7 nach unten ziehen."
  }),
  Object.freeze({
    command: "=(Messwert - Modellwert) / Modellwert * 100",
    description: "Berechnet die prozentuale relative Modellabweichung (z. B. =(B1-D1)/D1*100 bzw. =(C1-E1)/E1*100)."
  })
]);

export const PRACTICE_TASKS = Object.freeze({
  "linear-7": Object.freeze({
    id: "linear-7",
    title: "Lineare Regression",
    subtitle: "Kondensator · Ladung und Spannung",
    datasetType: "Didaktische Übungsdaten (7 Messpaare)",
    description: "Untersuche die Beziehung zwischen Ladung Q und Spannung U an einem Plattenkondensator. Die Ladung ist in 10⁻⁸ C angegeben.",
    tableHeaders: ["U in V (Spalte A)", "Q/(10⁻⁸ C) (Spalte B)"],
    tableRows: PRACTICE_LINEAR_DATA.map((d) => [d.u, d.q]),
    assignment: "Übertrage die sieben Messpaare, wähle eine passende lineare Regression und bestimme Steigung sowie y-Achsenabschnitt. Berechne Modellwerte und relative Modellabweichungen. Vergleiche beide Beurteilungswerte mit der schulischen Vergleichsregel und schreibe eine physikalische Formel mit Einheiten auf.",
    assumptionsText: "Vorgegebene Annahmen für die schulische Vergleichsregel: \\(\\Delta U = 2\\,\\mathrm{V}\\) und \\(\\Delta Q = 0{,}1\\cdot10^{-8}\\,\\mathrm{C}\\). Bestimme daraus selbst die größte relative Eingangsunsicherheit.",
    fields: Object.freeze([
      Object.freeze({
        id: "slope",
        label: "Numerische Steigung m",
        placeholder: "Ergebnis eingeben",
        expected: computedLinearReg.slope, // 0.040000
        tolerance: 0.0005,
        unit: "",
        correct: "m = 0,0400 stimmt (entspricht 400 pF).",
        incorrect: "Lies den Faktor vor x in der Regressionsgeraden ab."
      }),
      Object.freeze({
        id: "intercept",
        label: "Numerischer Achsenabschnitt b",
        placeholder: "Ergebnis eingeben",
        expected: computedLinearReg.intercept, // 0.042857
        tolerance: 0.005,
        unit: "",
        correct: "b ≈ 0,0429 stimmt.",
        incorrect: "Lies den konstanten Summanden der Regressionsgeraden ab."
      }),
      Object.freeze({
        id: "maxDeviation",
        label: "Größter Betrag der Modellabweichung in %",
        placeholder: "Ergebnis eingeben",
        expected: Math.abs(computedLinearAnalysis.maxDeviation.deviation), // 2.608696
        tolerance: 0.08,
        unit: "%",
        correct: "|Abweichung| ≈ 2,61 % stimmt.",
        incorrect: "Berechne die Beträge der relativen Abweichungen für alle Zeilen und vergleiche sie."
      }),
      Object.freeze({
        id: "atVoltage",
        label: "Zugehöriges U in V",
        placeholder: "Ergebnis eingeben",
        expected: computedLinearAnalysis.maxDeviation.u, // 40
        tolerance: 0.01,
        unit: "V",
        correct: "U = 40 V stimmt.",
        incorrect: "Lies die Spannung aus der Zeile mit dem größten Abweichungsbetrag ab."
      }),
      Object.freeze({
        id: "limit",
        label: "Schulische Vergleichsgrenze in %",
        placeholder: "Ergebnis eingeben",
        expected: 6.25,
        tolerance: 0.03,
        unit: "%",
        correct: "f_max = 6,25 % stimmt.",
        incorrect: "Bilde die beiden relativen Eingangsunsicherheiten und verwende ihren größeren Wert."
      })
    ]),
    hints: Object.freeze([
      Object.freeze({
        title: "1. Vorgehen",
        items: [
          "Übertrage die sieben Spannungs- und Ladungswerte in die Tabelle.",
          "Erzeuge daraus Messpunkte und passe eine Gerade an.",
          "Bestimme Steigung und y-Achsenabschnitt.",
          "Berechne Modellwerte, Modellabweichungen und die Vergleichsgrenze.",
          "Formuliere das Ergebnis mit der Kapazität und den Einheiten."
        ]
      }),
      Object.freeze({
        title: "2. Benötigte Befehle",
        items: [
          "Punkte erzeugen: C1: =(A1,B1) (bis C7 ausfüllen)",
          "Lineare Regression: Q=Trendlinie(C1:C7)",
          "Modellwerte einsetzen: D1: =Q(A1) (bis D7 ausfüllen)",
          "Modellabweichungen: E1: =(B1-D1)/D1*100 (bis E7 ausfüllen)"
        ]
      }),
      Object.freeze({
        title: "3. Referenzergebnisse",
        items: [
          "Steigung m = 0,0400; Kapazität C = 400 pF (da 0,0400 · 10⁻⁸ C/V = 4,00 · 10⁻¹⁰ F).",
          "Achsenabschnitt b ≈ 0,0429 (in physikalischen Einheiten: 4,2857 · 10⁻¹⁰ C).",
          "Größte Modellabweichung bei U = 40 V: Messwert liegt mit −2,61 % unter dem Modellwert.",
          "Relativer Anteil des Achsenabschnitts am kleinsten Messwert: |b|/Qmin · 100 % = 0,04286/1,6 · 100 % ≈ 2,68 %.",
          "Schulische Grenze: max(2/40, 0,1/1,6) · 100 % = 6,25 %.",
          "Urteil: Sowohl größte Modellabweichung (2,61 %) als auch Anteil des Achsenabschnitts (2,68 %) liegen unter 6,25 % und sind nach der schulischen Regel durch Messunsicherheiten erklärbar. Die Daten sind mit Q ∝ U vereinbar."
        ]
      })
    ])
  }),

  "power-7": Object.freeze({
    id: "power-7",
    title: "Potenzregression",
    subtitle: "Abstand und Kraft · Coulomb-Gesetz",
    datasetType: "Didaktische Übungsdaten (7 Messpaare)",
    description: "Prüfe das Abstandsgesetz einer elektrostatischen Kraft F in Abhängigkeit vom Abstand r.",
    tableHeaders: ["r in cm (Spalte A)", "F in mN (Spalte B)"],
    tableRows: PRACTICE_POWER_DATA.map((d) => [d.r, d.f]),
    assignment: "Übertrage die sieben Messpaare, wähle eine Potenzregression und vergleiche ihren Exponenten mit −2. Berechne Modellwerte und relative Modellabweichungen. Vergleiche die größte Abweichung mit der schulischen Vergleichsregel und schreibe die physikalische Formel mit Einheiten auf.",
    assumptionsText: "Vorgegebene Annahmen für die schulische Vergleichsregel: \\(\\Delta r = 0{,}1\\,\\mathrm{cm}\\) und \\(\\Delta F = 0{,}01\\,\\mathrm{mN}\\). Bestimme daraus selbst die größte relative Eingangsunsicherheit.",
    fields: Object.freeze([
      Object.freeze({
        id: "factorA",
        label: "Numerischer Faktor a",
        placeholder: "Ergebnis eingeben",
        expected: computedPowerReg.a, // 32.420176
        tolerance: 0.03,
        unit: "",
        correct: "a ≈ 32,42 stimmt.",
        incorrect: "Lies den Vorfaktor der Potenzfunktion ab."
      }),
      Object.freeze({
        id: "exponentN",
        label: "Potenzexponent n",
        placeholder: "Ergebnis eingeben",
        expected: computedPowerReg.b, // -2.027569
        tolerance: 0.005,
        unit: "",
        correct: "n ≈ −2,028 stimmt.",
        incorrect: "Lies die Hochzahl von x in der Regressionsfunktion ab."
      }),
      Object.freeze({
        id: "maxDeviation",
        label: "Größter Betrag der Modellabweichung in %",
        placeholder: "Ergebnis eingeben",
        expected: Math.abs(computedPowerAnalysis.maxDeviation.deviation), // 4.693161
        tolerance: 0.08,
        unit: "%",
        correct: "|Abweichung| ≈ 4,69 % stimmt.",
        incorrect: "Berechne die Beträge der relativen Abweichungen für alle Zeilen und vergleiche sie."
      }),
      Object.freeze({
        id: "atR",
        label: "Zugehöriges r in cm",
        placeholder: "Ergebnis eingeben",
        expected: computedPowerAnalysis.maxDeviation.r, // 15
        tolerance: 0.01,
        unit: "cm",
        correct: "r = 15 cm stimmt.",
        incorrect: "Lies den Abstand aus der Zeile mit dem größten Abweichungsbetrag ab."
      }),
      Object.freeze({
        id: "limit",
        label: "Schulische Vergleichsgrenze in %",
        placeholder: "Ergebnis eingeben",
        expected: 16.6666667,
        tolerance: 0.08,
        unit: "%",
        correct: "f_max ≈ 16,67 % stimmt.",
        incorrect: "Bilde die beiden relativen Eingangsunsicherheiten und verwende ihren größeren Wert."
      })
    ]),
    hints: Object.freeze([
      Object.freeze({
        title: "1. Vorgehen",
        items: [
          "Übertrage die sieben Abstand- und Kraftwerte in die Tabelle.",
          "Erzeuge daraus Messpunkte und passe eine Potenzfunktion an.",
          "Vergleiche den Potenzexponenten mit dem erwarteten Wert −2.",
          "Berechne Modellwerte, Modellabweichungen und die Vergleichsgrenze.",
          "Formuliere das Ergebnis als Abstandsgesetz mit Einheiten."
        ]
      }),
      Object.freeze({
        title: "2. Benötigte Befehle",
        items: [
          "Punkte erzeugen: C1: =(A1,B1) (bis C7 ausfüllen)",
          "Potenzregression: F(x)=TrendPot(C1:C7)",
          "Modellwerte einsetzen: D1: =F(A1) (bis D7 ausfüllen)",
          "Modellabweichungen: E1: =(B1-D1)/D1*100 (bis E7 ausfüllen)"
        ]
      }),
      Object.freeze({
        title: "3. Referenzergebnisse",
        items: [
          "Regressionsfunktion: F(x) ≈ 32,4202 · x^(−2,0276).",
          "Physikalische Formel: F(r) ≈ 32,42 mN · (r / 1 cm)^(−2,028).",
          "Exponentabweichung gegenüber −2: |−2,0276 − (−2)| / 2 · 100 % ≈ 1,38 %.",
          "Größte Modellabweichung bei r = 15 cm: Messwert liegt mit +4,69 % über dem Modellwert.",
          "Schulische Grenze: max(0,1/6, 0,01/0,06) · 100 % ≈ 16,67 %.",
          "Urteil: Exponentabweichung (1,38 %) und Modellabweichung (4,69 %) liegen weit unter 16,67 %. Die Daten sind mit F ∝ 1/r² vereinbar."
        ]
      })
    ])
  }),

  "exponential-7": Object.freeze({
    id: "exponential-7",
    title: "Exponentialregression",
    subtitle: "Kondensator-Aufladung · U₀ = 5,00 V",
    datasetType: "Didaktische Übungsdaten (7 Messpaare)",
    description: "Untersuche den zeitlichen Aufladevorgang eines Kondensators bei U₀ = 5,00 V über die Spannungsdifferenz ΔU = U₀ − U_C.",
    tableHeaders: ["t in s (Spalte A)", "U_C in V (Spalte B)"],
    tableRows: PRACTICE_EXPONENTIAL_RAW.map((d) => [d.t, d.uc]),
    assignment: "Berechne zunächst ΔU = U₀ − U_C für alle sieben Messpaare. Wähle eine passende Exponentialregression, bestimme A, k und die Zeitkonstante τ. Berechne Modellwerte und relative Modellabweichungen. Vergleiche die größte Abweichung mit der schulischen Vergleichsregel und schreibe die physikalische Formel mit Einheiten auf.",
    assumptionsText: "Vorgegebene Annahmen für die schulische Vergleichsregel: absolute Unsicherheit der Spannungsdifferenz \\(0{,}01\\,\\mathrm{V}\\) und Zeitunsicherheit \\(0{,}2\\,\\mathrm{s}\\). Bestimme die Vergleichsgrenze selbst; für t = 0 wird kein relativer Zeitanteil gebildet.",
    fields: Object.freeze([
      Object.freeze({
        id: "startA",
        label: "Anfangswert A in V",
        placeholder: "Ergebnis eingeben",
        expected: computedExpReg.a, // 5.020722
        tolerance: 0.005,
        unit: "V",
        correct: "A ≈ 5,021 V stimmt.",
        incorrect: "Lies den Vorfaktor der Exponentialfunktion ab."
      }),
      Object.freeze({
        id: "paramK",
        label: "Exponentialparameter k in s⁻¹",
        placeholder: "Ergebnis eingeben",
        expected: computedExpReg.b, // -0.049928
        tolerance: 0.00002,
        unit: "s⁻¹",
        correct: "k ≈ −0,049928 s⁻¹ stimmt.",
        incorrect: "Lies den Faktor von t im Exponenten ab und beachte sein Vorzeichen."
      }),
      Object.freeze({
        id: "tau",
        label: "Zeitkonstante τ in s",
        placeholder: "Ergebnis eingeben",
        expected: computedExpMeasures.tau, // 20.028859
        tolerance: 0.08,
        unit: "s",
        correct: "τ ≈ 20,03 s stimmt.",
        incorrect: "Berechne die Zeitkonstante mit τ = −1/k aus deinem Regressionsparameter."
      }),
      Object.freeze({
        id: "maxDeviation",
        label: "Größter Betrag der Modellabweichung in %",
        placeholder: "Ergebnis eingeben",
        expected: Math.abs(computedExpAnalysis.maxDeviation.deviation), // 1.541945
        tolerance: 0.08,
        unit: "%",
        correct: "|Abweichung| ≈ 1,54 % stimmt.",
        incorrect: "Berechne die Beträge der relativen Abweichungen für alle Zeilen und vergleiche sie."
      }),
      Object.freeze({
        id: "atT",
        label: "Zugehöriges t in s",
        placeholder: "Ergebnis eingeben",
        expected: computedExpAnalysis.maxDeviation.t, // 48
        tolerance: 0.01,
        unit: "s",
        correct: "t = 48 s stimmt.",
        incorrect: "Lies den Zeitpunkt aus der Zeile mit dem größten Abweichungsbetrag ab."
      }),
      Object.freeze({
        id: "limit",
        label: "Schulische Vergleichsgrenze in %",
        placeholder: "Ergebnis eingeben",
        expected: 2.5,
        tolerance: 0.03,
        unit: "%",
        correct: "f_max = 2,5 % stimmt.",
        incorrect: "Bilde die relativen Eingangsunsicherheiten; bei t = 0 zählt kein relativer Zeitanteil."
      })
    ]),
    hints: Object.freeze([
      Object.freeze({
        title: "1. Vorgehen",
        items: [
          "Übertrage Zeit und Kondensatorspannung in die Tabelle.",
          "Berechne daraus die Spannungsdifferenz ΔU und erzeuge Messpunkte.",
          "Passe eine Exponentialfunktion an und bestimme A, k sowie τ.",
          "Berechne Modellwerte, Modellabweichungen und die Vergleichsgrenze.",
          "Formuliere das Auflademodell mit Einheiten."
        ]
      }),
      Object.freeze({
        title: "2. Benötigte Befehle",
        items: [
          "Spannungsdifferenz: C1: =5.00-B1 (bis C7 ausfüllen)",
          "Punkte erzeugen: D1: =(A1,C1) (bis D7 ausfüllen)",
          "Exponentialregression: U(x)=TrendExp(D1:D7)",
          "Modellwerte einsetzen: E1: =U(A1) (bis E7 ausfüllen)",
          "Modellabweichungen: F1: =(C1-E1)/E1*100 (bis F7 ausfüllen)",
          "Zeitkonstante: tau = -1/(-0.04993)"
        ]
      }),
      Object.freeze({
        title: "3. Referenzergebnisse",
        items: [
          "Anfangswert A ≈ 5,0207 V (weicht um 0,41 % vom Vorgabewert U₀ = 5,00 V ab).",
          "Parameter k ≈ −0,049928 s⁻¹; Zeitkonstante τ = −1/k ≈ 20,03 s; Halbwertszeit t₁/₂ ≈ 13,88 s.",
          "Physikalische Formel: ΔU(t) ≈ 5,021 V · e^(−0,04993 s⁻¹ · t).",
          "Größte Modellabweichung bei t = 48 s: Messwert liegt mit −1,54 % unter dem Modellwert.",
          "Schulische Grenze: max(0,2/8, 0,01/0,45) · 100 % = 2,5 %.",
          "Urteil: Sowohl die Anfangswertabweichung (0,41 %) als auch die größte Modellabweichung (1,54 %) liegen unter der Grenze von 2,5 %. Die Daten sind mit dem Exponentialmodell vereinbar."
        ]
      })
    ])
  })
});

export function validatePracticeField(field, value) {
  if (value === undefined || value === null || String(value).trim() === "") return false;
  return isWithin(value, field.expected, field.tolerance);
}

export function isTaskNumericallyComplete(taskConfig, taskState) {
  if (!taskState || !taskState.answers) return false;
  return taskConfig.fields.every((field) => taskState.completedChecks?.includes(field.id) && validatePracticeField(field, taskState.answers[field.id]));
}
