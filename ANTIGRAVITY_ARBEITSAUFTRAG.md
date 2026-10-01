**Verbindlicher Arbeitsauftrag für Antigravity: GeoGebra-Trainer überarbeiten**

Stand: 1. Oktober 2026

**Auftrag**

Überarbeite die vorhandene statische Webanwendung vollständig nach den folgenden Arbeitspaketen. Ziel ist ein übersichtlicher Trainer, mit dem Schülerinnen und Schüler Regressionen in der separaten GeoGebra Rechner Suite selbst durchführen und anschließend für eine Klausur dokumentieren können.

Lies dieses Dokument vollständig, bevor du Änderungen vornimmst. Lies außerdem PROJEKT_REVIEW.md als Hintergrund. Dieses Dokument legt die Umsetzung fest und hat bei unterschiedlichen Varianten im Prüfbericht Vorrang. Setze die Arbeitspakete in der angegebenen Reihenfolge um. Liefere tatsächliche Änderungen, Prüfungen und einen Abschlussbericht. Ein Entwurf oder eine Liste von Vorschlägen reicht nicht.

**Verbindliche Entscheidungen**

| Thema | Festlegung |
| --- | --- |
| Architektur | Statische HTML/CSS/JavaScript-Anwendung mit ES-Modulen und relativen Pfaden; GitHub Pages bleibt ohne Build-Schritt nutzbar. |
| Hauptbereiche | „Regression lernen“, „Selbstständig auswerten“, „Für die Klausur dokumentieren“. |
| Lernwege | Die fünf bestehenden course IDs bleiben erhalten. Das Konstantenverfahren wird als ergänzendes Auswertungsverfahren bezeichnet. |
| Gemeinsamer Ablauf | Fünf Phasen: Daten vorbereiten, Modell berechnen, Parameter deuten, Abweichungen prüfen, Ergebnis formulieren. |
| Exponential-Grundweg | Ausschließlich neun Messpaare von 0 bis 80 s. Untersuchung des zehnten Punktes als eigenständige Vertiefung. |
| Erklärungen | Aufgaben und Befehle zuerst; ausführliche Erklärung, Beispiel und Fehlerhilfe aufklappbar. |
| Klausurhilfe | Alle fünf Muster und die Papierübungen bleiben erhalten und werden mit dem Lernablauf verbunden. |
| Fehlerregel | „Methode des größten Einzelfehlers“ bleibt als vereinfachte schulische Vergleichsregel erhalten. Ihre gemeinsame Pflichtkontrolle wird im Lernweg angeboten. |
| Anwendung | Genau drei neue Übungsaufgaben, eine je Regressionsart; Auswertung erfolgt in GeoGebra. |
| Speicherung | Bestehender localStorage-Schlüssel bleibt erhalten; gespeicherte Daten werden gezielt migriert. |
| Mathematik | Regressionsalgorithmen und interne Rückgabeformate werden für eine reine Änderung der Fachnotation nicht umbenannt. |
| Betrieb | Lokale MathJax-Dateien und Schriften bleiben erhalten. Keine Anmeldung, kein Backend, keine Analyse- oder Trackingdienste hinzufügen. |
| Veröffentlichung | Dieser Auftrag umfasst lokale Umsetzung und Prüfung. Veröffentlichung ist ein gesonderter Auftrag. |

Keine neue Framework-Struktur, kein npm-Buildsystem und keinen integrierten Regressionsrechner einführen. Die Lernenden sollen selbst in GeoGebra arbeiten. Bestehende Ergebnisse dürfen nicht zugunsten eines anderen Designs stillschweigend verändert werden.

Die Nutzeroberfläche zeigt Lernaufgaben und Hilfen. Begriffe wie Schema-Version, Migration, Datenmodell und Teststatus gehören in Entwicklungsunterlagen und Abschlussbericht.

**Dateien und Zuständigkeiten**

| Datei | Vorgesehene Funktion |
| --- | --- |
| index.html / app.js | Lernwegauswahl, geführte Schritte, Phasennavigation und optionale Bearbeitungsübersicht |
| lesson-data.js | Inhalte der fünf Lernwege, Phasenzuordnung, Bilder und Prüfregeln |
| selbst-auswerten.html / selbst-auswerten.js | Neuer Bereich für eigenständige Anwendung und Befehlsübersicht |
| practice-data.js | Drei neue Übungsdatensätze, Hinweise, Referenzergebnisse und Prüfregeln |
| dokumentation.html / dokumentation.js / documentation-data.js | Klausurmuster, Schreibübungen und Druckansichten |
| groesster-einzelfehler.html / groesster-einzelfehler.js | Weiter erreichbare ausführliche Methodenhilfe |
| shared-error-module.js | Gemeinsame Darstellung und Kontrolle der Q-U-Fehlerregel im Lernweg und auf der Methodenseite |
| navigation.js | Gemeinsame Hauptnavigation und Weitergabe des gewählten Lernwegs |
| state.js | Datenformat, Bereinigung, Migration und Speicherung |
| regression.js | Bestehende Rechenfunktionen und robuste Zahleneingabe |
| math-typeset.js | Gemeinsame lokale Formeldarstellung |
| style.css | Gemeinsame Gestaltung, schmale Ansichten und Druck |
| tests/ | Bestehende und erforderliche neue Prüfungen |
| README.md | Aktualisierte Anleitung und technische Einordnung |

Neue Dateien aus dieser Tabelle sind anzulegen, soweit sie noch fehlen. Vermeide dieselbe Logik in mehreren Seitenskripten.

**AP 00 — Ausgangszustand sichern und Umsetzung vorbereiten**

Zweck: Änderungen nachvollziehbar durchführen und bestehende Benutzerdaten schützen.

Arbeitsschritte:

1. Lies vorhandene Projektanweisungen sowie README.md und die in der Dateitabelle genannten vorhandenen Dateien.
2. Prüfe, ob seit dem Prüfbericht Änderungen hinzugekommen sind. Behandle Quelltext als aktuellen Ausgangszustand; Zeilennummern im Bericht dienen nur als Orientierung.
3. Erfasse die bisherige Reihenfolge aller Schritt-IDs je course ID, bevor du Schritte entfernst oder verschiebst. Diese Reihenfolge wird für die Migration benötigt.
4. Führe node --test aus und halte das Ausgangsergebnis fest. Im geprüften Ausgangszustand bestehen 57 Tests.
5. Starte einen lokalen HTTP-Server. Prüfe die Anwendung im Browser. Direktes Öffnen als file:// ist für die Module kein geeigneter Test.
6. Erstelle UMSETZUNGSSTATUS.md mit den Paketen AP 00 bis AP 10 und den Statuswerten „offen“, „in Arbeit“, „umgesetzt, ungeprüft“, „abgenommen“ oder „blockiert“.
7. Lies insbesondere AP 02 vor jeder Änderung an Schritten, Prüfregeln oder Speicherung.

Abnahme:

- Ausgangstests und alte Schrittfolgen sind dokumentiert.
- Vorhandene Änderungen werden nicht überschrieben.
- Es ist klar, welcher Browser und welche lokale Adresse für die Prüfung verwendet werden.
- Ein fehlender Browser oder fehlende Originalbilder werden als konkrete Prüflücke festgehalten; dafür werden keine erfolgreichen Prüfungen erfunden.

**AP 01 — Bestätigte Formel-, Zahlen- und CSS-Fehler korrigieren**

Dateien: documentation-data.js, regression.js, app.js, style.css, passende Tests.

Arbeitsschritte:

1. Korrigiere sämtliche formelhaltigen Zeichenketten in documentation-data.js: introduction, task, checklist, starter und model. Verwende einheitlich String.raw oder korrekt doppelt maskierte Backslashes. Beachte: In einer gewöhnlichen JavaScript-Zeichenkette wird \t zum Tabulator; \tau ist dort daher beschädigt. Einfache \(...\)-Begrenzer dürfen ebenfalls nicht verloren gehen.
2. Prüfe die zur Laufzeit importierten Werte, nicht nur die Quelltextschreibweise. Im Übungsmodus dürfen keine Texte wie „Q=Ccdot U“, „10,%“, „Delta U(t)“ oder „au“ anstelle von τ verbleiben.
3. Ergänze die Zahlenlesefunktion so, dass das Unicode-Minus U+2212 wie das ASCII-Minus gelesen wird. Erhalte die Unterstützung für Dezimalkomma, Dezimalpunkt, negative Zahlen und bereits unterstützte gruppierte Zahlen.
4. Leere oder ungültige Eingaben müssen weiterhin als ungültig erkannt werden.
5. Gib dem Nummernspan und dem Textspan der Phasenanzeige unterschiedliche Klassen. Die 26-px-Kreisgestaltung darf nur die Nummer treffen. Beseitige den pauschalen Selektor .learning-map li span.
6. Sichere die Korrekturen mit gezielten Tests: Unicode-Minus, vorhandene Zahlenformate und zur Laufzeit intakte Formelzeichen in allen Dokumentationsfeldern.

Abnahme:

- parseLocaleNumber("−0,02836") und parseLocaleNumber("-0,02836") liefern denselben Wert.
- Zahleneingaben bleiben auch mit Komma korrekt prüfbar.
- τ, ΔU, Q=C·U und Prozentangaben erscheinen in Muster, Übung, Hilfen und Ausdruck richtig.
- Lange Phasentitel liegen nicht in einem 26-px-Kreis.
- Bestehende mathematische Tests bestehen.

**AP 02 — Speicherformat und Migration vorbereiten**

Dateien: state.js, tests/state.test.mjs; Abstimmung mit app.js und den neuen Seitenskripten.

Neue Struktur:

- Speicherschlüssel bleibt geogebra-begleitkurs-state.
- Ergänze schemaVersion: 2.
- Behalte activeCourseId, courses, sharedModules, documentation, student und updatedAt.
- Behalte lessonMode mit den Werten compact und explain. Für neue Benutzer ist compact der Standard.
- Ergänze practice mit selectedTaskId und einem getrennten tasks-Eintrag je Übungsaufgabe.
- Übungs-IDs sind linear-7, power-7 und exponential-7. Neue Auswahl ist linear-7.
- Jeder Übungszustand speichert answers, completedChecks und selfChecks. Er wird nicht in courses abgelegt.
- Alte, bereits verworfene transfer- oder reflection-Daten werden nicht wieder aktiviert.

Verbindliche Migrationsregeln:

1. Ein bestehender Stand ohne schemaVersion gilt als altes Format.
2. Kopiere Name, Kurs, gewählten Lernweg, Dokumentationsauswahl, Dokumentationsansicht und gültige Papier-Selbstkontrollen.
3. Erhalte den gemeinsamen Q-U-Methodenabschluss samt gültigen Antworten.
4. Ermittle aus dem alten currentStep-Index zunächst die alte Schritt-ID. Ordne diese ID anschließend dem neuen Index zu. Reines Begrenzen des alten Index auf die neue Länge reicht nicht.
5. Beim Konstantenverfahren wird uq-constant-reference in uq-constant-mean integriert. Ein alter aktueller Bezugswert-Schritt führt zum neuen Mittelwert-Schritt.
6. Im Exponential-Grundweg entfällt charging-data-check. Ein alter aktueller Datenprüfungsschritt führt zu charging-conclusion. Andere IDs bleiben nach Möglichkeit erhalten.
7. Exponential-Antworten zu charging-regression, charging-time, charging-predictions, charging-deviations und charging-conclusion werden wegen der neuen Bezugsdaten zurückgesetzt. Die Bearbeitung dieser Schritte ist anschließend offen.
8. Auch charging-points wird zurückgesetzt, weil der letzte geprüfte Punkt von D10 zu D9 wechselt. Erhalte die Antworten der unveränderten vorbereitenden Schritte, wenn sie noch zur neuen Kontrolle passen.
9. Für andere Schritte bleiben eine bisherige Abschlussmarkierung und Antworten nur erhalten, wenn die weiterhin verlangten Felder gültig sind. Bloß gespeicherte richtige Antworten dürfen einen zuvor offenen Schritt nicht automatisch abschließen.
10. Bewahre die geänderten alten Exponential-Antworten innerhalb des gespeicherten Datensatzes als einmalige legacyChargingProgress-Kopie zur Wiederherstellung auf. Sie zählen nicht zum neuen Fortschritt und werden nicht in den Lernfeldern angezeigt. Speichere dort nur den alten Exponential-Lernstand, keine doppelte Kopie des gesamten Speichers.
11. Ein im alten Format begonnenes Exponentialbeispiel erhält nach der Migration einmalig einen knappen Hinweis: „Das Beispiel wurde auf neun Messpaare vereinheitlicht. Die betroffenen Kontrollen kannst du erneut bearbeiten.“
12. Die Migration muss idempotent sein: Ein zweiter Aufruf oder Neuladen darf keine weiteren Antworten löschen.
13. Fehlerhafter JSON-Speicher und nicht verfügbares localStorage dürfen die Anwendung nicht zum Absturz bringen.

**Übernahme verschobener Kontrollen:**

Kopiere die betreffenden gespeicherten Antworten bei der Migration in die neue Schritt-ID. Ein neuer Parameterschritt darf als bereits bearbeitet übernommen werden, wenn sein alter Ursprungsschritt zuvor abgeschlossen war und die übernommenen Antworten den weiterhin gültigen Anforderungen entsprechen. Dies ist eine Übernahme derselben bereits geprüften Teilaufgabe, kein automatischer Abschluss einer neuen Aufgabe.

Die Zuordnung der Feld-IDs steht in AP 04. Berücksichtige sie bereits bei der Implementierung der Migration.

Abnahme mit vorbereiteten Testständen:

- Alle fünf Lernwege bleiben getrennt gespeichert.
- Unveränderte Antworten und persönliche Angaben bleiben erhalten.
- Alte Schrittindizes führen nach Umordnung zum richtigen Inhalt.
- Die geänderten Exponentialprüfungen erscheinen offen; frühere Antworten bleiben in der Legacy-Kopie erhalten.
- Dokumentations-Selbstkontrollen und gemeinsamer Methodenabschluss bleiben erhalten.
- Die drei Übungszustände verändern weder Lernweg- noch Papierfortschritt.
- Ein zweites Neuladen verändert den migrierten Stand nicht mehr.

**AP 03 — Drei Hauptbereiche und verständliche Auswahl einführen**

Dateien: index.html, app.js, navigation.js, alle weiteren HTML-Seiten, style.css.

Arbeitsschritte:

1. Verwende in der sichtbaren Oberfläche durchgehend den Namen „GeoGebra-Trainer“. Alte CSS-Klassen und Speicherschlüssel müssen deswegen nicht umbenannt werden.
2. Erstelle eine gemeinsame Navigation mit exakt diesen Beschriftungen:
   - Regression lernen → index.html
   - Selbstständig auswerten → selbst-auswerten.html
   - Für die Klausur dokumentieren → dokumentation.html
3. Markiere den aktiven Hauptbereich mit aria-current="page". Die Methodenhilfe erhält eine zusätzliche erkennbare Zuordnung zum Lernbereich und einen Rücklink.
4. Verwende auf allen Arbeitsseiten einen schmalen Kopf mit Titel und einem kurzen erklärenden Satz. Entferne den großen Hero-Bereich als dominanten Bestandteil des Arbeitsablaufs. Begrenze Arbeitsseitentitel auf höchstens 2,25 rem.
5. Ordne die Lernwegauswahl zuerst nach Verfahren:
   - Lineare Regression: Kondensator, Q und U.
   - Potenzregression: Coulomb, r und F; Kondensator, Q und U.
   - Exponentialregression: Kondensator-Aufladung.
   - Ergänzend: Konstantenverfahren Q/U.
