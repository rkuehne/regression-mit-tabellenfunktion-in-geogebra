import { COURSE_IDS, COURSES, UQ_SHARED_REQUIREMENT_ID } from "./lesson-data.js";
import { cloneExampleData, cloneUqExampleData } from "./regression.js";

export const STORAGE_KEY = "geogebra-begleitkurs-state-v4";
export const V3_STORAGE_KEY = "geogebra-begleitkurs-state-v3";
export const V2_STORAGE_KEY = "geogebra-begleitkurs-state-v2";
export const LEGACY_STORAGE_KEY = "regressionstrainer-state-v1";

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
    version: 4,
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
  const { r2: unusedLegacyValue, ...resultWithoutLegacyMetric } = result;
  return resultWithoutLegacyMetric;
}

export function sanitizeTransferData(data) {
  return sanitizeRows(data, "inverse-square");
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

export function migratePreviousState(candidate) {
  const state = createDefaultState();
  const oldTransfer = candidate?.transfer ?? candidate ?? {};
  state.transfer.methods["inverse-square"] = {
    data: sanitizeRows(oldTransfer.data ?? candidate?.data, "inverse-square"),
    uncertainty: String(oldTransfer.uncertainty ?? ""),
    deltaU: "",
    deltaQ: "",
    reflection: String(oldTransfer.reflection ?? ""),
    result: sanitizeStoredResult(oldTransfer.result)
  };
  state.student = preservedStudent(candidate);

  if (candidate?.version === 3) {
    state.lessonMode = candidate.lessonMode === "compact" ? "compact" : "explain";
    state.courses["inverse-square"] = sanitizeProgress(candidate, "inverse-square");
  }
  return state;
}

export function sanitizeState(candidate) {
  const base = createDefaultState();
  if (!candidate || candidate.version !== 4) return base;
  const activeCourseId = COURSE_IDS.includes(candidate.activeCourseId) ? candidate.activeCourseId : "inverse-square";
  const activeMethod = COURSE_IDS.includes(candidate?.transfer?.activeMethod) ? candidate.transfer.activeMethod : activeCourseId;

  return {
    version: 4,
    activeCourseId,
    lessonMode: candidate.lessonMode === "compact" ? "compact" : "explain",
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, sanitizeProgress(candidate?.courses?.[id], id)])),
    sharedModules: {
      [UQ_SHARED_REQUIREMENT_ID]: sanitizeSharedModule(candidate?.sharedModules?.[UQ_SHARED_REQUIREMENT_ID])
    },
    transfer: {
      activeMethod,
      methods: Object.fromEntries(COURSE_IDS.map((id) => [id, sanitizeTransferMethod(candidate?.transfer?.methods?.[id], id)]))
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

  for (const [key, version] of [[V3_STORAGE_KEY, 3], [V2_STORAGE_KEY, 2]]) {
    try {
      const previous = JSON.parse(storage.getItem(key) || "null");
      if (previous?.version === version) return migratePreviousState(previous);
    } catch {
      // Ignore unreadable previous data.
    }
  }

  try {
    const legacy = JSON.parse(storage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(legacy?.data)) return migratePreviousState(legacy);
  } catch {
    // Ignore unreadable legacy data.
  }
  return createDefaultState();
}

export function persistState(storage, state) {
  state.updatedAt = new Date().toISOString();
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
