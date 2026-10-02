# Überarbeitungsauftrag für GPT 5.6 Terra

Stand: 1. Oktober 2026. Arbeite im vorhandenen GeoGebra-Trainer. Setze die folgenden Pakete tatsächlich um und prüfe das Ergebnis. Ein Plan oder ein Bericht allein erfüllt den Auftrag nicht.

## Ziel und Ausgangslage

Die Lernenden sollen eine Regression in der GeoGebra Rechner Suite selbst durchführen und ihren Rechenweg verständlich für die Klausur dokumentieren können. Die Oberfläche soll die aktuelle Handlung in den Vordergrund stellen und zusätzliche Erklärungen bei Bedarf anbieten.

Die vorige Überarbeitung hat drei Hauptbereiche, fünf gemeinsame Lernphasen und drei neue Übungsdatensätze geschaffen. Diese Grundlage bleibt erhalten. Bei der unabhängigen Nachprüfung bestehen zwar 68 Tests, zugleich wurden konkrete Bedienungs-, Speicher- und Inhaltsfehler gefunden. Lies zuerst [NACHPRUEFUNG_2026-10-01.md](NACHPRUEFUNG_2026-10-01.md). Der ältere [ANTIGRAVITY_ARBEITSAUFTRAG.md](ANTIGRAVITY_ARBEITSAUFTRAG.md) bleibt für unveränderte Anforderungen und Zahlenreferenzen maßgeblich. Bei einer ausdrücklichen Änderung in diesem Folgeauftrag gilt der Folgeauftrag.

## Verbindliche Grenzen

- Behalte die statische HTML/CSS/ES-Modul-Anwendung und den lokalen Formelsatz. Kein Frameworkwechsel, Backend, Login oder neues Kurssystem.
- Behalte die drei Hauptbereiche mit ihren aktuellen Navigationsbezeichnungen und die vier vorhandenen Seiten.
- Behalte fünf Lernwege: inverse-square, proportional-power, proportional-constants, proportional-linear, capacitor-exponential.
- Behalte die fünf Phasen-IDs data, model, parameters, deviations, conclusion und die fünf Dokumentations-IDs data, geogebra, physical, deviations, conclusion.
- Behalte den Speicherschlüssel geogebra-begleitkurs-state, bestehende Schritt-/Feld-IDs, Rohdaten und gültige persönliche Antworten. Wenn eine technische Änderung an gespeicherten Daten erforderlich ist, implementiere eine gezielte kompatible Reparatur, keinen Gesamtreset.
- Die drei neuen Übungsdatensätze linear-7, power-7 und exponential-7 sowie ihre ungerundeten Referenzwerte und Toleranzen bleiben erhalten.
- Die vorhandene vereinfachte schulische Vergleichsregel bleibt erhalten und wird als solche benannt. Führe keinen zusätzlichen Pflichtkurs zu Statistik oder Fehlerfortpflanzung ein.
- Die Anzahl der vorbereitenden Schritte muss zwischen den Lernwegen nicht gleich sein. Vereinheitliche Struktur, Begriffe und Qualität; erzeuge keine künstlichen Schritte nur zum Ausgleichen der Anzahl.
- Ordentliche Pflichtschritte haben höchstens zwei Pflichtfelder. Das gemeinsame Methodenmodul darf fünf Felder besitzen; die selbstständigen Übungsaufgaben behalten ihre vier bis sechs Zahlenfelder.
- Schülertexte müssen eine konkrete Lernhandlung, ein Verständnis oder eine notwendige Entscheidung unterstützen. Hinweise auf Entwicklungsanforderungen werden gemäß T09 entfernt.
- Nach Abschluss der Überarbeitung wird das Projekt gemäß T11 bereinigt. Eigene Originalbilder, gültige Lernstände und erforderliche Nachweise bleiben erhalten.
- Veröffentlichung/Deployment gehört nicht zu diesem Auftrag. Erstelle und prüfe die lokale Überarbeitung vollständig.

## Reihenfolge und Priorität

| Paket | Priorität | Abhängigkeit | Ergebnis |
| --- | --- | --- | --- |
| T00 Ausgangsstand sichern | P1 | keine | Bestandsnachweis und reproduzierbare Fehlerfälle |
| T01 Bedienung und Fortschritt | P1 | T00 | Funktionierende Navigation und korrekte Kontrollen |
| T02 Speicherung und Reparatur | P1 | T00 | Gültige, erhaltene und ehrliche Lernstände |
| T03 Aufladung bereinigen | P1 | T01/T02 berücksichtigen | Neun-Punkte-Grundweg, getrennte Vertiefung |
| T04 Selbstständige Anwendung | P1 | T01/T02 berücksichtigen | Eigene Arbeit mit abgestuften Hilfen |
| T05 Lerntexte und Fachsprache | P2 | T03/T04 | Kurze, einheitliche und fachlich präzise Karten |
| T06 Darstellung und Bilder | P2 | T01/T03/T05 | Zusammenhängende Arbeitsfläche und passende Bilder |
| T07 Klausurhilfe und Druck | P1/P2 | T03/T04/T05 | Richtige Zielabschnitte, Rücksprünge und lesbare PDFs |
| T09 Meta-Hinweise bereinigen | P1 | T02/T05/T07 berücksichtigen | Fachlich nützliche Schülertexte ohne Auftragskommentare |
| T10 Herkunft und Quellen | P2 | T06/T09 | Knappe Markenangabe und belegte Materialherkunft |
| T11 Abschließend aufräumen | P2 | T01–T07/T09/T10 | Bereinigter Projektbaum mit erhaltenen Originalen und Nachweisen |
| T08 Verifikation und Übergabe | P1 | alle übrigen | Belastbare Prüfung mit belegten Restpunkten |

Bearbeite T01–T04 zuerst. Berücksichtige T09 bei jeder Textänderung. Schließe T05–T07 sowie T09/T10 ab, räume anschließend gemäß T11 auf und führe dann die Schlussprüfung T08 am bereinigten Endstand durch. Routinemäßige reversible Anpassungen innerhalb dieses Auftrags benötigen keine zusätzliche Bestätigung.

## T00 — Ausgangsstand und Fehlerfälle sichern

1. Lies README.md, NACHPRUEFUNG_2026-10-01.md und die betroffenen Quelltexte. Behandle UMSETZUNGSSTATUS.md und ABNAHMEPROTOKOLL.md als Behauptungen, die überprüft werden müssen.
2. Führe node --test aus und dokumentiere Ergebnis und Datum. Ausgangsstand der Nachprüfung: 68 bestanden, 0 fehlgeschlagen.
3. Prüfe, ob die bereitgestellte .git-Struktur tatsächlich nutzbar ist. Wenn nicht, beschreibe das knapp und sichere vor Änderungen die zu bearbeitenden Quellen außerhalb der aktiven Auslieferungsdateien. Behaupte keine Commit- oder Branch-Sicherung, die nicht erzeugt wurde.
4. Erfasse für die Fehlerfälle in T01–T04 das Verhalten vor der Reparatur. Nutze ausführbare Tests oder eine tatsächliche UI-Prüfung, nicht ausschließlich Textsuche.
5. Verwende isolierte Test-Lernstände. Lösche keine echten gespeicherten Nutzerstände für einen Test.

Abnahme: Ausgangstest, Sicherungsmethode und tatsächlich reproduzierte Fehler sind dokumentiert; anschließend weiterarbeiten.

## T01 — Navigation, gemeinsame Fehlerkontrolle und Fortschritt reparieren

### T01.1 Schrittnavigation

Befund: In app.js/renderStepNav wird item.append(button) ausgeführt, item aber nicht an stepNav angehängt. Das erzeugt fünf Gruppenüberschriften ohne Schrittschaltflächen.

1. Erzeuge unter der primären Fünf-Phasen-Navigation ausschließlich die Schrittschaltflächen der aktuellen Phase.
2. Hänge jede tatsächlich sichtbare Schaltfläche in den DOM ein.
3. Zeige kurze Schritttitel, aktuellen Schritt und Abschlussstatus. Nummerierung innerhalb der Phase ist zulässig; globale stabile Schritt-IDs bleiben erhalten.
4. Jede Phase bleibt direkt anwählbar. Innerhalb der aktuellen Phase bleiben sämtliche Schritte direkt anwählbar. Zurück und Weiter funktionieren über Phasengrenzen hinweg.
5. Stelle nicht die komplette alte Kapitel-Seitenleiste wieder her. Entferne dazu konkurrierende Gruppenüberschriften und die zweite Prozentanzeige im Arbeitsbereich. Eine kompakte Angabe „Phase 2 von 5 · Schritt 1 von 2“ genügt.
6. Beim Schrittwechsel scrolle zum Anfang von lessonCard. Verwende einen zur tatsächlich haftenden Hauptnavigation passenden scroll-margin; der Schritttitel darf nicht verdeckt sein. Vermeide einen langen Rücksprung an den Anfang des gesamten Kursbereichs.

