import { LESSON_STEPS } from "./lesson-data.js";
import { cloneExampleData } from "./regression.js";

export const STORAGE_KEY = "geogebra-begleitkurs-state-v3";
export const V2_STORAGE_KEY = "geogebra-begleitkurs-state-v2";
export const LEGACY_STORAGE_KEY = "regressionstrainer-state-v1";

export function createDefaultState(transferData = cloneExampleData()) {
  return {
    version: 3,
    lessonMode: "explain",
    currentStep: 0,
    completedSteps: [],
    answers: {},
    transfer: { data: transferData, uncertainty: "", reflection: "", result: null },
    student: { name: "", course: "" },
    updatedAt: new Date().toISOString()
  };
}

export function sanitizeTransferData(data) {
  if (!Array.isArray(data) || data.length < 3 || data.length > 30) return cloneExampleData();
  return data.map((row) => ({
    r: typeof row?.r === "number" || typeof row?.r === "string" ? row.r : "",
    f: typeof row?.f === "number" || typeof row?.f === "string" ? row.f : ""
  }));
}

function preservedTransfer(candidate) {
  return {
    data: sanitizeTransferData(candidate?.transfer?.data ?? candidate?.data),
    uncertainty: String(candidate?.transfer?.uncertainty ?? ""),
    reflection: String(candidate?.transfer?.reflection ?? ""),
    result: candidate?.transfer?.result && typeof candidate.transfer.result === "object"
      ? candidate.transfer.result
      : null
  };
}

function preservedStudent(candidate) {
  return {
    name: String(candidate?.student?.name ?? ""),
    course: String(candidate?.student?.course ?? "")
  };
}

export function migratePreviousState(candidate) {
  const state = createDefaultState(sanitizeTransferData(candidate?.transfer?.data ?? candidate?.data));
  state.transfer = preservedTransfer(candidate);
  state.student = preservedStudent(candidate);
  return state;
}

export function sanitizeState(candidate) {
  const base = createDefaultState();
  if (!candidate || candidate.version !== 3) return base;

  const validIds = new Set(LESSON_STEPS.map(({ id }) => id));
  const currentStep = Number.isInteger(candidate.currentStep)
    ? Math.max(0, Math.min(LESSON_STEPS.length - 1, candidate.currentStep))
    : 0;
  const completedSteps = Array.isArray(candidate.completedSteps)
    ? [...new Set(candidate.completedSteps.filter((id) => validIds.has(id)))]
    : [];

  return {
    version: 3,
    lessonMode: candidate.lessonMode === "compact" ? "compact" : "explain",
    currentStep,
    completedSteps,
    answers: candidate.answers && typeof candidate.answers === "object" ? candidate.answers : {},
    transfer: preservedTransfer(candidate),
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

  try {
    const versionTwo = JSON.parse(storage.getItem(V2_STORAGE_KEY) || "null");
    if (versionTwo?.version === 2) return migratePreviousState(versionTwo);
  } catch {
    // Ignore unreadable v2 data.
  }

  try {
    const legacy = JSON.parse(storage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(legacy?.data) && legacy.data.length >= 3 && legacy.data.length <= 30) {
      return migratePreviousState(legacy);
    }
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
