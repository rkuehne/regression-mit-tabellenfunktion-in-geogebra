import { COURSE_IDS, COURSES, typesetCourseText } from "./lesson-data.js";
import { formatNumber, isWithin } from "./regression.js";
import { loadState, persistState } from "./state.js";
import { clearMath, mathReady, typesetDocument, typesetMath } from "./math-typeset.js";

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

function setMathText(element, text = "") {
  element.textContent = typesetCourseText(String(text));
}

function setFeedback(element, text = "", type = "") {
  setMathText(element, text);
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
    setMathText(els.completionTitle, `${course.title} abgeschlossen`);
    els.completionText.textContent = "Du kannst den Auswertungsweg fachlich begründen und im Lernnachweis dokumentieren.";
    els.completionActionLink.href = "#summary";
    els.completionActionLink.textContent = "Zum Lernnachweis";
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
  setMathText(caption, step.dataCaption || "Messwerte für den Lernweg");
  const head = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Nr.", ...(step.dataHeaders || activeCourse().dataHeaders)].forEach((text) => {
    const th = document.createElement("th");
    th.scope = "col";
    setMathText(th, text);
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
  setMathText(els.stepWhy, step.why);
  els.stepConcepts.replaceChildren();
  step.concepts.forEach(({ term, text }) => {
    const item = document.createElement("div");
    const name = document.createElement("dt");
    const description = document.createElement("dd");
    setMathText(name, term);
    setMathText(description, text);
    item.append(name, description);
    els.stepConcepts.append(item);
  });

  setMathText(els.exampleHeading, step.workedExample.title);
  els.stepWorkedExample.replaceChildren();
  step.workedExample.lines.forEach((line) => {
    const paragraph = document.createElement("p");
    setMathText(paragraph, line);
    els.stepWorkedExample.append(paragraph);
  });

  setMathText(els.ipadHeading, step.actionHeading);
  setMathText(els.stepRemember, step.remember);
  renderLessonMode();
}

function openImageDialog(image) {
  els.dialogImageStage.querySelectorAll(".image-highlight").forEach((marker) => marker.remove());
  els.dialogImageStage.style.width = `${Math.max(image.width, 760)}px`;
  els.dialogImage.src = image.src;
  els.dialogImage.alt = image.alt;
  setMathText(els.dialogCaption, image.caption);
  image.highlights?.forEach((highlight) => {
    els.dialogImageStage.append(createImageHighlight(highlight));
  });
  typesetMath(els.imageDialog);
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
  typesetMath(els.glossaryDialog);
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
    setMathText(caption, image.caption);
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
  document.getElementById(`check-${stepId}-${field.id}`)?.removeAttribute("aria-invalid");
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
    setMathText(text, field.label);
    input.addEventListener("change", () => storeCheckpointValue(step.id, field, input));
    label.append(input, text);
    wrapper.append(kind, label, feedback);
    return { wrapper, control: input };
  }

  if (field.type === "choice" && field.mathOptions) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "math-choice-field";
    fieldset.id = `check-${step.id}-${field.id}`;
    fieldset.setAttribute("aria-describedby", feedback.id);
    const legend = document.createElement("legend");
    setMathText(legend, field.label);
    fieldset.append(legend);

    const choices = document.createElement("div");
    choices.className = "math-choice-options";
    field.options.filter(({ value }) => value !== "").forEach((option, index) => {
      const label = document.createElement("label");
      label.className = "math-choice-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `choice-${step.id}-${field.id}`;
      input.id = `choice-${step.id}-${field.id}-${index}`;
      input.value = option.value;
      input.checked = fieldValue(step.id, field.id) === option.value;
      input.addEventListener("change", () => storeCheckpointValue(step.id, field, input));
      const text = document.createElement(field.codeOptions ? "code" : "span");
      if (field.codeOptions) {
        text.textContent = option.label;
      } else {
        setMathText(text, option.label);
      }
      label.append(input, text);
      choices.append(label);
    });
    fieldset.append(choices);
    wrapper.append(kind, fieldset, feedback);
    return { wrapper, control: fieldset };
  }

  const label = document.createElement("label");
  label.className = "field";
  const text = document.createElement("span");
  setMathText(text, field.label);
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
  setMathText(feedback, valid ? field.feedback.correct : field.feedback.incorrect);
  feedback.className = `field-feedback ${valid ? "good" : "bad"}`;
}

