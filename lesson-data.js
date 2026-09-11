import { EXAMPLE_DATA } from "./regression.js";

export const LESSON_STEPS = Object.freeze([
  {
    id: "table",
    shortTitle: "Tabelle",
    title: "Tabelle vorbereiten",
    goal: "Du öffnest die Tabellenkalkulation und überträgst die sechs Messwertpaare.",
    actions: [
      "Öffne die GeoGebra Rechner Suite auf dem iPad.",
      "Tippe links auf Tabellenkalkulation.",
      "Trage die r-Werte in A1 bis A6 und die Kraftwerte F in B1 bis B6 ein. Verwende die Werte aus der Tabelle unten."
    ],
    dataTable: EXAMPLE_DATA,
    images: [
      {
        src: "./assets/steps/01-messwerte.png",
        width: 469,
        height: 600,
        alt: "GeoGebra Tabellenkalkulation mit sechs r-Werten in Spalte A und sechs Kraftwerten in Spalte B.",
        caption: "Die Ausgangsdaten stehen in den Spalten A und B.",
        highlights: [{ x: 32, y: 28, width: 66, height: 56, label: "A1:B6" }]
      }
    ],
    hint: "Achte vor dem Öffnen der Tabellenkalkulation darauf, dass du im Hamburger-Menü oben links den Modus „Grafikrechner“ gewählt hast. Dann siehst du links vier Symbole; bei nur drei Symbolen wähle „Grafikrechner“ noch einmal.",
    mistake: "Achte darauf, 0.06 wirklich in B6 einzutragen. Ein fehlendes Dezimalzeichen verändert die Regression stark.",
    check: {
      prompt: "Übertrage zur Kontrolle die Werte aus der letzten Zeile.",
      fields: [
        { id: "a6", type: "number", label: "Wert in A6", placeholder: "18,6", expected: 18.6, tolerance: 0.001 },
        { id: "b6", type: "number", label: "Wert in B6", placeholder: "0,06", expected: 0.06, tolerance: 0.001 }
      ],
      success: "Die Messwerttabelle stimmt. Jetzt erzeugst du aus jedem Wertepaar einen Punkt.",
      retry: "Prüfe die letzte Tabellenzeile noch einmal: A6 enthält den Abstand, B6 die zugehörige Kraft."
    }
  },
  {
    id: "first-point",
    shortTitle: "Punkt C1",
    title: "Ersten Messpunkt erzeugen",
    goal: "Du verknüpfst A1 und B1 zu einem Punkt, den GeoGebra zeichnen kann.",
    actions: [
      "Tippe auf die leere Zelle C1.",
      "Gib die Formel unten ein und bestätige sie.",
      "GeoGebra ersetzt die Zellbezüge durch den Punkt mit den Werten aus A1 und B1."
    ],
    formula: "=(A1,B1)",
    images: [
      {
        src: "./assets/steps/02-punkt-c1.png",
        width: 628,
        height: 478,
        alt: "In der GeoGebra-Zelle C1 wird die Formel gleich Klammer auf A1 Komma B1 Klammer zu eingegeben.",
        caption: "Die Zelle C1 verbindet die beiden Werte aus Zeile 1.",
        highlights: [{ x: 70, y: 34, width: 26, height: 11, label: "C1" }]
      }
    ],
    hint: "Das führende Gleichheitszeichen gehört zur Eingabe. Zwischen den Zellnamen steht ein Komma.",
    mistake: "Schreibe A1 und B1 ohne Anführungszeichen. Sonst entsteht Text statt eines Punkts.",
    check: {
      prompt: "Welcher Punkt sollte nach dem Bestätigen in C1 erscheinen?",
      fields: [
        {
          id: "c1",
          type: "choice",
          label: "Anzeige in C1",
          expected: "correct",
          options: [
            { value: "", label: "Bitte auswählen …" },
            { value: "correct", label: "(8, 0.37)" },
            { value: "wrong-a", label: "(A1, B1)" },
            { value: "wrong-b", label: "(0.37, 8)" }
          ]
        }
      ],
      success: "Richtig. C1 ist der Punkt (8, 0.37).",
      retry: "Ein Punkt zeigt die konkreten Koordinaten: zuerst den r-Wert aus A1, dann den F-Wert aus B1."
    }
  },
  {
    id: "fill-points",
    shortTitle: "Ausfüllen",
    title: "Punkte nach unten ausfüllen",
    goal: "Du überträgst die Formel aus C1 auf die übrigen fünf Messwertpaare.",
    actions: [
      "Tippe C1 an, sodass die Zelle markiert ist.",
      "Ziehe den kleinen Ausfüllgriff an der Ecke der Markierung bis zur Zelle C6 nach unten.",
      "Lass los. In C1 bis C6 sollten nun sechs Punkte stehen."
    ],
    images: [
      {
        src: "./assets/steps/03-punkte-ausfuellen.png",
        width: 632,
        height: 545,
        alt: "GeoGebra-Tabelle mit den sechs erzeugten Punkten in der Spalte C.",
        caption: "Durch relatives Ausfüllen werden aus A2 und B2 automatisch C2 und so weiter.",
        highlights: [{ x: 70, y: 36, width: 25, height: 51, label: "C1:C6" }]
      },
      {
        src: "./assets/steps/03-ausfuellgriff.svg",
        width: 1000,
        height: 620,
        alt: "Vergrößerte Markierung am unteren rechten Eck der Zelle C1 mit Hinweis zum langen Festhalten und Herunterziehen des Ausfüllgriffs auf dem iPad.",
        caption: "Halte den Ausfüllgriff lange fest. Ziehe danach den lila Bereich bis C6 nach unten.",
        highlights: [{ x: 59.5, y: 38.5, width: 2.5, height: 3.5, label: "Ausfüllgriff" }]
      }
    ],
    hint: "Auf dem iPad musst du den Ausfüllgriff am unteren rechten Eck der markierten Zelle lange festhalten. Erst dann lässt sich der lila Bereich bis C6 nach unten ziehen.",
    mistake: "Kopiere nicht den angezeigten Wert (8, 0.37). Es muss die Formel kopiert werden, damit die Zellbezüge mitwandern.",
    check: {
      prompt: "Welcher Punkt muss nach dem Ausfüllen in C6 stehen?",
      fields: [
        {
          id: "c6",
          type: "choice",
          label: "Anzeige in C6",
          expected: "correct",
          options: [
            { value: "", label: "Bitte auswählen …" },
            { value: "wrong-a", label: "(8, 0.37)" },
            { value: "correct", label: "(18.6, 0.06)" },
            { value: "wrong-b", label: "(0.06, 18.6)" }
          ]
        }
      ],
      success: "Genau. Alle sechs Messpunkte sind jetzt vorhanden.",
      retry: "C6 bezieht sich auf die sechste Zeile: A6 liefert die erste, B6 die zweite Koordinate."
    }
  },
  {
    id: "save",
    shortTitle: "Sichern",
    title: "Zwischenstand sichern",
    goal: "Du speicherst deinen Arbeitsstand, bevor du mit der Regression weiterarbeitest.",
    actions: [
      "Öffne das Menü oben links in der Rechner Suite.",
      "Tippe auf Teilen.",
      "Wähle im iPad-Dialog In Dateien sichern und merke dir den Speicherort."
    ],
    images: [
      {
        src: "./assets/steps/04-zwischenstand-sichern.png",
        width: 720,
        height: 530,
        alt: "Geöffnetes GeoGebra-Menü mit dem Eintrag Teilen.",
        caption: "Über Teilen gelangst du auf dem iPad zum Sichern der GeoGebra-Datei.",
        highlights: [{ x: 3, y: 54, width: 48, height: 18, label: "Teilen" }]
      }
    ],
    hint: "Im iPad-Teilen-Menü musst du eventuell nach unten scrollen, bis In Dateien sichern sichtbar wird.",
    mistake: "Ein exportiertes Bild reicht nicht: Sichere die GeoGebra-Datei, damit du später weiterrechnen kannst.",
    check: {
      prompt: "Bestätige erst, wenn die Datei in der Dateien-App sichtbar ist.",
      fields: [
        { id: "saved", type: "checkbox", label: "Ich habe den Arbeitsstand als GeoGebra-Datei gesichert.", expected: true }
      ],
      success: "Gesichert. Falls GeoGebra hängen bleibt, kannst du an diesem Stand weiterarbeiten.",
      retry: "Öffne den gewählten Ordner in der Dateien-App und prüfe, ob die GeoGebra-Datei dort liegt."
    }
  },
  {
    id: "regression",
    shortTitle: "TrendPot",
    title: "Potenzregression erzeugen",
    goal: "Du lässt GeoGebra die Funktion F(r) = a · rᵇ aus den Punkten C1 bis C6 bestimmen.",
    actions: [
      "Wechsle links zur Ansicht Algebra.",
      "Tippe in eine leere Eingabezeile.",
      "Gib den Befehl unten ein und bestätige. GeoGebra zeichnet die Kurve und zeigt die Funktionsgleichung."
    ],
    formula: "F(x)=TrendPot(C1:C6)",
    images: [
      {
        src: "./assets/steps/05-potenzregression.png",
        width: 954,
        height: 525,
        alt: "GeoGebra-Algebraansicht mit der Eingabe F von x gleich TrendPot von C1 bis C6 und der berechneten Potenzfunktion.",
        caption: "GeoGebra berechnet näherungsweise F(r) = 28,90 · r⁻²·⁰⁷⁵.",
        highlights: [{ x: 15, y: 13, width: 78, height: 21, label: "Regression F" }]
      }
    ],
    hint: "TrendPot erwartet eine Liste von Punkten. Der Bereich C1:C6 enthält genau diese sechs Punkte.",
    mistake: "Alle Punkte müssen positive Koordinaten besitzen. Prüfe A, B und C, falls GeoGebra einen Fehler meldet.",
    check: {
      prompt: "Übertrage den Faktor a und den Exponenten b aus deiner GeoGebra-Funktion.",
      fields: [
        { id: "a", type: "number", label: "Faktor a", placeholder: "28,9022", expected: 28.9022, tolerance: 0.05 },
        { id: "b", type: "number", label: "Exponent b", placeholder: "-2,0750", expected: -2.075, tolerance: 0.01 }
      ],
      success: "Die Regressionsfunktion stimmt. Der Exponent liegt bereits sehr nahe bei −2.",
      retry: "Lies die Funktion als a · xᵇ: Die Zahl vor x ist a, die hochgestellte Zahl ist b."
    }
  },
  {
    id: "predictions",
    shortTitle: "F(A1)",
    title: "Regressionswerte berechnen",
    goal: "Du berechnest für jeden Abstand den von der Regressionsfunktion vorhergesagten Kraftwert.",
    actions: [
      "Wechsle zurück zur Tabellenkalkulation und tippe D1 an.",
      "Gib die Formel unten ein und bestätige.",
      "Fülle D1 anschließend bis D6 nach unten aus."
    ],
    formula: "=F(A1)",
    images: [
      {
        src: "./assets/steps/06-regressionswerte.png",
        width: 987,
        height: 623,
        alt: "GeoGebra-Tabelle mit der Formel gleich F von A1 in Zelle D1.",
        caption: "Spalte D enthält die ungerundeten Werte der Regressionsfunktion.",
        highlights: [{ x: 61, y: 20, width: 17, height: 9, label: "D1" }]
      }
    ],
    hint: "F ist der Name der Funktion aus Schritt 5. A1 ist der erste Abstandswert.",
    mistake: "Runde die Werte in Spalte D nicht von Hand. Für die Fehlerrechnung werden die ungerundeten GeoGebra-Werte benötigt.",
    check: {
      prompt: "Übertrage den ersten und letzten Regressionswert. Angezeigte Rundungen sind erlaubt.",
      fields: [
        { id: "d1", type: "number", label: "Wert in D1", placeholder: "0,38638", expected: 0.38638, tolerance: 0.001 },
        { id: "d6", type: "number", label: "Wert in D6", placeholder: "0,06709", expected: 0.06709, tolerance: 0.001 }
      ],
      success: "Die Regressionswerte passen. Jetzt kannst du Messung und Modell zeilenweise vergleichen.",
      retry: "Prüfe, ob D1 wirklich F(A1) und D6 nach dem Ausfüllen F(A6) enthält."
    }
  },
  {
    id: "deviations",
    shortTitle: "Abweichung",
    title: "Prozentuale Abweichungen bestimmen",
    goal: "Du vergleichst jeden Messwert mit dem zugehörigen Regressionswert.",
    actions: [
      "Tippe die Zelle E1 an und gib die Formel unten ein.",
      "Bestätige und fülle E1 bis E6 nach unten aus.",
      "Vergleiche für die Fehlergröße die Beträge: Das Vorzeichen zeigt nur, auf welcher Seite der Kurve ein Messwert liegt."
    ],
    formula: "=(B1-D1)/D1*100",
    images: [
      {
        src: "./assets/steps/07-abweichungsformel.png",
        width: 1077,
        height: 460,
        alt: "GeoGebra-Tabelle mit der Formel für die prozentuale Abweichung in Zelle E1.",
        caption: "In E1 wird die relative Abweichung in Prozent berechnet.",
        highlights: [{ x: 73, y: 22, width: 21, height: 15, label: "Formel in E1" }]
      },
      {
        src: "./assets/steps/08-abweichungen.png",
        width: 1080,
        height: 505,
        alt: "GeoGebra-Tabelle mit den sechs berechneten prozentualen Abweichungen in Spalte E.",
        caption: "Der größte Betrag liegt in Zeile 4 bei rund 15,7 Prozent.",
        highlights: [{ x: 73, y: 22, width: 21, height: 56, label: "E1:E6" }]
      }
    ],
    hint: "Nutze für den größten Fehler nicht einfach die größte positive Zahl. Vergleiche die absoluten Beträge aller sechs Werte.",
    mistake: "Ein negativer Wert ist nicht automatisch ein größerer Fehler. −10 % hat einen kleineren Betrag als +15 %.",
    check: {
      prompt: "Bestimme den größten Betrag und deute das Vorzeichen.",
      fields: [
        { id: "max", type: "number", label: "Größter Betrag in %", placeholder: "15,7", expected: 15.6637, tolerance: 0.3 },
        { id: "row", type: "number", label: "Zugehöriger r-Wert", placeholder: "12,4", expected: 12.4, tolerance: 0.01 },
        {
          id: "sign",
          type: "choice",
          label: "Ein negativer Wert bedeutet …",
          expected: "below",
          options: [
            { value: "", label: "Bitte auswählen …" },
            { value: "below", label: "Der Messwert liegt unter dem Regressionswert." },
            { value: "above", label: "Der Messwert liegt über dem Regressionswert." },
            { value: "invalid", label: "Die Messung ist ungültig." }
          ]
        }
      ],
      success: "Richtig: Der größte Betrag beträgt etwa 15,7 % bei r = 12,4.",
      retry: "Vergleiche die Beträge in E1:E6. Ein Minuszeichen gibt nur die Richtung der Abweichung an."
    }
  },
  {
    id: "conclusion",
    shortTitle: "Beurteilen",
    title: "1/r²-Gesetz beurteilen",
    goal: "Du verbindest Regressions-Exponent und Messunsicherheit zu einer begründeten physikalischen Aussage.",
    actions: [
      "Betrachte Messpunkte und Regressionskurve in der Grafikansicht.",
      "Vergleiche den Regressions-Exponenten −2,075 mit dem idealen Exponenten eines 1/r²-Gesetzes.",
      "Berechne für den kleinsten Messwert den möglichen relativen Einzelfehler 0,01 / 0,06 · 100."
    ],
    images: [
      {
        src: "./assets/steps/09-regressionskurve.png",
        width: 996,
        height: 849,
        alt: "GeoGebra-Grafik mit sechs Messpunkten und einer fallenden roten Potenz-Regressionskurve.",
        caption: "Die Punkte streuen um eine Kurve, deren Exponent nahe bei −2 liegt.",
        highlights: [{ x: 32, y: 3, width: 55, height: 79, label: "Punkte und Kurve" }]
      }
    ],
    hint: "1/r² lässt sich als r⁻² schreiben. Vergleiche außerdem 15,7 % maximale Abweichung mit 16,7 % möglichem Einzelfehler.",
    mistake: "Die Daten beweisen das Gesetz nicht exakt. Sie sind innerhalb der angenommenen Messgenauigkeit damit vereinbar.",
    check: {
      prompt: "Formuliere die abschließende Beurteilung.",
      fields: [
        { id: "ideal", type: "number", label: "Idealer Exponent", placeholder: "-2", expected: -2, tolerance: 0.05 },
        { id: "error", type: "number", label: "Relativer Fehler in %", placeholder: "16,7", expected: 16.7, tolerance: 0.7 },
        {
          id: "judgement",
          type: "choice",
          label: "Welche Aussage ist angemessen?",
          expected: "supported",
          options: [
            { value: "", label: "Bitte auswählen …" },
            { value: "proven", label: "Das 1/r²-Gesetz ist exakt bewiesen." },
            { value: "supported", label: "Die Messwerte sind innerhalb der Messgenauigkeit mit 1/r² vereinbar." },
            { value: "rejected", label: "Die Messwerte widersprechen eindeutig einem 1/r²-Gesetz." }
          ]
        }
      ],
      success: "Geschafft: Die Daten stützen ein 1/r²-Gesetz innerhalb der angenommenen Messgenauigkeit.",
      retry: "Vergleiche sowohl den Exponenten mit −2 als auch 15,7 % Abweichung mit rund 16,7 % möglichem Einzelfehler."
    }
  }
]);
