# Bildverzeichnis: GeoGebra-Trainer

Stand: 1. Oktober 2026  
Referenz: `ANTIGRAVITY_ARBEITSAUFTRAG.md` (AP 07)

Dieses Verzeichnis dokumentiert alle im Projekt vorhandenen und eingebundenen Bilddateien. Gemäß AP 07 werden alte Dateien mit unbekannter GeoGebra-Version ehrlich als solche gekennzeichnet. Schematische Nachbildungen (erzeugt durch `generate-uq-screenshots.ps1`) sind explizit als Programmschemata deklariert und noch durch echte Softwareaufnahmen zu ersetzen. Historische Aufnahmen mit fehlerhafter bzw. umgekehrter Abweichungsformel sind aus dem aktiven Arbeitsablauf ausgeschlossen.

---

## 1. Übersicht nach Verzeichnissen

| Verzeichnis | Anzahl Dateien | Aktive Einbindung | Bildtyp | Status |
| --- | :---: | :---: | --- | --- |
| `assets/steps/` | 10 | 10 | Screenshots (Altbestand) | Vorhandener Altbestand (Version unbekannt) |
| `assets/steps/uq/` | 13 | 13 | Programmatische Schemata (GDI+) | Noch durch echte GeoGebra-Aufnahmen zu ersetzen |
| `assets/steps/charging/` | 11 | 10 | Echte Screenshots (Rechner Suite) | 10 aktiv (9 Punkte Grundweg / Vertiefung); 1 historisch ausgemustert |

---

## 2. Detailliertes Bildverzeichnis

