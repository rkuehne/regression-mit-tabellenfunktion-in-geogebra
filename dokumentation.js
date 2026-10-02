import {
  DOCUMENTATION_EXAMPLE_IDS,
  DOCUMENTATION_EXAMPLES,
  DOCUMENTATION_GENERAL_GUIDE
} from "./documentation-data.js";
import { loadState, persistState, PRACTICE_TASK_IDS } from "./state.js";
import { mathReady, typesetDocument } from "./math-typeset.js?v=20260920-1";
import { renderSiteNavigation, buildNavUrl, taskForCourse } from "./navigation.js";

const els = {
  guide: document.getElementById("documentationGuide"),
  examplePicker: document.getElementById("documentationExamples"),
  modelViewBtn: document.getElementById("modelViewBtn"),
  practiceViewBtn: document.getElementById("practiceViewBtn"),
  printModelBtn: document.getElementById("printModelBtn"),
  printWorksheetBtn: document.getElementById("printWorksheetBtn"),
  back: document.getElementById("documentationBack"),
  status: document.getElementById("documentationStatus"),
  mathLoading: document.getElementById("documentationMathLoading"),
  model: document.getElementById("documentationModel"),
  practice: document.getElementById("documentationPractice"),
  worksheet: document.getElementById("documentationWorksheet")
};

const state = loadState(localStorage);
const params = new URLSearchParams(window.location.search);
const requestedCourse = params.get("course");
const requestedStep = params.get("step");
const DOCUMENTATION_SECTION_IDS = Object.freeze(["data", "geogebra", "physical", "deviations", "conclusion"]);
const requestedSection = DOCUMENTATION_SECTION_IDS.includes(params.get("section")) ? params.get("section") : null;
const requestedTask = PRACTICE_TASK_IDS.includes(params.get("task")) ? params.get("task") : null;
const returnToPractice = params.get("return") === "practice" && Boolean(requestedTask);

if (DOCUMENTATION_EXAMPLE_IDS.includes(requestedCourse)) {
  state.documentation.selectedExampleId = requestedCourse;
}
if (requestedSection) {
  state.documentation.view = "model";
}
const returnCourseId = DOCUMENTATION_EXAMPLE_IDS.includes(requestedCourse)
  ? requestedCourse
  : state.activeCourseId;

function updateNavigationLinks() {
  const exId = state.documentation.selectedExampleId;
  renderSiteNavigation("documentation", {
    courseId: exId,
    stepId: requestedStep,
    taskId: returnToPractice ? requestedTask : taskForCourse(exId)
  });
  if (els.back) {
    if (returnToPractice) {
      els.back.href = `./selbst-auswerten.html?task=${encodeURIComponent(requestedTask)}`;
      els.back.textContent = "← Zurück zur Übungsaufgabe";
    } else {
      els.back.href = buildNavUrl("learn", { courseId: returnCourseId, stepId: requestedStep });
      els.back.textContent = "← Zurück zum Lernweg";
    }
  }
}
updateNavigationLinks();

function save() {
  persistState(localStorage, state);
}

function activeExample() {
  return DOCUMENTATION_EXAMPLES[state.documentation.selectedExampleId];
}

function panelId(prefix, exampleId) {
  return `${prefix}-${exampleId}`;
}

function createModelPanel(example) {
  const article = document.createElement("article");
  article.id = panelId("model", example.id);
  article.className = "documentation-paper documentation-model-paper";
  article.dataset.exampleId = example.id;
  article.hidden = example.id !== state.documentation.selectedExampleId;
  article.innerHTML = `
    <header class="documentation-paper-header">
      <div>
        <p class="mini-label">Ausgeführtes Muster</p>
        <span class="documentation-paper-kicker">${example.eyebrow}</span>
        <h2>${example.shortTitle}</h2>
      </div>
      <div class="documentation-paper-equation">${example.equation}</div>
    </header>
    <p class="documentation-example-introduction">${example.introduction}</p>
    <div class="documentation-model-sections">
      ${example.sections.map((item) => `
        <section class="documentation-section" data-section-id="${item.id}">
          <h3>${item.title}</h3>
          <div class="documentation-model-copy">${item.model}</div>
        </section>
      `).join("")}
    </div>
    <p class="documentation-paper-footnote">Muster für eine knappe Klausurdokumentation. GeoGebra-Befehle und Zellbereiche machen den Rechenweg nachvollziehbar.</p>
  `;
  return article;
}

