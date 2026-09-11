import { LESSON_STEPS } from "./lesson-data.js";
import {
  analyzePoints,
  cloneExampleData,
  formatNumber,
  isWithin,
  parseLocaleNumber,
  powerRegression,
  validatePowerPoints
} from "./regression.js";
import { loadState, persistState } from "./state.js";

const els = {
  startCourseBtn: document.getElementById("startCourseBtn"),
  course: document.getElementById("course"),
  progressLabel: document.getElementById("progressLabel"),
  progressPercent: document.getElementById("progressPercent"),
  courseProgress: document.getElementById("courseProgress"),
  stepNav: document.getElementById("stepNav"),
  resetCourseBtn: document.getElementById("resetCourseBtn"),
  stepEyebrow: document.getElementById("stepEyebrow"),
  stepTitle: document.getElementById("stepTitle"),
  stepGoal: document.getElementById("stepGoal"),
  stepStateBadge: document.getElementById("stepStateBadge"),
  stepActions: document.getElementById("stepActions"),
  stepDataTable: document.getElementById("stepDataTable"),
  formulaBlock: document.getElementById("formulaBlock"),
  formulaText: document.getElementById("formulaText"),
  copyFormulaBtn: document.getElementById("copyFormulaBtn"),
  copyStatus: document.getElementById("copyStatus"),
  stepHint: document.getElementById("stepHint"),
  stepMistake: document.getElementById("stepMistake"),
  stepImages: document.getElementById("stepImages"),
  checkpointPrompt: document.getElementById("checkpointPrompt"),
  checkpointForm: document.getElementById("checkpointForm"),
  checkpointFields: document.getElementById("checkpointFields"),
  checkpointFeedback: document.getElementById("checkpointFeedback"),
  previousStepBtn: document.getElementById("previousStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  courseComplete: document.getElementById("courseComplete"),
  transferInputRows: document.getElementById("transferInputRows"),
  addTransferRowBtn: document.getElementById("addTransferRowBtn"),
  removeTransferRowBtn: document.getElementById("removeTransferRowBtn"),
  resetTransferBtn: document.getElementById("resetTransferBtn"),
  uncertaintyInput: document.getElementById("uncertaintyInput"),
  calculateTransferBtn: document.getElementById("calculateTransferBtn"),
  transferFeedback: document.getElementById("transferFeedback"),
  transferResults: document.getElementById("transferResults"),
  transferEquation: document.getElementById("transferEquation"),
  transferMeta: document.getElementById("transferMeta"),
  uncertaintyResult: document.getElementById("uncertaintyResult"),
  transferChart: document.getElementById("transferChart"),
  transferAnalysisRows: document.getElementById("transferAnalysisRows"),
  reflectionInput: document.getElementById("reflectionInput"),
  studentNameInput: document.getElementById("studentNameInput"),
  courseNameInput: document.getElementById("courseNameInput"),
  printStudentName: document.getElementById("printStudentName"),
  printCourseName: document.getElementById("printCourseName"),
  summaryDate: document.getElementById("summaryDate"),
  summaryStatus: document.getElementById("summaryStatus"),
  summaryProgress: document.getElementById("summaryProgress"),
  summaryChecklist: document.getElementById("summaryChecklist"),
  summaryConclusion: document.getElementById("summaryConclusion"),
  summaryTransfer: document.getElementById("summaryTransfer"),
  summaryTransferResult: document.getElementById("summaryTransferResult"),
  summaryReflection: document.getElementById("summaryReflection"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  imageDialog: document.getElementById("imageDialog"),
  closeImageDialogBtn: document.getElementById("closeImageDialogBtn"),
  dialogImageStage: document.getElementById("dialogImageStage"),
  dialogImage: document.getElementById("dialogImage"),
  dialogCaption: document.getElementById("dialogCaption")
};

let state = loadState(localStorage);

function saveState() {
  persistState(localStorage, state);
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function scrollToElement(element) {
  element.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

function setFeedback(element, text = "", type = "") {
  element.textContent = text;
  element.className = `feedback${type ? ` ${type}` : ""}`;
}

function isComplete(stepId) {
  return state.completedSteps.includes(stepId);
}

function recommendedStepIndex() {
  const index = LESSON_STEPS.findIndex(({ id }) => !isComplete(id));
  return index === -1 ? LESSON_STEPS.length - 1 : index;
}

function renderProgress() {
  const count = state.completedSteps.length;
  const percent = Math.round((count / LESSON_STEPS.length) * 100);
  els.progressLabel.textContent = `${count} von ${LESSON_STEPS.length} Schritten`;
  els.progressPercent.textContent = `${percent} %`;
  els.courseProgress.max = LESSON_STEPS.length;
  els.courseProgress.value = count;
  els.courseProgress.textContent = `${count} von ${LESSON_STEPS.length}`;
  els.courseComplete.hidden = count !== LESSON_STEPS.length;
}

function renderStepNav() {
  const recommended = recommendedStepIndex();
  els.stepNav.replaceChildren();

  LESSON_STEPS.forEach((step, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.stepIndex = String(index);
    button.setAttribute("aria-label", `Schritt ${index + 1}: ${step.title}${isComplete(step.id) ? ", abgeschlossen" : ""}`);
    if (index === state.currentStep) button.setAttribute("aria-current", "step");
    if (index === recommended && !isComplete(step.id)) button.classList.add("is-next");

    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = String(index + 1);
    const label = document.createElement("span");
    label.className = "step-nav-label";
    label.textContent = step.shortTitle;
    button.append(number, label);

    if (isComplete(step.id)) {
      const check = document.createElement("span");
      check.className = "step-check";
      check.textContent = "✓";
      check.setAttribute("aria-hidden", "true");
      button.append(check);
    }

    button.addEventListener("click", () => setCurrentStep(index));
    item.append(button);
    els.stepNav.append(item);
  });
}

function renderSourceData(data) {
  els.stepDataTable.replaceChildren();
  if (!data) {
    els.stepDataTable.hidden = true;
    return;
  }

  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.textContent = "Messwerte für den Lernweg";
  const head = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Nr.", "A: r (cm)", "B: F (mN)"].forEach((text) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = text;
    headerRow.append(th);
  });
  head.append(headerRow);

  const body = document.createElement("tbody");
  data.forEach(({ r, f }, index) => {
    const row = document.createElement("tr");
    [index + 1, r, f].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = String(value);
      row.append(cell);
    });
    body.append(row);
  });
  table.append(caption, head, body);
  els.stepDataTable.append(table);
  els.stepDataTable.hidden = false;
}

