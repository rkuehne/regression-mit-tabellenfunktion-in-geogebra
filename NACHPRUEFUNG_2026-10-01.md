# Nachprüfung des GeoGebra-Trainers

Stand: 1. Oktober 2026. Vergleichsgrundlage: ANTIGRAVITY_ARBEITSAUFTRAG.md und aktueller Projektstand. Folgeauftrag: [GPT_5_6_TERRA_ARBEITSAUFTRAG.md](GPT_5_6_TERRA_ARBEITSAUFTRAG.md).

## Urteil

Vieles ist umgesetzt, aber die Überarbeitung ist noch nicht vollständig und die dokumentierte Gesamtabnahme ist nicht belastbar. Die Dreiteilung und die fünf Phasen sind eine gute Grundlage. Der nächste Durchgang sollte diese Struktur erhalten, konkrete Fehler beseitigen und den Lernfluss kürzen.

Die verbliebenen Probleme sind nicht nur Geschmacksfragen: Es fehlen tatsächlich Schrittschaltflächen, ein Eingabeereignis löst einen ReferenceError aus, alte Antworten werden ohne Gültigkeitsprüfung als abgeschlossen übernommen, und die neue Coulomb-Übung verlinkt das Kondensator-Muster. Die vorhandenen Tests erkennen diese Fehler nicht.

## Was unabhängig geprüft wurde

- Node-Testlauf im Projektverzeichnis: **68 bestanden, 0 fehlgeschlagen, 0 übersprungen**. Laufzeit rund 2,1 Sekunden.
- Alle zentralen HTML-/JavaScript-/CSS-Dateien, die Lernpfade, Klausurmuster, neuen Übungsdaten, Speicherlogik, Bildverzeichnis und Abnahmeunterlagen gelesen und verglichen.
- Ausgewählte Originalbilder und vorhandene Abnahme-Screenshots tatsächlich angesehen.
- Die unveränderten Funktionen renderStepNav, renderSharedRequirement, renderCheckpoint und storeCheckpointValue mit minimalen DOM-Objekten isoliert ausgeführt. Das prüft die betreffenden Codepfade; es ersetzt keinen Browser-Durchlauf.
- Migration und Verknüpfungen mit zusätzlichen Testeingaben in einem frischen Node-Prozess geprüft.
- GeoGebra-Befehlsdokumentation als Primärquelle nachgeschlagen.

**Prüfgrenze:** In dieser Sitzung ist kein verbundener Browser verfügbar. Deshalb keine eigene aktuelle Gesamtprüfung durch Anklicken, bei 200 % Zoom, auf einem echten iPad oder in der Druckvorschau. Die übernommenen Bildschirmdateien werden als vorhandene Belege bewertet, nicht als eigene aktuelle Browserabnahme. Die normale Shell war nicht verfügbar; der unabhängige Testlauf erfolgte über einen Node-Unterprozess. Git meldet für die bereitgestellte .git-Struktur „not a git repository“; eine Commit-basierte Differenzprüfung war daher nicht möglich.

## Bereits sinnvoll umgesetzt

| Bereich | Nachweisbarer Fortschritt |
| --- | --- |
| Grundstruktur | Drei Hauptbereiche auf allen vier Seiten: Regression lernen, Selbstständig auswerten, Für die Klausur dokumentieren. |
| Lernpfade | Alle fünf bestehenden Lernweg-IDs erhalten; jeder Weg besitzt dieselben fünf nichtleeren Phasen. |
| Kontrollumfang | Jeder gewöhnliche Schritt besitzt höchstens zwei Pflichtfelder. Insgesamt 47 Schritte mit 94 gewöhnlichen Pflichtfeldern, dazu die einmalige gemeinsame Kontrolle mit fünf Feldern. |
| Arbeitsmodus | Kompakte Anleitung als Standard; zusätzliche Felder und ausführliche Erklärung grundsätzlich ausklappbar; neutrale Zahlenplatzhalter. |
| Regressionsrechnung | Rechenfunktionen und Referenzwerte der neun Aufladepunkte sind konsistent; Unicode-Minus wird gelesen. |
| Anwendung | Drei neue Datensätze mit je sieben Zeilen vorhanden, als didaktische Übungsdaten gekennzeichnet, getrennt gespeichert; Zahlenreferenzen stimmen. |
| Klausurhilfe | Fünf gemeinsame Abschnitte, physikalische Formeln mit Einheiten, eingesetzte Abweichungsrechnungen und vorsichtige Schlussfolgerungen vorhanden. Die früheren JavaScript/TeX-Escape-Probleme sind in den geprüften Mustern behoben. |
| Speicherung | Schema Version 2, gleicher Speicherschlüssel, getrennte Übungs- und Dokumentationszustände; Exponential-Altstand wird gesichert. |
| Bilder | Ersatzbedarf der 13 Q-U-Schemata in Entwicklungsunterlagen eingeräumt. Die einzelne historische Auflade-Formelaufnahme 09 ist aus den aktiven Schritten entfernt. |

