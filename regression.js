export const EXAMPLE_DATA = Object.freeze([
  Object.freeze({ r: 8, f: 0.37 }),
  Object.freeze({ r: 9.3, f: 0.27 }),
  Object.freeze({ r: 10.7, f: 0.21 }),
  Object.freeze({ r: 12.4, f: 0.18 }),
  Object.freeze({ r: 15.1, f: 0.11 }),
  Object.freeze({ r: 18.6, f: 0.06 })
]);

export function cloneExampleData() {
  return EXAMPLE_DATA.map(({ r, f }) => ({ r, f }));
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
  const meanObserved = points.reduce((sum, { f }) => sum + f, 0) / n;
  let residualSquares = 0;
  let totalSquares = 0;

  points.forEach(({ r, f }) => {
    const predicted = a * (r ** b);
    residualSquares += (f - predicted) ** 2;
    totalSquares += (f - meanObserved) ** 2;
  });

  const r2 = totalSquares === 0 ? 1 : 1 - residualSquares / totalSquares;
  return { a, b, r2 };
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
