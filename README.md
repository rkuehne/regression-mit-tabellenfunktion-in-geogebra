# GeoGebra-Begleitkurs: Fünf Auswertungswege auf dem iPad

Eine statische, für GitHub Pages geeignete Lernanwendung für die Oberstufe. Die Schülerinnen und Schüler arbeiten in der separaten GeoGebra Rechner Suite und wählen zwischen fünf eigenständigen Lernwegen:

- Coulombkraft F ∝ 1/r² mit Potenzregression
- Kondensatorladung Q ∝ U mit Potenzregression
- Kondensatorladung Q ∝ U mit dem Konstantenverfahren C = Q/U
- Kondensatorladung Q ∝ U mit linearer Regression und freiem Achsenabschnitt
- Kondensator-Aufladung mit Exponentialregression von ΔU = U₀ − U_C

Die drei Kondensatorwege verwenden gemeinsam die verpflichtende Unterseite „Methode des größten Einzelfehlers“. Dort werden die relativen Einzelfehler einmal hergeleitet und anschließend auf die jeweils relevanten Abweichungen übertragen.

## Enthaltene Funktionen

- fünf frei wählbare Lernwege mit jeweils 8–11 Kapiteln und iPad-Anweisungen
- Erklärmodus mit Begriffen und Rechenbeispielen sowie Kurzansicht zur Wiederholung
- dauerhafte Begriffshilfe für zentrale Fachwörter
- zehn Abbildungen zum Coulomb-Versuch, dreizehn U-Q-Anleitungsgrafiken und elf Aufnahmen zur Kondensator-Aufladung
- kopierbare Formeln und Befehle
- getrennte Ergebnis- und Verständnisprüfungen mit feldbezogenem Feedback
- Dezimalkomma- und Dezimalpunkt-Unterstützung
- getrennter lokaler Lernfortschritt je Lernweg
- einmalig gespeicherte gemeinsame Pflichtkontrolle zur Methode des größten Einzelfehlers
- lokal gesetzte mathematische Formeln mit MathJax 4.1.3, auch ohne Verbindung zu einem CDN
- dynamischer Lernnachweis, der auf dem iPad als PDF gesichert werden kann
- aktueller lokaler Lernstand ohne Konto, Backend oder externe Datenübertragung

## Dateien

- index.html – Kursauswahl, Lernwege und Lernnachweis
- groesster-einzelfehler.html / groesster-einzelfehler.js – gemeinsame Fehlerseite mit Pflichtkontrolle und Klausurformulierungen
- style.css – Gestaltung, iPad-/Split-View-Anpassungen und Drucklayout
- app.js – Lernwege, lokaler Zustand, Bedienung und Ausgaben
- math-typeset.js – lokale MathJax-Konfiguration und erneutes Setzen dynamischer Inhalte
- lesson-data.js – fünf Kursmodelle, Inhalte, Abbildungen und Prüfregeln
- regression.js – Potenz-, Linear- und Exponentialregression, Kapazitätsauswertung, Abweichungen und Methode des größten Einzelfehlers
- state.js – getrennte lokale Lernstände im aktuellen Datenformat
- assets/steps/ – Abbildungen des Coulomb-Kurses, der drei U-Q-Verfahren und der Kondensator-Aufladung
- assets/vendor/ – fest eingebundene MathJax-4.1.3-Dateien und New-CM-Schriften; Herkunft und Lizenz stehen in THIRD_PARTY_NOTICES.md
- generate-uq-screenshots.ps1 – erzeugt die austauschbaren U-Q-Anleitungsgrafiken erneut
- tests/ – mathematische, inhaltliche, Zustands- und Website-Smoke-Tests ohne Zusatzpakete

## Lokal prüfen

Da die Anwendung JavaScript-Module nutzt, sollte sie über einen lokalen Webserver geöffnet werden, zum Beispiel:

    python -m http.server 8000

Danach http://localhost:8000/ aufrufen. Die Tests laufen mit:

    node --test

## Auf GitHub Pages veröffentlichen

Die Dateien bleiben im Hauptverzeichnis des Pages-Repositories. Unter Settings → Pages weiterhin Deploy from a branch, Branch main und Ordner / (root) verwenden. Es gibt keinen Build-Schritt und alle lokalen Ressourcen verwenden relative Pfade.

## Datenschutz

Lernstand und optionale Namensangaben werden nur unter dem Schlüssel geogebra-begleitkurs-state im localStorage des jeweiligen Browsers gespeichert. Die Anwendung liest ausschließlich dieses aktuelle Datenformat. Der Lernnachweis wird über den Druckdialog lokal erzeugt. MathJax, seine Schriftdateien und alle Kursbilder werden aus demselben GitHub-Pages-Projekt geladen; es werden weder Schülerdaten noch Formelinhalte an einen fremden Server gesendet.
