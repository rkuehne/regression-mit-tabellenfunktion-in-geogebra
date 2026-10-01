import {
  PRACTICE_TASKS,
  CHEAT_SHEET_COMMANDS,
  SELF_CHECK_STATEMENTS,
  validatePracticeField,
  isTaskNumericallyComplete
} from "./practice-data.js";
import { renderSiteNavigation, courseForTask } from "./navigation.js";
import { loadState, persistState, PRACTICE_TASK_IDS } from "./state.js";
import { typesetDocument, typesetMath } from "./math-typeset.js?v=20260920-1";

const state = loadState(localStorage);
state.practice ||= {
  selectedTaskId: "linear-7",
  tasks: Object.fromEntries(PRACTICE_TASK_IDS.map((id) => [id, { answers: {}, completedChecks: [], selfChecks: {} }]))
};

const params = new URLSearchParams(window.location.search);
const requestedTask = params.get("task");
if (requestedTask && PRACTICE_TASK_IDS.includes(requestedTask)) {
  state.practice.selectedTaskId = requestedTask;
} else if (!PRACTICE_TASK_IDS.includes(state.practice.selectedTaskId)) {
  state.practice.selectedTaskId = "linear-7";
}

const els = {
  taskChoiceList: document.getElementById("taskChoiceList"),
  taskButtons: document.querySelectorAll(".task-choice-btn"),
  cheatSheetContent: document.getElementById("cheatSheetContent"),
  taskContent: document.getElementById("taskContent")
};

function save() {
  persistState(localStorage, state);
}

function updateNavigation() {
  const currentTask = state.practice.selectedTaskId;
  renderSiteNavigation("practice", {
    taskId: currentTask,
    courseId: courseForTask(currentTask)
  });
}

function renderCheatSheet() {
  if (!els.cheatSheetContent) return;
  els.cheatSheetContent.replaceChildren();

  const dl = document.createElement("dl");
  dl.className = "cheat-sheet-list";

  CHEAT_SHEET_COMMANDS.forEach(({ command, description }) => {
    const item = document.createElement("div");
    item.className = "cheat-sheet-item";

    const dt = document.createElement("dt");
    const code = document.createElement("code");
    code.textContent = command;
    dt.append(code);

    const dd = document.createElement("dd");
    dd.textContent = description;

    item.append(dt, dd);
    dl.append(item);
  });

  els.cheatSheetContent.append(dl);
}