function openImageDialog(image) {
  els.dialogImageStage.querySelectorAll(".image-highlight").forEach((marker) => marker.remove());
  els.dialogImageStage.style.width = `${Math.max(image.width, 760)}px`;
  els.dialogImage.src = image.src;
  els.dialogImage.alt = image.alt;
  els.dialogCaption.textContent = image.caption;
  image.highlights?.forEach((highlight) => {
    els.dialogImageStage.append(createImageHighlight(highlight));
  });
  if (typeof els.imageDialog.showModal === "function") {
    els.imageDialog.showModal();
  } else {
    els.imageDialog.setAttribute("open", "");
  }
}

function createImageHighlight(highlight) {
  const marker = document.createElement("span");
  marker.className = "image-highlight";
  marker.style.left = `${highlight.x}%`;
  marker.style.top = `${highlight.y}%`;
  marker.style.width = `${highlight.width}%`;
  marker.style.height = `${highlight.height}%`;
  marker.setAttribute("aria-hidden", "true");
  const label = document.createElement("span");
  label.textContent = highlight.label;
  marker.append(label);
  return marker;
}

function closeImageDialog() {
  if (typeof els.imageDialog.close === "function" && els.imageDialog.open) {
    els.imageDialog.close();
  } else {
    els.imageDialog.removeAttribute("open");
  }
}

