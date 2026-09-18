import {
  CHARGING_ANALYSIS_DATA,
  CHARGING_FIT_DATA,
  CHARGING_RAW_DATA,
  EXAMPLE_DATA,
  UQ_EXAMPLE_DATA
} from "./regression.js";

export const UQ_SHARED_REQUIREMENT_ID = "uq-largest-single-error";

const IMAGES = Object.freeze({
  table: Object.freeze({
    src: "./assets/steps/01-messwerte.png",
    width: 469,
    height: 600,
    alt: "GeoGebra Tabellenkalkulation mit sechs Abstandswerten in Spalte A und sechs Kraftwerten in Spalte B.",
    caption: "Die richtige Ansicht erkennst du am violetten Symbol Tabellenkalkulation. Die Messwerte stehen in A1:B6.",
    highlights: [{ x: 32, y: 28, width: 66, height: 56, label: "A1:B6" }]
  }),
  firstPoint: Object.freeze({
    src: "./assets/steps/02-punkt-c1.png", width: 628, height: 478,
    alt: "In der GeoGebra-Zelle C1 wird die Formel gleich Klammer auf A1 Komma B1 Klammer zu eingegeben.",
    caption: "C1 verbindet den Abstand aus A1 mit der Kraft aus B1 zum Punkt (8, 0.37).",
    highlights: [{ x: 70, y: 34, width: 26, height: 11, label: "C1" }]
  }),
  filledPoints: Object.freeze({
    src: "./assets/steps/03-punkte-ausfuellen.png", width: 632, height: 545,
    alt: "GeoGebra-Tabelle mit sechs erzeugten Punkten in der Spalte C.",
    caption: "Beim Ausfüllen werden die Zellbezüge zeilenweise angepasst: aus A1/B1 wird A2/B2 und so weiter.",
    highlights: [{ x: 70, y: 36, width: 25, height: 51, label: "C1:C6" }]
  }),
  fillHandle: Object.freeze({
    src: "./assets/steps/03-ausfuellgriff.png", width: 1100, height: 620,
    alt: "GeoGebra-Tabellenkalkulation mit ausgewählter Zelle C1. Der kleine violette Ausfüllgriff am unteren rechten Zellenrand ist durch eine seitliche Vergrößerung erklärt.",
    caption: "Setze den Finger auf das kleine violette Quadrat an C1, halte kurz und ziehe anschließend bis C6.",
    highlights: []
  }),
  save: Object.freeze({
    src: "./assets/steps/04-zwischenstand-sichern.png", width: 720, height: 530,
    alt: "Geöffnetes GeoGebra-Menü mit dem Eintrag Teilen.",
    caption: "Über Teilen gelangst du auf dem iPad zu In Dateien sichern.",
    highlights: [{ x: 3, y: 54, width: 48, height: 18, label: "Teilen" }]
  }),
  regression: Object.freeze({
    src: "./assets/steps/05-potenzregression.png", width: 954, height: 525,
    alt: "GeoGebra-Algebraansicht mit TrendPot von C1 bis C6 und der berechneten Potenzfunktion.",
    caption: "GeoGebra berechnet eine Potenzfunktion, die sich den sechs Punkten möglichst gut annähert.",
    highlights: [{ x: 15, y: 13, width: 78, height: 21, label: "Regression F" }]
  }),
  predictions: Object.freeze({
    src: "./assets/steps/06-regressionswerte.png", width: 987, height: 623,
    alt: "GeoGebra-Tabelle mit der Formel gleich F von A1 in Zelle D1.",
    caption: "Spalte B enthält Messwerte; Spalte D enthält die zugehörigen Werte des Modells.",
    highlights: [{ x: 61, y: 20, width: 17, height: 9, label: "D1" }]
  }),
  deviationFormula: Object.freeze({
    src: "./assets/steps/07-abweichungsformel.png", width: 1077, height: 460,
    alt: "GeoGebra-Tabelle mit der Formel für die prozentuale Modellabweichung in Zelle E1.",
    caption: "In E1 wird die relative Modellabweichung in Prozent berechnet.",
    highlights: [{ x: 73, y: 22, width: 21, height: 15, label: "Formel in E1" }]
  }),
  deviations: Object.freeze({
    src: "./assets/steps/08-abweichungen.png", width: 1080, height: 505,
    alt: "GeoGebra-Tabelle mit sechs berechneten prozentualen Modellabweichungen in Spalte E.",
    caption: "Der größte Betrag der Modellabweichung liegt in Zeile 4 bei rund 15,7 Prozent.",
    highlights: [{ x: 73, y: 22, width: 21, height: 56, label: "E1:E6" }]
  }),
  curve: Object.freeze({
    src: "./assets/steps/09-regressionskurve.png", width: 996, height: 849,
    alt: "GeoGebra-Grafik mit sechs Messpunkten und einer fallenden roten Potenz-Regressionskurve.",
    caption: "Die Messpunkte liegen nicht exakt auf der Kurve, folgen aber demselben fallenden Verlauf.",
    highlights: [{ x: 32, y: 3, width: 55, height: 79, label: "Punkte und Kurve" }]
  })
});

const CHARGING_IMAGES = Object.freeze({
  deltaFormula: Object.freeze({
    src: "./assets/steps/charging/01-spannungsdifferenz-formel-bis-80s.png", width: 640, height: 579,
    alt: "GeoGebra-Tabellenkalkulation mit Zeitwerten, Kondensatorspannungen und der Eingabe gleich 3.78 minus B1 in Zelle C1.",
    caption: "In C1 wird aus der Gesamtspannung 3,780 V und der gemessenen Kondensatorspannung die Spannungsdifferenz berechnet.",
    highlights: [{ x: 69, y: 29, width: 24, height: 10, label: "C1: 3.780 − B1" }]
  }),
  deltaValues: Object.freeze({
    src: "./assets/steps/charging/02-spannungsdifferenzen-bis-80s.png", width: 631, height: 584,
    alt: "GeoGebra-Tabelle mit neun berechneten Spannungsdifferenzen von 3,780 Volt bis 0,332 Volt in Spalte C.",
    caption: "Nach dem Ausfüllen enthält Spalte C die abnehmenden Werte von ΔU = U₀ − U_C für 0 bis 80 s.",
    highlights: [{ x: 72, y: 29, width: 24, height: 70, label: "ΔU in C1:C9" }]
  }),
  firstPoint: Object.freeze({
    src: "./assets/steps/charging/03-erster-zeit-punkt.png", width: 819, height: 537,
    alt: "GeoGebra-Tabelle mit der Eingabe gleich Klammer auf A1 Komma C1 Klammer zu in Zelle D1.",
    caption: "D1 verbindet den Zeitpunkt aus A1 mit der Spannungsdifferenz aus C1 zum Punkt (0, 3.78).",
    highlights: [{ x: 69, y: 30, width: 23, height: 12, label: "Punkt in D1" }]
  }),
  points: Object.freeze({
    src: "./assets/steps/charging/04-zeit-punkte-bis-80s.png", width: 808, height: 572,
    alt: "GeoGebra-Tabelle mit den neun verwendeten Zeit-Spannungs-Punkten von D1 bis D9.",
    caption: "Nach der Datenprüfung enthält der Arbeitsbereich nur die Regressionspunkte D1:D9.",
    highlights: [{ x: 75, y: 29, width: 18, height: 71, label: "Punkte D1:D9" }]
  }),
  regression: Object.freeze({
    src: "./assets/steps/charging/05-exponentialregression.png", width: 756, height: 264,
    alt: "GeoGebra-Algebraansicht mit U von x gleich TrendExp von D1 bis D9 und der berechneten Exponentialfunktion.",
    caption: "TrendExp wertet bewusst D1:D9 aus; das ungeklärte zehnte Wertepaar gehört nicht zur Regression.",
    highlights: [{ x: 21, y: 29, width: 76, height: 35, label: "U(x) = TrendExp(D1:D9)" }]
  }),
  curveWithCheckValue: Object.freeze({
    src: "./assets/steps/charging/06-regressionskurve-mit-pruefwert.png", width: 1876, height: 754,
    alt: "GeoGebra mit Tabelle und exponentieller Regressionskurve; ein zusätzlicher Punkt bei 100 Sekunden liegt sichtbar abseits der Kurve.",
    caption: "Der zusätzliche Punkt bei 100 s liegt deutlich oberhalb des aus D1:D9 berechneten Verlaufs und löst die Datenprüfung aus.",
    highlights: [{ x: 49, y: 8, width: 50, height: 90, label: "Kurve und auffälliger Prüfpunkt" }]
  }),
  modelFormula: Object.freeze({
    src: "./assets/steps/charging/07-modellwert-formel-bis-80s.png", width: 920, height: 591,
    alt: "GeoGebra-Tabelle mit der Eingabe gleich U von A1 in Zelle E1.",
    caption: "U(A1) setzt den Zeitpunkt aus Spalte A in die Regressionsfunktion ein.",
    highlights: [{ x: 78, y: 30, width: 17, height: 10, label: "E1: U(A1)" }]
  }),
  modelValues: Object.freeze({
    src: "./assets/steps/charging/08-modellwerte-bis-80s.png", width: 984, height: 588,
    alt: "GeoGebra-Tabelle mit den neun berechneten Werten der Exponentialfunktion in Spalte E.",
    caption: "Die Modellwerte für die akzeptierten Messpunkte stehen in E1:E9.",
    highlights: [{ x: 77, y: 23, width: 18, height: 76, label: "Modellwerte E1:E9" }]
  }),
  historicalDeviationFormula: Object.freeze({
    src: "./assets/steps/charging/09-historische-abweichungsformel.png", width: 1302, height: 647,
    alt: "Historische GeoGebra-Aufnahme mit einer prozentualen Abweichungsformel in Spalte F, deren Vorzeichen gegenüber dem Kurs vertauscht ist.",
    caption: "Achtung: Diese historische Aufnahme verwendet Modellwert minus Messwert. Im Kurs gilt einheitlich Messwert minus Modellwert; kopiere deshalb die Kursformel.",
    highlights: [{ x: 72, y: 27, width: 16, height: 10, label: "Historische Vorzeichenfolge" }]
  }),
  anomaly: Object.freeze({
    src: "./assets/steps/charging/10-auffaellige-modellabweichung.png", width: 1221, height: 696,
    alt: "GeoGebra-Tabelle mit einer sehr großen Abweichung von rund minus 42,6 Prozent für den protokollierten Wert bei 100 Sekunden.",
    caption: "Die Abweichung von etwa 42,6 % macht den letzten Zeitwert prüfbedürftig; sie ist kein automatischer Löschgrund.",
    highlights: [{ x: 76, y: 81, width: 18, height: 9, label: "auffällige Zeile" }]
  }),
  plausibleNinety: Object.freeze({
    src: "./assets/steps/charging/11-plausibilitaetsvergleich-90s.png", width: 1238, height: 640,
    alt: "GeoGebra-Tabelle, in der der letzte Zeitpunkt versuchsweise mit 90 statt 100 Sekunden bezeichnet ist.",
    caption: "90 s wäre rechnerisch plausibler, darf ohne Originalprotokoll aber nicht als nachträgliche Korrektur übernommen werden.",
    highlights: [{ x: 12, y: 91, width: 13, height: 8, label: "nur Plausibilitätsvergleich" }]
  })
});

const option = (value, label) => ({ value, label });

