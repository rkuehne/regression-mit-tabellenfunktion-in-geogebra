import { COURSE_IDS, COURSES, UQ_SHARED_REQUIREMENT_ID } from "./lesson-data.js";

export const STORAGE_KEY = "geogebra-begleitkurs-state";
export const SCHEMA_VERSION = 2;

export const PRACTICE_TASK_IDS = Object.freeze(["linear-7", "power-7", "exponential-7"]);

export const OLD_COURSE_STEP_IDS = Object.freeze({
  "inverse-square": [
    "context", "setup", "table", "first-point", "fill-points",
    "regression-concept", "regression", "predictions", "deviations", "conclusion"
  ],
  "proportional-power": [
    "uq-power-context", "uq-power-table", "uq-power-points",
    "uq-power-concept", "uq-power-fit", "uq-power-model",
    "uq-power-deviation", "uq-power-conclusion"
  ],
  "proportional-constants": [
    "uq-constant-context", "uq-constant-table", "uq-constant-ratios",
    "uq-constant-mean", "uq-constant-reference", "uq-constant-deviation",
    "uq-constant-uncertainty", "uq-constant-conclusion"
  ],
  "proportional-linear": [
    "uq-linear-context", "uq-linear-table", "uq-linear-points",
    "uq-linear-concept", "uq-linear-fit", "uq-linear-model",
    "uq-linear-deviation", "uq-linear-conclusion"
  ],
  "capacitor-exponential": [
    "charging-context", "charging-table", "charging-delta", "charging-points",
    "charging-model", "charging-regression", "charging-time", "charging-predictions",
    "charging-deviations", "charging-data-check", "charging-conclusion"
  ]
});

export const CURRENT_STEP_IDS = Object.freeze({
  "inverse-square": [
    "context", "setup", "table", "first-point", "fill-points",
    "regression-concept", "regression", "inverse-parameters", "predictions", "deviations", "conclusion"
  ],
  "proportional-power": [
    "uq-power-context", "uq-power-table", "uq-power-points",
    "uq-power-concept", "uq-power-fit", "uq-power-parameters", "uq-power-model",
    "uq-power-deviation", "uq-power-conclusion"
  ],
  "proportional-constants": [
    "uq-constant-context", "uq-constant-table", "uq-constant-ratios",
    "uq-constant-mean", "uq-constant-parameters", "uq-constant-deviation",
    "uq-constant-uncertainty", "uq-constant-conclusion"
  ],
  "proportional-linear": [
    "uq-linear-context", "uq-linear-table", "uq-linear-points",
    "uq-linear-concept", "uq-linear-fit", "uq-linear-parameters", "uq-linear-model",
    "uq-linear-deviation", "uq-linear-conclusion"
  ],
  "capacitor-exponential": [
    "charging-context", "charging-table", "charging-delta", "charging-points",
    "charging-model", "charging-regression", "charging-time", "charging-predictions",
    "charging-deviations", "charging-conclusion"
  ]
});

export function getValidStepIds(courseId) {
  if (COURSES[courseId]?.steps && COURSES[courseId].steps.some((s) => s.id.includes("parameters"))) {
    return COURSES[courseId].steps.map((s) => s.id);
  }
  return CURRENT_STEP_IDS[courseId] || (COURSES[courseId]?.steps?.map((s) => s.id) ?? []);
}

function blankProgress() {
  return { currentStep: 0, completedSteps: [], answers: {} };
}

function defaultSharedModules() {
  return {
    [UQ_SHARED_REQUIREMENT_ID]: { completed: false, answers: {} }
  };
}

function blankDocumentationProgress() {
  return {
    selectedExampleId: "capacitor-exponential",
    view: "model",
    selfChecks: Object.fromEntries(COURSE_IDS.map((id) => [id, {}]))
  };
}

function blankPracticeTask() {
  return {
    answers: {},
    completedChecks: [],
    selfChecks: {}
  };
}

