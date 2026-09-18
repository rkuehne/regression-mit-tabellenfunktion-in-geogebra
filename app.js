import { COURSE_IDS, COURSES } from "./lesson-data.js";
import {
  analyzePoints,
  analyzeProportionality,
  analyzeUqLinear,
  analyzeUqPower,
  cloneExampleData,
  cloneUqExampleData,
  deviationsWithinLimit,
  formatNumber,
  greatestSingleRelativeError,
  isWithin,
  linearRegression,
  parseLocaleNumber,
  powerRegression,
  relativeExponentDeviation,
  uqPowerRegression,
  validateUqPoints,
  validatePowerPoints
} from "./regression.js";
import { loadState, persistState } from "./state.js";

const els = {
  startCourseBtn: document.getElementById("startCourseBtn"),
  coursePicker: document.getElementById("coursePicker"),
  courseChoiceButtons: [...document.querySelectorAll("[data-course-id]")],
  courseChoiceStatus: document.getElementById("courseChoiceStatus"),
  course: document.getElementById("course"),
  courseEyebrow: document.getElementById("courseEyebrow"),
  courseTitle: document.getElementById("course-title"),
  courseIntro: document.getElementById("courseIntro"),
  learningMap: document.getElementById("learningMap"),
  progressLabel: document.getElementById("progressLabel"),
  progressPercent: document.getElementById("progressPercent"),
  courseProgress: document.getElementById("courseProgress"),
  explainModeBtn: document.getElementById("explainModeBtn"),
  compactModeBtn: document.getElementById("compactModeBtn"),
  openGlossaryBtn: document.getElementById("openGlossaryBtn"),
  stepNav: document.getElementById("stepNav"),
  resetCourseBtn: document.getElementById("resetCourseBtn"),
  stepEyebrow: document.getElementById("stepEyebrow"),
  stepTitle: document.getElementById("stepTitle"),
  stepGoal: document.getElementById("stepGoal"),
  stepWhy: document.getElementById("stepWhy"),
  depthContent: document.getElementById("depthContent"),
  stepConcepts: document.getElementById("stepConcepts"),
  exampleHeading: document.getElementById("example-heading"),
  stepWorkedExample: document.getElementById("stepWorkedExample"),
  ipadHeading: document.getElementById("ipad-heading"),
  lessonGrid: document.getElementById("lessonGrid"),
  stepRemember: document.getElementById("stepRemember"),
  stepStateBadge: document.getElementById("stepStateBadge"),
  stepActions: document.getElementById("stepActions"),
  stepDataTable: document.getElementById("stepDataTable"),
  formulaBlock: document.getElementById("formulaBlock"),
  formulaText: document.getElementById("formulaText"),
  copyFormulaBtn: document.getElementById("copyFormulaBtn"),
  copyStatus: document.getElementById("copyStatus"),
  stepTroubleshooting: document.getElementById("stepTroubleshooting"),
  stepMistake: document.getElementById("stepMistake"),
  stepImages: document.getElementById("stepImages"),
  checkpointPrompt: document.getElementById("checkpointPrompt"),
  checkpointForm: document.getElementById("checkpointForm"),
  checkpointFields: document.getElementById("checkpointFields"),
  checkpointFeedback: document.getElementById("checkpointFeedback"),
  previousStepBtn: document.getElementById("previousStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  courseComplete: document.getElementById("courseComplete"),
  completionTitle: document.getElementById("completionTitle"),
  completionText: document.getElementById("completionText"),
  completionActionLink: document.getElementById("completionActionLink"),
  sharedRequirementCard: document.getElementById("sharedRequirementCard"),
  sharedRequirementText: document.getElementById("sharedRequirementText"),
  sharedRequirementLink: document.getElementById("sharedRequirementLink"),
  transferMethodSelect: document.getElementById("transferMethodSelect"),
  transferSection: document.getElementById("transfer"),
  transferIntro: document.getElementById("transferIntro"),
  transferInputTitle: document.getElementById("transferInputTitle"),
  transferXHeader: document.getElementById("transferXHeader"),
  transferYHeader: document.getElementById("transferYHeader"),
  transferInputRows: document.getElementById("transferInputRows"),
  addTransferRowBtn: document.getElementById("addTransferRowBtn"),
  removeTransferRowBtn: document.getElementById("removeTransferRowBtn"),
  resetTransferBtn: document.getElementById("resetTransferBtn"),
  uncertaintyInput: document.getElementById("uncertaintyInput"),
  relativeUncertaintyGroup: document.getElementById("relativeUncertaintyGroup"),
  uqUncertaintyGroup: document.getElementById("uqUncertaintyGroup"),
  deltaUInput: document.getElementById("deltaUInput"),
  deltaQInput: document.getElementById("deltaQInput"),
  uncertaintyNote: document.getElementById("uncertaintyNote"),
  transferSharedErrorLinkWrap: document.getElementById("transferSharedErrorLinkWrap"),
  transferSharedErrorLink: document.getElementById("transferSharedErrorLink"),
  calculateTransferBtn: document.getElementById("calculateTransferBtn"),
  transferFeedback: document.getElementById("transferFeedback"),
  transferResults: document.getElementById("transferResults"),
  transferResultTitle: document.getElementById("transferResultTitle"),
  transferEquation: document.getElementById("transferEquation"),
  transferMeta: document.getElementById("transferMeta"),
  uncertaintyResult: document.getElementById("uncertaintyResult"),
  transferChart: document.getElementById("transferChart"),
  chartModelLabel: document.getElementById("chartModelLabel"),
  resultXHeader: document.getElementById("resultXHeader"),
  resultYHeader: document.getElementById("resultYHeader"),
  resultModelHeader: document.getElementById("resultModelHeader"),
  resultDeviationHeader: document.getElementById("resultDeviationHeader"),
  transferAnalysisRows: document.getElementById("transferAnalysisRows"),
  reflectionInput: document.getElementById("reflectionInput"),
  studentNameInput: document.getElementById("studentNameInput"),
  courseNameInput: document.getElementById("courseNameInput"),
  printStudentName: document.getElementById("printStudentName"),
  printCourseName: document.getElementById("printCourseName"),
  summaryDate: document.getElementById("summaryDate"),
  summaryStatus: document.getElementById("summaryStatus"),
  summarySubtitle: document.getElementById("summarySubtitle"),
  summaryProgress: document.getElementById("summaryProgress"),
  summaryChecklist: document.getElementById("summaryChecklist"),
  summaryKeyResults: document.getElementById("summaryKeyResults"),
  summaryCompetencies: document.getElementById("summaryCompetencies"),
  summaryConclusion: document.getElementById("summaryConclusion"),
  summaryTransfer: document.getElementById("summaryTransfer"),
  summaryTransferResult: document.getElementById("summaryTransferResult"),
  summaryReflection: document.getElementById("summaryReflection"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  glossaryDialog: document.getElementById("glossaryDialog"),
  closeGlossaryBtn: document.getElementById("closeGlossaryBtn"),
  imageDialog: document.getElementById("imageDialog"),
  closeImageDialogBtn: document.getElementById("closeImageDialogBtn"),
  dialogImageStage: document.getElementById("dialogImageStage"),
  dialogImage: document.getElementById("dialogImage"),
  dialogCaption: document.getElementById("dialogCaption")
};

let state = loadState(localStorage);

function activeCourse() {
  return COURSES[state.activeCourseId];
}

function activeProgress() {
  return state.courses[state.activeCourseId];
}

function activeTransfer() {
  return state.transfer.methods[state.transfer.activeMethod];
}

function sharedRequirementState(course = activeCourse()) {
  return course.sharedRequirement ? state.sharedModules?.[course.sharedRequirement] : null;
}

function isSharedRequirementComplete(course = activeCourse()) {
  return !course.sharedRequirement || sharedRequirementState(course)?.completed === true;
}

function isCourseComplete(course = activeCourse(), progress = activeProgress()) {
  return progress.completedSteps.length === course.steps.length && isSharedRequirementComplete(course);
}

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
  return activeProgress().completedSteps.includes(stepId);
}

function recommendedStepIndex() {
  const steps = activeCourse().steps;
  const index = steps.findIndex(({ id }) => !isComplete(id));
  return index === -1 ? steps.length - 1 : index;
}

function renderLessonMode() {
  const explain = state.lessonMode !== "compact";
  els.explainModeBtn.setAttribute("aria-pressed", String(explain));
  els.compactModeBtn.setAttribute("aria-pressed", String(!explain));
  els.depthContent.hidden = !explain;
  document.body.dataset.lessonMode = explain ? "explain" : "compact";
}

function setLessonMode(mode) {
  state.lessonMode = mode === "compact" ? "compact" : "explain";
  renderLessonMode();
  saveState();
}

function renderProgress() {
  const course = activeCourse();
  const count = activeProgress().completedSteps.length;
  const percent = Math.round((count / course.steps.length) * 100);
  els.progressLabel.textContent = `${count} von ${course.steps.length} Kapiteln`;
  els.progressPercent.textContent = `${percent} %`;
  els.courseProgress.max = course.steps.length;
  els.courseProgress.value = count;
  els.courseProgress.textContent = `${count} von ${course.steps.length} Kapiteln`;
  const chaptersComplete = count === course.steps.length;
  const sharedComplete = isSharedRequirementComplete(course);
  els.courseComplete.hidden = !chaptersComplete;
  els.courseComplete.classList.toggle("pending", chaptersComplete && !sharedComplete);
  if (chaptersComplete && !sharedComplete) {
    els.completionTitle.textContent = "Noch ein gemeinsamer Pflichtschritt";
    els.completionText.textContent = "Schließe die Methode des größten Einzelfehlers einmal ab. Danach gilt sie für alle drei Q–U-Lernwege.";
    els.completionActionLink.href = `./groesster-einzelfehler.html?course=${encodeURIComponent(course.id)}`;
    els.completionActionLink.textContent = "Fehlerseite abschließen";
  } else if (chaptersComplete) {
    els.completionTitle.textContent = `${course.title} abgeschlossen`;
    els.completionText.textContent = course.transferMethod
      ? "Du kannst den Auswertungsweg fachlich begründen, auf eigene Messdaten übertragen und im Lernnachweis dokumentieren."
      : "Du kannst den Auswertungsweg fachlich begründen und im Lernnachweis dokumentieren.";
    els.completionActionLink.href = course.transferMethod ? "#transfer" : "#summary";
    els.completionActionLink.textContent = course.transferMethod ? "Zum Transfer" : "Zum Lernnachweis";
  }
}

function renderStepNav() {
  const recommended = recommendedStepIndex();
  els.stepNav.replaceChildren();

  const progress = activeProgress();
  activeCourse().steps.forEach((step, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.stepIndex = String(index);
    button.setAttribute("aria-label", `Kapitel ${index + 1}: ${step.title}${isComplete(step.id) ? ", abgeschlossen" : ""}`);
    if (index === progress.currentStep) button.setAttribute("aria-current", "step");
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

function renderSourceData(step) {
  const data = step.dataTable;
  els.stepDataTable.replaceChildren();
  if (!data) {
    els.stepDataTable.hidden = true;
    return;
  }

  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.textContent = step.dataCaption || "Messwerte für den Lernweg";
  const head = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Nr.", ...(step.dataHeaders || activeCourse().dataHeaders)].forEach((text) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = text;
    headerRow.append(th);
  });
  head.append(headerRow);

  const body = document.createElement("tbody");
  const keys = step.dataKeys || activeCourse().dataKeys;
  const digits = step.dataFormatDigits ?? 3;
  data.forEach((dataRow, index) => {
    const row = document.createElement("tr");
    const markExcluded = Boolean(step.markExcludedRows && dataRow.excluded);
    if (markExcluded) {
      row.className = "excluded-data-row";
      row.title = "Ungeklärtes Wertepaar – nicht für die Regression verwendet";
    }
    [index + 1, ...keys.map((key) => dataRow[key])].forEach((value, columnIndex) => {
      const cell = document.createElement("td");
      cell.textContent = columnIndex === 0
        ? `${value}${markExcluded ? "*" : ""}`
        : formatNumber(value, digits);
      row.append(cell);
    });
    body.append(row);
  });
  table.append(caption, head, body);
  els.stepDataTable.append(table);
  els.stepDataTable.hidden = false;
}

function renderExplanation(step) {
  els.stepWhy.textContent = step.why;
  els.stepConcepts.replaceChildren();
  step.concepts.forEach(({ term, text }) => {
    const item = document.createElement("div");
    const name = document.createElement("dt");
    const description = document.createElement("dd");
    name.textContent = term;
    description.textContent = text;
    item.append(name, description);
    els.stepConcepts.append(item);
  });

  els.exampleHeading.textContent = step.workedExample.title;
  els.stepWorkedExample.replaceChildren();
  step.workedExample.lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    els.stepWorkedExample.append(paragraph);
  });

  els.ipadHeading.textContent = step.actionHeading;
  els.stepRemember.textContent = step.remember;
  renderLessonMode();
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

function openGlossary() {
  if (typeof els.glossaryDialog.showModal === "function") {
    els.glossaryDialog.showModal();
  } else {
    els.glossaryDialog.setAttribute("open", "");
  }
}

function closeGlossary() {
  if (typeof els.glossaryDialog.close === "function" && els.glossaryDialog.open) {
    els.glossaryDialog.close();
  } else {
    els.glossaryDialog.removeAttribute("open");
  }
}

function renderStepImages(images) {
  els.stepImages.replaceChildren();
  els.stepImages.hidden = images.length === 0;
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
    img.loading = activeProgress().currentStep === 0 && imageIndex === 0 ? "eager" : "lazy";
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
  return activeProgress().answers[stepId]?.[fieldId] ?? "";
}

function markStepIncomplete(stepId) {
  if (!isComplete(stepId)) return;
  activeProgress().completedSteps = activeProgress().completedSteps.filter((id) => id !== stepId);
  updateCurrentStepState();
  renderProgress();
  renderStepNav();
  renderSummary();
}

function storeCheckpointValue(stepId, field, control) {
  activeProgress().answers[stepId] ||= {};
  activeProgress().answers[stepId][field.id] = field.type === "checkbox" ? control.checked : control.value;
  control.removeAttribute("aria-invalid");
  const feedback = document.getElementById(`field-feedback-${stepId}-${field.id}`);
  if (feedback) {
    feedback.textContent = "";
    feedback.className = "field-feedback";
  }
  markStepIncomplete(stepId);
  setFeedback(els.checkpointFeedback);
  saveState();
}

function createCheckpointControl(step, field) {
  const wrapper = document.createElement("div");
  wrapper.className = `checkpoint-field ${field.kind}`;
  const kind = document.createElement("span");
  kind.className = "check-kind";
  kind.textContent = field.kind === "understanding" ? "Verständnis" : "Ergebnis";
  const feedback = document.createElement("p");
  feedback.id = `field-feedback-${step.id}-${field.id}`;
  feedback.className = "field-feedback";
  feedback.setAttribute("aria-live", "polite");

  if (field.type === "checkbox") {
    const label = document.createElement("label");
    label.className = "checkbox-field";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `check-${step.id}-${field.id}`;
    input.setAttribute("aria-describedby", feedback.id);
    input.checked = Boolean(fieldValue(step.id, field.id));
    const text = document.createElement("span");
    text.textContent = field.label;
    input.addEventListener("change", () => storeCheckpointValue(step.id, field, input));
    label.append(input, text);
    wrapper.append(kind, label, feedback);
    return { wrapper, control: input };
  }

  const label = document.createElement("label");
  label.className = "field";
  const text = document.createElement("span");
  text.textContent = field.label;
  const control = field.type === "choice" ? document.createElement("select") : document.createElement("input");
  control.id = `check-${step.id}-${field.id}`;
  control.setAttribute("aria-describedby", feedback.id);

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
  wrapper.append(kind, label, feedback);
  return { wrapper, control };
}

function isFieldAnswerValid(field, value) {
  if (field.type === "number") return isWithin(value, field.expected, field.tolerance);
  if (field.type === "choice") return value === field.expected;
  if (field.type === "checkbox") return Boolean(value) === field.expected;
  return false;
}

function setFieldFeedback(step, field, valid) {
  const feedback = document.getElementById(`field-feedback-${step.id}-${field.id}`);
  if (!feedback) return;
  feedback.textContent = valid ? field.feedback.correct : field.feedback.incorrect;
  feedback.className = `field-feedback ${valid ? "good" : "bad"}`;
}

function renderCheckpoint(step) {
  els.checkpointPrompt.textContent = step.check.prompt;
  els.checkpointFields.replaceChildren();
  step.check.fields.forEach((field) => {
    const { wrapper } = createCheckpointControl(step, field);
    els.checkpointFields.append(wrapper);
  });

  if (isComplete(step.id)) {
    step.check.fields.forEach((field) => setFieldFeedback(step, field, true));
    setFeedback(els.checkpointFeedback, step.check.success, "good");
  } else {
    setFeedback(els.checkpointFeedback);
  }
}

function updateCurrentStepState() {
  const step = activeCourse().steps[activeProgress().currentStep];
  const complete = isComplete(step.id);
  els.stepStateBadge.textContent = complete ? "Abgeschlossen" : "Noch offen";
  els.stepStateBadge.className = `state-badge${complete ? " complete" : ""}`;
}

function renderSharedRequirement(step) {
  const course = activeCourse();
  const visible = Boolean(course.sharedRequirement && step.sharedRequirement);
  els.sharedRequirementCard.hidden = !visible;
  if (!visible) return;

  const complete = isSharedRequirementComplete(course);
  els.sharedRequirementCard.classList.toggle("complete", complete);
  els.sharedRequirementText.textContent = complete
    ? "Abgeschlossen: Deine Kontrolle gilt automatisch für alle drei Q–U-Auswertungswege. Du kannst die Herleitung und Klausurformulierungen jederzeit erneut öffnen."
    : "Leite 10 %, 5 % und fmax = 10 % einmal vollständig her. Dieser gemeinsame Abschluss ist für alle drei Q–U-Lernwege verpflichtend.";
  els.sharedRequirementLink.href = `./groesster-einzelfehler.html?course=${encodeURIComponent(course.id)}`;
  els.sharedRequirementLink.textContent = complete ? "Fehlerseite erneut öffnen" : "Fehlerseite bearbeiten";
}

function renderLesson() {
  const course = activeCourse();
  const progress = activeProgress();
  const step = course.steps[progress.currentStep];
  els.stepEyebrow.textContent = `Kapitel ${progress.currentStep + 1} von ${course.steps.length}`;
  els.stepTitle.textContent = step.title;
  els.stepGoal.textContent = step.goal;
  updateCurrentStepState();
  renderExplanation(step);

  els.stepActions.replaceChildren();
  step.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    els.stepActions.append(item);
  });

  renderSourceData(step);
  els.formulaBlock.hidden = !step.formula;
  els.formulaText.textContent = step.formula || "";
  els.stepTroubleshooting.textContent = step.troubleshooting;
  els.stepMistake.textContent = step.mistake;
  document.querySelector(".help-box").open = false;
  renderStepImages(step.images);
  els.lessonGrid.classList.toggle("no-images", step.images.length === 0);
  renderSharedRequirement(step);
  renderCheckpoint(step);

  els.previousStepBtn.disabled = progress.currentStep === 0;
  els.nextStepBtn.textContent = progress.currentStep === course.steps.length - 1
    ? course.transferMethod ? "Zum Transfer ↓" : "Zum Lernnachweis ↓"
    : "Weiter →";
}