6. Bei den drei Q-U-Auswertungen muss erkennbar sein, dass sie alternative Verfahren für dieselbe Messreihe sind. Sie sind keine verpflichtende Kursfolge.
7. Zeige beim Einstieg die Lernwegauswahl. Zeige nach der Auswahl den Arbeitsbereich. Die Auswahl wird dann über „Lernweg wechseln“ wieder aufgerufen; sie steht nicht ständig als großer Block über jeder Arbeitsaufgabe.
8. Stelle bei vorhandenem Fortschritt „Weiterarbeiten“ und „Lernweg wechseln“ bereit.
9. Gib den gewählten course-Parameter in Links zur Klausurhilfe und Methodenhilfe weiter. Ein Wechsel zur selbstständigen Anwendung wählt die passende Regressionsaufgabe; das Konstantenverfahren führt zur linearen Aufgabe.
10. Unterstütze weiterhin index.html?course=<gültige ID>#course und bestehende Rücklinks. Ergänze einen optionalen step-Parameter mit stabiler Schritt-ID.
11. Ein ungültiger Parameter führt zu einer sicheren vorhandenen Auswahl und verursacht keinen Fehler.
12. Navigation und Rücksprünge dürfen keinen Lernstand zurücksetzen.
13. Entferne den großen Lernnachweisblock aus dem dauerhaft sichtbaren Arbeitsbereich. Biete nach dem letzten Schritt „Bearbeitungsübersicht öffnen“ an. Bestehendes #summary soll diese Ausgabe weiterhin erreichbar machen.

Abnahme:

- Alle drei Hauptbereiche sind von jeder Seite erreichbar.
- Nach dem Einstieg erscheint die konkrete Lernaufgabe ohne erneutes Durchscrollen eines großen Seitenkopfes und der kompletten Auswahl.
- Der Rückweg aus der Klausurhilfe führt in den gewählten Lernweg und zum zuletzt bearbeiteten Schritt.
- Es gibt keine ungewollte Verpflichtung, alle fünf Wege nacheinander zu bearbeiten.
- Der Browser-Zurück-Button, Neuladen und direkte Links funktionieren.

**AP 04 — Eine Phasennavigation und eine gemeinsame Lernkarte bauen**

Dateien: app.js, index.html, lesson-data.js, style.css.

Ergänze für jeden Schritt eine eindeutige phaseId. Phase IDs sind data, model, parameters, deviations und conclusion. Sie sind unabhängig von den fünf Dokumentations-IDs.

Verbindliche Zuordnung:

| Lernweg | Daten vorbereiten | Modell berechnen | Parameter deuten | Abweichungen prüfen | Ergebnis formulieren |
| --- | --- | --- | --- | --- | --- |
| inverse-square | context, setup, table, first-point, fill-points | regression-concept, regression | inverse-parameters | predictions, deviations | conclusion |
| proportional-power | uq-power-context, uq-power-table, uq-power-points | uq-power-concept, uq-power-fit | uq-power-parameters | uq-power-model, uq-power-deviation | uq-power-conclusion |
| proportional-linear | uq-linear-context, uq-linear-table, uq-linear-points | uq-linear-concept, uq-linear-fit | uq-linear-parameters | uq-linear-model, uq-linear-deviation | uq-linear-conclusion |
| proportional-constants | uq-constant-context, uq-constant-table | uq-constant-ratios, uq-constant-mean | uq-constant-parameters | uq-constant-deviation, uq-constant-uncertainty | uq-constant-conclusion |
| capacitor-exponential | charging-context, charging-table, charging-delta, charging-points | charging-model, charging-regression | charging-time | charging-predictions, charging-deviations | charging-conclusion |

Wichtig zur Tabelle: Ein Schritt darf nicht gleichzeitig zwei phaseIds besitzen. Extrahiere deshalb aus regression, uq-power-fit, uq-linear-fit und uq-constant-mean jeweils einen kurzen eigenen Schritt für Phase parameters. Verwende dafür die neuen IDs inverse-parameters, uq-power-parameters, uq-linear-parameters und uq-constant-parameters. Die Berechnung bleibt im ursprünglichen Schritt; die Deutung und die zugehörige Verständnisfrage gehen in den neuen Schritt. Die neuen Schritte enthalten keine wiederholte Dateneingabe und keine zweite Regressionsberechnung.

Beim Konstantenverfahren entfällt uq-constant-reference als eigener Schritt. Seine Handlungen gehen in uq-constant-mean auf.

**Aufteilung der vorhandenen Prüfungen:**

| Ursprung | Im Berechnungsschritt verbleibend | In den Parameterschritt übertragen |
| --- | --- | --- |
| regression | a, b | interpretation → inverse-parameters |
| uq-power-fit | a, b | meaning → uq-power-parameters |
| uq-linear-fit | slope, intercept | capacity, degree → uq-linear-parameters |
| uq-constant-mean | mean, reason | pf → uq-constant-parameters |

Die gespeicherten Feld-IDs dürfen erhalten bleiben; die sichtbare Umbenennung von b zu n verlangt keine Änderung einer Feld-ID.

Für die übrigen gewöhnlichen Schritte reduziere Pflichtkontrollen nach dieser Regel: Behalte das fachlich wichtigste Ergebnisfeld und die fachlich wichtigste Verständnisfrage. Weitere bestehende Felder dürfen als freiwillige vertiefende Kontrolle erhalten bleiben; sie zählen nicht zum erforderlichen Fortschritt. Wenn ein Schritt mehrere Ergebnisse zwingend benötigt und keine Verständnisfrage verlangt, sind zwei Ergebnisfelder zulässig. Führe zusätzliche zwingende Ergebnisse bei Bedarf in einem kurzen Folgeschritt, statt die Zwei-Felder-Regel zu umgehen. Ergänze dafür ein required-Kennzeichen und passe Prüfung, Fortschritt und Migration konsistent an.

Setze bei Pflichtfeldern required: true und bei freiwilligen Feldern required: false. Ein fehlendes Kennzeichen gilt zur Kompatibilität als required: true. Leere freiwillige Felder erzeugen keine Fehlermeldung. Ausgefüllte freiwillige Felder erhalten Feedback, beeinflussen aber weder Phasenabschluss noch Bearbeitungsstatus. Lege freiwillige Kontrollen in eine geschlossene Vertiefung.

Navigationsregeln:

1. Zeige die fünf benannten Phasen als einzige primäre Lernnavigation.
2. Die aktuelle Phase ist hervorgehoben; fertig bearbeitete Phasen erhalten einen unterscheidbaren Status.
3. Innerhalb der aktuellen Phase darf eine kurze Liste der zugehörigen Schritte erscheinen. Die alte vollständige Kapitel-Seitenleiste entfällt.
4. Alle Phasen und Schritte bleiben frei anwählbar.
5. Vor/Zurück bleiben erreichbar und springen durch die gesamte Schrittfolge.
6. Eine Phase ist abgeschlossen, wenn ihre erforderlichen Kontrollen bestanden sind. Bei Q-U gehört der einmalige Methodenabschluss zu Phase deviations.
7. Bereits vor der Neustrukturierung bearbeitete, inhaltlich unveränderte Parameterfragen werden nach AP 02 übernommen. Neue Aufgaben bleiben offen.
8. Als Fortschritt genügt „Phase X von 5“ und ein Status pro Phase. Keine zweite konkurrierende Prozentanzeige mit einer anderen Gesamtzahl.
9. Verwende in der Oberfläche „Schritt“ statt „Kapitel“.

Verbindliche Reihenfolge der Lernkarte:

1. Kurzer Titel und ein konkretes Lernziel.
2. Eine konkrete Arbeitsanweisung mit höchstens vier kurzen Handlungspunkten. Ist mehr nötig, teile den Schritt.
3. Kopierbarer GeoGebra-Befehl, falls benötigt.
4. Passendes Arbeitsbild, falls es eine Bedienungshandlung erklärt.
5. Ein kurzer Satz „Daran erkennst du das Ergebnis“. Verrate dort keine noch zu prüfenden Zahlen.
6. Eine Ergebnisprüfung und/oder Verständnisprüfung; höchstens zwei erforderliche Felder pro gewöhnlichem Schritt.
7. Aufklappbare Erklärung, Rechenbeispiel und Fehlerhilfe.
8. Ein knapper Merksatz und die Weiter-Navigation.

Weitere Regeln:

