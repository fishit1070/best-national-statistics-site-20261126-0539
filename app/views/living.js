export async function renderLiving(root) {
  const { POVERTY_TILES, POVERTY_SPLIT, HDI_TILES, SCHOOLING } = await import("../data/living.js");
  const { barChart } = await import("../charts.js");
  root.innerHTML = `
    <h2>Living Standards</h2>
    <p class="lede">Poverty fell to 8.47% in March 2025 — 23.85 million people — down from 8.57% in September 2024. The Human Development Index (BPS) reached 75.02 in 2024, and life expectancy reached 74.15 years.</p>
    <div class="kpi-grid">
      ${[...POVERTY_TILES, ...HDI_TILES].map((t) => `
        <div class="kpi" style="cursor:default">
          <span class="kpi-label">${t.label}</span>
          <span class="kpi-value">${t.value}</span>
          <span class="kpi-sub">${t.sub}</span>
          <span class="src">Source: ${t.source}, ${t.year}</span>
        </div>`).join("")}
    </div>
    <section class="panel">
      <p class="panel-head">Poverty: urban vs rural · BPS Susenas, Mar 2025</p>
      <div class="chart-wrap">${barChart(POVERTY_SPLIT.map((p) => ({ label: p.label, value: p.value, display: p.value.toFixed(2) + "%" })), { label: "Poverty rate by area", labelWidth: 150 })}</div>
      <p class="src">Source: BPS Susenas, March 2025. Rural poverty (11.03%) is nearly twice urban poverty (6.73%).</p>
      <p class="note">Extreme poverty was 0.85% (2.38 million people) in March 2025. The poverty line was Rp609,160 per capita per month.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Education &amp; literacy</p>
      <div class="kpi-grid">
        ${SCHOOLING.map((t) => `
          <div class="kpi" style="cursor:default">
            <span class="kpi-label">${t.label}</span>
            <span class="kpi-value">${t.value}</span>
            <span class="kpi-sub">${t.sub}</span>
            <span class="src">Source: ${t.source}, ${t.year}</span>
          </div>`).join("")}
      </div>
      <p class="note">Mean schooling of 8.85 years (ages 25+, BPS 2024) against expected schooling of 13.21 years shows younger Indonesians stay in school longer than older cohorts did. Literacy of 96.0% (ages 15+, World Bank, 2020) is the latest World Bank figure for this indicator.</p>
    </section>
    <section class="panel">
      <p class="panel-head">Inequality &amp; wellbeing — read the basis</p>
      <p>The BPS Gini ratio (0.375, March 2025; 0.381 in September 2024) and the World Bank Gini index (34.9, 2024) describe the same idea on different scales — they are not interchangeable. Likewise the BPS Human Development Index (75.02, 2024) sits on the Indonesian IPM scale, while the UNDP HDI (0.728, 2023) sits on a 0–1 scale. Life expectancy is 74.15 years by BPS (2024; 73.93 in 2023; 73.70 in 2022); the World Bank figure of 71.288 years (2024) uses a different methodology and is not the headline.</p>
    </section>`;
}
