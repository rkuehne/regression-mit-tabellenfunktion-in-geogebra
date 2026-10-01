**Projektprüfung: GeoGebra-Trainer**

Stand: 1. Oktober 2026

Der Trainer besitzt bereits eine brauchbare gemeinsame Grundlage: fünf datengetriebene Lernwege, eine einheitliche Lernkarten-Vorlage, gezielte Rückmeldungen, lokale Formeldarstellung und eine Klausurdokumentation mit fünf wiederkehrenden Abschnitten. Der Eindruck einer zusammengesetzten Anwendung entsteht vor allem durch unterschiedliche Aufgaben, Schritttiefen und Bildquellen. Der Kern sollte deutlicher werden: Eine Messreihe mit GeoGebra selbstständig auswerten und das Ergebnis nachvollziehbar dokumentieren.

Geprüft wurden die drei HTML-Seiten, die Lernweg- und Dokumentationsdaten, Darstellung und Navigation im Quelltext, die mathematischen Funktionen, die vorhandenen Tests und ausgewählte Originalbilder. Alle 57 vorhandenen Tests bestehen. Die zentralen Regressionsparameter und Kapazitätswerte wurden zusätzlich anhand der Rechenfunktionen nachvollzogen. Eine laufende Browseransicht stand nicht zur Verfügung. Aussagen über die gesamte sichtbare Seite sind daher aus HTML/CSS abgeleitet; Bildvergleiche beruhen auf tatsächlich geöffneten Bilddateien. Ein vollständiger Bedienungs- und Drucktest auf dem iPad bleibt offen.

**Was den Kurscharakter und die Uneinheitlichkeit erzeugt**

- Vier Ziele werden gleichzeitig verfolgt: Software bedienen, physikalische Modelle verstehen, Messunsicherheiten beurteilen und Klausurlösungen schreiben. Es fehlt eine dauerhaft erkennbare Zuordnung zu diesen Aufgaben.
- Startseite, Lernwegauswahl, aktueller Lernweg und Lernnachweis stehen auf derselben langen Seite. Der Lernnachweis erhält dadurch viel Gewicht, obwohl er für das selbstständige Auswerten eine Nebenfunktion ist.
- Die Seite zeigt gleichzeitig eine Etappenübersicht und eine Kapitelnavigation. Die Etappen haben je nach Weg sechs bis neun Einträge, die Kapitel acht bis elf. Die Etappen sind weder mit Kapitelgruppen noch mit dem aktuellen Arbeitsschritt verknüpft.
- Im Erklärmodus stehen Orientierung, Begriffsliste und Rechenbeispiel vor der eigentlichen Arbeitsanweisung. Der Kurzmodus verbirgt nur Begriffe und Rechenbeispiel. Orientierung, Fehlertipp, Merksatz und sämtliche Kontrollfelder bleiben vorhanden.
- Gemeinsam verwendete Inhalte werden mehrfach erklärt. Die verpflichtende Fehlerseite fügt zusätzlich einen Seitenwechsel mit eigener Einführung, Anwendungen, Formulierungsbausteinen und Prüfungen ein.
- Die Bilder mischen echte GeoGebra-Aufnahmen, schematische Nachbildungen und historische Aufnahmen mit abweichender Rechnung.

Fundstellen: index.html:33, index.html:141, index.html:263; app.js:136, app.js:534, app.js:583; style.css:121.

**Die fünf Wege im Vergleich**

Die Zahlen beziehen sich auf die Lernwegdaten. Die zusätzliche gemeinsame Fehlerkontrolle ist nicht mitgezählt.