Die ursprünglichen 45 Kapitel sind jetzt 47 Schritte. Die Entlastung entsteht also durch weniger Pflichtkontrollen und geschlossene Vertiefung, nicht durch weniger Schritte. Das ist vertretbar, solange die Oberfläche wirklich auf die aktuelle Handlung konzentriert wird.

## Konkrete Fehler mit hoher Priorität

### 1. Schrittnavigation zeigt keine Schrittschaltflächen

Fundstelle: app.js, renderStepNav, Zeilen 285–332. Das Element item erhält button, wird anschließend aber nicht an stepNav angehängt. Nur die fünf Gruppenüberschriften werden angehängt.

Isolierte Ausführung mit dem tatsächlichen phaseId-Schema ergibt **fünf Überschriften und null Schrittschaltflächen**. Frei anwählbare einzelne Schritte fehlen dadurch. Zusätzlich würde das bloße Ergänzen von append wieder die vollständige alte Seitenleiste herstellen. Vorgabe war eine kurze Unterliste nur für die aktuelle Phase.

### 2. Gemeinsame Fehlerkontrolle löst Laufzeitfehler aus

Fundstelle: app.js, Zeilen 695–700. Der onStateChange-Callback ruft renderLearningMap() und updateCourseSummary() auf. Beide Funktionen sind in app.js nicht definiert oder importiert.

Reproduktion: Q-U-Lernweg öffnen, zur eingebetteten gemeinsamen Kontrolle gehen, ein Feld ändern oder das Formular absenden. Isolierte Ausführung liefert **ReferenceError: renderLearningMap is not defined**. saveState und renderProgress laufen davor; die folgenden Aktualisierungen bleiben aus. Es handelt sich daher nicht pauschal um verlorene Speicherung, sondern um einen unterbrochenen Aktualisierungsablauf.

### 3. Phasenstatus bleibt nach einer Prüfung veraltet

Fundstellen: app.js, Zeilen 504–510, 1080–1096 und renderCourseIdentity ab Zeile 767. Die Phasenanzeige wird bei einem kompletten Rendern aufgebaut. Die gewöhnliche Prüfung und das Zurücksetzen eines Schrittstatus aktualisieren Fortschrittskarte und Schrittnavigation, aber nicht die Phasenanzeige.

Erwartung: Nach der letzten Pflichtkontrolle einer Phase erscheint sofort „Abgeschlossen“; bei einer anschließend falschen Pflichtantwort wird der Status sofort wieder offen. Der Wechsel zu einem anderen Schritt darf dafür nicht erforderlich sein.

### 4. Freiwillige Kontrollen beeinflussen den Pflichtstatus und können falsches grünes Feedback erhalten

Fundstellen: app.js, storeCheckpointValue, Zeile 523; renderCheckpoint, Zeilen 664–669.

- Jede Eingabe ruft markStepIncomplete auf, auch bei required:false. Eine freiwillige Antwort kann dadurch einen abgeschlossenen Schritt zurücksetzen.
- Beim erneuten Anzeigen eines abgeschlossenen Schritts wird setFieldFeedback(..., true) für ausgefüllte freiwillige Felder aufgerufen, ohne die Antwort zu prüfen. Eine falsche freiwillige Antwort erscheint dann als richtig.

