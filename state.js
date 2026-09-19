import { COURSE_IDS, COURSES, UQ_SHARED_REQUIREMENT_ID } from "./lesson-data.js";

export const STORAGE_KEY = "geogebra-begleitkurs-state";

function blankProgress() {
  return { currentStep: 0, completedSteps: [], answers: {} };
}

function defaultSharedModules() {
  return {
    [UQ_SHARED_REQUIREMENT_ID]: { completed: false, answers: {} }
  };
}

export function createDefaultState() {
  return {
    activeCourseId: "inverse-square",
    lessonMode: "explain",
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, blankProgress()])),
    sharedModules: defaultSharedModules(),
    student: { name: "", course: "" },
    updatedAt: new Date().toISOString()
  };
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

  return {
    activeCourseId,
    lessonMode: candidate.lessonMode === "compact" ? "compact" : "explain",
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, sanitizeProgress(candidate?.courses?.[id], id)])),
    sharedModules: {
      [UQ_SHARED_REQUIREMENT_ID]: sanitizeSharedModule(candidate?.sharedModules?.[UQ_SHARED_REQUIREMENT_ID])
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
