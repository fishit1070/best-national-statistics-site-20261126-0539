export async function renderEconomy(root) {
  const { GDP_TILES, SECTORS, GROWTH_SERIES, COMPARE_YEARS } = await import("../data/economy.js");
  const { lineChart, barChart } = await import("../charts.js");
  const { fmtInt } = await import("../format.js");
  const state = { range: 10, yearA: 2015, yearB: 2024 };
  const series = () => (state.range === 5 ? GROWTH_SERIES.slice(-5) : GROWTH_SERIES);
  const chartHtml = () =>
    `<div class="chart-wrap">${lineChart(series(), { label: "Real GDP growth, annual %", color: "#17877B" })}</div>` +
    `<p class="src">Source: World Bank WDI, annual % growth of GDP. BPS figure for 2024: 5.03%.</p>`;
  const byYear = (y) => COMPARE_YEARS.find((r) => r.year === y);
  const diff = (a, b, digits = 2) => {
    const d = b - a;
    return (d >= 0 ? "+" : "") + d.toFixed(digits);
  };
  const compareHtml = () => {
    const A = byYear(state.yearA), B = byYear(state.yearB);
    return `
      <div class="compare-grid">
        <div class="compare-card">
          <p class="panel-head">${A.year}</p>
          <p>Growth <span class="big">${A.growth.toFixed(3)}%</span></p>
          <p>Population <span class="big">${fmtInt(A.population)}</span></p>
          <p>Inflation <span class="big">${A.inflation.toFixed(3)}%</span></p>
          <p class="src">Sources: World Bank WDI — growth, population, inflation.</p>
        </div>
        <div class="compare-card">
          <p class="panel-head">${B.year}</p>
          <p>Growth <span class="big">${B.growth.toFixed(3)}%</span></p>
          <p>Population <span class="big">${fmtInt(B.population)}</span></p>
          <p>Inflation <span class="big">${B.inflation.toFixed(3)}%</span></p>
          <p class="src">Sources: World Bank WDI — growth, population, inflation.</p>
        </div>
      </div>
      <p class="note" style="margin-top:.7rem">Change from ${A.year} to ${B.year}: growth <span class="delta">${diff(A.growth, B.growth)} pp</span> · population <span class="delta">${diff(A.population, B.population, 0)} people</span> · inflation <span class="delta">${diff(A.inflation, B.inflation)} pp</span>.</p>`;
  };
  const options = COMPARE_YEARS.map((r) => `<option value="${r.year}">${r.year}</option>`).join("");
  root.innerHTML = `
    <h2>Economy</h2>
    <p class="lede">GDP of Rp22,139.0 trillion in 2024 (BPS) — US$1.396 trillion by the World Bank — growing 5.03% in real terms. Household consumption is 54.04% of GDP, and manufacturing is the largest single sector at 18.98%.</p>
    <div class="kpi-grid">
      ${GDP_TILES.map((t) => `
        <div class="kpi" style="cursor:default">
          <span class="kpi-label">${t.label}</span>
          <span class="kpi-value">${t.value}</span>
          <span class="kpi-sub">${t.sub}</span>
          <span class="src">Source: ${t.source}, ${t.year}</span>
        </div>`).join("")}
    </div>
    <section class="panel">
      <p class="panel-head">Compare two years</p>
      <p>Pick any two years from 2015 to 2024 and compare growth, population and inflation side by side.</p>
      <label>Year A <select id="year-a">${options}</select></label>
      <label style="margin-left:.8rem">Year B <select id="year-b">${options}</select></label>
      <div id="compare">${compareHtml()}</div>
      <p class="src">Sources: World Bank WDI, 2015–2024. Growth and inflation are annual %; population is the World Bank total.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Sectors · share of GDP, BPS 2024</p>
      <div class="chart-wrap">${barChart(SECTORS.map((s) => ({ label: s.label, value: s.value, display: s.value.toFixed(2) + "%" })), { label: "Sector shares of GDP", labelWidth: 220 })}</div>
      <p class="src">Source: BPS, 2024. Top five sectors combined: 63.90%; all other sectors: 36.10%.</p>
      <p class="note">World Bank sector split for 2024 (value added, % of GDP): agriculture 12.61%, industry 39.32%, services 43.77%.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Real GDP growth · annual %, 2015–2024</p>
      <div class="toggle-group" role="group" aria-label="Chart range">
        <button type="button" data-range="5">5Y</button>
        <button type="button" data-range="10" class="active">10Y</button>
      </div>
      <div id="growth-chart">${chartHtml()}</div>
    </section>`;
  root.querySelectorAll("[data-range]").forEach((btn) =>
    btn.addEventListener("click", () => {
      state.range = Number(btn.dataset.range);
      root.querySelectorAll("[data-range]").forEach((x) => x.classList.toggle("active", x === btn));
      root.querySelector("#growth-chart").innerHTML = chartHtml();
    }));
  const selA = root.querySelector("#year-a"), selB = root.querySelector("#year-b");
  selA.value = String(state.yearA); selB.value = String(state.yearB);
  const refresh = () => {
    state.yearA = Number(selA.value); state.yearB = Number(selB.value);
    root.querySelector("#compare").innerHTML = compareHtml();
  };
  selA.addEventListener("change", refresh);
  selB.addEventListener("change", refresh);
}
