import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DOCUMENTATION_EXAMPLE_IDS,
  DOCUMENTATION_EXAMPLES,
  DOCUMENTATION_GENERAL_GUIDE,
  DOCUMENTATION_SECTION_IDS
} from "../documentation-data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = (file) => readFileSync(resolve(ROOT, file), "utf8");

test("enthält fünf vollständige Dokumentationsbeispiele mit denselben fünf Abschnitten", () => {
  assert.deepEqual(DOCUMENTATION_EXAMPLE_IDS, [
    "inverse-square",
    "proportional-power",
    "proportional-constants",
    "proportional-linear",
    "capacitor-exponential"
  ]);
  for (const example of Object.values(DOCUMENTATION_EXAMPLES)) {
    assert.deepEqual(example.sections.map((item) => item.id), DOCUMENTATION_SECTION_IDS);
    for (const item of example.sections) {
      assert.ok(item.model.length > 120, `${example.id}/${item.id} besitzt ein Muster`);
      assert.ok(item.task.length > 20, `${example.id}/${item.id} besitzt einen Schreibauftrag`);
      assert.ok(item.checklist.length >= 3, `${example.id}/${item.id} besitzt eine Prüfliste`);
      assert.ok(item.starter.length > 20, `${example.id}/${item.id} besitzt eine Starthilfe`);
    }
    const devSection = example.sections.find((s) => s.id === "deviations");
    assert.ok(devSection, `${example.id} besitzt deviations-Abschnitt`);
    assert.match(devSection.model, /\\frac\{/, `${example.id} deviations enthält eingesetzte Bruchformel`);
    assert.match(devSection.model, /\\cdot100/, `${example.id} deviations enthält Prozentmultiplikation`);
  }
  assert.equal(DOCUMENTATION_GENERAL_GUIDE.length, 5);
  assert.deepEqual(DOCUMENTATION_GENERAL_GUIDE.map((item) => item.slice(0, item.indexOf(":"))), [
    "Daten und Einheiten",
    "GeoGebra-Auswertung",
    "Physikalische Formel und Parameter",
    "Abweichungen und Vergleichsregel",
    "Begründete Schlussfolgerung"
  ]);
});

test("dokumentiert die Exponentialregression mit begründetem Datenbereich", () => {
  const exponential = DOCUMENTATION_EXAMPLES["capacitor-exponential"];
  const content = exponential.sections.map((item) => item.model).join("\n");

  assert.match(exponential.introduction, /0/);
  assert.match(exponential.introduction, /80/);
  assert.match(exponential.introduction, /100/);
  assert.match(exponential.introduction, /nicht stillschweigend entfernt/);
  assert.match(content, /A1:A9/);
  assert.match(content, /B1:B9/);
  assert.match(content, /C1:[\s\S]*=3\.780-B1/);
  assert.match(content, /D1:[\s\S]*=\(A1,C1\)/);
  assert.match(content, /TrendExp\(D1:D9\)/);
  assert.match(content, /tau=-\\frac\{1\}\{k\}/);
  assert.equal(content.includes("e^{-t/\\tau}"), true);
  assert.match(content, /0\{,\}30/);
  assert.match(content, /2\{,\}61/);
  assert.match(content, /2\{,\}31/);
  assert.match(content, /t=10/);
  assert.match(content, /schulischen Vergleichsregel/);
  assert.match(content, /festgelegter Vergleichswert/);
  assert.match(content, /nicht stillschweigend entfernt/);
  assert.doesNotMatch(content, /TrendExp\(D1:D10\)/);
  assert.doesNotMatch(content, /\\widehat|\|/);
});

test("hält die physikalischen Umformungen und vorsichtigen Schlussfolgerungen fest", () => {
  const inverse = DOCUMENTATION_EXAMPLES["inverse-square"].sections.map((item) => item.model).join("\n");
  const power = DOCUMENTATION_EXAMPLES["proportional-power"].sections.map((item) => item.model).join("\n");
  const constants = DOCUMENTATION_EXAMPLES["proportional-constants"].sections.map((item) => item.model).join("\n");
  const linear = DOCUMENTATION_EXAMPLES["proportional-linear"].sections.map((item) => item.model).join("\n");

  assert.match(inverse, /28\{,\}9022\\,\\mathrm\{mN\}/);
  assert.match(inverse, /3\{,\}75/);
  assert.match(inverse, /\\frac\{\|-2\{,\}0750-\(-2\)\|\}\{2\}/);
  assert.match(power, /0\{,\}0393011\\cdot10\^\{-8\}\\,\\mathrm C/);
  assert.match(constants, /416\\,\\mathrm\{pF\}/);
  assert.match(linear, /408\\,\\mathrm\{pF\}/);
  assert.match(linear, /1\{,\}2\\cdot10\^\{-9\}\\,\\mathrm C/);
  for (const content of [inverse, power, constants, linear]) {
    assert.match(content, /vereinbar/);
    assert.match(content, /beweisen|Bestätigung/);
  }
});

test("bietet Muster, Papierübung, Selbstkontrolle und getrennte Druckansichten", () => {
  const page = source("dokumentation.html");
  const app = source("dokumentation.js");
  const css = source("style.css");

  assert.match(page, /Muster ansehen/);
  assert.match(page, /Selbst üben/);
  assert.match(page, /Muster drucken/);
  assert.match(page, /Übungsblatt drucken/);
  assert.match(page, /Die fünf Schritte deiner Klausurdokumentation/);
  assert.match(DOCUMENTATION_GENERAL_GUIDE[3], /Die schulische Vergleichsregel dient hier zur vereinfachten Beurteilung der Messdaten\./);
  assert.match(DOCUMENTATION_GENERAL_GUIDE[3], /ersetzt keine vollständige Unsicherheitsfortpflanzung oder statistische Modellprüfung/);
  assert.match(app, /item\.indexOf\(":"\)/);
  assert.match(app, /Was muss hinein\?/);
  assert.match(app, /Ich brauche eine Starthilfe/);
  assert.match(app, /Mit der Musterlösung vergleichen/);
  assert.match(app, /Diesen Abschnitt habe ich selbst überprüft/);
  assert.match(app, /buildStaticContent\(\)[\s\S]*typesetDocument\(\)/);
  assert.match(css, /data-print-target="model"/);
  assert.match(css, /data-print-target="worksheet"/);
});

test("gewährleistet intakte Formelzeichen in allen Dokumentationsfeldern und saubere Phasenklassen", () => {
  const css = source("style.css");
  assert.doesNotMatch(css, /\.learning-map\s+li\s+span\b/, "Pauschaler Selektor .learning-map li span muss beseitigt sein");
  assert.match(css, /\.learning-map-number\b/, "Spezifischer Selektor .learning-map-number vorhanden");
  assert.match(css, /\.learning-map-label\b/, "Spezifischer Selektor .learning-map-label vorhanden");

  for (const example of Object.values(DOCUMENTATION_EXAMPLES)) {
    assert.doesNotMatch(example.introduction, /\t/, `${example.id} Intro enthält keinen Tabulator`);
    assert.doesNotMatch(example.introduction, /Ccdot|\(10,%\)/);
    for (const item of example.sections) {
      const texts = [item.task, item.starter, ...(item.checklist || []), item.model];
      for (const text of texts) {
        assert.doesNotMatch(text, /\t/, `${example.id}/${item.id} enthält kein unmaskiertes \\t`);
        assert.doesNotMatch(text, /Q=Ccdot U/, `${example.id}/${item.id} enthält kein Q=Ccdot U`);
        assert.doesNotMatch(text, /Ccdot/, `${example.id}/${item.id} enthält kein Ccdot`);
        assert.doesNotMatch(text, /\(10,%\)/, `${example.id}/${item.id} enthält kein (10,%)`);
        assert.doesNotMatch(text, /\(Delta U\(t\)\)/, `${example.id}/${item.id} enthält kein (Delta U(t))`);
        assert.doesNotMatch(text, /\bau\b\s+anstelle/, `${example.id}/${item.id} enthält kein beschädigtes \\tau`);
      }
    }
  }

  const expPhysical = DOCUMENTATION_EXAMPLES["capacitor-exponential"].sections.find((s) => s.id === "physical");
  assert.match(expPhysical.task, /\\tau/);
  assert.match(expPhysical.checklist.join(" "), /\\tau/);
  assert.match(expPhysical.checklist.join(" "), /\\Delta U\(t\)/);
  assert.match(expPhysical.starter, /\\tau/);

  const constData = DOCUMENTATION_EXAMPLES["proportional-constants"].sections.find((s) => s.id === "data");
  assert.match(constData.starter, /Q=C\\cdot U/);
});

test("erfüllt alle Vorgaben für Abschnittstitel, Phasenverknüpfung und Drucktypografie (AP 09)", () => {
  const expectedTitles = [
    "1. Daten und Einheiten",
    "2. GeoGebra-Auswertung",
    "3. Physikalische Formel und Parameter",
    "4. Abweichungen und Vergleichsregel",
    "5. Begründete Schlussfolgerung"
  ];
  for (const example of Object.values(DOCUMENTATION_EXAMPLES)) {
    assert.deepEqual(
      example.sections.map((s) => s.title),
      expectedTitles,
      `${example.id} muss die 5 vorgeschriebenen Abschnittstitel tragen`
    );
  }

  const app = source("app.js");
  const html = source("index.html");
  const docApp = source("dokumentation.js");
  const css = source("style.css");

  assert.match(html, /id="phaseDocHint"/);
  assert.match(app, /PHASE_TO_DOC_SECTION/);
  assert.match(app, /phaseDocHint/);
  assert.match(app, /Abschnitt „.*“ im Klausurmuster ansehen/);
  assert.match(docApp, /requestedSection/);
  assert.match(docApp, /activePanel/);
  assert.doesNotMatch(css, /font-size:\s*7\.6pt/, "Print CSS darf keine unleserliche 7.6pt-Schrift enthalten");
  assert.match(css, /\.phase-doc-hint/);
  assert.match(css, /\.phase-doc-btn/);
});