function renderStepImages(images) {
  els.stepImages.replaceChildren();
  images.forEach((image, imageIndex) => {
    const figure = document.createElement("figure");
    figure.className = "step-figure";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "figure-button";
    button.setAttribute("aria-label", `${image.caption} – Bild vergrößern`);

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.width = image.width;
    img.height = image.height;
    img.loading = state.currentStep === 0 && imageIndex === 0 ? "eager" : "lazy";
    img.decoding = "async";
    button.append(img);

    image.highlights?.forEach((highlight) => {
      button.append(createImageHighlight(highlight));
    });

    const zoom = document.createElement("span");
    zoom.className = "figure-zoom-label";
    zoom.textContent = "Antippen zum Vergrößern";
    zoom.setAttribute("aria-hidden", "true");
    button.append(zoom);
    button.addEventListener("click", () => openImageDialog(image));

    const caption = document.createElement("figcaption");
    caption.textContent = image.caption;
    figure.append(button, caption);
    els.stepImages.append(figure);
  });
}

function fieldValue(stepId, fieldId) {
  return state.answers[stepId]?.[fieldId] ?? "";
}

function markStepIncomplete(stepId) {
  if (!isComplete(stepId)) return;
  state.completedSteps = state.completedSteps.filter((id) => id !== stepId);
  updateCurrentStepState();
  renderProgress();
  renderStepNav();
  renderSummary();
}

function storeCheckpointValue(stepId, field, control) {
  state.answers[stepId] ||= {};
  state.answers[stepId][field.id] = field.type === "checkbox" ? control.checked : control.value;
  control.removeAttribute("aria-invalid");
  markStepIncomplete(stepId);
  setFeedback(els.checkpointFeedback);
  saveState();
}

function createCheckpointControl(step, field) {
  if (field.type === "checkbox") {
    const label = document.createElement("label");
    label.className = "checkbox-field";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `check-${step.id}-${field.id}`;
    input.checked = Boolean(fieldValue(step.id, field.id));
    const text = document.createElement("span");
    text.textContent = field.label;
    input.addEventListener("change", () => storeCheckpointValue(step.id, field, input));
    label.append(input, text);
    return { wrapper: label, control: input };
  }

  const label = document.createElement("label");
  label.className = "field";
  const text = document.createElement("span");
  text.textContent = field.label;
  const control = field.type === "choice" ? document.createElement("select") : document.createElement("input");
  control.id = `check-${step.id}-${field.id}`;

  if (field.type === "choice") {
    field.options.forEach((option) => {
      const element = document.createElement("option");
      element.value = option.value;
      element.textContent = option.label;
      control.append(element);
    });
  } else {
    control.type = "text";
    control.inputMode = "decimal";
    control.placeholder = field.placeholder || "";
    control.autocomplete = "off";
  }

  control.value = String(fieldValue(step.id, field.id));
  control.addEventListener("input", () => storeCheckpointValue(step.id, field, control));
  control.addEventListener("change", () => storeCheckpointValue(step.id, field, control));
  label.append(text, control);
  return { wrapper: label, control };
}

function renderCheckpoint(step) {
  els.checkpointPrompt.textContent = step.check.prompt;
  els.checkpointFields.replaceChildren();
  step.check.fields.forEach((field) => {
    const { wrapper } = createCheckpointControl(step, field);
    els.checkpointFields.append(wrapper);
  });

  if (isComplete(step.id)) {
    setFeedback(els.checkpointFeedback, step.check.success, "good");
  } else {
    setFeedback(els.checkpointFeedback);
  }
}

function updateCurrentStepState() {
  const step = LESSON_STEPS[state.currentStep];
  const complete = isComplete(step.id);
  els.stepStateBadge.textContent = complete ? "Abgeschlossen" : "Noch offen";
  els.stepStateBadge.className = `state-badge${complete ? " complete" : ""}`;
}

function renderLesson() {
  const step = LESSON_STEPS[state.currentStep];
  els.stepEyebrow.textContent = `Schritt ${state.currentStep + 1} von ${LESSON_STEPS.length}`;
  els.stepTitle.textContent = step.title;
  els.stepGoal.textContent = step.goal;
  updateCurrentStepState();

  els.stepActions.replaceChildren();
  step.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    els.stepActions.append(item);
  });

  renderSourceData(step.dataTable);
  els.formulaBlock.hidden = !step.formula;
  els.formulaText.textContent = step.formula || "";
  els.stepHint.textContent = step.hint;
  els.stepMistake.textContent = step.mistake;
  document.querySelector(".help-box").open = false;
  renderStepImages(step.images);
  renderCheckpoint(step);

  els.previousStepBtn.disabled = state.currentStep === 0;
  els.nextStepBtn.textContent = state.currentStep === LESSON_STEPS.length - 1 ? "Zum Transfer ↓" : "Weiter →";
}