function createPracticePanel(example) {
  const article = document.createElement("article");
  article.id = panelId("practice", example.id);
  article.className = "documentation-practice-paper";
  article.dataset.exampleId = example.id;
  article.hidden = example.id !== state.documentation.selectedExampleId;
  article.innerHTML = `
    <header class="documentation-practice-header">
      <div>
        <p class="mini-label">Lernmodus · auf Papier</p>
        <h2>${example.shortTitle}</h2>
        <p>Schreibe jeden Abschnitt zunächst auf Papier. Öffne Hilfen erst dann, wenn du sie brauchst, und vergleiche anschließend mit der Musterlösung.</p>
      </div>
      <button type="button" class="text-button" data-reset-example="${example.id}">Selbstkontrollen zurücksetzen</button>
    </header>
    <div class="documentation-practice-sections">
      ${example.sections.map((item) => `
        <section class="documentation-practice-section" data-section-id="${item.id}">
          <h3>${item.title}</h3>
          <p class="documentation-task"><strong>Dein Schreibauftrag:</strong> ${item.task}</p>
          <details>
            <summary>Was muss hinein?</summary>
            <ul>${item.checklist.map((point) => `<li>${point}</li>`).join("")}</ul>
          </details>
          <details>
            <summary>Ich brauche eine Starthilfe</summary>
            <p>${item.starter}</p>
          </details>
          <details>
            <summary>Mit der Musterlösung vergleichen</summary>
            <div class="documentation-model-copy">${item.model}</div>
          </details>
          <label class="documentation-self-check">
            <input type="checkbox" data-self-check-example="${example.id}" data-self-check-section="${item.id}">
            <span>Diesen Abschnitt habe ich selbst überprüft.</span>
          </label>
        </section>
      `).join("")}
    </div>
  `;
  return article;
}

function createWorksheetPanel(example) {
  const article = document.createElement("article");
  article.id = panelId("worksheet", example.id);
  article.className = "documentation-worksheet-panel";
  article.dataset.exampleId = example.id;
  article.hidden = example.id !== state.documentation.selectedExampleId;
  article.innerHTML = `
    <header class="documentation-paper-header">
      <div>
        <p class="mini-label">Übungsblatt · auf Papier ausfüllen</p>
        <span class="documentation-paper-kicker">${example.eyebrow}</span>
        <h1>So dokumentiere ich die Auswertung</h1>
        <h2>${example.shortTitle}</h2>
      </div>
      <div class="worksheet-meta"><span>Name: ____________________</span><span>Datum: ____________________</span></div>
    </header>
    <p>${example.introduction}</p>
    ${example.sections.map((item, index) => `
      <section class="documentation-worksheet-section ${index === 3 ? "worksheet-page-break" : ""}">
        <h3>${item.title}</h3>
        <p><strong>Schreibauftrag:</strong> ${item.task}</p>
        <div class="worksheet-lines" aria-hidden="true"></div>
      </section>
    `).join("")}
  `;
  return article;
}

