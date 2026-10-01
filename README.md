# GeoGebra-Trainer: Messdaten auswerten und Modelle beurteilen

Eine statische, für GitHub Pages geeignete Webanwendung für die Oberstufe (Physik). Schülerinnen und Schüler führen Regressionen selbstständig in der separaten GeoGebra Rechner Suite durch und dokumentieren ihre Auswertungen anschließend strukturiert für Klausuren.

Die Anwendung gliedert sich in drei Hauptbereiche:

1. **Regression lernen** (`index.html`) – Fünf geführte Lernwege mit einheitlicher Phasennavigation, konkreten Handlungsanweisungen, kopierbaren GeoGebra-Befehlen und gezielten Kontrollen.
2. **Selbstständig auswerten** (`selbst-auswerten.html`) – Drei neue Übungsdatensätze (linear, Potenz, exponentiell) mit jeweils 7 Zeilen zur eigenständigen Übertragung des Gelernten auf neue Daten samt Befehls-Cheat-Sheet und gestuften Hilfen.
3. **Für die Klausur dokumentieren** (`dokumentation.html`) – Fünf vollständige Klausurmuster, papierbasierte Schreibübungen und optimierte Druckansichten für Muster und Arbeitsblätter.
4. **Ergänzende Methodenhilfe** (`groesster-einzelfehler.html`) – Ausführliche Herleitung und Nachschlagehilfe zur im Unterricht vereinbarten Methode des größten Einzelfehlers.

---

## Die fünf Lernwege („Regression lernen“)

Die Lernwege sind nach der mathematischen Methode geordnet. Die drei Q-U-Verfahren stellen alternative Auswertungsmethoden für denselben Datensatz dar:

- **Lineare Regression:** Kondensatorladung $Q(U)$ mit Geradenanpassung und freiem Achsenabschnitt
- **Potenzregression:**
  - Coulomb-Versuch: Kraftgesetz $F(r) \propto 1/r^2$
  - Kondensatorladung: Nachweis der Proportionalität $Q \propto U$
- **Exponentialregression:** Kondensator-Aufladung mit $\Delta U(t) = U_0 e^{kt}$
- **Ergänzendes Auswertungsverfahren:** Kondensatorladung mit dem Konstantenverfahren ($C = Q/U$)

### Einheitlicher 5-Phasen-Ablauf

Jeder Lernweg folgt derselben 5-stufigen Struktur:
1. **Daten vorbereiten:** Tabellenkalkulation einrichten, Messwerte eintragen, Punkte erzeugen.
2. **Modell berechnen:** Passenden Regressionsbefehl (`TrendPot`, `Trendlinie`, `TrendExp` bzw. `Mittel`) ausführen und Graph prüfen.
3. **Parameter deuten:** Physikalische Größen und Einheiten zuordnen (z. B. $n \approx -2$, $m = C$, $\tau = -1/k$).
4. **Abweichungen prüfen:** Modellwerte berechnen, relative Abweichungen bestimmen und mit der schulischen Vergleichsgrenze vergleichen.
5. **Ergebnis formulieren:** Begründetes und vorsichtiges physikalisches Fazit festhalten.

### Exponentialregression: 9-Punkte-Grundweg und Vertiefung

- **Grundweg (0 bis 80 s):** Der reguläre Lernweg und das zugehörige Klausurmuster werten ausschließlich die neun regulären Messpaare $D_1:D_9$ aus ($t = 0$ bis $80\,\mathrm{s}$). Die Referenzergebnisse lauten:
  - $A \approx 3{,}6926\,\mathrm{V}$
  - $k \approx -0{,}030434\,\mathrm{s}^{-1}$
  - $\tau \approx 32{,}86\,\mathrm{s}$
  - $t_{1/2} \approx 22{,}78\,\mathrm{s}$
  - Größte Modellabweichung: $\approx 2{,}61\,\%$ bei $80\,\mathrm{s}$
  - Anfangswertabweichung: $\approx 2{,}31\,\%$
