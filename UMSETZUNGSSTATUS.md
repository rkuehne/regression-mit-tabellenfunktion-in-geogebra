# Umsetzungsstatus: GeoGebra-Trainer überarbeiten

Stand: 1. Oktober 2026

Referenzdokument: `ANTIGRAVITY_ARBEITSAUFTRAG.md`  
Ergänzender Hintergrund: `PROJEKT_REVIEW.md`

## Statusübersicht

| Paket | Bezeichnung | Status | Kurzbeschreibung / Notizen |
| --- | --- | --- | --- |
| AP 00 | Ausgangszustand sichern und Vorbereitung | abgenommen | 57/57 Tests grün; alte Schrittfolgen dokumentiert; lokaler HTTP-Server (Port 8085) und Chrome/Edge verfügbar. |
| AP 01 | Formel-, Zahlen- und CSS-Fehler korrigieren | abgenommen | Formelstrings in documentation-data.js auf String.raw korrigiert (keine Tabulatoren bei \tau, intakte Begrenzer); Unicode-Minus U+2212 in parseLocaleNumber; .learning-map-number/.learning-map-label getrennt; Tests erweitert (58/58 grün). |
| AP 02 | Speicherformat und Migration vorbereiten | abgenommen | schemaVersion: 2, practice-Struktur (linear-7, power-7, exponential-7), getrennte Speicherung, Idempotente Migration mit ID-Zuordnung, Übernahme verschobener Kontrollen, Reset betroffener Exponentialschritte mit legacyChargingProgress und Hinweis; Tests erweitert (60/60 grün). |
| AP 03 | Drei Hauptbereiche und Navigation | abgenommen | Einheitliche .site-nav auf allen 4 Seiten; verschlankter Header; Lernwege nach Methode geordnet (Linear, Potenz, Exp, Konstanten) inkl. Alternativen-Hinweis; Trennung Auswahl/Arbeitsfläche mit "Lernweg wechseln", Fortsetzen-Karte und einklappbarer Summary; URL-Parameter (?course, ?step, ?section, ?task, ?return); 61/61 Tests grün. |
| AP 04 | Phasennavigation und gemeinsame Lernkarte | abgenommen | 5 Phasen (data, model, parameters, deviations, conclusion) als primäre Lernnavigation; 4 neue Parameterschritte (inverse-parameters, uq-power-parameters, uq-linear-parameters, uq-constant-parameters); uq-constant-reference in mean integriert; Zwei-Felder-Regel mit required: true/false umgesetzt (freiwillige Kontrollen in <details class="optional-checkpoint-box">); einheitliche 8-teilige Lernkarte (Header, Handlung mit Zweck, Formel/Messwerte, Bilder, Ergebniserkennung, Checkpoint, Vertiefung, Merke/Navigation); Modusschalter "Anleitung" / "Mit Erklärung"; "Schritte" statt "Kapitel"; 61/61 Tests grün. |
| AP 05 | Inhalte und Fachsprache vereinheitlichen | abgenommen | Einheitliche Notation (n, k, m, b, τ); Exponent n bei Potenzfunktionen mit erhaltener Feld-ID b; Geradennamen Q mit =Q(A1); a=Mittel(C1:C5); Grafikansichts-Anleitung in Punkt-Schritten; Aufladekurs auf 9 reguläre Punkte D1:D9 (0–80 s, 10 Schritte) mit Referenzwerten (A ≈ 3,6926 V, k ≈ -0,0304 s⁻¹, τ ≈ 32,86 s, t₁/₂ ≈ 22,78 s, max 2,61 % Abw.); 10. Messwert als transparente Vertiefung (23,0 % vs 42,6 %); alle 11 Bilder integriert; Zeile 10 flagged ohne Durchstreichung; 61/61 Tests grün. |
| AP 06 | Schulische Fehlerregel im Lernweg | abgenommen | shared-error-module.js mit 5 Pflichtkontrollen (uError, qError, maxError, minimumReason, methodMeaning) und Herleitung; neutrale Platzhalter; eingebettet in Phase deviations aller 3 Q-U-Wege sowie auf groesster-einzelfehler.html mit geteiltem Zustand state.sharedModules['shared-error-method']; sofortiges Zurücksetzen bei fehlerhafter Antwort; methodische Abgrenzung zur statistischen Unsicherheit; 62/62 Tests grün. |
| AP 07 | Abbildungen und Gestaltung | umgesetzt, teilabgenommen | BILDVERZEICHNIS.md vollständig erstellt (34 Dateien erfasst); historische Gegenformel (09-historische-abweichungsformel.png) aus Arbeitsablauf entfernt und durch kopierbare Formel ersetzt; 9-Punkte-Konsistenz im Grundweg gewahrt; Vertiefung (100 s) separiert; Breakpoint-Kollision oberhalb 960 px durch flexible Spaltendimensionierung und 1080-px-Media-Query behoben; Prüflücke: echte GeoGebra-Neuaufnahmen für U-Q-Schemata und F1-Abweichung stehen noch aus (ehrlich dokumentiert). |
| AP 08 | Selbstständige Anwendung | abgenommen | practice-data.js und selbst-auswerten.html/js mit genau drei 7-Zeilen-Aufgaben (linear-7, power-7, exponential-7); Befehls-Cheat-Sheet; gestufte Hilfen (Vorgehen, Befehle, Referenzen); neutrale Platzhalter; dynamische Prüfung mit Toleranzen und Feedback; 3 Selbstkontroll-Checkboxes; strikt getrennter Zustand in state.practice; 5 neue Tests (67/67 grün). |
| AP 09 | Klausurdokumentation anbinden | abgenommen | 5 Lernphasen mit 5 Klausurabschnitten verknüpft (data→data, model→geogebra, parameters→physical, deviations→deviations, conclusion→conclusion) via phaseDocHint; automatische Weiterschaltung mit course-, section- und step-Parametern; alle 5 Muster enthalten vollständig eingesetzte Abweichungsrechnungen; Bearbeitungsübersicht mit strikter Unterscheidung von Lernfortschritt und Referenzen; Drucktypografie korrigiert (Fließtext 10 pt, Nebenangaben 9 pt, keine 7,6 pt Kompression); 68/68 Tests grün. |
| AP 10 | Gesamtprüfung, Tests und Übergabe | abgenommen | Alle 68 Tests grün; Responsive Browserprüfung bei 375, 512, 768, 980, 1080 und 1280 px erfolgreich durchgeführt (Screenshots in scratch/); ABNAHMEPROTOKOLL.md vollständig erstellt; README.md aktualisiert; Prüflücken (physisches iPad und GeoGebra-Originalaufnahmen) ehrlich dokumentiert. |