export const LESSON_STEPS = Object.freeze([
  {
    id: "context", shortTitle: "Messidee", title: "Fragestellung und Messdaten verstehen",
    goal: "Du verstehst, wie Messdaten zur Prüfung eines theoretischen Zusammenhangs genutzt werden, und erkennst die Bedeutung von r und F.",
    why: "In der Physik wird geprüft, ob Messdaten mit einem theoretisch vorhergesagten Zusammenhang vereinbar sind. Eine mathematische Formel beschreibt das ideale Modell exakt; reale Messergebnisse sind dagegen stets mit Unsicherheiten behaftet. Deshalb ist nicht zu erwarten, dass alle Messpunkte genau auf dem theoretischen Graphen liegen. Wir untersuchen stattdessen, ob Verlauf, Regressionsfunktion und Abweichungen im Rahmen der Messunsicherheit mit der theoretischen Vorhersage übereinstimmen. So kann ein Experiment ein Modell stützen oder Hinweise liefern, die gegen das Modell sprechen – mathematisch beweisen kann es das Modell nicht.",
    concepts: [
      { term: "Messwert", text: "Der Zahlenwert einer Messgröße mit Einheit, zum Beispiel F = 0,37 mN. Zu einem vollständigen Messergebnis gehört außerdem eine Angabe zur Messunsicherheit." },
      { term: "Messpaar", text: "Zwei Werte derselben Messung: Abstand r und Kraft F." },
      { term: "Einheit", text: "r wird in Zentimetern (cm), F in Millinewton (mN) angegeben." },
      { term: "Coulombgesetz", text: "Bei unveränderten Ladungen sagt es für die elektrische Kraft einen Verlauf proportional zu 1/r² voraus." }
    ],
    workedExample: { title: "Die Messreihe einordnen", lines: ["Die Beispieldaten stammen aus einem Versuch zum Coulombgesetz mit einer Drehwaage: Gemessen wurden der Abstand r und die elektrische Kraft F.", "Im Unterricht kam ein Millinewtonmeter mit CASSY zum Einsatz. Da Versuchsaufbau, Messbereich und Messgerät die Zahlenwerte beeinflussen, können dort andere Größenordnungen auftreten – der mathematische Auswertungsweg bleibt dennoch derselbe.", "Die erste Messung lautet r = 8 cm und F = 0,37 mN; bei r = 18,6 cm beträgt die Kraft nur noch 0,06 mN."] },
    remember: "Messpunkte müssen nicht exakt auf dem theoretischen Graphen liegen. Entscheidend ist, ob Verlauf und Abweichungen unter Berücksichtigung der Messunsicherheit mit dem Modell vereinbar sind.",
    actionHeading: "Bevor du GeoGebra öffnest",
    actions: ["Lies die erste und die letzte Zeile der Messwerttabelle.", "Achte auf die Einheiten: r in cm und F in mN.", "Vergleiche den Verlauf mit der Erwartung des Coulombgesetzes: F ist proportional zu 1/r².", "Formuliere eine Vermutung: Was geschieht mit F, wenn r zunimmt?"],
    dataTable: EXAMPLE_DATA, formula: null, images: [],
    troubleshooting: "Wenn dir Dezimalpunkte ungewohnt sind: 0.37 bedeutet dasselbe wie 0,37. Die Kontrollfelder akzeptieren Punkt und Komma.",
    mistake: "Vergleiche nur Werte derselben Zeile. r = 8 cm gehört zu F = 0,37 mN.",
    check: { prompt: "Prüfe, ob du Messidee und Verlauf verstanden hast.", fields: [
      { id: "trend", kind: "result", type: "choice", label: "Was zeigt die Messreihe insgesamt?", expected: "decreases", options: [option("", "Bitte auswählen …"), option("decreases", "Wenn r zunimmt, wird F kleiner."), option("increases", "Wenn r zunimmt, wird F größer."), option("constant", "F bleibt ungefähr konstant.")], feedback: { correct: "Richtig: Die Kraft nimmt mit wachsendem Abstand ab.", incorrect: "Vergleiche erste und letzte Zeile: r steigt, F sinkt." } },
      { id: "pair", kind: "understanding", type: "choice", label: "Welches ist ein zusammengehöriges Messpaar?", expected: "correct", options: [option("", "Bitte auswählen …"), option("correct", "r = 12,4 cm und F = 0,18 mN"), option("wrong-a", "r = 12,4 cm und F = 0,06 mN"), option("wrong-b", "r = 0,18 cm und F = 12,4 mN")], feedback: { correct: "Genau: Beide Werte stehen in Zeile 4.", incorrect: "Ein Messpaar besteht aus den Werten derselben Tabellenzeile." } },
      { id: "evidence", kind: "understanding", type: "choice", label: "Wann stützt ein Experiment ein theoretisches Modell?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Wenn Verlauf und Abweichungen unter Berücksichtigung der Messunsicherheit vereinbar sind."), option("exact", "Nur wenn jeder Messwert exakt auf dem theoretischen Graphen liegt."), option("single", "Sobald ein einzelner Messwert zur Formel passt.")], feedback: { correct: "Richtig: Messunsicherheit und alle Messpunkte müssen gemeinsam betrachtet werden.", incorrect: "Messwerte streuen. Entscheidend ist die Vereinbarkeit der gesamten Messreihe mit dem Modell." } }
    ], success: "Du kennst die Messgrößen und den fallenden Verlauf.", retry: "Sieh dir Messwerttabelle und Einheiten noch einmal an." }
  },
  {
    id: "setup", shortTitle: "Vorbereiten", title: "GeoGebra auf dem iPad vorbereiten",
    goal: "Du findest in der Rechner Suite den Grafikrechner und die Tabellenkalkulation.",
    why: "GeoGebra zeigt je nach gewähltem Rechner unterschiedliche Werkzeuge. Nur in der richtigen Ansicht findest du alle Schaltflächen des Kurses.",
    concepts: [
      { term: "Rechner Suite", text: "Die GeoGebra-App, in der mehrere mathematische Ansichten zusammenarbeiten." },
      { term: "Grafikrechner", text: "Der Modus mit Algebra, Werkzeugen, Tabelle und Tabellenkalkulation." },
      { term: "Tabellenkalkulation", text: "Das Raster mit Zelladressen wie A1, B1 oder C6." }
    ],
    workedExample: { title: "Die richtige Ansicht erkennen", lines: ["Links sind vier Symbole sichtbar.", "Das unterste Symbol heißt Tabellenkalkulation und wird nach dem Antippen violett.", "Das Symbol Tabelle darüber ist eine andere Ansicht."] },
    remember: "Vier Symbole links und das violette Tabellenkalkulations-Symbol zeigen, dass du richtig bist.",
    actionHeading: "Jetzt auf dem iPad",
    actions: ["Öffne die GeoGebra Rechner Suite.", "Öffne oben links das Menü ☰ und wähle Grafikrechner.", "Tippe links auf Tabellenkalkulation, nicht auf Tabelle.", "Ordne GeoGebra und diesen Kurs wenn möglich nebeneinander an."],
    formula: null, images: [IMAGES.table],
    troubleshooting: "GeoGebra arbeitet vermutlich noch im CAS-Modus, den du vielleicht aus dem Mathematikunterricht kennst. Das ist kein Fehler – für diesen Kurs brauchen wir nur eine andere Arbeitsumgebung. Öffne das Menü ☰, wähle Grafikrechner und öffne anschließend die Tabellenkalkulation. In einer schmalen Ansicht musst du die linke Leiste eventuell zuerst einblenden.",
    mistake: "Tabelle und Tabellenkalkulation klingen ähnlich. Benötigt wird das unterste Symbol mit dem Zellenraster.",
    check: { prompt: "Kontrolliere die Ansicht, bevor du Daten eingibst.", fields: [
      { id: "ready", kind: "result", type: "checkbox", label: "Ich sehe ein Zellenraster mit den Spalten A, B, C …", expected: true, feedback: { correct: "Das Zellenraster ist geöffnet.", incorrect: "Öffne die Tabellenkalkulation und prüfe die Spaltenbuchstaben." } },
      { id: "view", kind: "understanding", type: "choice", label: "Woran erkennst du die benötigte Ansicht?", expected: "spreadsheet", options: [option("", "Bitte auswählen …"), option("spreadsheet", "Das Tabellenkalkulations-Symbol ist violett."), option("table", "Das Symbol Tabelle ist violett."), option("tools", "Nur das Werkzeug-Symbol ist sichtbar.")], feedback: { correct: "Richtig: Das violette Zellenraster markiert die Tabellenkalkulation.", incorrect: "Achte auf das unterste Symbol mit dem Zellenraster." } }
    ], success: "Die Arbeitsumgebung ist bereit.", retry: "Vergleiche deine linke Symbolleiste mit der Abbildung." }
  },
  {
    id: "table", shortTitle: "Messwerte", title: "Messwerte in die Tabelle eingeben",
    goal: "Du überträgst die sechs Messpaare in A1:B6 und verstehst Zelladressen.",
    why: "Spalten halten die Messgrößen getrennt, Zeilen die zusammengehörigen Messungen zusammen. So kann GeoGebra jede Zeile eindeutig auswerten.",
    concepts: [
      { term: "Spalte", text: "Ein senkrechter Bereich: A enthält r, B enthält F." },
      { term: "Zeile", text: "Ein waagerechter Bereich; Zeile 1 enthält die erste Messung." },
      { term: "Zelladresse", text: "Spaltenbuchstabe plus Zeilennummer, zum Beispiel B4." }
    ],
    workedExample: { title: "Zelladressen lesen", lines: ["A4 enthält den Abstand 12,4 cm.", "B4 enthält die zugehörige Kraft 0,18 mN.", "A4 und B4 gehören zusammen, weil beide in Zeile 4 stehen."] },
    remember: "A enthält r in cm, B enthält F in mN; gleiche Zeilennummer bedeutet gleiche Messung.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Tippe A1 an, gib 8 ein und bestätige.", "Trage die sechs r-Werte in A1 bis A6 ein.", "Trage danach die sechs F-Werte in B1 bis B6 ein.", "Vergleiche erste und letzte Zeile mit der Vorlage."],
    dataTable: EXAMPLE_DATA, formula: null, images: [IMAGES.table],
    troubleshooting: "GeoGebra zeigt Dezimalzahlen meist mit Punkt. 18.6 und 0.06 entsprechen 18,6 und 0,06.",
    mistake: "Verrutscht ein Wert um eine Zeile, entsteht ein falsches Messpaar. Kontrolliere A1/B1 und A6/B6 besonders sorgfältig.",
    check: { prompt: "Prüfe die letzte Zeile und dein Verständnis der Zelladressen.", fields: [
      { id: "a6", kind: "result", type: "number", label: "A6: r in cm", placeholder: "18,6", expected: 18.6, tolerance: 0.001, feedback: { correct: "A6 stimmt.", incorrect: "A6 enthält 18,6 cm." } },
      { id: "b6", kind: "result", type: "number", label: "B6: F in mN", placeholder: "0,06", expected: 0.06, tolerance: 0.001, feedback: { correct: "B6 stimmt.", incorrect: "B6 enthält 0,06 mN." } },
      { id: "address", kind: "understanding", type: "choice", label: "Wo steht die Kraft der vierten Messung?", expected: "b4", options: [option("", "Bitte auswählen …"), option("b4", "B4"), option("a4", "A4"), option("b6", "B6")], feedback: { correct: "Richtig: B4.", incorrect: "Kraftwerte stehen in B; die vierte Messung steht in Zeile 4." } }
    ], success: "Die Messwerttabelle stimmt.", retry: "Prüfe Spalten, Zeilen und Dezimalzeichen." }
  },
  {
    id: "first-point", shortTitle: "Erster Punkt", title: "Aus einem Messpaar einen Punkt machen",
    goal: "Du stellst die erste Messung als Punkt (r, F) dar und verstehst die Reihenfolge.",
    why: "Eine Potenzregression arbeitet in GeoGebra mit Punkten. r wird zur waagerechten x-Koordinate, F zur senkrechten y-Koordinate.",
    concepts: [
      { term: "Punkt", text: "Ein Zahlenpaar (x, y), das eine Position im Koordinatensystem festlegt." },
      { term: "x-Koordinate", text: "Der erste Wert: hier r aus Spalte A." },
      { term: "y-Koordinate", text: "Der zweite Wert: hier F aus Spalte B." }
    ],
    workedExample: { title: "Aus Zeile 1 wird C1", lines: ["A1 enthält 8 und B1 enthält 0,37.", "=(A1,B1) liest beide Zellen.", "GeoGebra erzeugt daraus (8, 0.37)."] },
    remember: "Im Punkt (r, F) steht der Abstand zuerst und die Kraft an zweiter Stelle.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Tippe die leere Zelle C1 an.", "Gib die Formel unten vollständig ein.", "Bestätige und prüfe, ob C1 den Punkt (8, 0.37) zeigt."],
    formula: "=(A1,B1)", images: [IMAGES.firstPoint],
    troubleshooting: "Beginne mit dem Gleichheitszeichen. Zwischen A1 und B1 steht ein Komma; beide stehen in runden Klammern.",
    mistake: "Vertauschst du A1 und B1, liegen Abstand und Kraft auf den falschen Achsen.",
    check: { prompt: "Prüfe Punkt und Koordinatenbedeutung.", fields: [
      { id: "c1", kind: "result", type: "choice", label: "Was sollte in C1 erscheinen?", expected: "correct", options: [option("", "Bitte auswählen …"), option("correct", "(8, 0.37)"), option("references", "(A1, B1)"), option("reversed", "(0.37, 8)")], feedback: { correct: "C1 zeigt den richtigen Punkt.", incorrect: "GeoGebra setzt zuerst A1, dann B1 ein." } },
      { id: "coordinates", kind: "understanding", type: "choice", label: "Warum steht 8 an erster Stelle?", expected: "x", options: [option("", "Bitte auswählen …"), option("x", "r ist die x-Koordinate."), option("largest", "8 ist die größere Zahl."), option("force", "F steht immer zuerst.")], feedback: { correct: "Genau: r liegt auf der x-Achse.", incorrect: "Die Reihenfolge ist (r, F) = (x, y)." } }
    ], success: "Der erste Messpunkt ist erstellt und richtig gedeutet.", retry: "Vergleiche C1 mit der Abbildung und denke an (r, F)." }
  },
  {
    id: "fill-points", shortTitle: "Punktreihe", title: "Punktreihe erzeugen und sichern",
    goal: "Du überträgst die Formel auf alle Messungen und sicherst die bearbeitbare Datei.",
    why: "Beim Ausfüllen passt GeoGebra die Zeilennummern automatisch an. Dadurch wird dieselbe Zuordnungsvorschrift auf alle Messpaare angewendet, ohne die Formel in jeder Zeile neu einzugeben.",
    concepts: [
      { term: "Relativer Zellbezug", text: "Beim Verschieben wandert A1/B1 zu A2/B2 und so weiter." },
      { term: "Ausfüllgriff", text: "Der kleine Griff an der Ecke einer markierten Zelle." },
      { term: "GeoGebra-Datei", text: "Eine bearbeitbare Datei, in der Zellen, Punkte und Funktionen erhalten bleiben." }
    ],
    workedExample: { title: "Was beim Ausfüllen geschieht", lines: ["C1 enthält =(A1,B1).", "In C2 wird daraus automatisch =(A2,B2).", "In C6 entsteht =(A6,B6) und damit (18.6, 0.06)."] },
    remember: "Der Ausfüllgriff überträgt die Formel und passt relative Zellbezüge an; er kopiert nicht einfach den angezeigten Punkt.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Markiere C1.", "Halte den Ausfüllgriff am unteren rechten Eck lange fest.", "Ziehe den violetten Bereich bis C6.", "Prüfe C1:C6.", "Sichere über Menü ☰ → Teilen → In Dateien sichern."],
    formula: null, images: [IMAGES.filledPoints, IMAGES.fillHandle, IMAGES.save],
    troubleshooting: "Bewegt sich nichts, setze den Finger genau auf den Griff und halte kurz, bevor du ziehst. Im Teilen-Menü musst du eventuell scrollen.",
    mistake: "Ein Screenshot ist nicht weiter bearbeitbar. Sichere die GeoGebra-Datei.",
    check: { prompt: "Prüfe Zellbezüge, letzten Punkt und Sicherung.", fields: [
      { id: "c6", kind: "result", type: "choice", label: "Welcher Punkt steht in C6?", expected: "correct", options: [option("", "Bitte auswählen …"), option("correct", "(18.6, 0.06)"), option("copied", "(8, 0.37)"), option("reversed", "(0.06, 18.6)")], feedback: { correct: "C6 stimmt.", incorrect: "C6 verwendet A6 und B6." } },
      { id: "c2formula", kind: "understanding", type: "choice", label: "Welche Formel verwendet C2?", expected: "relative", options: [option("", "Bitte auswählen …"), option("relative", "=(A2,B2)"), option("fixed", "=(A1,B1)"), option("wrong", "=(B2,A2)")], feedback: { correct: "Richtig: Die Zeilennummern wurden angepasst.", incorrect: "Eine Zeile tiefer wird aus 1 die 2." } },
      { id: "saved", kind: "result", type: "checkbox", label: "Ich habe die bearbeitbare GeoGebra-Datei gesichert.", expected: true, feedback: { correct: "Der Zwischenstand ist gesichert.", incorrect: "Sichere über Teilen → In Dateien sichern." } }
    ], success: "Alle Punkte sind vorhanden und der Stand ist gesichert.", retry: "Prüfe C2, C6 und den Dateityp." }
  },
  {
    id: "regression-concept", shortTitle: "Regression", title: "Potenzregression verstehen",
    goal: "Du verstehst, was ein Regressionsmodell leistet und wie die Parameter a und b den Verlauf bestimmen.",
    why: "Messpunkte liegen wegen Messunsicherheiten und Streuung selten exakt auf einer einfachen Kurve. Eine Regression bestimmt die Potenzfunktion, deren Graph die Messreihe nach dem verwendeten Regressionsverfahren insgesamt möglichst gut beschreibt.",
    concepts: [
      { term: "Regression", text: "Ein mathematisches Verfahren, das die Parameter einer vorgegebenen Funktionsart an mehrere Messpunkte anpasst." },
      { term: "Potenzfunktion", text: "Eine Funktion der Form F(r) = a · rᵇ." },
      { term: "Faktor a", text: "Er skaliert die Funktion; rechnerisch ist a der Modellwert bei r = 1 in den gewählten Einheiten, außerhalb unseres Messbereichs." },
      { term: "Exponent b", text: "Er bestimmt, wie stark und in welche Richtung sich F mit r verändert." }
    ],
    workedExample: { title: "Einen negativen Exponenten lesen", lines: ["Bei b = −2 gilt F(r) = a · r⁻² = a/r².", "Wird r doppelt so groß, wird F auf ein Viertel reduziert.", "Ein negatives b passt zur abnehmenden Kraft."] },
    remember: "Die Regression verbindet nicht Punkt für Punkt, sondern beschreibt den gemeinsamen Trend.",
    actionHeading: "Jetzt am Modell nachdenken",
    actions: ["Vergleiche F(r) = a · rᵇ mit dem fallenden Verlauf.", "Überlege, welches Vorzeichen b haben muss.", "Beachte: Das Modell muss nicht durch jeden Messpunkt gehen."],
    formula: null, images: [],
    troubleshooting: "Lies rᵇ als r hoch b. r⁻² bedeutet dasselbe wie 1/r².",
    mistake: "Der Graph der Regressionsfunktion verbindet die Messpunkte nicht nacheinander wie ein Linienzug. GeoGebra passt eine einzige Potenzfunktion so an, dass ihr Graph nach dem Regressionsverfahren insgesamt möglichst nahe an den Messpunkten verläuft. Deshalb dürfen einzelne Punkte oberhalb oder unterhalb des Graphen liegen.",
    check: { prompt: "Prüfe Modell und Exponent.", fields: [
      { id: "behavior", kind: "result", type: "choice", label: "Wie verhält sich F bei negativem b?", expected: "falling", options: [option("", "Bitte auswählen …"), option("falling", "F wird bei wachsendem r kleiner."), option("rising", "F wird größer."), option("constant", "F bleibt konstant.")], feedback: { correct: "Richtig: Der Verlauf fällt.", incorrect: "Setze größere r-Werte in 1/r² ein." } },
      { id: "meaning", kind: "understanding", type: "choice", label: "Was leistet eine Regression?", expected: "model", options: [option("", "Bitte auswählen …"), option("model", "Sie findet ein passendes Modell für alle Punkte."), option("connect", "Sie verbindet alle Punkte mit Geraden."), option("prove", "Sie beweist ein Naturgesetz.")], feedback: { correct: "Genau: Die Regression beschreibt den gemeinsamen Trend.", incorrect: "Sie liefert ein angenähertes Modell, keinen Beweis." } }
    ], success: "Du kannst Potenzregression und negativen Exponenten deuten.", retry: "Lies Beispiel und Definition erneut." }
  },
  {
    id: "regression", shortTitle: "TrendPot", title: "TrendPot in GeoGebra anwenden",
    goal: "Du berechnest die Potenzregression und liest Faktor und Exponent ab.",
    why: "Nachdem das Modell klar ist, berechnet GeoGebra die Parameter a und b so, dass der Graph der Potenzfunktion insgesamt möglichst nahe an den sechs Messpunkten verläuft.",
    concepts: [
      { term: "TrendPot", text: "Der GeoGebra-Befehl für eine Potenzregression." },
      { term: "C1:C6", text: "Der Zellbereich von C1 bis einschließlich C6." },
      { term: "Funktionsname F", text: "F wird gewählt, weil die physikalische Größe Kraft berechnet werden soll. Auch andere Funktionsnamen wären möglich." },
      { term: "Variable x", text: "GeoGebra erwartet in dieser Eingabe in der Regel x als Funktionsvariable. Inhaltlich steht x hier für den Abstand r." }
    ],
    workedExample: { title: "Die Ausgabe lesen", lines: ["GeoGebra liefert etwa F(x) = 28,9022 · x^(−2,075).", "Physikalisch interpretieren wir x als Abstand r und schreiben F(r) = 28,9022 · r^(−2,075).", "Damit ist a ≈ 28,9022 und b ≈ −2,075; b liegt nahe bei −2, ist aber nicht exakt gleich −2."] },
    remember: "TrendPot benötigt die Punkte C1:C6; F ist der Name des Modells.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Wechsle zur Ansicht Algebra.", "Tippe in eine leere Eingabezeile.", "Gib den Befehl ein und bestätige.", "Lies a und b ab."],
    formula: "F(x)=TrendPot(C1:C6)", images: [IMAGES.regression],
    troubleshooting: "Meldet GeoGebra einen Fehler, prüfe C1:C6. TrendPot benötigt positive Punktkoordinaten.",
    mistake: "In F(x) heißt die Funktion F, weil wir die physikalische Kraft F berechnen wollen; auch ein anderer Funktionsname wäre möglich. Als Variable solltest du hier trotzdem x verwenden: GeoGebra akzeptiert bei diesem Befehl in der Regel x und kann bei r als Variable empfindlich reagieren. Fachlich interpretieren wir x anschließend als den Abstand r. Die Zahl vor x ist a, die Hochzahl ist b – einschließlich ihres Minuszeichens.",
    check: { prompt: "Übertrage und deute die Parameter.", fields: [
      { id: "a", kind: "result", type: "number", label: "Faktor a", placeholder: "28,9022", expected: 28.9022, tolerance: 0.05, feedback: { correct: "a passt.", incorrect: "a ist ungefähr 28,9022." } },
      { id: "b", kind: "result", type: "number", label: "Exponent b", placeholder: "-2,0750", expected: -2.075, tolerance: 0.01, feedback: { correct: "b passt.", incorrect: "b ist ungefähr −2,075." } },
      { id: "interpretation", kind: "understanding", type: "choice", label: "Was zeigt b ≈ −2,075?", expected: "near", options: [option("", "Bitte auswählen …"), option("near", "Der Verlauf liegt nahe bei 1/r²."), option("exact", "Das Modell ist exakt 1/r²."), option("linear", "F nimmt linear zu.")], feedback: { correct: "Richtig: nahe bei −2, aber nicht exakt.", incorrect: "Vergleiche −2,075 vorsichtig mit −2." } }
    ], success: "Regression und Deutung stimmen.", retry: "Lies die Funktion als a · xᵇ." }
  },
  {
    id: "predictions", shortTitle: "Modellwerte", title: "Modellwerte berechnen",
    goal: "Du berechnest zu jedem Abstand den Modellwert und unterscheidest ihn vom Messwert.",
    why: "Stehen Messwert und Modellwert für denselben Abstand nebeneinander, lässt sich die Güte des Modells für jede Messung untersuchen.",
    concepts: [
      { term: "Messwert", text: "Der beobachtete Kraftwert in Spalte B." },
      { term: "Modellwert", text: "Der von der Regressionsfunktion berechnete Wert in Spalte D." },
      { term: "F(A1)", text: "Setzt den Abstand aus A1 in die Funktion F ein." }
    ],
    workedExample: { title: "Messung und Modell vergleichen", lines: ["A1 enthält r = 8 cm.", "B1 ist der Messwert 0,37 mN.", "D1 ist der Modellwert F(8) ≈ 0,38638 mN."] },
    remember: "B enthält beobachtete Messwerte; D enthält berechnete Modellwerte.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Wechsle zur Tabellenkalkulation.", "Gib in D1 die Formel ein.", "Fülle D1 bis D6 nach unten aus.", "Runde nicht von Hand."],
    formula: "=F(A1)", images: [IMAGES.predictions],
    troubleshooting: "Wird F nicht erkannt, kontrolliere, ob die Regressionsfunktion den Namen F trägt.",
    mistake: "D1 ist kein neuer Messwert, sondern die Vorhersage des Modells.",
    check: { prompt: "Prüfe Modellwerte und Bedeutung.", fields: [
      { id: "d1", kind: "result", type: "number", label: "D1 in mN", placeholder: "0,38638", expected: 0.38638, tolerance: 0.001, feedback: { correct: "D1 passt.", incorrect: "D1 sollte etwa 0,38638 mN sein." } },
      { id: "d6", kind: "result", type: "number", label: "D6 in mN", placeholder: "0,06709", expected: 0.06709, tolerance: 0.001, feedback: { correct: "D6 passt.", incorrect: "D6 sollte etwa 0,06709 mN sein." } },
      { id: "difference", kind: "understanding", type: "choice", label: "Was unterscheidet B1 und D1?", expected: "measured-model", options: [option("", "Bitte auswählen …"), option("measured-model", "B1 ist gemessen, D1 ist berechnet."), option("both-measured", "Beide sind gemessen."), option("both-model", "Beide sind berechnet.")], feedback: { correct: "Genau: B = Messung, D = Modell.", incorrect: "Erinnere dich: B = Messwert, D = Modellwert." } }
    ], success: "Modellwerte und Messwerte sind richtig unterschieden.", retry: "Prüfe D1/D6 und die Spaltenrollen." }
  },
  {
    id: "deviations", shortTitle: "Abweichungen", title: "Relative Modellabweichungen bestimmen",
    goal: "Du berechnest, um wie viel Prozent ein Messwert über oder unter dem Modellwert liegt.",
    why: "Eine absolute Differenz ist bei unterschiedlich großen Messwerten nur eingeschränkt vergleichbar. Die relative Modellabweichung bezieht die Differenz deshalb auf den jeweiligen Modellwert.",
    concepts: [
      { term: "Differenz", text: "Messwert minus Modellwert: B1 − D1." },
      { term: "Relative Modellabweichung", text: "Die Differenz geteilt durch den Modellwert D1." },
      { term: "Vorzeichen", text: "Plus: Messwert über dem Modell. Minus: Messwert darunter." },
      { term: "Betrag", text: "Die Größe ohne Vorzeichen, zum Beispiel |−10,6 %| = 10,6 %." }
    ],
    workedExample: { title: "Zeile 1 vollständig berechnen", lines: ["(0,37 − 0,38638) / 0,38638 · 100 ≈ −4,24 %", "0,37 − 0,38638 = −0,01638 mN", "−0,01638 / 0,38638 ≈ −0,0424", "−0,0424 · 100 ≈ −4,24 %: Der Messwert liegt unter dem Modellwert."] },
    remember: "Das Vorzeichen zeigt die Richtung; der Betrag zeigt die Größe der Modellabweichung.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Gib in E1 die Formel ein.", "Fülle E1 bis E6 aus.", "Vergleiche die Beträge.", "Ordne beim größten Betrag das Vorzeichen ein."],
    formula: "=(B1-D1)/D1*100", images: [IMAGES.deviationFormula, IMAGES.deviations],
    troubleshooting: "Setze B1−D1 in Klammern, damit GeoGebra zuerst die Differenz berechnet.",
    mistake: "Die Werte in E sind Modellabweichungen, nicht automatisch Messfehler.",
    check: { prompt: "Bestimme und erkläre die größte Modellabweichung.", fields: [
      { id: "max", kind: "result", type: "number", label: "Größter Betrag in %", placeholder: "15,7", expected: 15.6637, tolerance: 0.3, feedback: { correct: "Der Betrag stimmt.", incorrect: "Vergleiche die Beträge in E1:E6." } },
      { id: "row", kind: "result", type: "number", label: "Zugehöriges r in cm", placeholder: "12,4", expected: 12.4, tolerance: 0.01, feedback: { correct: "r = 12,4 cm stimmt.", incorrect: "Der größte Betrag steht in Zeile 4." } },
      { id: "sign", kind: "understanding", type: "choice", label: "Was bedeutet das positive Vorzeichen?", expected: "above", options: [option("", "Bitte auswählen …"), option("above", "Der Messwert liegt über dem Modellwert."), option("below", "Der Messwert liegt darunter."), option("invalid", "Die Messung ist ungültig.")], feedback: { correct: "Richtig: B4 liegt über D4.", incorrect: "Positiv bedeutet B4 − D4 > 0." } },
      { id: "denominator", kind: "understanding", type: "choice", label: "Warum wird durch D1 geteilt?", expected: "relative", options: [option("", "Bitte auswählen …"), option("relative", "Die Differenz wird auf den Modellwert bezogen."), option("unit", "Dadurch entsteht mN."), option("round", "Dadurch wird gerundet.")], feedback: { correct: "Genau: D1 ist der Bezugswert.", incorrect: "Die Division macht die Differenz relativ zum Modellwert." } }
    ], success: "Du kannst Modellabweichungen berechnen und deuten.", retry: "Nutze das Rechenbeispiel aus Zeile 1." }
  },
  {
    id: "conclusion", shortTitle: "Beurteilen", title: "Das Modell vorsichtig beurteilen",
    goal: "Du verbindest Kurve, Exponent, Modellabweichungen und Messunsicherheit zu einer angemessenen Aussage.",
    why: "Ein passender Kurvenverlauf allein beweist kein Naturgesetz. Ein gutes Urteil nennt, was für das Modell spricht und welche Grenzen die Auswertung hat.",
    concepts: [
      { term: "Messunsicherheit", text: "Sie kennzeichnet, wie genau ein Messergebnis aufgrund des Messverfahrens und der Geräte sinnvoll angegeben werden kann." },
      { term: "Vereinbar", text: "Die Daten widersprechen dem Modell innerhalb der angenommenen Genauigkeit nicht." },
      { term: "Bewiesen", text: "Eine viel stärkere Aussage, die aus dieser Messreihe nicht folgt." },
      { term: "Grenze der Aussage", text: "Die Auswertung prüft die Vereinbarkeit der Messdaten mit dem Modell, liefert aber keinen mathematischen Beweis des Naturgesetzes." }
    ],
    workedExample: { title: "Eine angemessene Schlussfolgerung", lines: ["b = −2,075 liegt nahe beim theoretisch erwarteten Wert −2.", "Die größte Modellabweichung beträgt etwa 15,7 %. Für den kleinsten Kraftwert ergibt 0,01/0,06 · 100 eine grobe relative Unsicherheit von 16,7 %.", "In dieser vereinfachten Betrachtung liefern die Daten keinen erkennbaren Widerspruch zum 1/r²-Modell. Sie beweisen das Modell jedoch nicht und bestimmen auch nicht direkt die Unsicherheit von b."] },
    remember: "Formuliere: mit 1/r² vereinbar – nicht: exakt bewiesen.",
    actionHeading: "Jetzt auswerten",
    actions: ["Betrachte Messpunkte und Regressionskurve.", "Vergleiche den Regressionswert b = −2,075 mit der theoretischen Erwartung b = −2.", "Vergleiche 15,7 % Modellabweichung mit der grob abgeschätzten relativen Unsicherheit von 16,7 %.", "Formuliere eine vorsichtige Schlussfolgerung."],
    formula: null, images: [IMAGES.curve],
    troubleshooting: "1/r² kann als r⁻² geschrieben werden. Betrachte Exponent, Streuung und Genauigkeit gemeinsam.",
    mistake: "Die relative Unsicherheit eines Kraftwertes ist nicht die statistische Unsicherheit des Exponenten b.",
    check: { prompt: "Prüfe Vergleichswerte und Urteil.", fields: [
      { id: "ideal", kind: "result", type: "number", label: "Idealer Exponent", placeholder: "-2", expected: -2, tolerance: 0.05, feedback: { correct: "Der ideale Exponent ist −2.", incorrect: "Schreibe 1/r² als r⁻²." } },
      { id: "difference", kind: "result", type: "number", label: "Abstand von −2,075 zu −2", placeholder: "0,075", expected: 0.075, tolerance: 0.01, feedback: { correct: "Der Abstand ist 0,075.", incorrect: "Berechne |−2,075 − (−2)|." } },
      { id: "uncertainty", kind: "result", type: "number", label: "Grobe relative Unsicherheit in %", placeholder: "16,7", expected: 16.7, tolerance: 0.7, feedback: { correct: "Rund 16,7 % stimmt.", incorrect: "Berechne 0,01/0,06 · 100." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Aussage ist angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Die Daten sind mit 1/r² vereinbar, beweisen es aber nicht."), option("proven", "Die Messreihe beweist 1/r² exakt."), option("uncertainty", "16,7 % ist die exakte Unsicherheit von b.")], feedback: { correct: "Genau: vereinbar, aber nicht bewiesen.", incorrect: "Die Daten erlauben eine vorsichtige Vereinbarkeitsaussage." } }
    ], success: "Du kannst die Messreihe fachlich vorsichtig beurteilen.", retry: "Unterscheide Vereinbarkeit, Beweis und Exponentenunsicherheit." }
  }
]);