| Lernweg | Kapitel | Kontrollfelder | Einschätzung und konkreter Ansatz |
| --- | ---: | ---: | --- |
| Coulomb / Potenzregression | 10 | 29 | Vergleichsweise ausführliche Bedienungshilfe mit echten Aufnahmen. Vorbereitung sowie erster Punkt und Ausfüllen sind besonders kleinschrittig. Als Grundlage für die gemeinsame Bedienungshilfe geeignet; Einstieg und Wiederholungen kürzen. |
| Kondensator / Potenzregression | 8 | 21 | Der proportionale Sonderfall und die Grenze der Interpretation des freien Faktors werden gut erklärt. Exponent heißt im Pfad meist b, in der gemeinsamen Fehlerseite und im Urteil n. Bilder sind schematische Nachbildungen. Notation und Bildstandard vereinheitlichen. |
| Kondensator / Konstantenverfahren | 8 | 22 | Anschaulicher Zugang über Q/U und sinnvolle Umrechnung in pF. Mittelwert und Eintragen des Bezugswerts sind zwei eigene Kapitel. Gemeinsam erklären; als alternatives Auswertungsverfahren kennzeichnen, da hier keine Regression berechnet wird. |
| Kondensator / lineare Regression | 8 | 22 | Die Unterscheidung linear/proportional und die Erklärung der Extrapolation sind besonders brauchbar. Der Übergang zwischen einer GeoGebra-Geraden Q und der Schreibweise Q(x) ist sprachlich nicht durchgehend sauber. |
| Kondensator / Exponentialregression | 11 | 33 | Fachlich der umfangreichste Weg. Erst werden zehn Punkte ausgewertet, danach neun. Parameter, Zeitmaße, Bilder und Datenauswahl wechseln. Das Kapitel Datenprüfung enthält fünf Bilder. Dieser Weg benötigt die stärkste Überarbeitung. |

Einheitlichkeit sollte sich auf Navigation, Begriffe, Darstellung und Arbeitsphasen beziehen. Unterschiedliche fachliche Inhalte dürfen unterschiedliche Teilaufgaben benötigen. Alle Wege auf dieselbe Zahl von Kapiteln zu bringen wäre kein ausreichendes Qualitätsziel.

**Empfohlene Gliederung**

Drei erkennbare Bereiche würden das ursprüngliche Ziel besser abbilden:

| Bereich | Aufgabe | Inhalt |
| --- | --- | --- |
| Regression lernen | Einen vollständigen Arbeitsweg mit Hilfe durchführen | Geführte Beispiele, GeoGebra-Anweisungen, passende Bilder und wenige gezielte Kontrollen |
| Selbstständig auswerten | Den Arbeitsweg auf neue Daten übertragen | Eine kompakte Befehlsübersicht und eine neue Messreihe je Regressionsart; Hilfen schrittweise aufdecken |
| Für die Klausur dokumentieren | Eine nachvollziehbare Auswertung schreiben | Das vorhandene Schema aus fünf Abschnitten, Musterdokumentationen und Papierübungen |

Begriffshilfe und Messunsicherheiten bleiben an den passenden Stellen erreichbar. Der Lernnachweis wird eine optionale Ausgabe am Ende des Lernbereichs.

Eine gemeinsame schmale Navigation sollte auf allen Seiten dieselben Bereiche zeigen. Der aktuelle Bereich und der gewählte Lernweg müssen erkennbar bleiben. Ein Rücksprung sollte möglichst zum zuletzt bearbeiteten Arbeitsschritt führen.

Für die Auswahl gibt es zwei sinnvolle Ordnungen:

- Wenn das Hauptziel die GeoGebra-Bedienung ist: zuerst lineare, Potenz- oder Exponentialregression auswählen; anschließend das physikalische Beispiel. Das Konstantenverfahren erscheint als ergänzender Vergleich.
- Wenn der Trainer eng an die Unterrichtsversuche gebunden bleibt: die vorhandene Gruppierung nach Coulomb, Ladung/Spannung und Aufladung beibehalten. Bei Q/U deutlich „Drei alternative Auswertungen derselben Messreihe“ schreiben, damit kein Eindruck entsteht, alle drei seien Pflicht.

Für den beschriebenen Wunsch nach einem Trainer spricht die erste Ordnung. Die zweite erlaubt eine kleinere Überarbeitung.

**Gemeinsamer Aufbau eines Lernwegs**

Die vorhandenen fünf Abschnitte der Klausurdokumentation eignen sich als Grundlage für einen durchgehenden Arbeitsablauf:

1. Daten vorbereiten: Größen, Einheiten, Tabellenwerte und Punktliste.
2. Modell berechnen: passende Modellform und GeoGebra-Befehl.
3. Parameter deuten: mathematische Ausgabe in physikalische Größen übersetzen.
4. Abweichungen prüfen: Modellwerte, relative Abweichungen und die vereinbarte Unsicherheitsbetrachtung.
5. Ergebnis formulieren: Modell, Ergebnis, Begründung und Grenze der Aussage.