## Ausgangsdokumentation (AP 00)

### 1. Ausgangstests
- Ausführung: `node --test` am 01.10.2026
- Ergebnis: 57 Tests bestanden, 0 fehlgeschlagen, Dauer ca. 1,8 s.

### 2. Bisherige Schritt-Reihenfolge je Lernweg (für Migration)
- **inverse-square** (10 Schritte):
  0: `context`, 1: `setup`, 2: `table`, 3: `first-point`, 4: `fill-points`, 5: `regression-concept`, 6: `regression`, 7: `predictions`, 8: `deviations`, 9: `conclusion`
- **proportional-power** (8 Schritte):
  0: `uq-power-context`, 1: `uq-power-table`, 2: `uq-power-points`, 3: `uq-power-concept`, 4: `uq-power-fit`, 5: `uq-power-model`, 6: `uq-power-deviation`, 7: `uq-power-conclusion`
- **proportional-constants** (8 Schritte):
  0: `uq-constant-context`, 1: `uq-constant-table`, 2: `uq-constant-ratios`, 3: `uq-constant-mean`, 4: `uq-constant-reference`, 5: `uq-constant-deviation`, 6: `uq-constant-uncertainty`, 7: `uq-constant-conclusion`
- **proportional-linear** (8 Schritte):
  0: `uq-linear-context`, 1: `uq-linear-table`, 2: `uq-linear-points`, 3: `uq-linear-concept`, 4: `uq-linear-fit`, 5: `uq-linear-model`, 6: `uq-linear-deviation`, 7: `uq-linear-conclusion`
- **capacitor-exponential** (11 Schritte):
  0: `charging-context`, 1: `charging-table`, 2: `charging-delta`, 3: `charging-points`, 4: `charging-model`, 5: `charging-regression`, 6: `charging-time`, 7: `charging-predictions`, 8: `charging-deviations`, 9: `charging-data-check`, 10: `charging-conclusion`

### 3. Lokale Prüfumgebung
- HTTP-Server: Python 3.14.2 `http.server` auf `http://localhost:8085`
- Browser: Google Chrome 134+ / Microsoft Edge auf Windows (Headless & DOM-Dumps)
