import { EXAMPLE_DATA, UQ_EXAMPLE_DATA } from "./regression.js";

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
      { term: "R²", text: "Ein Maß für die Modellgüte; ein hoher Wert beweist kein Naturgesetz." }
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
    "C1:C5 enthält die Punkte (U, Q), die TrendPot für die Regression benötigt.",
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
    goal: "Du verbindest Exponent, Modellabweichungen und die vereinfachte 10-%-Vergleichsgrenze zu einem vorsichtigen Urteil.",
    why: "Eine fachlich tragfähige Aussage stützt sich nicht nur darauf, dass der Exponent nahe bei 1 liegt. Auch die Abweichungen der Messpunkte und die Messgenauigkeit müssen gemeinsam betrachtet werden.",
    concepts: [{ term: "ΔU = 5 V", text: "Bei 10-V-Skalenteilen wird hier ein halber Skalenteil, also 5 V, als Ableseunsicherheit angenommen." }, { term: "ΔQ = 0,1 · 10⁻⁸ C", text: "Für diesen Kurs wird die letzte angegebene Stelle der Ladungswerte als absolute Unsicherheit angesetzt." }, { term: "Vergleichsgrenze", text: "Der größere der beiden relativen Einzelwerte wird bewusst vereinfachend als gemeinsame 10-%-Grenze verwendet." }],
    workedExample: { title: "Die größte Einzelunsicherheit", lines: ["Für U: 5/50 · 100 = 10 %.", "Für Q: 0,1/2,0 · 100 = 5 %.", "Die größere Einzelunsicherheit beträgt 10 %; die größte Modellabweichung 3,74 % liegt darunter."] },
    remember: "b ≈ 1 und kleine Modellabweichungen stützen Q ∝ U; sie beweisen die Proportionalität nicht.",
    actionHeading: "Jetzt urteilen", actions: ["Vergleiche b = 1,0116 mit dem theoretischen Wert 1.", "Vergleiche 3,74 % mit der vereinfachten Vergleichsgrenze von 10 %.", "Formuliere eine Vereinbarkeitsaussage.", "Bezeichne 10 % nicht als Unsicherheit von b."],
    formula: null, images: [UQ_IMAGES.regression, UQ_IMAGES.modelTable],
    troubleshooting: "Die 10-%-Grenze ist eine vereinfachte schulische Vergleichsgröße. Sie ist weder eine vollständige Fehlerfortpflanzung noch eine Unsicherheit des Exponenten b.",
    mistake: "b wird nicht deshalb auf 1 gesetzt, weil 1,0116 nahe bei 1 liegt. Vielmehr gibt die Theorie für direkte Proportionalität unabhängig von der Messung b = 1 vor; die Regression prüft, ob die Messdaten mit dieser Erwartung vereinbar sind.",
    check: { prompt: "Prüfe Vergleichsgrenze und Schlussfolgerung.", fields: [
      { id: "limit", kind: "result", type: "number", label: "Vereinfachte Vergleichsgrenze in %", placeholder: "10", expected: 10, tolerance: 0.05, feedback: { correct: "Die vereinfachte Grenze beträgt 10 %.", incorrect: "Vergleiche 5/50 mit 0,1/2,0." } },
      { id: "distance", kind: "result", type: "number", label: "Abstand von b zu 1", placeholder: "0,0116", expected: 0.011566179, tolerance: 0.002, feedback: { correct: "Der Abstand passt.", incorrect: "Berechne |1,011566 − 1|." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Aussage ist angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Die Daten sind mit Q ∝ U vereinbar, beweisen es aber nicht."), option("proven", "Die Proportionalität ist exakt bewiesen."), option("b-error", "10 % ist die Unsicherheit von b.")], feedback: { correct: "Genau: vereinbar, aber nicht bewiesen.", incorrect: "Unterscheide Vergleichsgrenze, Modellabweichung und Exponent." } }
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
    id: "uq-constant-uncertainty", shortTitle: "Vergleichsgrenze", title: "Eine vereinfachte Vergleichsgrenze abschätzen",
    goal: "Du bestimmst aus ΔU und ΔQ die größte relative Einzelunsicherheit und kennst die Grenzen dieser Abschätzung.",
    why: "Der Vergleich mit den relativen Messunsicherheiten hilft einzuschätzen, ob die beobachtete Streuung auffällig groß ist. Der hier verwendete größte Einzelwert ist jedoch nur eine vereinfachte Vergleichsgröße und noch keine Unsicherheit des Quotienten Q/U.",
    concepts: [{ term: "ΔU = 5 V", text: "Bei 10-V-Skalenteilen wird hier ein halber Skalenteil, also 5 V, als Ableseunsicherheit angenommen." }, { term: "ΔQ = 0,1 · 10⁻⁸ C", text: "Für diesen Kurs wird die letzte angegebene Stelle als absolute Unsicherheit der Ladung angesetzt." }, { term: "Relative Einzelunsicherheit", text: "Für die vereinfachte Abschätzung verwenden wir den größeren der beiden relativen Einzelwerte als gemeinsame Vergleichsgrenze." }],
    workedExample: { title: "Warum 10 %?", lines: ["Die größte relative U-Unsicherheit liegt beim kleinsten U: 5/50 · 100 = 10 %.", "Die größte relative Q-Unsicherheit liegt beim kleinsten Q: 0,1/2,0 · 100 = 5 %.", "Der größere Einzelwert und damit die grobe Vergleichsgrenze ist 10 %."] },
    remember: "10 % ist eine bewusst vereinfachte Vergleichsgrenze – nicht die berechnete Unsicherheit von C und keine vollständige Fehlerfortpflanzung.",
    actionHeading: "Jetzt vergleichen", actions: ["Berechne die relative U-Unsicherheit bei 50 V.", "Berechne die relative Q-Unsicherheit bei 2,0 · 10⁻⁸ C.", "Wähle den größeren Wert.", "Vergleiche ihn mit 3,83 %."],
    formula: null, images: [UQ_IMAGES.table, UQ_IMAGES.constantDeviations],
    troubleshooting: "Absolute Unsicherheiten besitzen Einheiten. Erst nach der Division durch den jeweiligen Messwert entstehen vergleichbare Prozentwerte.",
    mistake: "Die 10-%-Grenze ist weder die Unsicherheit jeder einzelnen Kapazität noch das Ergebnis einer Fehlerfortpflanzung. Sie dient in diesem Lernweg nur als grober Vergleichswert.",
    check: { prompt: "Berechne beide relativen Einzelunsicherheiten.", fields: [
      { id: "u-error", kind: "result", type: "number", label: "Größte relative U-Unsicherheit in %", placeholder: "10", expected: 10, tolerance: 0.05, feedback: { correct: "10 % stimmt.", incorrect: "Berechne 5/50 · 100." } },
      { id: "q-error", kind: "result", type: "number", label: "Größte relative Q-Unsicherheit in %", placeholder: "5", expected: 5, tolerance: 0.05, feedback: { correct: "5 % stimmt.", incorrect: "Berechne 0,1/2,0 · 100." } },
      { id: "choice", kind: "understanding", type: "choice", label: "Welche Grenze wird vereinfachend verwendet?", expected: "ten", options: [option("", "Bitte auswählen …"), option("ten", "Der größere Einzelwert 10 %."), option("sum", "Immer die Summe 15 %."), option("mean", "Der Mittelwert 7,5 %.")], feedback: { correct: "Richtig: Der Kurs verwendet bewusst 10 %.", incorrect: "Gesucht ist der größte einzelne relative Wert." } }
    ], success: "Du kannst die vereinfachte 10-%-Vergleichsgrenze erklären.", retry: "Vergleiche 10 % und 5 % und beachte die Grenzen der Abschätzung." }
  },
  {
    id: "uq-constant-conclusion", shortTitle: "Urteil", title: "Kapazität und Proportionalität beurteilen",
    goal: "Du formulierst aus Mittelwert, Streuung und vereinfachter Vergleichsgrenze eine vorsichtige Schlussfolgerung.",
    why: "Ein gutes Ergebnis nennt sowohl den bestimmten Kapazitätswert als auch die Aussagekraft und Begrenzung des Experiments.",
    concepts: [{ term: "Vereinbar", text: "Die Messwerte widersprechen der theoretischen Erwartung innerhalb der verwendeten Abschätzung nicht." }, { term: "Gestützt", text: "Die Messreihe liefert Hinweise zugunsten des Modells." }, { term: "Bewiesen", text: "Eine stärkere Aussage, die aus einer endlichen fehlerbehafteten Messreihe nicht folgt." }],
    workedExample: { title: "Eine angemessene Schlussfolgerung", lines: ["Die mittlere Kapazität beträgt etwa 416 pF.", "Die größte Konstantenabweichung von 3,83 % liegt unter der vereinfachten 10-%-Vergleichsgrenze.", "In dieser vereinfachten Betrachtung ist die Messreihe daher mit Q = C · U vereinbar und stützt die Annahme direkter Proportionalität; sie beweist sie jedoch nicht."] },
    remember: "Ergebnis: C ≈ 416 pF; die Daten sind mit Q ∝ U vereinbar.",
    actionHeading: "Jetzt formulieren", actions: ["Nenne den Kapazitätsmittelwert mit Einheit.", "Nenne die größte Abweichung und die vereinfachte Vergleichsgrenze.", "Verwende das Wort vereinbar.", "Weise auf die vereinfachte Unsicherheitsbetrachtung hin."],
    formula: null, images: [UQ_IMAGES.mean, UQ_IMAGES.constantDeviations],
    troubleshooting: "Eine passende Formulierung lautet: Die Messwerte stützen die Proportionalitätsvermutung, beweisen sie aber nicht.",
    mistake: "Aus 3,83 % < 10 % folgt keine exakte Bestätigung. Es folgt nur, dass die beobachtete Streuung im Rahmen der vereinfachten Betrachtung nicht auffällig groß ist.",
    check: { prompt: "Prüfe Ergebnis und Schlussfolgerung.", fields: [
      { id: "capacity", kind: "result", type: "number", label: "Mittlere Kapazität in pF", placeholder: "416", expected: 415.9333333, tolerance: 1, feedback: { correct: "Etwa 416 pF stimmt.", incorrect: "Nutze den Mittelwert aus C1:C5." } },
      { id: "deviation", kind: "result", type: "number", label: "Größte Konstantenabweichung in %", placeholder: "3,83", expected: 3.8307421061, tolerance: 0.08, feedback: { correct: "3,83 % stimmt.", incorrect: "Vergleiche die Beträge in E1:E5." } },
      { id: "judgement", kind: "understanding", type: "choice", label: "Welche Aussage ist fachlich angemessen?", expected: "compatible", options: [option("", "Bitte auswählen …"), option("compatible", "Q ∝ U ist mit den Messdaten vereinbar, aber nicht bewiesen."), option("exact", "Alle Kapazitäten sind exakt gleich."), option("failed", "Jede Streuung widerlegt Proportionalität.")], feedback: { correct: "Genau: vereinbar, nicht bewiesen.", incorrect: "Berücksichtige Messstreuung und die vereinfachte Vergleichsgrenze." } }
    ], success: "Du hast Kapazität und Proportionalität angemessen beurteilt.", retry: "Verbinde 416 pF, 3,83 % und 10 %." }
  }
]);

export const COURSES = Object.freeze({
  "inverse-square": Object.freeze({
    id: "inverse-square",
    eyebrow: "Umgekehrtes Quadratgesetz",
    title: "Coulombkraft: F ∝ 1/r²",
    subtitle: "Potenzregression der r-F-Messreihe",
    duration: "etwa 20–35 Minuten",
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
    dataHeaders: ["A: U (V)", "B: Q/(10⁻⁸ C)"],
    dataKeys: ["u", "q"],
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
      ["Grobe Vergleichsgrenze", "10 %; keine Unsicherheit von b"]
    ],
    conclusion: "Der Exponent b ≈ 1,0116 liegt nahe beim theoretisch erwarteten Wert 1; zugleich liegt die größte Modellabweichung von etwa 3,74 % unter der vereinfachten 10-%-Vergleichsgrenze. In dieser vereinfachten Betrachtung ist die Messreihe mit Q ∝ U vereinbar, beweist die Proportionalität aber nicht. Der Faktor a der freien Potenzregression wird nicht ungeprüft als Kapazität interpretiert."
  }),
  "proportional-constants": Object.freeze({
    id: "proportional-constants",
    eyebrow: "Direkte Proportionalität · Methode 2",
    title: "Kondensator: Konstantenverfahren",
    subtitle: "Q ∝ U anhand der Quotienten Q/U prüfen",
    duration: "etwa 20–30 Minuten",
    dataHeaders: ["A: U (V)", "B: Q/(10⁻⁸ C)"],
    dataKeys: ["u", "q"],
    stages: ["Messidee", "Tabelle", "Kapazitäten", "Mittelwert", "Streuung", "Urteil"],
    steps: UQ_CONSTANT_STEPS,
    competencies: [
      { label: "Ich kann aus Q = C · U die Gleichung C = Q/U herleiten.", steps: ["uq-constant-context"] },
      { label: "Ich kann einzelne Kapazitäten mit GeoGebra berechnen.", steps: ["uq-constant-table", "uq-constant-ratios"] },
      { label: "Ich kann Mittelwert und Kapazität in pF bestimmen.", steps: ["uq-constant-mean", "uq-constant-reference"] },
      { label: "Ich kann Konstantenabweichungen und die vereinfachte Vergleichsgrenze berechnen.", steps: ["uq-constant-deviation", "uq-constant-uncertainty"] },
      { label: "Ich kann Proportionalität vorsichtig beurteilen.", steps: ["uq-constant-conclusion"] }
    ],
    referenceResults: [
      ["Mittlere Kapazität", "≈ 0,0415933 · 10⁻⁸ F ≈ 416 pF"],
      ["Größte Konstantenabweichung", "≈ 3,83 % bei U = 50 V"],
      ["Grobe Vergleichsgrenze", "10 %"]
    ],
    conclusion: "Die mittlere Kapazität beträgt etwa 416 pF. Die größte Konstantenabweichung von etwa 3,83 % liegt unter der bewusst vereinfachten 10-%-Vergleichsgrenze. In dieser Betrachtung ist die Messreihe mit Q = C · U vereinbar und stützt die Annahme direkter Proportionalität; sie beweist sie jedoch nicht."
  })
});

export const COURSE_IDS = Object.freeze(Object.keys(COURSES));
