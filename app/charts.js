// Hand-rolled SVG charts. No library, no network. All text >= 11px.
const TEAL = "#17877B", DARK = "#0E4A45", GOLD = "#C98A1B", BRICK = "#B4502E", INK = "#1D2A28", GRID = "#E3D9BE";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function lineChart(points, opts = {}) {
  const w = opts.width || 720, h = opts.height || 280;
  const padL = 58, padR = 16, padT = 18, padB = 34;
  const vals = points.map((p) => p.value);
  let min = Math.min(...vals, 0), max = Math.max(...vals, 0);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min || 1;
  const x = (i) => padL + (i * (w - padL - padR)) / Math.max(points.length - 1, 1);
  const y = (v) => padT + ((max - v) / span) * (h - padT - padB);
  const color = opts.color || TEAL;
  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const v = min + (span * g) / 4, gy = y(v);
    grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${INK}">${v.toFixed(1)}</text>`;
  }
  let zeroLine = "";
  if (min < 0 && max > 0) {
    zeroLine = `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - padR}" y2="${y(0).toFixed(1)}" stroke="${BRICK}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const dots = points.map((p, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.5" fill="${color}"/>`).join("");
  const labels = points.map((p, i) => {
    if (points.length > 10 && i % 2 === 1) return "";
    const anchor = i === 0 ? "start" : (i === points.length - 1 ? "end" : "middle");
    const dx = i === 0 ? 6 : (i === points.length - 1 ? -6 : 0);
    return `<text x="${(x(i) + dx).toFixed(1)}" y="${h - 12}" text-anchor="${anchor}" font-size="11" fill="${INK}">${esc(p.label)}</text>` +
      `<text x="${(x(i) + dx).toFixed(1)}" y="${(y(p.value) - 9).toFixed(1)}" text-anchor="${anchor}" font-size="11" font-weight="700" fill="${DARK}">${p.value.toFixed(2)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(opts.label || "Line chart")}">${grid}${zeroLine}<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5"/>${dots}${labels}</svg>`;
}

export function barChart(rows, opts = {}) {
  const w = opts.width || 720, rowH = 34, padL = 8, padR = 74, padT = 8;
  const h = padT + rows.length * rowH + 14;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const labelW = opts.labelWidth || 190;
  const barW = w - padL - labelW - padR;
  const color = opts.color || TEAL;
  const bars = rows.map((r, i) => {
    const y = padT + i * rowH, bw = Math.max((r.value / max) * barW, 2);
    return `<text x="${padL}" y="${y + 17}" font-size="12" fill="${INK}">${esc(r.label)}</text>` +
      `<rect x="${padL + labelW}" y="${y + 4}" width="${bw.toFixed(1)}" height="18" rx="4" fill="${r.color || color}"/>` +
      `<text x="${padL + labelW + bw + 8}" y="${y + 17}" font-size="12" font-weight="700" fill="${DARK}">${esc(r.display ?? r.value)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(opts.label || "Bar chart")}">${bars}</svg>`;
}

export function ageBars(parts) {
  // parts: [{label, value, color}] — rendered as a labelled stacked bar via barChart-style rows.
  return barChart(parts.map((p) => ({ label: p.label, value: p.value, display: p.value.toFixed(2) + "%", color: p.color })), { label: "Age structure" });
}
