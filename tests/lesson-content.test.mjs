import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { LESSON_STEPS } from "../lesson-data.js";

const here = dirname(fileURLToPath(import.meta.url));
const expectedIds = [
  "context", "setup", "table", "first-point", "fill-points",
  "regression-concept", "regression", "predictions", "deviations", "conclusion"
];

test("enthält die zehn Kapitel in der vorgesehenen Reihenfolge", () => {
  assert.equal(LESSON_STEPS.length, 10);
  assert.deepEqual(LESSON_STEPS.map(({ id }) => id), expectedIds);
});

test("bindet alle zehn lokalen Abbildungen zugänglich ein", () => {
  const images = LESSON_STEPS.flatMap((step) => step.images);
  const uniqueImages = [...new Map(images.map((image) => [image.src, image])).values()];
  assert.equal(uniqueImages.length, 10);

  uniqueImages.forEach((image) => {
    assert.ok(image.alt.length > 20);
    assert.ok(image.caption.length > 10);
    assert.ok(Number.isInteger(image.width) && image.width > 0);
    assert.ok(Number.isInteger(image.height) && image.height > 0);
    assert.ok(image.highlights.length >= 1);
    image.highlights.forEach(({ x, y, width, height }) => {
      assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0);
      assert.ok(x + width <= 100 && y + height <= 100);
    });
    const imagePath = resolve(here, "..", image.src.replace(/^\.\//, ""));
    assert.equal(existsSync(imagePath), true, `Fehlendes Bild: ${imagePath}`);
  });
});

test("enthält die vier zentralen GeoGebra-Eingaben unverändert", () => {
  const formulas = LESSON_STEPS.map((step) => step.formula).filter(Boolean);
  assert.deepEqual(formulas, [
    "=(A1,B1)",
    "F(x)=TrendPot(C1:C6)",
    "=F(A1)",
    "=(B1-D1)/D1*100"
  ]);
});

test("jedes Kapitel besitzt Erklärfelder sowie Ergebnis- und Verständnisprüfung", () => {
  LESSON_STEPS.forEach((step) => {
    assert.ok(step.goal);
    assert.ok(step.why);
    assert.ok(step.concepts.length >= 2);
    step.concepts.forEach(({ term, text }) => {
      assert.ok(term);
      assert.ok(text);
    });
    assert.ok(step.workedExample.title);
    assert.ok(step.workedExample.lines.length >= 2);
    assert.ok(step.remember);
    assert.ok(step.actionHeading);
    assert.ok(step.actions.length >= 3);
    assert.ok(Array.isArray(step.images));
    assert.equal(Object.hasOwn(step, "formula"), true);
    assert.ok(step.troubleshooting);
    assert.ok(step.mistake);
    assert.ok(step.check.prompt);
    assert.ok(step.check.success);
    assert.ok(step.check.retry);

    const kinds = new Set(step.check.fields.map(({ kind }) => kind));
    assert.equal(kinds.has("result"), true, `${step.id}: Ergebnisprüfung fehlt`);
    assert.equal(kinds.has("understanding"), true, `${step.id}: Verständnisprüfung fehlt`);
    step.check.fields.forEach((field) => {
      assert.ok(field.feedback.correct);
      assert.ok(field.feedback.incorrect);
    });
  });
});

test("grundlegende Einrichtung steht im Lernweg und Hilfe bleibt Fehlerhilfe", () => {
  const setup = LESSON_STEPS.find((step) => step.id === "setup");
  assert.equal(setup.actions.some((action) => action.includes("Grafikrechner")), true);
  assert.equal(setup.actions.some((action) => action.includes("Tabellenkalkulation")), true);
  assert.match(setup.remember, /vier Symbole/i);
  assert.match(setup.troubleshooting, /Siehst du nur drei Symbole/i);
});

test("Einheiten und vorsichtige Fachsprache sind im Kurs konsistent", () => {
  const content = JSON.stringify(LESSON_STEPS);
  assert.match(content, /cm/);
  assert.match(content, /mN/);
  assert.match(content, /Modellabweichung/);
  assert.match(content, /Messunsicherheit/);
  assert.match(content, /vereinbar/i);
  assert.match(content, /beweisen/i);
  assert.match(content, /0,37 − 0,38638/);
});

test("die Startseite enthält Moduswahl, Begriffshilfe und lokale Social Preview", () => {
  const root = resolve(here, "..");
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.match(html, /id="explainModeBtn"/);
  assert.match(html, /id="compactModeBtn"/);
  assert.match(html, /id="glossaryDialog"/);
  assert.match(html, /etwa 20–35 Minuten/);
  assert.match(html, /property="og:image" content="\.\/assets\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal(existsSync(resolve(root, "assets", "og.png")), true);
});