const uqImage = (file, width, height, alt, caption, highlights = []) => Object.freeze({
  src: `./assets/steps/uq/${file}`,
  width,
  height,
  alt,
  caption,
  highlights
});

const UQ_IMAGES = Object.freeze({
  table: uqImage("01-messwerte-u-q.png", 900, 500,
    "GeoGebra-Tabellenkalkulation mit fünf Spannungswerten in Spalte A und fünf Ladungswerten in Spalte B.",
    "A enthält U in Volt. B enthält den Zahlenwert Q/(10⁻⁸ C).",
    [{ x: 16.5, y: 35, width: 55.5, height: 45, label: "A1:B5" }]),
  points: uqImage("02-punkte-u-q.png", 900, 500,
    "GeoGebra-Tabelle mit fünf Punkten aus den Spannungs- und Ladungswerten in Spalte C.",
    "C1:C5 enthält die Punkte (U, Q), die anschließend ausgewertet werden.",
    [{ x: 72, y: 35, width: 27.5, height: 45, label: "C1:C5" }]),
  ratioFormula: uqImage("03-konstante-formel.png", 900, 500,
    "In GeoGebra wird in Zelle C1 der Quotient B1 durch A1 eingegeben.",
    "Mit =B1/A1 berechnet GeoGebra aus dem ersten Messpaar die erste Kapazität.",
    [{ x: 72, y: 35, width: 27.5, height: 9, label: "C1" }]),
  ratios: uqImage("04-konstanten-ausgefuellt.png", 900, 500,
    "GeoGebra-Tabelle mit fünf berechneten Quotienten Q durch U in Spalte C.",
    "Die fünf Zahlen in C1:C5 liegen nahe beieinander – das spricht für eine konstante Kapazität.",
    [{ x: 72, y: 35, width: 27.5, height: 45, label: "C1:C5" }]),
  mean: uqImage("05-mittelwert.png", 900, 500,
    "GeoGebra-Algebraansicht mit dem Mittelwert der fünf Kapazitätswerte.",
    "Mittel(C1:C5) liefert etwa 0,0415933 in der verwendeten Skalierung.",
    [{ x: 16, y: 15, width: 39, height: 20, label: "Mittelwert a" }]),
  meanFormula: uqImage("06-mittelwert-in-d1.png", 900, 500,
    "In der GeoGebra-Tabelle wird der gespeicherte Mittelwert a in Zelle D1 eingesetzt.",
    "Mit =a wird der Mittelwert neben den ersten Einzelwert geschrieben.",
    [{ x: 79, y: 35, width: 20.5, height: 9, label: "D1" }]),
  meanFilled: uqImage("07-mittelwert-ausgefuellt.png", 900, 500,
    "GeoGebra-Tabelle mit dem Kapazitätsmittelwert in den Zellen D1 bis D5.",
    "D1:D5 enthält denselben Bezugswert für den Vergleich mit allen Einzelkapazitäten.",
    [{ x: 79, y: 35, width: 20.5, height: 45, label: "D1:D5" }]),
  constantDeviationFormula: uqImage("08-konstantenabweichung-formel.png", 1040, 500,
    "In Zelle E1 steht die Formel für die relative Abweichung einer Einzelkapazität vom Mittelwert.",
    "E1 vergleicht C1 mit dem Mittelwert in D1 und gibt die Abweichung in Prozent aus.",
    [{ x: 82.7, y: 35, width: 17, height: 9, label: "Formel in E1" }]),
  constantDeviations: uqImage("09-konstantenabweichungen.png", 1040, 500,
    "GeoGebra-Tabelle mit fünf relativen Abweichungen der Kapazitätswerte in Spalte E.",
    "Der größte Betrag liegt bei etwa 3,83 Prozent in der ersten Zeile.",
    [{ x: 82.7, y: 35, width: 17, height: 45, label: "E1:E5" }]),
  regression: uqImage("10-potenzregression-u-q.png", 900, 500,
    "GeoGebra-Algebraansicht mit der Potenzregression Q von x für die fünf U-Q-Punkte.",
    "TrendPot liefert den Exponenten b ≈ 1,0116 – also einen Verlauf nahe bei b = 1.",
    [{ x: 18, y: 16, width: 77, height: 18, label: "Q(x)" }]),
  modelTable: uqImage("11-modellwerte-u-q.png", 1040, 500,
    "GeoGebra-Tabelle mit U-Q-Punkten, Modellwerten der Potenzregression und prozentualen Modellabweichungen.",
    "D enthält die Modellwerte, E die Abweichungen der Messwerte vom Regressionsmodell.",
    [{ x: 65.6, y: 35, width: 34, height: 45, label: "D und E" }]),
  linearRegression: uqImage("12-lineare-regression-u-q.png", 900, 500,
    "GeoGebra-Algebraansicht mit dem Befehl Q gleich Trendlinie für die fünf U-Q-Punkte.",
    "Trendlinie liefert die Regressionsgerade Q: y = 0,0408 · x + 0,12.",
    [{ x: 18, y: 16, width: 77, height: 18, label: "Q" }]),
  linearModelTable: uqImage("13-lineare-modellwerte-u-q.png", 1040, 500,
    "GeoGebra-Tabelle mit U-Q-Punkten, Modellwerten der linearen Regression und prozentualen Modellabweichungen.",
    "D enthält die Werte der Regressionsgeraden, E die relativen Modellabweichungen.",
    [{ x: 65.6, y: 35, width: 34, height: 45, label: "D und E" }])
});

const uqContextConcepts = [
  { term: "Spannung U", text: "Die Spannung am Kondensator in Volt. Sie wird im Versuch schrittweise verändert." },
  { term: "Ladung Q", text: "Die auf dem Kondensator gespeicherte elektrische Ladung. In der Tabelle steht ihr Zahlenwert in der Einheit 10⁻⁸ C." },
  { term: "Kapazität C", text: "Sie beschreibt, wie viel Ladung der betrachtete Kondensator je Volt speichert: C = Q/U." },
  { term: "Direkte Proportionalität", text: "Bleiben Kondensator und Versuchsbedingungen unverändert, führt eine Verdopplung von U theoretisch zu einer Verdopplung von Q." }
];

export const UQ_POWER_STEPS = Object.freeze([
  {
    id: "uq-power-context", shortTitle: "Messidee", title: "Den Kondensatorversuch verstehen",
    goal: "Du verstehst die Messgrößen U und Q und formulierst die Hypothese Q = C · U.",
    why: "Für einen festen Kondensator sagt das Modell Q = C · U eine direkte Proportionalität zwischen Ladung und Spannung voraus. Reale Messergebnisse sind mit Unsicherheiten behaftet. Deshalb prüfen wir nicht auf exakte Übereinstimmung, sondern darauf, ob Verlauf und Abweichungen im Rahmen der vereinfachten Unsicherheitsbetrachtung mit der theoretischen Erwartung vereinbar sind.",
    concepts: uqContextConcepts,
    workedExample: { title: "Eine Verdopplung prüfen", lines: ["Bei 50 V wurden 2,0 · 10⁻⁸ C gemessen.", "Bei 100 V wären bei exakter Proportionalität 4,0 · 10⁻⁸ C zu erwarten; gemessen wurden 4,3 · 10⁻⁸ C.", "Diese Abweichung ist zunächst weder ein Beweis noch ein Widerspruch. Sie muss mit der Messunsicherheit und der gesamten Messreihe verglichen werden."] },
    remember: "Direkte Proportionalität bedeutet Q = C · U; im Potenzmodell entspricht das dem Exponenten b = 1.",
    actionHeading: "Zuerst vorhersagen", actions: ["Lies die beiden Spalten der Messreihe.", "Beachte die Einheit 10⁻⁸ C in Spalte B.", "Überlege, wie Q bei wachsendem U verlaufen sollte."],
    dataTable: UQ_EXAMPLE_DATA, formula: null, images: [UQ_IMAGES.table],
    troubleshooting: "GeoGebra zeigt 2 statt 2,0. Der Zahlenwert ist derselbe; die Messunsicherheit ΔQ = 0,1 · 10⁻⁸ C bleibt trotzdem bestehen.",
    mistake: "Messwerte müssen nicht exakt auf dem theoretischen Graphen liegen. Ein Experiment prüft Vereinbarkeit, nicht mathematische Identität.",
    check: { prompt: "Ordne Messgrößen und theoretischen Verlauf zu.", fields: [
      { id: "q100", kind: "result", type: "number", label: "Q/(10⁻⁸ C) bei U = 100 V", placeholder: "4,3", expected: 4.3, tolerance: 0.001, feedback: { correct: "Der Messwert ist 4,3 · 10⁻⁸ C.", incorrect: "Sieh in Zeile 2 der Messwerttabelle." } },
      { id: "trend", kind: "understanding", type: "choice", label: "Was sagt Q = C · U bei konstantem C voraus?", expected: "double", options: [option("", "Bitte auswählen …"), option("double", "Bei doppeltem U verdoppelt sich Q."), option("half", "Q halbiert sich."), option("constant", "Q bleibt gleich.")], feedback: { correct: "Richtig: Das ist direkte Proportionalität.", incorrect: "Setze U und 2U bei unverändertem C in Q = C · U ein." } }
    ], success: "Du kennst Messidee und Hypothese.", retry: "Lies Q = C · U als direkte Proportionalität." }
  },
  {
    id: "uq-power-table", shortTitle: "Tabelle", title: "U und Q in GeoGebra eingeben",
    goal: "Du öffnest den Grafikrechner und überträgst die fünf Messpaare in A1:B5.",
    why: "GeoGebra benötigt eine geordnete Tabelle: U steht als unabhängige Größe in A, die gemessene Ladung Q in B. Werte derselben Zeile bilden ein Messpaar.",
    concepts: [{ term: "Spalte A", text: "Spannung U in Volt." }, { term: "Spalte B", text: "Zahlenwert Q/(10⁻⁸ C), also die Ladung in der Einheit 10⁻⁸ C." }, { term: "Messpaar", text: "Zwei Werte derselben Messung, die in derselben Zeile stehen, zum Beispiel (100; 4,3)." }],
    workedExample: { title: "Zeile 3 lesen", lines: ["A3 enthält U = 150 V.", "B3 enthält Q = 6,4 · 10⁻⁸ C.", "Zusammen ist das Messpaar (150; 6,4)."] },
    remember: "A enthält U, B enthält Q; GeoGebra darf 2,0 verkürzt als 2 anzeigen.",
    actionHeading: "Jetzt auf dem iPad", actions: ["Öffne Rechner Suite → Grafikrechner.", "Öffne die Tabellenkalkulation.", "Trage U in A1:A5 ein.", "Trage die Q-Zahlenwerte in B1:B5 ein."],
    dataTable: UQ_EXAMPLE_DATA, formula: null, images: [UQ_IMAGES.table],
    troubleshooting: "Bist du im CAS-Modus, öffne ☰ und wähle Grafikrechner. Anschließend tippst du links auf Tabellenkalkulation.",
    mistake: "Trage in B nur die Zahlenwerte 2; 4,3; 6,4; 8,3 und 10,2 ein – nicht zusätzlich den Faktor 10⁻⁸. GeoGebra darf stattdessen Dezimalpunkte anzeigen.",
    check: { prompt: "Prüfe erste und letzte Tabellenzeile.", fields: [
      { id: "a5", kind: "result", type: "number", label: "A5 in V", placeholder: "250", expected: 250, tolerance: 0.01, feedback: { correct: "A5 stimmt.", incorrect: "A5 enthält 250 V." } },
      { id: "b5", kind: "result", type: "number", label: "B5: Q/(10⁻⁸ C)", placeholder: "10,2", expected: 10.2, tolerance: 0.001, feedback: { correct: "B5 stimmt.", incorrect: "B5 enthält 10,2." } },
      { id: "row", kind: "understanding", type: "choice", label: "Warum gehören A3 und B3 zusammen?", expected: "same-row", options: [option("", "Bitte auswählen …"), option("same-row", "Sie stehen in derselben Zeile."), option("same-unit", "Sie haben dieselbe Einheit."), option("same-value", "Sie sind gleich groß.")], feedback: { correct: "Genau: Gleiche Zeile bedeutet gleiche Messung.", incorrect: "Messpaare werden zeilenweise angeordnet." } }
    ], success: "Die U-Q-Tabelle ist vollständig.", retry: "Vergleiche deine Tabelle mit der Abbildung." }
  },
  {
    id: "uq-power-points", shortTitle: "Punkte", title: "Die Messpaare als Punkte darstellen",
    goal: "Du erzeugst in C1:C5 die Punkte (U, Q) und verstehst ihre Koordinatenreihenfolge.",
    why: "TrendPot wertet eine Liste von Punkten aus. Die unabhängige Größe U wird zur x-Koordinate; der skalierte Zahlenwert der abhängigen Größe Q wird zur y-Koordinate.",
    concepts: [{ term: "x-Koordinate", text: "Der erste Punktwert: U aus Spalte A." }, { term: "y-Koordinate", text: "Der zweite Punktwert: Q aus Spalte B." }, { term: "Ausfüllgriff", text: "Er überträgt die Formel auf die folgenden Zeilen." }],
    workedExample: { title: "Aus Zeile 1 wird ein Punkt", lines: ["A1 = 50 und B1 = 2.", "=(A1,B1) erzeugt (50, 2).", "In C2 wird daraus beim Ausfüllen automatisch =(A2,B2)."] },
    remember: "Ein Messpunkt hat die Reihenfolge (U, Q) = (x, y).",
    actionHeading: "Jetzt in GeoGebra", actions: ["Tippe C1 an.", "Gib die Formel ein und bestätige.", "Ziehe den Ausfüllgriff bis C5.", "Prüfe den letzten Punkt (250, 10.2)."],
    formula: "=(A1,B1)", images: [UQ_IMAGES.points],
    troubleshooting: "Beginne mit dem Gleichheitszeichen und setze A1 und B1 gemeinsam in runde Klammern.",
    mistake: "Bei =(B1,A1) wären Ladung und Spannung auf den falschen Achsen.",
    check: { prompt: "Prüfe ersten und letzten Punkt.", fields: [
      { id: "c5", kind: "result", type: "choice", label: "Was steht in C5?", expected: "correct", options: [option("", "Bitte auswählen …"), option("correct", "(250, 10.2)"), option("reverse", "(10.2, 250)"), option("copy", "(50, 2)")], feedback: { correct: "C5 stimmt.", incorrect: "C5 verwendet A5 und B5." } },
      { id: "order", kind: "understanding", type: "choice", label: "Warum steht U zuerst?", expected: "x", options: [option("", "Bitte auswählen …"), option("x", "U ist die unabhängige x-Größe."), option("unit", "Volt ist immer zuerst."), option("larger", "U hat größere Zahlenwerte.")], feedback: { correct: "Richtig: U liegt auf der x-Achse.", incorrect: "Die Messreihe untersucht Q in Abhängigkeit von U." } }
    ], success: "Alle fünf Messpunkte sind vorbereitet.", retry: "Denke an die Reihenfolge (U, Q)." }
  },
  {
    id: "uq-power-concept", shortTitle: "Modell", title: "Warum eine Potenzregression Proportionalität erkennen kann",
    goal: "Du verstehst Q(U) = a · Uᵇ und erkennst b = 1 als proportionalen Sonderfall.",
    why: "Eine Potenzregression passt einen einzigen Potenzfunktionsgraphen so an, dass er insgesamt möglichst nahe an den Messpunkten verläuft. Der frei bestimmte Exponent zeigt, welcher Potenzzusammenhang zu den Daten passt.",
    concepts: [{ term: "Potenzmodell", text: "Eine Funktion der Form Q(U) = a · Uᵇ." }, { term: "Exponent b", text: "Er beschreibt, wie Q auf eine Änderung von U reagiert." }, { term: "Sonderfall b = 1", text: "Dann gilt Q(U) = a · U und der Verlauf ist direkt proportional." }],
    workedExample: { title: "Den Exponenten vergleichen", lines: ["Bei b = 1 führt eine Verdopplung von U zu einer Verdopplung von Q.", "Bei b = 2 führt eine Verdopplung von U zu einer Vervierfachung von Q.", "Ein Regressionsergebnis nahe 1 stützt deshalb die Vermutung eines proportionalen Zusammenhangs."] },
    remember: "Die Regression verbindet die Punkte nicht; sie sucht einen gemeinsamen, möglichst gut passenden Graphen.",
    actionHeading: "Vor der Eingabe", actions: ["Betrachte den ansteigenden Punktverlauf.", "Vergleiche die Bedeutung von b = 1 und b = 2.", "Formuliere deine Erwartung: b sollte nahe bei 1 liegen."],
    formula: null, images: [],
    troubleshooting: "Lies Uᵇ als U hoch b. Bei b = 1 bleibt einfach U übrig.",
    mistake: "Ein gut passender Graph bedeutet nicht, dass alle Punkte exakt auf ihm liegen. Die Parameter werden nach dem verwendeten Regressionsverfahren an die gesamte Messreihe angepasst; einzelne Messpunkte dürfen oberhalb oder unterhalb des Graphen liegen.",
    check: { prompt: "Deute das Potenzmodell.", fields: [
      { id: "ideal", kind: "result", type: "number", label: "Exponent bei direkter Proportionalität", placeholder: "1", expected: 1, tolerance: 0.001, feedback: { correct: "Der ideale Exponent ist 1.", incorrect: "Setze b = 1 in a · Uᵇ ein." } },
      { id: "regression", kind: "understanding", type: "choice", label: "Was macht eine Regression?", expected: "near", options: [option("", "Bitte auswählen …"), option("near", "Sie passt einen Graphen möglichst gut an alle Punkte an."), option("connect", "Sie verbindet benachbarte Punkte mit Geraden."), option("prove", "Sie beweist die Theorie.")], feedback: { correct: "Genau: Sie liefert eine bestmögliche Modellannäherung.", incorrect: "Die Regression sucht einen gemeinsamen Modellgraphen." } }
    ], success: "Du kannst b = 1 als proportionalen Sonderfall erklären.", retry: "Vergleiche a · Uᵇ mit a · U." }
  },
  {
    id: "uq-power-fit", shortTitle: "TrendPot", title: "TrendPot auf die U-Q-Punkte anwenden",
    goal: "Du bestimmst Faktor und Exponent der Potenzregression und liest die GeoGebra-Ausgabe richtig.",
    why: "GeoGebra berechnet a und b gemeinsam so, dass der Potenzfunktionsgraph insgesamt möglichst gut zu den fünf Punkten passt.",
    concepts: [{ term: "Q(x)", text: "Q ist der frei gewählte Funktionsname. Die Funktionswerte entsprechen hier dem Zahlenwert Q/(10⁻⁸ C)." }, { term: "Variable x", text: "GeoGebra erwartet hier x; physikalisch interpretieren wir x als Spannung U." }, { term: "C1:C5", text: "Der Zellbereich mit allen fünf Messpunkten." }],
    workedExample: { title: "Die Ausgabe lesen", lines: ["GeoGebra liefert Q(x) ≈ 0,0393011 · x^(1,011566).", "Damit gilt a ≈ 0,0393011 und b ≈ 1,011566.", "Der numerische Abstand des Exponenten zum theoretischen Wert 1 beträgt etwa 0,0116."] },
    remember: "Q heißt die Funktion; x ist GeoGebras Variable und steht inhaltlich für U.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Wechsle zur Algebraansicht.", "Gib den Befehl vollständig ein.", "Bestätige und lies a sowie b ab.", "Vergleiche b mit 1."],
    formula: "Q(x)=TrendPot(C1:C5)", images: [UQ_IMAGES.regression],
    troubleshooting: "Prüfe, ob C1:C5 wirklich positive Punkte enthalten. TrendPot benötigt Punkte im ersten Quadranten.",
    mistake: "Der Faktor a der freien Regression ist bei b ≠ 1 nicht automatisch die Kapazität; seine Einheit hängt vom frei bestimmten Exponenten ab. Erst im theoretisch festgelegten Modell Q = C · U mit b = 1 besitzt der Proportionalitätsfaktor die Einheit Farad.",
    check: { prompt: "Übertrage und deute die Parameter.", fields: [
      { id: "a", kind: "result", type: "number", label: "Faktor a", placeholder: "0,0393011", expected: 0.0393011136, tolerance: 0.00002, feedback: { correct: "a passt.", incorrect: "Lies die Zahl vor x ab." } },
      { id: "b", kind: "result", type: "number", label: "Exponent b", placeholder: "1,011566", expected: 1.011566179, tolerance: 0.001, feedback: { correct: "b passt.", incorrect: "Lies die Hochzahl einschließlich aller sichtbaren Stellen ab." } },
      { id: "meaning", kind: "understanding", type: "choice", label: "Was folgt aus b ≈ 1,0116?", expected: "supports", options: [option("", "Bitte auswählen …"), option("supports", "Der Verlauf liegt nahe bei direkter Proportionalität."), option("exact", "b ist exakt 1."), option("capacity", "a ist damit exakt die Kapazität.")], feedback: { correct: "Richtig: nahe bei 1, aber nicht exakt.", incorrect: "Der Exponent ist ein Hinweis, kein Beweis und keine Kapazität." } }
    ], success: "Du hast die Potenzregression richtig gelesen.", retry: "Lies die Funktion als a · xᵇ." }
  },
  {
    id: "uq-power-model", shortTitle: "Modellwerte", title: "Modellwerte neben die Messwerte schreiben",
    goal: "Du berechnest Q-Modellwerte in D1:D5 und unterscheidest Modell und Messung.",
    why: "Erst wenn Mess- und Modellwert für dieselbe Spannung nebeneinanderstehen, können wir ihre Abweichung sinnvoll berechnen.",
    concepts: [{ term: "Messwert", text: "Der im Versuch beobachtete Q-Wert in B." }, { term: "Modellwert", text: "Der durch die Regressionsfunktion berechnete Q-Wert in D." }, { term: "Q(A1)", text: "Setzt die Spannung aus A1 in das Regressionsmodell Q(x) ein." }],
    workedExample: { title: "Erste Zeile", lines: ["Bei U = 50 V ist der Messwert 2,0 · 10⁻⁸ C.", "Das Modell berechnet Q(50) ≈ 2,05601 · 10⁻⁸ C.", "Beide Werte beziehen sich auf dieselbe Spannung."] },
    remember: "B enthält Messwerte; D enthält berechnete Modellwerte.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Wechsle zur Tabellenkalkulation.", "Gib in D1 die Formel ein.", "Fülle D1 bis D5 aus.", "Vergleiche D1 und D5 mit der Abbildung."],
    formula: "=Q(A1)", images: [UQ_IMAGES.modelTable],
    troubleshooting: "Wird Q nicht erkannt, prüfe in der Algebraansicht, ob die Regressionsfunktion wirklich Q(x) heißt.",
    mistake: "Ein Modellwert wurde nicht erneut gemessen; er ist eine Vorhersage der angepassten Funktion.",
    check: { prompt: "Prüfe zwei Modellwerte und ihre Bedeutung.", fields: [
      { id: "d1", kind: "result", type: "number", label: "D1: Modellwert Q/(10⁻⁸ C)", placeholder: "2,05601", expected: 2.0560110867, tolerance: 0.002, feedback: { correct: "D1 passt.", incorrect: "D1 liegt bei etwa 2,05601." } },
      { id: "d5", kind: "result", type: "number", label: "D5: Modellwert Q/(10⁻⁸ C)", placeholder: "10,47321", expected: 10.4732113734, tolerance: 0.003, feedback: { correct: "D5 passt.", incorrect: "D5 liegt bei etwa 10,47321." } },
      { id: "kind", kind: "understanding", type: "choice", label: "Was ist D1?", expected: "model", options: [option("", "Bitte auswählen …"), option("model", "Ein berechneter Modellwert."), option("measurement", "Eine zweite Messung."), option("uncertainty", "Die Messunsicherheit.")], feedback: { correct: "Genau: D1 stammt aus Q(x).", incorrect: "D1 wird von der Funktion berechnet." } }
    ], success: "Du unterscheidest Messung und Modell.", retry: "Vergleiche die Aufgaben von Spalte B und D." }
  },
  {
    id: "uq-power-deviation", shortTitle: "Abweichung", title: "Modellabweichungen berechnen",
    goal: "Du berechnest relative Modellabweichungen und findest den größten Betrag.",
    why: "Die prozentuale Abweichung macht Unterschiede bei verschiedenen Größenordnungen vergleichbar. Das Vorzeichen zeigt die Richtung, der Betrag die Größe.",
    concepts: [{ term: "Relative Abweichung", text: "(Messwert − Modellwert) geteilt durch Modellwert." }, { term: "Vorzeichen", text: "Positiv: Messwert liegt über dem Modell; negativ: darunter." }, { term: "Betrag", text: "Die Größe ohne Vorzeichen; damit vergleichen wir die Zeilen." }],
    workedExample: { title: "Zeile 1", lines: ["(2,0 − 2,05601) / 2,05601 · 100 ≈ −2,72 %.", "Das Minus bedeutet: Der Messwert liegt unter dem Modellwert.", "Der Betrag der Abweichung beträgt 2,72 %."] },
    remember: "Modellabweichungen sind nicht automatisch Messfehler.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Gib die Formel in E1 ein.", "Fülle E1 bis E5 aus.", "Vergleiche die Beträge.", "Notiere Spannung und Vorzeichen des größten Betrags."],
    formula: "=(B1-D1)/D1*100", images: [UQ_IMAGES.modelTable],
    troubleshooting: "Setze B1−D1 in Klammern und teile durch den Modellwert D1.",
    mistake: "Vergleiche die Beträge. Eine negative Zahl kann betragsmäßig größer sein als eine positive.",
    check: { prompt: "Bestimme die größte Modellabweichung.", fields: [
      { id: "max", kind: "result", type: "number", label: "Größter Betrag in %", placeholder: "3,74", expected: 3.7364163568, tolerance: 0.08, feedback: { correct: "Der Betrag stimmt.", incorrect: "Vergleiche |E1| bis |E5|." } },
      { id: "u", kind: "result", type: "number", label: "Zugehörige Spannung in V", placeholder: "100", expected: 100, tolerance: 0.01, feedback: { correct: "U = 100 V stimmt.", incorrect: "Der größte Betrag steht in Zeile 2." } },
      { id: "sign", kind: "understanding", type: "choice", label: "Was bedeutet das positive Vorzeichen in Zeile 2?", expected: "above", options: [option("", "Bitte auswählen …"), option("above", "Der Messwert liegt über dem Modellwert."), option("below", "Der Messwert liegt darunter."), option("proof", "Das Modell ist bewiesen.")], feedback: { correct: "Richtig: B2 ist größer als D2.", incorrect: "Positiv bedeutet B2 − D2 > 0." } }
    ], success: "Du kannst Modellabweichungen berechnen und deuten.", retry: "Nutze das Rechenbeispiel aus Zeile 1." }
  },
  {
    id: "uq-power-conclusion", shortTitle: "Urteil", title: "Die Proportionalitätsvermutung beurteilen",
    goal: "Du wendest die Methode des größten Einzelfehlers auf Exponent und Modellabweichungen an und formulierst ein vorsichtiges Urteil.",
    why: "Eine fachlich tragfähige Aussage stützt sich nicht nur darauf, dass der Exponent nahe bei 1 liegt. Auch die Modellabweichungen werden mit dem größten relativen Einzelfehler verglichen. Die gemeinsame Pflichtseite leitet diese schulische Methode einmal ausführlich her.",
    concepts: [{ term: "Exponent n", text: "Im Vergleich nennen wir den Potenzexponenten n, damit er nicht mit dem y-Achsenabschnitt b einer Geraden verwechselt wird." }, { term: "Exponentabweichung", text: "|1,011566 − 1|/1 · 100 ≈ 1,16 %." }, { term: "Größter Einzelfehler", text: "Aus ΔU und ΔQ ergibt sich auf der gemeinsamen Fehlerseite fmax = 10 %." }],
    workedExample: { title: "Beide Abweichungen vergleichen", lines: ["Die relative Exponentabweichung beträgt etwa 1,16 %.", "Die größte Modellabweichung beträgt etwa 3,74 %.", "Beide Werte liegen unter fmax = 10 % und können nach dieser Methode durch die Messfehler erklärt werden."] },
    remember: "n ≈ 1 und die Modellabweichungen sind im Rahmen der Methode des größten Einzelfehlers durch Messfehler erklärbar; bewiesen ist Q ∝ U damit nicht.",
    actionHeading: "Jetzt urteilen", actions: ["Bearbeite die gemeinsame Seite zur Methode des größten Einzelfehlers.", "Vergleiche 1,16 % und 3,74 % jeweils mit fmax = 10 %.", "Behandle den Exponenten näherungsweise als n ≈ 1.", "Formuliere eine Vereinbarkeitsaussage ohne Beweisbehauptung."],
    formula: null, images: [UQ_IMAGES.regression, UQ_IMAGES.modelTable],
    troubleshooting: "fmax = 10 % ist eine übertragene schulische Fehlergrenze. Sie ist weder eine vollständige Fehlerfortpflanzung noch eine statistisch bestimmte Unsicherheit des Exponenten.",
    mistake: "n wird nicht willkürlich gleich 1 gesetzt. Die Theorie erwartet n = 1; weil die relative Exponentabweichung 1,16 % unter fmax liegt, darf n im Rahmen dieser Methode näherungsweise als 1 behandelt werden.",
    sharedRequirement: true,
    check: { prompt: "Prüfe die beiden Abweichungen und die Schlussfolgerung.", fields: [
      { id: "limit", kind: "result", type: "number", label: "Größter relativer Einzelfehler in %", placeholder: "10", expected: 10, tolerance: 0.05, feedback: { correct: "fmax beträgt 10 %.", incorrect: "Bearbeite die gemeinsame Fehlerseite und vergleiche dort 10 % mit 5 %." } },
      { id: "distance", kind: "result", type: "number", label: "Relative Abweichung von n zu 1 in %", placeholder: "1,16", expected: 1.1566178961, tolerance: 0.08, feedback: { correct: "Die relative Exponentabweichung passt.", incorrect: "Berechne |1,011566 − 1|/1 · 100." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Aussage ist angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Die Daten sind mit Q ∝ U vereinbar, beweisen es aber nicht."), option("proven", "Die Proportionalität ist exakt bewiesen."), option("b-error", "10 % ist die statistische Unsicherheit des Exponenten.")], feedback: { correct: "Genau: vereinbar, aber nicht bewiesen.", incorrect: "Unterscheide größten Einzelfehler, Modellabweichung und Exponent." } }
    ], success: "Du hast die Proportionalität fachlich vorsichtig beurteilt.", retry: "Nutze Exponent und Abweichungen gemeinsam." }
  }
]);