function renderCourseIdentity() {
  const course = activeCourse();
  els.courseEyebrow.textContent = course.eyebrow;
  els.courseTitle.textContent = course.title;
  els.courseIntro.textContent = `${course.subtitle} · ${course.duration}. Alle Kapitel bleiben frei erreichbar.`;
  els.learningMap.replaceChildren();
  course.stages.forEach((stage, index) => {
    const item = document.createElement("li");
    const number = document.createElement("span");
    number.textContent = String(index + 1);
    item.append(number, document.createTextNode(stage));
    els.learningMap.append(item);
  });
  els.completionTitle.textContent = `${course.title} abgeschlossen`;
  els.completionText.textContent = course.transferMethod
    ? "Du kannst den Auswertungsweg fachlich begründen, auf eigene Messdaten übertragen und im Lernnachweis dokumentieren."
    : "Du kannst den Auswertungsweg fachlich begründen und im Lernnachweis dokumentieren.";
  els.courseChoiceButtons.forEach((button) => {
    const selected = button.dataset.courseId === state.activeCourseId;
    button.setAttribute("aria-pressed", String(selected));
  });
}

function renderCourse() {
  renderCourseIdentity();
  renderProgress();
  renderStepNav();
  renderLesson();
}

function setCurrentStep(index, shouldScroll = true) {
  const progress = activeProgress();
  progress.currentStep = Math.max(0, Math.min(activeCourse().steps.length - 1, index));
  saveState();
  renderCourse();
  if (shouldScroll) scrollToElement(els.course);
}

