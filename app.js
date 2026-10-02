import { COURSE_IDS, COURSES, PHASES, typesetCourseText } from "./lesson-data.js";
import { formatNumber, isWithin } from "./regression.js";
import { loadState, persistState } from "./state.js";
import { mathReady, replaceMath, typesetDocument, typesetMath } from "./math-typeset.js?v=20260920-1";
import { renderSiteNavigation, taskForCourse } from "./navigation.js";
import { renderSharedErrorModule, isSharedModuleComplete } from "./shared-error-module.js";

const PHASE_TO_DOC_SECTION = Object.freeze({
  data: { section: "data", title: "1. Daten und Einheiten" },
  model: { section: "geogebra", title: "2. GeoGebra-Auswertung" },
  parameters: { section: "physical", title: "3. Physikalische Formel und Parameter" },
  deviations: { section: "deviations", title: "4. Abweichungen und Vergleichsregel" },
  conclusion: { section: "conclusion", title: "5. Begründete Schlussfolgerung" }
});

const els = {
  startCourseBtn: document.getElementById("startCourseBtn"),
  coursePicker: document.getElementById("coursePicker"),
  courseResumeCard: document.getElementById("courseResumeCard"),
  resumeCourseTitle: document.getElementById("resumeCourseTitle"),
  resumeCourseMeta: document.getElementById("resumeCourseMeta"),
  resumeCourseBtn: document.getElementById("resumeCourseBtn"),
  courseChoiceButtons: [...document.querySelectorAll("[data-course-id]")],
  courseChoiceStatus: document.getElementById("courseChoiceStatus"),
  course: document.getElementById("course"),
  changeCourseBtn: document.getElementById("changeCourseBtn"),
  courseEyebrow: document.getElementById("courseEyebrow"),
  courseTitle: document.getElementById("course-title"),
  courseIntro: document.getElementById("courseIntro"),
  learningMap: document.getElementById("learningMap"),
  progressLabel: document.getElementById("progressLabel"),
  progressPercent: document.getElementById("progressPercent"),
  courseProgress: document.getElementById("courseProgress"),
  explainModeBtn: document.getElementById("explainModeBtn"),
  compactModeBtn: document.getElementById("compactModeBtn"),
  courseDocumentationLink: document.getElementById("courseDocumentationLink"),
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
  stepResultRecognition: document.getElementById("stepResultRecognition"),
  resultRecognitionText: document.getElementById("resultRecognitionText"),
  stepTroubleshooting: document.getElementById("stepTroubleshooting"),
  stepMistake: document.getElementById("stepMistake"),
  stepImages: document.getElementById("stepImages"),
  checkpointPrompt: document.getElementById("checkpointPrompt"),
  checkpointForm: document.getElementById("checkpointForm"),
  checkpointFields: document.getElementById("checkpointFields"),
  optionalCheckpointContainer: document.getElementById("optionalCheckpointContainer"),
  checkpointFeedback: document.getElementById("checkpointFeedback"),
  previousStepBtn: document.getElementById("previousStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  phaseDocHint: document.getElementById("phaseDocHint"),
  courseComplete: document.getElementById("courseComplete"),
  completionTitle: document.getElementById("completionTitle"),
  completionText: document.getElementById("completionText"),
  completionActionLink: document.getElementById("completionActionLink"),
  openSummaryBtn: document.getElementById("openSummaryBtn"),
  sharedRequirementCard: document.getElementById("sharedRequirementCard"),
  sharedRequirementText: document.getElementById("sharedRequirementText"),
  sharedRequirementLink: document.getElementById("sharedRequirementLink"),
  migrationNotice: document.getElementById("migrationNotice"),
  dismissMigrationNoticeBtn: document.getElementById("dismissMigrationNoticeBtn"),
  summary: document.getElementById("summary"),
  closeSummaryBtn: document.getElementById("closeSummaryBtn"),
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
const urlParams = new URLSearchParams(window.location.search);
const requestedCourse = urlParams.get("course");
const requestedStep = urlParams.get("step");

let initialView = "picker";
if (requestedCourse && COURSE_IDS.includes(requestedCourse)) {
  state.activeCourseId = requestedCourse;
  initialView = "course";
} else if (window.location.hash === "#course") {
  initialView = "course";
}

if (requestedStep && COURSES[state.activeCourseId]) {
  const stepIdx = COURSES[state.activeCourseId].steps.findIndex((s) => s.id === requestedStep);
  if (stepIdx !== -1) {
    state.courses[state.activeCourseId].currentStep = stepIdx;
  }
}

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
  if (!course.sharedRequirement) return true;
  return isSharedModuleComplete(sharedRequirementState(course));
}

function isPhaseComplete(phase, course = activeCourse()) {
  const phaseSteps = course.steps.filter((s) => s.phaseId === phase.id);
  if (phaseSteps.length === 0) return false;
  const allStepsComplete = phaseSteps.every((s) => isComplete(s.id));
  if (!allStepsComplete) return false;
  if (phase.id === "deviations" && course.sharedRequirement) {
    return isSharedRequirementComplete(course);
  }
  return true;
}

function isCourseComplete(course = activeCourse(), progress = activeProgress()) {
  return progress.completedSteps.length === course.steps.length && isSharedRequirementComplete(course);
}

function saveState() {
  persistState(localStorage, state);
  renderResumeCard();
}

function renderResumeCard() {
  if (!els.courseResumeCard) return;
  const hasProgress = COURSE_IDS.some((id) => (state.courses[id]?.completedSteps?.length || 0) > 0);
  if (!hasProgress) {
    els.courseResumeCard.hidden = true;
    return;
  }
  const course = activeCourse();
  const progress = activeProgress();
  const completedCount = progress.completedSteps.length;
  const totalCount = course.steps.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  els.resumeCourseTitle.textContent = course.title;
  els.resumeCourseMeta.textContent = `Schritt ${progress.currentStep + 1} von ${totalCount} (${percent} % abgeschlossen)`;
  els.courseResumeCard.hidden = false;
}

function setView(view, { scroll = false } = {}) {
  if (view === "course") {
    els.coursePicker.hidden = true;
    els.course.hidden = false;
    els.summary.hidden = true;
    renderSiteNavigation("learn", {
      courseId: state.activeCourseId,
      stepId: activeCourse().steps[activeProgress().currentStep]?.id
    });
    if (scroll) scrollToElement(els.course);
  } else {
    els.coursePicker.hidden = false;
    els.course.hidden = true;
    els.summary.hidden = true;
    renderResumeCard();
    renderSiteNavigation("learn");
    if (scroll) scrollToElement(els.coursePicker);
  }
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
  if (els.depthContent) {
    if (els.depthContent.tagName.toLowerCase() === "details") {
      els.depthContent.open = explain;
    } else {
      els.depthContent.hidden = !explain;
    }
  }
  document.body.dataset.lessonMode = explain ? "explain" : "compact";
}

function setLessonMode(mode) {
  state.lessonMode = mode === "compact" ? "compact" : "explain";
  renderLessonMode();
  saveState();
}

function renderProgress() {
  const course = activeCourse();
  const progress = activeProgress();
  const currentStep = course.steps[progress.currentStep];
  const count = progress.completedSteps.length;
  const total = course.steps.length;
  const percent = Math.round((count / total) * 100);

  const currentPhaseIndex = PHASES.findIndex((p) => p.id === currentStep?.phaseId);
  const phaseNumber = currentPhaseIndex !== -1 ? currentPhaseIndex + 1 : 1;

  let completedPhasesCount = 0;
  PHASES.forEach((phase) => {
    if (isPhaseComplete(phase, course)) {
      completedPhasesCount++;
    }
  });

  els.progressLabel.textContent = `Schritt ${progress.currentStep + 1} von ${total} · Phase ${phaseNumber} von 5 (${completedPhasesCount} von 5 Phasen abgeschlossen)`;
  els.progressPercent.textContent = `${percent} %`;
  els.courseProgress.max = total;
  els.courseProgress.value = count;
  els.courseProgress.textContent = `${count} von ${total} Schritten`;
  const allStepsComplete = count === total;
  const sharedComplete = isSharedRequirementComplete(course);
  els.courseComplete.hidden = !allStepsComplete;
  els.courseComplete.classList.toggle("pending", allStepsComplete && !sharedComplete);
  if (allStepsComplete && !sharedComplete) {
    els.completionTitle.textContent = "Noch ein gemeinsamer Schritt";
    els.completionText.textContent = "Schließe die Methode des größten Einzelfehlers einmal ab. Danach gilt sie für alle drei Q–U-Lernwege.";
    els.completionActionLink.href = `./groesster-einzelfehler.html?course=${encodeURIComponent(course.id)}`;
    els.completionActionLink.textContent = "Fehlerseite abschließen";
  } else if (allStepsComplete) {
    setMathText(els.completionTitle, `${course.title} abgeschlossen`);
    els.completionText.textContent = "Übertrage den Rechenweg als Nächstes auf neue Daten oder öffne bei Bedarf die Bearbeitungsübersicht.";
    els.completionActionLink.href = `./selbst-auswerten.html?task=${encodeURIComponent(taskForCourse(course.id))}`;
    els.completionActionLink.textContent = "Mit neuen Daten selbst auswerten";
  }
}

function renderStepNav() {
  const recommended = recommendedStepIndex();
  els.stepNav.replaceChildren();

  const progress = activeProgress();
  const course = activeCourse();
  const currentStep = course.steps[progress.currentStep];
  const phaseSteps = course.steps.filter((step) => step.phaseId === currentStep?.phaseId);

  phaseSteps.forEach((step, phaseStepIndex) => {
    const index = course.steps.findIndex((candidate) => candidate.id === step.id);
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.stepIndex = String(index);
    button.setAttribute("aria-label", `Schritt ${phaseStepIndex + 1} in dieser Phase: ${step.title}${isComplete(step.id) ? ", abgeschlossen" : ""}`);
    if (index === progress.currentStep) button.setAttribute("aria-current", "step");
    if (index === recommended && !isComplete(step.id)) button.classList.add("is-next");

    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = String(phaseStepIndex + 1);
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
    const markExcluded = Boolean(step.markExcludedRows && (dataRow.excluded || dataRow.flagged));
    if (markExcluded) {
      row.className = "flagged-data-row";
      row.title = "Ungeklärtes Wertepaar – Gegenstand der Vertiefung";
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

  if (step.optionalExtension) {
    const details = document.createElement("details");
    details.className = "optional-extension";
    const summary = document.createElement("summary");
    summary.textContent = step.optionalExtension.title;
    const content = document.createElement("div");
    step.optionalExtension.lines.forEach((line) => {
      const paragraph = document.createElement("p");
      setMathText(paragraph, line);
      content.append(paragraph);
    });
    details.append(summary, content);
    els.stepWorkedExample.append(details);
  }  setMathText(els.ipadHeading, step.actionHeading);
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

function renderStepImages(images, optionalImages = []) {
  els.stepImages.replaceChildren();
  els.stepImages.hidden = images.length + optionalImages.length === 0;
  const [primaryImage, ...helpImages] = images;
  if (!primaryImage) return;

  const renderImage = (image, imageIndex) => {
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
    image.highlights?.forEach((highlight) => button.append(createImageHighlight(highlight)));

    const zoom = document.createElement("span");
    zoom.className = "figure-zoom-label";
    zoom.textContent = "Antippen zum Vergrößern";
    zoom.setAttribute("aria-hidden", "true");
    button.append(zoom);
    button.addEventListener("click", () => openImageDialog(image));

    const caption = document.createElement("figcaption");
    setMathText(caption, image.caption);
    figure.append(button, caption);
    return figure;
  };

  els.stepImages.append(renderImage(primaryImage, 0));
  if (helpImages.length || optionalImages.length) {
    const details = document.createElement("details");
    details.className = "step-image-help";
    const summary = document.createElement("summary");
    const allHelpImages = [...helpImages, ...optionalImages];
    summary.textContent = `${allHelpImages.length} weiteres Bild zur Hilfe`;
    const list = document.createElement("div");
    list.className = "step-images-help-list";
    allHelpImages.forEach((image, index) => list.append(renderImage(image, index + 1)));
    details.append(summary, list);
    els.stepImages.append(details);
  }
}

function fieldValue(stepId, fieldId) {
  return activeProgress().answers[stepId]?.[fieldId] ?? "";
}

function markStepIncomplete(stepId) {
  if (!isComplete(stepId)) return;
  activeProgress().completedSteps = activeProgress().completedSteps.filter((id) => id !== stepId);
  updateCurrentStepState();
  renderCourseIdentity();
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
  if (field.required !== false) markStepIncomplete(stepId);
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

  const requiredFields = step.check.fields.filter((field) => field.required !== false);
  const optionalFields = step.check.fields.filter((field) => field.required === false);

  requiredFields.forEach((field) => {
    const { wrapper } = createCheckpointControl(step, field);
    els.checkpointFields.append(wrapper);
  });

  if (els.optionalCheckpointContainer) {
    els.optionalCheckpointContainer.replaceChildren();
    if (optionalFields.length > 0) {
      const details = document.createElement("details");
      details.className = "optional-checkpoint-box";
      const summary = document.createElement("summary");
      summary.textContent = `Freiwillige Vertiefung (${optionalFields.length} weitere Aufgabe${optionalFields.length > 1 ? "n" : ""})`;
      const fieldList = document.createElement("div");
      fieldList.className = "optional-checkpoint-fields";
      optionalFields.forEach((field) => {
        const { wrapper } = createCheckpointControl(step, field);
        fieldList.append(wrapper);
      });
      details.append(summary, fieldList);
      els.optionalCheckpointContainer.append(details);
    }
  }

  if (isComplete(step.id)) {
    step.check.fields.forEach((field) => {
      const val = fieldValue(step.id, field.id);
      if (field.required !== false || (val !== "" && val !== undefined)) {
        setFieldFeedback(step, field, isFieldAnswerValid(field, val));
      }
    });
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

  renderSharedErrorModule(els.sharedRequirementCard, {
    state,
    course,
    step,
    typesetMath,
    onStateChange: () => {
      saveState();
      renderProgress();
      renderCourseIdentity();
      renderStepNav();
      renderSummary();
    }
  });
}

function renderLesson() {
  const course = activeCourse();
  const progress = activeProgress();
  const step = course.steps[progress.currentStep];
  const phaseTitle = PHASES.find((p) => p.id === step.phaseId)?.title || "";
  els.stepEyebrow.textContent = `Schritt ${progress.currentStep + 1} von ${course.steps.length} · ${phaseTitle}`;
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

  if (els.stepResultRecognition && els.resultRecognitionText) {
    if (step.resultRecognition) {
      setMathText(els.resultRecognitionText, step.resultRecognition);
      els.stepResultRecognition.hidden = false;
    } else {
      els.stepResultRecognition.hidden = true;
    }
  }

  setMathText(els.stepTroubleshooting, step.troubleshooting);
  setMathText(els.stepMistake, step.mistake);
  const helpBox = document.querySelector(".help-box");
  if (helpBox) helpBox.open = false;

  renderStepImages(step.images, step.optionalExtension?.images || []);
  els.lessonGrid.classList.toggle("no-images", step.images.length === 0);
  renderSharedRequirement(step);
  renderCheckpoint(step);

  const phaseSteps = course.steps.filter((s) => s.phaseId === step.phaseId);
  const isLastStepOfPhase = phaseSteps[phaseSteps.length - 1]?.id === step.id;
  const docMapping = PHASE_TO_DOC_SECTION[step.phaseId];

  if (isLastStepOfPhase && docMapping && els.phaseDocHint) {
    els.phaseDocHint.hidden = false;
    els.phaseDocHint.innerHTML = `
      <p class="phase-doc-text"><strong>Für deine Dokumentation:</strong> Wie du diese Ergebnisse in der Klausur festhältst.</p>
      <a class="phase-doc-btn" href="./dokumentation.html?course=${encodeURIComponent(course.id)}&section=${encodeURIComponent(docMapping.section)}&step=${encodeURIComponent(step.id)}">Abschnitt „${docMapping.title}“ im Klausurmuster ansehen ↗</a>
    `;
  } else if (els.phaseDocHint) {
    els.phaseDocHint.hidden = true;
    els.phaseDocHint.replaceChildren();
  }

  els.previousStepBtn.disabled = progress.currentStep === 0;
  els.nextStepBtn.textContent = progress.currentStep === course.steps.length - 1
    ? "Zur Bearbeitungsübersicht ↓"
    : "Weiter →";
}

function renderCourseIdentity() {
  const course = activeCourse();
  const progress = activeProgress();
  const currentStep = course.steps[progress.currentStep];
  const currentPhaseId = currentStep?.phaseId || PHASES[0].id;

  els.courseDocumentationLink.href = `./dokumentation.html?course=${encodeURIComponent(course.id)}`;
  els.courseEyebrow.textContent = course.eyebrow;
  setMathText(els.courseTitle, course.title);
  setMathText(els.courseIntro, `${course.subtitle} · ${course.duration}. Alle Schritte bleiben frei erreichbar.`);

  els.learningMap.replaceChildren();
  PHASES.forEach((phase, phaseIndex) => {
    const phaseSteps = course.steps.filter((s) => s.phaseId === phase.id);
    const completedPhaseSteps = phaseSteps.filter((s) => isComplete(s.id));
    const phaseComplete = isPhaseComplete(phase, course);
    const isPhaseActive = phase.id === currentPhaseId;
    const isPhaseStarted = completedPhaseSteps.length > 0 || isPhaseActive || (phase.id === "deviations" && course.sharedRequirement && sharedRequirementState(course)?.completed);

    let statusText = "Nicht begonnen";
    let statusClass = "not-started";
    if (phaseComplete) {
      statusText = "Abgeschlossen";
      statusClass = "complete";
    } else if (isPhaseStarted) {
      statusText = "In Bearbeitung";
      statusClass = "in-progress";
    }

    const item = document.createElement("li");
    item.className = `learning-map-item ${statusClass}${isPhaseActive ? " is-active" : ""}`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "learning-map-btn";
    button.setAttribute("aria-label", `Phase ${phaseIndex + 1}: ${phase.title} (${statusText})`);
    if (isPhaseActive) button.setAttribute("aria-current", "step");

    const number = document.createElement("span");
    number.className = "learning-map-number";
    number.textContent = phaseComplete ? "✓" : String(phaseIndex + 1);

    const content = document.createElement("div");
    content.className = "learning-map-content";

    const label = document.createElement("span");
    label.className = "learning-map-label";
    label.textContent = phase.title;

    const status = document.createElement("span");
    status.className = "learning-map-status";
    status.textContent = statusText;

    content.append(label, status);
    button.append(number, content);

    button.addEventListener("click", () => {
      const firstIncomplete = phaseSteps.find((s) => !isComplete(s.id));
      const targetStep = firstIncomplete || phaseSteps[0];
      if (targetStep) {
        const targetIndex = course.steps.findIndex((s) => s.id === targetStep.id);
        if (targetIndex !== -1) {
          setCurrentStep(targetIndex);
        }
      }
    });

    item.append(button);
    els.learningMap.append(item);
  });

  setMathText(els.completionTitle, `${course.title} abgeschlossen`);
  els.completionText.textContent = "Übertrage den Rechenweg als Nächstes auf neue Daten oder öffne bei Bedarf die Bearbeitungsübersicht.";
  els.courseChoiceButtons.forEach((button) => {
    const selected = button.dataset.courseId === state.activeCourseId;
    button.setAttribute("aria-pressed", String(selected));
  });
}

function renderCourse({ typeset = true } = {}) {
  if (typeset) {
    return replaceMath(els.course, () => renderCourse({ typeset: false }));
  }
  renderCourseIdentity();
  renderProgress();
  renderStepNav();
  renderLesson();
}

async function setCurrentStep(index, shouldScroll = true) {
  const progress = activeProgress();
  progress.currentStep = Math.max(0, Math.min(activeCourse().steps.length - 1, index));
  saveState();
  renderSiteNavigation("learn", {
    courseId: state.activeCourseId,
    stepId: activeCourse().steps[progress.currentStep]?.id
  });
  await renderCourse();
  if (shouldScroll) scrollToElement(els.lessonCard);
}

function validateCheckpoint(step) {
  let valid = true;
  let firstInvalid = null;
  step.check.fields.forEach((field) => {
    const control = document.getElementById(`check-${step.id}-${field.id}`);
    if (!control) return;
    const value = field.type === "checkbox"
      ? control.checked
      : field.type === "choice" && field.mathOptions
        ? fieldValue(step.id, field.id)
        : control.value;

    const isRequired = field.required !== false;
    const isEmpty = value === "" || value === undefined || (field.type === "checkbox" && !value);

    if (!isRequired && isEmpty) {
      control.removeAttribute("aria-invalid");
      return;
    }

    const fieldValid = isFieldAnswerValid(field, value);
    control.setAttribute("aria-invalid", fieldValid ? "false" : "true");
    setFieldFeedback(step, field, fieldValid);

    if (isRequired) {
      if (!fieldValid && !firstInvalid) {
        firstInvalid = field.type === "choice" && field.mathOptions
          ? control.querySelector("input:checked") || control.querySelector("input")
          : control;
      }
      valid = valid && fieldValid;
    }
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
    .filter((field) => field.kind === kind && field.required !== false)
    .every((field) => isFieldAnswerValid(field, fieldValue(step.id, field.id)));
}

function renderSummary({ typeset = true } = {}) {
  const summary = document.getElementById("printSummary");
  if (typeset) {
    return replaceMath(summary, () => renderSummary({ typeset: false }));
  }
  const course = activeCourse();
  const progress = activeProgress();
  const completeCount = progress.completedSteps.length;
  const sharedComplete = isSharedRequirementComplete(course);
  const courseComplete = isCourseComplete(course, progress);
  els.summaryStatus.textContent = courseComplete ? "Abgeschlossen" : "In Bearbeitung";
  els.summaryStatus.className = `summary-status${courseComplete ? " complete" : ""}`;
  setMathText(els.summarySubtitle, `GeoGebra-Trainer · ${course.title}`);
  setMathText(els.summaryProgress, course.sharedRequirement
    ? `${completeCount} von ${course.steps.length} Schritten · Methode des größten Einzelfehlers: ${sharedComplete ? "abgeschlossen" : "offen"}`
    : `${completeCount} von ${course.steps.length} Schritten abgeschlossen`);
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
    item.textContent = `Gemeinsame Fehlerseite: Methode des größten Einzelfehlers – ${sharedComplete ? "vollständig" : "Kontrolle offen"}`;
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
      ? `Alle ${course.steps.length} Schritte sind abgeschlossen. Die abschließende Beurteilung wird eingetragen, sobald auch die gemeinsame Kontrolle zur Methode des größten Einzelfehlers abgeschlossen ist.`
      : "Die abschließende Beurteilung wird eingetragen, sobald alle Ergebnis- und Verständnisprüfungen dieses Lernwegs abgeschlossen sind.");
}

async function selectCourse(courseId, { scroll = true } = {}) {
  if (!COURSE_IDS.includes(courseId)) return;
  state.activeCourseId = courseId;
  saveState();
  renderMigrationNotice();
  setView("course", { scroll: false });
  await replaceMath([els.course, document.getElementById("printSummary"), els.courseChoiceStatus], () => {
    renderCourse({ typeset: false });
    renderSummary({ typeset: false });
    setMathText(els.courseChoiceStatus, `${activeCourse().title} ist ausgewählt.`);
  });
  if (scroll) scrollToElement(els.course);
}

els.startCourseBtn.addEventListener("click", () => {
  if (els.course.hidden) {
    scrollToElement(els.coursePicker);
  } else {
    scrollToElement(els.course);
  }
});

els.resumeCourseBtn?.addEventListener("click", () => {
  setView("course", { scroll: true });
});

els.changeCourseBtn?.addEventListener("click", () => {
  setView("picker", { scroll: true });
});

els.openSummaryBtn?.addEventListener("click", () => {
  els.summary.hidden = false;
  scrollToElement(els.summary);
});

els.closeSummaryBtn?.addEventListener("click", () => {
  els.summary.hidden = true;
  scrollToElement(els.course);
});

els.dismissMigrationNoticeBtn?.addEventListener("click", () => {
  delete state.migrationNotice;
  saveState();
  renderMigrationNotice();
});
els.completionActionLink?.addEventListener("click", () => {
  if (els.completionActionLink.getAttribute("href") === "#summary") els.summary.hidden = false;
});

els.courseChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => selectCourse(button.dataset.courseId));
});

els.resetCourseBtn.addEventListener("click", async () => {
  const course = activeCourse();
  if (!window.confirm(`Möchtest du die ${course.steps.length} Schrittkontrollen dieses Lernwegs und ihre Antworten zurücksetzen? Deine anderen Lernwege bleiben erhalten.`)) return;
  state.courses[state.activeCourseId] = { currentStep: 0, completedSteps: [], answers: {} };
  saveState();
  await replaceMath([els.course, document.getElementById("printSummary")], () => {
    renderCourse({ typeset: false });
    renderSummary({ typeset: false });
  });
  scrollToElement(els.course);
});

els.previousStepBtn.addEventListener("click", () => setCurrentStep(activeProgress().currentStep - 1));
els.nextStepBtn.addEventListener("click", () => {
  if (activeProgress().currentStep === activeCourse().steps.length - 1) {
    els.summary.hidden = false;
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
    renderCourseIdentity();
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
  await renderSummary();
  await mathReady;
  window.print();
});

function renderMigrationNotice() {
  if (!els.migrationNotice) return;
  const visible = state.activeCourseId === "capacitor-exponential" && Boolean(state.migrationNotice);
  els.migrationNotice.hidden = !visible;
  if (visible) els.migrationNotice.querySelector("p").textContent = state.migrationNotice;
}
function initialize() {
  els.studentNameInput.value = state.student.name;
  els.courseNameInput.value = state.student.course;
  renderResumeCard();
  renderMigrationNotice();
  setView(initialView, { scroll: false });
  renderCourse({ typeset: false });
  renderSummary({ typeset: false });
  saveState();
  typesetDocument();
}

initialize();
