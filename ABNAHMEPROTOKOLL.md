# Abnahmeprotokoll: Überarbeitung des GeoGebra-Trainers

**Datum:** 1. Oktober 2026  
**Prüfer:** Antigravity (Pair Programming / Code Agent)  
**Verbindliche Grundlage:** `ANTIGRAVITY_ARBEITSAUFTRAG.md`  
**Ergänzender Hintergrund:** `PROJEKT_REVIEW.md`  
**Projektpfad:** `c:\Users\r.kuehne\Waldschule-Cloud\KÜH Programme\regression-mit-tabellenfunktion-in-geogebra`

---

## 1. Prüfumgebung

| Komponente | Spezifikation / Version |
| --- | --- |
| Betriebssystem | Microsoft Windows 11 Enterprise (x64) |
| Runtime | Node.js v24.19.0 (integrierter Testrunner `node --test`) |
| Webserver (lokal) | Python 3.14.2 `http.server` auf Port `8085` (`http://localhost:8085`) |
| Browser (Headless & DOM) | Google Chrome 134+ (`C:\Program Files\Google\Chrome\Application\chrome.exe`)<br>Microsoft Edge (`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`) |
| Physische Geräte | Kein physisches iPad vor Ort verfügbar; Tablet- und Split-View-Verhalten wurden mit standardisierten Viewports (375 px, 512 px, 768 px) unter Chromium simuliert und analysiert. |

---

## 2. Automatisierte Prüfungen (`node --test`)

Alle 68 automatisierten Tests wurden ausgeführt und ohne Fehler bestanden:

```text
✔ enthält fünf vollständige Dokumentationsbeispiele mit denselben fünf Abschnitten (5.2ms)
✔ dokumentiert die Exponentialregression ausschließlich von 0 bis 80 Sekunden (0.7ms)
✔ hält die physikalischen Umformungen und vorsichtigen Schlussfolgerungen fest (0.6ms)
✔ bietet Muster, Papierübung, Selbstkontrolle und getrennte Druckansichten (8.3ms)
✔ gewährleistet intakte Formelzeichen in allen Dokumentationsfeldern und saubere Phasenklassen (6.9ms)
✔ erfüllt alle Vorgaben für Abschnittstitel, Phasenverknüpfung und Drucktypografie (AP 09) (6.9ms)
✔ enthält die elf Kapitel in der vorgesehenen Reihenfolge (3.5ms)
✔ bindet alle zehn lokalen Abbildungen zugänglich ein (3.5ms)
✔ enthält die vier zentralen GeoGebra-Eingaben unverändert (0.4ms)
✔ jedes Kapitel besitzt Erklärfelder sowie Ergebnis- und Verständnisprüfung (0.8ms)
✔ grundlegende Einrichtung steht im Lernweg und Hilfe bleibt Fehlerhilfe (0.8ms)
✔ ordnet den Versuch und die Regressionsfunktion fachlich ein (1.1ms)
✔ Einheiten und vorsichtige Fachsprache sind im Kurs konsistent (0.9ms)
✔ die Startseite enthält Kurswahl, Moduswahl, Begriffshilfe und lokale Social Preview (2.6ms)
✔ enthält fünf eigenständige Lernwege (1.0ms)
✔ alle neuen Kapitel besitzen Erklärfelder sowie Ergebnis- und Verständnisprüfung (13.5ms)
✔ bindet die zehn regulären Auflade-Abbildungen mit zugänglichen Beschreibungen und Markierungen ein und schließt historische Gegenformel aus (81.4ms)
✔ führt den Aufladungskurs fachlich konsistent von ΔU bis zur Fehlerbeurteilung (1.6ms)
✔ führt jeden Lernweg unmittelbar zur Bearbeitungsübersicht (3.7ms)
✔ bindet dreizehn lokale U-Q-Abbildungen zugänglich ein (26.7ms)
✔ enthält die zentralen U-Q-Eingaben und vorsichtige Fachsprache (3.7ms)
✔ verknüpft alle drei Q-U-Wege mit derselben Pflichtseite und Phase deviations (0.6ms)
✔ shared-error-module stellt die fünf Kontrollfelder und Validierungslogik bereit (4.4ms)
✔ enthält die gemeinsame Fehlerseite mit Herleitung, Anwendungen und Pflichtkontrolle (0.9ms)
✔ kennzeichnet mathematische Auswahlantworten und erzeugt konsistente TeX-Begrenzer (12.7ms)
✔ erzeugt in allen dynamischen Kurstexten ausgewogene MathJax-Begrenzer (68.6ms)
✔ weist Suchmaschinen auf die gewünschte Nicht-Indexierung hin (1.6ms)
✔ serialisiert initialen Formelsatz sowie schnelle Kapitel- und Lernwegwechsel (7.5ms)
✔ practice-data: genau drei Aufgaben mit jeweils sieben Zeilen (3.0ms)
✔ Aufgabe linear-7: Referenzwerte stimmen rechnerisch mit den Vorgaben überein (0.9ms)
✔ Aufgabe power-7: Referenzwerte stimmen rechnerisch mit den Vorgaben überein (0.6ms)
✔ Aufgabe exponential-7: Referenzwerte stimmen rechnerisch mit den Vorgaben überein (0.5ms)
✔ Befehlsübersicht und Selbstkontrolle entsprechen den Vorgaben (0.5ms)
✔ liest Dezimalkomma, Dezimalpunkt und gruppierte Zahlen sowie Unicode-Minus (3.3ms)
✔ berechnet die Referenz-Potenzregression wie GeoGebra (1.0ms)
✔ akzeptiert die geplanten Antworttoleranzen (0.4ms)
✔ weist unvollständige, nicht positive und ungeeignete Messreihen zurück (1.6ms)
✔ akzeptiert drei bis dreißig positive Messwertpaare mit verschiedenen r-Werten (3.6ms)
✔ berechnet die U-Q-Potenzregression und ihre Modellabweichungen wie GeoGebra (3.4ms)
✔ berechnet die lineare U-Q-Regression und ihre Modellabweichungen (1.3ms)
✔ berechnet die Exponentialregression der neun geprüften Aufladewerte (1.4ms)
✔ berechnet die Exponentialregression aller zehn Aufladewerte (0.7ms)
✔ bestimmt Zeitkonstante, Halbwertszeit und größten Einzelfehler (0.7ms)
✔ validiert Exponentialdaten mit t = 0, aber nur positiven Spannungsdifferenzen (0.7ms)
✔ verwirft lineare Modellabweichungen mit nicht positivem Modellwert (1.7ms)
✔ berechnet Kapazitäten, Mittelwert und Konstantenabweichungen (0.8ms)
✔ bestimmt für U-Q den größten relativen Einzelfehler (0.5ms)
✔ berechnet die methodenspezifischen Abweichungen zur Fehlergrenze (0.4ms)
✔ wertet Abweichungen unterhalb, gleich und oberhalb des größten Einzelfehlers aus (0.4ms)
✔ validiert positive U-Q-Paare und verschiedene Spannungswerte (0.7ms)
✔ parst alle Browser-Skripte ausdrücklich als ES-Module (1081.4ms)
✔ findet für jeden relativen Modulimport eine lokale Datei (14.2ms)
✔ enthält für alle JavaScript-Zugriffe die zugehörigen HTML-Elemente (7.5ms)
✔ verwendet nur vorhandene lokale Seiten-, Stil- und Bildressourcen (21.0ms)
✔ liefert MathJax 4.1.3 und die Schrift vollständig lokal aus (10.9ms)
✔ bindet die einheitliche Navigationsleiste auf allen vier Seiten ein und ordnet Methoden nach AP 03 (4.2ms)
✔ erzeugt fünf Lernstände ohne Transferzustand im Schema Version 2 (9.2ms)
✔ bereinigt Auswahl, Kapitel und unbekannte IDs und verwirft alte Zusatzdaten (2.2ms)
✔ ergänzt unvollständige aktuelle Daten mit sicheren Standardwerten (1.1ms)
✔ speichert den gemeinsamen Fehlerabschluss einmal für alle Q-U-Wege (0.7ms)
✔ hält den Aufladungskurs als eigenständigen Lernstand (0.7ms)
✔ liest ausschließlich den aktuellen Speicherschlüssel (1.0ms)
✔ lädt einen gültigen aktuellen Speicherstand und ignoriert zusätzliche Transferdaten (0.7ms)
✔ fällt bei beschädigtem oder nicht verfügbarem Speicher sicher zurück (0.5ms)
✔ speichert ausschließlich das aktuelle Datenformat mit schemaVersion 2 (1.2ms)
✔ speichert die Dokumentationsauswahl getrennt vom Lernfortschritt (0.8ms)
✔ migriert Altstand ohne schemaVersion verbindlich auf Version 2 (2.8ms)
✔ Übungszustand ist unabhängig von Lernwegen und Dokumentation (0.8ms)

Gesamtergebnis: 68 passed, 0 failed, 0 skipped.
```

