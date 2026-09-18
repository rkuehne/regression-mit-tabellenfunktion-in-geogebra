export const EXAMPLE_DATA = Object.freeze([
  Object.freeze({ r: 8, f: 0.37 }),
  Object.freeze({ r: 9.3, f: 0.27 }),
  Object.freeze({ r: 10.7, f: 0.21 }),
  Object.freeze({ r: 12.4, f: 0.18 }),
  Object.freeze({ r: 15.1, f: 0.11 }),
  Object.freeze({ r: 18.6, f: 0.06 })
]);

export const UQ_EXAMPLE_DATA = Object.freeze([
  Object.freeze({ u: 50, q: 2 }),
  Object.freeze({ u: 100, q: 4.3 }),
  Object.freeze({ u: 150, q: 6.4 }),
  Object.freeze({ u: 200, q: 8.3 }),
  Object.freeze({ u: 250, q: 10.2 })
]);

export const CHARGING_RAW_DATA = Object.freeze([
  Object.freeze({ t: 0, uc: 0, deltaU: 3.78 }),
  Object.freeze({ t: 10, uc: 1.061, deltaU: 2.719 }),
  Object.freeze({ t: 20, uc: 1.796, deltaU: 1.984 }),
  Object.freeze({ t: 30, uc: 2.301, deltaU: 1.479 }),
  Object.freeze({ t: 40, uc: 2.698, deltaU: 1.082 }),
  Object.freeze({ t: 50, uc: 2.98, deltaU: 0.8 }),
  Object.freeze({ t: 60, uc: 3.192, deltaU: 0.588 }),
  Object.freeze({ t: 70, uc: 3.343, deltaU: 0.437 }),
  Object.freeze({ t: 80, uc: 3.448, deltaU: 0.332 }),
  Object.freeze({ t: 100, uc: 3.529, deltaU: 0.251, excluded: true })
]);

export const CHARGING_FIT_DATA = Object.freeze(
  CHARGING_RAW_DATA.slice(0, 9).map(({ t, deltaU }) => Object.freeze({ t, deltaU }))
);

export function cloneExampleData() {
  return EXAMPLE_DATA.map(({ r, f }) => ({ r, f }));
}

export function cloneUqExampleData() {
  return UQ_EXAMPLE_DATA.map(({ u, q }) => ({ u, q }));
}

