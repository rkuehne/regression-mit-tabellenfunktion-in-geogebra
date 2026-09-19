import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { COURSES } from "../lesson-data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BROWSER_MODULES = [
  "app.js",
  "lesson-data.js",
  "state.js",
  "regression.js",
  "math-typeset.js",
  "groesster-einzelfehler.js"
];

function source(file) {
  return readFileSync(resolve(ROOT, file), "utf8");
}

function localReferences(html) {
  return [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((value) => !/^(?:[a-z]+:|#)/i.test(value))
    .map((value) => value.split(/[?#]/, 1)[0])
    .filter(Boolean);
}

function assertLocalFile(reference, context) {
  const target = resolve(ROOT, reference);
  assert.equal(existsSync(target), true, `${context}: ${reference}`);
}

test("parst alle Browser-Skripte ausdrücklich als ES-Module", () => {
  for (const file of BROWSER_MODULES) {
    const result = spawnSync(process.execPath, ["--input-type=module", "--check"], {
      input: source(file),
      encoding: "utf8"
    });
    assert.equal(result.status, 0, `${file}: ${result.stderr}`);
  }
});

test("findet für jeden relativen Modulimport eine lokale Datei", () => {
  for (const file of BROWSER_MODULES) {
    const imports = [...source(file).matchAll(/\bfrom\s+["'](\.[^"']+)["']/g)];
    for (const match of imports) {
      const target = resolve(ROOT, dirname(file), match[1].split(/[?#]/, 1)[0]);
      assert.equal(existsSync(target), true, `${file}: ${match[1]}`);
    }
  }
});

test("enthält für alle JavaScript-Zugriffe die zugehörigen HTML-Elemente", () => {
  for (const [scriptFile, htmlFile] of [["app.js", "index.html"], ["groesster-einzelfehler.js", "groesster-einzelfehler.html"]]) {
    const script = source(scriptFile);
    const html = source(htmlFile);
    const referencedIds = [...script.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map((match) => match[1]);
    const htmlIds = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
    const missing = [...new Set(referencedIds)].filter((id) => !htmlIds.has(id));
    assert.deepEqual(missing, [], `${scriptFile} verweist auf fehlende IDs`);
  }
});

test("verwendet nur vorhandene lokale Seiten-, Stil- und Bildressourcen", () => {
  for (const htmlFile of ["index.html", "groesster-einzelfehler.html"]) {
    for (const reference of localReferences(source(htmlFile))) assertLocalFile(reference, htmlFile);
  }

  for (const course of Object.values(COURSES)) {
    for (const step of course.steps) {
      for (const image of step.images) assertLocalFile(image.src, `${course.id}/${step.id}`);
    }
  }

  for (const match of source("style.css").matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (!/^(?:data:|https?:)/i.test(match[1])) assertLocalFile(match[1], "style.css");
  }
});

test("liefert MathJax 4.1.3 und die Schrift vollständig lokal aus", () => {
  const loader = source("math-typeset.js");
  const app = source("app.js");
  const index = source("index.html");
  const methodApp = source("groesster-einzelfehler.js");
  const methodPage = source("groesster-einzelfehler.html");
  const notices = source("THIRD_PARTY_NOTICES.md");
  const bundle = resolve(ROOT, "assets", "vendor", "mathjax", "tex-chtml.js");
  const license = resolve(ROOT, "assets", "vendor", "mathjax", "LICENSE.txt");
  const fontRoot = resolve(ROOT, "assets", "vendor", "mathjax-newcm-font", "chtml");

  assert.equal(existsSync(bundle), true);
  assert.equal(existsSync(license), true);
  assert.equal(existsSync(resolve(fontRoot, "dynamic", "latin.js")), true);
  assert.equal(existsSync(resolve(fontRoot, "woff2", "mjx-ncm-rb.woff2")), true);
  assert.match(loader, /\.\/assets\/vendor\/mathjax\/tex-chtml\.js/);
  assert.match(loader, /%%FONT%%-font/);
  assert.match(loader, /inlineMath:\s*\[\["\\\\\(", "\\\\\)"\]\]/);
  assert.match(loader, /displayMath:\s*\[\["\\\\\[", "\\\\\]"\]\]/);
  assert.match(source("index.html"), /rel="preload" href="\.\/assets\/vendor\/mathjax\/tex-chtml\.js" as="script"/);
  assert.match(source("groesster-einzelfehler.html"), /rel="preload" href="\.\/assets\/vendor\/mathjax\/tex-chtml\.js" as="script"/);
  assert.match(index, /src="\.\/app\.js\?v=20260919-2"/);
  assert.match(app, /from "\.\/math-typeset\.js\?v=20260919-2"/);
  assert.match(methodPage, /src="\.\/groesster-einzelfehler\.js\?v=20260919-2"/);
  assert.match(methodApp, /from "\.\/math-typeset\.js\?v=20260919-2"/);
  assert.match(loader, /requestAnimationFrame/);
  assert.match(loader, /containsUnrenderedMath/);
  assert.doesNotMatch(source("app.js"), /typesetMath\(els\.lessonCard\)/);
  assert.doesNotMatch(source("app.js") + source("style.css"), /math-pending/);
  assert.match(source("app.js"), /renderCourse\(\{ typeset: false \}\)/);
  assert.match(source("app.js"), /renderSummary\(\{ typeset: false \}\)/);
  assert.equal((source("app.js").match(/typesetDocument\(\)/g) || []).length, 1);
  assert.match(notices, /MathJax 4\.1\.3/);
  assert.match(notices, /Apache License 2\.0/);
  assert.doesNotMatch(source("index.html") + source("groesster-einzelfehler.html") + loader, /cdn\.jsdelivr|unpkg\.com|cdnjs\.cloudflare/);
});