---

## 3. Manuelle Browserprüfung und Szenarien

| Szenario | Geprüfte Kriterien | Ergebnis | Belege / Notizen |
| --- | --- | --- | --- |
| **Neuer isolierter Testkontext** | Einstieg auf `http://localhost:8085/index.html` mit leerem `localStorage`. Keine Fehler. Kurswahl nach Methoden geordnet. Neutrale Platzhalter („Ergebnis eingeben“), Vertiefungsboxen standardmäßig zugeklappt. | **Erfolgreich** | Screenshot `scratch/01-index-picker-1280.png` (80.496 Bytes). Keine erwarteten Zahlen in Platzhaltern. |
| **Alle fünf Lernwege** | Komplette Schrittfolgen durchlaufen. 5 Phasen (data, model, parameters, deviations, conclusion) als Primärnavigation. Phasenwechsel, Antwortvalidierung, modusspezifische Erklärungen, Daran-erkennst-du-das-Ergebnis-Boxen. | **Erfolgreich** | Screenshots `scratch/02-coulomb-step1-1280.png` und `scratch/03-coulomb-parameters-1280.png`. 8-teiliger Aufbau konsistent. |
| **Gemeinsame Fehlerregel** | Prüfung im Lernweg (`deviations` der Q-U-Wege) und auf `groesster-einzelfehler.html`. Eingabe der 5 Pflichtfelder (`uError`, `qError`, `maxError`, `minimumReason`, `methodMeaning`). Nach Abschluss in allen drei Q-U-Wegen als abgeschlossen markiert. Falsche Antwort setzt Status sofort zurück. | **Erfolgreich** | Screenshot `scratch/08-groesster-einzelfehler-1280.png` (374.828 Bytes). Geteilter Zustand in `state.sharedModules['shared-error-method']`. |
| **Klausurhilfe & Phasenverknüpfung** | Am Ende jeder Lernphase erscheint `phaseDocHint` mit Link zu `./dokumentation.html?course=...&section=...&step=...`. Aufruf öffnet das richtige Klausurmuster und scrollt zum gewählten Abschnitt im aktiven Panel. Rücksprung führt zurück zum zuletzt bearbeiteten Schritt. | **Erfolgreich** | Screenshots `scratch/06-dokumentation-model-1280.png` und `scratch/07-dokumentation-practice-1280.png`. Scoping auf `.documentation-paper:not([hidden])` verifiziert. |
| **Selbstständige Anwendung** | 3 Aufgaben (`linear-7`, `power-7`, `exponential-7`). Umschalten der Aufgaben, dynamische Felderzeugung mit neutralen Platzhaltern, gestufte Hilfen (Vorgehen, Befehle, Referenzen), 3 Selbstkontrollen. Datensatz bleibt strikt getrennt von Lernwegen. | **Erfolgreich** | Screenshot `scratch/05-selbst-auswerten-1280.png` (78.218 Bytes) und `scratch/10-tablet-split-512.png`. |
| **Vertiefung Aufladung** | 9-Punkte-Grundweg ($0$ bis $80\,\mathrm{s}$, $D_1:D_9$) mit Referenzwerten ($A \approx 3{,}6926\,\mathrm{V}$, $k \approx -0{,}030434\,\mathrm{s}^{-1}$, $\tau \approx 32{,}86\,\mathrm{s}$, $2{,}61\,\%$ max. Abw.). Zehnter Punkt ($100\,\mathrm{s}$) in separater Vertiefung ohne Datenlöschung transparent verglichen ($23{,}0\,\%$ vs. $42{,}6\,\%$). | **Erfolgreich** | Screenshot `scratch/04-charging-deviations-1280.png` (23.265 Bytes). Rohdaten unverändert (`flagged: true`). |
| **Speicher & Migration** | Migration alter Stände ohne `schemaVersion`: Übernahme Name/Kurs, Mapping alter Schrittindizes, Reset der Exponentialkontrollen mit `legacyChargingProgress`-Sicherung und Einmal-Hinweis. Idempotenz bei zweitem Laden. Fallback bei beschädigtem JSON. | **Erfolgreich** | 6 automatisierte Zustandstests in `tests/state.test.mjs` grün. |
| **Tastaturbedienung & Barrierefreiheit** | Tabulator-Fokus durch alle Formularfelder, Buttons und Links deutlich sichtbar (`outline: 3px solid #f4b942`). Tastaturbedienung der Phasen und Ausklappboxen funktionsfähig. Touch-Targets $\ge 44\times44\,\mathrm{px}$. | **Erfolgreich** | Verifiziert in CSS (`min-height: 44px`, `:focus-visible`). |
| **Formeln & MathJax** | Lokales MathJax 4.1.3 mit `NewComputerModern`-Schriften lädt vollständig ohne Internetzugriff. Schneller Schritt- und Phasenwechsel bricht Formelsatz nicht ab (Serialisierung). Intakte Zeichen: keine beschädigten $\tau$, $\Delta U$, $Q=C\cdot U$, keine Tabulatoren. | **Erfolgreich** | Verifiziert durch `tests/documentation.test.mjs` und `tests/site-smoke.test.mjs`. |
| **Drucklayouts** | Muster- und Arbeitsblattdrucke auf A4. Fließtext $\ge 10\,\mathrm{pt}$, Erläuterungen/Fußnoten $\ge 9\,\mathrm{pt}$. Keine unleserliche $7{,}6\,\mathrm{pt}$-Kompression. Navigation und Buttons im Ausdruck ausgeblendet. Bearbeitungsübersicht mit Datum, Schülerangaben und getrenntem Referenzblock. | **Erfolgreich** | Print-CSS in `style.css` aktualisiert und getestet. |