export function parseLocaleNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
  if (typeof value !== "string") return NaN;

  let normalized = value.trim().replace(/\s+/g, "");
  if (!normalized) return NaN;

  const comma = normalized.lastIndexOf(",");
  const point = normalized.lastIndexOf(".");

  if (comma >= 0 && point >= 0) {
    if (comma > point) {
      normalized = normalized.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = normalized.replace(/,/g, "");
    }
  } else {
    normalized = normalized.replace(",", ".");
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function validatePowerPoints(data, { minRows = 3, maxRows = 30 } = {}) {
  const errors = [];
  if (!Array.isArray(data)) {
    return { valid: false, points: [], errors: ["Die Messwerttabelle ist nicht lesbar."] };
  }

  if (data.length < minRows) {
    errors.push(`Mindestens ${minRows} vollständige Messwertpaare sind nötig.`);
  }
  if (data.length > maxRows) {
    errors.push(`Höchstens ${maxRows} Messwertpaare sind möglich.`);
  }

  const points = data.map((row, index) => {
    const r = parseLocaleNumber(row?.r);
    const f = parseLocaleNumber(row?.f);

    if (!Number.isFinite(r) || !Number.isFinite(f)) {
      errors.push(`Zeile ${index + 1}: Beide Felder müssen Zahlen enthalten.`);
    } else if (r <= 0 || f <= 0) {
      errors.push(`Zeile ${index + 1}: r und F müssen größer als 0 sein.`);
    }

    return { r, f };
  });

  const usablePoints = points.filter(({ r, f }) => Number.isFinite(r) && Number.isFinite(f) && r > 0 && f > 0);
  if (usablePoints.length >= minRows && new Set(usablePoints.map(({ r }) => r)).size < 2) {
    errors.push("Die r-Werte dürfen nicht alle gleich sein.");
  }

  return { valid: errors.length === 0, points: usablePoints, errors };
}

export function validateUqPoints(data, { minRows = 3, maxRows = 30 } = {}) {
  const errors = [];
  if (!Array.isArray(data)) {
    return { valid: false, points: [], errors: ["Die Messwerttabelle ist nicht lesbar."] };
  }
  if (data.length < minRows) errors.push(`Mindestens ${minRows} vollständige Messwertpaare sind nötig.`);
  if (data.length > maxRows) errors.push(`Höchstens ${maxRows} Messwertpaare sind möglich.`);

  const points = data.map((row, index) => {
    const u = parseLocaleNumber(row?.u);
    const q = parseLocaleNumber(row?.q);
    if (!Number.isFinite(u) || !Number.isFinite(q)) {
      errors.push(`Zeile ${index + 1}: Beide Felder müssen Zahlen enthalten.`);
    } else if (u <= 0 || q <= 0) {
      errors.push(`Zeile ${index + 1}: U und Q müssen größer als 0 sein.`);
    }
    return { u, q };
  });

  const usablePoints = points.filter(({ u, q }) => Number.isFinite(u) && Number.isFinite(q) && u > 0 && q > 0);
  if (usablePoints.length >= minRows && new Set(usablePoints.map(({ u }) => u)).size < 2) {
    errors.push("Die U-Werte dürfen nicht alle gleich sein.");
  }
  return { valid: errors.length === 0, points: usablePoints, errors };
}

export function validateExponentialPoints(data, { minRows = 3, maxRows = 30 } = {}) {
  const errors = [];
  if (!Array.isArray(data)) {
    return { valid: false, points: [], errors: ["Die Messwerttabelle ist nicht lesbar."] };
  }
  if (data.length < minRows) errors.push(`Mindestens ${minRows} vollständige Messwertpaare sind nötig.`);
  if (data.length > maxRows) errors.push(`Höchstens ${maxRows} Messwertpaare sind möglich.`);

  const points = data.map((row, index) => {
    const t = parseLocaleNumber(row?.t);
    const deltaU = parseLocaleNumber(row?.deltaU);
    if (!Number.isFinite(t) || !Number.isFinite(deltaU)) {
      errors.push(`Zeile ${index + 1}: Zeit und Spannungsdifferenz müssen Zahlen enthalten.`);
    } else if (t < 0) {
      errors.push(`Zeile ${index + 1}: Die Zeit darf nicht negativ sein.`);
    } else if (deltaU <= 0) {
      errors.push(`Zeile ${index + 1}: ΔU muss für TrendExp größer als 0 sein.`);
    }
    return { t, deltaU };
  });

  const usablePoints = points.filter(({ t, deltaU }) => Number.isFinite(t) && Number.isFinite(deltaU) && t >= 0 && deltaU > 0);
  if (usablePoints.length >= minRows && new Set(usablePoints.map(({ t }) => t)).size < 2) {
    errors.push("Die Zeitwerte dürfen nicht alle gleich sein.");
  }
  return { valid: errors.length === 0, points: usablePoints, errors };
}

export function powerRegression(points) {
  if (!Array.isArray(points) || points.length < 2) return null;
  if (points.some(({ r, f }) => !Number.isFinite(r) || !Number.isFinite(f) || r <= 0 || f <= 0)) return null;

  const xs = points.map(({ r }) => Math.log(r));
  const ys = points.map(({ f }) => Math.log(f));
  const n = points.length;
  const meanX = xs.reduce((sum, value) => sum + value, 0) / n;
  const meanY = ys.reduce((sum, value) => sum + value, 0) / n;

  let numerator = 0;
  let denominator = 0;
  for (let index = 0; index < n; index += 1) {
    numerator += (xs[index] - meanX) * (ys[index] - meanY);
    denominator += (xs[index] - meanX) ** 2;
  }
  if (denominator === 0) return null;

  const b = numerator / denominator;
  const a = Math.exp(meanY - b * meanX);
  return { a, b };
}

export function uqPowerRegression(points) {
  return powerRegression(points.map(({ u, q }) => ({ r: u, f: q })));
}

export function linearRegression(points) {
  if (!Array.isArray(points) || points.length < 2) return null;
  if (points.some(({ u, q }) => !Number.isFinite(u) || !Number.isFinite(q))) return null;

  const n = points.length;
  const meanU = points.reduce((sum, { u }) => sum + u, 0) / n;
  const meanQ = points.reduce((sum, { q }) => sum + q, 0) / n;
  let numerator = 0;
  let denominator = 0;

  points.forEach(({ u, q }) => {
    numerator += (u - meanU) * (q - meanQ);
    denominator += (u - meanU) ** 2;
  });
  if (denominator === 0) return null;

  const slope = numerator / denominator;
  const intercept = meanQ - slope * meanU;
  return { slope, intercept };
}

export function exponentialRegression(points) {
  if (!Array.isArray(points) || points.length < 2) return null;
  if (points.some(({ t, deltaU }) => !Number.isFinite(t) || !Number.isFinite(deltaU) || t < 0 || deltaU <= 0)) return null;

  const n = points.length;
  const meanT = points.reduce((sum, { t }) => sum + t, 0) / n;
  const meanLogU = points.reduce((sum, { deltaU }) => sum + Math.log(deltaU), 0) / n;
  let numerator = 0;
  let denominator = 0;

  points.forEach(({ t, deltaU }) => {
    numerator += (t - meanT) * (Math.log(deltaU) - meanLogU);
    denominator += (t - meanT) ** 2;
  });
  if (denominator === 0) return null;

  const b = numerator / denominator;
  const a = Math.exp(meanLogU - b * meanT);
  return { a, b };
}

export function analyzePoints(points, regression) {
  if (!regression) return { rows: [], maxDeviation: null };

  const rows = points.map(({ r, f }) => {
    const predicted = regression.a * (r ** regression.b);
    const deviation = ((f - predicted) / predicted) * 100;
    return { r, f, predicted, deviation };
  });

  const maxDeviation = rows.reduce((largest, row) => (
    !largest || Math.abs(row.deviation) > Math.abs(largest.deviation) ? row : largest
  ), null);

  return { rows, maxDeviation };
}

export function analyzeUqPower(points, regression) {
  const analysis = analyzePoints(points.map(({ u, q }) => ({ r: u, f: q })), regression);
  return {
    rows: analysis.rows.map(({ r, f, predicted, deviation }) => ({ u: r, q: f, predicted, deviation })),
    maxDeviation: analysis.maxDeviation
      ? {
          u: analysis.maxDeviation.r,
          q: analysis.maxDeviation.f,
          predicted: analysis.maxDeviation.predicted,
          deviation: analysis.maxDeviation.deviation
        }
      : null
  };
}

export function analyzeUqLinear(points, regression) {
  if (!regression || !Array.isArray(points) || points.length === 0) return null;

  const predictedRows = points.map(({ u, q }) => ({
    u,
    q,
    predicted: regression.slope * u + regression.intercept
  }));
  if (predictedRows.some(({ predicted }) => !Number.isFinite(predicted) || predicted <= 0)) {
    return { rows: [], maxDeviation: null, invalidPrediction: true };
  }

  const rows = predictedRows.map((row) => ({
    ...row,
    deviation: ((row.q - row.predicted) / row.predicted) * 100
  }));
  const maxDeviation = rows.reduce((largest, row) => (
    !largest || Math.abs(row.deviation) > Math.abs(largest.deviation) ? row : largest
  ), null);
  const interceptShare = relativeInterceptShare(points, regression.intercept);
  return { rows, maxDeviation, interceptShare, invalidPrediction: false };
}

export function analyzeExponential(points, regression) {
  if (!regression || !Array.isArray(points) || points.length === 0) return { rows: [], maxDeviation: null };
  const rows = points.map(({ t, deltaU }) => {
    const predicted = regression.a * Math.exp(regression.b * t);
    const deviation = ((deltaU - predicted) / predicted) * 100;
    return { t, deltaU, predicted, deviation };
  });
  const maxDeviation = rows.reduce((largest, row) => (
    !largest || Math.abs(row.deviation) > Math.abs(largest.deviation) ? row : largest
  ), null);
  return { rows, maxDeviation };
}

export function exponentialTimeMeasures(exponent) {
  if (!Number.isFinite(exponent) || exponent >= 0) return null;
  const tau = -1 / exponent;
  return { tau, halfLife: tau * Math.log(2) };
}

export function greatestSingleChargingError({ deltaTime, minPositiveTime, deltaVoltage, minVoltage }) {
  if (![deltaTime, minPositiveTime, deltaVoltage, minVoltage].every(Number.isFinite)) return null;
  if (deltaTime <= 0 || minPositiveTime <= 0 || deltaVoltage <= 0 || minVoltage <= 0) return null;
  const timePercent = (deltaTime / minPositiveTime) * 100;
  const voltagePercent = (deltaVoltage / minVoltage) * 100;
  return { timePercent, voltagePercent, limit: Math.max(timePercent, voltagePercent) };
}

const chargingReferenceRegression = exponentialRegression(CHARGING_FIT_DATA);
export const CHARGING_ANALYSIS_DATA = Object.freeze(
  analyzeExponential(CHARGING_FIT_DATA, chargingReferenceRegression).rows.map((row) => Object.freeze(row))
);

export function relativeExponentDeviation(exponent, expected = 1) {
  if (!Number.isFinite(exponent) || !Number.isFinite(expected) || expected === 0) return null;
  return Math.abs((exponent - expected) / expected) * 100;
}

export function relativeInterceptShare(points, intercept) {
  if (!Array.isArray(points) || points.length === 0 || !Number.isFinite(intercept)) return null;
  const minQ = Math.min(...points.map(({ q }) => q));
  if (!(minQ > 0)) return null;
  return { percent: (Math.abs(intercept) / minQ) * 100, minQ };
}

export function deviationsWithinLimit(deviations, limit) {
  return Array.isArray(deviations)
    && deviations.length > 0
    && deviations.every(Number.isFinite)
    && Number.isFinite(limit)
    && limit > 0
    && deviations.every((value) => Math.abs(value) < limit);
}

export function analyzeProportionality(points) {
  if (!Array.isArray(points) || points.length === 0) return null;
  if (points.some(({ u, q }) => !Number.isFinite(u) || !Number.isFinite(q) || u <= 0 || q <= 0)) return null;

  const capacities = points.map(({ u, q }) => q / u);
  const mean = capacities.reduce((sum, value) => sum + value, 0) / capacities.length;
  const rows = points.map(({ u, q }, index) => {
    const capacity = capacities[index];
    const deviation = ((capacity - mean) / mean) * 100;
    return { u, q, capacity, capacityPf: capacity * 10000, deviation };
  });
  const maxDeviation = rows.reduce((largest, row) => (
    !largest || Math.abs(row.deviation) > Math.abs(largest.deviation) ? row : largest
  ), null);

  return { rows, mean, meanPf: mean * 10000, maxDeviation };
}

export function greatestSingleRelativeError(points, deltaU, deltaQ) {
  if (!Array.isArray(points) || points.length === 0 || !Number.isFinite(deltaU) || !Number.isFinite(deltaQ) || deltaU <= 0 || deltaQ <= 0) return null;
  const minU = Math.min(...points.map(({ u }) => u));
  const minQ = Math.min(...points.map(({ q }) => q));
  if (!(minU > 0) || !(minQ > 0)) return null;
  const uPercent = (deltaU / minU) * 100;
  const qPercent = (deltaQ / minQ) * 100;
  return { uPercent, qPercent, limit: Math.max(uPercent, qPercent), minU, minQ };
}

export function isWithin(value, expected, tolerance) {
  const parsed = parseLocaleNumber(value);
  return Number.isFinite(parsed) && Math.abs(parsed - expected) <= tolerance;
}

export function formatNumber(value, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("de-DE", {
    maximumFractionDigits,
    minimumFractionDigits: 0
  }).format(value);
}