function renderCheckpoint(step) {
  setMathText(els.checkpointPrompt, step.check.prompt);
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
  setMathText(els.sharedRequirementText, complete
    ? "Abgeschlossen: Deine Kontrolle gilt automatisch für alle drei Q–U-Auswertungswege. Du kannst die Herleitung und Klausurformulierungen jederzeit erneut öffnen."
    : "Leite 10 %, 5 % und fmax = 10 % einmal vollständig her. Dieser gemeinsame Abschluss ist für alle drei Q–U-Lernwege verpflichtend.");
  els.sharedRequirementLink.href = `./groesster-einzelfehler.html?course=${encodeURIComponent(course.id)}`;
  els.sharedRequirementLink.textContent = complete ? "Fehlerseite erneut öffnen" : "Fehlerseite bearbeiten";
}

function renderLesson() {
  clearMath(els.lessonCard);
  const course = activeCourse();
  const progress = activeProgress();
  const step = course.steps[progress.currentStep];
  els.stepEyebrow.textContent = `Kapitel ${progress.currentStep + 1} von ${course.steps.length}`;
  setMathText(els.stepTitle, step.title);
  setMathText(els.stepGoal, step.goal);
  updateCurrentStepState();
  renderExplanation(step);

  els.stepActions.replaceChildren();
  step.actions.forEach((action) => {
    const item = document.createElement("li");
    setMathText(item, action);
    els.stepActions.append(item);
  });

  renderSourceData(step);
  els.formulaBlock.hidden = !step.formula;
  els.formulaText.textContent = step.formula || "";
  setMathText(els.stepTroubleshooting, step.troubleshooting);
  setMathText(els.stepMistake, step.mistake);
  document.querySelector(".help-box").open = false;
  renderStepImages(step.images);
  els.lessonGrid.classList.toggle("no-images", step.images.length === 0);
  renderSharedRequirement(step);
  renderCheckpoint(step);

  els.previousStepBtn.disabled = progress.currentStep === 0;
  els.nextStepBtn.textContent = progress.currentStep === course.steps.length - 1
    ? "Zum Lernnachweis ↓"
    : "Weiter →";
}

function renderCourseIdentity() {
  const course = activeCourse();
  els.courseEyebrow.textContent = course.eyebrow;
  setMathText(els.courseTitle, course.title);
  setMathText(els.courseIntro, `${course.subtitle} · ${course.duration}. Alle Kapitel bleiben frei erreichbar.`);
  els.learningMap.replaceChildren();
  course.stages.forEach((stage, index) => {
    const item = document.createElement("li");
    const number = document.createElement("span");
    number.textContent = String(index + 1);
    const label = document.createElement("span");
    setMathText(label, stage);
    item.append(number, label);
    els.learningMap.append(item);
  });
  setMathText(els.completionTitle, `${course.title} abgeschlossen`);
  els.completionText.textContent = "Du kannst den Auswertungsweg fachlich begründen und im Lernnachweis dokumentieren.";
  els.courseChoiceButtons.forEach((button) => {
    const selected = button.dataset.courseId === state.activeCourseId;
    button.setAttribute("aria-pressed", String(selected));
  });
}

