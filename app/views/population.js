export async function renderPopulation(root) {
  const { POP_SERIES, AGE_STRUCTURE, PROVINCES, CITIES, DEMO_TILES } = await import("../data/population.js");
  const { lineChart } = await import("../charts.js");
  const { fmtInt } = await import("../format.js");
  const state = { range: 10, sortKey: "population", sortDir: -1 };
  const series = () => (state.range === 5 ? POP_SERIES.slice(-5) : POP_SERIES);
  const chartHtml = () =>
    `<div class="chart-wrap">${lineChart(series().map((p) => ({ label: p.label, value: p.value / 1e6 })), { label: "Total population, millions", color: "#0E4A45" })}</div>` +
    `<p class="src">Source: World Bank WDI, total population. Values shown in millions. BPS mid-2024 projection: 281,603,800.</p>`;
  const sortedProvinces = () => {
    const rows = [...PROVINCES];
    rows.sort((a, b) => {
      const d = state.sortKey === "name"
        ? a.name.localeCompare(b.name)
        : a.population - b.population;
      return d * state.sortDir;
    });
    return rows;
  };
  const tableHtml = () =>
    `<div class="table-wrap"><table>
      <thead><tr><th class="sortable" data-sort="name">Province / island ↕</th><th class="sortable num" data-sort="population">Population ↕</th><th>Source</th></tr></thead>
      <tbody>${sortedProvinces().map((p) => `<tr><td>${p.name}</td><td class="num">${fmtInt(p.population)}</td><td>BPS, 2024</td></tr>`).join("")}</tbody>
    </table></div>`;
  root.innerHTML = `
    <h2>Population</h2>
    <p class="lede">281,603,800 people by the BPS mid-2024 projection — 283,487,931 by the World Bank's 2024 estimate. The two differ because they use different methods; both are shown, labelled, throughout this site.</p>
    <section class="panel">
      <p class="panel-head">Provinces &amp; island totals · click a header to sort</p>
      <div id="prov-table">${tableHtml()}</div>
      <p class="src">Source: BPS mid-year projection, 2024. Indonesia has 38 provinces.</p>
    </section>
    <div class="kpi-grid">
      ${DEMO_TILES.map((t) => `
        <div class="kpi" style="cursor:default">
          <span class="kpi-label">${t.label}</span>
          <span class="kpi-value">${t.value}</span>
          <span class="kpi-sub">${t.sub}</span>
          <span class="src">Source: ${t.source}, ${t.year}</span>
        </div>`).join("")}
    </div>
    <section class="panel">
      <p class="panel-head">Age structure · World Bank, 2024</p>
      <div class="age-stack" role="img" aria-label="Ages 0 to 14: 24.60 percent; ages 15 to 64: 68.11 percent; ages 65 and over: 7.29 percent">
        <span class="age-young">0–14 · 24.60%</span>
        <span class="age-work">15–64 · 68.11%</span>
        <span class="age-old">65+ · 7.29%</span>
      </div>
      <div class="legend-row">
        <span><i style="background:#17877B"></i>0–14: 24.60%</span>
        <span><i style="background:#0E4A45"></i>15–64: 68.11%</span>
        <span><i style="background:#C98A1B"></i>65+: 7.29%</span>
      </div>
      <p class="src">Source: World Bank WDI, 2024. Two in three Indonesians are of working age.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Total population · millions, 2015–2024</p>
      <div class="toggle-group" role="group" aria-label="Chart range">
        <button type="button" data-range="5">5Y</button>
        <button type="button" data-range="10" class="active">10Y</button>
      </div>
      <div id="pop-chart">${chartHtml()}</div>
    </section>
    <section class="panel">
      <p class="panel-head">Largest cities · Census 2020</p>
      <div class="table-wrap"><table>
        <thead><tr><th>City</th><th class="num">Population</th><th>Note</th></tr></thead>
        <tbody>${CITIES.map((c) => `<tr><td>${c.name}</td><td class="num">${fmtInt(c.population)}</td><td>${c.note}</td></tr>`).join("")}</tbody>
      </table></div>
      <p class="src">Source: BPS Population Census, 2020. Medan (2,435,252) is the largest city outside Java.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Basis note</p>
      <p><strong>BPS mid-year projection</strong> (281,603,800 for mid-2024) is the official national estimate. The <strong>World Bank estimate</strong> (283,487,931 for 2024) uses UN population data on a different basis. The 2020 census counted 270,203,917 people. Compare figures only within the same basis — see Data &amp; Sources.</p>
    </section>`;
  root.querySelectorAll("[data-range]").forEach((btn) =>
    btn.addEventListener("click", () => {
      state.range = Number(btn.dataset.range);
      root.querySelectorAll("[data-range]").forEach((x) => x.classList.toggle("active", x === btn));
      root.querySelector("#pop-chart").innerHTML = chartHtml();
    }));
  const bindSort = () => {
    root.querySelectorAll("#prov-table [data-sort]").forEach((th) =>
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (state.sortKey === key) state.sortDir *= -1;
        else { state.sortKey = key; state.sortDir = key === "name" ? 1 : -1; }
        root.querySelector("#prov-table").innerHTML = tableHtml();
        bindSort();
      }));
  };
  bindSort();
}