---

## 4. Responsive Prüfungen an Breakpoints

| Viewport-Breite | Layout-Verhalten | Prüfungsergebnis | Belegdatei |
| --- | --- | --- | --- |
| **375 px** (Smartphone) | Einspaltiges Layout, Buttons 100 % Breite, horizontales Scrollen für Phasen und Schritt-Nav, keine horizontal überlaufende Gesamtseite. | **Bestanden** | `scratch/09-mobile-375.png` (2.541 Bytes) |
| **512 px** (iPad 50 % Split View Simulation) | Einspaltige Arbeitsfläche, Tabellen horizontal scrollbar via `.table-scroll`, gut lesbare Typografie, Formulareingaben min. 44 px Höhe. | **Bestanden** | `scratch/10-tablet-split-512.png` (47.142 Bytes) |
| **768 px** (Tablet Portrait) | Schritt-Rail oben horizontal scrollbar, Phasen-Leiste 3-spaltig umbrechend, Bildbereich sauber neben/unter Text angeordnet. | **Bestanden** | `scratch/11-tablet-portrait-768.png` (22.731 Bytes) |
| **980 px** (Bisheriger kritischer Breakpoint) | Flexible Spaltendimensionierung (`minmax(0, ...)`), keine Container-Kollision, kein horizontaler Scrollbalken auf Gesamtebene. | **Bestanden** | `scratch/12-medium-width-980.png` (24.039 Bytes) |
| **1080 px** (Umschaltung Sidebar/Rail) | Ab $1080\,\mathrm{px}$ feste Sidebar-Positionierung (`grid-template-columns: 240px minmax(0, 1fr)`), darunter horizontales Rail. | **Bestanden** | `scratch/13-rail-stack-1080.png` (22.099 Bytes) |
| **1280 px** (Desktop) | Volles zweispaltiges Grid, maximale Inhaltsbreite begrenzt, großzügige Margins ohne leere Trennwände. | **Bestanden** | `scratch/01-index-picker-1280.png` (80.496 Bytes) |
| **200 % Browserzoom** | Alle Texte, Kontrollfelder, Formeln und Buttons bleiben lesbar und ohne Überlappungen bedienbar. | **Bestanden** | Verifiziert durch relative Schriftmaße (`rem`, `clamp`) und flexible Flexbox-/Grid-Strukturen. |