Beide Codepfade wurden isoliert reproduziert. Freiwillige Aufgaben sollen nur eigenes Feedback erhalten.

### 5. Migration erzeugt sachlich falsche Abschlüsse

Fundstelle: state.js, migrateState, Zeilen 238–286.

Die neuen Parameterschritte werden abgeschlossen, sobald ihr alter Ursprungsschritt abgeschlossen war und irgendein übertragbarer Wert existiert. Es fehlt die Prüfung der aktuellen Pflichtfelder.

Reproduzierte Beispiele:

| Altstand | Aktuelles Ergebnis | Fehler |
| --- | --- | --- |
| regression abgeschlossen, interpretation=near | inverse-parameters abgeschlossen | Neues Pflichtfeld ideal fehlt vollständig. |
| uq-power-fit abgeschlossen, meaning=WRONG | uq-power-parameters abgeschlossen | Falsche Antwort und fehlendes neues Pflichtfeld distance werden ignoriert. |

Auch der vorhandene Migrationstest erwartet einen Abschluss bei interpretation="Kraft nimmt mit 1/r^2 ab", obwohl die aktuelle Auswahlantwort near heißt. Bei degree="1" werden Daten in eine aktuelle Frage mit erwarteter Antwort line übertragen. Der Test sichert damit teilweise eine unzutreffende Erwartung ab.

Weitere Befunde: charging-model wird zusammen mit allen späteren Exponentialschritten gelöscht, obwohl die unveränderte Modellfrage laut Auftrag erhalten bleiben sollte. migrationNotice wird gespeichert, aber von keinem Seitenskript angezeigt; der geforderte einmalige Hinweis fehlt in der Oberfläche. Bereits migrierte Version-2-Stände können die falschen Abschlussmarkierungen schon enthalten und müssen bei einer Reparatur berücksichtigt werden.

### 6. Coulomb-Übung führt zum falschen Klausurmuster

Fundstelle: navigation.js, courseForTask, Zeilen 22–29; Verwendung in selbst-auswerten.js, Zeile 379.

power-7 verwendet Abstand r und Kraft F. courseForTask('power-7') liefert aber proportional-power, also den Q-U-Kondensatorversuch. Damit führt die Dokumentationsschaltfläche zu einem anderen physikalischen Zusammenhang. Richtig ist inverse-square. Die umgekehrte Zuordnung mehrerer Lernwege zu einer einzigen neuen Potenzaufgabe ist kein symmetrisches Eins-zu-eins-Mapping.

### 7. Exponential-Grundweg enthält weiterhin zehn Rohdatenzeilen und eine unvollständige Ergebnistabelle

Fundstellen: lesson-data.js, Zeilen 1211, 1234, 1257 und 1371; app.js, renderSourceData.

Die Tabellen dieser Schritte verwenden CHARGING_RAW_DATA mit **zehn** Zeilen, obwohl der Grundweg neun Punkte verwenden soll. flagged:true wird dabei nicht sichtbar markiert, weil markExcludedRows im betreffenden Schritt fehlt.

In charging-deviations werden predicted und deviation aus CHARGING_RAW_DATA gelesen. Diese Eigenschaften existieren dort nicht. Alle zehn Zeilen zeigen in den beiden Ergebnisspalten **„–“**. Die vorgesehene Analyse ist in CHARGING_ANALYSIS_DATA vorhanden, wird hier aber nicht genutzt. Eine vollständig berechnete Ergebnistabelle gehört gegebenenfalls in eine geschlossene Hilfe, nicht vor die Eigenarbeit.

### 8. Rücksprung auf Dokumentationsabschnitte ist nicht robust

Fundstelle: dokumentation.js, Zeilen 300–306. Der Selektor sucht ein Dokument mit eigenem hidden=false, prüft aber nicht, ob dessen Elterncontainer verborgen ist. Bei gespeichertem Papier-Lernmodus wird häufig der versteckte Musterabschnitt gewählt. Ein ungültiger section-Parameter wie ] wird direkt in einen CSS-Selektor eingefügt und kann einen SyntaxError auslösen.

Die gültigen fünf Abschnitts-IDs müssen vor der Selektorsuche geprüft werden; der Zielcontainer muss aus dem tatsächlich sichtbaren Modus stammen.