function renderCourse({ typeset = true } = {}) {
  clearMath(els.course);
  renderCourseIdentity();
  renderProgress();
  renderStepNav();
  renderLesson();
  if (typeset) typesetMath(els.course);
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
    const value = field.type === "checkbox"
      ? control.checked
      : field.type === "choice" && field.mathOptions
        ? fieldValue(step.id, field.id)
        : control.value;
    const fieldValid = isFieldAnswerValid(field, value);
    control.setAttribute("aria-invalid", fieldValid ? "false" : "true");
    setFieldFeedback(step, field, fieldValid);
    if (!fieldValid && !firstInvalid) {
      firstInvalid = field.type === "choice" && field.mathOptions
        ? control.querySelector("input:checked") || control.querySelector("input")
        : control;
    }
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

function isCheckpointKindComplete(step, kind) {
  return step.check.fields
    .filter((field) => field.kind === kind)
    .every((field) => isFieldAnswerValid(field, fieldValue(step.id, field.id)));
}

function renderSummary({ typeset = true } = {}) {
  clearMath(document.getElementById("printSummary"));
  const course = activeCourse();
  const progress = activeProgress();
  const completeCount = progress.completedSteps.length;
  const sharedComplete = isSharedRequirementComplete(course);
  const courseComplete = isCourseComplete(course, progress);
  els.summaryStatus.textContent = courseComplete ? "Abgeschlossen" : "In Bearbeitung";
  els.summaryStatus.className = `summary-status${courseComplete ? " complete" : ""}`;
  setMathText(els.summarySubtitle, `GeoGebra-Begleitkurs · ${course.title}`);
  setMathText(els.summaryProgress, course.sharedRequirement
    ? `${completeCount} von ${course.steps.length} Kapiteln · Methode des größten Einzelfehlers: ${sharedComplete ? "abgeschlossen" : "offen"}`
    : `${completeCount} von ${course.steps.length} Kapiteln abgeschlossen`);
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
    setMathText(item, `${index + 1}. ${step.title}${missing.length ? ` – ${missing.join(", ")}` : " – vollständig"}`);
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
    setMathText(item, `${complete ? "✓" : "○"} ${competency.label}`);
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
      ["Relative Einzelfehler", "\\(U: 10\\,\\% \\;·\\; Q: 5\\,\\% \\;·\\; f_{\\max}=10\\,\\%\\)"]
    );
  }
  referenceResults.forEach(([term, value]) => {
    const item = document.createElement("div");
    const name = document.createElement("dt");
    const description = document.createElement("dd");
    setMathText(name, term);
    setMathText(description, value);
    item.append(name, description);
    els.summaryKeyResults.append(item);
  });

  setMathText(els.summaryConclusion, courseComplete
    ? course.conclusion
    : course.sharedRequirement && !sharedComplete && completeCount === course.steps.length
      ? "Die acht Kapitel sind abgeschlossen. Die abschließende Beurteilung wird eingetragen, sobald auch die gemeinsame Kontrolle zur Methode des größten Einzelfehlers abgeschlossen ist."
      : "Die abschließende Beurteilung wird eingetragen, sobald alle Ergebnis- und Verständnisprüfungen dieses Lernwegs abgeschlossen sind.");
  if (typeset) typesetMath(document.getElementById("printSummary"));
}

function selectCourse(courseId, { scroll = true } = {}) {
  if (!COURSE_IDS.includes(courseId)) return;
  state.activeCourseId = courseId;
  saveState();
  renderCourse({ typeset: false });
  renderSummary({ typeset: false });
  setMathText(els.courseChoiceStatus, `${activeCourse().title} ist ausgewählt.`);
  typesetMath([els.course, document.getElementById("printSummary"), els.courseChoiceStatus]);
  if (scroll) scrollToElement(els.course);
}

els.startCourseBtn.addEventListener("click", () => scrollToElement(els.coursePicker));
els.courseChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => selectCourse(button.dataset.courseId));
});
els.resetCourseBtn.addEventListener("click", () => {
  const course = activeCourse();
  if (!window.confirm(`Möchtest du die ${course.steps.length} Kapitelkontrollen dieses Lernwegs und ihre Antworten zurücksetzen? Deine anderen Lernwege bleiben erhalten.`)) return;
  state.courses[state.activeCourseId] = { currentStep: 0, completedSteps: [], answers: {} };
  saveState();
  renderCourse({ typeset: false });
  renderSummary({ typeset: false });
  typesetMath([els.course, document.getElementById("printSummary")]);
  scrollToElement(els.course);
});

els.previousStepBtn.addEventListener("click", () => setCurrentStep(activeProgress().currentStep - 1));
els.nextStepBtn.addEventListener("click", () => {
  if (activeProgress().currentStep === activeCourse().steps.length - 1) {
    scrollToElement(document.getElementById("summary"));
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
  typesetMath([els.checkpointFields, els.checkpointFeedback]);
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

els.studentNameInput.addEventListener("input", () => {
  state.student.name = els.studentNameInput.value;
  saveState();
  els.printStudentName.textContent = state.student.name.trim() || "–";
});

els.courseNameInput.addEventListener("input", () => {
  state.student.course = els.courseNameInput.value;
  saveState();
  els.printCourseName.textContent = state.student.course.trim() || "–";
});

els.printSummaryBtn.addEventListener("click", async () => {
  renderSummary({ typeset: false });
  await mathReady;
  await typesetMath(document.getElementById("printSummary"));
  window.print();
});

function initialize() {
  els.studentNameInput.value = state.student.name;
  els.courseNameInput.value = state.student.course;
  renderCourse({ typeset: false });
  renderSummary({ typeset: false });
  saveState();
  typesetDocument();
}

initialize();
