# GeoGebra-Trainer für Regressionen

Lokaler, nicht veröffentlichter Lerntrainer für fünf physikalische Regressionswege in GeoGebra Rechner Suite.

## Einstieg

Öffne `index.html` über einen lokalen Webserver. Die Startseite führt zu den Lernwegen, zu drei neuen Übungsdatensätzen und zur Klausurdokumentation. Lernstände liegen ausschließlich im Browser-Speicher; ein Zurücksetzen betrifft nur den gewählten Lernweg.

## Lernwege

- Coulomb: inverse Potenzfunktion, (F \propto 1/r^2)
- U–Q: Potenzmodell, Quotientenkonstanz und lineare Regression
- Kondensator-Aufladung: Exponentialregression der neun regulären Messpaare

Der Originalpunkt bei 100 s / 0,251 V bleibt erhalten. Er ist nur als freiwillige, eingeklappte Datenprüfung sichtbar und wird nicht in D1:D9 hineingerechnet.

## Qualitätssicherung

```powershell
node --test
```

Die Tests prüfen Rechenwerte, Migration und Lernstände, Dokumentationsverweise, Ressourcen, Bildherkunft und die Abschlusslogik der Übungsaufgaben. Die letzte Abnahme steht in [ABNAHMEPROTOKOLL.md](./ABNAHMEPROTOKOLL.md); Änderungen und Bereinigungen stehen in `docs/ABSCHLUSSBERICHT_2026-10-01.md`.

## Bilder, Quellen und Archiv

- Aktive Bilder und Herkunft: [BILDVERZEICHNIS.md](./BILDVERZEICHNIS.md)
- Lizenz- und Quellenhinweise: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
- Historische Aufträge und Reviews: `docs/archiv/`

Die echten GeoGebra-Screenshots wurden vom Projektinhaber selbst aufgenommen. Die U–Q-Abbildungen sind gekennzeichnete, programmgenerierte Schemabilder.