export const UQ_CONSTANT_STEPS = Object.freeze([
  {
    id: "uq-constant-context", shortTitle: "Messidee", title: "Proportionalität über eine Konstante prüfen",
    goal: "Du leitest C = Q/U aus Q = C · U ab und verstehst die Idee des Konstantenverfahrens.",
    why: "Bei direkter Proportionalität ist der Quotient aus abhängiger und unabhängiger Größe konstant. Für einen unveränderten Kondensator ist Q/U die Kapazität C. Wegen Messunsicherheiten erwarten wir bei den berechneten Einzelwerten keine exakte Gleichheit, sondern eine Streuung um einen gemeinsamen Wert.",
    concepts: uqContextConcepts,
    workedExample: { title: "Zwei Kapazitäten vergleichen", lines: ["Bei 50 V: C₁ = 2,0/50 = 0,0400 in 10⁻⁸ F.", "Bei 100 V: C₂ = 4,3/100 = 0,0430 in 10⁻⁸ F.", "Die Werte sind nicht gleich, liegen aber nahe beieinander."] },
    remember: "Ist Q proportional zu U, bleibt Q/U innerhalb der Messgenauigkeit ungefähr konstant.",
    actionHeading: "Zuerst begründen", actions: ["Schreibe Q = C · U auf.", "Stelle die Gleichung nach C um.", "Erwarte ähnliche Quotienten statt exakt gleicher Zahlen."],
    dataTable: UQ_EXAMPLE_DATA, formula: null, images: [UQ_IMAGES.table],
    troubleshooting: "Q/U besitzt die Einheit C/V. Diese Einheit ist gleich Farad und beschreibt die Kapazität.",
    mistake: "Eine konstante Differenz Q−U wäre kein Kennzeichen direkter Proportionalität; entscheidend ist der Quotient Q/U.",
    check: { prompt: "Prüfe Umformung und Bedeutung.", fields: [
      { id: "first", kind: "result", type: "number", label: "C₁/(10⁻⁸ F)", placeholder: "0,04", expected: 0.04, tolerance: 0.00001, feedback: { correct: "C₁ stimmt.", incorrect: "Berechne 2,0/50." } },
      { id: "method", kind: "understanding", type: "choice", label: "Was sollte bei Proportionalität ungefähr konstant sein?", expected: "quotient", options: [option("", "Bitte auswählen …"), option("quotient", "Der Quotient Q/U."), option("difference", "Die Differenz Q−U."), option("product", "Das Produkt Q·U.")], feedback: { correct: "Richtig: Q/U = C.", incorrect: "Stelle Q = C · U nach C um." } }
    ], success: "Du verstehst die Idee des Konstantenverfahrens.", retry: "Forme Q = C · U nach C um." }
  },
  {
    id: "uq-constant-table", shortTitle: "Tabelle", title: "Die U-Q-Messreihe eingeben",
    goal: "Du überträgst U und Q korrekt in A1:B5 und beachtest die Skalierung der Ladung.",
    why: "Jede Zeile muss genau eine gemeinsame Messung enthalten, damit der Quotient Q/U zeilenweise berechnet werden kann.",
    concepts: [{ term: "A1:A5", text: "Spannungswerte U in Volt." }, { term: "B1:B5", text: "Zahlenwerte Q/(10⁻⁸ C), also Ladungen in der Einheit 10⁻⁸ C." }, { term: "Skalierung", text: "Der Faktor 10⁻⁸ gehört zur Spalteneinheit und wird nicht zusätzlich in die Zellen geschrieben." }],
    workedExample: { title: "Die letzte Zeile", lines: ["A5 enthält 250.", "B5 enthält 10,2.", "Das bedeutet U = 250 V und Q = 10,2 · 10⁻⁸ C."] },
    remember: "GeoGebra darf 2,0 als 2 anzeigen; die Messgenauigkeit ΔQ = 0,1 · 10⁻⁸ C ändert sich dadurch nicht.",
    actionHeading: "Jetzt auf dem iPad", actions: ["Öffne den Grafikrechner und die Tabellenkalkulation.", "Trage U in A1:A5 ein.", "Trage die Q-Zahlenwerte in B1:B5 ein.", "Prüfe Zeile 1 und Zeile 5."],
    dataTable: UQ_EXAMPLE_DATA, formula: null, images: [UQ_IMAGES.table],
    troubleshooting: "Siehst du den CAS-Rechner, öffne das Menü ☰ und wechsle zum Grafikrechner. Dort findest du links die benötigte Tabellenkalkulation.",
    mistake: "Verrutscht ein Q-Wert um eine Zeile, wird eine falsche Kapazität berechnet.",
    check: { prompt: "Prüfe die Messwerttabelle.", fields: [
      { id: "a1", kind: "result", type: "number", label: "A1 in V", placeholder: "50", expected: 50, tolerance: 0.01, feedback: { correct: "A1 stimmt.", incorrect: "A1 enthält 50 V." } },
      { id: "b5", kind: "result", type: "number", label: "B5: Q/(10⁻⁸ C)", placeholder: "10,2", expected: 10.2, tolerance: 0.001, feedback: { correct: "B5 stimmt.", incorrect: "B5 enthält 10,2." } },
      { id: "scale", kind: "understanding", type: "choice", label: "Was gibst du für 2,0 · 10⁻⁸ C in B1 ein?", expected: "two", options: [option("", "Bitte auswählen …"), option("two", "2 oder 2,0"), option("full", "0,00000002"), option("unit", "2 C")], feedback: { correct: "Richtig: Der Faktor steht in der Spalteneinheit.", incorrect: "In B stehen nur die skalierten Zahlenwerte." } }
    ], success: "Die Messwerte sind richtig übertragen.", retry: "Kontrolliere Zeilen und Skalierung." }
  },
  {
    id: "uq-constant-ratios", shortTitle: "Kapazitäten", title: "Einzelne Kapazitäten berechnen",
    goal: "Du berechnest in C1:C5 für jede Messung den Quotienten Q/U.",
    why: "Die fünf Quotienten zeigen, ob sich die aus den einzelnen Messpaaren berechneten Kapazitäten trotz Messstreuung um einen gemeinsamen Wert gruppieren.",
    concepts: [{ term: "C = Q/U", text: "Die physikalische Größe Kapazität ist Ladung pro Spannung." }, { term: "Relativer Zellbezug", text: "Beim Ausfüllen wird aus B1/A1 automatisch B2/A2." }, { term: "10⁻⁸ F", text: "Die Einheit der in der Tabellenspalte C angezeigten Zahlenwerte." }],
    workedExample: { title: "Erste und dritte Zeile", lines: ["C1 = 2,0/50 = 0,0400.", "C3 = 6,4/150 ≈ 0,042667.", "In Pikofarad entsprechen diese Werte 400 pF und etwa 426,7 pF."] },
    remember: "Die Tabellenspalte C enthält die Einzelwerte der physikalischen Größe C. C1:C5 sind noch nicht ihr Mittelwert.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Tippe C1 an und gib die Formel ein.", "Bestätige das Ergebnis 0,04.", "Fülle C1 bis C5 aus.", "Vergleiche alle fünf Werte."],
    formula: "=B1/A1", images: [UQ_IMAGES.ratioFormula, UQ_IMAGES.ratios],
    troubleshooting: "Berechnet GeoGebra 25, wurden Zähler und Nenner vertauscht. Benötigt wird Q/U, also B1/A1.",
    mistake: "Das Formelzeichen C für die Kapazität und der Buchstabe C der Tabellenspalte haben unterschiedliche Rollen. Außerdem bedeutet der Zellenwert 0,04 wegen der skalierten Q-Spalte nicht 0,04 F, sondern 0,04 · 10⁻⁸ F = 400 pF.",
    check: { prompt: "Prüfe zwei Einzelwerte und die Einheit.", fields: [
      { id: "c2", kind: "result", type: "number", label: "C2: C₂/(10⁻⁸ F)", placeholder: "0,043", expected: 0.043, tolerance: 0.00001, feedback: { correct: "C2 stimmt.", incorrect: "Berechne 4,3/100." } },
      { id: "c5", kind: "result", type: "number", label: "C5: C₅/(10⁻⁸ F)", placeholder: "0,0408", expected: 0.0408, tolerance: 0.00002, feedback: { correct: "C5 stimmt.", incorrect: "Berechne 10,2/250." } },
      { id: "unit", kind: "understanding", type: "choice", label: "Was bedeutet C1 = 0,04?", expected: "scaled", options: [option("", "Bitte auswählen …"), option("scaled", "0,04 · 10⁻⁸ F = 400 pF"), option("farad", "0,04 F"), option("coulomb", "0,04 C")], feedback: { correct: "Richtig: Die Skalierung muss erhalten bleiben.", incorrect: "Q wurde in 10⁻⁸ C eingegeben." } }
    ], success: "Du hast die fünf Kapazitätswerte berechnet.", retry: "Prüfe Q/U und den Faktor 10⁻⁸." }
  },
  {
    id: "uq-constant-mean", shortTitle: "Mittelwert", title: "Eine mittlere Kapazität bestimmen",
    goal: "Du berechnest den Mittelwert der fünf Einzelkapazitäten und wandelst ihn in Pikofarad um.",
    why: "Der arithmetische Mittelwert fasst die streuenden Einzelwerte zu einer gemeinsamen Schätzung der Kondensatorkapazität zusammen. Dabei gehen in dieser vereinfachten Auswertung alle fünf Werte mit gleichem Gewicht ein.",
    concepts: [{ term: "Mittelwert", text: "Summe aller Werte geteilt durch ihre Anzahl." }, { term: "GeoGebra-Objekt a", text: "GeoGebra speichert das Ergebnis hier unter dem automatisch vergebenen Namen a." }, { term: "Pikofarad", text: "1 pF = 10⁻¹² F; kleine Kapazitäten werden damit lesbarer." }],
    workedExample: { title: "Einheiten umrechnen", lines: ["GeoGebra speichert den Mittelwert hier als a ≈ 0,0415933; physikalisch ist damit C̄ ≈ 0,0415933 · 10⁻⁸ F gemeint.", "Das sind 4,15933 · 10⁻¹⁰ F.", "Damit ergibt sich C̄ ≈ 415,93 pF, sinnvoll gerundet etwa 416 pF."] },
    remember: "Die Messreihe liefert als Kapazität ungefähr 416 pF.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Wechsle zur Algebraansicht.", "Gib Mittel(C1:C5) ein.", "Bestätige und notiere a ≈ 0,0415933.", "Falls GeoGebra Mittelwert vorschlägt, kannst du diese gleichwertige Schreibweise wählen."],
    formula: "Mittel(C1:C5)", images: [UQ_IMAGES.mean],
    troubleshooting: "Je nach GeoGebra-Version kann der Befehl als Mittel oder Mittelwert angeboten werden. Wähle den Vorschlag für den Mittelwert von C1:C5.",
    mistake: "Runde nicht schon die Einzelwerte stark. Verwende den von GeoGebra berechneten Mittelwert und runde erst das Endergebnis sinnvoll.",
    check: { prompt: "Prüfe Mittelwert und Umrechnung.", fields: [
      { id: "mean", kind: "result", type: "number", label: "C̄/(10⁻⁸ F)", placeholder: "0,0415933", expected: 0.0415933333, tolerance: 0.00002, feedback: { correct: "Der Mittelwert stimmt.", incorrect: "GeoGebra liefert ungefähr 0,0415933." } },
      { id: "pf", kind: "result", type: "number", label: "Kapazität in pF", placeholder: "416", expected: 415.9333333, tolerance: 1, feedback: { correct: "Etwa 416 pF stimmt.", incorrect: "Multipliziere den Tabellenwert mit 10 000." } },
      { id: "reason", kind: "understanding", type: "choice", label: "Warum bilden wir einen Mittelwert?", expected: "estimate", options: [option("", "Bitte auswählen …"), option("estimate", "Er schätzt die gemeinsame Kapazität aus streuenden Einzelwerten."), option("proof", "Er beweist die Proportionalität."), option("remove", "Er beseitigt Messunsicherheiten.")], feedback: { correct: "Genau: Der Mittelwert ist eine gemeinsame Schätzung.", incorrect: "Streuung bleibt bestehen; sie wird nur zusammengefasst." } }
    ], success: "Du hast die mittlere Kapazität bestimmt.", retry: "Verfolge die Umrechnung bis pF." }
  },
  {
    id: "uq-constant-reference", shortTitle: "Bezugswert", title: "Den Mittelwert neben alle Einzelwerte schreiben",
    goal: "Du überträgst den als a gespeicherten Mittelwert in D1:D5 und verwendest ihn als gemeinsamen Bezugswert.",
    why: "Für jede Zeile benötigen wir denselben Mittelwert, damit GeoGebra die relative Abweichung der jeweiligen Einzelkapazität berechnen kann.",
    concepts: [{ term: "Bezugswert", text: "Der Wert, auf den eine relative Abweichung bezogen wird." }, { term: "=a", text: "Verwendet das gespeicherte GeoGebra-Objekt a." }, { term: "Konstanter Wert", text: "Beim Ausfüllen bleibt a in jeder Zeile gleich." }],
    workedExample: { title: "C und D vergleichen", lines: ["C1 enthält 0,0400.", "D1 enthält den Mittelwert 0,0415933.", "In Zeile 2 ändert sich C, aber D bleibt gleich."] },
    remember: "C enthält Einzelwerte; D enthält fünfmal denselben Mittelwert.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Wechsle zur Tabellenkalkulation.", "Gib in D1 =a ein.", "Fülle D1 bis D5 aus.", "Prüfe, ob alle D-Werte gleich sind."],
    formula: "=a", images: [UQ_IMAGES.meanFormula, UQ_IMAGES.meanFilled],
    troubleshooting: "Wird a nicht erkannt, kontrolliere in der Algebraansicht, ob das Mittelwertergebnis wirklich a heißt.",
    mistake: "a ist hier nur der von GeoGebra vergebene Name des Mittelwerts, nicht der Faktor einer Potenzregression.",
    check: { prompt: "Prüfe Bezugswert und Zellverhalten.", fields: [
      { id: "d3", kind: "result", type: "number", label: "D3", placeholder: "0,0415933", expected: 0.0415933333, tolerance: 0.00002, feedback: { correct: "D3 enthält den Mittelwert.", incorrect: "Alle D-Zellen enthalten a." } },
      { id: "constant", kind: "understanding", type: "choice", label: "Warum ändert sich D beim Ausfüllen nicht?", expected: "object", options: [option("", "Bitte auswählen …"), option("object", "a ist ein fest gespeichertes Zahlenobjekt."), option("error", "GeoGebra kopiert falsch."), option("row", "D hat keine Zeilen.")], feedback: { correct: "Richtig: a bleibt derselbe Bezugswert.", incorrect: "Anders als ein Zellbezug besitzt a keine Zeilennummer." } }
    ], success: "Der gemeinsame Bezugswert steht in D1:D5.", retry: "Vergleiche C und D in mehreren Zeilen." }
  },
  {
    id: "uq-constant-deviation", shortTitle: "Streuung", title: "Abweichungen vom Mittelwert berechnen",
    goal: "Du bestimmst die relativen Abweichungen der Einzelkapazitäten von ihrem Mittelwert.",
    why: "Die relativen Abweichungen zeigen, wie stark die berechneten Kapazitäten im Verhältnis zum gemeinsamen Mittelwert schwanken.",
    concepts: [{ term: "Konstantenabweichung", text: "Relative Differenz einer Einzelkapazität zum Kapazitätsmittelwert." }, { term: "Vorzeichen", text: "Positiv bedeutet oberhalb, negativ unterhalb des Mittelwerts." }, { term: "Größter Betrag", text: "Die stärkste beobachtete Abweichung unabhängig von ihrer Richtung." }],
    workedExample: { title: "Erste Zeile", lines: ["(0,0400 − 0,0415933) / 0,0415933 · 100 ≈ −3,83 %.", "Die erste Kapazität liegt damit unter dem Mittelwert.", "Für die Größe der Abweichung verwenden wir den Betrag 3,83 %."] },
    remember: "Die größte beobachtete Konstantenabweichung beträgt etwa 3,83 %.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Gib die Formel in E1 ein.", "Fülle E1 bis E5 aus.", "Vergleiche die Beträge.", "Ordne das Vorzeichen der ersten Zeile ein."],
    formula: "=(C1-D1)/D1*100", images: [UQ_IMAGES.constantDeviationFormula, UQ_IMAGES.constantDeviations],
    troubleshooting: "Die Klammer um C1−D1 ist wichtig. D1 ist der Bezugswert im Nenner.",
    mistake: "Diese Werte beschreiben die Streuung der berechneten Kapazitäten; sie sind nicht automatisch die Messunsicherheit der Geräte.",
    check: { prompt: "Bestimme und deute die größte Abweichung.", fields: [
      { id: "max", kind: "result", type: "number", label: "Größter Betrag in %", placeholder: "3,83", expected: 3.8307421061, tolerance: 0.08, feedback: { correct: "Der Betrag stimmt.", incorrect: "Vergleiche |E1| bis |E5|." } },
      { id: "u", kind: "result", type: "number", label: "Zugehörige Spannung in V", placeholder: "50", expected: 50, tolerance: 0.01, feedback: { correct: "U = 50 V stimmt.", incorrect: "Der größte Betrag steht in Zeile 1." } },
      { id: "sign", kind: "understanding", type: "choice", label: "Was bedeutet −3,83 %?", expected: "below", options: [option("", "Bitte auswählen …"), option("below", "C₁ liegt unter dem Mittelwert."), option("above", "C₁ liegt darüber."), option("invalid", "Die Messung ist ungültig.")], feedback: { correct: "Richtig: Das Minus zeigt die Richtung.", incorrect: "C1 − D1 ist negativ." } }
    ], success: "Du hast die Streuung der Kapazitätswerte bestimmt.", retry: "Nutze Betrag und Vorzeichen getrennt." }
  },
  {
    id: "uq-constant-uncertainty", shortTitle: "Fehlervergleich", title: "Die Methode des größten Einzelfehlers anwenden",
    goal: "Du überträgst den größten relativen Einzelfehler auf die Streuung der Kapazitätswerte.",
    why: "Die gemeinsame Fehlerseite zeigt, wie aus ΔU und ΔQ der größte relative Einzelfehler fmax = 10 % entsteht. Hier wenden wir dieses Ergebnis auf die größte Konstantenabweichung an.",
    concepts: [{ term: "Methode", text: "Der größte relative Einzelfehler wird als Fehlergrenze auf die untersuchten Abweichungen übertragen." }, { term: "fmax = 10 %", text: "Der Spannungswert 50 V liefert mit 5 V den größten relativen Einzelfehler." }, { term: "Erklärbar", text: "Liegt eine Abweichung unter fmax, kann sie im Rahmen der Methode durch die Messfehler erklärt werden." }],
    workedExample: { title: "Konstantenabweichung vergleichen", lines: ["Die größte Abweichung einer Einzelkapazität vom Mittelwert beträgt 3,83 %.", "Es gilt 3,83 % < fmax = 10 %.", "Die Streuung kann nach dieser schulischen Methode durch die Messfehler erklärt werden."] },
    remember: "Weil 3,83 % < 10 % gilt, darf die Kapazität im Rahmen der Methode als konstant angesehen werden.",
    actionHeading: "Jetzt vergleichen", actions: ["Bearbeite die gemeinsame Seite zur Methode des größten Einzelfehlers.", "Übernimm fmax = 10 %.", "Vergleiche 3,83 % mit fmax.", "Formuliere: Die Abweichung kann durch die Messfehler erklärt werden."],
    formula: null, images: [UQ_IMAGES.table, UQ_IMAGES.constantDeviations],
    troubleshooting: "Falls dir die 10 % noch unklar sind, öffne die gemeinsame Fehlerseite. Dort werden absolute Fehler, relative Einzelfehler und die Wahl des größten Werts Schritt für Schritt getrennt.",
    mistake: "Die 10 % sind nicht die berechnete Unsicherheit jeder Kapazität und keine vollständige Fehlerfortpflanzung. Sie werden in dieser Unterrichtsmethode bewusst als gemeinsame Fehlergrenze übertragen.",
    sharedRequirement: true,
    check: { prompt: "Wende den größten relativen Einzelfehler auf die Konstantenabweichung an.", fields: [
      { id: "u-error", kind: "result", type: "number", label: "Größter relativer Einzelfehler in %", placeholder: "10", expected: 10, tolerance: 0.05, feedback: { correct: "fmax = 10 % stimmt.", incorrect: "Bearbeite die gemeinsame Fehlerseite." } },
      { id: "q-error", kind: "result", type: "number", label: "Größte Konstantenabweichung in %", placeholder: "3,83", expected: 3.8307421061, tolerance: 0.08, feedback: { correct: "3,83 % stimmt.", incorrect: "Vergleiche die Beträge der Kapazitätsabweichungen." } },
      { id: "choice", kind: "understanding", type: "choice", label: "Was folgt aus 3,83 % < 10 %?", expected: "explainable", options: [option("", "Bitte auswählen …"), option("explainable", "Die Streuung kann durch Messfehler erklärt werden."), option("proven", "Die Proportionalität ist mathematisch bewiesen."), option("sum", "Die Fehler müssen zu 15 % addiert werden.")], feedback: { correct: "Richtig: Die Streuung ist mit den Messfehlern erklärbar.", incorrect: "Die Methode überträgt den größten, nicht die Summe der Einzelfehler." } }
    ], success: "Du hast die Methode des größten Einzelfehlers auf das Konstantenverfahren angewendet.", retry: "Vergleiche 3,83 % mit fmax = 10 %." }
  },
  {
    id: "uq-constant-conclusion", shortTitle: "Urteil", title: "Kapazität und Proportionalität beurteilen",
    goal: "Du formulierst aus Mittelwert, Streuung und der Methode des größten Einzelfehlers eine vorsichtige Schlussfolgerung.",
    why: "Ein gutes Ergebnis nennt sowohl den bestimmten Kapazitätswert als auch die Aussagekraft und Begrenzung des Experiments.",
    concepts: [{ term: "Vereinbar", text: "Die Messwerte widersprechen der theoretischen Erwartung innerhalb der verwendeten Abschätzung nicht." }, { term: "Gestützt", text: "Die Messreihe liefert Hinweise zugunsten des Modells." }, { term: "Bewiesen", text: "Eine stärkere Aussage, die aus einer endlichen fehlerbehafteten Messreihe nicht folgt." }],
    workedExample: { title: "Eine angemessene Schlussfolgerung", lines: ["Die mittlere Kapazität beträgt etwa 416 pF.", "Die größte Konstantenabweichung von 3,83 % liegt unter dem größten relativen Einzelfehler von 10 % und kann deshalb durch die Messfehler erklärt werden.", "Im Rahmen dieser schulischen Methode ist die Messreihe mit Q = C · U vereinbar; sie beweist die Proportionalität jedoch nicht."] },
    remember: "Ergebnis: C ≈ 416 pF; die Daten sind mit Q ∝ U vereinbar.",
    actionHeading: "Jetzt formulieren", actions: ["Nenne den Kapazitätsmittelwert mit Einheit.", "Nenne 3,83 % und den größten relativen Einzelfehler 10 %.", "Erkläre die Streuung durch die Messfehler.", "Verwende das Wort vereinbar und vermeide eine Beweisbehauptung."],
    formula: null, images: [UQ_IMAGES.mean, UQ_IMAGES.constantDeviations],
    troubleshooting: "Eine passende Formulierung lautet: Die Messwerte stützen die Proportionalitätsvermutung, beweisen sie aber nicht.",
    mistake: "Aus 3,83 % < 10 % folgt keine exakte Bestätigung. Es folgt nach der vereinfachten Unterrichtsmethode, dass die beobachtete Streuung durch die angegebenen Messfehler erklärt werden kann.",
    sharedRequirement: true,
    check: { prompt: "Prüfe Ergebnis und Schlussfolgerung.", fields: [
      { id: "capacity", kind: "result", type: "number", label: "Mittlere Kapazität in pF", placeholder: "416", expected: 415.9333333, tolerance: 1, feedback: { correct: "Etwa 416 pF stimmt.", incorrect: "Nutze den Mittelwert aus C1:C5." } },
      { id: "deviation", kind: "result", type: "number", label: "Größte Konstantenabweichung in %", placeholder: "3,83", expected: 3.8307421061, tolerance: 0.08, feedback: { correct: "3,83 % stimmt.", incorrect: "Vergleiche die Beträge in E1:E5." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Aussage ist fachlich angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Q ∝ U ist mit den Messdaten vereinbar, aber nicht bewiesen."), option("exact", "Alle Kapazitäten sind exakt gleich."), option("failed", "Jede Streuung widerlegt Proportionalität.")], feedback: { correct: "Genau: vereinbar, nicht bewiesen.", incorrect: "Berücksichtige Messstreuung und die Methode des größten Einzelfehlers." } }
    ], success: "Du hast Kapazität und Proportionalität angemessen beurteilt.", retry: "Verbinde 416 pF, 3,83 % und 10 %." }
  }
]);

