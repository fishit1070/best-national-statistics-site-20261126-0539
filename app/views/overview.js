export async function renderOverview(root) {
  const { OVERVIEW_KPIS, GDP_GROWTH_SERIES, TOP_PROVINCES, TODAY_ITEMS } = await import("../data/overview.js");
  const { lineChart } = await import("../charts.js");
  const { fmtInt } = await import("../format.js");
  const state = { range: 10 };
  const series = () => (state.range === 5 ? GDP_GROWTH_SERIES.slice(-5) : GDP_GROWTH_SERIES);
  const chartHtml = () =>
    `<div class="chart-wrap">${lineChart(series(), { label: "Real GDP growth, annual %", color: "#17877B", height: 105 })}</div>` +
    `<p class="src">Source: World Bank WDI, annual % growth of GDP. BPS figure for 2024: 5.03%.</p>`;
  root.innerHTML = `
    <h2>Overview — Indonesia at a glance</h2>
    <p class="lede">Indonesia in Numbers brings the country's headline official statistics into one place: population, the economy, prices, jobs, living standards and trade. Every figure below carries its source and its year.</p>
    <div class="count-strip"><span><b>60+ sourced figures</b></span><span><b>38 provinces</b></span><span><b>10-year series 2015–2024</b></span><span><b>7 sections</b></span></div>
    <div class="kpi-grid">
      ${OVERVIEW_KPIS.map((k) => `
        <button class="kpi" data-route="${k.route}" type="button">
          <span class="kpi-label">${k.label}</span>
          <span class="kpi-value">${k.value}</span>
          <span class="kpi-sub">${k.sub}</span>
          <span class="src">Source: ${k.source}, ${k.year}</span>
        </button>`).join("")}
    </div>
    <section class="panel">
      <p class="panel-head">Real GDP growth · annual %</p>
      <div class="toggle-group" role="group" aria-label="Chart range">
        <button type="button" data-range="5" class="${state.range === 5 ? "active" : ""}">5Y</button>
        <button type="button" data-range="10" class="${state.range === 10 ? "active" : ""}">10Y</button>
      </div>
      <div id="growth-chart">${chartHtml()}</div>
      <p class="note">Growth held near 5% for most of the decade, with one sharp exception: −2.07% in 2020, the COVID year. It recovered to 5.31% in 2022 and 5.03% in 2024.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Largest provinces · BPS mid-2024 projection</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Province / island</th><th class="num">Population</th><th>Source</th></tr></thead>
        <tbody>${TOP_PROVINCES.map((p) => `<tr><td>${p.name}</td><td class="num">${fmtInt(p.population)}</td><td>BPS, 2024</td></tr>`).join("")}</tbody>
      </table></div>
      <p class="src">Source: BPS mid-year projection, 2024. Java island alone holds 156,927,800 people.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Today in the data</p>
      <div class="today-strip">
        ${TODAY_ITEMS.map((t) => `<div class="today-item"><p>${t.text}</p><p class="src">Source: ${t.source}</p></div>`).join("")}
      </div>
    </section>
    <section class="panel">
      <p class="panel-head">How to read this site</p>
      <p>Every number shows its <strong>source and year</strong> next to it. <strong>BPS</strong> (Statistics Indonesia) is the national statistical office; the <strong>World Bank WDI</strong> series are international estimates on a different basis — the two can differ for the same concept, and the site labels which basis each figure uses. Where two respected sources disagree (for example life expectancy: BPS 74.15 vs World Bank 71.288), both are shown and the difference is explained on the Data &amp; Sources page.</p>
    </section>`;
  root.querySelectorAll(".kpi").forEach((b) =>
    b.addEventListener("click", () => { location.hash = "#/" + b.dataset.route; }));
  root.querySelectorAll("[data-range]").forEach((btn) =>
    btn.addEventListener("click", () => {
      state.range = Number(btn.dataset.range);
      root.querySelectorAll("[data-range]").forEach((x) => x.classList.toggle("active", x === btn));
      root.querySelector("#growth-chart").innerHTML = chartHtml();
    }));
}