Prüffälle: Coulomb-Phase data zeigt fünf echte Schrittschaltflächen; model zeigt zwei; parameters zeigt eine. Kein Schritt anderer Phasen erscheint in der Unterliste. Alle fünf Lernwege lassen sich ohne URL-Handarbeit vollständig frei durchlaufen.

### T01.2 Gemeinsame Fehlerkontrolle

Befund: onStateChange in app.js ruft die nicht vorhandenen Funktionen renderLearningMap und updateCourseSummary auf.

1. Repariere die Aktualisierungslogik mit tatsächlich vorhandenen beziehungsweise sauber eingeführten Renderer-Funktionen.
2. Aktualisiere nach Änderungen den gespeicherten Zustand, Phasenstatus, Abschlussanzeige und Bearbeitungsübersicht.
3. Baue beim Tippen nicht das gesamte aktuelle Formular neu auf. Fokus, Cursorposition und gerade eingegebener Text bleiben erhalten.
4. Der Abschluss bleibt unter sharedModules['uq-largest-single-error'] geteilt. Erfinde keinen neuen Speicherschlüssel shared-error-method.
5. Zeige die ausführliche gemeinsame Kontrolle genau einmal pro Q-U-Lernweg in Phase deviations: power bei uq-power-deviation, linear bei uq-linear-deviation, constants bei uq-constant-uncertainty.
6. Im Schluss-Schritt nur einen kompakten Methodenstatus und bei Bedarf eine Aktion zurück zur eingebetteten Kontrolle zeigen. Dort nicht erneut das ganze Fünf-Felder-Formular rendern.
7. Die Nachschlageseite verwendet dieselben Felder, erwarteten Antworten und Gültigkeitsregeln. Gültige Antwortäquivalente wie 10 und 10,0 führen auf beiden Oberflächen zum gleichen fachlichen Status.

Prüffälle: Alle fünf Felder bearbeiten und absenden, ohne ReferenceError. Nach erfolgreicher Kontrolle zählt der Abschluss in allen drei Q-U-Wegen. Eine anschließend falsche Antwort macht ihn sofort offen. Neuladen erhält genau diesen Zustand.

### T01.3 Phasenstatus und freiwillige Felder

1. Trenne das Aktualisieren der Phasenanzeige vom kompletten Aufbau des Lernformulars. Rufe die Statusaktualisierung bei jeder Änderung eines Pflichtabschlusses auf.
2. Änderungen eines Feldes mit required:false verändern weder completedSteps noch den Abschluss einer Phase oder eines Lernwegs.
3. Leere freiwillige Felder erhalten kein Fehlerfeedback. Ausgefüllte freiwillige Felder werden gegen ihre tatsächliche Erwartung geprüft.
4. Beim Wiederanzeigen eines abgeschlossenen Schritts darf eine falsche freiwillige Antwort nicht pauschal grünes Feedback erhalten. Entferne das bedingungslose setFieldFeedback(..., true) für solche Antworten.
5. Pflichtkontrollen werden durch ausdrücklich ausgeführtes Prüfen abgeschlossen. Das Vorhandensein plausibler gespeicherter Werte allein ersetzt dieses Ereignis nicht.

Prüffälle: Pflichtaufgabe abschließen → Phase sofort abgeschlossen. Falsche Pflichtantwort eingeben → Status sofort offen. Anschließend Pflichtaufgabe wieder abschließen und eine freiwillige Aufgabe falsch beantworten → Pflichtstatus bleibt abgeschlossen, freiwilliges Feedback bleibt falsch, auch nach Schrittwechsel und Neuladen.

Abnahme T01: Alle genannten Interaktionen funktionieren in einem tatsächlichen Browser ohne Konsolenfehler. Wenn kein Browser zugänglich ist, Logik mit Tests absichern und Browserabnahme ausdrücklich offenlassen.

## T02 — Migration korrekt machen und bereits migrierte Stände reparieren

Befund: state.js markiert neue Parameterschritte allein aufgrund eines abgeschlossenen Ursprungsschritts als abgeschlossen. Neue beziehungsweise ungültige Pflichtantworten werden nicht berücksichtigt. charging-model wird unnötig gelöscht. migrationNotice ist nur ein Datenfeld, keine sichtbare Meldung.

1. Behalte die Zuordnung alter Indizes über OLD_COURSE_STEP_IDS zu den aktuellen stabilen Schritt-IDs. Die aktuelle Reihenfolge soll aus dem aktuellen Lernwegmodell stammen; vermeide widersprüchliche parallele Listen.
2. Übertrage vorhandene Antworten auf die zugehörigen neuen Feld-IDs. Führe erforderliche Umsetzungen alter Auswahlwerte ausdrücklich durch; teste die tatsächlichen alten Antwortwerte.
3. Ein neuer Parameterschritt ist nach Migration nur abgeschlossen, wenn der alte Ursprungsschritt abgeschlossen war **und sämtliche aktuellen Pflichtantworten gültig vorliegen**. Ein neu hinzugekommenes Pflichtfeld bleibt zunächst offen.
4. Die zusätzlichen numerischen Fragen ideal und distance dürfen als freiwillige Vertiefung geführt werden, wenn dadurch die bereits geprüfte ursprüngliche Parameterdeutung erhalten bleibt. Das ist eine zulässige Vereinfachung dieses Folgeauftrags. Neue verpflichtende Verständnisfragen dürfen dagegen nicht als bereits beantwortet gelten.
5. Erfasse folgende Fälle in Tests mit realistischen Feldwerten:
   - inverse-parameters mit interpretation=near und fehlendem ideal: Abschluss nur, wenn ideal künftig freiwillig ist; andernfalls offen.
   - uq-power-parameters mit meaning=WRONG: immer offen.
   - richtige übertragene Antworten aus einem nicht abgeschlossenen Ursprungsschritt: weiterhin offen.
   - uq-linear-parameters mit altem degree-Wert: korrekt übersetzen oder offenlassen; niemals einen falschen Wert als geprüft anzeigen.
   - uq-constant-parameters mit nur pf=416 und neuem unbeantworteten Pflichtfeld constant: offen.
6. Repariere auch vorhandene schemaVersion=2-Stände, die bereits unzutreffende Abschlussmarkierungen enthalten. Entferne nur ungültige Abschlussmarkierungen in den betroffenen Parameterschritten. Erhalte alle gespeicherten Antworten und unveränderten Abschlüsse.
7. Erhalte beim Exponential-Altstand die gültigen Antworten und Abschlüsse der unveränderten Schritte charging-context, charging-table, charging-delta und charging-model. Setze die laut älterem Auftrag geänderten Kontrollen charging-points, charging-regression, charging-time, charging-predictions, charging-deviations und charging-conclusion zurück.
8. Erhalte legacyChargingProgress. Bei einem schon migrierten Stand darf die unveränderte gültige charging-model-Antwort daraus einmalig wiederhergestellt werden, sofern keine neuere Antwort vorhanden ist. Überschreibe keine neueren Antworten.
9. Zeige bei einem tatsächlich betroffenen gespeicherten Lernstand einmal einen kurzen Hinweis im Arbeitsbereich der Aufladung: Welche Datenauswahl gilt jetzt und welche Kontrollen sind erneut offen? Beispiel: „Die Auswertung verwendet jetzt die Messwerte bis 80 s. Einige Kontrollen zur Auswertung sind erneut offen.“ Biete eine Schließen-Aktion und speichere den quittierten Zustand. Bei einem unveränderten oder neuen Stand ist keine Meldung erforderlich. Umsetzungskommentare und technische Begriffe wie Schema-Version erscheinen nicht im Schülertext.
10. Eine zweite Migration, Reparatur oder ein erneutes Laden verändert den Stand nicht erneut. Name, Kurs, Dokumentations-Selbstkontrollen und unabhängige Übungsdaten bleiben erhalten.
11. Ein gespeicherter gemeinsamer Abschluss mit ungültigen Pflichtantworten darf nicht als abgeschlossen angezeigt werden. Ein noch offener Stand mit richtigen Antworten wird nicht automatisch abgeschlossen.
12. Korrigiere die bisherigen Migrationstests: Sie dürfen nicht einen Abschluss für falsche Freitextwerte verlangen, wenn die aktuelle Aufgabe Auswahlwerte verwendet.

Abnahme T02: Fixtures für alten Stand, schon migrierten Stand, unvollständige Antworten, beschädigtes JSON und zweiten Ladevorgang bestehen. Kein Gesamtreset, keine stillschweigende Übernahme neuer Aufgaben als erledigt.

## T03 — Aufladung als konsistenten Grundweg mit echter freiwilliger Vertiefung darstellen