function buildStaticContent() {
  els.guide.replaceChildren(...DOCUMENTATION_GENERAL_GUIDE.map((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));

  els.examplePicker.replaceChildren(...DOCUMENTATION_EXAMPLE_IDS.map((id) => {
    const example = DOCUMENTATION_EXAMPLES[id];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "documentation-example-button";
    button.dataset.exampleId = id;
    button.setAttribute("aria-pressed", String(id === state.documentation.selectedExampleId));
    button.innerHTML = `<span>${example.shortTitle}</span><small>${example.eyebrow}</small>`;
    return button;
  }));

  const models = [];
  const practice = [];
  const worksheets = [];
  DOCUMENTATION_EXAMPLE_IDS.forEach((id) => {
    const example = DOCUMENTATION_EXAMPLES[id];
    models.push(createModelPanel(example));
    practice.push(createPracticePanel(example));
    worksheets.push(createWorksheetPanel(example));
  });
  els.model.replaceChildren(...models);
  els.practice.replaceChildren(...practice);
  els.worksheet.replaceChildren(...worksheets);

  document.querySelectorAll("[data-self-check-example]").forEach((input) => {
    const { selfCheckExample: exampleId, selfCheckSection: sectionId } = input.dataset;
    input.checked = state.documentation.selfChecks?.[exampleId]?.[sectionId] === true;
  });
}

function renderSelection({ announce = false } = {}) {
  const example = activeExample();
  document.querySelectorAll("[data-example-id]").forEach((element) => {
    const isSelected = element.dataset.exampleId === example.id;
    if (element.matches("button")) element.setAttribute("aria-pressed", String(isSelected));
    else element.hidden = !isSelected;
  });
  if (announce) els.status.textContent = `${example.shortTitle} ist ausgewählt.`;
}

function renderView({ announce = false } = {}) {
  const practice = state.documentation.view === "practice";
  els.model.hidden = practice;
  els.practice.hidden = !practice;
  els.modelViewBtn.setAttribute("aria-pressed", String(!practice));
  els.practiceViewBtn.setAttribute("aria-pressed", String(practice));
  if (announce) els.status.textContent = practice
    ? "Lernmodus geöffnet. Schreibe die Abschnitte auf Papier und kontrolliere sie anschließend selbst."
    : "Ausgeführte Musterdokumentation geöffnet.";
}

function selectExample(exampleId) {
  if (!DOCUMENTATION_EXAMPLE_IDS.includes(exampleId)) return;
  state.documentation.selectedExampleId = exampleId;
  save();
  renderSelection({ announce: true });
  updateNavigationLinks();
}

function setView(view) {
  state.documentation.view = view === "practice" ? "practice" : "model";
  save();
  renderView({ announce: true });
}

function saveSelfCheck(input) {
  const { selfCheckExample: exampleId, selfCheckSection: sectionId } = input.dataset;
  if (!DOCUMENTATION_EXAMPLE_IDS.includes(exampleId)) return;
  state.documentation.selfChecks[exampleId] ||= {};
  if (input.checked) state.documentation.selfChecks[exampleId][sectionId] = true;
  else delete state.documentation.selfChecks[exampleId][sectionId];
  save();
  els.status.textContent = input.checked
    ? "Selbstkontrolle gespeichert."
    : "Selbstkontrolle entfernt.";
}

function resetSelfChecks(exampleId) {
  const example = DOCUMENTATION_EXAMPLES[exampleId];
  if (!example || !window.confirm(`Selbstkontrollen für „${example.shortTitle}“ zurücksetzen?`)) return;
  state.documentation.selfChecks[exampleId] = {};
  document.querySelectorAll(`[data-self-check-example="${exampleId}"]`).forEach((input) => {
    input.checked = false;
  });
  save();
  els.status.textContent = "Die Selbstkontrollen dieses Beispiels wurden zurückgesetzt.";
}

async function printTarget(target) {
  document.body.dataset.printTarget = target;
  try {
    await mathReady;
    await documentTypeset;
  } finally {
    window.print();
  }
}

function clearPrintTarget() {
  document.body.dataset.printTarget = "screen";
}

els.examplePicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-example-id]");
  if (button?.matches("button")) selectExample(button.dataset.exampleId);
});
els.modelViewBtn.addEventListener("click", () => setView("model"));
els.practiceViewBtn.addEventListener("click", () => setView("practice"));
els.practice.addEventListener("change", (event) => {
  if (event.target.matches("[data-self-check-example]")) saveSelfCheck(event.target);
});
els.practice.addEventListener("click", (event) => {
  const button = event.target.closest("[data-reset-example]");
  if (button) resetSelfChecks(button.dataset.resetExample);
});
els.printModelBtn.addEventListener("click", () => { void printTarget("model"); });
els.printWorksheetBtn.addEventListener("click", () => { void printTarget("worksheet"); });
window.addEventListener("afterprint", clearPrintTarget);

buildStaticContent();
renderSelection();
renderView();
save();
const documentTypeset = typesetDocument();
Promise.all([mathReady, documentTypeset]).then(([available]) => {
  document.body.dataset.mathState = available ? "ready" : "fallback";
  els.mathLoading.hidden = true;
  if (requestedSection) {
    const visibleRoot = state.documentation.view === "practice" ? els.practice : els.model;
    const activePanel = visibleRoot.querySelector(`article[data-example-id="${state.documentation.selectedExampleId}"]:not([hidden])`);
    const section = activePanel?.querySelector(`[data-section-id="${requestedSection}"]`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
