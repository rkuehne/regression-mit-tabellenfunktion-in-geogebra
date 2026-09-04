(() => {
  "use strict";

  const STORAGE_KEY = "regressionstrainer-state-v1";
  const DEFAULT_DATA = [
    { r: 8.0, f: 0.37 },
    { r: 9.3, f: 0.27 },
    { r: 10.7, f: 0.21 },
    { r: 12.4, f: 0.18 },
    { r: 15.1, f: 0.11 },
    { r: 18.6, f: 0.06 }
  ];

  const els = {
    inputRows: document.getElementById("inputRows"),
    analysisRows: document.getElementById("analysisRows"),
    modelSelect: document.getElementById("modelSelect"),
    checkModelBtn: document.getElementById("checkModelBtn"),
    modelFeedback: document.getElementById("modelFeedback"),
    regressionResult: document.getElementById("regressionResult"),
    equationText: document.getElementById("equationText"),
    regressionMeta: document.getElementById("regressionMeta"),
    chart: document.getElementById("chart"),
    analysisMessage: document.getElementById("analysisMessage"),
    inputMessage: document.getElementById("inputMessage"),
    addRowBtn: document.getElementById("addRowBtn"),
    removeRowBtn: document.getElementById("removeRowBtn"),
    resetDataBtn: document.getElementById("resetDataBtn"),
    exponentAnswer: document.getElementById("exponentAnswer"),
    errorAnswer: document.getElementById("errorAnswer"),
    checkExponentBtn: document.getElementById("checkExponentBtn"),
    checkErrorBtn: document.getElementById("checkErrorBtn"),
    exponentFeedback: document.getElementById("exponentFeedback"),
    errorFeedback: document.getElementById("errorFeedback"),
    conclusionBox: document.getElementById("conclusionBox"),
    conclusionText: document.getElementById("conclusionText"),
    exportBtn: document.getElementById("exportBtn"),
    importInput: document.getElementById("importInput"),
    saveMessage: document.getElementById("saveMessage")
  };

  let state = loadState() || {
    data: structuredClone(DEFAULT_DATA),
    modelChecked: false,
    exponentCorrect: false,
    errorCorrect: false
  };

  function structuredCloneFallback(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  if (typeof structuredClone !== "function") {
    window.structuredClone = structuredCloneFallback;
  }

  function clampData(data) {
    const cleaned = Array.isArray(data) ? data.slice(0, 30) : [];
    return cleaned.map(row => ({
      r: Number.isFinite(Number(row.r)) ? Number(row.r) : "",
      f: Number.isFinite(Number(row.f)) ? Number(row.f) : ""
    }));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return {
        data: clampData(parsed.data),
        modelChecked: Boolean(parsed.modelChecked),
        exponentCorrect: Boolean(parsed.exponentCorrect),
        errorCorrect: Boolean(parsed.errorCorrect)
      };
    } catch {
      return null;
    }
  }

  function saveState(message = "") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (message) setMessage(els.saveMessage, message, "good");
    } catch {
      if (message) setMessage(els.saveMessage, "Automatisches Speichern ist in diesem Browser nicht verfügbar.", "warn");
    }
  }

  function setMessage(el, text, type = "") {
    el.textContent = text;
    el.className = "message" + (type ? " " + type : "");
  }

  function formatNumber(value, digits = 4) {
    if (!Number.isFinite(value)) return "—";
    return new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0
    }).format(value);
  }

  function renderInputTable() {
    els.inputRows.innerHTML = "";

    state.data.forEach((row, index) => {
      const tr = document.createElement("tr");

      const tdIndex = document.createElement("td");
      tdIndex.textContent = String(index + 1);
      tr.appendChild(tdIndex);

      ["r", "f"].forEach(key => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.className = "cell-input";
        input.type = "number";
        input.step = "any";
        input.inputMode = "decimal";
        input.value = row[key];
        input.setAttribute("aria-label", `${key === "r" ? "r" : "F"} Wert Zeile ${index + 1}`);

        input.addEventListener("input", () => {
          const val = input.value.trim();
          state.data[index][key] = val === "" ? "" : Number(val);
          state.modelChecked = false;
          state.exponentCorrect = false;
          state.errorCorrect = false;
          els.modelSelect.value = "";
          clearLearningState();
          saveState();
          renderChart();
        });

        td.appendChild(input);
        tr.appendChild(td);
      });

      els.inputRows.appendChild(tr);
    });

    if (state.data.length < 2) {
      setMessage(els.inputMessage, "Für eine Regression brauchst du mindestens zwei vollständige Messwertpaare.", "warn");
    } else {
      setMessage(els.inputMessage, "Der Arbeitsstand wird nach jeder Änderung automatisch gespeichert.", "");
    }
  }

  function validPoints() {
    return state.data
      .map(row => ({ r: Number(row.r), f: Number(row.f) }))
      .filter(p => Number.isFinite(p.r) && Number.isFinite(p.f) && p.r > 0 && p.f > 0);
  }

  function powerRegression(points) {
    if (points.length < 2) return null;

    const xs = points.map(p => Math.log(p.r));
    const ys = points.map(p => Math.log(p.f));
    const n = points.length;

    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (xs[i] - meanX) * (ys[i] - meanY);
      den += (xs[i] - meanX) ** 2;
    }
    if (den === 0) return null;

    const b = num / den;
    const lnA = meanY - b * meanX;
    const a = Math.exp(lnA);

    const meanObserved = points.reduce((sum, p) => sum + p.f, 0) / n;
    let ssRes = 0;
    let ssTot = 0;
    points.forEach(p => {
      const pred = a * (p.r ** b);
      ssRes += (p.f - pred) ** 2;
      ssTot += (p.f - meanObserved) ** 2;
    });

    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
    return { a, b, r2 };
  }

  function clearLearningState() {
    els.regressionResult.hidden = true;
    els.analysisRows.innerHTML = "";
    els.analysisMessage.textContent = "Wähle zuerst die Potenzregression.";
    els.analysisMessage.className = "message muted";
    els.conclusionBox.hidden = true;
    setMessage(els.modelFeedback, "");
    setMessage(els.exponentFeedback, "");
    setMessage(els.errorFeedback, "");
  }

  function checkModel() {
    const points = validPoints();

    if (points.length < 2) {
      setMessage(els.modelFeedback, "Bitte gib zuerst mindestens zwei positive Messwertpaare ein.", "warn");
      return;
    }

    if (els.modelSelect.value === "power") {
      state.modelChecked = true;
      setMessage(
        els.modelFeedback,
        "Richtig: Eine Potenzregression ist hier sinnvoll, weil eine Beziehung der Form F(r) = a · rᵇ untersucht wird.",
        "good"
      );
      updateRegression();
      saveState();
    } else if (els.modelSelect.value === "") {
      setMessage(els.modelFeedback, "Bitte wähle zuerst ein Modell.", "warn");
    } else {
      state.modelChecked = false;
      setMessage(
        els.modelFeedback,
        "Noch nicht. Achte auf die gekrümmte Abnahme und darauf, dass ein Potenzgesetz geprüft werden soll.",
        "bad"
      );
      els.regressionResult.hidden = true;
      els.analysisRows.innerHTML = "";
      els.analysisMessage.textContent = "Wähle zuerst die Potenzregression.";
      renderChart();
      saveState();
    }
  }

  function updateRegression() {
    const points = validPoints();
    const reg = powerRegression(points);

    if (!state.modelChecked || !reg) {
      els.regressionResult.hidden = true;
      renderChart();
      return;
    }

    els.regressionResult.hidden = false;
    els.equationText.textContent =
      `F(r) ≈ ${formatNumber(reg.a, 4)} · r^(${formatNumber(reg.b, 4)})`;
    els.regressionMeta.textContent =
      `Exponent b ≈ ${formatNumber(reg.b, 4)} · Bestimmtheitsmaß R² ≈ ${formatNumber(reg.r2, 4)}`;

    renderAnalysis(reg);
    renderChart(reg);
    updateConclusion(reg);
  }

  function renderAnalysis(reg) {
    const points = validPoints();
    els.analysisRows.innerHTML = "";

    let maxAbs = -1;
    let maxRow = null;

    points.forEach(p => {
      const predicted = reg.a * (p.r ** reg.b);
      const deviation = ((p.f - predicted) / predicted) * 100;

      if (Math.abs(deviation) > maxAbs) {
        maxAbs = Math.abs(deviation);
        maxRow = { ...p, predicted, deviation };
      }

      const tr = document.createElement("tr");
      [
        formatNumber(p.r, 3),
        formatNumber(p.f, 4),
        formatNumber(predicted, 6),
        `${formatNumber(deviation, 2)} %`
      ].forEach(text => {
        const td = document.createElement("td");
        td.textContent = text;
        tr.appendChild(td);
      });
      els.analysisRows.appendChild(tr);
    });

    if (maxRow) {
      els.analysisMessage.textContent =
        `Größte betragsmäßige Abweichung: etwa ${formatNumber(maxAbs, 1)} % bei r = ${formatNumber(maxRow.r, 3)}.`;
      els.analysisMessage.className = "message";
    }
  }

  function checkExponent() {
    const value = Number(els.exponentAnswer.value);
    if (!Number.isFinite(value)) {
      setMessage(els.exponentFeedback, "Bitte gib einen Zahlenwert ein.", "warn");
      return;
    }

    if (Math.abs(value + 2) <= 0.05) {
      state.exponentCorrect = true;
      setMessage(els.exponentFeedback, "Richtig: Für 1/r² ist der Exponent −2.", "good");
    } else {
      state.exponentCorrect = false;
      setMessage(els.exponentFeedback, "Noch nicht. Schreibe 1/r² als Potenz von r.", "bad");
    }
    saveState();
    const reg = powerRegression(validPoints());
    if (reg) updateConclusion(reg);
  }

  function checkError() {
    const value = Number(els.errorAnswer.value);
    if (!Number.isFinite(value)) {
      setMessage(els.errorFeedback, "Bitte gib einen Zahlenwert ein.", "warn");
      return;
    }

    if (Math.abs(value - 16.7) <= 0.7) {
      state.errorCorrect = true;
      setMessage(els.errorFeedback, "Richtig: 0,01 / 0,06 ≈ 0,167 ≈ 16,7 %.", "good");
    } else {
      state.errorCorrect = false;
      setMessage(els.errorFeedback, "Noch nicht. Teile den absoluten Fehler 0,01 mN durch 0,06 mN und multipliziere mit 100.", "bad");
    }
    saveState();
    const reg = powerRegression(validPoints());
    if (reg) updateConclusion(reg);
  }

  function updateConclusion(reg) {
    if (!state.modelChecked || !state.exponentCorrect || !state.errorCorrect) {
      els.conclusionBox.hidden = true;
      return;
    }

    const points = validPoints();
    let maxAbsDeviation = 0;

    points.forEach(p => {
      const predicted = reg.a * (p.r ** reg.b);
      const deviation = Math.abs(((p.f - predicted) / predicted) * 100);
      maxAbsDeviation = Math.max(maxAbsDeviation, deviation);
    });

    const nearMinusTwo = Math.abs(reg.b + 2) < 0.15;
    els.conclusionBox.hidden = false;
    els.conclusionText.textContent =
      `Der Regressions-Exponent liegt bei etwa ${formatNumber(reg.b, 3)} und damit ${nearMinusTwo ? "nahe" : "nicht besonders nahe"} bei −2. ` +
      `Die größte berechnete relative Abweichung beträgt etwa ${formatNumber(maxAbsDeviation, 1)} %. ` +
      `Verglichen mit dem möglichen relativen Einzelfehler von rund 16,7 % sind die Messwerte damit ` +
      `${nearMinusTwo ? "innerhalb der Messgenauigkeit mit einem 1/r²-Gesetz vereinbar." : "nicht eindeutig durch ein 1/r²-Gesetz beschrieben."}`;
  }

  function renderChart(reg = null) {
    const svg = els.chart;
    while (svg.lastChild && !["title", "desc"].includes(svg.lastChild.tagName?.toLowerCase())) {
      svg.removeChild(svg.lastChild);
    }

    const points = validPoints();
    const NS = "http://www.w3.org/2000/svg";
    const W = 760, H = 420;
    const m = { left: 68, right: 28, top: 24, bottom: 58 };
    const pw = W - m.left - m.right;
    const ph = H - m.top - m.bottom;

    const create = (name, attrs = {}) => {
      const el = document.createElementNS(NS, name);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    };

    const appendText = (x, y, text, attrs = {}) => {
      const t = create("text", { x, y, ...attrs });
      t.textContent = text;
      svg.appendChild(t);
      return t;
    };

    if (points.length === 0) {
      appendText(W / 2, H / 2, "Noch keine gültigen Messwerte", {
        "text-anchor": "middle",
        fill: "#5f6b76",
        "font-size": "18"
      });
      return;
    }

    const rs = points.map(p => p.r);
    const fs = points.map(p => p.f);
    let minX = Math.min(...rs), maxX = Math.max(...rs);
    let minY = 0, maxY = Math.max(...fs) * 1.12;

    if (minX === maxX) { minX *= 0.9; maxX *= 1.1; }
    minX = Math.max(0, minX * 0.9);
    maxX *= 1.08;
    if (maxY <= 0) maxY = 1;

    const x = v => m.left + ((v - minX) / (maxX - minX)) * pw;
    const y = v => m.top + ph - ((v - minY) / (maxY - minY)) * ph;

    const grid = create("g", { stroke: "#e3e8ed", "stroke-width": "1" });
    svg.appendChild(grid);

    const ticks = 6;
    for (let i = 0; i <= ticks; i++) {
      const gx = m.left + (pw * i / ticks);
      const gy = m.top + (ph * i / ticks);

      grid.appendChild(create("line", { x1: gx, y1: m.top, x2: gx, y2: m.top + ph }));
      grid.appendChild(create("line", { x1: m.left, y1: gy, x2: m.left + pw, y2: gy }));

      const xv = minX + (maxX - minX) * i / ticks;
      const yv = maxY - (maxY - minY) * i / ticks;

      appendText(gx, H - 30, formatNumber(xv, 2), {
        "text-anchor": "middle",
        fill: "#5f6b76",
        "font-size": "12"
      });
      appendText(m.left - 12, gy + 4, formatNumber(yv, 2), {
        "text-anchor": "end",
        fill: "#5f6b76",
        "font-size": "12"
      });
    }

    svg.appendChild(create("line", {
      x1: m.left, y1: m.top + ph, x2: m.left + pw, y2: m.top + ph,
      stroke: "#53606c", "stroke-width": "1.5"
    }));
    svg.appendChild(create("line", {
      x1: m.left, y1: m.top, x2: m.left, y2: m.top + ph,
      stroke: "#53606c", "stroke-width": "1.5"
    }));

    appendText(m.left + pw / 2, H - 8, "r", {
      "text-anchor": "middle",
      fill: "#17202a",
      "font-size": "15",
      "font-weight": "700"
    });

    const yLabel = appendText(18, m.top + ph / 2, "F (mN)", {
      "text-anchor": "middle",
      fill: "#17202a",
      "font-size": "15",
      "font-weight": "700",
      transform: `rotate(-90 18 ${m.top + ph / 2})`
    });

    if (state.modelChecked && reg) {
      let d = "";
      const samples = 160;
      for (let i = 0; i <= samples; i++) {
        const rv = minX + (maxX - minX) * i / samples;
        if (rv <= 0) continue;
        const fv = reg.a * (rv ** reg.b);
        const cmd = d === "" ? "M" : "L";
        d += `${cmd}${x(rv).toFixed(2)},${y(fv).toFixed(2)} `;
      }
      svg.appendChild(create("path", {
        d,
        fill: "none",
        stroke: "#315f9d",
        "stroke-width": "3"
      }));
    }

    points.forEach((p, idx) => {
      const circle = create("circle", {
        cx: x(p.r),
        cy: y(p.f),
        r: "6",
        fill: "#17202a",
        stroke: "#ffffff",
        "stroke-width": "2"
      });
      const title = create("title");
      title.textContent = `Messpunkt ${idx + 1}: r=${formatNumber(p.r, 3)}, F=${formatNumber(p.f, 4)} mN`;
      circle.appendChild(title);
      svg.appendChild(circle);
    });
  }

  function exportState() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      data: state.data,
      modelChecked: state.modelChecked,
      exponentCorrect: state.exponentCorrect,
      errorCorrect: state.errorCorrect
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "regressionstrainer-arbeitsstand.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMessage(els.saveMessage, "Arbeitsstand wurde als JSON-Datei exportiert.", "good");
  }

  async function importState(file) {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const data = clampData(parsed.data);
      if (data.length < 2) throw new Error("Zu wenige Daten");
      state = {
        data,
        modelChecked: Boolean(parsed.modelChecked),
        exponentCorrect: Boolean(parsed.exponentCorrect),
        errorCorrect: Boolean(parsed.errorCorrect)
      };
      saveState();
      renderAll();
      setMessage(els.saveMessage, "Arbeitsstand wurde geladen.", "good");
    } catch {
      setMessage(els.saveMessage, "Die Datei konnte nicht als gültiger Arbeitsstand geladen werden.", "bad");
    } finally {
      els.importInput.value = "";
    }
  }

  function renderAll() {
    renderInputTable();
    renderChart();

    if (state.modelChecked) {
      els.modelSelect.value = "power";
      updateRegression();
      setMessage(els.modelFeedback, "Potenzregression ist ausgewählt.", "good");
    } else {
      els.modelSelect.value = "";
      clearLearningState();
      renderChart();
    }

    if (state.exponentCorrect) {
      els.exponentAnswer.value = "-2";
      setMessage(els.exponentFeedback, "Richtig: Für 1/r² ist der Exponent −2.", "good");
    }
    if (state.errorCorrect) {
      els.errorAnswer.value = "16.7";
      setMessage(els.errorFeedback, "Richtig: 0,01 / 0,06 ≈ 0,167 ≈ 16,7 %.", "good");
    }

    const reg = powerRegression(validPoints());
    if (reg) updateConclusion(reg);
  }

  els.checkModelBtn.addEventListener("click", checkModel);
  els.checkExponentBtn.addEventListener("click", checkExponent);
  els.checkErrorBtn.addEventListener("click", checkError);

  els.addRowBtn.addEventListener("click", () => {
    if (state.data.length >= 30) {
      setMessage(els.inputMessage, "Maximal 30 Zeilen sind vorgesehen.", "warn");
      return;
    }
    state.data.push({ r: "", f: "" });
    state.modelChecked = false;
    clearLearningState();
    renderInputTable();
    renderChart();
    saveState();
  });

  els.removeRowBtn.addEventListener("click", () => {
    if (state.data.length <= 2) {
      setMessage(els.inputMessage, "Mindestens zwei Zeilen müssen erhalten bleiben.", "warn");
      return;
    }
    state.data.pop();
    state.modelChecked = false;
    clearLearningState();
    renderInputTable();
    renderChart();
    saveState();
  });

  els.resetDataBtn.addEventListener("click", () => {
    state = {
      data: structuredClone(DEFAULT_DATA),
      modelChecked: false,
      exponentCorrect: false,
      errorCorrect: false
    };
    els.exponentAnswer.value = "";
    els.errorAnswer.value = "";
    saveState();
    renderAll();
    setMessage(els.inputMessage, "Die Beispieldaten wurden wiederhergestellt.", "good");
  });

  els.exportBtn.addEventListener("click", exportState);
  els.importInput.addEventListener("change", () => importState(els.importInput.files?.[0]));

  renderAll();
})();