1. Erhalte CHARGING_RAW_DATA mit allen zehn ursprünglichen Zeilen unverändert. Der Grundweg verwendet konsequent die ersten neun Messpaare von 0 bis 80 s.
2. Verwende im Grundweg nur neun Zeilen in Tabellen und Zellbereichen. Entferne die Formulierung „A1:A9 beziehungsweise A10“ aus der gewöhnlichen Handlung. Daten mit 100 s erscheinen ausschließlich in der freiwilligen Vertiefung.
3. Prüfe alle Tabellen auf passende Datenquellen. charging-deviations darf nicht predicted und deviation aus Rohdaten lesen, die diese Eigenschaften nicht besitzen. Vor der Eigenarbeit nur benötigte Messdaten zeigen. Eine fertige Analyse aus CHARGING_ANALYSIS_DATA darf in einer geschlossenen Ergebnishilfe stehen.
4. Formuliere die Datenauswahl transparent: „Im Grundweg übst du die Auswertung der vorgegebenen Teilreihe von 0 bis 80 s. Das vollständige Originalprotokoll mit einem weiteren Wert bei 100 s untersuchst du in der freiwilligen Vertiefung.“
5. Verwende nicht die schlechte Anpassung des zehnten Werts als Begründung für die Auswahl. Ersetze insbesondere den Satz „Der Grundweg beschränkt sich daher auf D1:D9“. Die tatsächliche Qualität des späteren Werts bleibt ungeklärt.
6. charging-conclusion enthält in der offenen Pflichtansicht nur die Unsicherheitsannahmen, die schulische Vergleichsrechnung der neun Punkte und die angemessene Schlussfolgerung.
7. Lagere Ziel, Handlungen, Zahlen, Tabelle und passende Bilder zur Untersuchung des zehnten Punkts in eine klar benannte, standardmäßig geschlossene Vertiefung. Sie beeinflusst den Pflichtabschluss nicht.
8. Vergleiche dort transparent zwei Auswertungen: neun Punkte und alle zehn Punkte. Ungleiche Zeitabstände sind zulässig. Ändere 100 s nicht in 90 s und fordere keine Datenlöschung.
9. Entferne die historische 90-s-Hypothesenaufnahme aus dem aktiven Lernmaterial. Die Originaldatei darf im Bestand bleiben.
10. Entferne auch die aktive Abbildung charging/10-auffaellige-modellabweichung.png mit umgekehrten Vorzeichen. Ersetze sie durch eine tatsächlich korrekte Aufnahme oder eine klar als mathematisches Schema benannte kleine Vergleichstabelle. Erfinde keine GeoGebra-Oberfläche.
11. Stelle die Unsicherheitsannahme richtig dar: 0,001 V ist hier die vorgegebene absolute Unsicherheit der Spannungsdifferenz ΔU. Sie wird nicht ohne Erklärung aus der Auflösung einer einzelnen U_C-Messung abgeleitet. Der Vergleich im Grundweg verwendet 0,332 V und damit rund 0,30 %.

Verbindliche Referenzen, intern ungerundet weiterrechnen:

| Größe | Grundweg neun Punkte |
| --- | --- |
| Regressionsanfangswert A | 3,6925788228 V |
| Exponentialparameter k | −0,03043405407 s⁻¹ |
| Zeitkonstante τ | 32,8579294 s |
| Halbwertszeit | 22,7753811 s |
| Größter Betrag der relativen Modellabweichung | 2,6114084 % bei 80 s, positives Vorzeichen |
| Anfangswertabweichung gegenüber U₀=3,780 V | 2,31272956 % |
| Schulische Vergleichsgrenze | 10 % aus max(1/10; 0,001/0,332) · 100 % |

Beim Wert 100 s: relativ zur Neun-Punkte-Kurve etwa **+42,59 %**; relativ zur Zehn-Punkte-Kurve etwa **+23,04 %**. Die beiden Bezugsmodelle müssen jeweils genannt sein.

Abnahme T03: Kein unmarkierter zehnter Wert und keine fehlenden Analysewerte im Grundweg. Alle offenen Befehle, Texte, Bilder und Klausurmuster beziehen sich auf dieselben neun Punkte. Die Vertiefung bleibt wirklich freiwillig.

## T04 — Selbstständige Anwendung von vorweggenommenen Lösungen befreien

### T04.1 Arbeitsauftrag und Hilfestufen

1. Zeige zunächst pro Aufgabe die Ausgangsmesswerte, Einheiten, absoluten Unsicherheitsannahmen und einen kurzen Auftrag mit maximal vier Ergebniszielen.
2. Zeige im offenen Auftrag keine fertig eingesetzten Zellbefehle, berechneten Vergleichsgrenzen oder Referenzparameter.
3. In exponential-7 zeigt die Ausgangstabelle nur t und U_C. Die Lernenden berechnen ΔU selbst. U₀=5,00 V und die Beziehung ΔU=U₀−U_C dürfen als physikalische Vorgabe offen bleiben.
4. In assumptionsText stehen die absoluten Unsicherheiten, aber nicht die bereits eingesetzten Quotienten und Ergebnisse 6,25 %, 16,67 % oder 2,5 %.
5. Halte genau drei zunächst geschlossene Hilfestufen bereit:
   - „1. Vorgehen“: Arbeitsschritte in fachlichen Worten, ohne Befehle und ohne Lösungszahlen.
   - „2. Befehle“: passende konkrete Eingaben mit den siebenzeiligen Zellbereichen.
   - „3. Referenzergebnisse“: Werte, physikalische Formel mit Einheiten, Vergleichsgrenze, Richtung der größten Abweichung und ein begründetes Urteil.
6. Die allgemeine Befehlsübersicht bleibt geschlossen und entspricht der tatsächlich benötigten Syntax. Eine Tabellenformel für Punkte muss mit = beginnen; kennzeichne schematische Platzhalterformeln ausdrücklich als Schema und nicht als direkt kopierbaren GeoGebra-Befehl.
7. Bei einer falschen Zahlenantwort gib zunächst einen fachlichen Hinweis. Die vollständige Zahl steht in der gezielt geöffneten Referenzhilfe; sie muss nicht nach jedem beliebigen Fehlversuch sofort in der Feldmeldung erscheinen.

Beispiel für einen offenen linearen Auftrag: „Werte die sieben Messpaare mit einer freien linearen Regression aus. Bestimme die Kapazität und ordne den Achsenabschnitt ein. Berechne die Modellabweichungen und die schulische Vergleichsgrenze. Dokumentiere die physikalische Formel und begründe dein Urteil.“

### T04.2 Geprüften Status korrekt speichern

1. Unterscheide gespeicherte Eingaben, ausdrücklich geprüfte Zahlen und die drei eigenständigen Dokumentations-Selbstkontrollen.
2. completedChecks wird nur bei ausdrücklicher Prüfung anhand der tatsächlichen gültigen Feld-IDs gesetzt.
3. Beim Ändern einer Zahlenantwort entferne die zugehörige bisherige Prüfmarkierung. Andere unveränderte gültige Prüfmarkierungen dürfen erhalten bleiben.
4. Eine Aufgabe gilt numerisch als geprüft, wenn alle erforderlichen Feld-IDs ausdrücklich geprüft sind und die aktuellen Antworten weiterhin gültig sind.
5. Bei Neuladen oder Aufgabenwechsel darf eine bloß richtige, nie geprüfte Eingabe nicht die Meldung „alle Kontrollen bestanden“ erhalten. Der positive Einzelhinweis darf ebenfalls nicht allein aus der Antwort berechnet werden.
6. Bereinige ungültige alte completedChecks, ohne Antworten zu löschen. Das gilt auch für bereits gespeicherte Version-2-Übungsstände.
7. Verwende sachliches Feedback: „Die geprüften Zahlen stimmen.“ Das ist kein Nachweis eigenständiger Regressionskompetenz. Die Papier-Selbstkontrollen bleiben als eigene, nicht automatisch bewertete Aussagen erhalten.

### T04.3 Richtige Dokumentationsziele

1. Korrigiere courseForTask:
   - linear-7 → proportional-linear
   - power-7 → inverse-square
   - exponential-7 → capacitor-exponential
2. Behalte die Zuordnung der beiden geführten Potenzwege zur vorhandenen neuen Potenzaufgabe, kennzeichne aber den Wechsel des physikalischen Beispiels, falls man aus dem Q-U-Potenzweg kommt. Erfinde keinen vierten Übungsdatensatz.
3. Der Link zur Klausurhilfe führt zum richtigen fachlichen Muster. Nenne sichtbar, dass dieses Muster ein anderes Lernbeispiel mit fünf/sechs/neun Messpaaren zeigt und die Übung sieben Messpaare hat.
4. Ergänze einen internen Rückkontext für die Übung, zum Beispiel return=practice&task=power-7. Die Klausurhilfe bietet dann eine passende Rückkehr zu dieser Aufgabe. Verwende nur die bekannten internen Seiten-/Aufgaben-IDs.

Abnahme T04: Kein gesuchtes Ergebnis in der offenen Übungsansicht; klar unterschiedliche Hilfestufen; richtiger Musterlink; Prüfstatus bleibt über Änderungen und Neuladen ehrlich. Datensätze, Referenzen und Toleranzen bleiben unverändert.

## T05 — Verständlichkeit, Fachsprache und logischen Kartenaufbau vereinheitlichen