export function defaultPracticeState() {
  return {
    selectedTaskId: "linear-7",
    tasks: Object.fromEntries(PRACTICE_TASK_IDS.map((id) => [id, blankPracticeTask()]))
  };
}

export function createDefaultState() {
  return {
    schemaVersion: 2,
    activeCourseId: "inverse-square",
    lessonMode: "compact",
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, blankProgress()])),
    practice: defaultPracticeState(),
    sharedModules: defaultSharedModules(),
    documentation: blankDocumentationProgress(),
    student: { name: "", course: "" },
    updatedAt: new Date().toISOString()
  };
}

function sanitizeProgress(candidate, courseId) {
  const validIds = new Set(getValidStepIds(courseId));
  const maxStep = Math.max(0, validIds.size - 1);
  const currentStep = Number.isInteger(candidate?.currentStep)
    ? Math.max(0, Math.min(maxStep, candidate.currentStep))
    : 0;
  const completedSteps = Array.isArray(candidate?.completedSteps)
    ? [...new Set(candidate.completedSteps.filter((id) => validIds.has(id)))]
    : [];
  const answers = candidate?.answers && typeof candidate.answers === "object" && !Array.isArray(candidate.answers)
    ? candidate.answers
    : {};
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

function sanitizeDocumentation(candidate) {
  const base = blankDocumentationProgress();
  const selectedExampleId = COURSE_IDS.includes(candidate?.selectedExampleId)
    ? candidate.selectedExampleId
    : base.selectedExampleId;
  const view = candidate?.view === "practice" ? "practice" : "model";
  const selfChecks = Object.fromEntries(COURSE_IDS.map((id) => {
    const checks = candidate?.selfChecks?.[id];
    const allowed = new Set(["data", "geogebra", "physical", "deviations", "conclusion"]);
    const sanitized = checks && typeof checks === "object" && !Array.isArray(checks)
      ? Object.fromEntries(Object.entries(checks).filter(([key, value]) => allowed.has(key) && value === true))
      : {};
    return [id, sanitized];
  }));
  return { selectedExampleId, view, selfChecks };
}

function sanitizePracticeTask(candidate) {
  const answers = candidate?.answers && typeof candidate.answers === "object" && !Array.isArray(candidate.answers)
    ? { ...candidate.answers }
    : {};
  const completedChecks = Array.isArray(candidate?.completedChecks)
    ? [...new Set(candidate.completedChecks.filter((c) => typeof c === "string"))]
    : [];
  const selfChecks = candidate?.selfChecks && typeof candidate.selfChecks === "object" && !Array.isArray(candidate.selfChecks)
    ? Object.fromEntries(Object.entries(candidate.selfChecks).filter(([_, val]) => val === true))
    : {};
  return { answers, completedChecks, selfChecks };
}

function sanitizePractice(candidate) {
  const base = defaultPracticeState();
  const selectedTaskId = PRACTICE_TASK_IDS.includes(candidate?.selectedTaskId)
    ? candidate.selectedTaskId
    : base.selectedTaskId;
  const tasks = Object.fromEntries(
    PRACTICE_TASK_IDS.map((id) => [id, sanitizePracticeTask(candidate?.tasks?.[id])])
  );
  return { selectedTaskId, tasks };
}

export function migrateState(candidate) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return createDefaultState();
  }
  if (candidate.schemaVersion === 2) {
    return sanitizeState(candidate);
  }

  const base = createDefaultState();
  const activeCourseId = COURSE_IDS.includes(candidate.activeCourseId) ? candidate.activeCourseId : base.activeCourseId;
  const lessonMode = candidate.lessonMode === "explain" ? "explain" : "compact";
  const student = preservedStudent(candidate);
  const documentation = sanitizeDocumentation(candidate.documentation);
  const sharedModules = {
    [UQ_SHARED_REQUIREMENT_ID]: sanitizeSharedModule(candidate?.sharedModules?.[UQ_SHARED_REQUIREMENT_ID])
  };
  const practice = defaultPracticeState();

  let legacyChargingProgress = null;
  let migrationNotice = null;

  const migratedCourses = {};
  for (const courseId of COURSE_IDS) {
    const oldProgress = candidate?.courses?.[courseId];
    const oldSteps = OLD_COURSE_STEP_IDS[courseId] || [];
    const validSteps = getValidStepIds(courseId);

    if (!oldProgress || typeof oldProgress !== "object") {
      migratedCourses[courseId] = blankProgress();
      continue;
    }

    const oldIndex = Number.isInteger(oldProgress.currentStep) ? oldProgress.currentStep : 0;
    const oldStepId = oldSteps[oldIndex] || oldSteps[0];
    let targetStepId = oldStepId;
    if (courseId === "proportional-constants" && oldStepId === "uq-constant-reference") {
      targetStepId = "uq-constant-mean";
    } else if (courseId === "capacitor-exponential" && oldStepId === "charging-data-check") {
      targetStepId = "charging-conclusion";
    }
    const mappedIndex = validSteps.indexOf(targetStepId);
    const currentStep = mappedIndex >= 0 ? mappedIndex : 0;

    const oldCompleted = Array.isArray(oldProgress.completedSteps) ? [...oldProgress.completedSteps] : [];
    const oldAnswers = oldProgress.answers && typeof oldProgress.answers === "object"
      ? JSON.parse(JSON.stringify(oldProgress.answers))
      : {};

    let completedSteps = [];
    let answers = {};

    if (courseId === "inverse-square") {
      answers = { ...oldAnswers };
      completedSteps = oldCompleted.filter((id) => validSteps.includes(id));
      if (answers.regression && answers.regression.interpretation !== undefined) {
        answers["inverse-parameters"] = { interpretation: answers.regression.interpretation };
        const { interpretation, ...rest } = answers.regression;
        answers.regression = rest;
        if (oldCompleted.includes("regression") && !completedSteps.includes("inverse-parameters")) {
          completedSteps.push("inverse-parameters");
        }
      }
    } else if (courseId === "proportional-power") {
      answers = { ...oldAnswers };
      completedSteps = oldCompleted.filter((id) => validSteps.includes(id));
      if (answers["uq-power-fit"] && answers["uq-power-fit"].meaning !== undefined) {
        answers["uq-power-parameters"] = { meaning: answers["uq-power-fit"].meaning };
        const { meaning, ...rest } = answers["uq-power-fit"];
        answers["uq-power-fit"] = rest;
        if (oldCompleted.includes("uq-power-fit") && !completedSteps.includes("uq-power-parameters")) {
          completedSteps.push("uq-power-parameters");
        }
      }
    } else if (courseId === "proportional-linear") {
      answers = { ...oldAnswers };
      completedSteps = oldCompleted.filter((id) => validSteps.includes(id));
      if (answers["uq-linear-fit"]) {
        const transferred = {};
        if (answers["uq-linear-fit"].capacity !== undefined) transferred.capacity = answers["uq-linear-fit"].capacity;
        if (answers["uq-linear-fit"].degree !== undefined) transferred.degree = answers["uq-linear-fit"].degree;
        if (Object.keys(transferred).length > 0) {
          answers["uq-linear-parameters"] = transferred;
          const { capacity, degree, ...rest } = answers["uq-linear-fit"];
          answers["uq-linear-fit"] = rest;
          if (oldCompleted.includes("uq-linear-fit") && !completedSteps.includes("uq-linear-parameters")) {
            completedSteps.push("uq-linear-parameters");
          }
        }
      }
    } else if (courseId === "proportional-constants") {
      answers = { ...oldAnswers };
      delete answers["uq-constant-reference"];
      completedSteps = oldCompleted.filter((id) => id !== "uq-constant-reference" && validSteps.includes(id));
      if (answers["uq-constant-mean"] && answers["uq-constant-mean"].pf !== undefined) {
        answers["uq-constant-parameters"] = { pf: answers["uq-constant-mean"].pf };
        const { pf, ...rest } = answers["uq-constant-mean"];
        answers["uq-constant-mean"] = rest;
        if (oldCompleted.includes("uq-constant-mean") && !completedSteps.includes("uq-constant-parameters")) {
          completedSteps.push("uq-constant-parameters");
        }
      }
    } else if (courseId === "capacitor-exponential") {
      const hasOldProgress = (oldProgress.currentStep && oldProgress.currentStep > 0) ||
        oldCompleted.length > 0 ||
        Object.keys(oldAnswers).length > 0;
      if (hasOldProgress) {
        legacyChargingProgress = {
          currentStep: Number.isInteger(oldProgress.currentStep) ? oldProgress.currentStep : 0,
          completedSteps: [...oldCompleted],
          answers: JSON.parse(JSON.stringify(oldAnswers))
        };
        migrationNotice = "Das Beispiel wurde auf neun Messpaare vereinheitlicht. Die betroffenen Kontrollen kannst du erneut bearbeiten.";
      }
      const allowedSteps = new Set(["charging-context", "charging-table", "charging-delta"]);
      answers = {};
      for (const stepId of allowedSteps) {
        if (oldAnswers[stepId]) {
          answers[stepId] = oldAnswers[stepId];
        }
      }
      completedSteps = oldCompleted.filter((id) => allowedSteps.has(id));
    }

    migratedCourses[courseId] = {
      currentStep,
      completedSteps: [...new Set(completedSteps)],
      answers
    };
  }

  const result = {
    schemaVersion: 2,
    activeCourseId,
    lessonMode,
    courses: migratedCourses,
    practice,
    sharedModules,
    documentation,
    student,
    updatedAt: String(candidate.updatedAt ?? new Date().toISOString())
  };

  if (legacyChargingProgress) {
    result.legacyChargingProgress = legacyChargingProgress;
  }
  if (migrationNotice) {
    result.migrationNotice = migrationNotice;
  }

  return result;
}

