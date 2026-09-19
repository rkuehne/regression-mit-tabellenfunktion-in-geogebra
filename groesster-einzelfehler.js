import { isWithin } from "./regression.js";
import { COURSE_IDS, UQ_SHARED_REQUIREMENT_ID } from "./lesson-data.js";
import { loadState, persistState } from "./state.js";
import { typesetDocument, typesetMath } from "./math-typeset.js";

const UQ_COURSES = COURSE_IDS.filter((id) => id.startsWith("proportional-"));
const state = loadState(localStorage);
const requestedCourse = new URLSearchParams(window.location.search).get("course");
if (UQ_COURSES.includes(requestedCourse)) {
  state.activeCourseId = requestedCourse;
}

state.sharedModules ||= {};
state.sharedModules[UQ_SHARED_REQUIREMENT_ID] ||= { completed: false, answers: {} };
const moduleState = state.sharedModules[UQ_SHARED_REQUIREMENT_ID];

const form = document.getElementById("methodCheckForm");
const overallFeedback = document.getElementById("methodCheckFeedback");
const moduleStatus = document.getElementById("moduleStatus");
const returnLink = document.getElementById("returnToCourse");
const copyStatus = document.getElementById("copyMethodStatus");
const copyPhrases = new Map([
  ["phrase-power", "Die Potenzregression ergibt den Exponenten n ≈ 1,0116. Aus ΔU = 5 V und ΔQ = 0,1 · 10⁻⁸ C ergibt sich nach der Methode des größten Einzelfehlers ein größter relativer Einzelfehler von 10 %. Die relative Exponentabweichung beträgt etwa 1,16 %, die größte Modellabweichung etwa 3,74 %. Beide Abweichungen liegen unter 10 % und können daher durch die Messfehler erklärt werden. Der Exponent kann näherungsweise als n ≈ 1 behandelt werden. Die Messwerte sind damit mit Q ∝ U vereinbar, beweisen die Proportionalität aber nicht."],
  ["phrase-constants", "Die mittlere Kapazität beträgt etwa 416 pF. Nach der Methode des größten Einzelfehlers ergibt sich aus den Messfehlern ein größter relativer Einzelfehler von 10 %. Die größte Abweichung einer Einzelkapazität vom Mittelwert beträgt etwa 3,83 % und liegt damit unter 10 %. Die Streuung kann durch die Messfehler erklärt und die Kapazität im Rahmen dieser Methode als konstant angesehen werden. Die Messwerte sind mit Q ∝ U vereinbar, beweisen die Proportionalität aber nicht."],
  ["phrase-linear", "Die lineare Regression ergibt Q(U) = 0,0408U + 0,12. Aus ΔU = 5 V und ΔQ = 0,1 · 10⁻⁸ C ergibt sich nach der Methode des größten Einzelfehlers ein größter relativer Einzelfehler von 10 %. Die größte Modellabweichung beträgt 7,41 %. Der Anteil des y-Achsenabschnitts am kleinsten Ladungswert beträgt 0,12/2,0 · 100 = 6 %. Beide Abweichungen liegen unter 10 % und können daher durch die Messfehler erklärt werden. Der y-Achsenabschnitt kann näherungsweise vernachlässigt werden, sodass Q(U) ≈ mU gilt. Die Messwerte sind damit mit Q ∝ U vereinbar, beweisen die Proportionalität aber nicht."]
]);

const fields = [
  { id: "uError", type: "number", expected: 10, tolerance: 0.05, correct: "\\(10\\,\\%\\) stimmt.", incorrect: "Berechne \\(\\frac{5}{50}\\cdot100\\)." },
  { id: "qError", type: "number", expected: 5, tolerance: 0.05, correct: "\\(5\\,\\%\\) stimmt.", incorrect: "Berechne \\(\\frac{0{,}1}{2{,}0}\\cdot100\\)." },
  { id: "maxError", type: "number", expected: 10, tolerance: 0.05, correct: "\\(f_{\\max}=10\\,\\%\\) stimmt.", incorrect: "Wähle den größeren Wert aus \\(10\\,\\%\\) und \\(5\\,\\%\\)." },
  { id: "minimumReason", type: "choice", expected: "largest-relative", correct: "Richtig: Bei gleichem absoluten Fehler ist der relative Fehler am kleinsten Messwert am größten.", incorrect: "Vergleiche denselben Zähler bei einem kleinen und einem großen Nenner." },
  { id: "methodMeaning", type: "choice", expected: "explainable", correct: "Richtig: erklärbar, aber nicht bewiesen.", incorrect: "Die Methode erlaubt eine Fehlererklärung, keinen mathematischen Beweis." }
];

function save() {
  persistState(localStorage, state);
}

function valid(field, value) {
  return field.type === "number" ? isWithin(value, field.expected, field.tolerance) : value === field.expected;
}

function renderStatus() {
  moduleStatus.textContent = moduleState.completed
    ? "✓ Pflichtkontrolle abgeschlossen – dieser Abschluss gilt für alle drei Q–U-Lernwege."
    : "Noch offen – der gewählte Q–U-Lernweg ist erst nach dieser Kontrolle vollständig.";
  moduleStatus.classList.toggle("complete", moduleState.completed);
  returnLink.textContent = moduleState.completed ? "Zum Lernweg zurückkehren" : "Ohne Abschluss zurückkehren";
}

fields.forEach((field) => {
  const control = document.getElementById(field.id);
  control.value = String(moduleState.answers[field.id] ?? "");
  const store = () => {
    moduleState.answers[field.id] = control.value;
    moduleState.completed = false;
    control.removeAttribute("aria-invalid");
    const feedback = document.getElementById(`feedback-${field.id}`);
    feedback.textContent = "";
    feedback.className = "field-feedback";
    overallFeedback.textContent = "";
    overallFeedback.className = "feedback";
    renderStatus();
    save();
  };
  control.addEventListener("input", store);
  control.addEventListener("change", store);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalid = null;
  let allValid = true;
  fields.forEach((field) => {
    const control = document.getElementById(field.id);
    const feedback = document.getElementById(`feedback-${field.id}`);
    const fieldValid = valid(field, control.value);
    allValid &&= fieldValid;
    control.setAttribute("aria-invalid", String(!fieldValid));
    feedback.textContent = fieldValid ? field.correct : field.incorrect;
    feedback.className = `field-feedback ${fieldValid ? "good" : "bad"}`;
    if (!fieldValid && !firstInvalid) firstInvalid = control;
  });

  moduleState.completed = allValid;
  save();
  renderStatus();
  overallFeedback.textContent = allValid
    ? "Abgeschlossen. Die gemeinsame Fehlerkontrolle zählt jetzt für alle drei Q–U-Lernwege."
    : "Noch nicht vollständig. Prüfe zuerst das markierte Feld.";
  overallFeedback.className = `feedback ${allValid ? "good" : "bad"}`;
  typesetMath(form);
  firstInvalid?.focus();
});

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.append(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const original = button.textContent;
    try {
      await copyText(copyPhrases.get(target.id) || target.textContent.trim());
      button.textContent = "Kopiert ✓";
      copyStatus.textContent = `${target.previousElementSibling?.textContent || "Formulierung"} wurde kopiert.`;
    } catch {
      button.textContent = "Nicht kopiert";
      copyStatus.textContent = "Das Kopieren ist fehlgeschlagen. Markiere den Text bitte von Hand.";
    }
    window.setTimeout(() => { button.textContent = original; }, 1500);
  });
});

renderStatus();
save();
typesetDocument();