function renderCourse() {
  renderProgress();
  renderStepNav();
  renderLesson();
}

function setCurrentStep(index, shouldScroll = true) {
  state.currentStep = Math.max(0, Math.min(LESSON_STEPS.length - 1, index));
  saveState();
  renderCourse();
  if (shouldScroll) scrollToElement(els.course);
}

function validateCheckpoint(step) {
  let valid = true;
  step.check.fields.forEach((field) => {
    const control = document.getElementById(`check-${step.id}-${field.id}`);
    let fieldValid = false;
    if (field.type === "number") {
      fieldValid = isWithin(control.value, field.expected, field.tolerance);
    } else if (field.type === "choice") {
      fieldValid = control.value === field.expected;
    } else if (field.type === "checkbox") {
      fieldValid = control.checked === field.expected;
    }
    control.setAttribute("aria-invalid", fieldValid ? "false" : "true");
    valid = valid && fieldValid;
  });
  return valid;
}

async function copyCurrentFormula() {
  const formula = LESSON_STEPS[state.currentStep].formula;
  if (!formula) return;
  try {
    await navigator.clipboard.writeText(formula);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = formula;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  const original = els.copyFormulaBtn.textContent;
  els.copyFormulaBtn.textContent = "Kopiert ✓";
  els.copyStatus.textContent = `Eingabe ${formula} wurde kopiert.`;
  window.setTimeout(() => { els.copyFormulaBtn.textContent = original; }, 1400);
}

function clearTransferResult() {
  state.transfer.result = null;
  els.transferResults.hidden = true;
  els.transferAnalysisRows.replaceChildren();
  els.transferChart.replaceChildren();
  renderSummary();
}

function renderTransferRows() {
  els.transferInputRows.replaceChildren();
  state.transfer.data.forEach((dataRow, index) => {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    numberCell.textContent = String(index + 1);
    row.append(numberCell);

    ["r", "f"].forEach((key) => {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "decimal";
      input.className = "cell-input";
      input.value = String(dataRow[key] ?? "");
      input.setAttribute("aria-label", `${key === "r" ? "r" : "F"} in Zeile ${index + 1}`);
      input.addEventListener("input", () => {
        state.transfer.data[index][key] = input.value;
        clearTransferResult();
        setFeedback(els.transferFeedback);
        saveState();
      });
      cell.append(input);
      row.append(cell);
    });
    els.transferInputRows.append(row);
  });

  els.addTransferRowBtn.disabled = state.transfer.data.length >= 30;
  els.removeTransferRowBtn.disabled = state.transfer.data.length <= 3;
}

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
  return element;
}

function addSvgText(svg, x, y, content, attributes = {}) {
  const text = createSvgElement("text", { x, y, ...attributes });
  text.textContent = content;
  svg.append(text);
  return text;
}