Innerhalb einer Phase sind mehrere kurze Schritte möglich. Der Lernweg muss nicht exakt fünf Bildschirme haben. Die Etappenübersicht sollte diese fünf Phasen mit dem aktuellen Schritt verbinden; alternativ reicht eine einzige verständliche Navigation.

Für jede Lernkarte:

- Oben eine konkrete Aufgabe und der benötigte GeoGebra-Befehl.
- Direkt dazu ein aktuelles Bild des tatsächlich erwarteten Zustands.
- Eine kurze Beschreibung, woran ein richtig ausgeführter Schritt erkennbar ist.
- Ein bis zwei zielgerichtete Kontrollen.
- Aufklappbare Erklärung, Rechenbeispiel und Fehlerhilfe.

Bei einem Verständnis-Schritt ohne Softwareeingabe kann die konkrete Aufgabe beispielsweise lauten: „Erkläre, warum bei direkter Proportionalität der Exponent 1 erwartet wird.“ Zusätzliche Begriffskästen müssen nicht in jedem Schritt dieselbe Länge haben. Ein Satz zur Bedeutung der Handlung kann immer sichtbar bleiben.

**Bestätigte Befunde mit höherer Priorität**

**1. Kontrollfelder geben die Lösungen weitgehend vor.**

In den fünf Lernwegen gibt es insgesamt 67 numerische Felder. Sämtliche Platzhalter sind als erwartete Ergebniswerte angelegt; 66 werden bereits vom aktuellen Parser als richtige Antworten akzeptiert. Der verbleibende Fall scheitert am Unicode-Minuszeichen, obwohl der gezeigte Zahlenwert ebenfalls der erwartete ist.

Das erschwert die Einschätzung, ob jemand den Schritt in GeoGebra ausgeführt hat. Dazu kommen Rechenbeispiele und Merksätze mit denselben Ergebnissen. Das ist als Anleitung hilfreich, als Nachweis selbstständiger Kompetenz aber wenig aussagekräftig.

Empfehlung: neutrale Platzhalter verwenden und Referenzwerte über eine Hilfe oder erst nach dem Prüfversuch anbieten. Im angeleiteten Beispiel dürfen Ergebnisse sichtbar sein, wenn dieser Zweck ausdrücklich erkennbar ist. Den Abschluss anschließend mit neuen Messdaten und zunächst ohne fertige Befehle prüfen. Dafür genügt eine kleine zusätzliche Aufgabe je Regressionsart; eine umfangreiche neue Kursstruktur ist nicht erforderlich.

Fundstellen: lesson-data.js, insbesondere die check.fields; app.js:405 und app.js:676.

**2. Der Exponentialpfad verwendet Bilder einer anderen Auswertungsphase.**

Die Anleitung fordert zunächst TrendExp(D1:D10). Die Modellwert-Kapitel erwarten deshalb zum Beispiel E1 ≈ 3,47790 V. Die dort eingebundenen Aufnahmen zeigen bereits die Regression der neun Punkte und einen Anfangswert von etwa 3,69258 V. Mehrere frühe Bilder zeigen nur den Bereich bis 80 s, während die Handlungen bis Zeile 10 reichen.

Damit widersprechen sich an einer zentralen Stelle Sollzustand und Bild. Die erste Regression und die ersten Zeitmaße haben zudem keine eigenen Bilder, während das spätere Datenprüfungskapitel fünf Aufnahmen enthält.

Empfehlung: im Grundweg ausschließlich die neun Messpaare von 0 bis 80 s verwenden. Das passt bereits zur Klausurdokumentation. Die zehnte Messung und der Vergleich verschiedener Fits werden eine getrennte Vertiefungsaufgabe. Falls der Ablauf mit zehn Punkten erhalten bleibt, braucht jede Phase passende neue Bilder und eine erkennbare Kennzeichnung der jeweiligen Datenauswahl.

Fundstellen: lesson-data.js:1150, lesson-data.js:1172, die Schritte charging-predictions und charging-data-check.

**3. Der Ausschluss des letzten Messwerts ist zu stark begründet.**

