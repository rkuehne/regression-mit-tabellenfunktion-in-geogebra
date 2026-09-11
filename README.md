# GeoGebra-Begleitkurs: Potenzregression auf dem iPad

Eine statische, für GitHub Pages geeignete Lernanwendung für die Oberstufe. Die Schülerinnen und Schüler arbeiten in der separaten GeoGebra Rechner Suite und folgen zehn Kapiteln von der Messidee bis zu einer vorsichtigen Modellbeurteilung.

## Enthaltene Funktionen

- zehn frei anwählbare Lernkapitel mit iPad-Anweisungen
- Erklärmodus mit Begriffen und Rechenbeispielen sowie Kurzansicht zur Wiederholung
- dauerhafte Begriffshilfe für zentrale Fachwörter
- zehn vergrößerbare und markierte GeoGebra-Abbildungen
- kopierbare Formeln und Befehle
- getrennte Ergebnis- und Verständnisprüfungen mit feldbezogenem Feedback
- Kontrollfelder mit Dezimalkomma- und Dezimalpunkt-Unterstützung
- lokaler Lernfortschritt ohne Anmeldung oder Datenübertragung
- optionaler Potenzregressions-Rechner für eigene Messwerte
- druckbarer Lernnachweis, der auf dem iPad als PDF gesichert werden kann
- Übernahme von Transfer- und Nachweisdaten aus v2 sowie alter Messdaten aus v1

## Dateien

- `index.html` – vollständige Seitenstruktur
- `style.css` – Gestaltung, iPad-/Split-View-Anpassungen und Drucklayout
- `app.js` – Lernweg, lokaler Zustand, Bedienung und Ausgabe
- `lesson-data.js` – Inhalte, Screenshots und Prüfregeln der zehn Kapitel
- `regression.js` – Zahlenverarbeitung, Potenzregression und Modellabweichungen
- `state.js` – lokaler Lernstand und Migration der bisherigen Messdaten
- `assets/steps/` – die Abbildungen aus der Word-Vorlage und die Zusatzgrafik zum Ausfüllgriff
- `assets/og.png` – lokale Social-Preview-Grafik
- `tests/` – mathematische und inhaltliche Tests ohne Zusatzpakete

## Lokal prüfen

Da die Anwendung JavaScript-Module nutzt, sollte sie über einen lokalen Webserver geöffnet werden, zum Beispiel:

```powershell
python -m http.server 8000
```

Danach `http://localhost:8000/` aufrufen. Die Tests laufen mit:

```powershell
node --test
```

## Auf GitHub Pages veröffentlichen

Die Dateien bleiben im Hauptverzeichnis des Pages-Repositories. Unter **Settings → Pages** weiterhin **Deploy from a branch**, Branch `main` und Ordner `/ (root)` verwenden. Es gibt keinen Build-Schritt und alle lokalen Ressourcen verwenden relative Pfade.

## Datenschutz

Lernstand, optionale Namensangaben und Transferdaten werden nur unter dem Schlüssel `geogebra-begleitkurs-state-v3` im `localStorage` des jeweiligen Browsers gespeichert. Beim ersten Laden bleiben Transfer-, Reflexions- und Nachweisdaten aus v2 erhalten; der neue Kursfortschritt startet bewusst neu. Der Lernnachweis wird über den Druckdialog lokal erzeugt. Es werden keine Schülerdaten an einen Server gesendet.
