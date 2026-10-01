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
    assignment: "Erstelle in Spalte C die Punktliste mit =(A1,B1), berechne in der Eingabezeile eine freie lineare Regression mit Q=Trendlinie(C1:C7), deute die Steigung als Kapazität, bestimme in Spalte D die Modellwerte mit =Q(A1) und in Spalte E die relativen Modellabweichungen mit =(B1-D1)/D1*100. Vergleiche den größten Betrag der Modellabweichung sowie den Achsenabschnitt mit der schulischen Vergleichsgrenze und dokumentiere dein Ergebnis.",
    assumptionsText: "Vorgegebene Annahmen für die schulische Regel: \\(\\Delta U = 2\\,\\mathrm{V}\\) und \\(\\Delta Q = 0{,}1\\cdot10^{-8}\\,\\mathrm{C}\\). Grenze: \\(f_{\\max} = \\max\\left(\\frac{2}{40},\\frac{0{,}1}{1{,}6}\\right)\\cdot100\\,\\% = 6{,}25\\,\\%\\).",
    fields: Object.freeze([
      Object.freeze({
        id: "slope",
        label: "Numerische Steigung m",
        placeholder: "Ergebnis eingeben",
        expected: computedLinearReg.slope, // 0.040000
        tolerance: 0.0005,
        unit: "",
        correct: "m = 0,0400 stimmt (entspricht 400 pF).",
        incorrect: "Prüfe die Steigung der Geraden Q aus Q=Trendlinie(C1:C7)."
      }),
      Object.freeze({
        id: "intercept",
        label: "Numerischer Achsenabschnitt b",
        placeholder: "Ergebnis eingeben",
        expected: computedLinearReg.intercept, // 0.042857
        tolerance: 0.005,
        unit: "",
        correct: "b ≈ 0,0429 stimmt.",
        incorrect: "Prüfe den y-Achsenabschnitt aus der Geradengleichung (ca. 0,0429)."
      }),
      Object.freeze({
        id: "maxDeviation",
        label: "Größter Betrag der Modellabweichung in %",
        placeholder: "Ergebnis eingeben",
        expected: Math.abs(computedLinearAnalysis.maxDeviation.deviation), // 2.608696
        tolerance: 0.08,
        unit: "%",
        correct: "|Abweichung| ≈ 2,61 % stimmt.",
        incorrect: "Berechne |(B1-D1)/D1*100| für alle Zeilen (Maximum liegt bei 40 V)."
      }),
      Object.freeze({
        id: "atVoltage",
        label: "Zugehöriges U in V",
        placeholder: "Ergebnis eingeben",
        expected: computedLinearAnalysis.maxDeviation.u, // 40
        tolerance: 0.01,
        unit: "V",
        correct: "U = 40 V stimmt.",
        incorrect: "Bei welcher Spannung tritt der größte Betrag der Abweichung auf? (40 V)"
      }),
      Object.freeze({
        id: "limit",
        label: "Schulische Vergleichsgrenze in %",
        placeholder: "Ergebnis eingeben",
        expected: 6.25,
        tolerance: 0.03,
        unit: "%",
        correct: "f_max = 6,25 % stimmt.",
        incorrect: "Berechne max(2/40, 0,1/1,6) · 100 = 6,25 %."
      })
    ]),
    hints: Object.freeze([
      Object.freeze({
        title: "1. Vorgehen",
        items: [
          "Trage die Werte in die Spalten A (U in V) und B (Q in 10⁻⁸ C) von Zeile 1 bis 7 ein.",
          "Erzeuge in Spalte C die Punkte mit =(A1,B1) und ziehe die Formel bis C7 nach unten.",
          "Berechne in der Eingabezeile die Regressionsgerade: Q=Trendlinie(C1:C7).",
          "Berechne in Spalte D die Modellwerte: =Q(A1) von D1 bis D7.",
          "Berechne in Spalte E die relativen Modellabweichungen: =(B1-D1)/D1*100 von E1 bis E7.",
          "Bestimme den größten Betrag in Spalte E und notiere Betrag, Spannung und Vorzeichen."
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
    assignment: "Erstelle in Spalte C die Punktliste mit =(A1,B1), berechne eine Potenzregression mit F(x)=TrendPot(C1:C7), vergleiche den Exponenten n mit −2, bestimme in Spalte D die Modellwerte mit =F(A1) und in Spalte E die relativen Modellabweichungen mit =(B1-D1)/D1*100. Vergleiche die größte Modellabweichung mit der schulischen Vergleichsgrenze und dokumentiere die physikalische Formel mit Einheiten.",
    assumptionsText: "Vorgegebene Annahmen für die schulische Regel: \\(\\Delta r = 0{,}1\\,\\mathrm{cm}\\) und \\(\\Delta F = 0{,}01\\,\\mathrm{mN}\\). Größte relative Eingangsunsicherheit: \\(f_{\\max} = \\max\\left(\\frac{0{,}1}{6},\\frac{0{,}01}{0{,}06}\\right)\\cdot100\\,\\% = 16{,}67\\,\\%\\).",
    fields: Object.freeze([
      Object.freeze({
        id: "factorA",
        label: "Numerischer Faktor a",
        placeholder: "Ergebnis eingeben",
        expected: computedPowerReg.a, // 32.420176
        tolerance: 0.03,
        unit: "",
        correct: "a ≈ 32,42 stimmt.",
        incorrect: "Prüfe den Vorfaktor aus F(x)=TrendPot(C1:C7) (ca. 32,42)."
      }),
      Object.freeze({
        id: "exponentN",
        label: "Potenzexponent n",
        placeholder: "Ergebnis eingeben",
        expected: computedPowerReg.b, // -2.027569
        tolerance: 0.005,
        unit: "",
        correct: "n ≈ −2,028 stimmt.",
        incorrect: "Prüfe den Exponenten von x aus der Regressionsfunktion (ca. −2,028)."
      }),
      Object.freeze({
        id: "maxDeviation",
        label: "Größter Betrag der Modellabweichung in %",
        placeholder: "Ergebnis eingeben",
        expected: Math.abs(computedPowerAnalysis.maxDeviation.deviation), // 4.693161
        tolerance: 0.08,
        unit: "%",
        correct: "|Abweichung| ≈ 4,69 % stimmt.",
        incorrect: "Berechne |(B1-D1)/D1*100| für alle Zeilen (Maximum liegt bei 15 cm)."
      }),
      Object.freeze({
        id: "atR",
        label: "Zugehöriges r in cm",
        placeholder: "Ergebnis eingeben",
        expected: computedPowerAnalysis.maxDeviation.r, // 15
        tolerance: 0.01,
        unit: "cm",
        correct: "r = 15 cm stimmt.",
        incorrect: "Bei welchem Abstand tritt der größte Betrag der Abweichung auf? (15 cm)"
      }),
      Object.freeze({
        id: "limit",
        label: "Schulische Vergleichsgrenze in %",
        placeholder: "Ergebnis eingeben",
        expected: 16.6666667,
        tolerance: 0.08,
        unit: "%",
        correct: "f_max ≈ 16,67 % stimmt.",
        incorrect: "Berechne max(0,1/6, 0,01/0,06) · 100 ≈ 16,67 %."
      })
    ]),
    hints: Object.freeze([
      Object.freeze({
        title: "1. Vorgehen",
        items: [
          "Trage die Werte in die Spalten A (r in cm) und B (F in mN) von Zeile 1 bis 7 ein.",
          "Erzeuge in Spalte C die Punkte mit =(A1,B1) und ziehe die Formel bis C7 nach unten.",
          "Berechne in der Eingabezeile die Potenzregression: F(x)=TrendPot(C1:C7).",
          "Berechne in Spalte D die Modellwerte: =F(A1) von D1 bis D7.",
          "Berechne in Spalte E die relativen Modellabweichungen: =(B1-D1)/D1*100 von E1 bis E7.",
          "Bestimme den größten Betrag in Spalte E und vergleiche Exponent und Abweichung mit der Grenze."
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
    tableHeaders: ["t in s (Spalte A)", "U_C in V (Spalte B)", "ΔU in V (Spalte C)"],
    tableRows: PRACTICE_EXPONENTIAL_RAW.map((d) => [d.t, d.uc, d.deltaU]),
    assignment: "Berechne in Spalte C die Spannungsdifferenzen mit =5.00-B1, erstelle in Spalte D die Punkte mit =(A1,C1), berechne eine Exponentialregression mit U(x)=TrendExp(D1:D7), bestimme die Zeitkonstante τ = −1/k, berechne in Spalte E die Modellwerte mit =U(A1) und in Spalte F die relativen Modellabweichungen mit =(C1-E1)/E1*100. Vergleiche die größte Modellabweichung mit der Vergleichsgrenze und dokumentiere dein Ergebnis.",
    assumptionsText: "Vorgegebene Annahmen für die schulische Regel: absolute Unsicherheit der Spannungsdifferenz \\(0{,}01\\,\\mathrm{V}\\); Zeitunsicherheit \\(0{,}2\\,\\mathrm{s}\\). Grenze: \\(f_{\\max} = \\max\\left(\\frac{0{,}2}{8},\\frac{0{,}01}{0{,}45}\\right)\\cdot100\\,\\% = 2{,}5\\,\\%\\). (Keine Division durch \\(t=0\\)).",
    fields: Object.freeze([
      Object.freeze({
        id: "startA",
        label: "Anfangswert A in V",
        placeholder: "Ergebnis eingeben",
        expected: computedExpReg.a, // 5.020722
        tolerance: 0.005,
        unit: "V",
        correct: "A ≈ 5,021 V stimmt.",
        incorrect: "Prüfe den Vorfaktor A aus U(x)=TrendExp(D1:D7) (ca. 5,021 V)."
      }),
      Object.freeze({
        id: "paramK",
        label: "Exponentialparameter k in s⁻¹",
        placeholder: "Ergebnis eingeben",
        expected: computedExpReg.b, // -0.049928
        tolerance: 0.00002,
        unit: "s⁻¹",
        correct: "k ≈ −0,049928 s⁻¹ stimmt.",
        incorrect: "Prüfe den Parameter k im Exponenten von e (ca. −0,04993 s⁻¹)."
      }),
      Object.freeze({
        id: "tau",
        label: "Zeitkonstante τ in s",
        placeholder: "Ergebnis eingeben",
        expected: computedExpMeasures.tau, // 20.028859
        tolerance: 0.08,
        unit: "s",
        correct: "τ ≈ 20,03 s stimmt.",
        incorrect: "Berechne τ = −1/k (ca. 20,03 s)."
      }),
      Object.freeze({
        id: "maxDeviation",
        label: "Größter Betrag der Modellabweichung in %",
        placeholder: "Ergebnis eingeben",
        expected: Math.abs(computedExpAnalysis.maxDeviation.deviation), // 1.541945
        tolerance: 0.08,
        unit: "%",
        correct: "|Abweichung| ≈ 1,54 % stimmt.",
        incorrect: "Berechne |(C1-E1)/E1*100| für alle Zeilen (Maximum liegt bei 48 s)."
      }),
      Object.freeze({
        id: "atT",
        label: "Zugehöriges t in s",
        placeholder: "Ergebnis eingeben",
        expected: computedExpAnalysis.maxDeviation.t, // 48
        tolerance: 0.01,
        unit: "s",
        correct: "t = 48 s stimmt.",
        incorrect: "Zu welchem Zeitpunkt tritt der größte Betrag auf? (48 s)"
      }),
      Object.freeze({
        id: "limit",
        label: "Schulische Vergleichsgrenze in %",
        placeholder: "Ergebnis eingeben",
        expected: 2.5,
        tolerance: 0.03,
        unit: "%",
        correct: "f_max = 2,5 % stimmt.",
        incorrect: "Berechne max(0,2/8, 0,01/0,45) · 100 = 2,5 %."
      })
    ]),
    hints: Object.freeze([
      Object.freeze({
        title: "1. Vorgehen",
        items: [
          "Trage Zeit t (0 bis 48 s) in Spalte A und U_C (0,00 bis 4,55 V) in Spalte B ein.",
          "Berechne in Spalte C die Spannungsdifferenzen: =5.00-B1 von C1 bis C7.",
          "Erzeuge in Spalte D die Punkte: =(A1,C1) von D1 bis D7.",
          "Berechne in der Eingabezeile: U(x)=TrendExp(D1:D7).",
          "Berechne die Zeitkonstante τ = −1/k in der Eingabezeile.",
          "Berechne in Spalte E die Modellwerte: =U(A1) von E1 bis E7.",
          "Berechne in Spalte F die Modellabweichungen: =(C1-E1)/E1*100 von F1 bis F7.",
          "Bestimme den größten Betrag in Spalte F und prüfe die Anfangswertabweichung |A − 5,00|/5,00 · 100 %."
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
  return taskConfig.fields.every((field) => validatePracticeField(field, taskState.answers[field.id]));
}
