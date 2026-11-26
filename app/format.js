export function fmtInt(n) {
  if (n === null || n === undefined) return "—";
  return Number(n).toLocaleString("en-US");
}

export function fmtCompact(n) {
  if (n === null || n === undefined) return "—";
  const v = Number(n);
  if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(1) + "K";
  return String(v);
}

export function fmtPct(x, digits = 2) {
  if (x === null || x === undefined) return "—";
  return Number(x).toFixed(digits) + "%";
}

export function fmtRp(n) {
  if (n === null || n === undefined) return "—";
  return "Rp" + Number(n).toLocaleString("en-US");
}
