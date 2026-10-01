import { isWithin } from "./regression.js";
import { UQ_SHARED_REQUIREMENT_ID } from "./lesson-data.js";

export { UQ_SHARED_REQUIREMENT_ID };

export const SHARED_ERROR_FIELDS = Object.freeze([
  Object.freeze({
    id: "uError",
    kind: "result",
    type: "number",
    label: "Größter relativer U-Einzelfehler in %",
    placeholder: "Ergebnis eingeben",
    expected: 10,
    tolerance: 0.05,
    correct: "\\(10\\,\\%\\) stimmt.",
    incorrect: "Berechne \\(\\frac{5}{50}\\cdot100\\)."
  }),
  Object.freeze({
    id: "qError",
    kind: "result",
    type: "number",
    label: "Größter relativer Q-Einzelfehler in %",
    placeholder: "Ergebnis eingeben",
    expected: 5,
    tolerance: 0.05,
    correct: "\\(5\\,\\%\\) stimmt.",
    incorrect: "Berechne \\(\\frac{0{,}1}{2{,}0}\\cdot100\\)."
  }),
  Object.freeze({
    id: "maxError",
    kind: "result",
    type: "number",
    label: "f_max in %",
    placeholder: "Ergebnis eingeben",
    expected: 10,
    tolerance: 0.05,
    correct: "\\(f_{\\max}=10\\,\\%\\) stimmt.",
    incorrect: "Wähle den größeren Wert aus \\(10\\,\\%\\) und \\(5\\,\\%\\)."
  }),
  Object.freeze({
    id: "minimumReason",
    kind: "understanding",
    type: "choice",
    label: "Warum verwenden wir die kleinsten Messwerte?",
    expected: "largest-relative",
    options: Object.freeze([
      Object.freeze({ value: "", label: "Bitte auswählen …" }),
      Object.freeze({ value: "largest-relative", label: "Bei gleichem absoluten Fehler ist dort der relative Fehler am größten." }),
      Object.freeze({ value: "smallest-error", label: "Dort ist auch der absolute Fehler am kleinsten." }),
      Object.freeze({ value: "geogebra", label: "GeoGebra verlangt immer den kleinsten Wert." })
    ]),
    correct: "Richtig: Bei gleichem absoluten Fehler ist der relative Fehler am kleinsten Messwert am größten.",
    incorrect: "Vergleiche denselben Zähler bei einem kleinen und einem großen Nenner."
  }),
  Object.freeze({
    id: "methodMeaning",
    kind: "understanding",
    type: "choice",
    label: "Was bedeutet eine Abweichung unter f_max?",
    expected: "explainable",
    options: Object.freeze([
      Object.freeze({ value: "", label: "Bitte auswählen …" }),
      Object.freeze({ value: "explainable", label: "Sie kann nach dieser Methode durch Messfehler erklärt werden, beweist aber nichts." }),
      Object.freeze({ value: "proven", label: "Die Theorie ist damit mathematisch bewiesen." }),
      Object.freeze({ value: "zero", label: "Die tatsächliche Abweichung ist null." })
    ]),
    correct: "Richtig: erklärbar, aber nicht bewiesen.",
    incorrect: "Die Methode erlaubt eine Fehlererklärung, keinen mathematischen Beweis."
  })
]);

export function validateSharedErrorField(field, value) {
  if (value === undefined || value === null || String(value).trim() === "") return false;
  if (field.type === "number") {
    return isWithin(value, field.expected, field.tolerance);
  }
  return String(value).trim() === field.expected;
}

export function isSharedModuleComplete(sharedState) {
  if (!sharedState || sharedState.completed !== true) return false;
  const answers = sharedState.answers || {};
  return SHARED_ERROR_FIELDS.every((field) => validateSharedErrorField(field, answers[field.id]));
}

