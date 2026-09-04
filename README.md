# Regressionstrainer

Eine kleine statische Web-App zum Üben von Potenzregression und Fehleranalyse.

## Dateien

- `index.html` – Seitenstruktur
- `style.css` – Layout und responsive Darstellung
- `app.js` – Regression, Diagramm, Auswertung und lokales Speichern

Die Seite benötigt **keine Bilder** und keine externen JavaScript-Bibliotheken.

## Auf GitHub Pages veröffentlichen

1. Neues GitHub-Repository anlegen, z. B. `regressionstrainer`.
2. `index.html`, `style.css` und `app.js` in das Hauptverzeichnis des Repositories hochladen.
3. Im Repository zu **Settings → Pages** gehen.
4. Unter **Build and deployment** `Deploy from a branch` wählen.
5. Branch `main`, Ordner `/ (root)` auswählen und speichern.
6. Nach kurzer Zeit ist die Seite unter einer Adresse wie
   `https://DEINNAME.github.io/regressionstrainer/` erreichbar.

## Bilder

Für diese Version sind keine Bilddateien nötig. Diagramm und Oberfläche werden direkt mit HTML/CSS/SVG erzeugt.

Falls später eigene Screenshots oder Fotos eingebaut werden sollen:
- im Repository einen Ordner `assets/` anlegen,
- Bilder dort hochladen,
- in HTML z. B. mit `src="./assets/dateiname.png"` referenzieren.

## Datenschutz / Speicherung

Der Arbeitsstand wird über `localStorage` nur im Browser des jeweiligen Geräts gespeichert.
Zusätzlich kann der Arbeitsstand als JSON-Datei exportiert und später wieder geladen werden.