- Ein Satz zum Zweck der Handlung darf sichtbar bleiben; maximal etwa 40 Wörter.
- Eine ausführliche Erklärung sollte höchstens etwa 120 Wörter enthalten. Kürze Wiederholungen; entferne keine zentrale Begründung.
- Ein formelfreier Verständnis-Schritt muss keine leere Formelbox oder leere Bildspalte besitzen.
- Hilfen sind im Standardmodus geschlossen. Die Ansicht „Mit Erklärung“ darf Erklärung und Beispiel öffnen; Fehlerhilfe bleibt gezielt aufklappbar.
- Bestehende Modusschalter heißen „Anleitung“ und „Mit Erklärung“.
- Die gemeinsame Methodenkontrolle mit fünf Feldern ist die einzige Ausnahme von der Zwei-Felder-Regel; sie wird nur einmal für die drei Q-U-Wege bearbeitet.
- Alle Ergebnisfelder haben neutrale Platzhalter wie „Ergebnis eingeben“. Keine erwarteten Zahlen im placeholder-Attribut.
- Bekannte Referenzwerte gehören in eine explizite Hilfe oder Rückmeldung.
- Bei korrekter Antwort: kurze Bestätigung mit fachlicher Bedeutung.
- Bei falscher Antwort: ein konkreter Hinweis zur Fehlerursache oder zum nächsten Prüfschritt. Keine bloße Meldung „Falsch“.

Abnahme:

- Jeder Lernweg verwendet dieselbe Karte und dieselben fünf Phasen.
- Keine Phase parameters ist leer.
- Es gibt nur eine primäre Lernnavigation.
- Die erste sichtbare Handlung erfordert kein Lesen mehrerer Grundlagenkästen.
- Aufklappen, Moduswechsel und Schrittwechsel verändern keine eingegebenen Antworten.
- Kontrollfelder geben ihre Lösung nicht als Platzhalter vor.
- Ein fertig bearbeitetes Q-U-Beispiel kann wegen einer fehlenden Methodenkontrolle nicht irreführend als vollständig abgeschlossen erscheinen.

**AP 05 — Inhalte und Fachsprache aller Lernwege vereinheitlichen**

Dateien: lesson-data.js, index.html, documentation-data.js, Methodenhilfe, README.md.

Verbindliche Notation:

| Größe | Notation in Erklärtexten |
| --- | --- |
| Potenzmodell | y=a·xⁿ; Exponent n |
| Lineares Modell | y=m·x+b; Steigung m, Achsenabschnitt b |
| Exponentialmodell | ΔÛ(t)=A·e^(k·t); Exponentialparameter k in s⁻¹ |
| Zeitmaße | τ=−1/k und t₁/₂=τ·ln(2) |
| Relative Modellabweichung | (Messwert−Modellwert)/Modellwert·100 % |
| Bewertung der Größe einer Abweichung | Betrag der relativen Modellabweichung |
| Kapazitätsstreuung | Relative Abweichung der Einzelkapazität vom Mittelwert |

Interne Rechenfunktionen dürfen weiterhin {a,b} zurückgeben. Ordne .b im Potenztext n und im Exponentialtext k zu. Eine globale Ersetzung sämtlicher b-Bezeichner ist ausdrücklich ungeeignet.

Allgemeine Arbeitsschritte:

1. Überarbeite sämtliche Titel, Ziele, Handlungen, Erklärungen, Merksätze, Hilfen, Fragen und Rückmeldungen anhand dieser Notation.
2. Unterscheide Messwert, berechneten Modellwert, Modellabweichung, angenommene Messunsicherheit und Bedienungs-/Protokollfehler.
3. Erkläre einmal verständlich, warum ein Experiment ein Modell stützen kann. Wiederhole die Warnung vor Beweisbehauptungen nicht in jedem Kasten.
4. Zeige bereits im Lernweg die Übersetzung von GeoGebra-Zahlenfunktion zu physikalischer Formel mit Größen und Einheiten. Verwende die normierten Größen aus den vorhandenen Klausurmustern.
5. Im linearen Beispiel erläutere genau: Q ist in GeoGebra der Name der Regressionsgeraden. Die physikalische Darstellung ist Q(U). Prüfe die tatsächliche Auswertbarkeit von =Q(A1); behaupte nicht, das benannte Geradenobjekt müsse in der Algebraansicht „Q(x)“ heißen.
6. Im Konstantenverfahren verwende ausdrücklich a=Mittel(C1:C5) und danach =a. Keine Abhängigkeit vom automatisch vergebenen Namen eines unbenannten Ergebnisses.
7. Ergänze eine praktisch geprüfte Anleitung, um Messpunkte und Modell im Grafikfenster sichtbar zu machen. Zeige, wie ein geeigneter Ausschnitt gewählt wird. Die genaue Bedienhandlung muss zur verwendeten GeoGebra-Version passen.
8. Erkläre: TrendPot benötigt positive Koordinaten; TrendExp benötigt positive y-Werte. Eine lineare Regression hat diese allgemeine Positivitätsvoraussetzung nicht. Relative Abweichung gegenüber einem Modellwert null ist nicht definiert.
9. Fordere sinnvolle Rundung im geschriebenen Ergebnis; weitere Rechnungen verwenden die ungerundete GeoGebra-Funktion.
10. Ermittle bei der Browserprüfung geeignete Anzeigeeinstellungen, damit die verlangten Stellen ablesbar sind. Passe die Anleitung und Prüf-Toleranzen daran an. Senke nicht einfach jede Genauigkeitsanforderung auf beliebige Werte.

Verbindliche Referenzen der bestehenden Beispiele:

| Beispiel | Erwartetes Ergebnis |
| --- | --- |
| Coulomb | a≈28,9022293453; n≈−2,0750054529; größte Modellabweichung ≈15,6637 % bei r=12,4 cm |
| Q-U / Potenz | a≈0,0393011136375; n≈1,01156617896; größte Modellabweichung ≈3,7364 % bei U=100 V |
| Q-U / Konstanten | mittlere Kapazität ≈415,9333 pF; größte relative Kapazitätsabweichung im Betrag ≈3,8307 % |
| Q-U / linear | m=0,0408 in der verwendeten Skalierung; b=0,12; Kapazität 408 pF; größte Modellabweichung im Betrag ≈7,4074 % bei U=50 V |
| Aufladung / neun Punkte | A≈3,6925788228 V; k≈−0,03043405407 s⁻¹; τ≈32,85792940 s; t₁/₂≈22,77538112 s |
| Aufladung / neun Punkte | größte Modellabweichung ≈2,61140841 % bei 80 s; Anfangswertabweichung ≈2,31272956 % |

Spezielle Änderung am Exponential-Grundweg:

1. Stelle alle Datentabellen und Handlungen des Grundwegs auf neun Messpaare von 0 bis 80 s um.
2. C1 enthält =3.780-B1, ausgefüllt bis C9.
3. D1 enthält =(A1,C1), ausgefüllt bis D9.
4. Verwende U(x)=TrendExp(D1:D9).
5. E1 enthält =U(A1), ausgefüllt bis E9.
6. F1 enthält =(C1-E1)/E1*100, ausgefüllt bis F9.
7. Sämtliche Erklärungen, Prüfwerte, Bilder, Summenanzeigen und Referenzergebnisse dieses Grundwegs beziehen sich auf diese Auswertung.
8. Relativer Spannungswert der schulischen Vergleichsregel: 0,001/0,332·100 %≈0,301204819 %. Relativer Zeitwert: 1/10·100 %=10 %. Grenze daher 10 %.
9. Verwende im Grundweg weder 0,251 V als Bezugswert noch den daraus errechneten Wert 0,40 %.
10. Die 0,001 V werden ausdrücklich als vorgegebene Annahme für die Spannungsdifferenz in dieser schulischen Betrachtung bezeichnet. Behaupte nicht, damit sei die vollständige Unsicherheit der Differenz U₀−U_C hergeleitet. Notiere diese Annahme zusätzlich im fachlichen Hinweis der README.
11. Entferne charging-data-check aus der erforderlichen Schrittfolge.
12. Biete nach dem Grundweg eine aufklappbare oder separate Vertiefung „Auffälligen Messwert untersuchen“ an. Sie zählt nicht zum Grundwegabschluss.

Inhalt der Vertiefung:

- Zeige unverändert alle zehn protokollierten Werte einschließlich t=100 s, U_C=3,529 V und ΔU=0,251 V.
- Vergleiche TrendExp(D1:D10) mit TrendExp(D1:D9).
- Für zehn Punkte gelten A≈3,4778959539 V und k≈−0,02836067623 s⁻¹. Die größte relative Modellabweichung beträgt ≈23,03981099 % bei 100 s.
- Gegenüber dem Modell der ersten neun Punkte weicht der letzte Punkt um ≈42,58640563 % ab.
- Sage ausdrücklich: Eine bessere Modellpassung nach Weglassen eines Punktes beweist keinen Messfehler. Ungleichmäßige Zeitabstände sind bei Regressionen zulässig.
- Ohne zusätzliche Protokollinformation bleibt die Ursache ungeklärt. Beide Auswertungen werden transparent verglichen.
- Kein automatischer oder verpflichtender Ausschluss. Kein Umdeuten von 100 s zu 90 s. Keine Aufforderung, Rohdaten zu löschen.
- In regression.js soll die Kennzeichnung excluded: true des zehnten Rohdatensatzes durch eine neutrale Kennzeichnung wie flagged: true ersetzt werden. Die für das Grundbeispiel gewählte Liste der ersten neun Werte bleibt ausdrücklich eine festgelegte Datenauswahl.
- Passe Texte, row-Klassen und Titel wie „fachlich gesichert“, „bereinigt“, „verbessert“ oder „dokumentiert ausgeschlossen“ an, wenn dafür keine zusätzliche Begründung existiert.

Abnahme:

- Alle fünf Wege sind fachlich und sprachlich überprüft.
- Der Grundweg und das Klausurmuster zur Aufladung verwenden dieselben Daten und Parameter.
- Die Vertiefung ermöglicht Untersuchung und Vergleich, ohne Daten passend zum Modell zu verändern.
- Zahlenfunktion und physikalische Formel sind unterscheidbar.
- Der praktische Graphenschritt funktioniert in GeoGebra.
- Die bisherigen Regressionsalgorithmen liefern weiterhin die Referenzwerte.


**AP 06 — Schulische Fehlerregel einmal erklären und im Lernweg prüfen**

Dateien: shared-error-module.js, app.js, groesster-einzelfehler.html, groesster-einzelfehler.js, lesson-data.js, documentation-data.js.

Arbeitsschritte:

1. Erstelle eine gemeinsame Darstellung und Prüfungslogik für die bestehende Q-U-Methodenkontrolle. Nutze sie im Lernbereich und auf der ausführlichen Methodenseite.
2. Zeige das Modul innerhalb von Phase deviations der drei Q-U-Wege. Ein Seitenwechsel darf für den Methodenabschluss nicht erforderlich sein.
3. Bereits abgeschlossener Methodenstatus gilt weiterhin für alle drei Wege.
4. Das Modul hat eine kurze sichtbare Zusammenfassung, eine aufklappbare Herleitung und die fünf vorhandenen Prüfungen. Behalte deren Feld-IDs uError, qError, maxError, minimumReason und methodMeaning, soweit die Bedeutung erhalten bleibt.
5. Die numerischen Platzhalter sind neutral. Die verständlich erklärte Herleitung bleibt als Hilfe erreichbar.
6. Behalte die ausführliche Seite als Nachschlagehilfe. Führe den gewählten Lernweg und Schritt im Rücklink mit.
7. Vermeide drei nahezu identische ausführliche Methoden-Erklärungen in den Lernwegen. Dort genügt die jeweils konkrete Anwendung auf Exponent, Kapazitätsstreuung oder Achsenabschnitt.
8. Die Kontrolle soll auch auf der Nachschlageseite funktionieren und denselben gespeicherten Status aktualisieren.
9. Bei nachträglich geänderter falscher Antwort ist der gemeinsame Prüfstatus wieder offen; die Phasen- und Abschlussanzeige muss sofort dazu passen.

Verbindlicher fachlicher Kerntext:

„Wir verwenden hier die im Unterricht vereinbarte Methode des größten Einzelfehlers als vereinfachte Vergleichsregel. Der größte relative Einzelfehler beträgt in dieser Messreihe 10 %. Die untersuchte Abweichung wird mit dieser Grenze verglichen. Damit berechnen wir keine statistische Unsicherheit eines Regressionsparameters.“

Für die Q-U-Daten bleiben ΔU=5 V und ΔQ=0,1·10⁻⁸ C als vorgegebene Annahmen erhalten. Daraus ergeben sich 10 %, 5 % und fmax=10 %.

Verbindliche Anwendungen:

- Potenzverfahren: numerische Exponentabweichung ≈1,16 % und größte Modellabweichung ≈3,74 % beschreiben. Keine Aussage, die 10-%-Grenze sei die statistische Unsicherheit des Exponenten.
- Konstantenverfahren: größte Kapazitätsabweichung im Betrag ≈3,83 % mit der schulischen Grenze vergleichen.
- Lineares Verfahren: größte Modellabweichung ≈7,41 % sowie |b|/Qmin·100 %=6 % beschreiben. Der Anteil des Achsenabschnitts ist keine statistische Prüfung von b=0.
- Coulomb: den vorhandenen groben Vergleich mit ≈16,7 % als vereinfachte Betrachtung kennzeichnen.
- Exponential-Grundweg: die beiden Abweichungen ≈2,31 % und ≈2,61 % mit der vereinbarten 10-%-Grenze vergleichen.

Formulierungen:

- Verwende „liegt unter der hier verwendeten schulischen Vergleichsgrenze“.
- Verwende „im Rahmen dieser vereinfachten Betrachtung mit dem Modell vereinbar“.
- Behaupte keine vollständig hergeleitete Fehlerfortpflanzung und keine statistische Bestätigung von n=1, b=0 oder eines bestimmten Sollwerts für τ.
- Eine Abweichung genau auf der Grenze ist nach der vorhandenen strengen Regel nicht kleiner als die Grenze. Erhalte das bestehende Verhalten von deviationsWithinLimit.
- Wenn eine Abweichung die Grenze erreicht oder überschreitet, folgt daraus keine automatische Widerlegung eines physikalischen Modells.

Abnahme:

- Die Methode kann vollständig im Lernweg bearbeitet werden.
- Ein Abschluss gilt für alle drei Q-U-Wege.
- Nachschlageseite und Lernweg verwenden dieselbe Logik und denselben gespeicherten Status.
- Die Ausgabe unterscheidet schulische Vergleichsregel und statistische Parameterunsicherheit.
- Fortschritt und Abschlussstatus berücksichtigen die gemeinsame Kontrolle korrekt.

**AP 07 — Abbildungen und Gestaltung auf einen gemeinsamen Standard bringen**

Dateien: assets/steps/, lesson-data.js, style.css; neu BILDVERZEICHNIS.md.

Arbeitsschritte für Bilder:

1. Erstelle BILDVERZEICHNIS.md mit einer Zeile pro verwendetem Bild: Datei, Lernweg/Schritt, gezeigter Befehl, Datenauswahl, Bildtyp, Herkunft und geprüfte GeoGebra-Version, soweit bekannt.
2. Kennzeichne alte Dateien mit unbekannter Version entsprechend. Erfinde keine Versionsangaben.
3. Ersetze die schematischen U-Q-Nachbildungen für Bedienungsschritte möglichst durch echte GeoGebra-Aufnahmen.
4. Verwende für neue Aufnahmen dieselbe GeoGebra Rechner Suite, denselben Rechnermodus, dieselbe Sprache und dieselben Anzeigeeinstellungen.
5. Fotografiere oder erfasse den tatsächlich passenden Programmzustand. Keine mit Bildgenerierung erfundenen Softwareoberflächen.
6. Schneide auf die relevante Zelle, Eingabe, Ausgabe oder den Graphen zu. Große leere Flächen werden entfernt.
7. Nutze die vorhandene Markierungslogik mit einem einheitlichen Akzent. Überlagere keine Eingabe oder Zahl mit einer Markierung.
8. Ein Bedienungsschritt hat höchstens ein primäres Arbeitsbild. Weitere Bilder gehören in die aufklappbare Hilfe.
9. Theorie-Schritte dürfen ohne Bild auskommen. Mathematische Schemata müssen als Schema bezeichnet werden und dürfen keine echte Softwareaufnahme vortäuschen.
10. Historische Aufnahmen mit umgekehrter Abweichungsformel werden nicht mehr im Arbeitsablauf eingebunden.
11. Im Exponential-Grundweg müssen alle Aufnahmen D1:D9 beziehungsweise die dazu passenden neun Werte und Parameter zeigen.
12. Ein Graph mit dem zusätzlichen Punkt bei 100 s gehört nur zur Vertiefung.
13. Passe width, height, alt, caption und highlights an die tatsächlichen Dateien an. Berechne prozentuale Markierungskoordinaten nach einem neuen Zuschnitt erneut.
14. Bezeichne generate-uq-screenshots.ps1 in README.md als bisherigen Generator schematischer Bilder. Verwende ihn nicht zum Erzeugen angeblicher Originalaufnahmen.
15. Prüfe jedes Bild im kleinen eingebundenen Zustand und in der Vergrößerung. Die wichtige Information muss ohne unnötiges Zoomen lesbar sein.