## Didaktische und fachsprachliche Restarbeit

### Selbstständigkeit wird derzeit nur teilweise verlangt

practice-data.js nennt die konkreten Befehle bereits im Arbeitsauftrag. assumptionsText zeigt die vollständig eingesetzte Rechnung einschließlich der gesuchten Vergleichsgrenze: 6,25 %, 16,67 % beziehungsweise 2,5 %. In der Exponentialtabelle stehen zusätzlich alle erst zu berechnenden ΔU-Werte. Die geschlossenen Hilfe-Stufen bieten deshalb kaum eine echte Abstufung.

Verbesserung: Ausgangsdaten, Unsicherheitsannahmen und ein kurzer Ergebnisauftrag bleiben offen. Vorgehen, Befehle und Referenzwerte liegen in drei unterschiedlich tiefen, zunächst geschlossenen Hilfen. Die Lernenden berechnen die Werte zunächst selbst.

In selbst-auswerten.js, Zeile 293, reicht eine vollständig richtige gespeicherte Antwortmenge für die Meldung „Alle numerischen Kontrollen erfolgreich bestanden“, auch wenn nie geprüft wurde. completedChecks werden bei Änderungen nicht bereinigt. Eingeben, Prüfen und handschriftliche Selbstkontrolle sollten unterscheidbare Zustände sein.

### Aufladung: Vertiefung weiterhin im Pflichtweg

charging-conclusion nennt den zehnten Punkt bereits in Ziel, Handlungen, Ergebnisbox, Rechenbeispiel und drei offen gerenderten Bildern. Das ist keine separate freiwillige Vertiefung. Ein Satz begründet die Beschränkung auf neun Punkte sogar mit der schlechten Passung des zehnten Punkts („Der Grundweg beschränkt sich daher ...“), obwohl der Text an anderer Stelle genau davor warnt.

Der Grundweg muss die ausgewertete Teilreihe 0–80 s transparent als didaktische Festlegung bezeichnen. Die Auswahl ist damit keine nachträgliche Qualitätsentscheidung über Messwerte. Die Untersuchung des zehnzeiligen Originalprotokolls gehört in eine geschlossene, unabhängige Zusatzfrage. Ungleiche Zeitabstände sind kein Ausschlussgrund.

### Bezeichnungen sind noch uneinheitlich

- Potenzexponent wird meistens n genannt, aber unter anderem in Coulomb-Schlussfolgerung, Begriffshilfe und Q-U-Bildunterschrift weiterhin b.
- In der Exponentialfunktion ist k der Exponentialparameter; der gesamte Ausdruck kt ist der Exponent. „Exponent k“ ist als durchgängige Fachbezeichnung unpräzise.
- Bearbeitungsübersicht heißt in dynamischen Abschlussmeldungen weiterhin Lernnachweis (app.js, Zeilen 279–281 und 839).
- Q-U und U-Q sowie „Fehlerseite“, „Pflichtseite“ und „Pflichtkontrolle“ wechseln. Einheitlich „Q-U-Zusammenhang“ in der physikalischen Erklärung und „gemeinsame Fehlerkontrolle“ für die tatsächliche Aufgabe verwenden; Befehle und Objekt-IDs davon unabhängig erhalten.
- „b entsteht durch Streuung und Extrapolation“ benennt Ursachen zu sicher. Der Achsenabschnitt ist ein extrapolierter Regressionsparameter; Streuung oder ein systematischer Offset sind mögliche Ursachen, nicht durch die Regression bewiesen.

Die schulische Vergleichsregel ist mittlerweile mehrfach eingeschränkt. Das ist gut. Die Interpretation sollte jedoch in jedem Kontext sichtbar dieselbe Reichweite besitzen: Sie berechnet keine statistische Unsicherheit des Potenzexponenten oder des Achsenabschnitts.

## Darstellung und Bildmaterial

