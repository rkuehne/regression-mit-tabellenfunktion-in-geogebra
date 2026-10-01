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
  }
  assert.equal(DOCUMENTATION_GENERAL_GUIDE.length, 5);
});

test("dokumentiert die Exponentialregression ausschließlich von 0 bis 80 Sekunden", () => {
  const exponential = DOCUMENTATION_EXAMPLES["capacitor-exponential"];
  const content = exponential.sections.map((item) => item.model).join("\n");

  assert.match(exponential.introduction, /0/);
  assert.match(exponential.introduction, /80/);
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
  assert.doesNotMatch(content, /D1:D10|0\{,\}251|100\\,\\mathrm s/);
  assert.doesNotMatch(content, /\\widehat|\|/);
});

test("hält die physikalischen Umformungen und vorsichtigen Schlussfolgerungen fest", () => {
  const inverse = DOCUMENTATION_EXAMPLES["inverse-square"].sections.map((item) => item.model).join("\n");
  const power = DOCUMENTATION_EXAMPLES["proportional-power"].sections.map((item) => item.model).join("\n");
  const constants = DOCUMENTATION_EXAMPLES["proportional-constants"].sections.map((item) => item.model).join("\n");
  const linear = DOCUMENTATION_EXAMPLES["proportional-linear"].sections.map((item) => item.model).join("\n");

  assert.match(inverse, /28\{,\}9022\\,\\mathrm\{mN\}/);
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
  assert.match(app, /Was muss hinein\?/);
  assert.match(app, /Ich brauche eine Starthilfe/);
  assert.match(app, /Mit der Musterlösung vergleichen/);
  assert.match(app, /Diesen Abschnitt habe ich selbst überprüft/);
  assert.match(app, /buildStaticContent\(\)[\s\S]*typesetDocument\(\)/);
  assert.match(css, /data-print-target="model"/);
  assert.match(css, /data-print-target="worksheet"/);
});