- **Auffälligen Messwert untersuchen (Vertiefung):** Der zehnte Messwert ($t = 100\,\mathrm{s}$, $U_C = 3{,}529\,\mathrm{V}$, $\Delta U = 0{,}251\,\mathrm{V}$) wird als transparente Vertiefung separat analysiert. Ein Vergleich zeigt, dass eine Regression über alle 10 Punkte ($A \approx 3{,}478\,\mathrm{V}$, $k \approx -0{,}0284\,\mathrm{s}^{-1}$) eine maximale Abweichung von $\approx 23{,}0\,\%$ liefert, während der zehnte Punkt vom 9-Punkte-Modell um $\approx 42{,}6\,\%$ abweicht. Die Rohdaten bleiben unverändert erhalten; es erfolgt kein automatischer Daten-Ausschluss.

---

## Fachlicher Hinweis zur schulischen Fehlerregel

Wir verwenden im Unterricht die **Methode des größten Einzelfehlers** als pragmatische, vereinfachte Vergleichsregel. Aus den geschätzten Eingangsunsicherheiten wird der größte relative Einzelfehler $f_{\max}$ ermittelt (z. B. $10\,\%$ bei den Q-U-Messungen und bei der Aufladung).

> **Wichtige methodische Abgrenzung:**  
> Diese schulische Regel stellt **keine** vollständige Fehlerfortpflanzung nach Gauß dar und berechnet **keine** statistische Unsicherheit eines Regressionsparameters (wie Konfidenzintervalle für $n$, $m$ oder $k$).  
> Bei der Kondensator-Aufladung ist der Wert $\Delta(\Delta U) = 0{,}001\,\mathrm{V}$ eine **vorgegebene schulische Annahme** für die Spannungsdifferenz in dieser Betrachtung; er stellt keine vollständige Herleitung der kombinierten Messunsicherheit von $U_0 - U_C$ dar.  
> Liegt eine relative Modellabweichung unterhalb von $f_{\max}$, so gilt das Modell „im Rahmen dieser vereinfachten Betrachtung mit den Messwerten vereinbar“. Messdaten können ein Modell stützen, aber prinzipiell nicht mathematisch beweisen.

---

## Selbstständige Anwendung („Selbstständig auswerten“)

Dieser Bereich bietet drei didaktische Übungsdatensätze mit jeweils genau 7 Zeilen zur eigenständigen Anwendung in GeoGebra:

1. **Aufgabe linear-7:** Kondensator $Q(U)$ mit freier linearer Regression ($m = 0{,}0400$, $b \approx 0{,}0429$, $C = 400\,\mathrm{pF}$, max. Abw. $\approx 2{,}61\,\%$, Grenze $6{,}25\,\%$)
2. **Aufgabe power-7:** Coulomb-Abstandsgesetz ($a \approx 32{,}42$, $n \approx -2{,}0276$, max. Abw. $\approx 4{,}69\,\%$, Grenze $16{,}67\,\%$)
3. **Aufgabe exponential-7:** Kondensator-Aufladung mit $U_0 = 5{,}00\,\mathrm{V}$ ($A \approx 5{,}0207\,\mathrm{V}$, $k \approx -0{,}049928\,\mathrm{s}^{-1}$, $\tau \approx 20{,}03\,\mathrm{s}$, max. Abw. $\approx 1{,}54\,\%$, Grenze $2{,}50\,\%$)

Jede Aufgabe enthält gestufte Hilfen („Vorgehen“, „Benötigte Befehle“, „Referenzergebnisse“), neutrale Eingabefelder mit dynamischer Toleranzprüfung und drei Selbstkontroll-Checkpoints. Der Übungsfortschritt wird strikt getrennt von den geführten Lernwegen gespeichert.

---

## Dateien und Architektur