function renderTask(taskId) {
  const task = PRACTICE_TASKS[taskId];
  if (!task || !els.taskContent) return;

  state.practice.tasks ||= {};
  state.practice.tasks[taskId] ||= { answers: {}, completedChecks: [], selfChecks: {} };
  const taskState = state.practice.tasks[taskId];
  taskState.answers ||= {};
  taskState.completedChecks ||= [];
  taskState.selfChecks ||= {};

  // Update tabs
  els.taskButtons.forEach((btn) => {
    const isActive = btn.dataset.taskId === taskId;
    btn.setAttribute("aria-selected", String(isActive));
    btn.classList.toggle("is-active", isActive);
  });

  els.taskContent.replaceChildren();

  // 1. Task Card
  const taskCard = document.createElement("article");
  taskCard.className = "practice-task-card";

  // Header
  const header = document.createElement("div");
  header.className = "practice-task-header";

  const badge = document.createElement("span");
  badge.className = "dataset-badge";
  badge.textContent = task.datasetType;

  const title = document.createElement("h2");
  title.id = "taskTitle";
  title.textContent = task.title;

  const subtitle = document.createElement("p");
  subtitle.className = "practice-subtitle";
  subtitle.textContent = task.subtitle;

  const desc = document.createElement("p");
  desc.className = "practice-desc";
  desc.textContent = task.description;

  header.append(badge, title, subtitle, desc);

  // 2. Data Table
  const tableSection = document.createElement("div");
  tableSection.className = "practice-table-section";

  const tableTitle = document.createElement("h3");
  tableTitle.textContent = "Messwerttabelle";

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-wrap";

  const table = document.createElement("table");
  table.className = "data-table practice-table";

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const thIdx = document.createElement("th");
  thIdx.textContent = "Zeile";
  thIdx.scope = "col";
  trHead.append(thIdx);

  task.tableHeaders.forEach((thText) => {
    const th = document.createElement("th");
    th.textContent = thText;
    th.scope = "col";
    trHead.append(th);
  });
  thead.append(trHead);

  const tbody = document.createElement("tbody");
  task.tableRows.forEach((row, idx) => {
    const tr = document.createElement("tr");
    const tdIdx = document.createElement("td");
    tdIdx.textContent = String(idx + 1);
    tr.append(tdIdx);

    row.forEach((val) => {
      const td = document.createElement("td");
      td.textContent = typeof val === "number" ? String(val).replace(".", ",") : String(val);
      tr.append(td);
    });
    tbody.append(tr);
  });

  table.append(thead, tbody);
  tableWrapper.append(table);
  tableSection.append(tableTitle, tableWrapper);

  // 3. Assignment
  const assignmentSection = document.createElement("div");
  assignmentSection.className = "practice-assignment-section";

  const assignHeading = document.createElement("h3");
  assignHeading.textContent = "Arbeitsauftrag";

  const assignText = document.createElement("p");
  assignText.className = "practice-assignment-text";
  assignText.textContent = task.assignment;

  const assumptionsBox = document.createElement("div");
  assumptionsBox.className = "practice-assumptions-box";
  const assumptionsHeading = document.createElement("h4");
  assumptionsHeading.textContent = "Vorgegebene Annahmen für die Fehlerregel";
  const assumptionsP = document.createElement("p");
  assumptionsP.innerHTML = task.assumptionsText;
  assumptionsBox.append(assumptionsHeading, assumptionsP);

  assignmentSection.append(assignHeading, assignText, assumptionsBox);

  // 4. Staged Hints
  const hintsSection = document.createElement("div");
  hintsSection.className = "practice-hints-section";

  const hintsHeading = document.createElement("h3");
  hintsHeading.textContent = "Gestufte Hilfen zum Vorgehen";
  hintsSection.append(hintsHeading);

  task.hints.forEach((hint) => {
    const details = document.createElement("details");
    details.className = "practice-hint-box";

    const summary = document.createElement("summary");
    summary.className = "practice-hint-summary";
    summary.textContent = `${hint.title} aufklappen`;

    const ul = document.createElement("ul");
    ul.className = "practice-hint-list";
    hint.items.forEach((itemText) => {
      const li = document.createElement("li");
      li.textContent = itemText;
      ul.append(li);
    });

    details.append(summary, ul);
    hintsSection.append(details);
  });

  // 5. Numerical Verification Form
  const formSection = document.createElement("div");
  formSection.className = "practice-form-section";

  const formHeading = document.createElement("h3");
  formHeading.textContent = "Ergebnisse prüfen";

  const formIntro = document.createElement("p");
  formIntro.className = "form-intro";
  formIntro.textContent = "Trage die in GeoGebra ermittelten Werte ein, um deine Rechnung zu kontrollieren:";

  const form = document.createElement("form");
  form.className = "practice-form";
  form.setAttribute("novalidate", "");

  const fieldsGrid = document.createElement("div");
  fieldsGrid.className = "checkpoint-fields";

  const fieldControls = new Map();

  task.fields.forEach((field) => {
    const fieldWrap = document.createElement("div");
    fieldWrap.className = "checkpoint-field result";

    const label = document.createElement("label");
    label.className = "field";
    label.htmlFor = `pf-${field.id}`;

    const labelSpan = document.createElement("span");
    labelSpan.textContent = field.unit ? `${field.label} (${field.unit})` : field.label;

    const input = document.createElement("input");
    input.id = `pf-${field.id}`;
    input.name = field.id;
    input.type = "text";
    input.inputMode = "decimal";
    input.placeholder = field.placeholder || "Ergebnis eingeben";
    input.value = String(taskState.answers[field.id] ?? "");
    input.setAttribute("aria-describedby", `pf-feedback-${field.id}`);

    const feedback = document.createElement("p");
    feedback.id = `pf-feedback-${field.id}`;
    feedback.className = "field-feedback";
    feedback.setAttribute("aria-live", "polite");

    if (validatePracticeField(field, input.value)) {
      feedback.textContent = field.correct;
      feedback.className = "field-feedback good";
    }

    const onInput = () => {
      taskState.answers[field.id] = input.value;
      input.removeAttribute("aria-invalid");
      feedback.textContent = "";
      feedback.className = "field-feedback";
      overallFeedback.textContent = "";
      overallFeedback.className = "feedback";
      save();
    };

    input.addEventListener("input", onInput);
    input.addEventListener("change", onInput);

    label.append(labelSpan, input);
    fieldWrap.append(label, feedback);
    fieldsGrid.append(fieldWrap);
    fieldControls.set(field.id, { input, feedback, field });
  });

  const submitBtn = document.createElement("button");
  submitBtn.className = "button primary";
  submitBtn.type = "submit";
  submitBtn.textContent = "Ergebnisse prüfen";

  const overallFeedback = document.createElement("p");
  overallFeedback.id = "practiceOverallFeedback";
  overallFeedback.className = "feedback";
  overallFeedback.setAttribute("role", "status");
  overallFeedback.setAttribute("aria-live", "polite");

  const isComplete = isTaskNumericallyComplete(task, taskState);
  if (isComplete) {
    overallFeedback.textContent = "Alle numerischen Kontrollen erfolgreich bestanden!";
    overallFeedback.className = "feedback good";
  }

  form.append(fieldsGrid, submitBtn, overallFeedback);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    let firstInvalid = null;
    const completedList = [];

    task.fields.forEach((field) => {
      const { input, feedback } = fieldControls.get(field.id);
      const val = input.value;
      const isValid = validatePracticeField(field, val);
      allValid = allValid && isValid;
      input.setAttribute("aria-invalid", String(!isValid));
      feedback.textContent = isValid ? field.correct : field.incorrect;
      feedback.className = `field-feedback ${isValid ? "good" : "bad"}`;
      if (isValid) completedList.push(field.id);
      if (!isValid && !firstInvalid) firstInvalid = input;
    });

    taskState.completedChecks = completedList;
    save();

    overallFeedback.textContent = allValid
      ? "Hervorragend! Alle numerischen Werte stimmen mit der GeoGebra-Auswertung überein."
      : "Noch nicht alle Werte stimmen. Prüfe die rot markierten Felder und nutze ggf. die Hilfen oben.";
    overallFeedback.className = `feedback ${allValid ? "good" : "bad"}`;

    firstInvalid?.focus();
  });

  formSection.append(formHeading, formIntro, form);

  // 6. Self-Check Section
  const selfCheckSection = document.createElement("div");
  selfCheckSection.className = "practice-self-check-section";

  const selfCheckHeading = document.createElement("h3");
  selfCheckHeading.textContent = "Selbstkontrolle deiner Dokumentation";

  const selfCheckIntro = document.createElement("p");
  selfCheckIntro.className = "self-check-intro";
  selfCheckIntro.textContent = "Überprüfe dein handschriftliches oder digitales Protokoll anhand dieser drei Kriterien:";

  const checkList = document.createElement("div");
  checkList.className = "self-check-list";

  SELF_CHECK_STATEMENTS.forEach((stmt) => {
    const itemWrap = document.createElement("label");
    itemWrap.className = "self-check-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `sc-${stmt.id}`;
    checkbox.checked = Boolean(taskState.selfChecks[stmt.id]);

    checkbox.addEventListener("change", () => {
      taskState.selfChecks[stmt.id] = checkbox.checked;
      save();
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = stmt.label;

    itemWrap.append(checkbox, textSpan);
    checkList.append(itemWrap);
  });

  const selfCheckNotice = document.createElement("p");
  selfCheckNotice.className = "self-check-notice";
  selfCheckNotice.innerHTML = "<strong>Hinweis:</strong> Es erfolgt keine automatische Bewertung handschriftlicher Texte. Die Dokumentation führst du eigenständig auf Papier oder digital durch.";

  selfCheckSection.append(selfCheckHeading, selfCheckIntro, checkList, selfCheckNotice);

  // 7. Link to documentation
  const docLinkSection = document.createElement("div");
  docLinkSection.className = "practice-doc-link-section";

  const docLink = document.createElement("a");
  docLink.className = "button secondary";
  const mappedCourseId = courseForTask(taskId);
  docLink.href = `./dokumentation.html?course=${encodeURIComponent(mappedCourseId)}`;
  docLink.textContent = "Klausurmuster und Formulierungshilfen für diese Regressionsart ansehen ↗";

  docLinkSection.append(docLink);

  // Assemble Card
  taskCard.append(
    header,
    tableSection,
    assignmentSection,
    hintsSection,
    formSection,
    selfCheckSection,
    docLinkSection
  );

  els.taskContent.append(taskCard);
  typesetMath(els.taskContent);
}

function selectTask(taskId) {
  if (!PRACTICE_TASK_IDS.includes(taskId)) return;
  state.practice.selectedTaskId = taskId;
  save();

  const url = new URL(window.location.href);
  url.searchParams.set("task", taskId);
  window.history.replaceState({}, "", url.toString());

  updateNavigation();
  renderTask(taskId);
}

// Event Listeners for Tab Buttons
els.taskButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectTask(btn.dataset.taskId);
  });
});

// Initial Render
updateNavigation();
renderCheatSheet();
renderTask(state.practice.selectedTaskId);
typesetDocument();