Der Pfad behauptet, eine große Modellabweichung zusammen mit dem Sprung von 80 auf 100 s rechtfertige den Ausschluss. Ein unregelmäßiger Zeitabstand ist jedoch kein eigenständiger Messfehler: Eine Regression kann auch ungleichmäßig verteilte Zeitpunkte auswerten. Die bessere Anpassung nach Weglassen eines Punktes belegt ebenfalls nicht, dass der Punkt falsch ist.

Hier liegt ein Widerspruch zum eigenen Glossar vor, das davor warnt, Daten wegen schlechter Modellpassung zu entfernen. Ohne geklärtes Originalprotokoll bleiben beide Auswertungen zunächst begründungsbedürftig. NIST unterscheidet ausdrücklich zwischen nachgewiesen fehlerhaften Daten und auffälligen Werten unbekannter Ursache. [NIST: Detection of Outliers](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h.htm)

Empfehlung: „Auffälligen Messwert untersuchen“ statt „prüfen und ausschließen“. Rohdaten erhalten, Auswertungen mit und ohne den Punkt vergleichen und den Ausschluss nur bei einer zusätzlichen sachlichen Begründung als endgültiges Ergebnis darstellen. Die Aussage „neun fachlich gesicherte Messwerte“ vermeiden, wenn die Sicherheit lediglich aus der Modellpassung folgt. Die Handlung „Lösche A10:F10“ durch eine begrenzte Regressionsliste bei unveränderten Rohdaten ersetzen.

Fundstellen: lesson-data.js:1239–1278; index.html:364.

**4. Die Übungstexte der Klausurdokumentation enthalten beschädigte Formelzeichen.**

Die Mustertexte verwenden überwiegend String.raw und werden korrekt als TeX gespeichert. Verschiedene Schreibaufträge, Checklisten, Starthilfen und die Exponential-Einführung verwenden dagegen normale JavaScript-Zeichenketten mit einfachen Backslashes.

Beim Einlesen verschwinden dadurch Formelbegrenzer und Befehle. Tatsächlich gespeicherte Beispiele sind „(Q=Ccdot U)“, „(10,%)“ und „(Delta U(t))“. Bei \tau wird \t zum Tabulator, sodass statt des Formelzeichens eine Einrückung mit „au“ entsteht. Diese Felder werden unmittelbar in die Übungs- und Druckansichten eingesetzt. Die vorhandenen Tests decken diese Fehler nicht ab.

Empfehlung: sämtliche formelhaltigen Zeichenketten einheitlich speichern; anschließend Muster, Übungsmodus, aufgeklappte Hilfen und Arbeitsblatt überprüfen.

Fundstellen: documentation-data.js:49, :123, :144, :243, :274–276, :295–296; dokumentation.js:74.

**5. Zwei technische Darstellungs- und Eingabebefunde.**

- Die Etappenübersicht erzeugt für Nummer und Beschriftung jeweils ein span. Die Regel .learning-map li span weist beiden dieselbe feste Breite und Höhe von 26 px und die Kreisgestaltung zu. Der Selektor sollte nur die Nummer treffen. Die sichtbaren Auswirkungen müssen im Browser überprüft werden. Fundstellen: style.css:124; app.js:583.
- Ein eingegebenes mathematisches Minus „−“ wird nicht akzeptiert. parseLocaleNumber("−0,02836") liefert NaN, während "-0,02836" korrekt erkannt wird. Genau das nicht akzeptierte Zeichen erscheint im Platzhalter und in den Erklärungen. Fundstellen: regression.js:35; lesson-data.js:1167.

**Fachliche und sprachliche Prüfung**

Die Fachsprache ist an vielen Stellen sorgfältig: Messwert und Modellwert werden unterschieden, Linearität und Proportionalität getrennt und Beweisbehauptungen vermieden. Diese Stärken sollten erhalten bleiben. Folgende Punkte verdienen eine Überarbeitung:

| Thema | Befund | Empfehlung |
| --- | --- | --- |
| Potenzexponent | b und n wechseln zwischen Lernweg, Fehlerseite und Zusammenfassung. | Potenzmodelle einheitlich a·xⁿ schreiben; b für den linearen Achsenabschnitt verwenden. |
| Exponentialparameter | k wird häufig „Exponent“ genannt; der gesamte Exponent ist k·t. | „Exponentialparameter k in s⁻¹“ verwenden und seine Wirkung erklären. |
| Messfehler / Messunsicherheit | Angenommene Geräteunsicherheiten werden vielfach „Messfehler“ genannt. | Messabweichung, Unsicherheit und Eingabefehler unterscheiden. Ein eingeführter schulischer Methodenname kann bestehen bleiben. |
| Modellabweichung | Prozentabweichung und größter Betrag sind grundsätzlich verständlich. | Die Bezugsgröße und Vorzeichenkonvention überall identisch zeigen; eine historische Gegenformel nicht als Arbeitsbild einsetzen. |
| Physikalische Formel | In der Klausurdokumentation sind normierte Größen mit Einheiten gut dargestellt. Im Lernweg stehen häufig verkürzte Zahlenformeln. | Den Übergang von Zahlenfunktion zu physikalischer Formel bereits im Lernweg zeigen; nicht erst in der Klausurhilfe einführen. |
| Bewertung von Daten | Wörter wie „verbesserte“, „bereinigte“ und „fachlich gesicherte“ legen ein günstiges Urteil nahe. | Erst Datenauswahl und Regressionsunterschiede sachlich beschreiben, dann begründet beurteilen. |
| Wiederholte Warnungen | „Kein Beweis“ erscheint in vielen Kästen und Auswahlantworten. | Den Grund einmal verständlich erklären und bei der abschließenden Beurteilung anwenden. |
| Lernerfolg | Kompetenzformulierungen werden aus gelösten Kontrollen zum bekannten Beispiel erzeugt. | Bearbeitungsstand und selbstständige Anwendung unterscheidbar darstellen. |