1. Bearbeite jeden der fünf Lernwege anhand desselben Schemas:
   - kurzer Titel und ein konkretes Lernziel;
   - maximal vier ausführbare Handlungen mit knappem Zweck;
   - tatsächlich benötigte Eingabe/kleine Ausgangstabelle;
   - höchstens ein primäres Arbeitsbild;
   - ein kurzer Satz „Daran erkennst du das Ergebnis“;
   - Pflichtkontrolle und gegebenenfalls geschlossene freiwillige Felder;
   - geschlossene Erklärung mit Begriffen, Beispiel und Fehlerhilfe;
   - kurzer Merksatz und Navigation.
2. Ersetze den offenen mehrabsätzigen Begründungsblock vor der Handlung durch höchstens einen kurzen Zwecksatz. Die längere Begründung steht in der Erklärung. Erhalte alle fachlich notwendigen Schritte.
3. Ergebnis-Erkennung beschreibt einen sichtbaren Zustand, keine Lösung: etwa „Die Algebraansicht zeigt eine Exponentialfunktion mit einem Faktor vor e und einem negativen Parameter im Exponenten.“ Entferne dort Angaben wie „τ≈32,86 s“, „größte Abweichung 2,61 %“ oder „C≈408 pF“.
4. Entferne Lösungsvorgaben aus Eigenarbeits-Handlungen wie „Multipliziere ... und runde auf 416 pF“. Formuliere stattdessen das Vorgehen und die sinnvolle Rundung. Ausgangsmesswerte dürfen natürlich genannt sein.
5. Weise pro Bedienungsschritt eindeutig auf die Eingabeoberfläche hin: Tabellenzelle, Algebra-Eingabezeile oder Grafikansicht. Verwende die tatsächlichen aktuellen Bezeichnungen der geprüften Rechner Suite.
6. Einheitliche Symbole in Schülertexten:

| Bedeutung | Bezeichnung |
| --- | --- |
| Potenzfunktion | y=a·xⁿ, Exponent n |
| Lineare Regression | y=m·x+b, Steigung m, y-Achsenabschnitt b |
| Exponentialmodell | ΔÛ(t)=A·e^(kt), Regressionsanfangswert A, Exponentialparameter k |
| Zeitmaße | τ=−1/k und t₁/₂=τ·ln(2) |
| Relative Modellabweichung | (Messwert−Modellwert)/Modellwert · 100 % |
| Optionaler Export | Bearbeitungsübersicht |

7. Die interne Regressions-API mit a und b beziehungsweise Feld-IDs b bleibt erhalten. Ändere nur die Schülerbezeichnungen. Durchsuche dazu Lerntexte, Begriffshilfe, Bildunterschriften, dynamische Abschlussmeldungen und kopierbare Formulierungshilfen. Ändere b als linearen Achsenabschnitt nicht versehentlich in n.
8. Bei Exponentialfunktionen ist kt der Exponent und k der Parameter mit Einheit s⁻¹. Erkläre A und U₀ getrennt; setze den gefitteten Anfangswert nicht stillschweigend mit der angelegten Spannung gleich.
9. In Phase parameters zeige jeweils eine kurze physikalische Formel mit eindeutig angegebenen Einheiten; verwende dieselbe normierte Form wie in der Klausurhilfe. Ein frei gefitteter Potenzfaktor mit n≠1 ist nicht automatisch die Kapazität.
10. Korrigiere die Aussage über b: Er ist ein extrapolierter Modellwert bei U=0; mögliche Ursachen eines nicht verschwindenden Werts werden nicht durch die Regression bewiesen.
11. Verwende „Messunsicherheit“ für die Genauigkeitsangabe, „Modellabweichung“ für den Vergleich mit der Kurve und „schulische Vergleichsregel“ für das verwendete Beurteilungsverfahren. Der etablierte Name „Methode des größten Einzelfehlers“ bleibt einmal erklärt erhalten.
12. Beim Prozentvergleich von n mit 1 ausdrücklich keine statistische Exponentenunsicherheit behaupten. Behalte die unterrichtliche Rechnung; benenne ihre begrenzte Bedeutung.
13. Kürze redundante Wiederholungen, ohne eine Regressionsanleitung in bloße Formelsammlungen umzuwandeln. Der lineare Weg, beide Potenzwege, Konstantenverfahren und Aufladung müssen jeweils ohne vorherige Pflichtbearbeitung eines anderen Lernwegs verständlich sein.
14. Biete bei Bedarf eine kurze wiederverwendete GeoGebra-Starthilfe für alle Wege an. Sie darf nicht ausschließlich im Coulomb-Weg verfügbar sein. Keine neue Pflichtphase und kein neuer Vorbereitungskurs.

Abnahme T05: Alle fünf Wege anhand einer Checkliste vollständig gelesen. Sichtbare Symbole und Begriffe konsistent, kein fehlender Bedienungsschritt, keine Kontrolllösung in der Ergebnis-Erkennung, kompakte Standardansicht tatsächlich kurz.

## T06 — Darstellung, Einstieg und Bildmaterial konsistent machen

### T06.1 Einstieg und Arbeitsfläche

1. Passe index.html und style.css gemeinsam an. Der alte große Hero mit setup-list besitzt teilweise keine Gestaltung mehr; bloßes Verkleinern von h1 reicht nicht.
2. Baue einen kompakten Einstieg mit Titel, einem Orientierungssatz und der Methodenwahl. Auf Desktop muss mindestens der Beginn der Auswahl im ersten normalen Bildschirm sichtbar sein.
3. Ordne die drei Absichten kurz zu: „Mit Anleitung üben“, „Neue Daten selbst auswerten“, „Rechenweg für die Klausur aufschreiben“.
4. Die Vorbereitung „Zwei Apps nebeneinander“ wird eine kleine geschlossene Hilfe. Verwende entweder die nativen Listennummern oder eigene Nummern, nicht beides gleichzeitig.
5. Nummeriere die wählbaren Methoden nicht als Pflichtreihenfolge. Die fünf Lernphasen bleiben als Ablauf nummeriert. Eine knappe Empfehlung für einen ersten linearen Q-U-Durchlauf ist zulässig; alle Methoden bleiben direkt wählbar.
6. Während der Bearbeitung ist die Einführung verborgen beziehungsweise auf einen kleinen Arbeitskopf reduziert. Zeige aktuellen Lernweg, Phase und Wechselaktion, keine zweite große Startseite über der Karte.
7. Nach Abschluss ist „Mit neuen Daten selbst auswerten“ die primäre Weiterführung zur passenden Übung. Bearbeitungsübersicht und Klausurhilfe bleiben daneben erreichbar. Entferne die dynamischen Restbezeichnungen Lernnachweis.
8. Prüfe die mobile Gestaltung für die neue lesson-flow-Klasse; alte Regeln nur für lesson-grid reparieren die neue Kartenstruktur nicht automatisch. Tabellen und lange Befehle scrollen innerhalb ihres Containers, die Gesamtseite bleibt in der Breite stabil.
9. Gestalte Schaltflächen, Ausklapphilfen, Status und Überschriften über alle Seiten gleich. Verwende für dieselbe Rolle dieselbe visuelle Gewichtung. Vermeide mehrere große Zwischenüberschriften und dekorative Boxen vor der eigentlichen Handlung.

### T06.2 Bilder

1. Implementiere die Unterscheidung zwischen höchstens einem primären Arbeitsbild und geschlossenen Hilfebildern. Alle vorhandenen Nebenbilder dürfen in der Hilfe weiter erreichbar sein, sofern ihr Inhalt richtig ist.
2. Betroffene Mehrbild-Schritte im Ausgangsstand: fill-points, deviations, uq-power-conclusion, uq-constant-ratios, uq-constant-mean, uq-constant-deviation, uq-constant-uncertainty, uq-constant-conclusion, uq-linear-conclusion, charging-delta, charging-points, charging-predictions, charging-conclusion.
3. Prüfe jedes aktive Bild tatsächlich visuell auf Daten, Befehl, Vorzeichen und aktuelle Schrittzuordnung. Korrigiere nicht lediglich seinen Dateinamen oder Alt-Text.
4. Ersetze die 13 generierten Q-U-Oberflächen durch echte passende GeoGebra-Aufnahmen, sofern du diese tatsächlich erzeugen kannst. Dokumentiere Programm, Sprache und Version. Erzeuge keine angeblich echten Aufnahmen mit dem alten GDI-Generator oder Bildgenerierung.
5. Falls echte Aufnahmen nicht erreichbar sind, verwende vorläufig einen kopierbaren Befehl oder ein klar mathematisches Schema. Die sichtbare Bildunterschrift und der Alt-Text müssen die Schemaeigenschaft erkennen lassen. Eine erfundene Benutzeroberfläche bleibt nicht unmarkiert als „GeoGebra-Algebraansicht“ stehen.
6. Schneide echte Aufnahmen auf die relevante Handlung zu und prüfe ihre Lesbarkeit in der eingebundenen Größe und im Vergrößerungsdialog. Kein Bild darf unnötig große leere Flächen zeigen.
7. Korrigiere BILDVERZEICHNIS.md anhand des tatsächlichen Bestands:
   - Geführtes Coulomb-Beispiel: sechs Werte r=8–18,6 cm, F=0,37–0,06 mN; erster Punkt (8;0,37).
   - Neue Coulomb-Übung: sieben Werte r=6–22 cm; diese Daten nicht mit den alten Bildern vermischen.
   - Q-U-Lernreihe: letzte Ladungszahl 10,2, nicht 10,5.
   - Prüfpunkt 100 s relativ zur Neun-Punkte-Kurve: oberhalb, nicht unterhalb.
   - Historische Vorzeichenbilder und 90-s-Aufnahme als nicht aktiv kennzeichnen.