export const UQ_LINEAR_STEPS = Object.freeze([
  {
    id: "uq-linear-context", shortTitle: "Messidee", title: "Die theoretische Erwartung formulieren",
    goal: "Du erklärst, warum Q = C · U für einen unveränderten Kondensator eine direkte Proportionalität beschreibt.",
    why: "Ein Experiment prüft, ob die Messdaten mit einem theoretisch vorhergesagten Zusammenhang vereinbar sind. Für einen festen Kondensator sagt Q = C · U voraus, dass Q linear mit U wächst und der Graph durch den Ursprung verläuft. Wegen der Messunsicherheit erwarten wir jedoch keine exakt auf einer Geraden liegenden Punkte.",
    concepts: uqContextConcepts,
    workedExample: { title: "Die Theorie als Graph lesen", lines: ["Bei U = 0 V sagt Q = C · U auch Q = 0 C voraus.", "Eine Verdopplung von U führt bei konstantem C zu einer Verdopplung von Q.", "Der theoretische Graph ist deshalb eine Gerade durch den Ursprung."] },
    remember: "Direkte Proportionalität verlangt beides: einen linearen Verlauf und einen Graphen durch den Ursprung.",
    actionHeading: "Zuerst vorhersagen", actions: ["Lies U und Q mit ihren Einheiten ab.", "Notiere die Hypothese Q = C · U.", "Überlege, welchen Punkt der theoretische Graph bei U = 0 besitzen muss."],
    dataTable: UQ_EXAMPLE_DATA, formula: null, images: [UQ_IMAGES.table],
    troubleshooting: "GeoGebra zeigt 2 statt 2,0. Der Zahlenwert ist derselbe; die angenommene Messunsicherheit ΔQ = 0,1 · 10⁻⁸ C bleibt bestehen.",
    mistake: "Ein ansteigender Verlauf allein reicht nicht aus. Auch ein nicht proportionaler Zusammenhang kann mit U wachsen.",
    check: { prompt: "Prüfe Messwert und theoretische Erwartung.", fields: [
      { id: "q100", kind: "result", type: "number", label: "Q/(10⁻⁸ C) bei U = 100 V", placeholder: "4,3", expected: 4.3, tolerance: 0.001, feedback: { correct: "Der Messwert ist 4,3 · 10⁻⁸ C.", incorrect: "Lies Zeile 2 der Messwerttabelle ab." } },
      { id: "origin", kind: "understanding", type: "choice", label: "Welche zusätzliche Forderung gilt bei direkter Proportionalität?", expected: "origin", options: [option("", "Bitte auswählen …"), option("origin", "Der Graph verläuft durch den Ursprung."), option("horizontal", "Der Graph verläuft waagerecht."), option("curve", "Der Graph muss gekrümmt sein.")], feedback: { correct: "Richtig: Für U = 0 gilt theoretisch Q = 0.", incorrect: "Setze U = 0 in Q = C · U ein." } }
    ], success: "Du kannst die theoretische Erwartung als Ursprungsgerade beschreiben.", retry: "Unterscheide einen beliebigen linearen Verlauf von direkter Proportionalität." }
  },
  {
    id: "uq-linear-table", shortTitle: "Tabelle", title: "U und Q in GeoGebra eingeben",
    goal: "Du überträgst die fünf Messpaare mit korrekter Skalierung in A1:B5.",
    why: "Die lineare Regression ordnet jeder Spannung U genau den in derselben Zeile stehenden Ladungswert Q zu. Deshalb müssen Spalten, Zeilen und Skalierung eindeutig stimmen.",
    concepts: [{ term: "Spalte A", text: "Spannungswerte U in Volt." }, { term: "Spalte B", text: "Zahlenwerte Q/(10⁻⁸ C), also Ladungen in der Einheit 10⁻⁸ C." }, { term: "Messpaar", text: "Zwei Werte derselben Messung in derselben Tabellenzeile." }],
    workedExample: { title: "Zeile 5 lesen", lines: ["A5 enthält 250 und bedeutet U = 250 V.", "B5 enthält 10,2 und bedeutet Q = 10,2 · 10⁻⁸ C.", "Beide Werte bilden gemeinsam das fünfte Messpaar."] },
    remember: "In Spalte B steht nur der skalierte Zahlenwert; der Faktor 10⁻⁸ gehört zur Einheit.",
    actionHeading: "Jetzt auf dem iPad", actions: ["Öffne Rechner Suite → Grafikrechner.", "Öffne die Tabellenkalkulation.", "Trage U in A1:A5 ein.", "Trage die Q-Zahlenwerte in B1:B5 ein."],
    dataTable: UQ_EXAMPLE_DATA, formula: null, images: [UQ_IMAGES.table],
    troubleshooting: "Bist du im CAS-Modus, öffne das Menü ☰ und wähle Grafikrechner. Tippe anschließend links auf Tabellenkalkulation.",
    mistake: "Trage in B nicht zusätzlich den Faktor 10⁻⁸ ein. GeoGebra darf Dezimalpunkte statt Dezimalkommas anzeigen.",
    check: { prompt: "Prüfe die letzte Zeile und die Skalierung.", fields: [
      { id: "a5", kind: "result", type: "number", label: "A5 in V", placeholder: "250", expected: 250, tolerance: 0.01, feedback: { correct: "A5 stimmt.", incorrect: "A5 enthält 250 V." } },
      { id: "b5", kind: "result", type: "number", label: "B5: Q/(10⁻⁸ C)", placeholder: "10,2", expected: 10.2, tolerance: 0.001, feedback: { correct: "B5 stimmt.", incorrect: "B5 enthält 10,2." } },
      { id: "scale", kind: "understanding", type: "choice", label: "Was gibst du für 2,0 · 10⁻⁸ C in B1 ein?", expected: "two", options: [option("", "Bitte auswählen …"), option("two", "2 oder 2,0"), option("full", "0,00000002"), option("unit", "2 C")], feedback: { correct: "Richtig: Der Faktor steht in der Spalteneinheit.", incorrect: "In B stehen die Zahlenwerte Q/(10⁻⁸ C)." } }
    ], success: "Die U-Q-Messreihe ist korrekt übertragen.", retry: "Kontrolliere Zeilen, Einheiten und Skalierung." }
  },
  {
    id: "uq-linear-points", shortTitle: "Punkte", title: "Die Messpaare als Punkte darstellen",
    goal: "Du erzeugst in C1:C5 die Punkte (U, Q) und deutest ihre Koordinaten.",
    why: "Die Regression benötigt Messpunkte. U ist die unabhängige Größe auf der x-Achse; der skalierte Zahlenwert von Q ist die abhängige Größe auf der y-Achse.",
    concepts: [{ term: "x-Koordinate", text: "Der erste Punktwert: U aus Spalte A." }, { term: "y-Koordinate", text: "Der zweite Punktwert: Q aus Spalte B." }, { term: "Relativer Zellbezug", text: "Beim Ausfüllen wird aus A1/B1 automatisch A2/B2 und so weiter." }],
    workedExample: { title: "Aus Zeile 1 wird ein Punkt", lines: ["A1 enthält 50 und B1 enthält 2.", "=(A1,B1) erzeugt den Punkt (50, 2).", "Beim Ausfüllen entsteht in C5 entsprechend (250, 10.2)."] },
    remember: "Die Koordinatenreihenfolge lautet (U, Q) = (x, y).",
    actionHeading: "Jetzt in GeoGebra", actions: ["Tippe C1 an.", "Gib die Formel ein und bestätige.", "Ziehe den Ausfüllgriff bis C5.", "Prüfe den letzten Punkt."],
    formula: "=(A1,B1)", images: [UQ_IMAGES.points],
    troubleshooting: "Beginne mit dem Gleichheitszeichen und setze A1 sowie B1 gemeinsam in runde Klammern.",
    mistake: "Bei =(B1,A1) würden Ladung und Spannung auf den falschen Achsen liegen.",
    check: { prompt: "Prüfe Punkt und Koordinatenreihenfolge.", fields: [
      { id: "c5", kind: "result", type: "choice", label: "Was steht in C5?", expected: "correct", options: [option("", "Bitte auswählen …"), option("correct", "(250, 10.2)"), option("reverse", "(10.2, 250)"), option("copy", "(50, 2)")], feedback: { correct: "C5 stimmt.", incorrect: "C5 verwendet A5 als ersten und B5 als zweiten Wert." } },
      { id: "order", kind: "understanding", type: "choice", label: "Warum steht U an erster Stelle?", expected: "independent", options: [option("", "Bitte auswählen …"), option("independent", "Q wird in Abhängigkeit von U untersucht."), option("larger", "U besitzt größere Zahlenwerte."), option("unit", "Volt steht grundsätzlich zuerst.")], feedback: { correct: "Richtig: U ist die unabhängige x-Größe.", incorrect: "Untersucht wird Q als Funktion der Spannung U." } }
    ], success: "Alle fünf Messpunkte sind für die Regression vorbereitet.", retry: "Denke an die Reihenfolge (U, Q)." }
  },
  {
    id: "uq-linear-concept", shortTitle: "Geradenmodell", title: "Lineare Regression und Proportionalität unterscheiden",
    goal: "Du erklärst die Parameter der Geraden Q(U) = m · U + b und erkennst direkte Proportionalität als Sonderfall b = 0.",
    why: "Eine lineare Regression bestimmt die Gerade, die insgesamt möglichst gut zu den Messpunkten passt. Der freie Achsenabschnitt erlaubt zu prüfen, ob die Daten auf eine Ursprungsgerade hindeuten, statt diese Eigenschaft bereits vorauszusetzen.",
    concepts: [{ term: "Steigung m", text: "Sie gibt die Änderung von Q je Änderung von U an. Im Modell Q = C · U entspricht sie der Kapazität C." }, { term: "y-Achsenabschnitt b", text: "Der vom Modell vorhergesagte Q-Wert bei U = 0." }, { term: "Ursprungsgerade", text: "Eine Gerade mit b = 0; nur dieser lineare Sonderfall ist direkt proportional." }, { term: "Extrapolation", text: "Eine Aussage außerhalb des Messbereichs; hier liegt U = 0 außerhalb der Messwerte von 50 bis 250 V." }],
    workedExample: { title: "Warum der y-Achsenabschnitt wichtig ist", lines: ["Q(U) = 0,04 · U ist direkt proportional, weil b = 0 gilt.", "Q(U) = 0,04 · U + 1 ist zwar linear, aber nicht direkt proportional.", "Eine Verdopplung von U verdoppelt Q bei einem von null verschiedenen b nicht exakt."] },
    remember: "Linear bedeutet nicht automatisch proportional: Direkte Proportionalität verlangt zusätzlich b = 0.",
    actionHeading: "Vor der Regression", actions: ["Vergleiche Q = C · U mit der Schulform y = m · x + b.", "Ordne m der Kapazität C zu.", "Notiere die theoretische Erwartung b = 0."],
    formula: null, images: [],
    troubleshooting: "Der Achsenabschnitt ist der Funktionswert bei U = 0. Er ist nicht mit dem ersten gemessenen Q-Wert zu verwechseln.",
    mistake: "Eine Gerade mit hohem Anstieg oder kleinen Punktabständen ist nicht allein deshalb proportional. Entscheidend ist auch ihr Verlauf durch den Ursprung.",
    check: { prompt: "Prüfe die Bedingungen direkter Proportionalität.", fields: [
      { id: "ideal-intercept", kind: "result", type: "number", label: "Theoretisch erwarteter y-Achsenabschnitt b", placeholder: "0", expected: 0, tolerance: 0.0001, feedback: { correct: "Für direkte Proportionalität gilt b = 0.", incorrect: "Setze U = 0 in Q = C · U ein." } },
      { id: "slope", kind: "understanding", type: "choice", label: "Welche physikalische Größe entspricht der Steigung?", expected: "capacity", options: [option("", "Bitte auswählen …"), option("capacity", "Die Kapazität C."), option("charge", "Die Ladung Q."), option("uncertainty", "Die Messunsicherheit.")], feedback: { correct: "Richtig: C = ΔQ/ΔU entspricht der Steigung.", incorrect: "Vergleiche Q = C · U mit Q = m · U + b." } }
    ], success: "Du kannst lineare und direkt proportionale Zusammenhänge unterscheiden.", retry: "Vergleiche insbesondere die Achsenabschnitte beider Gleichungen." }
  },
  {
    id: "uq-linear-fit", shortTitle: "Trendlinie", title: "Die lineare Regression in GeoGebra berechnen",
    goal: "Du erzeugst eine lineare Regressionsfunktion und liest Steigung sowie Achsenabschnitt ab.",
    why: "Trendlinie passt unmittelbar eine Gerade an alle fünf Messpunkte an. Der kurze Befehl benötigt keinen Polynomgrad. Durch den Namen Q kann die Gerade anschließend mit Q(A1) ausgewertet werden.",
    concepts: [{ term: "Trendlinie", text: "GeoGebras Befehl für die lineare Regressionsgerade einer Punktliste." }, { term: "y = m · x + b", text: "Die in der Schule verwendete Form einer linearen Funktion." }, { term: "Q", text: "Q ist der gewählte Name der Geraden; x steht in GeoGebra inhaltlich für die Spannung U." }],
    workedExample: { title: "Die Ausgabe lesen", lines: ["GeoGebra liefert Q: y = 0,0408 · x + 0,12.", "Damit ist m = 0,0408 und b = 0,12 in der verwendeten Skalierung.", "Die Steigung entspricht 0,0408 · 10⁻⁸ F = 408 pF."] },
    remember: "Steigung m ≈ 408 pF; y-Achsenabschnitt b = 0,12 · 10⁻⁸ C.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Wechsle zur Algebraansicht.", "Gib Q=Trendlinie(C1:C5) ein und bestätige.", "Lies die Zahl vor x als Steigung m ab.", "Lies den konstanten Summanden als y-Achsenabschnitt b ab."],
    formula: "Q=Trendlinie(C1:C5)", images: [UQ_IMAGES.linearRegression],
    troubleshooting: "Prüfe bei einer Fehlermeldung, ob C1:C5 tatsächlich fünf Punkte enthalten. Verwende den Namen Q vor dem Gleichheitszeichen, damit du die Gerade später mit Q(A1) auswerten kannst.",
    mistake: "b = 0,12 ist kein bei U = 0 gemessener Wert. Die Regression extrapoliert die aus 50 bis 250 V gewonnene Gerade bis zur y-Achse.",
    check: { prompt: "Übertrage und deute die Regressionsparameter.", fields: [
      { id: "slope", kind: "result", type: "number", label: "Steigung m", placeholder: "0,0408", expected: 0.0408, tolerance: 0.0001, feedback: { correct: "Die Steigung stimmt.", incorrect: "m ist die Zahl vor x: 0,0408." } },
      { id: "intercept", kind: "result", type: "number", label: "y-Achsenabschnitt b", placeholder: "0,12", expected: 0.12, tolerance: 0.01, feedback: { correct: "Der y-Achsenabschnitt stimmt.", incorrect: "b ist der konstante Summand +0,12." } },
      { id: "capacity", kind: "result", type: "number", label: "Kapazität aus m in pF", placeholder: "408", expected: 408, tolerance: 1, feedback: { correct: "Die Steigung entspricht etwa 408 pF.", incorrect: "Multipliziere 0,0408 mit 10 000." } },
      { id: "degree", kind: "understanding", type: "choice", label: "Was berechnet Trendlinie?", expected: "line", options: [option("", "Bitte auswählen …"), option("line", "Eine möglichst gut passende Regressionsgerade."), option("point", "Nur den ersten Messpunkt."), option("exact", "Eine Gerade durch jeden Messpunkt.")], feedback: { correct: "Richtig: Trendlinie passt eine Gerade an alle Punkte an.", incorrect: "Die Regression sucht eine gemeinsame, möglichst gut passende Gerade." } }
    ], success: "Du hast Regressionsgerade, Steigung und y-Achsenabschnitt richtig bestimmt.", retry: "Lies die Ausgabe in der Form y = m · x + b." }
  },
  {
    id: "uq-linear-model", shortTitle: "Modellwerte", title: "Werte der Regressionsgeraden berechnen",
    goal: "Du berechnest in D1:D5 die Modellwerte der Regressionsgeraden und unterscheidest sie von Messwerten.",
    why: "Messwert und Modellwert müssen sich auf dieselbe Spannung beziehen, bevor ihre Abweichung sinnvoll berechnet werden kann.",
    concepts: [{ term: "Messwert", text: "Der im Versuch bestimmte Q-Wert in Spalte B." }, { term: "Modellwert", text: "Der von Q(x) berechnete Wert in Spalte D." }, { term: "Q(A1)", text: "Setzt die Spannung aus A1 in die Regressionsfunktion ein." }],
    workedExample: { title: "Erste Zeile", lines: ["Für U = 50 V berechnet das Modell Q(50) = 0,0408 · 50 + 0,12.", "Daraus ergibt sich Q(50) = 2,16 · 10⁻⁸ C.", "Der gemessene Wert in B1 beträgt dagegen 2,0 · 10⁻⁸ C."] },
    remember: "B enthält Messwerte; D enthält berechnete Werte der Regressionsgeraden.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Wechsle zur Tabellenkalkulation.", "Gib in D1 die Formel ein.", "Fülle D1 bis D5 aus.", "Prüfe den ersten und letzten Modellwert."],
    formula: "=Q(A1)", images: [UQ_IMAGES.linearModelTable],
    troubleshooting: "Wird Q nicht erkannt, kontrolliere in der Algebraansicht, ob die Regressionsfunktion wirklich Q(x) heißt.",
    mistake: "Die Werte in D wurden nicht gemessen. Sie sind Vorhersagen des linearen Modells für die Spannungen aus Spalte A.",
    check: { prompt: "Prüfe Modellwerte und ihre Bedeutung.", fields: [
      { id: "d1", kind: "result", type: "number", label: "D1: Modellwert Q/(10⁻⁸ C)", placeholder: "2,16", expected: 2.16, tolerance: 0.005, feedback: { correct: "D1 stimmt.", incorrect: "Berechne 0,0408 · 50 + 0,12." } },
      { id: "d5", kind: "result", type: "number", label: "D5: Modellwert Q/(10⁻⁸ C)", placeholder: "10,32", expected: 10.32, tolerance: 0.005, feedback: { correct: "D5 stimmt.", incorrect: "D5 sollte 10,32 enthalten." } },
      { id: "kind", kind: "understanding", type: "choice", label: "Was ist der Wert in D1?", expected: "model", options: [option("", "Bitte auswählen …"), option("model", "Ein berechneter Modellwert."), option("measurement", "Eine zweite Messung."), option("uncertainty", "Die Messunsicherheit.")], feedback: { correct: "Genau: D1 wird aus Q(x) berechnet.", incorrect: "Vergleiche die Aufgaben der Spalten B und D." } }
    ], success: "Du kannst Messwerte und lineare Modellwerte unterscheiden.", retry: "Prüfe D1, D5 und die Bedeutung der Spalten." }
  },
  {
    id: "uq-linear-deviation", shortTitle: "Abweichungen", title: "Relative Modellabweichungen berechnen",
    goal: "Du berechnest die relativen Modellabweichungen und bestimmst ihren größten Betrag.",
    why: "Die relative Abweichung zeigt für jede Spannung, wie groß die Differenz zwischen Messwert und Geradenmodell im Verhältnis zum Modellwert ist.",
    concepts: [{ term: "Relative Modellabweichung", text: "(Messwert − Modellwert) geteilt durch den Modellwert." }, { term: "Vorzeichen", text: "Positiv bedeutet oberhalb, negativ unterhalb der Regressionsgeraden." }, { term: "Betrag", text: "Die Größe der Abweichung ohne Berücksichtigung ihrer Richtung." }],
    workedExample: { title: "Zeile 1", lines: ["(2,0 − 2,16) / 2,16 · 100 ≈ −7,41 %.", "Das Minus zeigt: Der Messwert liegt unter dem Modellwert.", "Der Betrag der Modellabweichung beträgt 7,41 %."] },
    remember: "Die größte lineare Modellabweichung beträgt etwa 7,41 % bei U = 50 V.",
    actionHeading: "Jetzt in GeoGebra", actions: ["Gib die Formel in E1 ein.", "Fülle E1 bis E5 aus.", "Vergleiche die Beträge.", "Notiere Spannung und Vorzeichen des größten Betrags."],
    formula: "=(B1-D1)/D1*100", images: [UQ_IMAGES.linearModelTable],
    troubleshooting: "Setze B1−D1 in Klammern und verwende D1 als Bezugswert im Nenner.",
    mistake: "Die Modellabweichung ist keine Messunsicherheit. Sie beschreibt nur den Abstand eines Messwertes vom gewählten Modell.",
    check: { prompt: "Bestimme und deute die größte Modellabweichung.", fields: [
      { id: "max", kind: "result", type: "number", label: "Größter Betrag in %", placeholder: "7,41", expected: 7.4074074074, tolerance: 0.08, feedback: { correct: "Der Betrag stimmt.", incorrect: "Vergleiche |E1| bis |E5|." } },
      { id: "u", kind: "result", type: "number", label: "Zugehörige Spannung in V", placeholder: "50", expected: 50, tolerance: 0.01, feedback: { correct: "U = 50 V stimmt.", incorrect: "Der größte Betrag steht in Zeile 1." } },
      { id: "sign", kind: "understanding", type: "choice", label: "Was bedeutet das negative Vorzeichen in Zeile 1?", expected: "below", options: [option("", "Bitte auswählen …"), option("below", "Der Messwert liegt unter der Regressionsgeraden."), option("above", "Der Messwert liegt darüber."), option("invalid", "Die Messung ist ungültig.")], feedback: { correct: "Richtig: B1 ist kleiner als D1.", incorrect: "Negativ bedeutet B1 − D1 < 0." } }
    ], success: "Du kannst die Abweichungen vom linearen Modell berechnen und deuten.", retry: "Nutze Betrag und Vorzeichen getrennt." }
  },
  {
    id: "uq-linear-conclusion", shortTitle: "Urteil", title: "Die lineare Auswertung vorsichtig beurteilen",
    goal: "Du verbindest Steigung, y-Achsenabschnitt, Modellabweichungen und die Methode des größten Einzelfehlers zu einem fachlich angemessenen Urteil.",
    why: "Eine lineare Messreihe ist nicht automatisch direkt proportional. Neben der Modellabweichung muss deshalb auch der Einfluss des von null verschiedenen, extrapolierten y-Achsenabschnitts beurteilt werden. Die gemeinsame Fehlerseite zeigt dafür das schulische Vorgehen.",
    concepts: [{ term: "Größter Einzelfehler", text: "Aus ΔU und ΔQ ergibt sich nach der gemeinsamen Methode fmax = 10 %." }, { term: "Anteil von b", text: "Da eine relative Abweichung von b gegenüber null nicht definiert ist, wird |b| auf den kleinsten gemessenen Ladungswert bezogen." }, { term: "Vereinbar", text: "Die Daten liefern im Rahmen der schulischen Methode keinen deutlichen Widerspruch zur theoretischen Erwartung." }],
    workedExample: { title: "Modell und y-Achsenabschnitt prüfen", lines: ["Die größte Modellabweichung 7,41 % liegt unter fmax = 10 %.", "Für den y-Achsenabschnitt gilt |b|/Qmin · 100 = 0,12/2,0 · 100 = 6 %; auch 6 % liegt unter 10 %.", "Beide Abweichungen können nach dieser Methode durch Messfehler erklärt und b näherungsweise vernachlässigt werden: Q(U) ≈ m · U."] },
    remember: "Weil 7,41 % und 6 % unter 10 % liegen, kann b schulisch näherungsweise vernachlässigt werden; statistisch bestätigt ist b = 0 damit nicht.",
    actionHeading: "Jetzt urteilen", actions: ["Bearbeite die gemeinsame Seite zur Methode des größten Einzelfehlers.", "Nenne die Steigung als Kapazität von etwa 408 pF.", "Vergleiche 7,41 % und den Anteil |b|/Qmin = 6 % jeweils mit fmax = 10 %.", "Formuliere b ≈ 0 und Q(U) ≈ m · U als Näherung, nicht als Beweis."],
    formula: null, images: [UQ_IMAGES.linearRegression, UQ_IMAGES.linearModelTable],
    troubleshooting: "Eine relative Abweichung von b gegenüber dem theoretischen Wert null lässt sich wegen der Division durch null nicht berechnen. Deshalb verwendet die Unterrichtsmethode den Anteil |b|/Qmin = 6 %.",
    mistake: "Die Rechnung mit 6 % ist eine schulische Fehlerbeurteilung. Sie ersetzt keine statistische Unsicherheit des Regressionsparameters und bestätigt b = 0 nicht exakt.",
    sharedRequirement: true,
    check: { prompt: "Prüfe Vergleichswerte und Schlussfolgerung.", fields: [
      { id: "limit", kind: "result", type: "number", label: "Größter relativer Einzelfehler in %", placeholder: "10", expected: 10, tolerance: 0.05, feedback: { correct: "fmax beträgt 10 %.", incorrect: "Bearbeite die gemeinsame Fehlerseite." } },
      { id: "intercept", kind: "result", type: "number", label: "Anteil |b|/Qmin in %", placeholder: "6", expected: 6, tolerance: 0.05, feedback: { correct: "Der Anteil des y-Achsenabschnitts beträgt 6 %.", incorrect: "Berechne 0,12/2,0 · 100." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Aussage ist fachlich angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Die Abweichungen sind durch Messfehler erklärbar; b kann näherungsweise vernachlässigt werden."), option("proven", "Die direkte Proportionalität ist exakt bewiesen."), option("uncertainty", "10 % ist die statistische Unsicherheit von b.")], feedback: { correct: "Genau: schulisch erklärbar und näherungsweise vernachlässigbar, aber nicht statistisch bestätigt.", incorrect: "Unterscheide die Unterrichtsmethode von einer statistischen Parameterschätzung." } }
    ], success: "Du hast die lineare Regression mit der Methode des größten Einzelfehlers beurteilt.", retry: "Verbinde 408 pF, b = 0,12, 7,41 %, 6 % und fmax = 10 %." }
  }
]);

