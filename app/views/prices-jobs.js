export async function renderPricesJobs(root) {
  const { CPI_SERIES, INFLATION_TILES, LABOUR_TILES, ILO_SERIES, WAGE_PANEL } = await import("../data/prices-jobs.js");
  const { lineChart } = await import("../charts.js");
  const state = { range: 10 };
  const cpi = () => (state.range === 5 ? CPI_SERIES.slice(-5) : CPI_SERIES);
  const ilo = () => (state.range === 5 ? ILO_SERIES.slice(-5) : ILO_SERIES);
  const cpiHtml = () =>
    `<div class="chart-wrap">${lineChart(cpi(), { label: "Inflation, annual average %", color: "#B4502E" })}</div>` +
    `<p class="src">Source: World Bank WDI, annual average inflation. BPS December 2024: 1.57% year on year; CPI 106.80, +0.44% month on month.</p>`;
  const iloHtml = () =>
    `<div class="chart-wrap">${lineChart(ilo(), { label: "ILO modelled unemployment, %", color: "#0E4A45" })}</div>` +
    `<p class="src">Source: World Bank WDI / ILO modelled estimates, 2015–2024. This is a modelled series — it is NOT the BPS headline unemployment rate (TPT).</p>`;
  root.innerHTML = `
    <h2>Prices &amp; Jobs</h2>
    <p class="lede">Inflation was 1.57% year on year in December 2024 (BPS), inside Bank Indonesia's 2.5% ±1% target band. Unemployment (TPT) was 4.76% in February 2025, with 153.05 million people in the labour force.</p>
    <div class="kpi-grid">
      ${[...INFLATION_TILES, ...LABOUR_TILES].map((t) => `
        <div class="kpi" style="cursor:default">
          <span class="kpi-label">${t.label}</span>
          <span class="kpi-value">${t.value}</span>
          <span class="kpi-sub">${t.sub}</span>
          <span class="src">Source: ${t.source}, ${t.year}</span>
        </div>`).join("")}
    </div>
    <section class="panel">
      <p class="panel-head">Inflation · annual average %, 2015–2024</p>
      <div class="toggle-group" role="group" aria-label="Chart range">
        <button type="button" data-range="5">5Y</button>
        <button type="button" data-range="10" class="active">10Y</button>
      </div>
      <div id="cpi-chart">${cpiHtml()}</div>
      <p class="note">Inflation peaked in this decade at 6.363% (2015) and 4.209% (2022), and fell to 1.560% in 2021 and 2.182% in 2024.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Unemployment, ILO modelled · %, 2015–2024</p>
      <div id="ilo-chart">${iloHtml()}</div>
      <p class="note">The ILO modelled rate (3.301% in 2024) is lower than the BPS headline TPT (4.76% in February 2025) because it is modelled on a different definition. Do not mix the two — see Data &amp; Sources.</p>
    </section>
    <div class="warn">
      <strong>No national minimum wage.</strong>
      <p>Indonesia has no single national minimum wage — minimum wages are set per province (UMP). ${WAGE_PANEL.jakarta.label}: <strong>${WAGE_PANEL.jakarta.value} ${WAGE_PANEL.jakarta.unit}</strong> (${WAGE_PANEL.jakarta.source}, ${WAGE_PANEL.jakarta.year}). ${WAGE_PANEL.centralJava.label}: <strong>${WAGE_PANEL.centralJava.value} ${WAGE_PANEL.centralJava.unit}</strong> (${WAGE_PANEL.centralJava.source}, ${WAGE_PANEL.centralJava.year}). ${WAGE_PANEL.increase}</p>
      <p>${WAGE_PANEL.youth}</p>
    </div>
    <section class="panel">
      <p class="panel-head">Labour market in brief</p>
      <p>Of 216.79 million working-age people (BPS Sakernas, Feb 2025), 153.05 million were in the labour force and 145.77 million were employed; 7.28 million were unemployed. Formal workers numbered 59.19 million — 40.60% of the employed — and the average monthly wage was Rp3.09 million.</p>
    </section>`;
  root.querySelectorAll("[data-range]").forEach((btn) =>
    btn.addEventListener("click", () => {
      state.range = Number(btn.dataset.range);
      root.querySelectorAll("[data-range]").forEach((x) => x.classList.toggle("active", x === btn));
      root.querySelector("#cpi-chart").innerHTML = cpiHtml();
      root.querySelector("#ilo-chart").innerHTML = iloHtml();
    }));
}