8. Die Herkunft der echten Originalaufnahmen ist durch den Nutzer bestätigt: selbst aufgenommen. Weitere Herkunftsdaten wie Aufnahmedatum und genaue Softwareversion nur angeben, wenn bekannt. „Rechner Suite“ ist ein Produktname, keine genaue geprüfte Versionsnummer.
9. Passe Bildtests an die sachlichen Anforderungen an. Ein Test darf nicht allein wegen einer alten Vorgabe „alle zehn Bilder müssen aktiv sein“ die Wiedereinbindung einer falschen Aufnahme verlangen.

Abnahme T06: Die drei Seitenbereiche wirken zusammengehörig; Handlung und Befehl sind rasch auffindbar. Pro Schritt höchstens ein offenes Arbeitsbild. Bilder stimmen fachlich und sind bei fehlender Echtheit sichtbar gekennzeichnet. Fehlende Originalaufnahmen bleiben als konkret benannte Restpunkte offen.

## T07 — Klausurhilfe, Kontext und Druck prüfen und reparieren

1. Behalte die fünf gemeinsamen Abschnitte und die vorhandenen vollständigen eingesetzten Abweichungsrechnungen. Verwende für die Aufladung dieselben neun Punkte wie im Lernweg.
2. Validierung vor der Abschnittssuche: Nur data, geogebra, physical, deviations oder conclusion als section akzeptieren. Ungültige Werte wie ] oder unknown verursachen keine Ausnahme; die normale Seite bleibt nutzbar.
3. Ermittle zuerst anhand von state.documentation.view den sichtbaren Wurzelcontainer. Wähle darin ausschließlich das aktuell ausgewählte Beispiel und seinen Zielabschnitt. Ein Artikel in einem verborgenen Elterncontainer ist kein sichtbares Ziel.
4. Ein direkter Abschnittslink aus dem Lernweg soll das ausgeführte Muster zeigen und die gewünschte Sektion nach fertigem Formelsatz sichtbar machen. Der auf Papier gerichtete Lernmodus bleibt daneben frei wählbar. Vermeide Scrollen zu noch verborgenen Elementen.
5. Rückkehr aus einem Lernweg-Muster führt zum ursprünglichen course und step; Rückkehr aus einer Übung führt zur ursprünglichen task. Der Ausgangskontext bleibt bei Wechsel des betrachteten Musters stabil, während die allgemeine Navigation zum gewählten fachlichen Beispiel passt.
6. Aktualisiere die Navigationslinks auch auf groesster-einzelfehler.html mit dem vorhandenen gemeinsamen Navigationsbaustein. Die dort statischen Links dürfen den aktuellen Kontext nicht unbeabsichtigt verlieren.
7. Im GeoGebra-Auswertungsabschnitt des linearen Musters zeige die numerische GeoGebra-Ausgabe als Q: y=0,0408x+0,12 beziehungsweise klar als Zahlenfunktion. Die Formel Q(U) mit physikalischen Einheiten folgt im nächsten Abschnitt. Vermische Zahlenwerte und physikalische Größen nicht.
8. Stelle den Unterschied zwischen „Muster ansehen“ und „Dokumentation selbst schreiben“ verständlich dar. Die Selbstkontrollen bewerten keine handschriftlichen Texte automatisch.
9. Ergänze im Druck-CSS ausdrücklich .site-nav und alle neuen reinen Bildschirmaktionen, einschließlich summary-top-actions. Im PDF erscheinen keine Navigationsmenüs, Wechsel-/Schließen-Schaltflächen oder doppelte Titel.
10. Drucke alle fünf Muster und alle fünf Arbeitsblätter tatsächlich in eine prüfbare PDF-Datei. Prüfe zusätzlich eine vollständige und eine unvollständige Bearbeitungsübersicht.
11. Bei Mustertext mindestens 10 pt Fließtext, bei ergänzenden Hinweisen mindestens 9 pt. Passe Spalten, Umbrüche und Seitenanzahl an den Inhalt an. Lieber eine zusätzliche lesbare Seite als abgeschnittene Formeln oder zu kleine Schrift.
12. Prüfe die Formelbreiten unter Druck: Keine horizontale Abschneidung, keine unsichtbaren Formeln aus verborgenen Ansichten, keine übergroßen Lücken durch unteilbare Abschnitte.

Prüffälle: Alle fünf Abschnittslinks; gespeicherter Papiermodus plus direkter Abschnittslink; ungültiger Abschnitt; Beispielwechsel; Rückkehr zum exakten Lernschritt; power-7 öffnet das Coulomb-Muster und kehrt zur Übung zurück; zehn unterschiedliche Dokumentations-PDFs tatsächlich geöffnet und angesehen.

Abnahme T07: Zielsektionen und Rückkontext stimmen; Druckdateien sind vorhanden und visuell geprüft. Wenn die Druckprüfung technisch nicht möglich ist, bleibt sie offen und wird nicht durch einen CSS-Test als bestanden ersetzt.

## T09 — Schülertexte von Entwicklungs- und Meta-Hinweisen bereinigen

Dieser zusätzliche Nutzerauftrag ist verbindlich: Aussagen über die Umsetzung des Arbeitsauftrags gehören in Entwicklungsunterlagen. Im Lernbereich stehen nur Texte, die beim Handeln, Verstehen, Prüfen oder Einordnen eines Ergebnisses helfen.

### T09.1 Gesamte sichtbare Oberfläche redaktionell prüfen

1. Lies alle vier Seiten, alle fünf Lernwege, die drei selbstständigen Aufgaben und die fünf Dokumentationsbeispiele aus Sicht einer lernenden Person. Prüfe auch aufgeklappte Hilfen, Fehler- und Abschlussmeldungen, Bearbeitungsübersicht und Ausdrucke.
2. Stelle für jeden Hinweis diese Frage: „Welche Handlung, welches Verständnis oder welche notwendige Entscheidung unterstützt dieser Satz?“ Ohne konkrete Antwort: entfernen. Entwicklungsanforderungen bei Bedarf in README.md oder UMSETZUNGSSTATUS.md dokumentieren.
3. Entferne Aussagen über freie Erreichbarkeit, Offenheit aller Kapitel, Vereinheitlichung, interne Pflichtlogik und erfüllte Projektvorgaben. Die Bedienung selbst muss die Wahlmöglichkeiten zeigen.
4. Ersetze notwendige Statusinformationen durch kurze, konkrete Zustände: „Fehlergrenze noch nicht geprüft“, „Fehlergrenze geprüft“, „3 von 5 Aufgaben geprüft“. Die Angaben müssen dem tatsächlichen Zustand entsprechen.
5. Bedieninformationen zur Speicherung höchstens einmal über eine kleine Hilfe „Speichern“ zugänglich machen. Erkläre dort bei Bedarf die tatsächliche Bindung an Browser und Gerät und die vorhandene Sicherungsfunktion. Wiederholte Speicherhinweise aus Lernkarten und Fußzeilen entfernen.
6. Biete keine pauschalen Behauptungen wie „kein Tracking“ oder „reine lokale Ausführung“ als Schmucktext an. Falls eine sachliche Information dazu erforderlich ist, prüfe zunächst den tatsächlichen Betrieb einschließlich eingebundener Ressourcen und externer Angebote.
7. Erhalte fachlich notwendige Grenzen: verwendete Einheiten, Bedingungen einer Regression, Bedeutung der Übungsdaten, vereinfachte schulische Vergleichsregel, fehlende statistische Beweiskraft und Kennzeichnung schematischer Abbildungen. Erkläre sie an der fachlich passenden Stelle und vermeide Wiederholungen.
8. Erhalte Fehlermeldungen und Rückmeldungen, die eine konkrete Handlung auslösen. Ein tatsächlich geänderter gespeicherter Lernstand darf einmal erklärt werden; T02 verlangt dafür eine kurze, auf die betroffenen Aufgaben bezogene Meldung.
9. Erhalte sachliche Quellen-, Lizenz- und Herkunftsangaben gemäß T10. Die Bereinigung ist kein Anlass, diese Angaben oder fachliche Einschränkungen zu löschen.
10. Ersetze gelöschte Meta-Hinweise nicht durch neue Aussagen wie „Die Oberfläche wurde vereinfacht“ oder „Jetzt stehen die Lernenden im Mittelpunkt“. Überprüfe auch neu geschriebene Texte nach denselben Kriterien.

### T09.2 Konkrete Fundstellen bearbeiten

Die Zeilennummern beziehen sich auf den geprüften Ausgangsstand und dienen nur der Orientierung. Suche nach den Texten und berücksichtige alle mehrfach vorhandenen Varianten.