Wenn neue echte Aufnahmen technisch nicht erzeugt werden können: Verwende ein klar beschriftetes mathematisches Schema oder den kopierbaren Befehl als vorläufige Hilfe, keine unechte GeoGebra-Oberfläche. Markiere das jeweilige Bild im Verzeichnis als noch zu ersetzen. AP 07 ist in diesem Fall nur teilweise abgenommen; andere Pakete können weiter umgesetzt werden.

Gestaltungsregeln:

- Verwende die vorhandenen Designvariablen als Grundlage: gemeinsame Schrift, Abstände, Radien und Violett als Hauptakzent.
- Grün bezeichnet erfolgreiche Prüfung, Rot einen Fehler; verwende diese Zustandsfarben nicht gleichzeitig als beliebige Dekoration.
- Bilder, Bedienungselemente und Hilfen sehen in allen Lernwegen gleich aus.
- Reduziere geschachtelte farbige Kästen. Eine einfache Erklärung braucht keine eigene dekorative Karte innerhalb einer anderen Karte.
- Lange mathematische Ausdrücke und Zellbefehle dürfen weder abgeschnitten werden noch den gesamten Bildschirm verbreitern.
- Das Lernkartenlayout muss auch knapp oberhalb der bisherigen 960-px-Grenze passen. Verwende geeignete Umbruchpunkte oder containerbezogene Größen statt kollidierender Mindestbreiten.
- Auf kleinen Bildschirmen steht das passende Bild unmittelbar bei seiner Handlung.
- Schaltflächen haben eine ausreichend große Bedienfläche von mindestens 44×44 CSS-Pixeln.
- Der sichtbare Fokus bleibt klar erkennbar.
- Status wird durch Text oder Symbol zusätzlich zur Farbe kenntlich gemacht.

Abnahme:

- BILDVERZEICHNIS.md ist vollständig und beschreibt den tatsächlichen Bildbestand.
- Bild, Befehl und erwarteter Zustand stimmen je Schritt überein.
- Keine Aufnahme der falschen Datenauswahl im Exponential-Grundweg.
- Keine historische Gegenformel im Arbeitsablauf.
- Keine abgeschnittenen Zellbefehle, unerreichbaren Buttons oder horizontal überlaufende Gesamtseite.
- Neue Screenshots stammen aus echten, dokumentierten GeoGebra-Zuständen.

**AP 08 — Genau drei Aufgaben zur selbstständigen Anwendung ergänzen**

Dateien: selbst-auswerten.html, selbst-auswerten.js, practice-data.js, state.js, navigation.js, style.css, tests.

Zweck: Den bekannten Arbeitsablauf auf neue Daten übertragen, ohne einen zweiten umfangreichen Kurs zu bauen.

Aufbau der Seite:

1. Schmaler gemeinsamer Seitenkopf und Hauptnavigation.
2. Auswahl aus den drei Aufgaben „Lineare Regression“, „Potenzregression“ und „Exponentialregression“.
3. Aufgabenstellung, Tabelle mit Größen und Einheiten und ein kurzer Arbeitsauftrag.
4. Eine einzige kompakte Befehlsübersicht unter „Befehle nachschlagen“.
5. Aufklappbare Hinweise in der Reihenfolge „Vorgehen“, „Benötigte Befehle“, „Referenzergebnisse“.
6. Ergebnisseingabe mit neutralen Platzhaltern und konkreten Rückmeldungen.
7. Kurze Selbstkontrolle der physikalischen Formel und Schlussfolgerung.
8. Kein Kapitelkurs, keine zusätzliche verpflichtende Zertifikatsstrecke und keine automatisch ausgefüllte Lösung.

Die Tabellenwerte sind didaktische Übungsdaten. Bezeichne sie entsprechend; behaupte nicht, sie seien neu erhobene echte Messwerte.

**Aufgabe linear-7**

Kontext: Ladung und Spannung eines Kondensators. Ladungsskalierung wie im bisherigen Beispiel.

| U in V | Q/(10⁻⁸ C) |
| ---: | ---: |
| 40 | 1,6 |
| 80 | 3,3 |
| 120 | 4,8 |
| 160 | 6,5 |
| 200 | 8,0 |
| 240 | 9,7 |
| 280 | 11,2 |

Arbeitsauftrag: Erstelle die Punktliste, berechne eine freie lineare Regression, deute die Steigung als Kapazität, bestimme die größte relative Modellabweichung und dokumentiere ein begründetes Urteil.

Vorgegebene Annahmen für die schulische Regel: ΔU=2 V und ΔQ=0,1·10⁻⁸ C. Die daraus bestimmte Grenze beträgt max(2/40, 0,1/1,6)·100 %=6,25 %.

Erforderliche numerische Kontrollen:

| Feld | Erwartungswert | Zulässige absolute Toleranz |
| --- | ---: | ---: |
| Numerische Steigung m | 0,040000 | 0,0005 |
| Numerischer Achsenabschnitt b | 0,0428571428571 | 0,005 |
| Größter Betrag der Modellabweichung in % | 2,60869565217 | 0,08 |
| Zugehöriges U in V | 40 | 0,01 |
| Schulische Vergleichsgrenze in % | 6,25 | 0,03 |

Referenzhilfe zusätzlich: Kapazität 400 pF; Achsenabschnitt in physikalischen Einheiten ≈4,2857143·10⁻¹⁰ C. Der Messwert mit größter Abweichung liegt unter dem Modellwert. Der relative Anteil des Achsenabschnitts am kleinsten Q beträgt ≈2,6785714 %.

**Aufgabe power-7**

Kontext: Prüfung eines umgekehrten Quadratgesetzes.

| r in cm | F in mN |
| ---: | ---: |
| 6 | 0,85 |
| 8 | 0,47 |
| 10 | 0,30 |
| 12 | 0,22 |
| 15 | 0,14 |
| 18 | 0,09 |
| 22 | 0,06 |

Arbeitsauftrag: Berechne eine Potenzregression, vergleiche n mit −2, berechne Modellabweichungen und dokumentiere das Ergebnis mit Einheiten.

Vorgegebene Annahmen für die schulische Regel: Δr=0,1 cm und ΔF=0,01 mN. Die größte relative Eingangsunsicherheit beträgt max(0,1/6, 0,01/0,06)·100 %=16,6666667 %. Dies ist keine abgeleitete statistische Unsicherheit von n.

Erforderliche Kontrollen:

| Feld | Erwartungswert | Zulässige absolute Toleranz |
| --- | ---: | ---: |
| Numerischer Faktor a | 32,4201759604 | 0,03 |
| Potenzexponent n | −2,02756854821 | 0,005 |
| Größter Betrag der Modellabweichung in % | 4,69316149613 | 0,08 |
| Zugehöriges r in cm | 15 | 0,01 |
| Schulische Vergleichsgrenze in % | 16,6666666667 | 0,08 |

Referenzhilfe: Der Messwert mit größter Abweichung liegt über dem Modellwert. Die physikalische Formel verwendet r/(1 cm) und den Faktor in mN.

**Aufgabe exponential-7**

Kontext: Kondensator-Aufladung mit U₀=5,00 V. Berechne zunächst ΔU=U₀−U_C.

