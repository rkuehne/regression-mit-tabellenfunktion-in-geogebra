import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { LESSON_STEPS } from "../lesson-data.js";

const here = dirname(fileURLToPath(import.meta.url));

test("enthält acht Lernschritte und alle neun Abbildungen", () => {
  assert.equal(LESSON_STEPS.length, 8);
  const images = LESSON_STEPS.flatMap((step) => step.images);
  assert.equal(images.length, 9);
  images.forEach((image) => {
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

test("erklärt den richtigen Modus vor dem Öffnen der Tabellenkalkulation", () => {
  const tableStep = LESSON_STEPS.find((step) => step.id === "table");
  const orientation = tableStep.hint;

  assert.match(orientation, /Hamburger-Menü/);
  assert.match(orientation, /Grafikrechner/);
  assert.match(orientation, /vier Symbole/);
  assert.equal(tableStep.actions.some((action) => action.includes("Hamburger-Menü")), false);
});

test("jeder Schritt ist vollständig prüfbar", () => {
  LESSON_STEPS.forEach((step) => {
    assert.ok(step.id);
    assert.ok(step.actions.length >= 3);
    assert.ok(step.hint);
    assert.ok(step.mistake);
    assert.ok(step.check.prompt);
    assert.ok(step.check.fields.length >= 1);
    assert.ok(step.check.success);
    assert.ok(step.check.retry);
  });
});

test("die Startseite bindet die lokale Social-Preview-Grafik ein", () => {
  const root = resolve(here, "..");
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.match(html, /property="og:image" content="\.\/assets\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal(existsSync(resolve(root, "assets", "og.png")), true);
});