export function sanitizeState(candidate) {
  const base = createDefaultState();
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return base;

  if (!candidate.schemaVersion || candidate.schemaVersion < 2) {
    return migrateState(candidate);
  }

  const activeCourseId = COURSE_IDS.includes(candidate.activeCourseId) ? candidate.activeCourseId : base.activeCourseId;
  const lessonMode = candidate.lessonMode === "explain" ? "explain" : "compact";

  const result = {
    schemaVersion: 2,
    activeCourseId,
    lessonMode,
    courses: Object.fromEntries(COURSE_IDS.map((id) => [id, sanitizeProgress(candidate?.courses?.[id], id)])),
    practice: sanitizePractice(candidate.practice),
    sharedModules: {
      [UQ_SHARED_REQUIREMENT_ID]: sanitizeSharedModule(candidate?.sharedModules?.[UQ_SHARED_REQUIREMENT_ID])
    },
    documentation: sanitizeDocumentation(candidate.documentation),
    student: preservedStudent(candidate),
    updatedAt: String(candidate.updatedAt ?? base.updatedAt)
  };

  if (candidate.legacyChargingProgress && typeof candidate.legacyChargingProgress === "object" && !Array.isArray(candidate.legacyChargingProgress)) {
    result.legacyChargingProgress = {
      currentStep: Number.isInteger(candidate.legacyChargingProgress.currentStep) ? candidate.legacyChargingProgress.currentStep : 0,
      completedSteps: Array.isArray(candidate.legacyChargingProgress.completedSteps) ? [...candidate.legacyChargingProgress.completedSteps] : [],
      answers: candidate.legacyChargingProgress.answers && typeof candidate.legacyChargingProgress.answers === "object"
        ? { ...candidate.legacyChargingProgress.answers }
        : {}
    };
  }

  if (typeof candidate.migrationNotice === "string" && candidate.migrationNotice) {
    result.migrationNotice = candidate.migrationNotice;
  }

  return result;
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
