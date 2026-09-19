import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { CHARGING_EXPONENTIAL_STEPS, COURSE_IDS, COURSES, LESSON_STEPS, UQ_CONSTANT_STEPS, UQ_LINEAR_STEPS, UQ_POWER_STEPS, UQ_SHARED_REQUIREMENT_ID, displayMath, inlineMath, typesetCourseText } from "../lesson-data.js";

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
    assert.ok(Array.isArray(image.highlights));
    if (!image.src.endsWith("03-ausfuellgriff.png")) assert.ok(image.highlights.length >= 1);
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
  assert.match(setup.troubleshooting, /CAS-Modus/i);
  assert.match(setup.troubleshooting, /Grafikrechner/i);
});

test("ordnet den Versuch und die Regressionsfunktion fachlich ein", () => {
  const context = LESSON_STEPS.find((step) => step.id === "context");
  const concept = LESSON_STEPS.find((step) => step.id === "regression-concept");
  const regression = LESSON_STEPS.find((step) => step.id === "regression");

  assert.match(context.why, /theoretisch vorhergesagten Zusammenhang/i);
  assert.match(context.why, /Messunsicherheit/i);
  assert.match(JSON.stringify(context.workedExample), /Drehwaage/);
  assert.match(JSON.stringify(context.workedExample), /CASSY/);
  assert.match(concept.mistake, /Graph.*möglichst nahe.*Messpunkten/i);
  assert.match(regression.mistake, /F\(x\).*Kraft F/i);
  assert.match(regression.mistake, /Variable.*x/i);
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

test("die Startseite enthält Kurswahl, Moduswahl, Begriffshilfe und lokale Social Preview", () => {
  const root = resolve(here, "..");
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.match(html, /id="explainModeBtn"/);
  assert.match(html, /id="compactModeBtn"/);
  assert.match(html, /id="glossaryDialog"/);
  assert.match(html, /data-course-id="inverse-square"/);
  assert.match(html, /data-course-id="proportional-power"/);
  assert.match(html, /data-course-id="proportional-constants"/);
  assert.match(html, /data-course-id="proportional-linear"/);
  assert.match(html, /data-course-id="capacitor-exponential"/);
  assert.match(html, /property="og:image" content="\.\/assets\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal(existsSync(resolve(root, "assets", "og.png")), true);
});

test("enthält fünf eigenständige Lernwege", () => {
  assert.deepEqual(COURSE_IDS, ["inverse-square", "proportional-power", "proportional-constants", "proportional-linear", "capacitor-exponential"]);
  assert.equal(COURSES["inverse-square"].steps.length, 10);
  assert.equal(UQ_POWER_STEPS.length, 8);
  assert.equal(UQ_CONSTANT_STEPS.length, 8);
  assert.equal(UQ_LINEAR_STEPS.length, 8);
  assert.equal(CHARGING_EXPONENTIAL_STEPS.length, 11);
  Object.values(COURSES).forEach((course) => assert.equal(Object.hasOwn(course, "transferMethod"), false));
});

test("alle neuen Kapitel besitzen Erklärfelder sowie Ergebnis- und Verständnisprüfung", () => {
  [...UQ_POWER_STEPS, ...UQ_CONSTANT_STEPS, ...UQ_LINEAR_STEPS, ...CHARGING_EXPONENTIAL_STEPS].forEach((step) => {
    assert.ok(step.goal && step.why && step.remember && step.troubleshooting && step.mistake);
    assert.ok(step.concepts.length >= 2);
    assert.ok(step.workedExample.lines.length >= 2);
    assert.ok(step.actions.length >= 3);
    const kinds = new Set(step.check.fields.map(({ kind }) => kind));
    assert.equal(kinds.has("result"), true, `${step.id}: Ergebnisprüfung fehlt`);
    assert.equal(kinds.has("understanding"), true, `${step.id}: Verständnisprüfung fehlt`);
  });
});

test("bindet elf Auflade-Abbildungen mit zugänglichen Beschreibungen und Markierungen ein", () => {
  const images = CHARGING_EXPONENTIAL_STEPS.flatMap((step) => step.images);
  const uniqueImages = [...new Map(images.map((image) => [image.src, image])).values()];
  assert.equal(uniqueImages.length, 11);
  uniqueImages.forEach((image) => {
    assert.ok(image.alt.length > 30);
    assert.ok(image.caption.length > 20);
    assert.ok(Number.isInteger(image.width) && image.width > 0);
    assert.ok(Number.isInteger(image.height) && image.height > 0);
    assert.ok(image.highlights.length >= 1);
    const imagePath = resolve(here, "..", image.src.replace(/^\.\//, ""));
    assert.equal(existsSync(imagePath), true, image.src);
    const png = readFileSync(imagePath);
    assert.equal(png.readUInt32BE(16), image.width, `${image.src}: Breite`);
    assert.equal(png.readUInt32BE(20), image.height, `${image.src}: Höhe`);
  });
});

test("führt den Aufladungskurs fachlich konsistent von ΔU bis zur Fehlerbeurteilung", () => {
  const content = JSON.stringify(CHARGING_EXPONENTIAL_STEPS);
  const formulas = CHARGING_EXPONENTIAL_STEPS.map((step) => step.formula).filter(Boolean);
  assert.deepEqual(formulas, ["=3.780-B1", "=(A1,C1)", "U(x)=TrendExp(D1:D9)", "=U(A1)", "=(C1-E1)/E1*100"]);
  assert.match(content, /U_C\(t\).*1 − e\^\(−t\/τ\)/);
  assert.match(content, /τ = R · C/);
  assert.match(content, /t₁\/₂ = τ · ln\(2\)/);
  assert.match(content, /42,6 %/);
  assert.match(content, /nicht.*allein.*Modell|nicht.*nur.*Modell/i);
  assert.match(content, /nicht.*90 s|90 s.*nicht/i);
  assert.match(content, /fmax = 10 %/);
  assert.match(content, /vereinbar/i);
  assert.match(content, /beweis/i);
  assert.doesNotMatch(content, /TrendExp\(D1:D10\)/);
});

test("führt jeden Lernweg unmittelbar zum Lernnachweis", () => {
  const root = resolve(here, "..");
  const app = readFileSync(resolve(root, "app.js"), "utf8");
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.doesNotMatch(app, /transferMethod|TRANSFER_METHOD_IDS|activeTransfer|renderTransfer/);
  assert.doesNotMatch(html, /id="transfer"|Transferrechner|Reflexion/);
  assert.match(app, /Zum Lernnachweis/);
  assert.match(app, /await renderSummary\(\);[\s\S]*await mathReady;[\s\S]*window\.print\(\)/);
  assert.doesNotMatch(app, /beforeprint/);
});

test("bindet dreizehn lokale U-Q-Abbildungen zugänglich ein", () => {
  const images = [...UQ_POWER_STEPS, ...UQ_CONSTANT_STEPS, ...UQ_LINEAR_STEPS].flatMap((step) => step.images);
  const uniqueImages = [...new Map(images.map((image) => [image.src, image])).values()];
  assert.equal(uniqueImages.length, 13);
  uniqueImages.forEach((image) => {
    assert.ok(image.alt.length > 20);
    assert.ok(image.caption.length > 10);
    assert.ok(image.width > 0 && image.height > 0);
    assert.ok(image.highlights.length >= 1);
    const imagePath = resolve(here, "..", image.src.replace(/^\.\//, ""));
    assert.equal(existsSync(imagePath), true, image.src);
    const png = readFileSync(imagePath);
    assert.equal(png.readUInt32BE(16), image.width, `${image.src}: Breite`);
    assert.equal(png.readUInt32BE(20), image.height, `${image.src}: Höhe`);
  });
});

test("enthält die zentralen U-Q-Eingaben und vorsichtige Fachsprache", () => {
  const power = JSON.stringify(UQ_POWER_STEPS);
  const constants = JSON.stringify(UQ_CONSTANT_STEPS);
  const linear = JSON.stringify(UQ_LINEAR_STEPS);
  const courses = JSON.stringify(COURSES);
  assert.match(power, /Q\(x\)=TrendPot\(C1:C5\)/);
  assert.match(power, /=Q\(A1\)/);
  assert.match(power, /Methode des größten Einzelfehlers/i);
  assert.match(power, /1,16 %/);
  assert.match(power, /theoretischen Wert 1/i);
  assert.match(constants, /=B1\/A1/);
  assert.match(constants, /Mittel\(C1:C5\)/);
  assert.match(constants, /416 pF/);
  assert.match(constants, /10 %/);
  assert.match(constants, /keine.*Unsicherheit von C|keine vollständige Fehlerfortpflanzung/i);
  assert.doesNotMatch(constants, /wechsle freundlich/i);
  assert.match(linear, /Q=Trendlinie\(C1:C5\)/);
  assert.match(linear, /=Q\(A1\)/);
  assert.match(linear, /408 pF/);
  assert.match(linear, /7,41 %/);
  assert.match(linear, /Extrapolation/i);
  assert.match(linear, /statistische.*b = 0|statistisch.*b = 0/i);
  assert.match(linear, /\|b\|\/Qmin|Anteil.*6 %/i);
  assert.doesNotMatch(linear, /Achsenabschnitt d|Q\(U\) = m · U \+ d|TrendPoly/);
  assert.match(courses, /Q\/\(10⁻⁸ C\)/);
  assert.match(power + constants + linear, /vereinbar/i);
  assert.match(power + constants + linear, /beweis/i);
});

test("verknüpft alle drei Q-U-Wege mit derselben Pflichtseite", () => {
  for (const courseId of ["proportional-power", "proportional-constants", "proportional-linear"]) {
    assert.equal(COURSES[courseId].sharedRequirement, UQ_SHARED_REQUIREMENT_ID);
    assert.equal(COURSES[courseId].steps.some((step) => step.sharedRequirement === true), true);
  }
  assert.equal(COURSES["inverse-square"].sharedRequirement, undefined);
});

test("enthält die gemeinsame Fehlerseite mit Herleitung, Anwendungen und Pflichtkontrolle", () => {
  const root = resolve(here, "..");
  const html = readFileSync(resolve(root, "groesster-einzelfehler.html"), "utf8");
  assert.match(html, /\\frac\{5\}\{50\}\\cdot100=10\\,\\%/);
  assert.match(html, /\\frac\{0\{,\}1\}\{2\{,\}0\}\\cdot100=5\\,\\%/);
  assert.match(html, /f_\{\\max\}=\\max\(10\\,\\%,5\\,\\%\)=10\\,\\%/);
  assert.match(html, /1\{,\}16\\,\\%/);
  assert.match(html, /3\{,\}74\\,\\%/);
  assert.match(html, /3\{,\}83\\,\\%/);
  assert.match(html, /7\{,\}41\\,\\%/);
  assert.match(html, /\\frac\{0\{,\}12\}\{2\{,\}0\}\\cdot100=6\\,\\%/);
  assert.match(html, /Q=Trendlinie\(C1:C5\)/);
  assert.match(html, /durch die Messfehler erklärt werden/);
  assert.match(html, /name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex"/);
  assert.match(html, /src="\.\/groesster-einzelfehler\.js\?v=20260919-1"/);
});

test("kennzeichnet mathematische Auswahlantworten und erzeugt konsistente TeX-Begrenzer", () => {
  assert.equal(inlineMath("Q=CU"), "\\(Q=CU\\)");
  assert.equal(displayMath("Q=CU"), "\\[Q=CU\\]");
  assert.equal(typesetCourseText("Es gilt Q = C · U."), "Es gilt \\(Q=CU\\).");

  const mathFields = Object.values(COURSES)
    .flatMap((course) => course.steps)
    .flatMap((step) => step.check.fields)
    .filter((field) => field.type === "choice" && field.mathOptions);
  assert.ok(mathFields.length > 10);
  assert.ok(mathFields.every((field) => {
    const answerLabels = field.options.filter(({ value }) => value !== "").map(({ label }) => label);
    if (field.codeOptions) return answerLabels.every((label) => label.startsWith("="));
    return [field.label, ...answerLabels].map(typesetCourseText).join(" ").includes("\\(");
  }));
});

test("erzeugt in allen dynamischen Kurstexten ausgewogene MathJax-Begrenzer", () => {
  const strings = [];
  const collect = (value) => {
    if (typeof value === "string") strings.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  };
  collect(COURSES);

  strings.forEach((value) => {
    const rendered = typesetCourseText(value);
    assert.equal((rendered.match(/\\\(/g) || []).length, (rendered.match(/\\\)/g) || []).length, rendered);
    assert.equal((rendered.match(/\\\[/g) || []).length, (rendered.match(/\\\]/g) || []).length, rendered);
    assert.doesNotMatch(rendered, /\\\)\s*[,;]\d/, rendered);
    assert.doesNotMatch(rendered, /\\\)\p{L}/u, rendered);
  });
});

test("weist Suchmaschinen auf die gewünschte Nicht-Indexierung hin", () => {
  const root = resolve(here, "..");
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  const robots = readFileSync(resolve(root, "robots.txt"), "utf8");

  assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">/);
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Disallow:\s*$/m);
});