export function renderSharedErrorModule(container, { state, course, step, onStateChange, typesetMath: customTypeset }) {
  if (!container) return;
  const typeset = customTypeset || (typeof window !== "undefined" && window.typesetMath);

  state.sharedModules ||= {};
  state.sharedModules[UQ_SHARED_REQUIREMENT_ID] ||= { completed: false, answers: {} };
  const moduleState = state.sharedModules[UQ_SHARED_REQUIREMENT_ID];

  container.replaceChildren();
  container.className = `shared-error-module shared-requirement-card${moduleState.completed ? " complete" : ""}`;

  const headerDiv = document.createElement("div");
  headerDiv.className = "shared-module-header";

  const miniLabel = document.createElement("p");
  miniLabel.className = "mini-label";
  miniLabel.textContent = "Gemeinsame Pflichtkontrolle";

  const title = document.createElement("h3");
  title.id = "sharedRequirementTitle";
  title.textContent = "Methode des größten Einzelfehlers";

  headerDiv.append(miniLabel, title);

  const summaryBox = document.createElement("div");
  summaryBox.className = "shared-method-summary";
  const summaryText = document.createElement("p");
  summaryText.textContent = "Wir verwenden hier die im Unterricht vereinbarte Methode des größten Einzelfehlers als vereinfachte Vergleichsregel. Der größte relative Einzelfehler beträgt in dieser Messreihe 10 %. Die untersuchte Abweichung wird mit dieser Grenze verglichen. Damit berechnen wir keine statistische Unsicherheit eines Regressionsparameters.";
  const assumptionsText = document.createElement("p");
  assumptionsText.className = "shared-method-assumptions";
  assumptionsText.textContent = "Angenommene Gerätefehler: \\(\\Delta U = 5\\,\\mathrm{V}\\) und \\(\\Delta Q = 0{,}1\\cdot10^{-8}\\,\\mathrm{C}\\).";
  summaryBox.append(summaryText, assumptionsText);

  const details = document.createElement("details");
  details.className = "shared-method-details";
  const detailsSummary = document.createElement("summary");
  detailsSummary.textContent = "Schrittweise Herleitung der Fehlergrenze aufklappen";
  const detailsContent = document.createElement("div");
  detailsContent.className = "shared-method-details-content";

  const ol = document.createElement("ol");
  const li1 = document.createElement("li");
  li1.innerHTML = "<strong>Absolute Einzelfehler:</strong> \\(\\Delta U=5\\,\\mathrm V,\\quad \\Delta Q=0{,}1\\cdot10^{-8}\\,\\mathrm C\\) (vorgegebene Annahmen).";
  const li2 = document.createElement("li");
  li2.innerHTML = "<strong>Spannung relativ:</strong> \\(\\frac{5}{50}\\cdot100=10\\,\\%\\) am kleinsten Messwert (\\(50\\,\\mathrm V\\)).";
  const li3 = document.createElement("li");
  li3.innerHTML = "<strong>Ladung relativ:</strong> \\(\\frac{0{,}1}{2{,}0}\\cdot100=5\\,\\%\\) am kleinsten Messwert (\\(2{,}0\\cdot10^{-8}\\,\\mathrm C\\)).";
  const li4 = document.createElement("li");
  li4.innerHTML = "<strong>Größten Wert wählen:</strong> \\(f_{\\max}=\\max(10\\,\\%,5\\,\\%)=10\\,\\%\\).";
  ol.append(li1, li2, li3, li4);

  const asideNote = document.createElement("aside");
  asideNote.className = "method-note";
  asideNote.innerHTML = "<strong>Warum die kleinsten Messwerte?</strong> Bei gleichem absoluten Fehler ist der relative Fehler dort am größten, da derselbe Fehler durch den kleinsten Messwert geteilt wird.";
  detailsContent.append(ol, asideNote);
  details.append(detailsSummary, detailsContent);

  const statusBadge = document.createElement("div");
  statusBadge.id = "sharedModuleStatus";
  statusBadge.className = `shared-method-status-badge ${moduleState.completed ? "complete" : "pending"}`;
  statusBadge.setAttribute("role", "status");
  statusBadge.setAttribute("aria-live", "polite");
  statusBadge.textContent = moduleState.completed
    ? "✓ Pflichtkontrolle abgeschlossen – dieser Abschluss gilt für alle drei Q–U-Lernwege."
    : "Noch offen – dieser gemeinsame Abschluss wird für Phase 4 (Abweichungen) und den Abschluss der drei Q–U-Lernwege benötigt.";

  const form = document.createElement("form");
  form.id = "sharedMethodForm";
  form.className = "shared-method-form";
  form.setAttribute("novalidate", "");

  const fieldsContainer = document.createElement("div");
  fieldsContainer.className = "checkpoint-fields";

  const fieldControls = new Map();

  SHARED_ERROR_FIELDS.forEach((field) => {
    const fieldWrap = document.createElement("div");
    fieldWrap.className = `checkpoint-field ${field.kind}`;

    const kindSpan = document.createElement("span");
    kindSpan.className = "check-kind";
    kindSpan.textContent = field.kind === "result" ? "Ergebnis" : "Verständnis";

    const label = document.createElement("label");
    label.className = "field";
    label.htmlFor = `sm-${field.id}`;

    const labelText = document.createElement("span");
    labelText.textContent = field.label;
    label.append(labelText);

    let control;
    if (field.type === "choice") {
      control = document.createElement("select");
      control.id = `sm-${field.id}`;
      control.name = field.id;
      control.setAttribute("aria-describedby", `sm-feedback-${field.id}`);
      field.options.forEach((opt) => {
        const optionEl = document.createElement("option");
        optionEl.value = opt.value;
        optionEl.textContent = opt.label;
        control.append(optionEl);
      });
      control.value = String(moduleState.answers[field.id] ?? "");
    } else {
      control = document.createElement("input");
      control.id = `sm-${field.id}`;
      control.name = field.id;
      control.type = "text";
      control.inputMode = "decimal";
      control.placeholder = field.placeholder || "Ergebnis eingeben";
      control.setAttribute("aria-describedby", `sm-feedback-${field.id}`);
      control.value = String(moduleState.answers[field.id] ?? "");
    }

    const feedback = document.createElement("p");
    feedback.id = `sm-feedback-${field.id}`;
    feedback.className = "field-feedback";
    feedback.setAttribute("aria-live", "polite");

    if (moduleState.completed && validateSharedErrorField(field, control.value)) {
      feedback.textContent = field.correct;
      feedback.className = "field-feedback good";
    }

    const onInput = () => {
      moduleState.answers[field.id] = control.value;
      const isStillAllValid = SHARED_ERROR_FIELDS.every((f) => validateSharedErrorField(f, moduleState.answers[f.id]));
      if (!isStillAllValid) {
        moduleState.completed = false;
        container.classList.remove("complete");
        statusBadge.className = "shared-method-status-badge pending";
        statusBadge.textContent = "Noch offen – dieser gemeinsame Abschluss wird für Phase 4 (Abweichungen) und den Abschluss der drei Q–U-Lernwege benötigt.";
      }
      control.removeAttribute("aria-invalid");
      feedback.textContent = "";
      feedback.className = "field-feedback";
      overallFeedback.textContent = "";
      overallFeedback.className = "feedback";
      onStateChange?.();
    };

    control.addEventListener("input", onInput);
    control.addEventListener("change", onInput);

    label.append(control);
    fieldWrap.append(kindSpan, label, feedback);
    fieldsContainer.append(fieldWrap);
    fieldControls.set(field.id, { control, feedback, field });
  });

  const submitBtn = document.createElement("button");
  submitBtn.className = "button primary";
  submitBtn.type = "submit";
  submitBtn.textContent = "Pflichtkontrolle prüfen";

  const overallFeedback = document.createElement("p");
  overallFeedback.id = "sharedMethodOverallFeedback";
  overallFeedback.className = `feedback${moduleState.completed ? " good" : ""}`;
  overallFeedback.setAttribute("role", "status");
  overallFeedback.setAttribute("aria-live", "polite");
  if (moduleState.completed) {
    overallFeedback.textContent = "Abgeschlossen! Die gemeinsame Fehlerkontrolle gilt für alle drei Q–U-Lernwege.";
  }

  form.append(fieldsContainer, submitBtn, overallFeedback);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    let firstInvalid = null;

    SHARED_ERROR_FIELDS.forEach((field) => {
      const { control, feedback } = fieldControls.get(field.id);
      const val = control.value;
      const isValid = validateSharedErrorField(field, val);
      allValid = allValid && isValid;
      control.setAttribute("aria-invalid", String(!isValid));
      feedback.textContent = isValid ? field.correct : field.incorrect;
      feedback.className = `field-feedback ${isValid ? "good" : "bad"}`;
      if (!isValid && !firstInvalid) firstInvalid = control;
    });

    moduleState.completed = allValid;
    container.classList.toggle("complete", allValid);
    statusBadge.className = `shared-method-status-badge ${allValid ? "complete" : "pending"}`;
    statusBadge.textContent = allValid
      ? "✓ Pflichtkontrolle abgeschlossen – dieser Abschluss gilt für alle drei Q–U-Lernwege."
      : "Noch offen – dieser gemeinsame Abschluss wird für Phase 4 (Abweichungen) und den Abschluss der drei Q–U-Lernwege benötigt.";

    overallFeedback.textContent = allValid
      ? "Abgeschlossen! Die gemeinsame Fehlerkontrolle gilt jetzt für alle drei Q–U-Lernwege."
      : "Noch nicht vollständig. Prüfe bitte die markierten Felder.";
    overallFeedback.className = `feedback ${allValid ? "good" : "bad"}`;

    typeset?.(form);
    firstInvalid?.focus();
    onStateChange?.();
  });

  const referencePara = document.createElement("p");
  referencePara.className = "shared-method-reference";
  const refLink = document.createElement("a");
  refLink.id = "sharedRequirementLink";
  refLink.className = "button secondary method-reference-btn";
  const backCourseId = course?.id || "proportional-power";
  const backStepId = step?.id || "";
  refLink.href = `./groesster-einzelfehler.html?course=${encodeURIComponent(backCourseId)}&return=${encodeURIComponent(backCourseId)}&step=${encodeURIComponent(backStepId)}`;
  refLink.textContent = "Ausführliche Nachschlageseite mit Klausurformulierungen öffnen ↗";
  referencePara.append(refLink);

  container.append(headerDiv, summaryBox, details, statusBadge, form, referencePara);
  typeset?.(container);
}
