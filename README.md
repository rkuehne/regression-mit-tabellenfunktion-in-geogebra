# GeoGebra-Begleitkurs: Drei Auswertungswege auf dem iPad

Eine statische, für GitHub Pages geeignete Lernanwendung für die Oberstufe. Die Schülerinnen und Schüler arbeiten in der separaten GeoGebra Rechner Suite und wählen zwischen drei eigenständigen Lernwegen:

- Coulombkraft F ∝ 1/r² mit Potenzregression
- Kondensatorladung Q ∝ U mit Potenzregression
- Kondensatorladung Q ∝ U mit dem Konstantenverfahren C = Q/U

## Enthaltene Funktionen

- drei frei wählbare Lernwege mit jeweils 8–10 Kapiteln und iPad-Anweisungen
- Erklärmodus mit Begriffen und Rechenbeispielen sowie Kurzansicht zur Wiederholung
- dauerhafte Begriffshilfe für zentrale Fachwörter
- zehn bisherige sowie elf neue vergrößerbare und markierte Anleitungsgrafiken
- kopierbare Formeln und Befehle
- getrennte Ergebnis- und Verständnisprüfungen mit feldbezogenem Feedback
- Dezimalkomma- und Dezimalpunkt-Unterstützung
- getrennter lokaler Lernfortschritt je Lernweg
- optionaler Transferrechner mit denselben drei Auswertungsverfahren
- dynamischer Lernnachweis, der auf dem iPad als PDF gesichert werden kann
- Übernahme des bisherigen v3-Kursstands in den 1/r²-Lernweg sowie ältere Migrationen

## Dateien

- index.html – vollständige Seitenstruktur
- style.css – Gestaltung, iPad-/Split-View-Anpassungen und Drucklayout
- app.js – Lernwege, lokaler Zustand, Bedienung und Ausgaben
- lesson-data.js – drei Kursmodelle, Inhalte, Abbildungen und Prüfregeln
- regression.js – Potenzregression, Kapazitätsauswertung, Abweichungen und vereinfachte Vergleichsgrenzen
- state.js – getrennte lokale Lernstände und Migration bisheriger Speicherstände
- assets/steps/ – Abbildungen des Coulomb-Kurses und der beiden U-Q-Verfahren
- generate-uq-screenshots.ps1 – erzeugt die austauschbaren U-Q-Anleitungsgrafiken erneut
- tests/ – mathematische, inhaltliche und Migrationstests ohne Zusatzpakete

## Lokal prüfen

Da die Anwendung JavaScript-Module nutzt, sollte sie über einen lokalen Webserver geöffnet werden, zum Beispiel:

    python -m http.server 8000

Danach http://localhost:8000/ aufrufen. Die Tests laufen mit:

    node --test

## Auf GitHub Pages veröffentlichen

Die Dateien bleiben im Hauptverzeichnis des Pages-Repositories. Unter Settings → Pages weiterhin Deploy from a branch, Branch main und Ordner / (root) verwenden. Es gibt keinen Build-Schritt und alle lokalen Ressourcen verwenden relative Pfade.

## Datenschutz

Lernstand, optionale Namensangaben und Transferdaten werden nur unter dem Schlüssel geogebra-begleitkurs-state-v4 im localStorage des jeweiligen Browsers gespeichert. Ein v3-Kursstand wird vollständig in den bisherigen 1/r²-Weg übernommen; v1- und v2-Transferdaten bleiben weiterhin migrierbar. Der Lernnachweis wird über den Druckdialog lokal erzeugt. Es werden keine Schülerdaten an einen Server gesendet.