function renderTransferChart(points, regression) {
  const svg = els.transferChart;
  svg.replaceChildren();
  const title = createSvgElement("title");
  title.textContent = "Eigene Messwerte und berechnete Potenzregression";
  const description = createSvgElement("desc");
  description.textContent = `Streudiagramm mit ${points.length} Messpunkten und der Funktion F von r gleich ${formatNumber(regression.a, 4)} mal r hoch ${formatNumber(regression.b, 4)}.`;
  svg.append(title, description);

  const width = 760;
  const height = 420;
  const margin = { left: 68, right: 28, top: 24, bottom: 58 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const rValues = points.map(({ r }) => r);
  const fValues = points.map(({ f }) => f);
  let minX = Math.min(...rValues) * 0.9;
  let maxX = Math.max(...rValues) * 1.08;
  if (minX === maxX) {
    minX *= 0.9;
    maxX *= 1.1;
  }
  const maxY = Math.max(...fValues) * 1.14 || 1;
  const x = (value) => margin.left + ((value - minX) / (maxX - minX)) * plotWidth;
  const y = (value) => margin.top + plotHeight - (value / maxY) * plotHeight;

  const grid = createSvgElement("g", { stroke: "#e7e4ed", "stroke-width": 1 });
  svg.append(grid);
  const ticks = 5;
  for (let index = 0; index <= ticks; index += 1) {
    const gridX = margin.left + (plotWidth * index) / ticks;
    const gridY = margin.top + (plotHeight * index) / ticks;
    grid.append(createSvgElement("line", { x1: gridX, y1: margin.top, x2: gridX, y2: margin.top + plotHeight }));
    grid.append(createSvgElement("line", { x1: margin.left, y1: gridY, x2: margin.left + plotWidth, y2: gridY }));
    const xValue = minX + ((maxX - minX) * index) / ticks;
    const yValue = maxY - (maxY * index) / ticks;
    addSvgText(svg, gridX, height - 30, formatNumber(xValue, 2), { "text-anchor": "middle", fill: "#68647b", "font-size": 12 });
    addSvgText(svg, margin.left - 12, gridY + 4, formatNumber(yValue, 2), { "text-anchor": "end", fill: "#68647b", "font-size": 12 });
  }

  svg.append(createSvgElement("line", { x1: margin.left, y1: margin.top + plotHeight, x2: margin.left + plotWidth, y2: margin.top + plotHeight, stroke: "#504b5f", "stroke-width": 1.5 }));
  svg.append(createSvgElement("line", { x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + plotHeight, stroke: "#504b5f", "stroke-width": 1.5 }));
  addSvgText(svg, margin.left + plotWidth / 2, height - 7, "r", { "text-anchor": "middle", fill: "#242236", "font-size": 15, "font-weight": 700 });
  addSvgText(svg, 18, margin.top + plotHeight / 2, "F", { "text-anchor": "middle", fill: "#242236", "font-size": 15, "font-weight": 700, transform: `rotate(-90 18 ${margin.top + plotHeight / 2})` });

  let pathData = "";
  const samples = 180;
  for (let index = 0; index <= samples; index += 1) {
    const r = minX + ((maxX - minX) * index) / samples;
    const f = regression.a * (r ** regression.b);
    pathData += `${index === 0 ? "M" : "L"}${x(r).toFixed(2)},${y(f).toFixed(2)} `;
  }
  svg.append(createSvgElement("path", { d: pathData, fill: "none", stroke: "#6552c8", "stroke-width": 3 }));

  points.forEach(({ r, f }, index) => {
    const circle = createSvgElement("circle", { cx: x(r), cy: y(f), r: 6, fill: "#242236", stroke: "#fff", "stroke-width": 2 });
    const pointTitle = createSvgElement("title");
    pointTitle.textContent = `Messpunkt ${index + 1}: r = ${formatNumber(r, 3)}, F = ${formatNumber(f, 4)}`;
    circle.append(pointTitle);
    svg.append(circle);
  });
}

function renderTransferResult(points, regression, analysis, uncertainty) {
  els.transferResults.hidden = false;
  els.transferEquation.textContent = `F(r) ≈ ${formatNumber(regression.a, 5)} · r^(${formatNumber(regression.b, 5)})`;
  els.transferMeta.textContent = `Exponent b ≈ ${formatNumber(regression.b, 5)} · Bestimmtheitsmaß R² ≈ ${formatNumber(regression.r2, 4)} · größte Abweichung ≈ ${formatNumber(Math.abs(analysis.maxDeviation.deviation), 2)} %`;

  if (uncertainty === null) {
    els.uncertaintyResult.textContent = "Ohne angegebene Messunsicherheit wird keine automatische Aussage zur Vereinbarkeit getroffen. Beurteile Exponent und Streuung in deiner Reflexion.";
  } else {
    const within = Math.abs(analysis.maxDeviation.deviation) <= uncertainty;
    els.uncertaintyResult.textContent = `Als grobe Orientierung liegt die größte Modellabweichung ${within ? "innerhalb" : "oberhalb"} deiner angegebenen Messunsicherheit von ${formatNumber(uncertainty, 2)} %. Das ersetzt keine vollständige Fehlerrechnung.`;
  }

  els.transferAnalysisRows.replaceChildren();
  analysis.rows.forEach((rowData) => {
    const row = document.createElement("tr");
    [
      formatNumber(rowData.r, 3),
      formatNumber(rowData.f, 5),
      formatNumber(rowData.predicted, 6),
      `${formatNumber(rowData.deviation, 2)} %`
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    els.transferAnalysisRows.append(row);
  });
  renderTransferChart(points, regression);
}

function calculateTransfer() {
  const validation = validatePowerPoints(state.transfer.data);
  if (!validation.valid) {
    setFeedback(els.transferFeedback, validation.errors.join(" "), "bad");
    els.transferResults.hidden = true;
    state.transfer.result = null;
    saveState();
    renderSummary();
    return;
  }

  const uncertaintyText = state.transfer.uncertainty.trim();
  const uncertainty = uncertaintyText === "" ? null : parseLocaleNumber(uncertaintyText);
  if (uncertainty !== null && (!Number.isFinite(uncertainty) || uncertainty <= 0)) {
    setFeedback(els.transferFeedback, "Die Messunsicherheit muss eine positive Prozentzahl sein oder leer bleiben.", "bad");
    els.uncertaintyInput.setAttribute("aria-invalid", "true");
    return;
  }
  els.uncertaintyInput.removeAttribute("aria-invalid");

  const regression = powerRegression(validation.points);
  if (!regression) {
    setFeedback(els.transferFeedback, "Aus diesen Daten konnte keine Potenzregression bestimmt werden.", "bad");
    return;
  }

  const analysis = analyzePoints(validation.points, regression);
  state.transfer.result = {
    a: regression.a,
    b: regression.b,
    r2: regression.r2,
    maxDeviation: analysis.maxDeviation.deviation,
    uncertainty
  };
  saveState();
  renderTransferResult(validation.points, regression, analysis, uncertainty);
  setFeedback(els.transferFeedback, "Die Messreihe wurde erfolgreich ausgewertet.", "good");
  renderSummary();
}

function restoreTransferResult() {
  if (!state.transfer.result) return;
  const validation = validatePowerPoints(state.transfer.data);
  const regression = validation.valid ? powerRegression(validation.points) : null;
  if (!validation.valid || !regression) {
    state.transfer.result = null;
    return;
  }
  const analysis = analyzePoints(validation.points, regression);
  renderTransferResult(validation.points, regression, analysis, state.transfer.result.uncertainty ?? null);
}

function renderSummary() {
  const completeCount = state.completedSteps.length;
  const courseComplete = completeCount === LESSON_STEPS.length;
  els.summaryStatus.textContent = courseComplete ? "Abgeschlossen" : "In Bearbeitung";
  els.summaryStatus.className = `summary-status${courseComplete ? " complete" : ""}`;
  els.summaryProgress.textContent = `${completeCount} von ${LESSON_STEPS.length} Schritten abgeschlossen`;
  els.printStudentName.textContent = state.student.name.trim() || "–";
  els.printCourseName.textContent = state.student.course.trim() || "–";
  els.summaryDate.textContent = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date());

  els.summaryChecklist.replaceChildren();
  LESSON_STEPS.forEach((step, index) => {
    const item = document.createElement("li");
    if (isComplete(step.id)) item.className = "complete";
    item.textContent = `${index + 1}. ${step.title}`;
    els.summaryChecklist.append(item);
  });

  els.summaryConclusion.textContent = courseComplete
    ? "Der Regressions-Exponent −2,075 liegt nahe bei −2. Die maximale Abweichung von etwa 15,7 % liegt im Bereich des möglichen relativen Einzelfehlers von rund 16,7 %. Die Messwerte sind deshalb innerhalb der angenommenen Messgenauigkeit mit einem 1/r²-Gesetz vereinbar."
    : "Die abschließende Beurteilung wird nach dem erfolgreichen Kontrollpunkt in Schritt 8 eingetragen.";

  const hasTransfer = Boolean(state.transfer.result) || Boolean(state.transfer.reflection.trim());
  els.summaryTransfer.hidden = !hasTransfer;
  if (state.transfer.result) {
    const result = state.transfer.result;
    els.summaryTransferResult.textContent = `Eigene Regression: F(r) ≈ ${formatNumber(result.a, 5)} · r^(${formatNumber(result.b, 5)}), größte Abweichung ≈ ${formatNumber(Math.abs(result.maxDeviation), 2)} %.`;
  } else {
    els.summaryTransferResult.textContent = "Für die eigene Messreihe wurde noch keine Regression gespeichert.";
  }
  els.summaryReflection.textContent = state.transfer.reflection.trim()
    ? `Reflexion: ${state.transfer.reflection.trim()}`
    : "Keine zusätzliche Reflexion eingetragen.";
}

els.startCourseBtn.addEventListener("click", () => scrollToElement(els.course));
els.resetCourseBtn.addEventListener("click", () => {
  if (!window.confirm("Möchtest du alle acht Kontrollpunkte und ihre Antworten zurücksetzen? Deine Transferdaten bleiben erhalten.")) return;
  state.currentStep = 0;
  state.completedSteps = [];
  state.answers = {};
  saveState();
  renderCourse();
  renderSummary();
  scrollToElement(els.course);
});

els.previousStepBtn.addEventListener("click", () => setCurrentStep(state.currentStep - 1));
els.nextStepBtn.addEventListener("click", () => {
  if (state.currentStep === LESSON_STEPS.length - 1) {
    scrollToElement(document.getElementById("transfer"));
  } else {
    setCurrentStep(state.currentStep + 1);
  }
});

els.checkpointForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const step = LESSON_STEPS[state.currentStep];
  if (validateCheckpoint(step)) {
    if (!isComplete(step.id)) state.completedSteps.push(step.id);
    saveState();
    setFeedback(els.checkpointFeedback, step.check.success, "good");
    updateCurrentStepState();
    renderProgress();
    renderStepNav();
    renderSummary();
  } else {
    setFeedback(els.checkpointFeedback, step.check.retry, "bad");
  }
});