| Fundstelle | Bisheriger Text/Ausschnitt | Verbindliche Bearbeitung |
| --- | --- | --- |
| app.js, renderCourse, ca. 776 | „Alle Schritte bleiben frei erreichbar.“ | Satz aus dem dynamisch erzeugten Lernweg-Intro entfernen. Sinnvolle fachliche Kurzbeschreibung beibehalten. |
| index.html, courseIntro, ca. 169 | „Alle Kapitel bleiben offen.“ | Auch den ursprünglichen HTML-Text bereinigen, damit der Hinweis vor dem Rendern nicht kurz erscheint. |
| index.html, Kopf, ca. 55–56 | „5 einheitliche Phasen“, „Fortschritt bleibt lokal gespeichert“ | Aus den hervorgehobenen Einstiegsmerkmalen entfernen. Phasen bleiben durch die tatsächliche Navigation sichtbar; Speichern wird einmal in der Bedienhilfe erklärt. |
| index.html, Methodenauswahl, ca. 93 | „… keine Pflichtabfolge!“ | Durch eine kurze fachlich nützliche Orientierung ersetzen: „Beim Kondensatorversuch kannst du denselben Datensatz mit drei Methoden auswerten. Wähle eine davon.“ |
| shared-error-module.js, ca. 149–150, 219, 274–275; groesster-einzelfehler.js | „… dieser Abschluss gilt für alle drei Q–U-Lernwege“, „… wird für Phase 4 … und den Abschluss … benötigt“ | Lange Erläuterungen der internen Abschlusslogik durch einen knappen tatsächlichen Prüfstatus ersetzen. Den gemeinsam gespeicherten Zustand und die Funktionsweise aus T01 erhalten. |
| groesster-einzelfehler.html, ca. 109 und 125 | „Dein Abschluss wird lokal gespeichert und gilt anschließend …“, wiederholter lokaler Speicherhinweis | Wiederholte Speicher- und Abschlussabsätze entfernen. Status und passende Weiter-Aktion reichen. |
| groesster-einzelfehler.html, ca. 40 | „… der Kurs gibt dann keine automatische Fehlererklärung aus“ | Als fachliche Aussage formulieren: „Erreicht oder überschreitet eine Abweichung die Grenze, müssen Modell und Messung weiter geprüft werden.“ Die ausdrücklich beschriebene Gleichheitsgrenze und die Grenzen der schulischen Regel erhalten. |
| selbst-auswerten.js, ca. 369 | „Es erfolgt keine automatische Bewertung handschriftlicher Texte.“ | Den tatsächlichen Selbstvergleich anleiten: „Vergleiche dein Protokoll mit diesen drei Kriterien.“ Nur verwenden, wenn dort tatsächlich drei Kriterien stehen; sonst Anzahl anpassen. |
| selbst-auswerten.html, ca. 42 | „Drei didaktische Übungsdatensätze mit jeweils sieben Messpaaren …“ | Kurz zur Wahl auffordern, etwa „Wähle einen Übungsdatensatz und werte ihn in GeoGebra aus.“ Die Herkunft als Übungsdaten bleibt an passender Stelle einmal erkennbar. |
| selbst-auswerten.html, ca. 74 | „Keine Cookies, kein Tracking, reine lokale Ausführung.“ | Aus dem Lernseiten-Fuß entfernen. Eventuell erforderliche sachliche Informationen separat und zutreffend bereitstellen. |
| index.html, print-footnote, ca. 387 | langer Hinweis über Bearbeitungsstand, Kompetenznachweis und lokale Erstellung | Kurz „Bearbeitungsstand zum Lernbeispiel.“ verwenden. Titel und Gesamtgestaltung der Übersicht dürfen weiterhin keine eigenständig geprüfte Kompetenz bescheinigen. |
| index.html, Footer, ca. 400 | lange Erklärung der fehlenden offiziellen Verbindung zu GeoGebra | Einmal knapp und konsistent gemäß T10 formulieren. |

### T09.3 Prüfung und Abnahme

- Gleiche HTML-Ausgangstexte, dynamisch erzeugte Texte und Druckansicht ab. Ein Hinweis darf nach dem nächsten Rendern oder beim Drucken nicht wieder erscheinen.
- Prüfe erfolgreiche, unvollständige und fehlerhafte Zustände. Fehlermeldungen müssen weiterhin sagen, was korrigiert werden soll.
- Lies nach der Überarbeitung die normale Ansicht zusammenhängend. Formulierungen müssen zur aktuellen Aufgabe passen; reine Behauptungen über die Gestaltung oder Auftragserfüllung fehlen.
- Führe im Abschlussbericht eine kurze Liste „entfernt / gekürzt / bewusst erhalten“ mit repräsentativen Beispielen. Diese Liste gehört in den Bericht, nicht in die Lernoberfläche.
- Zusätzliche Tests, die nur auf das Fehlen einer Zeichenfolge prüfen, sind hierfür nicht erforderlich. Die vorhandenen Funktionsprüfungen und die tatsächliche redaktionelle Durchsicht bleiben maßgeblich.

Abnahme T09: Alle sichtbaren Texte sind geprüft; die genannten Fundstellen sind bereinigt; fachliche Grenzen, erforderliche Bedienhinweise und Quellenangaben sind erhalten. Speichern, Status und Wahlmöglichkeiten funktionieren weiterhin.

## T10 — GeoGebra-Herkunft und verwendete Materialien knapp kennzeichnen

### Grundlage