| Datei | Lernweg / Schritt | Gezeigter Befehl | Datenauswahl | Bildtyp | Herkunft | Geprüfte GeoGebra-Version | Status / Anmerkung |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `assets/steps/01-messwerte.png` | Coulomb (`inverse-square`): `setup`, `table` | Messwerte in Spalte A & B | 6 Zeilen (r: 6–22 cm, F: 0,85–0,06 mN) | Software-Screenshot (Tabelle) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden; gut lesbar. |
| `assets/steps/02-punkt-c1.png` | Coulomb (`inverse-square`): `first-point` | `=(A1,B1)` | Zeile 1: (6, 0.85) | Software-Screenshot (Zelleingabe) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/03-ausfuellgriff.png` | Coulomb (`inverse-square`): `fill-points` | Ausfüllgriff ziehen | Zelle C1 | Software-Screenshot (Detail) | Altbestand (11.09.2026) | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/03-punkte-ausfuellen.png` | Coulomb (`inverse-square`): `fill-points` | C1:C6 ausgefüllt | 6 Punkte in Spalte C | Software-Screenshot (Tabelle) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/04-zwischenstand-sichern.png` | Coulomb (`inverse-square`): `fill-points` | Menü: Speichern | N/A (Bedienoberfläche) | Software-Screenshot (Menü) | Altbestand | unbekannt (Altbestand) | Aktiv als Hilfebild eingebunden. |
| `assets/steps/05-potenzregression.png` | Coulomb (`inverse-square`): `regression`, `inverse-parameters` | `F(x)=TrendPot(C1:C6)` | 6 Punkte C1:C6 | Software-Screenshot (Algebrazeile) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/06-regressionswerte.png` | Coulomb (`inverse-square`): `predictions` | `=F(A1)` in D1:D6 | 6 Modellwerte in Spalte D | Software-Screenshot (Tabelle) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/07-abweichungsformel.png` | Coulomb (`inverse-square`): `deviations` | `=(B1-D1)/D1*100` in E1 | Zeile 1: (0,85−0,738)/0,738·100 | Software-Screenshot (Formel) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/08-abweichungen.png` | Coulomb (`inverse-square`): `deviations` | E1:E6 ausgefüllt | 6 Abweichungen in Spalte E | Software-Screenshot (Tabelle) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/09-regressionskurve.png` | Coulomb (`inverse-square`): `conclusion` | Grafikfenster mit Messpunkten und Kurve | 6 Punkte und Funktion F(x) | Software-Screenshot (Grafik) | Altbestand | unbekannt (Altbestand) | Aktiv eingebunden. |
| `assets/steps/uq/01-messwerte-u-q.png` | Q-U (alle 3 Wege): `*-context`, `*-table` | Messwerte in A1:B5 | 5 Zeilen (50–250 V, 2,0–10,5 · 10⁻⁸ C) | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/02-punkte-u-q.png` | Q-U Potenz / Linear: `*-points` | `=(A1,B1)` in C1:C5 | 5 Punkte in Spalte C | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/03-konstante-formel.png` | Q-U Konstanten: `uq-constant-ratios` | `=B1/A1` in C1 | Zeile 1 | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/04-konstanten-ausgefuellt.png` | Q-U Konstanten: `uq-constant-ratios` | C1:C5 ausgefüllt | 5 Verhältnisse in Spalte C | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/05-mittelwert.png` | Q-U Konstanten: `uq-constant-mean`, `uq-constant-parameters`, `uq-constant-conclusion` | `a=Mittel(C1:C5)` | Wertebereich C1:C5 | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/06-mittelwert-in-d1.png` | Q-U Konstanten: `uq-constant-mean` | `=a` in D1 | Zelle D1 | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/07-mittelwert-ausgefuellt.png` | Q-U Konstanten: `uq-constant-mean` | D1:D5 ausgefüllt | 5 Zeilen mit Referenzwert in D | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/08-konstantenabweichung-formel.png` | Q-U Konstanten: `uq-constant-deviation` | `=(C1-D1)/D1*100` in E1 | Zeile 1 | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/09-konstantenabweichungen.png` | Q-U Konstanten: `uq-constant-deviation`, `uq-constant-uncertainty`, `uq-constant-conclusion` | E1:E5 ausgefüllt | 5 Abweichungen in Spalte E | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/10-potenzregression-u-q.png` | Q-U Potenz: `uq-power-fit`, `uq-power-parameters`, `uq-power-conclusion` | `Q(x)=TrendPot(C1:C5)` | 5 Punkte C1:C5 | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/11-modellwerte-u-q.png` | Q-U Potenz: `uq-power-model`, `uq-power-deviation`, `uq-power-conclusion` | `=Q(A1)` in D1, Abweichungen in E1 | 5 Zeilen in D und E | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/12-lineare-regression-u-q.png` | Q-U Linear: `uq-linear-fit`, `uq-linear-parameters`, `uq-linear-conclusion` | `Q=Trendlinie(C1:C5)` | 5 Punkte C1:C5 | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/uq/13-lineare-modellwerte-u-q.png` | Q-U Linear: `uq-linear-model`, `uq-linear-deviation`, `uq-linear-conclusion` | `=Q(A1)` in D1, Abweichungen in E1 | 5 Zeilen in D und E | Programmatisches Schema | `generate-uq-screenshots.ps1` | keine (GDI-Schema) | Vorläufiges Schema; noch durch echte GeoGebra-Aufnahme zu ersetzen. |
| `assets/steps/charging/01-spannungsdifferenz-formel-bis-80s.png` | Aufladung: `charging-delta` | `=3.780-B1` in C1 | 9 Messpaare (0–80 s) | Software-Screenshot (Tabelle) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden (Grundweg 9 Punkte). |
| `assets/steps/charging/02-spannungsdifferenzen-bis-80s.png` | Aufladung: `charging-delta` | C1:C9 ausgefüllt | 9 Messpaare (0–80 s) | Software-Screenshot (Tabelle) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden. |
| `assets/steps/charging/03-erster-zeit-punkt.png` | Aufladung: `charging-points` | `=(A1,C1)` in D1 | Zelle D1: (0, 3.78) | Software-Screenshot (Tabelle) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden. |
| `assets/steps/charging/04-zeit-punkte-bis-80s.png` | Aufladung: `charging-points` | D1:D9 ausgefüllt | 9 Punkte D1:D9 | Software-Screenshot (Tabelle) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden. |
| `assets/steps/charging/05-exponentialregression.png` | Aufladung: `charging-regression` | `U(x)=TrendExp(D1:D9)` | 9 Punkte D1:D9 | Software-Screenshot (Algebrazeile) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden; zeigt Referenzwerte A ≈ 3,6926 und k ≈ -0,03043. |
| `assets/steps/charging/06-regressionskurve-mit-pruefwert.png` | Aufladung: `charging-conclusion` | Grafikfenster mit Kurve TrendExp(D1:D9) und Prüfpunkt D10 | 9 Punkte D1:D9 + Prüfwert D10 | Software-Screenshot (Grafikfenster) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv in Vertiefung eingebunden; zeigt auffälligen Punkt bei 100 s unterhalb der Kurve. |
| `assets/steps/charging/07-modellwert-formel-bis-80s.png` | Aufladung: `charging-predictions` | `=U(A1)` in E1 | 9 Zeilen (0–80 s) | Software-Screenshot (Tabelle) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden. |
| `assets/steps/charging/08-modellwerte-bis-80s.png` | Aufladung: `charging-predictions` | E1:E9 ausgefüllt | 9 Modellwerte in Spalte E | Software-Screenshot (Tabelle) | Neuaufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv eingebunden. |
| `assets/steps/charging/09-historische-abweichungsformel.png` | *Nicht im Arbeitsablauf* (ausgemustert) | `=(E1-C1)/E1*100` in F1 | 10 Zeilen | Historischer Screenshot | Altbestand (18.09.2026) | GeoGebra Rechner Suite | **Ausgemustert**: Zeigt umgekehrte Gegenformel (Modellwert minus Messwert). Im Lernweg durch kopierbaren Befehl `=(C1-E1)/E1*100` ersetzt; noch durch echte Neuaufnahme von `=(C1-E1)/E1*100` zu ersetzen. |
| `assets/steps/charging/10-auffaellige-modellabweichung.png` | Aufladung: `charging-conclusion` | Tabelle mit Spalte F inkl. 100 s (~ -42,6 %) | 10 Zeilen | Software-Screenshot (Tabelle) | Aufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv in Vertiefung eingebunden. |
| `assets/steps/charging/11-plausibilitaetsvergleich-90s.png` | Aufladung: `charging-conclusion` | Plausibilitätsvergleich mit 90 s | 10 Zeilen (hypothetisch 90 s) | Software-Screenshot (Tabelle) | Aufnahme (18.09.2026) | GeoGebra Rechner Suite | Aktiv in Vertiefung eingebunden. |

---

## 3. Prüflücken und Restpunkte zu AP 07

1. **U-Q-Abbildungen (`assets/steps/uq/`):**
   - Aktueller Zustand: 13 programmatische Bildschemata, erzeugt durch `generate-uq-screenshots.ps1`.
   - Bewertung nach AP 07: Ausdrücklich als Schemata deklariert. Vollwertige echte GeoGebra-Screenshots der Rechner Suite mit denselben Anzeigeeinstellungen müssen in einer späteren Foto-/Erfassungssitzung in echter GeoGebra-Software erzeugt und ausgetauscht werden.
2. **Abweichungsformel Aufladung (`charging/09-historische-abweichungsformel.png`):**
   - Aktueller Zustand: Aus dem aktiven Arbeitsablauf entfernt, um Verwirrung durch die umgekehrte Formel `=(E1-C1)/E1*100` zu verhindern. Als verlässliche Hilfe dient der kopierbare Befehl `=(C1-E1)/E1*100`.
   - Bewertung nach AP 07: Eine echte Neuaufnahme der Tabelle mit `=(C1-E1)/E1*100` in F1 für D1:D9 steht noch aus.
3. **Altbestand Coulomb (`assets/steps/`):**
   - Aktueller Zustand: 10 Bilder vorhanden und funktional; die genaue historische GeoGebra-Build-Version ist nicht mehr dokumentiert.