| t in s | U_C in V |
| ---: | ---: |
| 0 | 0,00 |
| 8 | 1,65 |
| 16 | 2,73 |
| 24 | 3,48 |
| 32 | 3,98 |
| 40 | 4,31 |
| 48 | 4,55 |

Arbeitsauftrag: Berechne die Spannungsdifferenzen und eine Exponentialregression, bestimme die Zeitkonstante, untersuche die größte Modellabweichung und dokumentiere die physikalische Formel.

Vorgegebene Annahmen für die schulische Regel: absolute Unsicherheit der Spannungsdifferenz 0,01 V; Zeitunsicherheit 0,2 s. Der kleinste positive Zeitpunkt ist 8 s, die kleinste Spannungsdifferenz 0,45 V. Grenze: max(0,2/8, 0,01/0,45)·100 %=2,5 %. Verwende keine Division durch t=0.

Erforderliche Kontrollen:

| Feld | Erwartungswert | Zulässige absolute Toleranz |
| --- | ---: | ---: |
| Anfangswert A in V | 5,02072200095 | 0,005 |
| Exponentialparameter k in s⁻¹ | −0,0499279557349 | 0,00002 |
| Zeitkonstante τ in s | 20,0288592890 | 0,08 |
| Größter Betrag der Modellabweichung in % | 1,54194530806 | 0,08 |
| Zugehöriges t in s | 48 | 0,01 |
| Schulische Vergleichsgrenze in % | 2,5 | 0,03 |

Referenzhilfe zusätzlich: Halbwertszeit ≈13,8829473460 s; Anfangswertabweichung gegenüber 5,00 V ≈0,414440019 %. Der Messwert mit größter Abweichung liegt unter dem Modellwert.

Technische Regeln:

1. Speichere Daten und ungerundete Referenzen zentral in practice-data.js.
2. Nutze die vorhandenen Rechenfunktionen, um Referenzen zu prüfen. Die erwarteten Zahlen in diesem Auftrag dürfen nicht ungeprüft abgetippt werden.
3. Formatiere Anzeigen mit Dezimalkomma; rechne intern mit ungerundeten Zahlen.
4. Verwende für jede Aufgabe sieben Zeilen. Die Hinweise und Befehle verwenden entsprechend C1:C7 beziehungsweise D1:D7 und den passenden Modellwert-/Abweichungsbereich.
5. Zeige die für diese Aufgaben angepassten Befehle erst beim Nachschlagen. Im anfänglichen Arbeitsauftrag stehen keine fertigen GeoGebra-Befehle und keine Referenzparameter.
6. Das Konstantenverfahren erhält keine vierte neue Pflichtaufgabe.
7. Die numerischen Prüfungen bewerten die eingetragenen Ergebnisse, nicht das gesamte selbstständige Arbeiten.
8. Die Selbstkontrolle besteht aus drei Aussagen: „Ich habe die passenden Zellbereiche verwendet“, „Ich habe die physikalische Formel mit Einheiten aufgeschrieben“, „Ich habe meine Schlussfolgerung mit Abweichungen und der verwendeten Vergleichsregel begründet“.
9. Zeige keine automatische Bestätigung der frei geschriebenen Schlussfolgerung. Die Seite darf lediglich den numerischen Prüfstatus und die selbst gesetzten Kontrollen anzeigen.

Abnahme:

- Es gibt genau drei neue Aufgaben mit den angegebenen Daten.
- Lösungen und Befehle sind anfangs verborgen.
- Jede Aufgabe erfordert die Anpassung auf sieben Messpaare.
- Alle Referenzwerte wurden rechnerisch und die Befehle in GeoGebra überprüft.
- Hinweise funktionieren gestuft, ohne Antworten zu überschreiben.
- Übungsfortschritt bleibt getrennt von den geführten Lernwegen.
- Anzeige und Abschlussbericht behaupten keine automatische Bewertung einer handschriftlichen Lösung.

**AP 09 — Klausurdokumentation an den Arbeitsablauf anbinden**

Dateien: dokumentation.html, dokumentation.js, documentation-data.js, lesson-data.js, app.js, style.css.

Arbeitsschritte:

1. Erhalte die fünf vorhandenen Dokumentations-IDs data, geogebra, physical, deviations und conclusion. Dadurch bleiben vorhandene Papier-Selbstkontrollen zuordenbar.
2. Verwende folgende sichtbare Abschnittstitel in allen fünf Mustern:
   - 1. Daten und Einheiten
   - 2. GeoGebra-Auswertung
   - 3. Physikalische Formel und Parameter
   - 4. Abweichungen und Vergleichsregel
   - 5. Begründete Schlussfolgerung
3. Verknüpfe die Lernphasen data→data, model→geogebra, parameters→physical, deviations→deviations und conclusion→conclusion.
4. Zeige am Ende einer Lernphase einen kurzen Satz „Für deine Dokumentation“ und einen Link zum passenden Abschnitt des gewählten Musters.
5. Unterstütze auf der Dokumentationsseite course=<ID> und section=<Dokumentations-ID>. Öffne das richtige Beispiel und scrolle zum richtigen Abschnitt.
6. Beim Rücksprung bleiben Lernweg und zuletzt bearbeiteter Schritt erhalten.
7. Erhalte „Muster ansehen“, „Selbst üben“, „Muster drucken“ und „Übungsblatt drucken“.
8. Die Übungsansicht nutzt dieselben fünf Abschnitte und erlaubt zunächst das Schreiben auf Papier, dann Checkliste, Starthilfe und Vergleich.
9. Alle formelhaltigen Texte müssen nach AP 01 korrekt gespeichert sein.
10. Zeige in jedem Muster mindestens eine vollständig eingesetzte Abweichungsrechnung mit Ergebnis, Richtung und Bezugsgröße. Ein bloß genannter Prozentwert reicht nicht.
11. Bei den drei Q-U-Mustern ergänze dafür jeweils die Rechnung mit tatsächlichem Messwert und tatsächlich berechnetem Bezugswert. Ermittle ungerundete Werte über regression.js und runde nur die Darstellung.
12. Alle Muster verwenden dieselbe Vorzeichenkonvention wie die Lernwege.
13. Der Exponentialtext dokumentiert die neun festgelegten Messpaare von 0 bis 80 s. Bezeichne diese Auswahl nicht als nachgewiesene Bereinigung fehlerhafter Werte.
14. Die physikalischen Formeln übernehmen die normierten Größen und Einheiten. Die numerische GeoGebra-Ausgabe wird davon unterschieden.
15. Zusätzliche Größen wie die Halbwertszeit stehen unter „Nur wenn gefragt“; sie sind keine allgemeine Pflichtangabe.
16. Übertrage die fachlich begrenzten Formulierungen aus AP 06 in sämtliche Muster und kopierbare Formulierungsbausteine.
17. Benenne den bisherigen Lernnachweis als „Bearbeitungsübersicht“. Zeige bearbeitete Schritte, geprüfte Ergebnisse und getrennt gekennzeichnete Referenzergebnisse. Eine Antwort zum bekannten Beispiel ist kein alleiniger Nachweis selbstständiger Kompetenz.
18. Behalte die PDF-/Druckfunktion für diese Übersicht.

Druckregeln:

- A4, ausreichend breite Ränder, keine abgeschnittenen Formeln.
- Fließtext mindestens 10 pt; erläuternde Nebenangaben mindestens 9 pt.
- Verwende bei Bedarf mehr Seiten statt auf 7,6 pt zu verkleinern.
- Ein Rechenbeispiel und seine Erklärung dürfen nicht unlesbar getrennt werden.
- Keine Navigationsleiste, Kontrollbuttons oder aufklappbare Screen-Bedienelemente im Ausdruck.
- Arbeitsblätter enthalten ausreichend Schreibfläche.
- Drucke nur das gewählte Muster oder das gewählte Arbeitsblatt.
- Ein leeres oder unvollständig bearbeitetes Beispiel bleibt trotzdem als Muster druckbar; ein Musterdruck darf keinen Abschluss vortäuschen.

Abnahme:

- Alle fünf Muster, alle fünf Papierübungen und beide Druckarten funktionieren.
- Ein Link aus einer Lernphase öffnet das richtige Beispiel und den richtigen Abschnitt.
- Jede Musterdokumentation enthält eine eingesetzte Rechnung.
- Größen, Einheiten, Notation und Datenauswahl stimmen mit dem zugehörigen Lernweg überein.
- Die Bearbeitungsübersicht unterscheidet Bearbeitung, Referenz und selbstständige Anwendung.
- Alle zehn Muster-/Arbeitsblatt-Ausgaben wurden auf Lesbarkeit und Umbrüche geprüft.

**AP 10 — Gesamtprüfung, Tests und Übergabe**

Dateien: tests/, README.md, UMSETZUNGSSTATUS.md; neu ABNAHMEPROTOKOLL.md.

Automatisierte Prüfungen:

1. Führe node --test aus.
2. Aktualisiere bestehende Erwartungen, die sich durch ausdrücklich beauftragte Änderungen überholt haben: Schrittanzahl, Reihenfolge, neue Dateien, frühere Exponentialwerte in Lernkontrollen und starre Versionsstrings.
3. Entferne keine mathematischen oder Zustandsprüfungen, nur damit die Tests grün werden.
4. Erhalte die Tests für Regressionsalgorithmen, Vorzeichen und Rundung sowie die Grenzfälle der strengen Vergleichsregel.
5. Ergänze gezielte Prüfungen für intakte Formelzeichen, Unicode-Minus, Datenmigration und unabhängigen Übungszustand.
6. Prüfe die fünf phaseIds und eine nichtleere Zuordnung in jedem Lernweg.
7. Prüfe den Exponential-Grundweg auf neun Datenpaare, neun Punkte und zu dieser Regression passende Kontrollwerte.
8. Prüfe die drei neuen Übungsdatensätze gegen die Rechenfunktionen.
9. Prüfe alle lokalen Ressourcen, Modulimporte und HTML-Elemente, auf die JavaScript zugreift; schließe neue Seitenskripte und Bilder ein.
10. Erhalte einheitliche Versionsparameter für geänderte Skripte und die zugehörigen Import-/HTML-Verweise. Passe veraltete fest verdrahtete Versionsprüfungen sachgerecht an.
11. Prüfe mit einem realen HTTP-Server, ob alle Seiten und lokalen MathJax-Ressourcen geladen werden.

Manuelle Browserprüfung:

| Szenario | Pflichtprüfung |
| --- | --- |
| Neuer isolierter Testkontext | Einstieg, Auswahl, erster Schritt, neutrale Felder und geschlossene Hilfen |
| Jeder der fünf Lernwege | Gesamte Schrittfolge, Phasenwechsel, Antworten, Feedback, Bilder, Abschluss und Bearbeitungsübersicht |
| Gemeinsame Fehlerregel | Einmal im Lernweg abschließen, dann in beiden anderen Q-U-Wegen wiederverwenden |
| Klausurhilfe | Jeder Beispielwechsel, jede Hilfe, Selbstkontrollen, Hin- und Rücksprung |
| Selbstständige Anwendung | Jede der drei Aufgaben; falsche, richtige, leere und gerundete Antworten |
| Vertiefung Aufladung | Beide Regressionsvarianten, nachvollziehbarer Vergleich, unveränderte Rohdaten |
| Speicher | Neuladen, Bereichswechsel, alle Migrationsteststände und beschädigtes JSON |
| Tastatur | Sichtbarer Fokus, Navigation, Formulare, Aufklapphilfen, Dialoge |
| Formeln | MathJax nach schnellem Schritt-/Lernwegwechsel; lange Formeln; keine beschädigten Befehle |
| Kleine Breite | 375 px und 512 px, keine überlaufende Gesamtseite |
| Mittlere Breite | 768 px und 980 px, insbesondere die bisherigen Mindestbreiten |
| Große Breite | 1024 px und 1280 px, sinnvolle Anordnung ohne große leere Bereiche |
| Vergrößerung | 200 % Browserzoom; Schaltflächen, Beschriftungen und Eingaben erreichbar |
| Druck | Fünf Muster, fünf Arbeitsblätter, Bearbeitungsübersicht |
| GeoGebra | Befehle, Zellbereiche, Anzeigeeinstellungen und sichtbarer Graph praktisch nachvollzogen |

Teste zusätzlich auf einem echten iPad, sofern eines verfügbar ist: halber Bildschirm, Hoch-/Querformat, geöffnete Bildschirmtastatur, Ausfüllgriff, Kopieren und PDF-Sicherung. Eine Simulation von 512 px Breite ist als Simulation zu dokumentieren und darf nicht als echter iPad-Test bezeichnet werden.

Dokumentation und Übergabe:

1. Aktualisiere README.md für die drei Bereiche, neue Dateien, Übungsdaten, lokale Prüfung und die schulische Vergleichsregel.
2. Entferne veraltete Aussagen über eine erforderliche Zehn-Punkte-Regression, automatischen Ausschluss und alte Kapitelzahlen.
3. Ergänze ABNAHMEPROTOKOLL.md mit Testdatum, Umgebung, tatsächlich ausgeführten Tests, Screenshots der Hauptansichten und Ergebnis jeder Prüfung.
4. Halte fehlende echte Bilder, fehlende Geräteprüfungen oder andere Restpunkte konkret fest: Datei/Schritt, Ursache und notwendiger nächster Schritt.
5. Markiere ein Paket nur als „abgenommen“, wenn seine Kriterien tatsächlich geprüft wurden. Nicht verfügbare Prüfungen bleiben als solche erkennbar.
6. Liefere abschließend eine kurze Liste der geänderten Dateien, umgesetzten Pakete, Testergebnisse und verbleibenden Prüflücken.
7. Ein bloßes „alles erledigt“ ohne Belege ist keine ausreichende Übergabe.

**Gesamtabnahme**

- [ ] Drei Hauptbereiche mit gemeinsamer Navigation.
- [ ] Alle fünf bestehenden Lernwege vorhanden und frei anwählbar.
- [ ] Einheitlicher Ablauf mit fünf nichtleeren Phasen pro Lernweg.
- [ ] Aufgaben, Befehle und passende Bilder stehen vor ausführlichen Hilfen.
- [ ] Keine erwarteten Ergebniswerte als Platzhalter.
- [ ] Exponential-Grundweg überall mit denselben neun Messpaaren.
- [ ] Untersuchung des zehnten Werts als separate Vertiefung mit unveränderten Rohdaten.
- [ ] Einheitliche Notation, Einheiten und Vorzeichen.
- [ ] Schulische Fehlerregel mit begrenzter Aussagekraft und wiederverwendbarer Kontrolle im Lernweg.
- [ ] Drei neue selbstständige Aufgaben mit geprüften Referenzen.
- [ ] Klausurmuster, Papierübungen und Ausdrucke vollständig nutzbar.
- [ ] Vorhandene Lernstände gezielt migriert; keine pauschale Löschung.
- [ ] Numerische, Zustands- und Ressourcenprüfungen bestanden.
- [ ] Browserprüfung durchgeführt und belegt.
- [ ] Prüflücken ehrlich benannt.
- [ ] README, Bildverzeichnis und Abnahmeprotokoll aktualisiert.

**Fachliche Referenzen**

Verwende für technische und fachliche Nachprüfung vorrangig diese Quellen. Das bestehende Unterrichtsverfahren darf nicht durch ein neues umfangreiches Statistikmodul ersetzt werden.

- [GeoGebra: TrendPot](https://geogebra.github.io/docs/manual/de/commands/TrendPot/)
- [GeoGebra: Trendlinie](https://geogebra.github.io/docs/manual/de/commands/Trendlinie/)
- [GeoGebra: TrendExp](https://geogebra.github.io/docs/manual/de/commands/TrendExp/)
- [NIST: Umgang mit auffälligen Daten](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h.htm)
- [NIST: Unsicherheitsfortpflanzung](https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-law-propagation-uncertainty)
- [VIM: Messabweichung](https://jcgm.bipm.org/vim/en/2.16.html)
- [VIM: Messunsicherheit](https://jcgm.bipm.org/vim/en/2.26.html)