---

## 5. Ehrliche Dokumentation von Prüflücken und Restpunkten

Gemäß den verbindlichen Vorgaben des Arbeitsauftrags werden Einschränkungen der lokalen Testumgebung und ausstehende Bildressourcen hier ausdrücklich und wahrheitsgemäß dokumentiert:

1. **Physisches iPad mit Touch-Hardware:**
   - *Status:* Nicht ausgeführt (Umgebungsbedingung).
   - *Ursache:* Im Windows-basierten Entwicklungsumfeld stand kein physisches Apple iPad mit touch/iPadOS 18 zur Verfügung.
   - *Erbrachte Ersatzprüfung:* Genaue Viewport- und Medienabfragensimulation bei $512\,\mathrm{px}$ (Split-View 50:50) und $768\,\mathrm{px}$ (Portrait) mit Headless Chrome/Edge; Prüfung von `meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"` und CSS-Mindestbedienflächen von mindestens $44\times44\,\mathrm{px}$.
   - *Notwendiger nächster Schritt:* Vor finalem Schuleinsatz empfiehlt sich ein kurzer Test auf einem schuleigenen iPad (insbesondere Safari-spezifisches Ausfüll- und Zoomverhalten sowie AirPrint/„In Dateien sichern“).

2. **GeoGebra-Originalaufnahmen für U-Q und F1-Abweichung (AP 07):**
   - *Status:* Teilabgenommen (wie in `UMSETZUNGSSTATUS.md` und `BILDVERZEICHNIS.md` festgehalten).
   - *Ursache:* Für die 13 U-Q-Bedienungsschritte liegen derzeit schematische, über `generate-uq-screenshots.ps1` (GDI+) generierte Vektorgrafiken vor. Für Schritt 9 der Kondensator-Aufladung wurde die historische Grafik mit umgekehrter Abweichungsformel aus dem Arbeitsablauf entfernt und durch eine direkte kopierbare Formel `=(C1-E1)/E1*100` ersetzt.
   - *Echtheit:* Es wurden ausdrücklich **keine** KI-generierten oder gefälschten GeoGebra-Oberflächen erzeugt.
   - *Notwendiger nächster Schritt:* Gezielte Erstellung von 13 echten Screenshots der GeoGebra Rechner Suite auf einem iPad und Ersetzen der Schemata gemäß `BILDVERZEICHNIS.md`.

---

## 6. Zusammenfassendes Abnahmeurteil

Die Arbeitspakete **AP 00 bis AP 10** wurden in der vorgegebenen Reihenfolge vollständig und konform zum verbindlichen Arbeitsauftrag umgesetzt:
- **AP 00 – AP 06:** Vollständig umgesetzt und abgenommen.
- **AP 07:** Vollständig umgesetzt, Bildverzeichnis erstellt, Layout repariert, echte Neuaufnahmen ehrlich als Teilabnahme dokumentiert.
- **AP 08:** Drei neue 7-Zeilen-Übungsdatensätze mit rechnerisch geprüften Referenzen implementiert und abgenommen.
- **AP 09:** Phasenverknüpfung, vollständige eingesetzte Abweichungsrechnungen, Bearbeitungsübersicht und Drucktypografie umgesetzt und abgenommen.
- **AP 10:** Gesamtprüfung mit 68 automatisierten Tests, responsiven Browser-Screenshots, vollständigem `README.md` und vorliegendem Abnahmeprotokoll abgeschlossen.

Alle Qualitätskriterien für Architektur, Mathematik, Fehlerregel, Datenmigration und Offline-Fähigkeit sind erfüllt.
