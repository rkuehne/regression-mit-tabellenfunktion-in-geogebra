export const NAV_ITEMS = Object.freeze([
  { id: "learn", label: "Regression lernen", href: "./index.html" },
  { id: "practice", label: "Selbstständig auswerten", href: "./selbst-auswerten.html" },
  { id: "documentation", label: "Für die Klausur dokumentieren", href: "./dokumentation.html" }
]);

export function taskForCourse(courseId) {
  switch (courseId) {
    case "proportional-linear":
    case "proportional-constants":
      return "linear-7";
    case "inverse-square":
    case "proportional-power":
      return "power-7";
    case "capacitor-exponential":
      return "exponential-7";
    default:
      return "linear-7";
  }
}

export function courseForTask(taskId) {
  switch (taskId) {
    case "linear-7":
      return "proportional-linear";
    case "power-7":
      return "proportional-power";
    case "exponential-7":
      return "capacitor-exponential";
    default:
      return "proportional-linear";
  }
}

export function buildNavUrl(page, { courseId, stepId, taskId, sectionId } = {}) {
  const params = new URLSearchParams();
  if (page === "learn") {
    if (courseId) params.set("course", courseId);
    if (stepId) params.set("step", stepId);
    const qs = params.toString();
    return `./index.html${qs ? `?${qs}` : ""}#course`;
  }
  if (page === "practice") {
    const task = taskId || (courseId ? taskForCourse(courseId) : "linear-7");
    params.set("task", task);
    return `./selbst-auswerten.html?${params.toString()}`;
  }
  if (page === "documentation") {
    if (courseId) params.set("course", courseId);
    if (sectionId) params.set("section", sectionId);
    if (stepId) params.set("step", stepId);
    const qs = params.toString();
    return `./dokumentation.html${qs ? `?${qs}` : ""}`;
  }
  if (page === "method") {
    if (courseId) params.set("course", courseId);
    if (stepId) params.set("step", stepId);
    const qs = params.toString();
    return `./groesster-einzelfehler.html${qs ? `?${qs}` : ""}`;
  }
  return "./index.html";
}

export function renderSiteNavigation(activePage, options = {}) {
  const navContainer = document.querySelector(".site-nav");
  if (!navContainer) return;

  const { courseId, stepId, taskId } = options;

  const brandLink = navContainer.querySelector(".nav-brand");
  if (brandLink) {
    brandLink.innerHTML = `<span class="brand-mark" aria-hidden="true">∑</span> GeoGebra-Trainer`;
    brandLink.href = "./index.html";
  }

  const learnLink = navContainer.querySelector('[data-nav="learn"]');
  if (learnLink) {
    learnLink.textContent = "Regression lernen";
    learnLink.href = buildNavUrl("learn", { courseId, stepId });
    if (activePage === "learn") {
      learnLink.setAttribute("aria-current", "page");
    } else {
      learnLink.removeAttribute("aria-current");
    }
  }

  const practiceLink = navContainer.querySelector('[data-nav="practice"]');
  if (practiceLink) {
    practiceLink.textContent = "Selbstständig auswerten";
    practiceLink.href = buildNavUrl("practice", { courseId, taskId });
    if (activePage === "practice") {
      practiceLink.setAttribute("aria-current", "page");
    } else {
      practiceLink.removeAttribute("aria-current");
    }
  }

  const docLink = navContainer.querySelector('[data-nav="documentation"]');
  if (docLink) {
    docLink.textContent = "Für die Klausur dokumentieren";
    docLink.href = buildNavUrl("documentation", { courseId, stepId });
    if (activePage === "documentation") {
      docLink.setAttribute("aria-current", "page");
    } else {
      docLink.removeAttribute("aria-current");
    }
  }
}