GeoGebra® ist laut [offiziellen Nutzungsbedingungen](https://www.geogebra.org/tos) eine Marke der GeoGebra GmbH. Die sachliche Bezugnahme auf die Software ist grundsätzlich nach [§ 23 MarkenG](https://www.gesetze-im-internet.de/markeng/__23.html) zulässig; sie darf keine irreführende offizielle Verbindung vermitteln. Aus der Markennennung folgt keine Pflicht, jedes Vorkommen mit ® zu versehen. Das [DPMA](https://www.dpma.de/docs/dpma/veroeffentlichungen/broschueren/bromarken_dt_2024_neuerslogan.pdf) beschreibt das Zeichen als mögliche Kennzeichnung eingetragener Marken.

Die [GeoGebra-Lizenz](https://www.geogebra.org/license) regelt verwendete Materialien gesondert. Sie verlangt Namensnennung, Website-Link und den Hinweis „Made with GeoGebra®“. Für Dokumentation und bestimmte Bestandteile der Oberfläche nennt sie CC BY-NC-SA 4.0 oder später. Prüfe daher zusätzlich die konkret verwendeten Bildbestandteile und Quellen.

### Bestätigte Bildherkunft

Der Nutzer bestätigt, dass er die vorhandenen echten GeoGebra-Screenshots selbst aufgenommen hat. Übernimm diese Angabe als bekannte Herkunft in das Bildverzeichnis; fordere dafür keine zusätzlichen Herkunftsnachweise an. Aufnahmeversion und Datum bleiben getrennte Angaben und werden nur genannt, soweit bekannt. Programmatisch erzeugte Schemabilder und Aufnahmen der Trainer-Oberfläche sind gesondert zu behandeln.

### Umsetzung

1. Verwende einmal im Seitenfuß jeder der vier HTML-Seiten den gleichen kurzen Herkunftshinweis: „GeoGebra® ist eine Marke der GeoGebra GmbH. Dieses Unterrichtsmaterial ist ein unabhängiges Angebot.“ Verlinke den Namen mit https://www.geogebra.org/. Keine wiederholten Markenerklärungen in Lernkarten.
2. GeoGebra bleibt in normalen Anleitungen, Überschriften und Befehlsbeschreibungen ohne zusätzliches ® lesbar. Erzeuge durch die Darstellung keine Behauptung einer offiziellen Partnerschaft oder Zertifizierung.
3. Prüfe alle aktiven Bilder anhand BILDVERZEICHNIS.md: eigene Aufnahme des Nutzers, schematische Nachzeichnung oder tatsächlich übernommenes Material. Bei den bestätigten Originalaufnahmen ist die Herkunft geklärt. Erfasse weiterhin Bildtyp, fachliche Passung und vorgenommene Änderungen; prüfe zusätzliche Quellenangaben nur für tatsächlich fremde Inhalte.
4. Ergänze THIRD_PARTY_NOTICES.md um tatsächlich verwendete GeoGebra-Materialien mit passender Lizenz und Quelle; bestehende MathJax-Angaben erhalten. Der Seitenfuß erhält einen unaufdringlichen Link „Quellen und Lizenzen“ zu einer lesbaren Übersicht.
5. Für zutreffende GeoGebra-Inhalte „Made with GeoGebra®“ mit Website-Link aufnehmen; bei übernommenen Community-Materialien zusätzlich Autor und direkte Materialquelle nennen. Schemabilder nicht pauschal als mit GeoGebra erzeugt ausgeben.
6. Weise Lizenzen den jeweiligen Bestandteilen zu. Erkläre nicht ungeprüft den gesamten selbst geschriebenen Trainer als GeoGebra-Material oder als unter einer bestimmten Lizenz veröffentlicht.
7. Druckvorlagen, die betreffende Bilder oder übernommene Inhalte enthalten, behalten die dazugehörigen Quellen-/Lizenzangaben. Reine eigene Textarbeitsblätter brauchen keinen wiederholten Markenabsatz.

Abnahme T10: Einheitlicher kurzer Herkunftshinweis, erreichbare Quellenübersicht und belegte Bildherkunft. Offene Herkunftsfragen sind benannt. Die Erklärung im Seitenfuß beansprucht nicht den Platz eines Lernhinweises.

## T11 — Nach der Überarbeitung Altlasten entfernen und das Projekt aufräumen

Der Nutzer hat das abschließende Aufräumen ausdrücklich beauftragt. Setze dieses Paket nach den funktionalen, fachlichen und gestalterischen Änderungen um und prüfe anschließend den bereinigten Stand mit T08. Routinemäßige Bereinigung eindeutig entbehrlicher Projektdateien ist durch diesen Auftrag autorisiert.

### T11.1 Bestand und Verwendung feststellen

1. Erfasse vor der Bereinigung für jeden Kandidaten: Pfad beziehungsweise Symbol, bisheriger Zweck, aktuelle Verwendung, geplante Aktion und kurze Begründung. Halte die Liste im Entwicklungsbericht; keine neuen Hinweise in der Lernoberfläche.
2. Prüfe die Verwendung über HTML, ES-Modul-Imports, CSS-URLs, Lernweg-/Dokumentationsdaten, dynamische Bildpfade, Tests, Hilfsskripte und veröffentlichte Linkziele. Ein fehlender Treffer in einer einzelnen Textsuche reicht nicht als Löschgrund.
3. Trenne aktive Auslieferungsdateien, notwendige Tests/Prüfwerkzeuge, aktuelle Dokumentation, historische Unterlagen und wegwerfbare Zwischenprodukte.
4. Prüfe besonders den Ordner scratch/: DOM-Dumps, test-shot.png, capture-results.json, alte oder nahezu leere Screenshots und provisorische Aufnahmeskripte. Ermittle auch ungenutzte Bilder, überholte Generatoren und nicht mehr erreichbare Oberflächenvarianten.
5. Erhalte Migration, Reparatur alter Lernstände, gespeicherte IDs und Kompatibilitätsfälle. Alter Code ist nicht entbehrlich, wenn er vorhandene Schülerdaten weiterhin sicher übernimmt.

### T11.2 Konkrete Bereinigung

1. Entferne tatsächlich unbenutzte Funktionen, Variablen, Imports, Event-Handler, HTML-Blöcke und CSS-Regeln. Prüfe auch den Aufruf- und Renderpfad; entferne keine Funktionen nur wegen eines vermeintlich alten Namens.
2. Entferne überholte Kommentare, auskommentierte Implementierungen und doppelte Konfigurationen. Bündele gemeinsam verwendete Konstanten nur dort, wo das eine belegte Doppelung auflöst.
3. Entferne eindeutig entbehrliche temporäre Dateien, fehlgeschlagene Testaufnahmen, veraltete DOM-Dumps und redundant erzeugte Ergebnisse. Der aktive Projektbaum soll anschließend keine Ansammlung provisorischer Dateien unter scratch/ enthalten.
4. Behalte nützliche wiederverwendbare Aufnahmeskripte nur, wenn sie mit dem endgültigen Projekt funktionieren. Lege sie bei Bedarf unter scripts/ ab und dokumentiere ihren Aufruf knapp. Entferne unbrauchbare beziehungsweise vollständig ersetzte Varianten.
5. Prüfe generate-uq-screenshots.ps1: Wenn der alte GDI-Generator nach T06 nicht mehr gebraucht wird, entferne ihn aus dem aktiven Bestand. Entferne oder archiviere auch ersetzte Schemabilder; ändere vorher sämtliche betroffenen Referenzen und das Bildverzeichnis.
6. Entferne nachweislich ungenutzte Bildduplikate aus der Auslieferung. Bilder, die noch als geschlossene Hilfe gebraucht werden, bleiben erhalten. Fachlich falsche historische Bilder dürfen nicht mehr aktiv eingebunden sein.
7. Erhalte die vom Nutzer selbst aufgenommenen Originalbilder. Wenn ein Original aus der aktiven Anleitung herausfällt, archiviere es bei Bedarf unter docs/archiv/originalbilder/ und passe das Bildverzeichnis an. Lösche kein einziges vorhandenes Original ohne erhaltene Originalkopie.
8. Erhalte die erforderlichen neuen Screenshots und geprüften PDFs als nachvollziehbare Abnahmebelege, etwa unter docs/pruefnachweise/. Behalte eine klare Auswahl der tatsächlichen Endfassung; entferne überholte Duplikate und misslungene Aufnahmen.
9. Fasse die aktuelle technische Dokumentation zusammen. README.md soll Einstieg, lokale Ausführung, Tests, relevante Dateistruktur und Links zu Fach-/Lizenz-/Abnahmeunterlagen erklären. Identische aktuelle Anweisungen nicht in mehreren widersprüchlichen Dateien pflegen.
10. Archiviere abgeschlossene ältere Arbeitsaufträge und historische Reviews, die nicht mehr zur aktuellen Bedienung oder Entwicklung benötigt werden, unter docs/archiv/. Bewahre Anforderungen und Zahlenreferenzen nachvollziehbar auf; aktualisiere Links nach einem Umzug. Der aktuelle Terra-Auftrag, die Nachprüfung und der abschließende Prüfbericht müssen eindeutig auffindbar bleiben.
11. Entferne keine Tests nur deshalb, weil sie Altstände behandeln. Erhalte aussagekräftige Regressionstests und Migrations-Fixtures. Veraltete Annahmen dürfen entsprechend den vorherigen Paketen berichtigt werden.
12. Behalte benötigte Bibliotheken, lokale Schrift-/Formeldateien, vollständige Lizenztexte, aktive Metadatenbilder, robots.txt sowie tatsächlich benötigte Konfiguration. Beurteile sie anhand ihrer Verwendung.
13. Beschränke Dateioperationen auf das Projekt und ausdrücklich für diese Arbeit angelegte temporäre Dateien. Prüfe vor rekursivem Entfernen oder Verschieben den aufgelösten absoluten Zielpfad. .git, Zugangsdaten, persönliche Einstellungen und gespeicherte Nutzerstände gehören nicht zur Bereinigung.

### T11.3 Prüfung nach dem Aufräumen

1. Führe node --test am endgültigen bereinigten Stand aus.
2. Lade alle vier Seiten neu; prüfe Konsole, fehlende Ressourcen, Formelsatz, Bilder, Hauptnavigation und Dokumentationslinks.
3. Prüfe gezielt die geänderten Verweise nach Datei-Umzügen: README, Bildverzeichnis, Quellenübersicht, Testwerkzeuge und historische Querverweise.
4. Prüfe Drucken erneut, falls CSS, Druckvorlagen, referenzierte Bilder oder Schriften durch die Bereinigung verändert wurden. Frühere Belege müssen zur endgültigen Fassung passen.
5. Dokumentiere kurz, was entfernt, zusammengeführt oder archiviert wurde und warum. Benenne bewusst erhaltene Altbestandteile nur bei einem konkreten Zweck, etwa Lernstand-Migration.
6. T08 bildet die abschließende Gesamtabnahme. Die Prüfungen dieses Pakets und T08 dürfen in einem gemeinsamen abschließenden Durchlauf erfolgen; wiederhole unveränderte erfolgreiche Prüfungen nicht ohne Anlass.

Abnahme T11: Keine entbehrlichen Zwischenprodukte im aktiven Projektbaum, keine neuen kaputten Verweise, Originalbilder erhalten, aktuelle Dokumentation klar erkennbar, Tests nach der Bereinigung bestanden. Erforderliche Abnahmebelege und Lizenzdateien bleiben erhalten.

## T08 — Aussagekräftig testen und ehrlich übergeben

### Automatisierte Prüfungen

1. Führe den bestehenden Testlauf nach den Änderungen und der abschließenden Bereinigung aus. Ändere Tests nur, wenn sie alte, jetzt ausdrücklich ersetzte Anforderungen festschreiben. Schwäche fachliche oder Speicheranforderungen nicht ab, nur um Grün zu erhalten.
2. Ergänze gezielte Verhaltenstests für:
   - tatsächlich eingefügte Schrittschaltflächen und Beschränkung auf die aktive Phase;
   - den onStateChange-Callback der eingebetteten Fehlerkontrolle;
   - sofortige Aktualisierung der Phasen nach Prüfung und nach ungültiger Pflichtänderung;
   - freiwillige falsche Antwort ohne Einfluss auf den Pflichtabschluss, einschließlich erneutem Rendern;
   - Migration mit fehlenden/falschen neuen Pflichtantworten und Reparatur schon migrierter Stände;
   - einmaligen Hinweis für tatsächlich betroffene Altstände und Erhaltung von charging-model;
   - richtige task→course-Zuordnung und internen Rückkontext;
   - sichtbaren, gültigen Dokumentationsabschnitt und ungültigen section-Parameter;
   - genau neun Datentabellenzeilen im Auflade-Grundweg und echte Analysewerte in einer geöffneten Ergebnishilfe;
   - richtige, nie geprüfte Übungsantworten ohne Abschlussmeldung und Änderung eines geprüften Werts;
   - erhaltene mathematische Referenzen, Dezimalkomma/Dezimalpunkt/Unicode-Minus und saubere TeX-Zeichen.
3. Verwende tatsächliche Datenmodelle und realistische Auswahlwerte. Bloße Regex-Prüfungen auf Funktionsnamen, CSS-Klassen oder das Wort „vereinbar“ sind kein Nachweis der Bedienungsfunktion.

### Browser und Geräte

1. Prüfe alle vier Seiten und alle fünf Lernwege in einem tatsächlich gerenderten Browser. Erfasse Konsolen-/Seitenfehler.
2. Prüfe Breiten 375, 512, 768, 980, 1024 und 1280 px sowie die unmittelbare Umgebung des tatsächlich verwendeten Layout-Breakpoints.
3. Prüfe 200 % Browserzoom tatsächlich. CSS mit rem-Einheiten ist nur eine Voraussetzung.
4. Gehe zentrale Aktionen mit der Tastatur durch: Navigation, Auswahl, Felder, Prüfung, Details, Bilddialog und Rückkehr. Prüfe sichtbaren Fokus und erreichbare Beschriftungen.
5. Screenshots erst nach nachweisbar sichtbarer Zielüberschrift und fertigem beziehungsweise ausdrücklich verfügbarem Formelsatz erzeugen. Das aktuelle capture-all.cjs wartet darauf nicht. Dateiexistenz und Dateigröße sind keine Abnahme.
6. Öffne jeden Screenshot vor seiner Verwendung als Beleg. Die fragliche Karte oder Sektion muss tatsächlich sichtbar sein. Ein nahezu leeres Bild gilt als fehlgeschlagene Belegerstellung und darf kein „bestanden“ begründen.
7. Prüfe die in der Anleitung verwendeten Befehle in der tatsächlich eingesetzten deutschsprachigen GeoGebra Rechner Suite: Punktformel, TrendPot, Q=Trendlinie(...), =Q(A1), U(x)=TrendExp(...), =U(A1), Mittel/Mittelwert, =a und die Abweichungsformeln.
8. Prüfe insbesondere, ob a=Mittel(...) in dieser Version wirklich funktioniert oder der offizielle Befehl Mittelwert verwendet werden muss. Übernimm einen kurzen beobachteten Namen nicht ohne Eingabetest in alle Materialien.
9. Prüfe Achsenskalierung und Ausfüllgriff als reale Bedienungsschritte. Ersetze ungetestete Touch-Gesten nicht durch behauptete Erfolgsberichte.
10. Ein echtes iPad nach Möglichkeit prüfen: Split View, geöffnete Tastatur, Kopieren, Ausfüllen und PDF-Sicherung. Simulierte Breite und physisches Gerät getrennt benennen.

### Abschlussunterlagen

1. Aktualisiere README.md und BILDVERZEICHNIS.md anhand des endgültigen Inhalts.
2. Korrigiere UMSETZUNGSSTATUS.md und ABNAHMEPROTOKOLL.md. Erhalte die Nachvollziehbarkeit der früheren Abnahme, aber entferne beziehungsweise berichtige unbelegte aktuelle „bestanden“-Aussagen.
3. Verwende pro Prüfung ausschließlich diese Zustände: bestanden mit Beleg; fehlgeschlagen mit Fehlerbeschreibung; nicht durchgeführt mit Ursache; entfällt mit Begründung.
4. Dokumentiere Testbefehl, Resultat, Browser/GeoGebra-Version, tatsächliche Bildschirmbreiten, vorhandene PDFs und konkrete Restpunkte.
5. Beschreibe fehlende echte Bilder oder Geräteprüfungen mit Datei/Schritt und nächster erforderlicher Handlung. Behaupte keine vollständige Gesamtabnahme, solange die entsprechenden Nachweise fehlen.
6. Übergib einen kurzen Abschlussbericht: Welche Fehler behoben wurden, wie der Lernfluss gekürzt wurde, welche Prüfungen wirklich gelaufen sind und welche Restpunkte offen bleiben. Ergänze die Liste der entfernten, zusammengeführten und archivierten Altlasten aus T11.

## Definition of Done

- Alle erforderlichen Schrittschaltflächen sind sichtbar und bedienbar; keine konkurrierende vollständige Kapitel-Seitenleiste.
- Gemeinsame Fehlerkontrolle ohne Laufzeitfehler, genau einmal ausführlich pro Lernweg, sofort korrekter geteilter Status.
- Freiwillige Antworten beeinflussen keinen Pflichtabschluss und erhalten korrektes Feedback.
- Alte und bereits migrierte Lernstände bleiben erhalten; unzutreffende Abschlüsse werden gezielt berichtigt.
- Aufladung konsistent mit neun Punkten; der zehnte Wert bleibt eine getrennte freiwillige Untersuchung.
- Selbstständige Übungen geben die gesuchten Ergebnisse nicht offen vorweg und führen zum richtigen Muster.
- Die fünf Lernwege verwenden konsistente kurze Anleitungen, Fachsprache und physikalische Einheiten.
- Alle Schülertexte sind redaktionell geprüft; die genannten Auftrags- und Meta-Hinweise sind entfernt, fachlich notwendige Grenzen bleiben erklärt.
- GeoGebra-Herkunft ist knapp gekennzeichnet; Quellen und zutreffende Lizenzen verwendeter Materialien sind nachvollziehbar.
- Höchstens ein offenes Arbeitsbild je Schritt; keine unmarkierten Scheinaufnahmen oder aktive falsche Vorzeichenbilder.
- Dokumentationsabschnitte, Rücksprünge und Ausdrucke funktionieren.
- Projekt nach T11 bereinigt; Originalbilder, Lizenzdateien und notwendige Prüfbelege erhalten, Dokumentation und Verweise aktualisiert.
- Bestehende und neue notwendige Tests bestanden; tatsächliche Browser-/Drucknachweise vorhanden oder ausdrücklich als noch nicht geprüft dokumentiert.

## Primärquellen für die fachliche Gegenprüfung

Die Quellen für Markenkennzeichnung und Materialien stehen direkt in T10. Prüfe sie bei einer späteren Umsetzung erneut auf Aktualität.

- [GeoGebra: TrendPot](https://geogebra.github.io/docs/manual/de/commands/TrendPot/): Potenzansatz und positive Koordinaten.
- [GeoGebra: TrendExp](https://geogebra.github.io/docs/manual/de/commands/TrendExp/): Exponentialansatz; ein Zeitpunkt null ist zulässig.
- [GeoGebra: Trendlinie](https://geogebra.github.io/docs/manual/de/commands/Trendlinie/): lineare Anpassung in y-Richtung.
- [GeoGebra: Statistik-Befehle](https://geogebra.github.io/docs/manual/de/commands/Statistik_%28Befehle%29/): offizielles Verzeichnis, unter anderem Mittelwert.
- [NIST: Modellprüfung](https://www.itl.nist.gov/div898/handbook/pmd/section4/pmd44.htm): Muster in Residuen als zusätzliche Beurteilung; kein Auftrag für einen neuen Statistik-Pflichtkurs.

## Kurzer Startprompt

```text
Arbeite den Auftrag in GPT_5_6_TERRA_ARBEITSAUFTRAG.md vollständig im bestehenden Projekt ab. Lies zuerst NACHPRUEFUNG_2026-10-01.md und beachte die dort belegten Fehler. Setze alle Arbeitspakete einschließlich T09, T10 und T11 tatsächlich um: Repariere zuerst Bedienung und Speicherung, vereinheitliche anschließend Lernaufbau, Fachsprache und Darstellung, entferne die auftragsbezogenen Meta-Hinweise und verbessere die Klausurdokumentation.

Die vorhandenen echten GeoGebra-Screenshots habe ich selbst aufgenommen. Übernimm das als Herkunftsangabe. Unterscheide sie von programmatisch erzeugten Schemabildern und prüfe ihre fachliche Richtigkeit sowie Lesbarkeit.

Erhalte gültige Lernstände, Datensätze, mathematische Referenzwerte und Originalbilder. Räume nach der Überarbeitung das Projekt gemäß T11 auf: Entferne belegbar unbenutzten Code und entbehrliche Zwischenprodukte, archiviere historische Unterlagen übersichtlich und aktualisiere alle betroffenen Verweise. Prüfe anschließend den endgültigen bereinigten Stand gemäß T08.

Liefere eine vollständig umgesetzte lokale Überarbeitung mit kurzem Änderungs- und Prüfbericht sowie einer Liste der Bereinigungen. Benenne nicht durchführbare Prüfungen und offene Punkte konkret. Führe routinemäßige Änderungen innerhalb dieses Auftrags selbstständig aus. Veröffentliche oder deploye das Projekt nicht.
```