Die metrologische Unterscheidung von Messabweichung und Messunsicherheit ist im VIM beschrieben. [Messabweichung](https://jcgm.bipm.org/vim/en/2.16.html), [Messunsicherheit](https://jcgm.bipm.org/vim/en/2.26.html)

**Die Methode des größten Einzelfehlers braucht eine klar begrenzte Rolle.**

Der Trainer kennzeichnet bereits, dass es sich um eine vereinfachte schulische Methode handelt. Das ist hilfreich. Aus dem größten relativen Fehler einer Eingangsgröße folgt aber nicht allgemein eine passende Unsicherheit für alle abgeleiteten Größen oder Regressionsparameter. Die Unsicherheitsfortpflanzung berücksichtigt den Zusammenhang zwischen Eingangs- und Ergebnisgrößen. Daraus folgt insbesondere: Die relative Exponentabweichung und der Quotient |b|/Qmin sind nicht automatisch statistisch abgesichert, nur weil sie unter 10 % liegen. Dies ist eine fachliche Einordnung der im Projekt verwendeten Vergleichsregel. [NIST: Law of Propagation of Uncertainty](https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-law-propagation-uncertainty)

Empfehlung: Wenn diese Methode im Unterricht verbindlich ist, sie als vereinbarte schulische Vergleichsregel erhalten und ihre Reichweite einmal zentral erläutern. Statt einer allgemeingültigen Aussage „kann durch Messfehler erklärt werden“ möglichst „liegt unter der hier verwendeten schulischen Vergleichsgrenze“ schreiben. Weiterführende statistische Verfahren müssen nicht in den Grundtrainer aufgenommen werden.

Beim Exponentialmodell ist ΔU eine Differenz zweier Spannungen. Wenn U₀ selbst unsicher ist, muss die Unsicherheit dieser Differenz beide Eingangswerte berücksichtigen. Ob 0,001 V bereits für die Differenz gilt oder nur für eine einzelne Spannungsmessung, bleibt zu klären.

Zudem verwendet der Lernweg 0,251 V als kleinsten protokollierten Differenzwert und erhält 0,40 %, während die Klausurdokumentation für die ausgewählten neun Punkte 0,332 V und 0,30 % verwendet. Der Lernweg erwähnt den Grund bereits in der Fehlerhilfe. Trotzdem wechseln damit die Bezugsdaten zwischen zwei eng verbundenen Ausgaben. Eine einheitliche Datenauswahl würde diese zusätzliche Erklärung vermeiden; die schulische 10-%-Grenze bleibt in beiden Rechnungen gleich.

**Bild- und Gestaltungsstandard**

Die geöffneten Coulomb- und Aufladebilder sind echte GeoGebra-Aufnahmen. Die geöffneten U-Q-Bilder sind schematische Nachbildungen mit Buchstaben statt echter Werkzeugsymbole und teilweise ausgeschriebener Potenzsyntax. Das erklärt einen wesentlichen sichtbaren Qualitätsunterschied.

Empfehlung:

- Für Bedienungshandlungen möglichst echte Aufnahmen derselben App, Sprache und Version verwenden.
- Schematische Bilder ausdrücklich als Schema kennzeichnen und hauptsächlich für mathematische Erklärungen einsetzen.
- Die gleiche Handlung gleich stark zuschneiden: relevante Zelle, Eingabe oder Ergebnis; keine großen leeren Programmflächen.
- Einheitliche Markierungen und kurze Bildunterschriften verwenden.
- Ein Arbeitsbild pro Handlung bevorzugen; weitere Bilder als ergänzende Hilfe anbieten.
- Historische Bilder mit falscher Vorzeichenkonvention durch passende aktuelle Bilder ersetzen.
- Grundlagen, Aufgaben und Hinweise durch Hierarchie und Abstände ordnen; nicht jede Aussage als gleich auffälligen farbigen Kasten darstellen.
- Die großen Seitenköpfe im Arbeitsbereich reduzieren, besonders bei halbem iPad-Bildschirm.

Als lokale Vergleichsbilder geprüft: assets/steps/05-potenzregression.png, assets/steps/uq/10-potenzregression-u-q.png und assets/steps/charging/09-historische-abweichungsformel.png.

**Klausurdokumentation erhalten und besser anbinden**

Die Dokumentation ist ein sinnvoller Teil des Projekts. Ihr wiederkehrendes Schema und die Kombination aus Muster, Schreibauftrag, Hilfe und Selbstkontrolle sind bereits geordnet. Sie benötigt vor allem Anschluss an denselben Arbeitsablauf und korrekt gesetzte Übungstexte.

- Am Ende jeder Arbeitsphase kurz zeigen, welche Information später in die Klausurlösung gehört.
- Im Klausurbereich zunächst das fünfteilige Schema und das zum Lernweg passende Beispiel zeigen.
- Je nach Aufgabe erforderliche und zusätzliche Angaben unterscheiden. Die Halbwertszeit ist bereits passend unter „Nur wenn gefragt“ eingeordnet.
- Einen vollständig dokumentierten Lösungsweg anbieten; die Schreibübung nutzt dieselben Abschnitte.
- Den Lernnachweis mit Fortschritt und Häkchen vom fachlichen Klausurmuster klar unterscheiden.
- Den Gebrauch normierter Größen im Lernweg vorbereiten.
- In allen Mustern prüfen, ob der eigene Anspruch erfüllt wird, eine eingesetzte Abweichungsrechnung zu zeigen. Einige Muster nennen nur den Prozentwert, während Coulomb und Exponentialregression eine vollständige eingesetzte Rechnung enthalten.
- Alle Ausdrucke auf ausreichende Schriftgröße und saubere Umbrüche prüfen. Das aktuelle Musterlayout verwendet stellenweise 7,6 pt.

Fundstellen: dokumentation.html:29; documentation-data.js; style.css:519–525.

**Was zusätzlich geprüft werden sollte**

| Prüfung | Konkrete Aufgabe | Was sie klärt |
| --- | --- | --- |
| Selbstständige Anwendung | Neue Messreihe in einer leeren GeoGebra-Datei auswerten, zunächst ohne fertigen Befehl. | Ob ein gelernter Ablauf auf neue Daten übertragen wird. |
| Veränderte Datenmenge | Sieben statt fünf oder sechs Messpaare verwenden. | Ob Zellbereiche verstanden werden. |
| Grafische Darstellung | Alle Punkte und den Fit sichtbar machen, Achsen den Größen zuordnen und sinnvolle Ausschnitte wählen. | Die aktuellen Handlungen setzen eine passende Graphansicht weitgehend voraus, leiten ihre Einrichtung aber kaum an. |
| Voraussetzungen der Methode | Nullwerte, negative Werte, konstante x-Werte und nichtpositive Spannungsdifferenzen prüfen. | Ob ein nicht berechenbarer Fit von einer ungeeigneten Modellannahme unterschieden wird. |
| Rundung | Mit typischen GeoGebra-Anzeigeeinstellungen arbeiten. | Ob ausreichend Stellen abgelesen werden können und die Kontrolltoleranzen zur Anleitung passen. |
| Modellverständnis | Dieselben Q-U-Daten mit zwei Verfahren auswerten und unterschiedliche Ergebnisse erklären. | Warum verschiedene Verfahren nicht exakt dieselbe Kapazität ergeben müssen. |
| Datenprüfung | Den auffälligen letzten Zeitwert zunächst erhalten und mehrere Auswertungen vergleichen. | Ob Modellkritik und Datenkritik getrennt werden. |
| iPad-Bedienung | Ganzer Bildschirm sowie halbe Breite, Tastatur geöffnet, Hoch- und Querformat. | Bildlesbarkeit, Scrollaufwand, Kopieren, Ausfüllen und Rücknavigation. |
| Schmale Desktopansicht | Breiten knapp oberhalb von 960 px prüfen. | Die Mindestbreiten der zweispaltigen Lernkarte können dort den verfügbaren Platz überschreiten. |
| Zugänglichkeit | Tastatur, Screenreader, Vergrößerung und lange Formeln überprüfen. | Ob Kontrollfelder, Navigation und Formeln verständlich zugänglich bleiben. |
| Druck | Alle fünf Muster und Übungsblätter ausgeben. | Schriftgröße, Umbrüche und vollständig sichtbare Formeln. |
| Lernnachweis | Kontrollen zum bekannten Beispiel mit einer neuen Aufgabe vergleichen. | Welche Kompetenz der Abschluss tatsächlich belegt. |

GeoGebras offizielle Dokumentation bestätigt die verwendeten Modellformen. Bei TrendPot sind positive Koordinaten erforderlich; Trendlinie minimiert die Quadrate der Abstände in y-Richtung. Ein allgemeines „möglichst nahe an den Punkten“ ist als Einstieg verständlich, sollte aber nicht den Eindruck erzeugen, sämtliche Verfahren optimierten dieselbe Art geometrischer Entfernung. [TrendPot](https://geogebra.github.io/docs/manual/de/commands/TrendPot/), [Trendlinie](https://geogebra.github.io/docs/manual/de/commands/Trendlinie/), [TrendExp](https://geogebra.github.io/docs/manual/de/commands/TrendExp/)

Beim Konstantenverfahren sollte der Mittelwert ausdrücklich benannt werden, wie bereits im Klausurmuster mit a=Mittel(C1:C5). Der Lernweg verlässt sich momentan darauf, dass GeoGebra das unbenannte Ergebnis tatsächlich a nennt. Die Wahl eines festen Namens vermeidet eine zusätzliche Fehlerquelle.

**Sinnvolle Reihenfolge der Überarbeitung**

| Priorität | Arbeit | Erwarteter Nutzen |
| --- | --- | --- |
| 1 | Beschädigte Formeln, Unicode-Minus, widersprüchliche Bilder und problematische Ausschlussbegründung korrigieren. | Beseitigt konkrete Verständnishürden und fachlich irreführende Aussagen. |
| 2 | Drei Bereiche und einen gemeinsamen Arbeitsablauf einführen; Lernnachweis an das Ende verschieben. | Klärt Zweck und Orientierung der Anwendung. |
| 3 | Lernkarten auf Aufgabe, Befehl, Bild und kurze Kontrolle konzentrieren; Erklärungen gezielt aufklappbar anbieten. | Reduziert den sichtbaren Umfang ohne Verlust nützlicher Inhalte. |
| 4 | Bildstandard, Notation, Datenauswahl und Übergang zur physikalischen Formel angleichen. | Verbessert Einheitlichkeit und Qualität der Lernpfade. |
| 5 | Eine kurze neue Messaufgabe je Regressionsart ergänzen und mit wenigen Lernenden beobachten. | Prüft das eigentliche Ziel: selbstständig Regressionen durchführen. |

Eine kleinere Überarbeitung kann zunächst die vorhandenen Seiten behalten und nur Navigation, Lernkarten und den Exponentialpfad ordnen. Die mittlere Variante mit drei Bereichen entspricht dem beschriebenen Ziel am besten. Eine stärkere Kürzung auf eine reine Befehlsübersicht wäre nur sinnvoll, wenn das physikalische Verständnis an anderer Stelle im Unterricht zuverlässig vermittelt wird.