- Der Start-Screenshot 01 zeigt einen über 700 px hohen Einstieg, eine ungestaltete Vorbereitungs-Liste mit doppelten Nummern und große Überschriften. .hero-grid und .setup-list besitzen keine reguläre Gestaltung mehr; die alten HTML-Bausteine wurden offenbar nicht vollständig an die gekürzte Kopfgestaltung angepasst. Auf diesem Bild ist die Methodenwahl erst unten angeschnitten.
- 13 Schritte besitzen mehrere offen gerenderte Arbeitsbilder; fill-points hat außerdem fünf statt höchstens vier Handlungen. renderStepImages unterscheidet keine primären Bilder von Hilfebildern. Die Vorgabe „ein Arbeitsbild, weitere Bilder in Hilfe“ ist nicht umgesetzt.
- Die Q-U-Schemata sind in BILDVERZEICHNIS.md beschrieben, in der Lernoberfläche aber als „GeoGebra-Algebraansicht“ oder „GeoGebra-Tabelle“ bezeichnet. Die sichtbare Schema-Kennzeichnung fehlt.
- charging/10-auffaellige-modellabweichung.png ist weiterhin aktiv und zeigt die umgekehrte Vorzeichenkonvention: bei 80 s −2,61 %, bei 100 s −42,59 %. Die aktuelle Konvention fordert +2,61 % und +42,59 %. Nur Bild 09 auszumustern behebt die Inkonsistenz nicht.
- Die 90-s-Hypothesenaufnahme lenkt auf eine vermeintliche Datenkorrektur. Für das Kernziel ist sie entbehrlich und sollte aus dem aktiven Lernweg entfernt werden; als historisches Material kann sie erhalten bleiben.
- Bildverzeichnis nennt für den alten Coulomb-Weg fälschlich r=6–22 und (6;0,85); tatsächlich sind es sechs Werte r=8–18,6 und (8;0,37). Das Verzeichnis mischt hier den neuen Sieben-Punkte-Übungsdatensatz mit dem alten Lernbeispiel. Der Q-U-Endwert lautet 10,2 statt 10,5. Beim Prüfpunkt steht im Verzeichnis „unterhalb“, im aktuellen Text korrekt „oberhalb“.
- Quellcodebefund Druck: .site-nav fehlt in der Druck-Ausblendliste. Auch die neue Schaltfläche zum Schließen der Bearbeitungsübersicht ist nicht ausdrücklich ausgeblendet. Das tatsächliche Druckbild muss noch geprüft werden.

## Warum die bisherige Abnahme korrigiert werden muss

ABNAHMEPROTOKOLL.md meldet praktisch alle Browser-, Druck- und Bedienprüfungen als bestanden. Die Belege tragen diese Aussage nicht:

| Beleg | Tatsächlich sichtbarer Inhalt |
| --- | --- |
| scratch/02-coulomb-step1-1280.png | Fast nur Hintergrund; Navigation und Beginn des Kurstitels ganz unten, keine prüfbare Lernkarte. |
| scratch/03-coulomb-parameters-1280.png | Gleiches Problem; kein Parameterschritt sichtbar. |
| scratch/04-charging-deviations-1280.png | Keine Abweichungsaufgabe sichtbar. |
| scratch/06-dokumentation-model-1280.png | Leerer Hintergrund. |
| scratch/09-mobile-375.png | Vollständig leerer Hintergrund. |
| scratch/07-dokumentation-practice-1280.png | Allgemeine Dokumentationsanleitung statt der behaupteten Zielsektion. |

Die Ursache dieser Aufnahmen lässt sich aus den Dateien nicht sicher bestimmen. Das Skript capture-all.cjs wartet jedenfalls weder auf gerenderten Inhalt noch auf fertigen Formelsatz und bestätigt nur, dass eine Datei erzeugt wurde. Ein Screenshot-Dateiexistenztest ist kein erfolgreicher Funktionstest.

CSS mit rem-Einheiten beweist keinen durchgeführten 200-%-Zoomtest. :focus-visible beweist keinen vollständigen Tastaturdurchlauf. Print-CSS beweist keine lesbare PDF-Ausgabe. Das Protokoll nennt außerdem den falschen Speicherschlüssel shared-error-method; der tatsächliche Schlüssel bleibt korrekt uq-largest-single-error.

## Einordnung der ursprünglichen Arbeitspakete