export const CHARGING_EXPONENTIAL_STEPS = Object.freeze([
  {
    id: "charging-context", shortTitle: "Aufladung", title: "Den Aufladevorgang und die untersuchte Spannung verstehen",
    goal: "Du erklärst den Aufladevorgang eines Kondensators und begründest, warum die abnehmende Spannungsdifferenz ΔU untersucht wird.",
    why: "Beim Aufladen nähert sich die Kondensatorspannung U_C der angelegten Spannung U₀ immer weiter an. Der noch fehlende Anteil ΔU = U₀ − U_C wird deshalb kleiner. Gerade diese Spannungsdifferenz folgt im idealen RC-Modell unmittelbar einer fallenden Exponentialfunktion und lässt sich mit TrendExp untersuchen.",
    concepts: [
      { term: "Gesamtspannung U₀", text: "Die angelegte Spannung; in diesem Versuch beträgt sie 3,780 V." },
      { term: "Kondensatorspannung U_C", text: "Die während des Aufladens gemessene Spannung am Kondensator." },
      { term: "Spannungsdifferenz ΔU", text: "Der noch fehlende Spannungsanteil U₀ − U_C." },
      { term: "Zeitkonstante τ", text: "Die charakteristische Zeit des Aufladevorgangs. Für einen idealen RC-Kreis gilt τ = R · C." }
    ],
    workedExample: { title: "Zwei Beschreibungen desselben Vorgangs", lines: ["Für den idealen Aufladevorgang gilt U_C(t) = U₀ · (1 − e^(−t/τ)).", "Bildet man U₀ − U_C(t), bleibt ΔU(t) = U₀ · e^(−t/τ).", "U_C steigt daher gegen U₀, während ΔU gleichzeitig gegen null fällt."] },
    remember: "U_C steigt, ΔU fällt – beide Größen beschreiben denselben Aufladevorgang.",
    actionHeading: "Bevor du GeoGebra öffnest",
    actions: ["Notiere U₀ = 3,780 V.", "Ordne t der unabhängigen und ΔU der abhängigen Größe zu.", "Sage den Verlauf voraus: U_C steigt, ΔU nimmt ab."],
    formula: null, images: [],
    troubleshooting: "Verwechsle ΔU nicht mit einer Messunsicherheit. Das Δ bezeichnet hier die Differenz U₀ − U_C.",
    mistake: "Für die Regression wird nicht die steigende Größe U_C verwendet, sondern die fallende Spannungsdifferenz ΔU.",
    check: { prompt: "Prüfe Modell und Spannungsgrößen.", fields: [
      { id: "trend", kind: "result", type: "choice", label: "Wie verändert sich ΔU beim Aufladen?", expected: "decreases", options: [option("", "Bitte auswählen …"), option("decreases", "ΔU nimmt ab und nähert sich null."), option("increases", "ΔU steigt bis U₀."), option("constant", "ΔU bleibt konstant.")], feedback: { correct: "Richtig: Der noch fehlende Spannungsanteil wird kleiner.", incorrect: "Setze ΔU = U₀ − U_C und beachte, dass U_C zunimmt." } },
      { id: "relation", kind: "understanding", type: "choice", label: "Warum untersuchen wir ΔU?", expected: "exponential", options: [option("", "Bitte auswählen …"), option("exponential", "ΔU folgt im idealen RC-Modell direkt einer fallenden Exponentialfunktion."), option("uncertainty", "ΔU ist die Messunsicherheit des Voltmeters."), option("constant", "ΔU muss bei jeder Zeit gleich sein.")], feedback: { correct: "Genau: ΔU besitzt die für TrendExp geeignete Modellform.", incorrect: "Leite ΔU aus der Aufladegleichung her." } }
    ], success: "Du kannst den Aufladevorgang mit U_C und ΔU beschreiben.", retry: "Vergleiche die beiden Formeln und die jeweiligen Verläufe." }
  },
  {
    id: "charging-table", shortTitle: "Messwerte", title: "Zeit und Kondensatorspannung eingeben",
    goal: "Du überträgst die protokollierten Zeiten und Kondensatorspannungen in die richtigen Spalten.",
    why: "Jede Tabellenzeile muss einen Zeitpunkt mit der zu diesem Zeitpunkt gemessenen Kondensatorspannung verbinden. Nur korrekt zugeordnete Messpaare können anschließend ausgewertet werden.",
    concepts: [
      { term: "Spalte A", text: "Zeit t in Sekunden." },
      { term: "Spalte B", text: "Gemessene Kondensatorspannung U_C in Volt." },
      { term: "Messpaar", text: "Zeit und Spannung aus derselben Tabellenzeile." }
    ],
    workedExample: { title: "Eine Tabellenzeile lesen", lines: ["In A3 steht t = 20 s.", "In B3 steht U_C = 1,796 V.", "Damit gehört zum Zeitpunkt 20 s die gemessene Spannung 1,796 V."] },
    remember: "A enthält t in s; B enthält U_C in V.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Öffne Grafikrechner und Tabellenkalkulation.", "Trage die Zeitwerte in A1:A10 ein.", "Trage die zugehörigen Spannungen in B1:B10 ein.", "Kontrolliere besonders die Zeilen bei 0 s und 80 s."],
    dataTable: CHARGING_RAW_DATA, dataHeaders: ["A: t (s)", "B: U_C (V)"], dataKeys: ["t", "uc"], formula: null, images: [CHARGING_IMAGES.deltaFormula],
    troubleshooting: "Siehst du die Tabellenkalkulation nicht, arbeitet GeoGebra möglicherweise noch im CAS-Modus. Öffne das Menü ☰, wähle Grafikrechner und anschließend links das Tabellenkalkulations-Symbol. Dezimalpunkt und Dezimalkomma bezeichnen denselben Zahlenwert.",
    mistake: "Ein Zeitwert darf nicht versehentlich zur Spannung der nächsten Zeile gehören.",
    check: { prompt: "Kontrolliere die verwendete Messreihe.", fields: [
      { id: "t80", kind: "result", type: "number", label: "Zeitwert der neunten Messung in s", placeholder: "80", expected: 80, tolerance: 0.01, feedback: { correct: "Die neunte Messung liegt bei 80 s.", incorrect: "Sieh in A9 nach." } },
      { id: "uc80", kind: "result", type: "number", label: "U_C der neunten Messung in V", placeholder: "3,448", expected: 3.448, tolerance: 0.001, feedback: { correct: "B9 stimmt.", incorrect: "B9 enthält 3,448 V." } },
      { id: "row", kind: "understanding", type: "choice", label: "Was bedeutet eine Tabellenzeile?", expected: "pair", options: [option("", "Bitte auswählen …"), option("pair", "Zeit und Spannung derselben Einzelmessung."), option("independent", "Zwei voneinander unabhängige Werte."), option("model", "Einen bereits berechneten Modellwert.")], feedback: { correct: "Richtig: Eine Zeile bildet ein Messpaar.", incorrect: "A und B derselben Zeile gehören zusammen." } }
    ], success: "Die t-U_C-Messwerte sind richtig zugeordnet.", retry: "Prüfe Spalten, Einheiten und Zeilenzuordnung." }
  },
  {
    id: "charging-delta", shortTitle: "Differenz", title: "Die Spannungsdifferenz ΔU berechnen",
    goal: "Du berechnest aus U₀ und U_C die für die Regression benötigte Spannungsdifferenz.",
    why: "TrendExp soll den exponentiell abnehmenden Anteil beschreiben. Deshalb wird für jede Zeile ΔU = U₀ − U_C berechnet und in einer eigenen Spalte gespeichert.",
    concepts: [
      { term: "Differenz", text: "Der Abstand zwischen der angelegten Spannung U₀ und der bereits erreichten Kondensatorspannung U_C." },
      { term: "Relativer Zellbezug", text: "Beim Ausfüllen wird aus B1 automatisch B2, B3 und so weiter." },
      { term: "Positive Modellwerte", text: "TrendExp benötigt hier positive Werte von ΔU." }
    ],
    workedExample: { title: "Zeile 2 berechnen", lines: ["Bei t = 10 s wurde U_C = 1,061 V gemessen.", "ΔU = 3,780 V − 1,061 V = 2,719 V.", "Beim Ausfüllen berechnet GeoGebra diesen Unterschied für jede Zeile."] },
    remember: "Spalte C enthält ΔU = 3,780 V − U_C.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Tippe C1 an und gib die Formel ein.", "Bestätige: C1 muss 3,780 anzeigen.", "Fülle C1 bis C10 aus.", "Kontrolliere C9 = 0,332."],
    dataTable: CHARGING_RAW_DATA, dataHeaders: ["A: t (s)", "B: U_C (V)", "C: ΔU (V)"], dataKeys: ["t", "uc", "deltaU"], formula: "=3.780-B1", images: [CHARGING_IMAGES.deltaFormula, CHARGING_IMAGES.deltaValues],
    troubleshooting: "Beginne mit dem Gleichheitszeichen. Verwende 3.780 ohne Einheit; GeoGebra rechnet dann mit dem Zahlenwert in Volt.",
    mistake: "Bei B1 − 3.780 würden negative Werte entstehen. Benötigt wird U₀ − U_C.",
    check: { prompt: "Prüfe Rechnung und Verlauf.", fields: [
      { id: "c1", kind: "result", type: "number", label: "C1: ΔU in V", placeholder: "3,780", expected: 3.78, tolerance: 0.001, feedback: { correct: "C1 stimmt.", incorrect: "Bei t = 0 gilt 3,780 − 0 = 3,780 V." } },
      { id: "c9", kind: "result", type: "number", label: "C9: ΔU in V", placeholder: "0,332", expected: 0.332, tolerance: 0.001, feedback: { correct: "C9 stimmt.", incorrect: "Berechne 3,780 − 3,448." } },
      { id: "meaning", kind: "understanding", type: "choice", label: "Warum nimmt ΔU ab?", expected: "charging", options: [option("", "Bitte auswählen …"), option("charging", "U_C nähert sich beim Aufladen U₀."), option("error", "Das Voltmeter wird mit der Zeit ungenauer."), option("time", "Die Zeitwerte werden kleiner.")], feedback: { correct: "Genau: Der Kondensator erreicht immer mehr von U₀.", incorrect: "Betrachte ΔU = U₀ − U_C." } }
    ], success: "Die Spannungsdifferenzen sind korrekt berechnet und gedeutet.", retry: "Prüfe Formelrichtung, C1 und C9." }
  },
  {
    id: "charging-data-check", shortTitle: "Datenprüfung", title: "Das letzte Wertepaar kritisch prüfen",
    goal: "Du erkennst einen auffälligen Protokolleintrag und begründest fachlich sauber, warum er nicht ungeprüft in die Regression eingeht.",
    why: "Vor jeder Regression müssen Messdaten auf Übertragungs- und Protokollfehler geprüft werden. Der letzte Eintrag folgt nach 80 s erst bei 100 s, obwohl zuvor in 10-s-Schritten gemessen wurde. Außerdem weicht er vom aus den ersten neun Punkten bestimmten Modell um etwa 42,6 % ab. Beides ist ein Prüfhinweis, aber noch kein Beweis für einen Fehler.",
    concepts: [
      { term: "Plausibilitätsprüfung", text: "Kontrolle, ob ein Wert zum Messablauf, zum Protokoll und zu anderen Beobachtungen passt." },
      { term: "Auffälliger Messwert", text: "Ein Wert, der deutlich vom übrigen Verlauf abweicht und deshalb untersucht werden muss." },
      { term: "Dokumentierter Ausschluss", text: "Ein Wert wird nur mit sachlicher Begründung aus der Auswertung genommen; er wird nicht heimlich gelöscht oder passend gemacht." }
    ],
    workedExample: { title: "Warum nicht einfach 90 s eintragen?", lines: ["Der Wert ΔU = 0,251 V läge bei 90 s wesentlich näher an der Kurve als bei 100 s.", "Das macht einen Schreibfehler plausibel, beweist aber nicht, dass tatsächlich bei 90 s gemessen wurde.", "Ohne Originalnachweis wird das Wertepaar daher dokumentiert ausgeschlossen; es wird weder auf 90 s umbeschriftet noch nur wegen einer schlechten Modellpassung entfernt."] },
    remember: "Erst prüfen und dokumentieren, dann ausschließen – niemals Messdaten stillschweigend an ein Modell anpassen.",
    actionHeading: "Jetzt die Arbeitsdaten bereinigen",
    actions: ["Vergleiche die Zeitfolge 0, 10, …, 80, 100 s.", "Notiere den ungeklärten Eintrag t = 100 s und U_C = 3,529 V.", "Prüfe wenn möglich das Originalprotokoll.", "Bleibt der Zeitpunkt ungeklärt, lösche A10:C10 aus der Arbeitsauswertung und dokumentiere den Grund."],
    dataTable: CHARGING_RAW_DATA, dataHeaders: ["t (s)", "U_C (V)", "ΔU (V)"], dataKeys: ["t", "uc", "deltaU"], dataCaption: "Protokollierte Messwerte; die mit einem Stern markierte letzte Zeile wird nach der Datenprüfung nicht regressiert.", markExcludedRows: true, formula: null,
    images: [CHARGING_IMAGES.curveWithCheckValue, CHARGING_IMAGES.historicalDeviationFormula, CHARGING_IMAGES.anomaly, CHARGING_IMAGES.plausibleNinety],
    troubleshooting: "Falls das Originalprotokoll den Zeitpunkt eindeutig klärt, muss diese Information statt einer Vermutung verwendet werden. Der Kurs arbeitet mangels Nachweis nur mit den ersten neun Paaren weiter.",
    mistake: "Eine große Abweichung allein berechtigt nicht dazu, einen Messwert zu löschen. Zusätzlich muss ein sachlicher Grund aus Messablauf oder Protokoll vorliegen.",
    check: { prompt: "Prüfe die Entscheidung zur Datenqualität.", fields: [
      { id: "deviation", kind: "result", type: "number", label: "Betrag der auffälligen Modellabweichung in %", placeholder: "42,6", expected: 42.5864056, tolerance: 0.15, feedback: { correct: "Die Größenordnung stimmt.", incorrect: "Der Prüfwert bei 100 s weicht um etwa 42,6 % ab." } },
      { id: "decision", kind: "result", type: "choice", label: "Wie wird ohne geklärtes Originalprotokoll verfahren?", expected: "exclude", options: [option("", "Bitte auswählen …"), option("exclude", "Wertepaar begründet dokumentieren und aus der Regression ausschließen."), option("rename", "100 s ohne Hinweis in 90 s ändern."), option("keep", "Den Wert ungeprüft verwenden.")], feedback: { correct: "Richtig: Ausschluss mit transparenter Begründung.", incorrect: "Der Zeitpunkt darf weder erfunden noch ungeprüft verwendet werden." } },
      { id: "principle", kind: "understanding", type: "choice", label: "Wann darf ein Messwert ausgeschlossen werden?", expected: "evidence", options: [option("", "Bitte auswählen …"), option("evidence", "Wenn ein sachlicher Prüfgrund vorliegt und der Ausschluss dokumentiert wird."), option("fit", "Sobald er schlecht zum gewünschten Modell passt."), option("always", "Immer dann, wenn die Abweichung am größten ist.")], feedback: { correct: "Genau: Datenqualität und Dokumentation sind entscheidend.", incorrect: "Ein Modell darf die Messdaten nicht nachträglich passend auswählen." } }
    ], success: "Du kannst den Ausschluss transparent und fachlich begründen.", retry: "Trenne Plausibilitätsprüfung, Vermutung und gesicherte Korrektur." }
  },
  {
    id: "charging-points", shortTitle: "Punkte", title: "Zeit und Spannungsdifferenz als Punkte darstellen",
    goal: "Du erzeugst aus den neun akzeptierten Wertepaaren die Punkte (t, ΔU).",
    why: "TrendExp erwartet eine Liste von Punkten. Die Zeit wird zur x-Koordinate und die Spannungsdifferenz zur y-Koordinate.",
    concepts: [
      { term: "x-Koordinate", text: "Der Zeitpunkt t aus Spalte A." },
      { term: "y-Koordinate", text: "Die Spannungsdifferenz ΔU aus Spalte C." },
      { term: "Punktbereich D1:D9", text: "Nur die neun fachlich akzeptierten Messpaare für 0 bis 80 s." }
    ],
    workedExample: { title: "Erster und letzter verwendeter Punkt", lines: ["A1 = 0 und C1 = 3,780 ergeben D1 = (0, 3.78).", "A9 = 80 und C9 = 0,332 ergeben D9 = (80, 0.332).", "Das ungeklärte zehnte Wertepaar wird nicht als Regressionspunkt verwendet."] },
    remember: "Die Reihenfolge lautet (t, ΔU) = (x, y), und die Regressionsliste endet bei D9.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Tippe D1 an und gib die Punktformel ein.", "Bestätige den Punkt (0, 3.78).", "Fülle D1 bis D9 aus.", "Sichere den Zwischenstand als bearbeitbare GeoGebra-Datei."],
    dataTable: CHARGING_FIT_DATA, dataHeaders: ["t (s)", "ΔU (V)"], dataKeys: ["t", "deltaU"], formula: "=(A1,C1)", images: [CHARGING_IMAGES.firstPoint, CHARGING_IMAGES.points],
    troubleshooting: "Beginne mit dem Gleichheitszeichen und verwende A1 sowie C1 in runden Klammern. Ziehe den Ausfüllgriff nur bis D9.",
    mistake: "Bei =(C1,A1) würden Zeit und Spannung auf den falschen Achsen liegen.",
    check: { prompt: "Prüfe Punktbereich und Koordinaten.", fields: [
      { id: "d1", kind: "result", type: "choice", label: "Was steht in D1?", expected: "first", options: [option("", "Bitte auswählen …"), option("first", "(0, 3.78)"), option("reversed", "(3.78, 0)"), option("cells", "(A1, C1)")], feedback: { correct: "D1 stimmt.", incorrect: "GeoGebra setzt die Zellwerte in der Reihenfolge A1, C1 ein." } },
      { id: "d9", kind: "result", type: "choice", label: "Was steht in D9?", expected: "last", options: [option("", "Bitte auswählen …"), option("last", "(80, 0.332)"), option("excluded", "(100, 0.251)"), option("copy", "(0, 3.78)")], feedback: { correct: "D9 ist der letzte verwendete Punkt.", incorrect: "Die Regression endet beim Messwert für 80 s." } },
      { id: "order", kind: "understanding", type: "choice", label: "Warum steht t an erster Stelle?", expected: "independent", options: [option("", "Bitte auswählen …"), option("independent", "ΔU wird in Abhängigkeit von der Zeit untersucht."), option("unit", "Sekunden stehen grundsätzlich zuerst."), option("largest", "t besitzt die größeren Zahlenwerte.")], feedback: { correct: "Richtig: t ist die unabhängige x-Größe.", incorrect: "Untersucht wird ΔU als Funktion der Zeit." } }
    ], success: "Die neun Regressionspunkte sind richtig erzeugt.", retry: "Prüfe D1, D9 und die Reihenfolge (t, ΔU)." }
  },
  {
    id: "charging-model", shortTitle: "Modell", title: "Das exponentielle Modell verstehen",
    goal: "Du deutest die Parameter A und k in ΔÛ(t) = A · e^(k·t).",
    why: "Eine Exponentialregression bestimmt diejenige Funktion der gewählten Form, die den Messpunkten insgesamt möglichst nahe kommt. Sie muss deshalb nicht durch jeden Punkt verlaufen.",
    concepts: [
      { term: "Regressionsanfangswert A", text: "Der vom Modell für t = 0 vorhergesagte Wert; er liegt nahe bei U₀, muss aber nicht exakt dem ersten Messwert entsprechen." },
      { term: "Exponent k", text: "Er beschreibt, wie schnell ΔU abnimmt. Bei einem Aufladevorgang ist k negativ." },
      { term: "Eulerzahl e", text: "Die Basis der natürlichen Exponentialfunktion; e ist ungefähr 2,718." }
    ],
    workedExample: { title: "Die Vorzeichenwirkung", lines: ["Bei k < 0 wird k · t mit wachsender Zeit immer negativer.", "Dadurch wird e^(k·t) kleiner.", "Das Modell beschreibt so die beobachtete Abnahme von ΔU."] },
    remember: "A beschreibt den Modellstart; ein negatives k erzeugt den fallenden Verlauf.",
    actionHeading: "Vor der Regression",
    actions: ["Schreibe die Modellform ΔÛ(t) = A · e^(k·t) auf.", "Ordne A dem modellierten Anfangswert zu.", "Begründe aus dem Verlauf, warum k negativ sein muss."],
    formula: null, images: [],
    troubleshooting: "A ist kein frei gewählter Messwert. GeoGebra bestimmt A und k gemeinsam aus allen neun Punkten.",
    mistake: "Eine Exponentialfunktion ist nicht automatisch wachsend. Das Vorzeichen des Exponenten entscheidet über Wachstum oder Abnahme.",
    check: { prompt: "Prüfe Parameter und Regressionsidee.", fields: [
      { id: "sign", kind: "result", type: "choice", label: "Welches Vorzeichen muss k besitzen?", expected: "negative", options: [option("", "Bitte auswählen …"), option("negative", "k < 0"), option("positive", "k > 0"), option("zero", "k = 0")], feedback: { correct: "Richtig: Ein negatives k beschreibt die Abnahme.", incorrect: "ΔU wird mit der Zeit kleiner." } },
      { id: "meaning", kind: "understanding", type: "choice", label: "Was leistet die Regression?", expected: "best-fit", options: [option("", "Bitte auswählen …"), option("best-fit", "Sie passt A und k so an, dass die Kurve insgesamt möglichst nah an den Punkten verläuft."), option("all", "Sie zwingt die Kurve exakt durch jeden Punkt."), option("delete", "Sie löscht automatisch unpassende Messwerte.")], feedback: { correct: "Genau: Die Regression ist eine gemeinsame Modellannäherung.", incorrect: "Messwerte streuen; die Kurve muss nicht durch jeden Punkt gehen." } }
    ], success: "Du kannst Modellform, Parameter und Kurvenverlauf erklären.", retry: "Betrachte besonders das Vorzeichen von k und die Aufgabe einer Regression." }
  },
  {
    id: "charging-regression", shortTitle: "TrendExp", title: "Die Exponentialregression berechnen",
    goal: "Du wendest TrendExp auf D1:D9 an und liest A sowie k aus der Ausgabe ab.",
    why: "TrendExp bestimmt die Parameter der exponentiellen Modellfunktion aus allen neun akzeptierten Punkten. Durch den Funktionsnamen U kann das Modell anschließend direkt in der Tabelle ausgewertet werden.",
    concepts: [
      { term: "TrendExp", text: "GeoGebras Befehl für eine Exponentialregression der Form A · e^(k·x)." },
      { term: "Funktionsname U", text: "Ein frei gewählter Name für die Regressionsfunktion; er erinnert hier an die untersuchte Spannung." },
      { term: "Variable x", text: "GeoGebra schreibt innerhalb der Funktion x; physikalisch steht x hier für die Zeit t." }
    ],
    workedExample: { title: "Die GeoGebra-Ausgabe lesen", lines: ["GeoGebra liefert U(x) ≈ 3,6925788 · e^(−0,0304341x).", "Damit ist A ≈ 3,6925788 V und k ≈ −0,0304341 s⁻¹.", "Der Bereich D1:D9 zeigt, dass nur die akzeptierten Punkte ausgewertet wurden."] },
    remember: "A ≈ 3,69258 V und k ≈ −0,0304341 s⁻¹; verwendet wird D1:D9.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Wechsle zur Algebraansicht.", "Gib die Formel vollständig ein und bestätige.", "Kontrolliere den Punktbereich D1:D9.", "Lies A und k aus der Funktion ab."],
    formula: "U(x)=TrendExp(D1:D9)", images: [CHARGING_IMAGES.regression],
    troubleshooting: "Wenn TrendExp eine Fehlermeldung zeigt, prüfe, ob D1:D9 tatsächlich Punkte enthalten und alle ΔU-Werte positiv sind.",
    mistake: "U ist nur der Funktionsname. Das x in U(x) steht in diesem Versuch für die Zeit t, nicht für eine zusätzliche Messgröße.",
    check: { prompt: "Übertrage Regressionsparameter und Punktbereich.", fields: [
      { id: "a", kind: "result", type: "number", label: "Regressionsanfangswert A in V", placeholder: "3,69258", expected: 3.6925788228, tolerance: 0.0001, feedback: { correct: "A stimmt.", incorrect: "Lies den Faktor vor e ab." } },
      { id: "k", kind: "result", type: "number", label: "Exponent k in s⁻¹", placeholder: "−0,0304341", expected: -0.0304340541, tolerance: 0.00001, feedback: { correct: "k stimmt.", incorrect: "Achte auf das Minuszeichen im Exponenten." } },
      { id: "range", kind: "understanding", type: "choice", label: "Warum endet der Bereich bei D9?", expected: "audited", options: [option("", "Bitte auswählen …"), option("audited", "Nur die neun geprüften Messpaare werden regressiert."), option("limit", "TrendExp erlaubt höchstens neun Punkte."), option("zero", "Der zehnte ΔU-Wert ist null.")], feedback: { correct: "Richtig: D10 wurde wegen des ungeklärten Zeitpunkts ausgeschlossen.", incorrect: "Der Bereich folgt der dokumentierten Datenprüfung." } }
    ], success: "Die Exponentialregression ist korrekt bestimmt und gelesen.", retry: "Prüfe Eingabe, Punktbereich, Faktor und Exponent." }
  },
  {
    id: "charging-time", shortTitle: "Zeitmaße", title: "Zeitkonstante und Halbwertszeit bestimmen",
    goal: "Du berechnest τ und t₁/₂ aus dem Exponenten und kannst die Halbwertszeit am Graphen bestimmen.",
    why: "Der Exponent k ist mathematisch praktisch, aber die Zeitkonstante τ und die Halbwertszeit sind anschaulicher: Sie geben charakteristische Zeitspannen des Aufladevorgangs an.",
    concepts: [
      { term: "Zeitkonstante τ", text: "Für k = −1/τ gilt τ = −1/k. Nach einer Zeitkonstante ist ΔU auf den Anteil 1/e abgesunken." },
      { term: "Halbwertszeit t₁/₂", text: "Die Zeitspanne, in der sich ein Modellwert von ΔU halbiert." },
      { term: "RC-Zeit", text: "Im idealen Stromkreis gilt τ = R · C." }
    ],
    workedExample: { title: "Aus k werden Zeitangaben", lines: ["τ = −1/(−0,0304341 s⁻¹) ≈ 32,86 s.", "t₁/₂ = τ · ln(2) ≈ 22,78 s.", "Grafisch halbiert man A ≈ 3,6926 V zu A/2 ≈ 1,8463 V und liest den zugehörigen Zeitpunkt an der Kurve ab."] },
    remember: "τ ≈ 32,86 s und t₁/₂ ≈ 22,78 s; ohne bekannten Widerstand wird daraus keine Kapazität berechnet.",
    actionHeading: "Jetzt rechnen und am Graphen prüfen",
    actions: ["Berechne τ = −1/k.", "Berechne t₁/₂ = τ · ln(2).", "Halbiere den Modellanfangswert A.", "Gehe im Graphen von A/2 waagerecht zur Kurve und anschließend senkrecht zur Zeitachse."],
    formula: null, images: [],
    troubleshooting: "Verwende für die Modellhalbwertszeit A/2 ≈ 1,8463 V. U₀/2 = 1,890 V liefert einen leicht anderen grafischen Wert, weil die Regression nicht exakt durch den Anfangsmesspunkt verläuft.",
    mistake: "τ und t₁/₂ sind nicht identisch. Es gilt t₁/₂ = τ · ln(2), also t₁/₂ ≈ 0,693 · τ.",
    check: { prompt: "Bestimme beide Zeitmaße und die grafische Vorgehensweise.", fields: [
      { id: "tau", kind: "result", type: "number", label: "Zeitkonstante τ in s", placeholder: "32,86", expected: 32.8579294, tolerance: 0.08, feedback: { correct: "τ stimmt.", incorrect: "Berechne −1/k mit k = −0,0304341 s⁻¹." } },
      { id: "half", kind: "result", type: "number", label: "Halbwertszeit t₁/₂ in s", placeholder: "22,78", expected: 22.7753811, tolerance: 0.08, feedback: { correct: "Die Halbwertszeit stimmt.", incorrect: "Multipliziere τ mit ln(2)." } },
      { id: "graphic", kind: "understanding", type: "choice", label: "Wie wird t₁/₂ am Modellgraphen bestimmt?", expected: "half-a", options: [option("", "Bitte auswählen …"), option("half-a", "A halbieren, waagerecht zur Kurve und senkrecht zur Zeitachse gehen."), option("half-time", "Die größte gemessene Zeit halbieren."), option("intercept", "Den Schnittpunkt mit der t-Achse verwenden.")], feedback: { correct: "Genau: Gesucht ist die Zeit bis zur Halbierung des Modellwerts.", incorrect: "Beginne beim halben Modellanfangswert A/2." } }
    ], success: "Du kannst τ und Halbwertszeit rechnerisch sowie grafisch bestimmen.", retry: "Unterscheide Zeitkonstante, Halbwertszeit und Modellanfangswert." }
  },
  {
    id: "charging-predictions", shortTitle: "Modellwerte", title: "Werte der Exponentialfunktion berechnen",
    goal: "Du berechnest für jeden verwendeten Zeitpunkt den zugehörigen Modellwert.",
    why: "Eine Modellabweichung ist nur sinnvoll, wenn Messwert und Modellwert zum selben Zeitpunkt gehören. U(A1) setzt deshalb genau den Zeitwert der jeweiligen Zeile ein.",
    concepts: [
      { term: "Messwert", text: "Der aus U₀ − U_C bestimmte Wert in Spalte C." },
      { term: "Modellwert", text: "Der von der Regressionsfunktion berechnete Wert in Spalte E." },
      { term: "U(A1)", text: "Der Funktionswert der Regression beim Zeitpunkt aus A1." }
    ],
    workedExample: { title: "Erster Modellwert", lines: ["Für t = 0 gilt U(0) = 3,6925788 · e⁰.", "Daher ist E1 ≈ 3,69258 V.", "Der Messwert C1 = 3,780 V und der Modellwert E1 sind ähnlich, aber nicht identisch."] },
    remember: "C enthält Messwerte von ΔU; E enthält berechnete Werte des Regressionsmodells.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Wechsle zur Tabellenkalkulation.", "Gib in E1 die Modellwertformel ein.", "Fülle E1 bis E9 aus.", "Kontrolliere den ersten und letzten Modellwert."],
    formula: "=U(A1)", images: [CHARGING_IMAGES.modelFormula, CHARGING_IMAGES.modelValues],
    troubleshooting: "Wenn U nicht erkannt wird, kontrolliere in der Algebraansicht den Funktionsnamen U(x). Fülle nur bis E9 aus.",
    mistake: "Die Werte in E sind keine neuen Messungen, sondern Vorhersagen der Regressionsfunktion.",
    check: { prompt: "Prüfe Modellwerte und ihre Bedeutung.", fields: [
      { id: "e1", kind: "result", type: "number", label: "E1: Modellwert in V", placeholder: "3,69258", expected: 3.6925788228, tolerance: 0.0001, feedback: { correct: "E1 stimmt.", incorrect: "Setze t = 0 in die Regressionsfunktion ein." } },
      { id: "e9", kind: "result", type: "number", label: "E9: Modellwert in V", placeholder: "0,32355", expected: 0.323550768, tolerance: 0.0001, feedback: { correct: "E9 stimmt.", incorrect: "E9 sollte etwa 0,32355 V enthalten." } },
      { id: "kind", kind: "understanding", type: "choice", label: "Was ist E1?", expected: "model", options: [option("", "Bitte auswählen …"), option("model", "Ein aus U(x) berechneter Modellwert."), option("measurement", "Eine zweite Spannungsmessung."), option("uncertainty", "Die Unsicherheit des Voltmeters.")], feedback: { correct: "Richtig: E1 stammt aus der Regressionsfunktion.", incorrect: "Vergleiche die Aufgaben der Spalten C und E." } }
    ], success: "Du kannst Messwerte und Modellwerte unterscheiden.", retry: "Prüfe E1, E9 und die Herkunft der Werte." }
  },
  {
    id: "charging-deviations", shortTitle: "Abweichungen", title: "Relative Modellabweichungen bestimmen",
    goal: "Du berechnest die relativen Abweichungen mit derselben Vorzeichenkonvention wie in den anderen Kursen.",
    why: "Die relative Modellabweichung zeigt, wie groß der Unterschied zwischen Messwert und Modellwert im Verhältnis zum Modellwert ist. Durch den Betrag lassen sich unterschiedlich große Modellwerte vergleichen.",
    concepts: [
      { term: "Relative Modellabweichung", text: "(Messwert − Modellwert) geteilt durch den Modellwert, anschließend mit 100 multipliziert." },
      { term: "Vorzeichen", text: "Positiv bedeutet: Messwert über dem Modellwert; negativ bedeutet: Messwert darunter." },
      { term: "Betrag", text: "Die Größe der Abweichung ohne ihre Richtung." }
    ],
    workedExample: { title: "Abweichung bei 80 s", lines: ["Messwert C9 = 0,332 V; Modellwert E9 ≈ 0,32355 V.", "(0,332 − 0,32355)/0,32355 · 100 ≈ +2,61 %.", "Das Plus zeigt, dass der Messwert oberhalb der Modellkurve liegt."] },
    remember: "Der größte Betrag der neun verwendeten Modellabweichungen beträgt etwa 2,61 % bei 80 s.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Gib die Kursformel in F1 ein.", "Fülle F1 bis F9 aus.", "Vergleiche die Beträge der neun Werte.", "Notiere Betrag, Zeitpunkt und Vorzeichen des größten Werts."],
    dataTable: CHARGING_ANALYSIS_DATA, dataHeaders: ["t (s)", "Messwert ΔU (V)", "Modellwert (V)", "Abweichung (%)"], dataKeys: ["t", "deltaU", "predicted", "deviation"], dataFormatDigits: 5,
    formula: "=(C1-E1)/E1*100", images: [],
    troubleshooting: "Die historische Aufnahme zeigt die umgekehrte Subtraktionsreihenfolge. Verwende für diesen Kurs ausschließlich (C1−E1)/E1·100, damit das Vorzeichen zu allen anderen Lernwegen passt.",
    mistake: "Eine Modellabweichung ist keine Messunsicherheit. Sie beschreibt den Abstand eines Messwerts vom gewählten Modell.",
    check: { prompt: "Bestimme und deute die größte verwendete Abweichung.", fields: [
      { id: "max", kind: "result", type: "number", label: "Größter Betrag in %", placeholder: "2,61", expected: 2.61140841, tolerance: 0.05, feedback: { correct: "Der Betrag stimmt.", incorrect: "Vergleiche |F1| bis |F9|." } },
      { id: "time", kind: "result", type: "number", label: "Zugehöriger Zeitpunkt in s", placeholder: "80", expected: 80, tolerance: 0.01, feedback: { correct: "Der größte Betrag liegt bei 80 s.", incorrect: "Suche die Zeile mit dem größten Betrag." } },
      { id: "sign", kind: "understanding", type: "choice", label: "Was bedeutet das positive Vorzeichen bei 80 s?", expected: "above", options: [option("", "Bitte auswählen …"), option("above", "Der Messwert liegt über dem Modellwert."), option("below", "Der Messwert liegt unter dem Modellwert."), option("invalid", "Der Messwert ist automatisch ungültig.")], feedback: { correct: "Richtig: C9 ist größer als E9.", incorrect: "Bei Messwert minus Modellwert bedeutet positiv: Messwert größer." } }
    ], success: "Du kannst Modellabweichungen berechnen und ihr Vorzeichen deuten.", retry: "Nutze Kursformel, Betrag und Vorzeichen getrennt." }
  },
  {
    id: "charging-conclusion", shortTitle: "Urteil", title: "Messfehler abschätzen und das Modell beurteilen",
    goal: "Du wendest die Methode des größten Einzelfehlers an und formulierst ein vorsichtiges Urteil zum exponentiellen Modell.",
    why: "Messpunkte liegen wegen begrenzter Zeit- und Spannungsauflösung nicht exakt auf einer Modellkurve. In der hier verwendeten schulischen Methode wird der größte relative Einzelfehler als Grenze auf die untersuchten Abweichungen übertragen.",
    concepts: [
      { term: "Spannungsfehler", text: "Aus ΔU_Gerät = 0,001 V und dem kleinsten protokollierten Spannungswert 0,251 V ergeben sich rund 0,40 %." },
      { term: "Zeitfehler", text: "Aus Δt = 1 s und dem kleinsten von null verschiedenen Zeitpunkt 10 s ergeben sich 10 %. Bei t = 0 wäre ein relativer Fehler nicht definiert." },
      { term: "Größter relativer Einzelfehler", text: "Das Maximum aus 0,40 % und 10 %, hier also fmax = 10 %." },
      { term: "Vereinbarkeit", text: "Die betrachteten Abweichungen liefern innerhalb dieser vereinfachten Methode keinen deutlichen Widerspruch zum Modell." }
    ],
    workedExample: { title: "Alle Vergleichswerte zusammenführen", lines: ["Spannung: 0,001/0,251 · 100 ≈ 0,40 %; Zeit: 1/10 · 100 = 10 %; damit fmax = 10 %.", "Der Regressionsanfangswert A weicht relativ um etwa 2,31 % von U₀ ab; die größte Modellabweichung beträgt etwa 2,61 %.", "Beide Abweichungen liegen unter 10 % und können nach der schulischen Methode durch die Messfehler erklärt werden."] },
    remember: "Die Daten sind mit einem exponentiellen Aufladevorgang vereinbar; sie beweisen das Modell nicht.",
    actionHeading: "Jetzt ein fachliches Urteil formulieren",
    actions: ["Berechne die relativen Einzelfehler von Spannung und Zeit.", "Bestimme fmax = 10 %.", "Vergleiche 2,31 % und 2,61 % jeweils mit fmax.", "Nenne τ ≈ 32,86 s und dokumentiere den Ausschluss des ungeklärten letzten Zeitwerts."],
    formula: null, images: [],
    troubleshooting: "Der Wert 0,251 V bleibt als kleinster protokollierter Spannungswert für die konservative Gerätefehlerabschätzung nutzbar, obwohl seine ungeklärte Zeitzuordnung nicht regressiert wird. Mit 0,332 V ergäben sich rund 0,30 %; fmax bliebe 10 %.",
    mistake: "Die 10-%-Grenze ist eine vereinfachte schulische Beurteilung, keine vollständige Fehlerfortpflanzung und kein mathematischer Beweis des Modells.",
    check: { prompt: "Prüfe Fehlerwerte und Schlussfolgerung.", fields: [
      { id: "voltage-error", kind: "result", type: "number", label: "Relativer Spannungsfehler in %", placeholder: "0,40", expected: 0.398406375, tolerance: 0.03, feedback: { correct: "Der Spannungsfehler beträgt rund 0,40 %.", incorrect: "Berechne 0,001/0,251 · 100." } },
      { id: "time-error", kind: "result", type: "number", label: "Relativer Zeitfehler in %", placeholder: "10", expected: 10, tolerance: 0.05, feedback: { correct: "Der Zeitfehler beträgt 10 %.", incorrect: "Verwende 1 s und den kleinsten positiven Zeitpunkt 10 s." } },
      { id: "start-error", kind: "result", type: "number", label: "Abweichung von A gegenüber U₀ in %", placeholder: "2,31", expected: 2.312729555, tolerance: 0.05, feedback: { correct: "Die Anfangswertabweichung stimmt.", incorrect: "Berechne |3,69258−3,780|/3,780 · 100." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Schlussfolgerung ist fachlich angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Die geprüften Daten sind mit einem exponentiellen Aufladevorgang vereinbar, beweisen ihn aber nicht."), option("proven", "Die Exponentialfunktion ist mathematisch bewiesen."), option("tau-proven", "Ohne weitere Angaben ist eine theoretisch erwartete Zeitkonstante exakt bestätigt.")], feedback: { correct: "Genau: Vereinbarkeit statt Beweis.", incorrect: "Messunsicherheiten und der dokumentierte Datenausschluss begrenzen die Aussage." } }
    ], success: "Du hast Regression, Zeitmaße, Datenprüfung und Messfehler zu einem vorsichtigen Urteil verbunden.", retry: "Vergleiche 2,31 % und 2,61 % mit fmax = 10 % und formuliere nur eine Vereinbarkeitsaussage." }
  }
]);

