import { EXAMPLE_DATA } from "./regression.js";

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
    src: "./assets/steps/03-ausfuellgriff.svg", width: 1000, height: 620,
    alt: "Vergrößerte Markierung am unteren rechten Eck der Zelle C1 mit Hinweis zum langen Festhalten und Herunterziehen des Ausfüllgriffs auf dem iPad.",
    caption: "Halte den Ausfüllgriff lange fest und ziehe den violetten Bereich anschließend bis C6.",
    highlights: [{ x: 59.5, y: 38.5, width: 2.5, height: 3.5, label: "Ausfüllgriff" }]
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
    goal: "Du erkennst, was r und F bedeuten und wie die sechs Messungen zusammengehören.",
    why: "Eine Rechnung ist nur sinnvoll, wenn klar ist, was die Zahlen beschreiben. Hier untersuchen wir, wie sich die Kraft F verändert, wenn der Abstand r größer wird.",
    concepts: [
      { term: "Messwert", text: "Eine beobachtete Zahl mit Einheit, zum Beispiel F = 0,37 mN." },
      { term: "Messpaar", text: "Zwei Werte derselben Messung: Abstand r und Kraft F." },
      { term: "Einheit", text: "r wird in Zentimetern (cm), F in Millinewton (mN) angegeben." }
    ],
    workedExample: { title: "Eine Zeile lesen", lines: ["Die erste Messung lautet: r = 8 cm und F = 0,37 mN.", "Die sechste Messung lautet: r = 18,6 cm und F = 0,06 mN.", "Der Abstand wird größer, während die Kraft deutlich kleiner wird."] },
    remember: "Eine Tabellenzeile bildet immer genau ein zusammengehöriges Messpaar (r, F).",
    actionHeading: "Bevor du GeoGebra öffnest",
    actions: ["Lies die erste und die letzte Zeile der Messwerttabelle.", "Achte auf die Einheiten: r in cm und F in mN.", "Formuliere eine Vermutung: Was geschieht mit F, wenn r zunimmt?"],
    dataTable: EXAMPLE_DATA, formula: null, images: [],
    troubleshooting: "Wenn dir Dezimalpunkte ungewohnt sind: 0.37 bedeutet dasselbe wie 0,37. Die Kontrollfelder akzeptieren Punkt und Komma.",
    mistake: "Vergleiche nur Werte derselben Zeile. r = 8 cm gehört zu F = 0,37 mN.",
    check: { prompt: "Prüfe, ob du Messidee und Verlauf verstanden hast.", fields: [
      { id: "trend", kind: "result", type: "choice", label: "Was zeigt die Messreihe insgesamt?", expected: "decreases", options: [option("", "Bitte auswählen …"), option("decreases", "Wenn r zunimmt, wird F kleiner."), option("increases", "Wenn r zunimmt, wird F größer."), option("constant", "F bleibt ungefähr konstant.")], feedback: { correct: "Richtig: Die Kraft nimmt mit wachsendem Abstand ab.", incorrect: "Vergleiche erste und letzte Zeile: r steigt, F sinkt." } },
      { id: "pair", kind: "understanding", type: "choice", label: "Welches ist ein zusammengehöriges Messpaar?", expected: "correct", options: [option("", "Bitte auswählen …"), option("correct", "r = 12,4 cm und F = 0,18 mN"), option("wrong-a", "r = 12,4 cm und F = 0,06 mN"), option("wrong-b", "r = 0,18 cm und F = 12,4 mN")], feedback: { correct: "Genau: Beide Werte stehen in Zeile 4.", incorrect: "Ein Messpaar besteht aus den Werten derselben Tabellenzeile." } }
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
    troubleshooting: "Siehst du nur drei Symbole, wähle im Menü ☰ den Grafikrechner erneut. In einer schmalen Ansicht musst du die linke Leiste eventuell erst einblenden.",
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
    why: "Beim Ausfüllen passt GeoGebra die Zeilennummern automatisch an. Das spart Zeit und verhindert Tippfehler.",
    concepts: [
      { term: "Relativer Zellbezug", text: "Beim Verschieben wandert A1/B1 zu A2/B2 und so weiter." },
      { term: "Ausfüllgriff", text: "Der kleine Griff an der Ecke einer markierten Zelle." },
      { term: "GeoGebra-Datei", text: "Eine bearbeitbare Datei, in der Zellen, Punkte und Funktionen erhalten bleiben." }
    ],
    workedExample: { title: "Was beim Ausfüllen geschieht", lines: ["C1 enthält =(A1,B1).", "In C2 wird daraus automatisch =(A2,B2).", "In C6 entsteht =(A6,B6) und damit (18.6, 0.06)."] },
    remember: "Der Ausfüllgriff kopiert die Rechenidee, nicht den angezeigten Punkt.",
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
    goal: "Du verstehst, was ein Regressionsmodell leistet und wie a und b den Verlauf bestimmen.",
    why: "Messpunkte liegen wegen Streuung selten exakt auf einer einfachen Kurve. Eine Regression sucht die Potenzfunktion, die alle Punkte gemeinsam möglichst gut beschreibt.",
    concepts: [
      { term: "Regression", text: "Ein Verfahren, das eine passende Modellfunktion zu mehreren Messpunkten bestimmt." },
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
    mistake: "Eine Regressionskurve ist keine exakte Verbindungslinie.",
    check: { prompt: "Prüfe Modell und Exponent.", fields: [
      { id: "behavior", kind: "result", type: "choice", label: "Wie verhält sich F bei negativem b?", expected: "falling", options: [option("", "Bitte auswählen …"), option("falling", "F wird bei wachsendem r kleiner."), option("rising", "F wird größer."), option("constant", "F bleibt konstant.")], feedback: { correct: "Richtig: Der Verlauf fällt.", incorrect: "Setze größere r-Werte in 1/r² ein." } },
      { id: "meaning", kind: "understanding", type: "choice", label: "Was leistet eine Regression?", expected: "model", options: [option("", "Bitte auswählen …"), option("model", "Sie findet ein passendes Modell für alle Punkte."), option("connect", "Sie verbindet alle Punkte mit Geraden."), option("prove", "Sie beweist ein Naturgesetz.")], feedback: { correct: "Genau: Die Regression beschreibt den gemeinsamen Trend.", incorrect: "Sie liefert ein angenähertes Modell, keinen Beweis." } }
    ], success: "Du kannst Potenzregression und negativen Exponenten deuten.", retry: "Lies Beispiel und Definition erneut." }
  },
  {
    id: "regression", shortTitle: "TrendPot", title: "TrendPot in GeoGebra anwenden",
    goal: "Du berechnest die Potenzregression und liest Faktor und Exponent ab.",
    why: "Nachdem das Modell klar ist, übernimmt GeoGebra die aufwendige Berechnung der passenden Parameter a und b.",
    concepts: [
      { term: "TrendPot", text: "Der GeoGebra-Befehl für eine Potenzregression." },
      { term: "C1:C6", text: "Der Zellbereich von C1 bis einschließlich C6." },
      { term: "Funktionsname F", text: "Damit kann das Modell später in der Tabelle aufgerufen werden." }
    ],
    workedExample: { title: "Die Ausgabe lesen", lines: ["GeoGebra liefert etwa F(r) = 28,9022 · r⁻²·⁰⁷⁵.", "Damit ist a ≈ 28,9022 und b ≈ −2,075.", "b liegt nahe bei −2, ist aber nicht exakt gleich −2."] },
    remember: "TrendPot benötigt die Punkte C1:C6; F ist der Name des Modells.",
    actionHeading: "Jetzt in GeoGebra",
    actions: ["Wechsle zur Ansicht Algebra.", "Tippe in eine leere Eingabezeile.", "Gib den Befehl ein und bestätige.", "Lies a und b ab."],
    formula: "F(x)=TrendPot(C1:C6)", images: [IMAGES.regression],
    troubleshooting: "Meldet GeoGebra einen Fehler, prüfe C1:C6. TrendPot benötigt positive Punktkoordinaten.",
    mistake: "Die Zahl vor x ist a; die Hochzahl ist b. Das Minuszeichen darf nicht fehlen.",
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
    why: "Eine bloße Differenz ist bei großen und kleinen Werten schwer vergleichbar. Die relative Modellabweichung bezieht sie auf den Modellwert.",
    concepts: [
      { term: "Differenz", text: "Messwert minus Modellwert: B1 − D1." },
      { term: "Relative Modellabweichung", text: "Die Differenz geteilt durch den Modellwert D1." },
      { term: "Vorzeichen", text: "Plus: Messwert über dem Modell. Minus: Messwert darunter." },
      { term: "Betrag", text: "Die Größe ohne Vorzeichen, zum Beispiel |−10,6 %| = 10,6 %." }
    ],
    workedExample: { title: "Zeile 1 vollständig berechnen", lines: ["0,37 − 0,38638 = −0,01638 mN", "−0,01638 / 0,38638 ≈ −0,0424", "−0,0424 · 100 ≈ −4,24 %: Der Messwert liegt unter dem Modellwert."] },
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
      { term: "Messunsicherheit", text: "Ein Bereich, in dem ein Messwert wegen begrenzter Genauigkeit schwanken kann." },
      { term: "Vereinbar", text: "Die Daten widersprechen dem Modell innerhalb der angenommenen Genauigkeit nicht." },
      { term: "Bewiesen", text: "Eine viel stärkere Aussage, die aus dieser Messreihe nicht folgt." },
      { term: "R²", text: "Ein Maß für die Modellgüte; ein hoher Wert beweist kein Naturgesetz." }
    ],
    workedExample: { title: "Eine angemessene Schlussfolgerung", lines: ["b = −2,075 liegt nahe bei −2.", "Die größte Modellabweichung ist etwa 15,7 %; 0,01/0,06 · 100 ergibt grob 16,7 %.", "Die Daten sprechen daher nicht gegen 1/r², beweisen es aber nicht und bestimmen nicht direkt die Unsicherheit von b."] },
    remember: "Formuliere: mit 1/r² vereinbar – nicht: exakt bewiesen.",
    actionHeading: "Jetzt auswerten",
    actions: ["Betrachte Punkte und Kurve.", "Vergleiche −2,075 mit −2.", "Vergleiche 15,7 % Modellabweichung mit der groben relativen Unsicherheit 16,7 %.", "Wähle eine vorsichtige Schlussfolgerung."],
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
