import { COURSE_IDS, COURSES, TRANSFER_METHOD_IDS, UQ_SHARED_REQUIREMENT_ID } from "./lesson-data.js";
import { cloneExampleData, cloneUqExampleData } from "./regression.js";

export const STORAGE_KEY = "geogebra-begleitkurs-state";

function blankProgress() {
  return { currentStep: 0, completedSteps: [], answers: {} };
}

function defaultSharedModules() {
  return {
    [UQ_SHARED_REQUIREMENT_ID]: { completed: false, answers: {} }
  };
}

function defaultTransferMethods() {
  return {
    "inverse-square": { data: cloneExampleData(), uncertainty: "", deltaU: "", deltaQ: "", reflection: "", result: null },
    "proportional-power": { data: cloneUqExampleData(), uncertainty: "", deltaU: "5", deltaQ: "0,1", reflection: "", result: null },
    "proportional-constants": { data: cloneUqExampleData(), uncertainty: "", deltaU: "5", deltaQ: "0,1", reflection: "", result: null },
    "proportional-linear": { data: cloneUqExampleData(), uncertainty: "", deltaU: "5", deltaQ: "0,1", reflection: "", result: null }
  };
}

export function createDefaultState() {
  return {
    activeCourseId: "inverse-square",
    lessonMode: "explain",
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, blankProgress()])),
    sharedModules: defaultSharedModules(),
    transfer: { activeMethod: "inverse-square", methods: defaultTransferMethods() },
    student: { name: "", course: "" },
    updatedAt: new Date().toISOString()
  };
}

function sanitizeRows(data, methodId) {
  const fallback = methodId === "inverse-square" ? cloneExampleData() : cloneUqExampleData();
  if (!Array.isArray(data) || data.length < 3 || data.length > 30) return fallback;
  const keys = methodId === "inverse-square" ? ["r", "f"] : ["u", "q"];
  return data.map((row) => Object.fromEntries(keys.map((key) => [
    key,
    typeof row?.[key] === "number" || typeof row?.[key] === "string" ? row[key] : ""
  ])));
}

function sanitizeStoredResult(result) {
  if (!result || typeof result !== "object" || Array.isArray(result)) return null;
  return { ...result };
}

function sanitizeProgress(candidate, courseId) {
  const steps = COURSES[courseId].steps;
  const validIds = new Set(steps.map(({ id }) => id));
  const currentStep = Number.isInteger(candidate?.currentStep)
    ? Math.max(0, Math.min(steps.length - 1, candidate.currentStep))
    : 0;
  const completedSteps = Array.isArray(candidate?.completedSteps)
    ? [...new Set(candidate.completedSteps.filter((id) => validIds.has(id)))]
    : [];
  const answers = candidate?.answers && typeof candidate.answers === "object" ? candidate.answers : {};
  return { currentStep, completedSteps, answers };
}

function sanitizeTransferMethod(candidate, methodId) {
  const defaults = defaultTransferMethods()[methodId];
  return {
    data: sanitizeRows(candidate?.data, methodId),
    uncertainty: String(candidate?.uncertainty ?? defaults.uncertainty),
    deltaU: String(candidate?.deltaU ?? defaults.deltaU),
    deltaQ: String(candidate?.deltaQ ?? defaults.deltaQ),
    reflection: String(candidate?.reflection ?? ""),
    result: sanitizeStoredResult(candidate?.result)
  };
}

function preservedStudent(candidate) {
  return {
    name: String(candidate?.student?.name ?? ""),
    course: String(candidate?.student?.course ?? "")
  };
}

function sanitizeSharedModule(candidate) {
  const answers = candidate?.answers && typeof candidate.answers === "object" && !Array.isArray(candidate.answers)
    ? candidate.answers
    : {};
  return { completed: candidate?.completed === true, answers };
}

export function sanitizeState(candidate) {
  const base = createDefaultState();
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return base;
  const activeCourseId = COURSE_IDS.includes(candidate.activeCourseId) ? candidate.activeCourseId : "inverse-square";
  const preferredMethod = COURSES[activeCourseId].transferMethod;
  const activeMethod = TRANSFER_METHOD_IDS.includes(candidate?.transfer?.activeMethod)
    ? candidate.transfer.activeMethod
    : preferredMethod || "inverse-square";

  return {
    activeCourseId,
    lessonMode: candidate.lessonMode === "compact" ? "compact" : "explain",
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, sanitizeProgress(candidate?.courses?.[id], id)])),
    sharedModules: {
      [UQ_SHARED_REQUIREMENT_ID]: sanitizeSharedModule(candidate?.sharedModules?.[UQ_SHARED_REQUIREMENT_ID])
    },
    transfer: {
      activeMethod,
      methods: Object.fromEntries(TRANSFER_METHOD_IDS.map((id) => [id, sanitizeTransferMethod(candidate?.transfer?.methods?.[id], id)]))
    },
    student: preservedStudent(candidate),
    updatedAt: String(candidate.updatedAt ?? base.updatedAt)
  };
}

export function loadState(storage) {
  try {
    const saved = storage.getItem(STORAGE_KEY);
    if (saved) return sanitizeState(JSON.parse(saved));
  } catch {
    // Storage may be unavailable or damaged.
  }
  return createDefaultState();
}

export function persistState(storage, state) {
  state.updatedAt = new Date().toISOString();
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(sanitizeState(state)));
    return true;
  } catch {
    return false;
  }
}