export const COURSES = Object.freeze({
  "inverse-square": Object.freeze({
    id: "inverse-square",
    eyebrow: "Umgekehrtes Quadratgesetz",
    title: "Coulombkraft: F ∝ 1/r²",
    subtitle: "Potenzregression der r-F-Messreihe",
    duration: "etwa 20–35 Minuten",
    transferMethod: "inverse-square",
    dataHeaders: ["A: r (cm)", "B: F (mN)"],
    dataKeys: ["r", "f"],
    stages: ["Messwerte", "Punkte", "Modell", "Modellwerte", "Abweichungen", "Urteil"],
    steps: LESSON_STEPS,
    competencies: [
      { label: "Ich kann Messgrößen, Einheiten und Messpaare erklären.", steps: ["context", "table"] },
      { label: "Ich kann Messwerte in GeoGebra als Punkte darstellen.", steps: ["setup", "first-point", "fill-points"] },
      { label: "Ich kann eine Potenzregression berechnen und den Exponenten deuten.", steps: ["regression-concept", "regression"] },
      { label: "Ich kann Modellwerte und Modellabweichungen unterscheiden.", steps: ["predictions", "deviations"] },
      { label: "Ich kann ein Modell unter Berücksichtigung der Messunsicherheit vorsichtig beurteilen.", steps: ["conclusion"] }
    ],
    referenceResults: [
      ["Potenzfunktion", "F(r) ≈ 28,9022 · r^(−2,075)"],
      ["Größte Modellabweichung", "≈ 15,7 % bei r = 12,4 cm"],
      ["Grobe relative Unsicherheit", "≈ 16,7 % beim kleinsten F-Wert"]
    ],
    conclusion: "Der Regressions-Exponent −2,075 liegt nahe beim theoretisch erwarteten Wert −2. Die größte Modellabweichung beträgt etwa 15,7 %; für den kleinsten Kraftwert ergibt sich eine grob abgeschätzte relative Unsicherheit von rund 16,7 %. In dieser vereinfachten Betrachtung sind die Messwerte mit einem 1/r²-Modell vereinbar. Sie beweisen das Modell jedoch nicht."
  }),
  "proportional-power": Object.freeze({
    id: "proportional-power",
    eyebrow: "Direkte Proportionalität · Methode 1",
    title: "Kondensator: Potenzregression",
    subtitle: "Q ∝ U anhand des Exponenten b prüfen",
    duration: "etwa 20–30 Minuten",
    transferMethod: "proportional-power",
    dataHeaders: ["A: U (V)", "B: Q/(10⁻⁸ C)"],
    dataKeys: ["u", "q"],
    sharedRequirement: UQ_SHARED_REQUIREMENT_ID,
    stages: ["Messidee", "Tabelle", "Punkte", "Modell", "Auswertung", "Urteil"],
    steps: UQ_POWER_STEPS,
    competencies: [
      { label: "Ich kann Q = C · U als proportionale Hypothese erklären.", steps: ["uq-power-context"] },
      { label: "Ich kann U-Q-Messwerte in GeoGebra als Punkte darstellen.", steps: ["uq-power-table", "uq-power-points"] },
      { label: "Ich kann b = 1 als proportionalen Sonderfall deuten.", steps: ["uq-power-concept", "uq-power-fit"] },
      { label: "Ich kann Modellwerte und Modellabweichungen berechnen.", steps: ["uq-power-model", "uq-power-deviation"] },
      { label: "Ich kann die Proportionalitätsvermutung vorsichtig beurteilen.", steps: ["uq-power-conclusion"] }
    ],
    referenceResults: [
      ["Potenzfunktion", "Q(U) ≈ 0,0393011 · U^(1,011566)"],
      ["Größte Modellabweichung", "≈ 3,74 % bei U = 100 V"],
      ["Relative Exponentabweichung", "≈ 1,16 %"],
      ["Größter relativer Einzelfehler", "fmax = 10 %"]
    ],
    conclusion: "Der Potenzexponent n ≈ 1,0116 weicht relativ um etwa 1,16 % vom theoretisch erwarteten Wert 1 ab; die größte Modellabweichung beträgt etwa 3,74 %. Beide Werte liegen unter dem größten relativen Einzelfehler fmax = 10 % und können nach dieser schulischen Methode durch die Messfehler erklärt werden. Die Messreihe ist mit Q ∝ U vereinbar, beweist die Proportionalität aber nicht. Der Faktor a der freien Potenzregression wird nicht ungeprüft als Kapazität interpretiert."
  }),
  "proportional-constants": Object.freeze({
    id: "proportional-constants",
    eyebrow: "Direkte Proportionalität · Methode 2",
    title: "Kondensator: Konstantenverfahren",
    subtitle: "Q ∝ U anhand der Quotienten Q/U prüfen",
    duration: "etwa 20–30 Minuten",
    transferMethod: "proportional-constants",
    dataHeaders: ["A: U (V)", "B: Q/(10⁻⁸ C)"],
    dataKeys: ["u", "q"],
    sharedRequirement: UQ_SHARED_REQUIREMENT_ID,
    stages: ["Messidee", "Tabelle", "Kapazitäten", "Mittelwert", "Streuung", "Urteil"],
    steps: UQ_CONSTANT_STEPS,
    competencies: [
      { label: "Ich kann aus Q = C · U die Gleichung C = Q/U herleiten.", steps: ["uq-constant-context"] },
      { label: "Ich kann einzelne Kapazitäten mit GeoGebra berechnen.", steps: ["uq-constant-table", "uq-constant-ratios"] },
      { label: "Ich kann Mittelwert und Kapazität in pF bestimmen.", steps: ["uq-constant-mean", "uq-constant-reference"] },
      { label: "Ich kann Konstantenabweichungen mit dem größten relativen Einzelfehler vergleichen.", steps: ["uq-constant-deviation", "uq-constant-uncertainty"] },
      { label: "Ich kann Proportionalität vorsichtig beurteilen.", steps: ["uq-constant-conclusion"] }
    ],
    referenceResults: [
      ["Mittlere Kapazität", "≈ 0,0415933 · 10⁻⁸ F ≈ 416 pF"],
      ["Größte Konstantenabweichung", "≈ 3,83 % bei U = 50 V"],
      ["Größter relativer Einzelfehler", "fmax = 10 %"]
    ],
    conclusion: "Die mittlere Kapazität beträgt etwa 416 pF. Die größte Konstantenabweichung von etwa 3,83 % liegt unter dem größten relativen Einzelfehler fmax = 10 % und kann nach der schulischen Methode durch die Messfehler erklärt werden. Die Messreihe ist mit Q = C · U vereinbar und stützt die Annahme direkter Proportionalität; sie beweist sie jedoch nicht."
  }),
  "proportional-linear": Object.freeze({
    id: "proportional-linear",
    eyebrow: "Direkte Proportionalität · Methode 3",
    title: "Kondensator: Lineare Regression",
    subtitle: "Q ∝ U anhand von Steigung und Achsenabschnitt prüfen",
    duration: "etwa 20–30 Minuten",
    transferMethod: "proportional-linear",
    dataHeaders: ["A: U (V)", "B: Q/(10⁻⁸ C)"],
    dataKeys: ["u", "q"],
    sharedRequirement: UQ_SHARED_REQUIREMENT_ID,
    stages: ["Messidee", "Tabelle", "Punkte", "Geradenmodell", "Modellwerte", "Abweichungen", "Urteil"],
    steps: UQ_LINEAR_STEPS,
    competencies: [
      { label: "Ich kann Q = C · U als Ursprungsgerade erklären.", steps: ["uq-linear-context"] },
      { label: "Ich kann U-Q-Messwerte in GeoGebra als Punkte darstellen.", steps: ["uq-linear-table", "uq-linear-points"] },
      { label: "Ich kann Steigung und Achsenabschnitt einer Regressionsgeraden deuten.", steps: ["uq-linear-concept", "uq-linear-fit"] },
      { label: "Ich kann Modellwerte und Modellabweichungen berechnen.", steps: ["uq-linear-model", "uq-linear-deviation"] },
      { label: "Ich kann die Proportionalitätsvermutung fachlich vorsichtig beurteilen.", steps: ["uq-linear-conclusion"] }
    ],
    referenceResults: [
      ["Regressionsgerade", "Q(U) = 0,0408 · U + 0,12"],
      ["Kapazität aus der Steigung", "≈ 408 pF"],
      ["Größte Modellabweichung", "≈ 7,41 % bei U = 50 V"],
      ["Anteil des y-Achsenabschnitts", "|b|/Qmin · 100 = 6 %"],
      ["Größter relativer Einzelfehler", "fmax = 10 %"]
    ],
    conclusion: "Die Messpunkte werden gut durch eine Gerade beschrieben. Die Steigung entspricht einer Kapazität von etwa 408 pF. Die größte Modellabweichung von etwa 7,41 % und der relative Anteil des y-Achsenabschnitts von 6 % liegen unter dem größten relativen Einzelfehler fmax = 10 %. Beide Abweichungen können nach der schulischen Methode durch die Messfehler erklärt werden; b darf näherungsweise vernachlässigt werden, sodass Q(U) ≈ m · U gilt. Ein Beweis für direkte Proportionalität oder eine statistische Bestätigung von b = 0 folgt daraus nicht."
  }),
  "capacitor-exponential": Object.freeze({
    id: "capacitor-exponential",
    eyebrow: "Kondensator-Aufladung",
    title: "Kondensator: Exponentialregression",
    subtitle: "ΔU = U₀ − U_C als exponentiell abnehmende Größe untersuchen",
    duration: "etwa 25–40 Minuten",
    transferMethod: null,
    dataHeaders: ["A: t (s)", "B: U_C (V)"],
    dataKeys: ["t", "uc"],
    stages: ["Aufladevorgang", "Messwerte", "Datenprüfung", "Punkte", "Exponentialmodell", "Zeitmaße", "Abweichungen", "Urteil"],
    steps: CHARGING_EXPONENTIAL_STEPS,
    competencies: [
      { label: "Ich kann den Aufladevorgang mit U_C und ΔU beschreiben.", steps: ["charging-context", "charging-delta"] },
      { label: "Ich kann Messdaten eingeben, prüfen und einen Ausschluss transparent begründen.", steps: ["charging-table", "charging-data-check"] },
      { label: "Ich kann Zeit-Spannungs-Punkte erstellen und eine Exponentialregression durchführen.", steps: ["charging-points", "charging-model", "charging-regression"] },
      { label: "Ich kann Zeitkonstante, Halbwertszeit und Modellwerte bestimmen.", steps: ["charging-time", "charging-predictions"] },
      { label: "Ich kann Modellabweichungen mit dem größten relativen Einzelfehler vergleichen und vorsichtig urteilen.", steps: ["charging-deviations", "charging-conclusion"] }
    ],
    referenceResults: [
      ["Exponentialfunktion", "ΔÛ(t) ≈ 3,6925788 · e^(−0,0304341 · t)"],
      ["Zeitkonstante", "τ ≈ 32,86 s"],
      ["Halbwertszeit", "t₁/₂ ≈ 22,78 s"],
      ["Größte Modellabweichung", "≈ 2,61 % bei t = 80 s"],
      ["Größter relativer Einzelfehler", "fmax = 10 %"],
      ["Datenprüfung", "Ungeklärtes Wertepaar bei 100 s dokumentiert ausgeschlossen"]
    ],
    conclusion: "Die Regression der neun geprüften Messpunkte ergibt ΔÛ(t) ≈ 3,6925788 · e^(−0,0304341 · t), eine Zeitkonstante von etwa 32,86 s und eine Halbwertszeit von etwa 22,78 s. Die Abweichung des Regressionsanfangswerts von U₀ beträgt etwa 2,31 %, die größte Modellabweichung etwa 2,61 %. Beide liegen unter dem größten relativen Einzelfehler fmax = 10 % und können nach der schulischen Methode durch Messfehler erklärt werden. Die Daten sind mit einem exponentiellen Aufladevorgang vereinbar, beweisen ihn aber nicht; der Ausschluss des ungeklärten letzten Zeitwerts bleibt ausdrücklich dokumentiert."
  })
});

export const COURSE_IDS = Object.freeze(Object.keys(COURSES));
export const TRANSFER_METHOD_IDS = Object.freeze(COURSE_IDS.filter((id) => COURSES[id].transferMethod === id));