| Altes Paket | Ergebnis dieser Nachprüfung |
| --- | --- |
| AP 00 Bestandsaufnahme | Unterlagen vorhanden; einzelne Bildangaben und Abnahmebehauptungen falsch. |
| AP 01 Grundlagen/Fachlichkeit | Wesentliche Reparaturen vorhanden, Fachsprache und aktive Bildkonvention noch nicht konsistent. |
| AP 02 Migration | Teilweise umgesetzt; aktuelle Abschlusslogik, Erhaltung und sichtbarer Hinweis fehlerhaft. |
| AP 03 Hauptbereiche | Dreiteilung und Methodenwahl vorhanden; Kopf, Kontextverknüpfung und Rücksprünge unvollständig. |
| AP 04 Phasen/Lernkarte | Datenstruktur vorhanden; Schrittnavigation, Statusaktualisierung, freiwillige Felder und Bildreduktion nicht korrekt. |
| AP 05 Aufladung | Rechenwerte richtig; Tabellen, optionale Vertiefung und Auswahlerklärung unvollständig. |
| AP 06 Gemeinsame Fehlerregel | Geteilter Zustand und eingebettetes Formular vorhanden; Laufzeitfehler und Wiederholung im Schluss-Schritt. |
| AP 07 Bilder/Layout | Teilweise umgesetzt; fehlende Originalaufnahmen offen, sichtbare Schema-Kennzeichnung und weiterer Vorzeichenfehler fehlen. |
| AP 08 Selbstständige Anwendung | Daten und Referenzen richtig; zu viele vorweggenommene Hilfen, falscher Musterlink und unklarer Prüfstatus. |
| AP 09 Klausurhilfe | Inhalt deutlich verbessert; Abschnittsnavigation, Rückkontext und Druck noch zu prüfen/reparieren. |
| AP 10 Abnahme | 68 Tests tatsächlich grün; Gesamt-Browser-/Druckabnahme nicht nachgewiesen. |

## Zusätzliche Verbesserungen ohne weiteren Kursausbau