function validateCheckpoint(step) {
  let valid = true;
  let firstInvalid = null;
  step.check.fields.forEach((field) => {
    const control = document.getElementById(`check-${step.id}-${field.id}`);
    const value = field.type === "checkbox" ? control.checked : control.value;
    const fieldValid = isFieldAnswerValid(field, value);
    control.setAttribute("aria-invalid", fieldValid ? "false" : "true");
    setFieldFeedback(step, field, fieldValid);
    if (!fieldValid && !firstInvalid) firstInvalid = control;
    valid = valid && fieldValid;
  });
  return { valid, firstInvalid };
}

async function copyCurrentFormula() {
  const formula = activeCourse().steps[activeProgress().currentStep].formula;
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

const TRANSFER_CONFIG = Object.freeze({
  "inverse-square": {
    keys: ["r", "f"], symbols: ["r", "F"], headers: ["r (cm)", "F (mN)"],
    inputTitle: "r und F eingeben", resultTitle: "Deine Potenzregression",
    button: "Potenzregression berechnen", modelLabel: "Potenzregression"
  },
  "proportional-power": {
    keys: ["u", "q"], symbols: ["U", "Q"], headers: ["U (V)", "Q/(10⁻⁸ C)"],
    inputTitle: "U und Q eingeben", resultTitle: "Deine U-Q-Potenzregression",
    button: "Potenzregression berechnen", modelLabel: "Potenzregression"
  },
  "proportional-constants": {
    keys: ["u", "q"], symbols: ["U", "Q"], headers: ["U (V)", "Q/(10⁻⁸ C)"],
    inputTitle: "U und Q eingeben", resultTitle: "Deine Kapazitätsauswertung",
    button: "Konstanten auswerten", modelLabel: "Q = C̄ · U"
  },
  "proportional-linear": {
    keys: ["u", "q"], symbols: ["U", "Q"], headers: ["U (V)", "Q/(10⁻⁸ C)"],
    inputTitle: "U und Q eingeben", resultTitle: "Deine lineare U-Q-Regression",
    button: "Lineare Regression berechnen", modelLabel: "Lineare Regression"
  }
});

function transferConfig() {
  return TRANSFER_CONFIG[state.transfer.activeMethod];
}

function clearTransferResult() {
  activeTransfer().result = null;
  els.transferResults.hidden = true;
  els.transferAnalysisRows.replaceChildren();
  els.transferChart.replaceChildren();
  renderSummary();
}

function renderTransferIdentity() {
  const config = transferConfig();
  const uq = state.transfer.activeMethod !== "inverse-square";
  els.transferMethodSelect.value = state.transfer.activeMethod;
  els.transferInputTitle.textContent = config.inputTitle;
  els.transferXHeader.textContent = config.headers[0];
  els.transferYHeader.textContent = config.headers[1];
  els.calculateTransferBtn.textContent = config.button;
  els.transferResultTitle.textContent = config.resultTitle;
  els.chartModelLabel.textContent = config.modelLabel;
  els.relativeUncertaintyGroup.hidden = uq;
  els.uqUncertaintyGroup.hidden = !uq;
  els.transferSharedErrorLinkWrap.hidden = !uq;
  if (uq) els.transferSharedErrorLink.href = `./groesster-einzelfehler.html?course=${encodeURIComponent(state.transfer.activeMethod)}`;
  els.uncertaintyNote.textContent = uq
    ? state.transfer.activeMethod === "proportional-linear"
      ? "Nach der Methode des größten Einzelfehlers werden Modellabweichung und relativer Anteil des y-Achsenabschnitts mit fmax verglichen. Ohne ΔU und ΔQ erfolgt kein automatisches Urteil."
      : "Nach der Methode des größten Einzelfehlers wird der größte relative Einzelfehler auf alle für das Verfahren relevanten Abweichungen übertragen. Ohne ΔU und ΔQ erfolgt kein automatisches Urteil."
    : "Ohne Unsicherheitsangabe zeigt der Rechner Ergebnisse, fällt aber kein Urteil über die Vereinbarkeit.";
  els.transferIntro.textContent = uq
    ? state.transfer.activeMethod === "proportional-linear"
      ? "Gib drei bis dreißig positive U-Q-Messpaare mit verschiedenen Spannungswerten ein. Die Regressionsgerade erhält einen frei bestimmten y-Achsenabschnitt b."
      : "Gib drei bis dreißig positive U-Q-Messpaare ein. Die voreingestellten Unsicherheiten gehören zum beschriebenen Kondensatorversuch."
    : "Gib drei bis dreißig positive r-F-Messpaare ein. TrendPot benötigt positive Punkte mit verschiedenen r-Werten.";
}

function renderTransferRows() {
  const transfer = activeTransfer();
  const config = transferConfig();
  els.transferInputRows.replaceChildren();
  transfer.data.forEach((dataRow, index) => {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    numberCell.textContent = String(index + 1);
    row.append(numberCell);

    config.keys.forEach((key, keyIndex) => {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "decimal";
      input.className = "cell-input";
      input.value = String(dataRow[key] ?? "");
        input.setAttribute("aria-label", `${config.headers[keyIndex]} in Zeile ${index + 1}`);
      input.addEventListener("input", () => {
        transfer.data[index][key] = input.value;
        clearTransferResult();
        setFeedback(els.transferFeedback);
        saveState();
      });
      cell.append(input);
      row.append(cell);
    });
    els.transferInputRows.append(row);
  });

  els.addTransferRowBtn.disabled = transfer.data.length >= 30;
  els.removeTransferRowBtn.disabled = transfer.data.length <= 3;
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

function renderTransferChart(points, model, config, modelDescription) {
  const svg = els.transferChart;
  svg.replaceChildren();
  const title = createSvgElement("title");
  title.textContent = `Eigene Messwerte und ${config.modelLabel}`;
  const description = createSvgElement("desc");
  description.textContent = `Streudiagramm mit ${points.length} Messpunkten. ${modelDescription}`;
  svg.append(title, description);

  const width = 760;
  const height = 420;
  const margin = { left: 68, right: 28, top: 24, bottom: 58 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const xValues = points.map(({ x }) => x);
  const yValues = points.map(({ y }) => y);
  let minX = Math.min(...xValues) * 0.9;
  let maxX = Math.max(...xValues) * 1.08;
  if (minX === maxX) {
    minX *= 0.9;
    maxX *= 1.1;
  }
  const maxY = Math.max(...yValues, ...xValues.map(model)) * 1.14 || 1;
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
  addSvgText(svg, margin.left + plotWidth / 2, height - 7, config.headers[0], { "text-anchor": "middle", fill: "#242236", "font-size": 15, "font-weight": 700 });
  addSvgText(svg, 18, margin.top + plotHeight / 2, config.headers[1], { "text-anchor": "middle", fill: "#242236", "font-size": 15, "font-weight": 700, transform: `rotate(-90 18 ${margin.top + plotHeight / 2})` });

  let pathData = "";
  const samples = 180;
  for (let index = 0; index <= samples; index += 1) {
    const xValue = minX + ((maxX - minX) * index) / samples;
    const yValue = model(xValue);
    pathData += `${index === 0 ? "M" : "L"}${x(xValue).toFixed(2)},${y(yValue).toFixed(2)} `;
  }
  svg.append(createSvgElement("path", { d: pathData, fill: "none", stroke: "#6552c8", "stroke-width": 3 }));

  points.forEach(({ x: xValue, y: yValue }, index) => {
    const circle = createSvgElement("circle", { cx: x(xValue), cy: y(yValue), r: 6, fill: "#242236", stroke: "#fff", "stroke-width": 2 });
    const pointTitle = createSvgElement("title");
    pointTitle.textContent = `Messpunkt ${index + 1}: ${config.symbols[0]} = ${formatNumber(xValue, 3)}, ${config.symbols[1]} = ${formatNumber(yValue, 4)}`;
    circle.append(pointTitle);
    svg.append(circle);
  });
}

function renderPowerTransferResult(points, regression, analysis, uncertainty, isUq) {
  const config = transferConfig();
  els.transferResults.hidden = false;
  const functionText = isUq ? "Q(U)" : "F(r)";
  const variable = isUq ? "U" : "r";
  els.transferEquation.textContent = `${functionText} ≈ ${formatNumber(regression.a, 6)} · ${variable}^(${formatNumber(regression.b, 6)})`;
  const exponentDeviation = isUq ? relativeExponentDeviation(regression.b, 1) : null;
  els.transferMeta.textContent = isUq
    ? `Exponent n ≈ ${formatNumber(regression.b, 5)} · relative Exponentabweichung ≈ ${formatNumber(exponentDeviation, 2)} % · größte Modellabweichung ≈ ${formatNumber(Math.abs(analysis.maxDeviation.deviation), 2)} %`
    : `Exponent b ≈ ${formatNumber(regression.b, 5)} · größte Modellabweichung ≈ ${formatNumber(Math.abs(analysis.maxDeviation.deviation), 2)} %`;

  if (uncertainty === null) {
    els.uncertaintyResult.textContent = "Ohne angegebene Messunsicherheit wird keine automatische Aussage zur Vereinbarkeit getroffen. Beurteile Exponent und Streuung in deiner Reflexion.";
  } else {
    if (isUq) {
      const within = deviationsWithinLimit([exponentDeviation, analysis.maxDeviation.deviation], uncertainty.limit);
      els.uncertaintyResult.textContent = `Methode des größten Einzelfehlers: fmax = ${formatNumber(uncertainty.limit, 2)} % (U: ${formatNumber(uncertainty.uPercent, 2)} %, Q: ${formatNumber(uncertainty.qPercent, 2)} %). ${within ? "Exponent- und Modellabweichung liegen unterhalb dieser Fehlergrenze. Die Abweichungen können durch die Messfehler erklärt werden." : "Mindestens eine der beiden Abweichungen liegt nicht unterhalb dieser Fehlergrenze und kann mit der Methode nicht allein durch die angegebenen Messfehler erklärt werden."}`;
    } else {
      const within = Math.abs(analysis.maxDeviation.deviation) <= uncertainty;
      els.uncertaintyResult.textContent = `Als grobe Orientierung liegt die größte Modellabweichung ${within ? "innerhalb" : "oberhalb"} deiner angegebenen Messunsicherheit von ${formatNumber(uncertainty, 2)} %. Das ersetzt keine vollständige Unsicherheitsrechnung.`;
    }
  }

  els.resultXHeader.textContent = config.headers[0];
  els.resultYHeader.textContent = `Messwert ${config.headers[1]}`;
  els.resultModelHeader.textContent = `Modellwert ${config.symbols[1]}`;
  els.resultDeviationHeader.textContent = "Modellabweichung";
  els.transferAnalysisRows.replaceChildren();
  analysis.rows.forEach((rowData) => {
    const row = document.createElement("tr");
    [
      formatNumber(isUq ? rowData.u : rowData.r, 3),
      formatNumber(isUq ? rowData.q : rowData.f, 5),
      formatNumber(rowData.predicted, 6),
      `${formatNumber(rowData.deviation, 2)} %`
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    els.transferAnalysisRows.append(row);
  });
  const chartPoints = points.map((point) => ({ x: isUq ? point.u : point.r, y: isUq ? point.q : point.f }));
  renderTransferChart(chartPoints, (value) => regression.a * (value ** regression.b), config,
    `${functionText} ist ${formatNumber(regression.a, 5)} mal ${variable} hoch ${formatNumber(regression.b, 5)}.`);
}

function renderLinearTransferResult(points, regression, analysis, uncertainty) {
  const config = transferConfig();
  const interceptOperator = regression.intercept < 0 ? "−" : "+";
  const capacityPf = regression.slope * 10000;
  els.transferResults.hidden = false;
  els.transferEquation.textContent = `Q(U) ≈ ${formatNumber(regression.slope, 7)} · U ${interceptOperator} ${formatNumber(Math.abs(regression.intercept), 7)}`;
  els.transferMeta.textContent = `Steigung m ≈ ${formatNumber(regression.slope, 7)} · 10⁻⁸ F (≈ ${formatNumber(capacityPf, 2)} pF) · y-Achsenabschnitt b ≈ ${formatNumber(regression.intercept, 7)} · 10⁻⁸ C · Anteil |b|/Qmin ≈ ${formatNumber(analysis.interceptShare.percent, 2)} % · größte Modellabweichung ≈ ${formatNumber(Math.abs(analysis.maxDeviation.deviation), 2)} % bei U = ${formatNumber(analysis.maxDeviation.u, 2)} V`;

  if (!uncertainty) {
    els.uncertaintyResult.textContent = "Ohne ΔU und ΔQ wird keine automatische Fehlerbeurteilung vorgenommen. Eine statistische Bestätigung von b = 0 würde zusätzlich eine Unsicherheit des Regressionsparameters erfordern.";
  } else {
    const within = deviationsWithinLimit([analysis.maxDeviation.deviation, analysis.interceptShare.percent], uncertainty.limit);
    els.uncertaintyResult.textContent = `Methode des größten Einzelfehlers: fmax = ${formatNumber(uncertainty.limit, 2)} % (U: ${formatNumber(uncertainty.uPercent, 2)} %, Q: ${formatNumber(uncertainty.qPercent, 2)} %). ${within ? "Modellabweichung und Anteil des y-Achsenabschnitts liegen unterhalb dieser Fehlergrenze. Die Abweichungen können durch die Messfehler erklärt und b kann näherungsweise vernachlässigt werden." : "Mindestens eine der beiden Abweichungen liegt nicht unterhalb dieser Fehlergrenze und kann mit der Methode nicht allein durch die angegebenen Messfehler erklärt werden."} Das ist keine statistische Bestätigung von b = 0.`;
  }

  els.resultXHeader.textContent = config.headers[0];
  els.resultYHeader.textContent = `Messwert ${config.headers[1]}`;
  els.resultModelHeader.textContent = "Modellwert Q/(10⁻⁸ C)";
  els.resultDeviationHeader.textContent = "Modellabweichung";
  els.transferAnalysisRows.replaceChildren();
  analysis.rows.forEach((rowData) => {
    const row = document.createElement("tr");
    [
      formatNumber(rowData.u, 3),
      formatNumber(rowData.q, 5),
      formatNumber(rowData.predicted, 6),
      `${formatNumber(rowData.deviation, 2)} %`
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    els.transferAnalysisRows.append(row);
  });
  renderTransferChart(points.map(({ u, q }) => ({ x: u, y: q })),
    (value) => regression.slope * value + regression.intercept,
    config,
    `Die Regressionsgerade hat die Steigung ${formatNumber(regression.slope, 5)} und den y-Achsenabschnitt ${formatNumber(regression.intercept, 5)}.`);
}

function calculateTransfer() {
  const methodId = state.transfer.activeMethod;
  const transfer = activeTransfer();
  const isUq = methodId !== "inverse-square";
  const validation = isUq ? validateUqPoints(transfer.data) : validatePowerPoints(transfer.data);
  if (!validation.valid) {
    setFeedback(els.transferFeedback, validation.errors.join(" "), "bad");
    els.transferResults.hidden = true;
    transfer.result = null;
    saveState();
    renderSummary();
    return;
  }

  let uncertainty = null;
  if (isUq) {
    const deltaUText = transfer.deltaU.trim();
    const deltaQText = transfer.deltaQ.trim();
    if ((deltaUText === "") !== (deltaQText === "")) {
      setFeedback(els.transferFeedback, "Gib für ein automatisches Urteil sowohl ΔU als auch ΔQ an – oder lasse beide Felder leer.", "bad");
      return;
    }
    if (deltaUText !== "") {
      const deltaU = parseLocaleNumber(deltaUText);
      const deltaQ = parseLocaleNumber(deltaQText);
      if (!Number.isFinite(deltaU) || !Number.isFinite(deltaQ) || deltaU <= 0 || deltaQ <= 0) {
        setFeedback(els.transferFeedback, "ΔU und ΔQ müssen positive Zahlen sein.", "bad");
        return;
      }
      uncertainty = greatestSingleRelativeError(validation.points, deltaU, deltaQ);
    }
  } else {
    const uncertaintyText = transfer.uncertainty.trim();
    uncertainty = uncertaintyText === "" ? null : parseLocaleNumber(uncertaintyText);
    if (uncertainty !== null && (!Number.isFinite(uncertainty) || uncertainty <= 0)) {
      setFeedback(els.transferFeedback, "Die Messunsicherheit muss eine positive Prozentzahl sein oder leer bleiben.", "bad");
      els.uncertaintyInput.setAttribute("aria-invalid", "true");
      return;
    }
    els.uncertaintyInput.removeAttribute("aria-invalid");
  }

  if (methodId === "proportional-constants") {
    const analysis = analyzeProportionality(validation.points);
    transfer.result = { type: "constants", mean: analysis.mean, meanPf: analysis.meanPf, maxDeviation: analysis.maxDeviation.deviation, uncertainty };
    saveState();
    renderConstantTransferResult(validation.points, analysis, uncertainty);
  } else if (methodId === "proportional-linear") {
    const regression = linearRegression(validation.points);
    if (!regression) {
      setFeedback(els.transferFeedback, "Aus diesen Daten konnte keine lineare Regression bestimmt werden. Prüfe insbesondere, ob sich die U-Werte unterscheiden.", "bad");
      transfer.result = null;
      saveState();
      return;
    }
    const analysis = analyzeUqLinear(validation.points, regression);
    if (!analysis || analysis.invalidPrediction) {
      setFeedback(els.transferFeedback, "Die Regressionsgerade liefert für mindestens einen eingegebenen U-Wert einen Modellwert Q̂ ≤ 0. Eine relative Abweichung mit diesem ungeeigneten Bezugswert wird nicht berechnet.", "bad");
      transfer.result = null;
      els.transferResults.hidden = true;
      saveState();
      renderSummary();
      return;
    }
    transfer.result = {
      type: "linear",
      slope: regression.slope,
      intercept: regression.intercept,
      maxDeviation: analysis.maxDeviation.deviation,
      interceptShare: analysis.interceptShare.percent,
      uncertainty
    };
    saveState();
    renderLinearTransferResult(validation.points, regression, analysis, uncertainty);
  } else {
    const regression = isUq ? uqPowerRegression(validation.points) : powerRegression(validation.points);
    if (!regression) {
      setFeedback(els.transferFeedback, "Aus diesen Daten konnte keine Potenzregression bestimmt werden.", "bad");
      return;
    }
    const analysis = isUq ? analyzeUqPower(validation.points, regression) : analyzePoints(validation.points, regression);
    transfer.result = {
      type: "power",
      a: regression.a,
      b: regression.b,
      maxDeviation: analysis.maxDeviation.deviation,
      exponentDeviation: isUq ? relativeExponentDeviation(regression.b, 1) : null,
      uncertainty
    };
    saveState();
    renderPowerTransferResult(validation.points, regression, analysis, uncertainty, isUq);
  }
  setFeedback(els.transferFeedback, "Die mathematische Auswertung ist abgeschlossen. Formuliere nun deine fachliche Beurteilung.", "good");
  renderSummary();
}

function renderConstantTransferResult(points, analysis, uncertainty) {
  const config = transferConfig();
  els.transferResults.hidden = false;
  els.transferEquation.textContent = `C̄ ≈ ${formatNumber(analysis.mean, 7)} · 10⁻⁸ F ≈ ${formatNumber(analysis.meanPf, 2)} pF`;
  els.transferMeta.textContent = `Größte Konstantenabweichung ≈ ${formatNumber(Math.abs(analysis.maxDeviation.deviation), 2)} % bei U = ${formatNumber(analysis.maxDeviation.u, 2)} V`;
  if (!uncertainty) {
    els.uncertaintyResult.textContent = "Ohne ΔU und ΔQ wird keine automatische Vereinbarkeitsaussage getroffen.";
  } else {
    const within = deviationsWithinLimit([analysis.maxDeviation.deviation], uncertainty.limit);
    els.uncertaintyResult.textContent = `Methode des größten Einzelfehlers: fmax = ${formatNumber(uncertainty.limit, 2)} % (U: ${formatNumber(uncertainty.uPercent, 2)} %, Q: ${formatNumber(uncertainty.qPercent, 2)} %). ${within ? "Die Konstantenabweichung liegt unterhalb dieser Fehlergrenze. Die Abweichung kann durch die Messfehler erklärt werden." : "Die Konstantenabweichung liegt nicht unterhalb dieser Fehlergrenze und kann mit der Methode nicht allein durch die angegebenen Messfehler erklärt werden."}`;
  }
  els.resultXHeader.textContent = config.headers[0];
  els.resultYHeader.textContent = config.headers[1];
  els.resultModelHeader.textContent = "Kapazität C (pF)";
  els.resultDeviationHeader.textContent = "Abweichung von C̄";
  els.transferAnalysisRows.replaceChildren();
  analysis.rows.forEach((rowData) => {
    const row = document.createElement("tr");
    [formatNumber(rowData.u, 3), formatNumber(rowData.q, 5), formatNumber(rowData.capacityPf, 2), `${formatNumber(rowData.deviation, 2)} %`].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    els.transferAnalysisRows.append(row);
  });
  renderTransferChart(points.map(({ u, q }) => ({ x: u, y: q })), (value) => analysis.mean * value, config,
    `Die mittlere Kapazität ist ${formatNumber(analysis.meanPf, 2)} Pikofarad.`);
}

function restoreTransferResult() {
  const methodId = state.transfer.activeMethod;
  const transfer = activeTransfer();
  if (!transfer.result) {
    els.transferResults.hidden = true;
    return;
  }
  const isUq = methodId !== "inverse-square";
  const validation = isUq ? validateUqPoints(transfer.data) : validatePowerPoints(transfer.data);
  if (!validation.valid) {
    transfer.result = null;
    els.transferResults.hidden = true;
    return;
  }
  if (methodId === "proportional-constants") {
    renderConstantTransferResult(validation.points, analyzeProportionality(validation.points), transfer.result.uncertainty ?? null);
    return;
  }
  if (methodId === "proportional-linear") {
    const regression = linearRegression(validation.points);
    const analysis = analyzeUqLinear(validation.points, regression);
    if (!regression || !analysis || analysis.invalidPrediction) {
      transfer.result = null;
      els.transferResults.hidden = true;
      return;
    }
    transfer.result.interceptShare = analysis.interceptShare.percent;
    renderLinearTransferResult(validation.points, regression, analysis, transfer.result.uncertainty ?? null);
    return;
  }
  const regression = isUq ? uqPowerRegression(validation.points) : powerRegression(validation.points);
  const analysis = isUq ? analyzeUqPower(validation.points, regression) : analyzePoints(validation.points, regression);
  if (isUq) transfer.result.exponentDeviation = relativeExponentDeviation(regression.b, 1);
  const uncertainty = transfer.result.uncertainty ?? null;
  renderPowerTransferResult(validation.points, regression, analysis, uncertainty, isUq);
}

function syncTransferInputs() {
  const transfer = activeTransfer();
  els.uncertaintyInput.value = transfer.uncertainty;
  els.deltaUInput.value = transfer.deltaU;
  els.deltaQInput.value = transfer.deltaQ;
  els.reflectionInput.value = transfer.reflection;
}

function renderTransfer() {
  const enabled = Boolean(activeCourse().transferMethod);
  els.transferSection.hidden = !enabled;
  if (!enabled) return;
  renderTransferIdentity();
  syncTransferInputs();
  renderTransferRows();
  setFeedback(els.transferFeedback);
  restoreTransferResult();
}

function isCheckpointKindComplete(step, kind) {
  return step.check.fields
    .filter((field) => field.kind === kind)
    .every((field) => isFieldAnswerValid(field, fieldValue(step.id, field.id)));
}

function renderSummary() {
  const course = activeCourse();
  const progress = activeProgress();
  const completeCount = progress.completedSteps.length;
  const sharedComplete = isSharedRequirementComplete(course);
  const courseComplete = isCourseComplete(course, progress);
  els.summaryStatus.textContent = courseComplete ? "Abgeschlossen" : "In Bearbeitung";
  els.summaryStatus.className = `summary-status${courseComplete ? " complete" : ""}`;
  els.summarySubtitle.textContent = `GeoGebra-Begleitkurs · ${course.title}`;
  els.summaryProgress.textContent = course.sharedRequirement
    ? `${completeCount} von ${course.steps.length} Kapiteln · Methode des größten Einzelfehlers: ${sharedComplete ? "abgeschlossen" : "offen"}`
    : `${completeCount} von ${course.steps.length} Kapiteln abgeschlossen`;
  els.printStudentName.textContent = state.student.name.trim() || "–";
  els.printCourseName.textContent = state.student.course.trim() || "–";
  els.summaryDate.textContent = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date());

  els.summaryChecklist.replaceChildren();
  course.steps.forEach((step, index) => {
    const item = document.createElement("li");
    const resultComplete = isCheckpointKindComplete(step, "result");
    const understandingComplete = isCheckpointKindComplete(step, "understanding");
    const missing = [];
    if (!resultComplete) missing.push("Ergebnisprüfung offen");
    if (!understandingComplete) missing.push("Verständnisprüfung offen");
    if (isComplete(step.id)) item.className = "complete";
    item.textContent = `${index + 1}. ${step.title}${missing.length ? ` – ${missing.join(", ")}` : " – vollständig"}`;
    els.summaryChecklist.append(item);
  });
  if (course.sharedRequirement) {
    const item = document.createElement("li");
    if (sharedComplete) item.className = "complete";
    item.textContent = `Gemeinsame Pflichtseite: Methode des größten Einzelfehlers – ${sharedComplete ? "vollständig" : "Kontrolle offen"}`;
    els.summaryChecklist.append(item);
  }

  els.summaryCompetencies.replaceChildren();
  course.competencies.forEach((competency) => {
    const item = document.createElement("li");
    const complete = competency.steps.every((stepId) => isComplete(stepId));
    if (complete) item.className = "complete";
    item.textContent = `${complete ? "✓" : "○"} ${competency.label}`;
    els.summaryCompetencies.append(item);
  });
  if (course.sharedRequirement) {
    const item = document.createElement("li");
    if (sharedComplete) item.className = "complete";
    item.textContent = `${sharedComplete ? "✓" : "○"} Ich kann die Methode des größten Einzelfehlers herleiten und auf Abweichungen anwenden.`;
    els.summaryCompetencies.append(item);
  }

  els.summaryKeyResults.replaceChildren();
  const referenceResults = [...course.referenceResults];
  if (course.sharedRequirement) {
    referenceResults.push(
      ["Methode des größten Einzelfehlers", sharedComplete ? "abgeschlossen" : "noch offen"],
      ["Relative Einzelfehler", "U: 10 % · Q: 5 % · fmax = 10 %"]
    );
  }
  referenceResults.forEach(([term, value]) => {
    const item = document.createElement("div");
    const name = document.createElement("dt");
    const description = document.createElement("dd");
    name.textContent = term;
    description.textContent = value;
    item.append(name, description);
    els.summaryKeyResults.append(item);
  });

  els.summaryConclusion.textContent = courseComplete
    ? course.conclusion
    : course.sharedRequirement && !sharedComplete && completeCount === course.steps.length
      ? "Die acht Kapitel sind abgeschlossen. Die abschließende Beurteilung wird eingetragen, sobald auch die gemeinsame Kontrolle zur Methode des größten Einzelfehlers abgeschlossen ist."
      : "Die abschließende Beurteilung wird eingetragen, sobald alle Ergebnis- und Verständnisprüfungen dieses Lernwegs abgeschlossen sind.";

  const transferMethod = course.transferMethod;
  if (!transferMethod) {
    els.summaryTransfer.hidden = true;
    els.summaryTransferResult.textContent = "";
    els.summaryReflection.textContent = "";
    return;
  }
  const transfer = state.transfer.methods[transferMethod];
  const hasTransfer = Boolean(transfer.result) || Boolean(transfer.reflection.trim());
  els.summaryTransfer.hidden = !hasTransfer;
  if (transfer.result) {
    const result = transfer.result;
    if (result.type === "constants") {
      const judgement = result.uncertainty?.limit
        ? deviationsWithinLimit([result.maxDeviation], result.uncertainty.limit)
          ? ` Die Abweichung liegt unter fmax = ${formatNumber(result.uncertainty.limit, 2)} % und kann durch die Messfehler erklärt werden.`
          : ` Die Abweichung liegt nicht unter fmax = ${formatNumber(result.uncertainty.limit, 2)} % und kann mit der Methode nicht allein durch die Messfehler erklärt werden.`
        : " Ohne vollständige Fehlerangaben erfolgt keine automatische Fehlerbeurteilung.";
      els.summaryTransferResult.textContent = `Eigene Konstantenauswertung: C̄ ≈ ${formatNumber(result.meanPf, 2)} pF, größte Konstantenabweichung ≈ ${formatNumber(Math.abs(result.maxDeviation), 2)} %.${judgement}`;
    } else if (result.type === "linear") {
      const interceptOperator = result.intercept < 0 ? "−" : "+";
      const assessment = result.uncertainty?.limit
        ? deviationsWithinLimit([result.maxDeviation, result.interceptShare], result.uncertainty.limit)
          ? ` Beide Abweichungen liegen unter fmax = ${formatNumber(result.uncertainty.limit, 2)} % und können durch die Messfehler erklärt werden; b kann näherungsweise vernachlässigt werden.`
          : ` Mindestens eine Abweichung liegt nicht unter fmax = ${formatNumber(result.uncertainty.limit, 2)} % und kann mit der Methode nicht allein durch Messfehler erklärt werden.`
        : " Ohne vollständige Fehlerangaben erfolgt keine automatische Fehlerbeurteilung.";
      els.summaryTransferResult.textContent = `Eigene lineare Regression: Q(U) ≈ ${formatNumber(result.slope, 6)} · U ${interceptOperator} ${formatNumber(Math.abs(result.intercept), 6)}, Kapazität aus der Steigung ≈ ${formatNumber(result.slope * 10000, 2)} pF, y-Achsenabschnitt b ≈ ${formatNumber(result.intercept, 4)} · 10⁻⁸ C, Anteil |b|/Qmin ≈ ${formatNumber(result.interceptShare, 2)} %, größte Modellabweichung ≈ ${formatNumber(Math.abs(result.maxDeviation), 2)} %.${assessment} Das ist keine statistische Bestätigung von b = 0.`;
    } else {
      const functionName = state.activeCourseId === "inverse-square" ? "F(r)" : "Q(U)";
      const variable = state.activeCourseId === "inverse-square" ? "r" : "U";
      const uqAssessment = state.activeCourseId === "proportional-power"
        ? result.uncertainty?.limit
          ? deviationsWithinLimit([result.maxDeviation, result.exponentDeviation], result.uncertainty.limit)
            ? ` Relative Exponent- und Modellabweichung liegen unter fmax = ${formatNumber(result.uncertainty.limit, 2)} % und können durch die Messfehler erklärt werden.`
            : ` Mindestens eine Abweichung liegt nicht unter fmax = ${formatNumber(result.uncertainty.limit, 2)} % und kann mit der Methode nicht allein durch Messfehler erklärt werden.`
          : " Ohne vollständige Fehlerangaben erfolgt keine automatische Fehlerbeurteilung."
        : "";
      const exponentText = state.activeCourseId === "proportional-power" ? `, relative Exponentabweichung ≈ ${formatNumber(result.exponentDeviation, 2)} %` : "";
      els.summaryTransferResult.textContent = `Eigene Regression: ${functionName} ≈ ${formatNumber(result.a, 5)} · ${variable}^(${formatNumber(result.b, 5)})${exponentText}, größte Modellabweichung ≈ ${formatNumber(Math.abs(result.maxDeviation), 2)} %.${uqAssessment}`;
    }
  } else {
    els.summaryTransferResult.textContent = "Für die eigene Messreihe wurde noch keine Auswertung gespeichert.";
  }
  els.summaryReflection.textContent = transfer.reflection.trim()
    ? `Reflexion: ${transfer.reflection.trim()}`
    : "Keine zusätzliche Reflexion eingetragen.";
}

function selectCourse(courseId, { scroll = true } = {}) {
  if (!COURSE_IDS.includes(courseId)) return;
  state.activeCourseId = courseId;
  if (COURSES[courseId].transferMethod) state.transfer.activeMethod = COURSES[courseId].transferMethod;
  saveState();
  renderCourse();
  renderTransfer();
  renderSummary();
  els.courseChoiceStatus.textContent = `${activeCourse().title} ist ausgewählt.`;
  if (scroll) scrollToElement(els.course);
}

els.startCourseBtn.addEventListener("click", () => scrollToElement(els.coursePicker));
els.courseChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => selectCourse(button.dataset.courseId));
});
els.resetCourseBtn.addEventListener("click", () => {
  const course = activeCourse();
  if (!window.confirm(`Möchtest du die ${course.steps.length} Kapitelkontrollen dieses Lernwegs und ihre Antworten zurücksetzen? Deine anderen Lernwege und Transferdaten bleiben erhalten.`)) return;
  state.courses[state.activeCourseId] = { currentStep: 0, completedSteps: [], answers: {} };
  saveState();
  renderCourse();
  renderSummary();
  scrollToElement(els.course);
});

els.previousStepBtn.addEventListener("click", () => setCurrentStep(activeProgress().currentStep - 1));
els.nextStepBtn.addEventListener("click", () => {
  if (activeProgress().currentStep === activeCourse().steps.length - 1) {
    scrollToElement(document.getElementById(activeCourse().transferMethod ? "transfer" : "summary"));
  } else {
    setCurrentStep(activeProgress().currentStep + 1);
  }
});

els.checkpointForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const step = activeCourse().steps[activeProgress().currentStep];
  const validation = validateCheckpoint(step);
  if (validation.valid) {
    if (!isComplete(step.id)) activeProgress().completedSteps.push(step.id);
    saveState();
    setFeedback(els.checkpointFeedback, step.check.success, "good");
    updateCurrentStepState();
    renderProgress();
    renderStepNav();
    renderSummary();
  } else {
    setFeedback(els.checkpointFeedback, step.check.retry, "bad");
    validation.firstInvalid?.focus();
  }
});