els.copyFormulaBtn.addEventListener("click", copyCurrentFormula);
els.closeImageDialogBtn.addEventListener("click", closeImageDialog);
els.imageDialog.addEventListener("click", (event) => {
  if (event.target === els.imageDialog) closeImageDialog();
});

els.addTransferRowBtn.addEventListener("click", () => {
  if (state.transfer.data.length >= 30) return;
  state.transfer.data.push({ r: "", f: "" });
  clearTransferResult();
  renderTransferRows();
  saveState();
});

els.removeTransferRowBtn.addEventListener("click", () => {
  if (state.transfer.data.length <= 3) return;
  state.transfer.data.pop();
  clearTransferResult();
  renderTransferRows();
  saveState();
});

els.resetTransferBtn.addEventListener("click", () => {
  if (!window.confirm("Möchtest du deine Transferdaten durch die sechs Beispieldaten ersetzen?")) return;
  state.transfer.data = cloneExampleData();
  state.transfer.uncertainty = "";
  state.transfer.result = null;
  els.uncertaintyInput.value = "";
  renderTransferRows();
  els.transferResults.hidden = true;
  setFeedback(els.transferFeedback, "Die Beispieldaten wurden eingesetzt.", "good");
  saveState();
  renderSummary();
});

els.uncertaintyInput.addEventListener("input", () => {
  state.transfer.uncertainty = els.uncertaintyInput.value;
  els.uncertaintyInput.removeAttribute("aria-invalid");
  clearTransferResult();
  setFeedback(els.transferFeedback);
  saveState();
});

els.calculateTransferBtn.addEventListener("click", calculateTransfer);
els.reflectionInput.addEventListener("input", () => {
  state.transfer.reflection = els.reflectionInput.value;
  saveState();
  renderSummary();
});

els.studentNameInput.addEventListener("input", () => {
  state.student.name = els.studentNameInput.value;
  saveState();
  renderSummary();
});

els.courseNameInput.addEventListener("input", () => {
  state.student.course = els.courseNameInput.value;
  saveState();
  renderSummary();
});

els.printSummaryBtn.addEventListener("click", () => {
  renderSummary();
  window.print();
});
window.addEventListener("beforeprint", renderSummary);

function initialize() {
  els.uncertaintyInput.value = state.transfer.uncertainty;
  els.reflectionInput.value = state.transfer.reflection;
  els.studentNameInput.value = state.student.name;
  els.courseNameInput.value = state.student.course;
  renderCourse();
  renderTransferRows();
  restoreTransferResult();
  renderSummary();
  saveState();
}

initialize();
