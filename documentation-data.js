export const DOCUMENTATION_SECTION_IDS = Object.freeze([
  "data",
  "geogebra",
  "physical",
  "deviations",
  "conclusion"
]);

const html = String.raw;
const raw = String.raw;

function section(id, title, model, { task, checklist, starter } = {}) {
  return Object.freeze({ id, title, model, task, checklist, starter });
}

export const DOCUMENTATION_EXAMPLES = Object.freeze({
  "inverse-square": Object.freeze({
    id: "inverse-square",
    shortTitle: "Umgekehrtes Quadratgesetz",
    eyebrow: "Coulomb-Versuch · Potenzregression",
    equation: raw`\[F\propto\frac{1}{r^2}\]`,
    introduction: raw`Dieses Beispiel dokumentiert sechs Messpaare aus dem Coulomb-Versuch.`,
    sections: Object.freeze([
      section("data", "1. Daten und Einheiten", html`
        <p>Ich werte sechs Messpaare aus dem Coulomb-Versuch aus.</p>
        <ul>
          <li><strong>A1:A6:</strong> Abstände \(r\) aus der Messwerttabelle eingetragen; Einheit \(\mathrm{cm}\).</li>
          <li><strong>B1:B6:</strong> zugehörige Kräfte \(F\) eingetragen; Einheit \(\mathrm{mN}\).</li>
          <li><strong>C1:</strong> <code>=(A1,B1)</code>, bis C6 ausgefüllt → Punkte \((r,F)\).</li>
        </ul>`, {
        task: raw`Halte die beiden Messgrößen, ihre Einheiten und die Punktspalte fest.`,
        checklist: [raw`Messbereich genannt`, raw`A- und B-Spalte mit Einheit genannt`, raw`Punktbildung beschrieben`],
        starter: raw`In Spalte A stehen …, in Spalte B stehen … . Mit … erzeuge ich die Punkte … .`
      }),
      section("geogebra", "2. GeoGebra-Auswertung", html`
        <p>Für die Punkte C1:C6 führe ich eine Potenzregression durch:</p>
        <pre><code>F(x)=TrendPot(C1:C6)</code></pre>
        <p>GeoGebra liefert näherungsweise:</p>
        <p class="display-equation">\[F(x)=28{,}9022\,x^{-2{,}0750}.\]</p>
        <p>Die Funktion <code>F</code> berechnet den Zahlenwert der Kraft; \(x\) steht für den Zahlenwert des Abstands in Zentimetern.</p>`, {
        task: raw`Notiere den GeoGebra-Befehl, den Zellbereich und das Regressionsresultat.`,
        checklist: [raw`Befehl notiert`, raw`Zellbereich C1:C6 genannt`, raw`Exponent angegeben`],
        starter: raw`Mit dem Befehl … werte ich die Punkte … aus. GeoGebra ergibt … .`
      }),
      section("physical", "3. Physikalische Formel", html`
        <p>Damit Einheiten eindeutig bleiben, schreibe ich die Regression mit einem normierten Abstand:</p>
        <p class="display-equation">\[F(r)\approx28{,}9022\,\mathrm{mN}\left(\frac{r}{1\,\mathrm{cm}}\right)^{-2{,}0750}.\]</p>
        <p>Der Klammerausdruck ist einheitenfrei. Der Faktor trägt deshalb die Einheit \(\mathrm{mN}\).</p>`, {
        task: raw`Übertrage die numerische GeoGebra-Funktion in eine Formel mit den physikalischen Größen und Einheiten.`,
        checklist: [raw`\(F(r)\) statt \(F(x)\) verwendet`, raw`Einheit des Faktors angegeben`, raw`Exponent übernommen`],
        starter: raw`Da \(x\) den Abstand \(r\) in Zentimetern darstellt, lautet die physikalische Formel … .`
      }),
      section("deviations", "4. Abweichungen und Vergleich", html`
        <ul>
          <li><strong>D1:</strong> <code>=F(A1)</code>, bis D6 ausgefüllt → Modellwerte.</li>
          <li><strong>E1:</strong> <code>=(B1-D1)/D1*100</code>, bis E6 ausgefüllt → relative Modellabweichungen.</li>
        </ul>
        <p>Die größte Modellabweichung liegt bei \(r=12{,}4\,\mathrm{cm}\):</p>
        <p class="display-equation">\[\frac{0{,}18-0{,}15562}{0{,}15562}\cdot100\,\%\approx15{,}7\,\%.\]</p>
        <p>Der Messwert liegt dort um etwa \(15{,}7\,\%\) über dem Modellwert. Die schulische Vergleichsgrenze beträgt aus der größten angenommenen relativen Messunsicherheit \(0{,}01/0{,}06\cdot100\,\%\approx16{,}7\,\%\).</p>\n        <p>Zusätzlich wird der Regressionswert des Exponenten quantitativ mit dem theoretischen Exponenten verglichen:</p>\n        <p class="display-equation">\[\frac{|-2{,}075-(-2)|}{2}\cdot100\,\%\approx3{,}75\,\%.\]</p>\n        <p>Die relative Exponentabweichung beträgt damit etwa \(3{,}75\,\%\).</p>`, {
        task: raw`Dokumentiere die zwei Formeln für Modellwerte und Abweichungen sowie einen aussagekräftigen Vergleich.`,
        checklist: [raw`D- und E-Spalte beschrieben`, raw`ein Zahlenbeispiel eingesetzt`, raw`15,7 % mit 16,7 % verglichen`],
        starter: raw`Die größte Modellabweichung tritt bei … auf. Der Messwert liegt dort … dem Modellwert.`
      }),
      section("conclusion", "5. Schlussfolgerung", html`
        <p>Die relative Exponentabweichung von etwa \(3{,}75\,\%\) und die größte Modellabweichung von etwa \(15{,}7\,\%\) liegen unter der schulischen Vergleichsgrenze von \(16{,}7\,\%\). Nach der hier verwendeten schulischen Vergleichsregel sind die Abweichungen mit den angenommenen Messunsicherheiten vereinbar. Die Messwerte sind damit mit einem umgekehrten Quadratgesetz vereinbar; sie beweisen den Zusammenhang nicht.</p>`, {
        task: raw`Formuliere eine vorsichtige Aussage zum Modell und nenne zugleich seine Grenze.`,
        checklist: [raw`Exponent erwähnt`, raw`Vergleichsgrenze erwähnt`, raw`nicht als Beweis formuliert`],
        starter: raw`Die Messwerte sind mit … vereinbar, weil … . Ein Beweis folgt daraus nicht, weil … .`
      })
    ])
  }),

  "proportional-power": Object.freeze({
    id: "proportional-power",
    shortTitle: "Direkte Proportionalität · Potenzregression",
    eyebrow: "Kondensator-Versuch · Potenzregression",
    equation: raw`\[Q=C\cdot U\]`,
    introduction: raw`Dieses Beispiel dokumentiert fünf Messpaare eines Kondensatorversuchs.`,
    sections: Object.freeze([
      section("data", "1. Daten und Einheiten", html`
        <p>Ich werte fünf Messpaare eines Kondensatorversuchs aus.</p>
        <ul>
          <li><strong>A1:A5:</strong> Spannungen \(U\) eingetragen; Einheit \(\mathrm{V}\).</li>
          <li><strong>B1:B5:</strong> zugehörige Ladungszahlen \(Q/(10^{-8}\,\mathrm C)\) eingetragen.</li>
          <li><strong>C1:</strong> <code>=(A1,B1)</code>, bis C5 ausgefüllt → Punkte \((U,Q)\).</li>
        </ul>`, {
        task: raw`Beschreibe A-, B- und C-Spalte knapp mit Größen und Einheiten.`,
        checklist: [raw`Spannung mit Volt genannt`, raw`Ladungsskalierung genannt`, raw`Punkte als \((U,Q)\) bezeichnet`],
        starter: raw`In A1:A5 stehen …, in B1:B5 stehen … . Die Eingabe … erzeugt … .`
      }),
      section("geogebra", "2. GeoGebra-Auswertung", html`
        <p>Für die Punkte C1:C5 führe ich eine Potenzregression durch:</p>
        <pre><code>Q(x)=TrendPot(C1:C5)</code></pre>
        <p>GeoGebra liefert:</p>
        <p class="display-equation">\[Q(x)\approx0{,}0393011\,x^{1{,}011566}.\]</p>
        <p><code>Q</code> ist der Funktionsname für die Ladung; \(x\) steht für den Zahlenwert der Spannung in Volt.</p>`, {
        task: raw`Schreibe Befehl, Zellbereich, Faktor und Exponent auf.`,
        checklist: [raw`TrendPot genannt`, raw`C1:C5 genannt`, raw`Exponent 1,011566 notiert`],
        starter: raw`GeoGebra passt mit … an die Punkte … die Funktion … an.`
      }),
      section("physical", "3. Physikalische Formel", html`
        <p>Mit Größen und Einheiten lautet die Regressionsfunktion:</p>
        <p class="display-equation">\[Q(U)\approx0{,}0393011\cdot10^{-8}\,\mathrm C\left(\frac{U}{1\,\mathrm V}\right)^{1{,}011566}.\]</p>
        <p>Der freie Faktor ist hier noch nicht automatisch eine Kapazität: Der Exponent wurde frei bestimmt und ist nicht exakt \(1\).</p>`, {
        task: raw`Formuliere die Regressionsfunktion mit \(Q\), \(U\) und der Ladungseinheit.`,
        checklist: [raw`\(Q(U)\) geschrieben`, raw`Ladungseinheit angegeben`, raw`freien Faktor nicht Kapazität genannt`],
        starter: raw`Da \(x\) die Spannung \(U\) in Volt bezeichnet, schreibe ich … .`
      }),
      section("deviations", "4. Abweichungen und Vergleich", html`
        <ul>
          <li><strong>D1:</strong> <code>=Q(A1)</code>, bis D5 ausgefüllt → Modellwerte.</li>
          <li><strong>E1:</strong> <code>=(B1-D1)/D1*100</code>, bis E5 ausgefüllt → Modellabweichungen.</li>
        </ul>
        <p>Die größte Modellabweichung tritt bei \(U=100\,\mathrm V\) auf (Messwert \(4{,}3\cdot10^{-8}\,\mathrm C\), Modellwert \(Q(100)\approx4{,}1451\cdot10^{-8}\,\mathrm C\)):</p>
        <p class="display-equation">\[\frac{4{,}3-4{,}1451}{4{,}1451}\cdot100\,\%\approx+3{,}74\,\%.\]</p>
        <p>Der Messwert liegt um etwa \(3{,}74\,\%\) über dem Modellwert. Der Exponent liegt um etwa \(1{,}16\,\%\) über \(1\). Aus \(5/50\cdot100\,\%=10\,\%\) und \(0{,}1/2{,}0\cdot100\,\%=5\,\%\) folgt als schulische Vergleichsgrenze \(10\,\%\).</p>`, {
        task: raw`Halte die Modellwert- und Abweichungsspalte sowie die beiden relevanten Vergleiche fest.`,
        checklist: [raw`D und E beschrieben`, raw`1,16 % erwähnt`, raw`3,74 % mit 10 % verglichen`],
        starter: raw`Die größte Modellabweichung beträgt … . Die Abweichung des Exponenten von \(1\) beträgt … .`
      }),
      section("conclusion", "5. Schlussfolgerung", html`
        <p>Die Abweichung des Exponenten von \(1\) und die größte Modellabweichung liegen unter der schulischen Vergleichsgrenze von \(10\,\%\). Nach der hier verwendeten schulischen Vergleichsregel sind beide mit den angenommenen Messunsicherheiten vereinbar. Die Daten sind mit \(Q\propto U\) vereinbar, beweisen die Proportionalität aber nicht.</p>`, {
        task: raw`Schließe vorsichtig auf Vereinbarkeit mit direkter Proportionalität.`,
        checklist: [raw`beide Abweichungen genannt`, raw`10-%-Vergleich genannt`, raw`kein Beweis behauptet`],
        starter: raw`Da … und … unter \(10\,\%\) liegen, sind die Daten mit … vereinbar.`
      })
    ])
  }),

  "proportional-constants": Object.freeze({
    id: "proportional-constants",
    shortTitle: "Direkte Proportionalität · Konstantenverfahren",
    eyebrow: "Kondensator-Versuch · Konstantenverfahren",
    equation: raw`\[Q=C\cdot U\]`,
    introduction: raw`Dieses Beispiel dokumentiert die Prüfung einer konstanten Kapazität mit fünf Messpaaren.`,
    sections: Object.freeze([
      section("data", "1. Daten und Einheiten", html`
        <p>Ich werte fünf Messpaare eines Kondensatorversuchs aus.</p>
        <ul>
          <li><strong>A1:A5:</strong> Spannungen \(U\) eingetragen; Einheit \(\mathrm V\).</li>
          <li><strong>B1:B5:</strong> Ladungszahlen \(Q/(10^{-8}\,\mathrm C)\) eingetragen.</li>
          <li><strong>C1:</strong> <code>=B1/A1</code>, bis C5 ausgefüllt → fünf Werte für \(Q/U\).</li>
        </ul>`, {
        task: raw`Beschreibe die Messspalten und warum in C der Quotient steht.`,
        checklist: [raw`\(U\) und \(Q\) mit Einheiten genannt`, raw`Ladungsskalierung genannt`, raw`\(Q/U\) als Kapazitätswert erkannt`],
        starter: raw`Aus \(Q=C\cdot U\) folgt … . Deshalb berechne ich in C1 mit … .`
      }),
      section("geogebra", "2. GeoGebra-Auswertung", html`
        <p>Ich bilde den Mittelwert der fünf Quotienten:</p>
        <pre><code>a=Mittel(C1:C5)</code></pre>
        <p>GeoGebra liefert \(a\approx0{,}0415933\) in der Skalierung \(10^{-8}\,\mathrm F\).</p>`, {
        task: raw`Notiere den Mittelwertbefehl und das Ergebnis in der verwendeten Skalierung.`,
        checklist: [raw`Mittelwertbefehl notiert`, raw`C1:C5 genannt`, raw`Skalierung erwähnt`],
        starter: raw`Den Mittelwert der fünf Werte bestimme ich mit … . Es ergibt sich … .`
      }),
      section("physical", "3. Physikalische Formel", html`
        <p>Die mittlere Kapazität beträgt:</p>
        <p class="display-equation">\[C\approx0{,}0415933\cdot10^{-8}\,\mathrm F\approx416\,\mathrm{pF}.\]</p>
        <p>Damit lautet das vereinfachte Modell:</p>
        <p class="display-equation">\[Q(U)\approx(416\,\mathrm{pF})\cdot U.\]</p>`, {
        task: raw`Rechne den Mittelwert in Farad und Pikofarad um und schreibe das Modell auf.`,
        checklist: [raw`Farad angegeben`, raw`Pikofarad angegeben`, raw`Kapazität als Faktor von \(U\) verwendet`],
        starter: raw`Die Zahl in C entspricht … . Daher ist die mittlere Kapazität … .`
      }),
      section("deviations", "4. Abweichungen und Vergleich", html`
        <ul>
          <li><strong>D1:</strong> <code>=a</code>, bis D5 ausgefüllt → mittlerer Kapazitätswert.</li>
          <li><strong>E1:</strong> <code>=(C1-D1)/D1*100</code>, bis E5 ausgefüllt → Abweichungen der Einzelkapazitäten.</li>
        </ul>
        <p>Die größte Abweichung einer Einzelkapazität tritt bei \(U=50\,\mathrm V\) auf (Einzelwert \(C_1=0{,}04000\cdot10^{-8}\,\mathrm F\), Mittelwert \(a\approx0{,}04159\cdot10^{-8}\,\mathrm F\)):</p>
        <p class="display-equation">\[\frac{0{,}04000-0{,}04159}{0{,}04159}\cdot100\,\%\approx-3{,}83\,\%.\]</p>
        <p>Die Einzelkapazität liegt um etwa \(3{,}83\,\%\) unter dem Mittelwert. Die schulische Vergleichsgrenze beträgt \(10\,\%\).</p>`, {
        task: raw`Dokumentiere die Vergleichsspalten sowie den Vergleich von Modellabweichung und schulischer Vergleichsgrenze.`,
        checklist: [raw`D und E beschrieben`, raw`3,83 % mit Richtung genannt`, raw`10-%-Grenze genannt`],
        starter: raw`Die größte Abweichung einer Einzelkapazität beträgt … und liegt … dem Mittelwert.`
      }),
      section("conclusion", "5. Schlussfolgerung", html`
        <p>Die größte Streuung der Einzelkapazitäten liegt unter der schulischen Vergleichsgrenze von \(10\,\%\). Nach der hier verwendeten schulischen Vergleichsregel ist sie mit den angenommenen Messunsicherheiten vereinbar. Die Kapazität darf in diesem Rahmen als näherungsweise konstant angesehen werden. Die Messwerte sind mit \(Q\propto U\) vereinbar, beweisen die Proportionalität aber nicht.</p>`, {
        task: raw`Begründe, warum die Kapazität näherungsweise konstant sein darf.`,
        checklist: [raw`3,83 % und 10 % verglichen`, raw`Konstanz vorsichtig formuliert`, raw`kein Beweis behauptet`],
        starter: raw`Weil die Streuung von … unter … liegt, kann die Kapazität … .`
      })
    ])
  }),

  "proportional-linear": Object.freeze({
    id: "proportional-linear",
    shortTitle: "Direkte Proportionalität · Lineare Regression",
    eyebrow: "Kondensator-Versuch · Lineare Regression",
    equation: raw`\[Q=C\cdot U\]`,
    introduction: raw`Dieses Beispiel dokumentiert eine lineare Regression mit freiem y-Achsenabschnitt.`,
    sections: Object.freeze([
      section("data", "1. Daten und Einheiten", html`
        <p>Ich werte fünf Messpaare eines Kondensatorversuchs aus.</p>
        <ul>
          <li><strong>A1:A5:</strong> Spannungen \(U\) eingetragen; Einheit \(\mathrm V\).</li>
          <li><strong>B1:B5:</strong> Ladungszahlen \(Q/(10^{-8}\,\mathrm C)\) eingetragen.</li>
          <li><strong>C1:</strong> <code>=(A1,B1)</code>, bis C5 ausgefüllt → Punkte \((U,Q)\).</li>
        </ul>`, {
        task: raw`Dokumentiere die Messspalten und die Bildung der Punkte.`,
        checklist: [raw`A- und B-Spalte benannt`, raw`Einheiten genannt`, raw`C als Punktspalte genannt`],
        starter: raw`Ich trage in A … und in B … ein. Daraus erzeuge ich mit … die Punkte … .`
      }),
      section("geogebra", "2. GeoGebra-Auswertung", html`
        <p>Für die Punkte C1:C5 bestimme ich eine Regressionsgerade:</p>
        <pre><code>Q=Trendlinie(C1:C5)</code></pre>
        <p>GeoGebra liefert:</p>
        <p class="display-equation">\[Q(U)=0{,}0408\,U+0{,}12.\]</p>
        <p>Die numerische Gerade verwendet die Ladungsskala \(10^{-8}\,\mathrm C\).</p>`, {
        task: raw`Schreibe GeoGebra-Befehl, Zellbereich und Gleichung auf.`,
        checklist: [raw`Trendlinie genannt`, raw`C1:C5 genannt`, raw`Steigung und Achsenabschnitt notiert`],
        starter: raw`Mit … erhalte ich für die Punkte … die Gerade … .`
      }),
      section("physical", "3. Physikalische Formel", html`
        <p>Die Steigung entspricht in der verwendeten Skalierung einer Kapazität von:</p>
        <p class="display-equation">\[m=0{,}0408\cdot10^{-8}\,\mathrm F=408\,\mathrm{pF}.\]</p>
        <p>Die Gerade mit Einheiten lautet:</p>
        <p class="display-equation">\[Q(U)\approx(408\,\mathrm{pF})\cdot U+1{,}2\cdot10^{-9}\,\mathrm C.\]</p>`, {
        task: raw`Ordne Steigung und Achsenabschnitt physikalisch zu und schreibe die Gerade mit Einheiten.`,
        checklist: [raw`Steigung in pF umgerechnet`, raw`Achsenabschnitt mit Coulomb angegeben`, raw`\(Q(U)\) geschrieben`],
        starter: raw`Die Steigung \(0{,}0408\) entspricht … . Der Achsenabschnitt entspricht … .`
      }),
      section("deviations", "4. Abweichungen und Vergleich", html`
        <ul>
          <li><strong>D1:</strong> <code>=Q(A1)</code>, bis D5 ausgefüllt → Modellwerte.</li>
          <li><strong>E1:</strong> <code>=(B1-D1)/D1*100</code>, bis E5 ausgefüllt → Modellabweichungen.</li>
        </ul>
        <p>Die größte Modellabweichung tritt bei \(U=50\,\mathrm V\) auf (Messwert \(2{,}0\cdot10^{-8}\,\mathrm C\), Modellwert \(Q(50)=2{,}16\cdot10^{-8}\,\mathrm C\)):</p>
        <p class="display-equation">\[\frac{2{,}0-2{,}16}{2{,}16}\cdot100\,\%\approx-7{,}41\,\%.\]</p>
        <p>Der Messwert liegt um etwa \(7{,}41\,\%\) unter dem Modellwert. Der y-Achsenabschnitt entspricht am kleinsten Ladungswert \(0{,}12/2{,}0\cdot100\,\%=6\,\%\). Beide Werte liegen unter der schulischen Vergleichsgrenze von \(10\,\%\).</p>`, {
        task: raw`Dokumentiere Modellabweichung und Anteil des y-Achsenabschnitts am kleinsten Messwert.`,
        checklist: [raw`D und E beschrieben`, raw`7,41 % genannt`, raw`6 % mit 10 % verglichen`],
        starter: raw`Die größte Modellabweichung beträgt … . Der y-Achsenabschnitt macht am kleinsten Messwert … aus.`
      }),
      section("conclusion", "5. Schlussfolgerung", html`
        <p>Die größte Modellabweichung und der Anteil des y-Achsenabschnitts liegen unter der schulischen Vergleichsgrenze von \(10\,\%\). Nach der hier verwendeten schulischen Vergleichsregel sind sie mit den angenommenen Messunsicherheiten vereinbar. Der y-Achsenabschnitt darf näherungsweise vernachlässigt werden, sodass \(Q(U)\approx(408\,\mathrm{pF})\cdot U\) gilt. Die Messwerte sind damit mit \(Q\propto U\) vereinbar. Das ist keine statistische Bestätigung eines exakt verschwindenden y-Achsenabschnitts.</p>`, {
        task: raw`Erkläre, warum der y-Achsenabschnitt im Rahmen dieser Methode vernachlässigt wird.`,
        checklist: [raw`beide Vergleiche genannt`, raw`Näherung formuliert`, raw`keine exakte Bestätigung behauptet`],
        starter: raw`Da … und … unter \(10\,\%\) liegen, darf der y-Achsenabschnitt … .`
      })
    ])
  }),

  "capacitor-exponential": Object.freeze({
    id: "capacitor-exponential",
    shortTitle: "Kondensator-Aufladung · Exponentialregression",
    eyebrow: "Kondensator-Aufladung · Exponentialregression",
    equation: raw`\[\Delta U(t)=U_0e^{-t/\tau}\]`,
    introduction: raw`Das Originalprotokoll enthält zehn Messwerte bis \(100\,\mathrm s\). Für diese Aufgabe ist die Auswertung der neun regulären Messpaare von \(0\) bis \(80\,\mathrm s\), also D1:D9, vorgegeben. Der Messwert bei \(100\,\mathrm s\) bleibt dokumentiert und wird nicht stillschweigend entfernt.`,
    sections: Object.freeze([
      section("data", "1. Daten und Einheiten", html`
        <p>Ausgewertet werden die durch die Aufgabe vorgegebenen neun Messpaare von \(0\) bis \(80\,\mathrm s\), also D1:D9. Der vorhandene zehnte Messwert bei \(100\,\mathrm s\) gehört nicht zu diesem Datenbereich und bleibt als nicht ausgewerteter Originalwert benannt. Untersucht wird die Spannungsdifferenz \(\Delta U=U_0-U_C\) mit \(U_0=3{,}780\,\mathrm V\).</p>
        <ul>
          <li><strong>A1:A9:</strong> Zeiten \(0,10,\ldots,80\) aus der Messwerttabelle eingetragen; Einheit \(\mathrm s\).</li>
          <li><strong>B1:B9:</strong> zugehörige Kondensatorspannungen \(U_C\) eingetragen; Einheit \(\mathrm V\).</li>
          <li><strong>C1:</strong> <code>=3.780-B1</code>, bis C9 ausgefüllt → Spannungsdifferenzen in \(\mathrm V\).</li>
          <li><strong>D1:</strong> <code>=(A1,C1)</code>, bis D9 ausgefüllt → Punkte aus Zeit und Spannungsdifferenz.</li>
        </ul>`, {
        task: raw`Dokumentiere, welche neun Messpaare ausgewertet werden und wie die vier Spalten entstehen.`,
        checklist: [raw`Zeitraum 0 bis 80 s genannt`, raw`A und B mit Einheiten genannt`, raw`C und D mit Eingaben beschrieben`],
        starter: raw`Ich werte … Messpaare von … bis … aus. In A stehen …, in B stehen … .`
      }),
      section("geogebra", "2. GeoGebra-Auswertung", html`
        <p>Für die durch die Aufgabe vorgegebenen Punkte D1:D9 führe ich eine Exponentialregression durch. Der vorhandene Messwert bei \(100\,\mathrm s\) wird nicht stillschweigend entfernt, sondern liegt außerhalb dieses angegebenen Auswertebereichs:</p>
        <pre><code>U(x)=TrendExp(D1:D9)</code></pre>
        <p>GeoGebra liefert näherungsweise:</p>
        <p class="display-equation">\[U(x)=3{,}69258\,e^{-0{,}0304341x}.\]</p>
        <p>\(x\) steht für den Zahlenwert der Zeit in Sekunden. Die Funktion <code>U</code> berechnet den Zahlenwert der Spannungsdifferenz in Volt, nicht die Kondensatorspannung.</p>`, {
        task: raw`Notiere GeoGebra-Befehl, Zellbereich und Regressionsfunktion.`,
        checklist: [raw`TrendExp genannt`, raw`D1:D9 genannt`, raw`Funktionswert als Spannungsdifferenz gedeutet`],
        starter: raw`Für die Punkte … verwende ich … . GeoGebra liefert … .`
      }),
      section("physical", "3. Physikalische Formel", html`
        <p>Die Theorie enthält den Exponenten \(-t/\tau\). Ich vergleiche ihn mit \(kx\) aus der Regression:</p>
        <p class="display-equation">\[k=-0{,}0304341\,\mathrm{s^{-1}},\qquad \tau=-\frac{1}{k}\approx32{,}86\,\mathrm s.\]</p>
        <p>Mit physikalischen Größen und Einheiten lautet die Modellfunktion:</p>
        <p class="display-equation">\[\Delta U(t)\approx3{,}69258\,\mathrm V\cdot e^{-t/\tau},\qquad \tau\approx32{,}86\,\mathrm s.\]</p>
        <p>Der Faktor trägt die Einheit Volt. \(t\) und \(\tau\) werden in derselben Zeiteinheit eingesetzt; deshalb ist \(t/\tau\) einheitenfrei.</p>
        <details class="documentation-optional"><summary>Nur wenn gefragt</summary><p>Für die Kondensatorspannung folgt \(U_C(t)\approx3{,}780\,\mathrm V-3{,}69258\,\mathrm V\cdot e^{-t/\tau}\). Außerdem ist \(t_{1/2}=\tau\ln2\approx22{,}78\,\mathrm s\). Der Regressionsanfangswert wird dabei nicht stillschweigend durch \(U_0\) ersetzt.</p></details>`, {
        task: raw`Bestimme zuerst \(\tau\) aus dem Exponenten. Schreibe dann die Formel mit \(t/\tau\) und Einheiten auf.`,
        checklist: [raw`negatives Vorzeichen berücksichtigt`, raw`\(\tau\) in Sekunden berechnet`, raw`\(\Delta U(t)\), nicht \(U_C(t)\), modelliert`],
        starter: raw`Aus \(k=-1/\tau\) folgt … . Damit lautet die physikalische Modellfunktion … .`
      }),
      section("deviations", "4. Abweichungen und Vergleich", html`
        <ul>
          <li><strong>E1:</strong> <code>=U(A1)</code>, bis E9 ausgefüllt → Modellwerte.</li>
          <li><strong>F1:</strong> <code>=(C1-E1)/E1*100</code>, bis F9 ausgefüllt → relative Modellabweichungen.</li>
        </ul>
        <p>Die größte Modellabweichung tritt bei \(80\,\mathrm s\) auf:</p>
        <p class="display-equation">\[\frac{0{,}332-0{,}32355}{0{,}32355}\cdot100\,\%\approx2{,}61\,\%.\]</p>
        <p>Die gemessene Spannungsdifferenz liegt dort um etwa \(2{,}61\,\%\) über dem Modellwert.</p>
        <p>Für die ausgewerteten Daten gilt \(0{,}001/0{,}332\cdot100\,\%\approx0{,}30\,\%\) als relative Spannungsunsicherheit. Bei \(t=0\) kann keine relative Zeitunsicherheit \(\Delta t/t\) angegeben werden. Nach unserer schulischen Vergleichsregel wird für die Zeitunsicherheit der kleinste positive Messwert \(t=10\,\mathrm s\) verwendet: \(1/10\cdot100\,\%=10\,\%\). Die schulische Vergleichsgrenze beträgt somit \(10\,\%\).</p>
        <p>Der Regressionsanfangswert liegt um \((3{,}780-3{,}69258)/3{,}780\cdot100\,\%\approx2{,}31\,\%\) unter \(U_0\).</p>`, {
        task: raw`Dokumentiere die zwei Vergleichsspalten, ein eingesetztes Beispiel und die schulische Vergleichsgrenze.`,
        checklist: [raw`E und F beschrieben`, raw`2,61 % mit Richtung genannt`, raw`2,31 % und 10 % genannt`],
        starter: raw`Die größte Modellabweichung tritt bei … auf. Dort liegt der Messwert … dem Modellwert.`
      }),
      section("conclusion", "5. Schlussfolgerung", html`
        <p>Die Anfangswertabweichung von etwa \(2{,}31\,\%\) und die größte Modellabweichung von etwa \(2{,}61\,\%\) liegen unter der schulischen Vergleichsgrenze von \(10\,\%\). Nach der hier verwendeten schulischen Vergleichsregel sind sie mit den angenommenen Messunsicherheiten vereinbar. Die Messwerte von \(0\) bis \(80\,\mathrm s\) sind mit einem exponentiellen Aufladevorgang und \(\tau\approx32{,}86\,\mathrm s\) vereinbar. Ein Beweis des Modells oder die Bestätigung eines bestimmten Sollwerts für \(\tau\) folgt daraus nicht.</p>`, {
        task: raw`Formuliere ein begründetes, aber vorsichtiges Urteil für den Zeitraum von 0 bis 80 s.`,
        checklist: [raw`beide Abweichungen mit 10 % verglichen`, raw`\(\tau\) genannt`, raw`kein Beweis behauptet`],
        starter: raw`Da … und … unter \(10\,\%\) liegen, sind die Messwerte von … bis … mit … vereinbar.`
      })
    ])
  })
});

export const DOCUMENTATION_EXAMPLE_IDS = Object.freeze(Object.keys(DOCUMENTATION_EXAMPLES));

export const DOCUMENTATION_GENERAL_GUIDE = Object.freeze([
  "Daten und Einheiten: Nenne die ausgewerteten Größen, Einheiten sowie zusätzliche Spalten oder Umrechnungen. Werden vorhandene Messwerte nicht ausgewertet, nenne den verwendeten Datenbereich und die ausgelassenen Werte; ist die Auswahl nicht vorgegeben, begründe sie kurz.",
  "GeoGebra-Auswertung: Notiere Tabellenformeln oder Regressionsbefehl, den Zellbereich und das numerische Ergebnis.",
  "Physikalische Formel: Übertrage das numerische GeoGebra-Ergebnis in eine Beziehung mit Größen und Einheiten.",
  "Abweichungen und Vergleich: Zeige Modellabweichungen und vergleiche sie mit den angenommenen Messunsicherheiten beziehungsweise der schulischen Vergleichsgrenze.",
  "Schlussfolgerung: Formuliere, ob das Modell nach der verwendeten schulischen Vergleichsregel mit den Messdaten vereinbar ist; Messdaten beweisen ein Modell nicht."
]);