Die Anwendung ist rein statisch aufgebaut (HTML5, CSS3, ECMAScript-Module) und benötigt kein Backend oder Build-System.

| Datei / Verzeichnis | Funktion |
| --- | --- |
| `index.html` / `app.js` | Geführte Lernwege, Phasennavigation, Checkpoints und Bearbeitungsübersicht |
| `lesson-data.js` | Inhalte der fünf Lernwege, Phasen, Bilder und Prüfregeln |
| `selbst-auswerten.html` / `selbst-auswerten.js` | Eigenständige Übungsaufgaben und Befehls-Cheat-Sheet |
| `practice-data.js` | Drei 7-Zeilen-Übungsdatensätze, ungerundete Referenzwerte und Prüfregeln |
| `dokumentation.html` / `dokumentation.js` | Klausurmuster, papierbasierte Schreibübungen und Drucklayouts |
| `documentation-data.js` | Texte, Klausurformeln, eingesetzte Abweichungsrechnungen und Checklisten |
| `groesster-einzelfehler.html` / `groesster-einzelfehler.js` | Ausführliche Methodenhilfe zur Fehlerregel |
| `shared-error-module.js` | Gemeinsame Darstellung und Zustand der Q-U-Fehlerkontrolle (Lernweg & Methodenseite) |
| `navigation.js` | Hauptnavigation und koordinierte Parameterweitergabe (`course`, `step`, `section`, `task`) |
| `state.js` | Speicherlogik (Schema-Version 2), idempotente Migration von Altständen |
| `regression.js` | Numerische Regressionsalgorithmen und robuste Zahlenlesefunktion (Komma/Punkt/Unicode-Minus) |
| `math-typeset.js` | Lokale MathJax-Anbindung ohne externe CDN-Abhängigkeit |
| `style.css` | Einheitliche Gestaltung, responsive Layouts (Desktop, Tablet/Split-View, Smartphone) und Druckstile |
| `BILDVERZEICHNIS.md` | Dokumentation aller 34 Bildressourcen mit Typ, Quelle, Version und Status |
| `generate-uq-screenshots.ps1` | PowerShell-Skript zur automatisierten Erzeugung *schematischer* U-Q-Vektorbilder via .NET GDI+ (keine Originalaufnahmen) |
| `tests/` | Automatisierte Testsuite für Regressionen, Fachinhalte, Zustand/Migration und Smoke-Checks |

---

## Lokale Prüfung und Entwicklung

Da die Anwendung JavaScript-Module nutzt, muss sie über einen lokalen Webserver aufgerufen werden:

```bash
# Python HTTP-Server starten (z. B. auf Port 8085)
python -m http.server 8085
```

Anschließend im Browser aufrufen:
- Lernbereich: `http://localhost:8085/index.html`
- Selbstständig auswerten: `http://localhost:8085/selbst-auswerten.html`
- Klausurdokumentation: `http://localhost:8085/dokumentation.html`
- Methodenhilfe: `http://localhost:8085/groesster-einzelfehler.html`

Automatisierte Tests ausführen:

```bash
node --test
```

Alle Tests laufen ohne externe npm-Abhängigkeiten direkt mit dem integrierten Node.js-Test-Runner.

---

## Datenschutz und Speicherung

- Alle Lernstände, Selbstkontrollen und optionalen Schülerangaben werden ausschließlich lokal im Browser unter dem Schlüssel `geogebra-begleitkurs-state` im `localStorage` gehalten.
- Die Daten werden im strukturierten Format (`schemaVersion: 2`) gespeichert. Ältere Speicherstände ohne Versionsnummer werden beim ersten Laden automatisch und verlustfrei migriert.
- Die Anwendung lädt alle Skripte, Stylesheets, MathJax-Bibliotheken (v4.1.3) und Schriften (`NewComputerModern`) ausschließlich aus lokalen Dateien. Es werden keinerlei Analysedienste, Tracking-Pixel oder externe Server kontaktiert.