els.explainModeBtn.addEventListener("click", () => setLessonMode("explain"));
els.compactModeBtn.addEventListener("click", () => setLessonMode("compact"));
els.openGlossaryBtn.addEventListener("click", openGlossary);
els.closeGlossaryBtn.addEventListener("click", closeGlossary);
els.glossaryDialog.addEventListener("click", (event) => {
  if (event.target === els.glossaryDialog) closeGlossary();
});

els.copyFormulaBtn.addEventListener("click", copyCurrentFormula);
els.closeImageDialogBtn.addEventListener("click", closeImageDialog);
els.imageDialog.addEventListener("click", (event) => {
  if (event.target === els.imageDialog) closeImageDialog();
});

els.addTransferRowBtn.addEventListener("click", () => {
  const transfer = activeTransfer();
  if (transfer.data.length >= 30) return;
  const [xKey, yKey] = transferConfig().keys;
  transfer.data.push({ [xKey]: "", [yKey]: "" });
  clearTransferResult();
  renderTransferRows();
  saveState();
});

els.removeTransferRowBtn.addEventListener("click", () => {
  const transfer = activeTransfer();
  if (transfer.data.length <= 3) return;
  transfer.data.pop();
  clearTransferResult();
  renderTransferRows();
  saveState();
});

els.resetTransferBtn.addEventListener("click", () => {
  const isUq = state.transfer.activeMethod !== "inverse-square";
  if (!window.confirm(`Möchtest du deine Transferdaten durch die ${isUq ? "fünf U-Q" : "sechs r-F"}-Beispieldaten ersetzen?`)) return;
  const transfer = activeTransfer();
  transfer.data = isUq ? cloneUqExampleData() : cloneExampleData();
  transfer.uncertainty = "";
  transfer.deltaU = isUq ? "5" : "";
  transfer.deltaQ = isUq ? "0,1" : "";
  transfer.result = null;
  syncTransferInputs();
  renderTransferRows();
  els.transferResults.hidden = true;
  setFeedback(els.transferFeedback, "Die Beispieldaten wurden eingesetzt.", "good");
  saveState();
  renderSummary();
});

els.uncertaintyInput.addEventListener("input", () => {
  activeTransfer().uncertainty = els.uncertaintyInput.value;
  els.uncertaintyInput.removeAttribute("aria-invalid");
  clearTransferResult();
  setFeedback(els.transferFeedback);
  saveState();
});

els.deltaUInput.addEventListener("input", () => {
  activeTransfer().deltaU = els.deltaUInput.value;
  clearTransferResult();
  setFeedback(els.transferFeedback);
  saveState();
});

els.deltaQInput.addEventListener("input", () => {
  activeTransfer().deltaQ = els.deltaQInput.value;
  clearTransferResult();
  setFeedback(els.transferFeedback);
  saveState();
});

els.transferMethodSelect.addEventListener("change", () => {
  state.transfer.activeMethod = els.transferMethodSelect.value;
  saveState();
  renderTransfer();
});

els.calculateTransferBtn.addEventListener("click", calculateTransfer);
els.reflectionInput.addEventListener("input", () => {
  activeTransfer().reflection = els.reflectionInput.value;
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
  els.studentNameInput.value = state.student.name;
  els.courseNameInput.value = state.student.course;
  renderCourse();
  renderTransfer();
  renderSummary();
  saveState();
}

initialize();