1. Ein Satz pro Hauptbereich: „Mit Anleitung üben“, „Neue Daten selbst auswerten“, „Rechenweg für die Klausur aufschreiben“. Die Hauptnavigation bleibt unverändert.
2. Unentschlossene Anfänger erhalten eine kurze Empfehlung für den linearen Q-U-Weg; alle Wege bleiben direkt frei wählbar.
3. Die aktuelle Phase zeigt nur ihre eigenen Schritte. Ein Schrittwechsel führt zum Anfang der Lernkarte, nicht zurück an den Anfang des gesamten Arbeitsbereichs.
4. Einheitliche kurze Karten: Ziel, maximal vier Handlungen, Befehl, ein passendes Bild, ein Satz zur Ergebniserkennung, Kontrolle. Begründung und Hilfen dahinter. Keine Ergebniszahlen in der Orientierung vor der Kontrolle.
5. Die physikalische Formel mit Einheiten wird bereits in Phase 3 erklärt; die Klausurhilfe verwendet dieselbe Form. Unterschiedliche Anzahl an Vorbereitungsschritten ist sinnvoll und muss nicht künstlich vereinheitlicht werden.
6. Nach Abschluss: zuerst ein klarer Übergang zur passenden neuen Übung. Bearbeitungsübersicht bleibt eine optionale zweite Aktion. Das passt zum Ziel selbstständiger Regression besser als eine große Abschlussbescheinigung.
7. Beim Prüfen zuerst einen Hinweis geben; vollständige Lösung gezielt aufklappen lassen. Ergebnisse sind eine Selbstkontrolle, keine Kompetenzbescheinigung.
8. Als kurze optionale Vertiefung zur Modellprüfung kann man nach Mustern in den Abweichungen fragen. Das ergänzt den reinen Maximalwertvergleich, ohne einen weiteren Pflichtkurs zu bauen. Die [NIST-Dokumentation zur Modellprüfung](https://www.itl.nist.gov/div898/handbook/pmd/section4/pmd44.htm) erläutert, warum strukturierte Residuen für die Modellbeurteilung relevant sind.

## Nachtrag: Unnötige Meta-Hinweise in der Lernoberfläche

Der Nutzer hat zusätzlich die Entfernung von Texten verlangt, die vor allem den Entwicklungsauftrag kommentieren. Dieser Befund ist im aktuellen Quelltext bestätigt. Die Oberfläche enthält unter anderem:

| Fundstelle | Beispiel | Bewertung |
| --- | --- | --- |
| app.js, renderCourse, ca. 776 | „Alle Schritte bleiben frei erreichbar.“ | Beschreibt eine Entwicklungsvorgabe; aus dem Intro entfernen. |
| index.html, ca. 169 | „Alle Kapitel bleiben offen.“ | Gleicher Hinweis im HTML-Ausgangstext; ebenfalls entfernen. |
| index.html, ca. 55–56 | „5 einheitliche Phasen“, „Fortschritt bleibt lokal gespeichert“ | Hervorgehobene Merkmale beanspruchen Platz vor der eigentlichen Arbeit. Phasen zeigt die Navigation; Speicherung einmal in der Bedienhilfe erklären. |
| shared-error-module.js, ca. 149–150 und weitere Stellen | lange Erklärung, für welche Phasen und Lernwege ein gemeinsamer Abschluss benötigt wird | Durch einen knappen, zutreffenden Prüfstatus ersetzen. |
| selbst-auswerten.js, ca. 369 | „Es erfolgt keine automatische Bewertung handschriftlicher Texte.“ | Durch die konkrete Aufforderung zur Selbstkontrolle ersetzen. |
| index.html, ca. 387 | langer Hinweis über Kompetenznachweis und lokale Erstellung | Bearbeitungsübersicht knapp und zutreffend benennen. |

Die Bereinigung darf mathematische Bedingungen, Grenzen der schulischen Vergleichsregel, echte Fehlerhinweise und die Herkunft verwendeter Inhalte nicht beseitigen. Jeder verbleibende Satz soll eine konkrete Lernhandlung, ein Verständnis oder eine notwendige Entscheidung unterstützen. Die Angabe, dass die drei Q-U-Methoden denselben Datensatz auswerten, bleibt als kurze Orientierung sinnvoll.

Der Terra-Auftrag enthält hierfür nun **T09**, einschließlich konkreter Bearbeitungsregeln, HTML-/JavaScript-Abgleich und redaktioneller Abnahme. **T10** behandelt den kurzen GeoGebra-Herkunftshinweis sowie die Prüfung tatsächlich verwendeter Materialien anhand der offiziellen Quellen. Beide Pakete sind vor der Schlussprüfung T08 abzuschließen. Der Nutzer bestätigt außerdem die eigene Aufnahme der echten GeoGebra-Screenshots; diese Herkunft ist geklärt. Das zusätzliche Paket T11 beauftragt nach der Überarbeitung die Entfernung entbehrlicher Altlasten und die geordnete Archivierung historischer Unterlagen. Die Schlussprüfung erfolgt am bereinigten Endstand. Anwendungscode wurde auch für diesen Nachtrag nicht verändert.

## Fachliche Quellen und offene Geräteprüfung

[GeoGebra: TrendPot](https://geogebra.github.io/docs/manual/de/commands/TrendPot/) dokumentiert die Potenzform und positive Koordinaten. [GeoGebra: TrendExp](https://geogebra.github.io/docs/manual/de/commands/TrendExp/) dokumentiert die Exponentialform und zeigt ausdrücklich ein Beispiel mit x=0. [GeoGebra: Trendlinie](https://geogebra.github.io/docs/manual/de/commands/Trendlinie/) erklärt die Gerade mit Minimierung der quadratischen Abweichungen in y-Richtung. Die tatsächliche Bedienung von Q=Trendlinie(...), =Q(A1), Mittel/Mittelwert, Ausfüllgriff und Achsenskalierung muss noch in der verwendeten Rechner Suite mit dokumentierter Version erprobt werden. Eine reine Zahlenprüfung des Trainers belegt diese Bedienung nicht.

Der folgende Terra-Auftrag übersetzt diese Befunde in abgrenzbare Pakete mit konkreten Prüffällen. Anwendungscode wurde während dieser Nachprüfung nicht verändert.
