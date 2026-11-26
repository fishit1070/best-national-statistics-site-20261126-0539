export async function renderSources(root) {
  const { SOURCES_ROWS, CONNECTIVITY, COUNTRY_FACTS } = await import("../data/sources.js");
  const allRows = [...SOURCES_ROWS, ...CONNECTIVITY, ...COUNTRY_FACTS];
  const rowHtml = (rows) => rows.map((r) =>
    `<tr><td>${r.figure}</td><td class="num">${r.value}</td><td>${r.source}</td><td>${r.year}</td><td>${r.basis}</td></tr>`).join("");
  root.innerHTML = `
    <h2>Data &amp; Sources</h2>
    <p class="lede">Every figure on this site, with its source, year and basis — ${allRows.length} rows. Type in the search box to filter the table.</p>
    <section class="panel">
      <p class="panel-head">Search all figures</p>
      <input type="search" id="src-search" placeholder="Search a figure, source or year — e.g. poverty, BPS, 2024" aria-label="Search figures">
      <p class="note"><span id="src-count">${allRows.length}</span> figures shown.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Figure</th><th class="num">Value</th><th>Source</th><th>Year</th><th>Basis</th></tr></thead>
        <tbody id="src-body">${rowHtml(allRows)}</tbody>
      </table></div>
    </section>
    <section class="panel">
      <p class="panel-head">Connectivity</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Figure</th><th class="num">Value</th><th>Source</th><th>Year</th><th>Basis</th></tr></thead>
        <tbody>${rowHtml(CONNECTIVITY)}</tbody>
      </table></div>
      <p class="note">Internet use: 72.78% of the population (World Bank, 2024). APJII's survey-based penetration of 79.5% (2024) is a different basis — see the traps below. Mobile cellular subscriptions: 122.51 per 100 people (World Bank, 2024). Access to electricity: 99.9% (World Bank, 2024).</p>
    </section>
    <section class="panel">
      <p class="panel-head">Country facts</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Figure</th><th class="num">Value</th><th>Source</th><th>Year</th><th>Basis</th></tr></thead>
        <tbody>${rowHtml(COUNTRY_FACTS)}</tbody>
      </table></div>
    </section>
    <section class="panel">
      <p class="panel-head">Definition traps — pairs that must not be mixed</p>
      <ol>
        <li><strong>Unemployment:</strong> BPS TPT 4.76% (Feb 2025) vs ILO modelled 3.30% (2024) — different definitions; the ILO figure is modelled, the TPT is the survey headline.</li>
        <li><strong>Life expectancy:</strong> BPS 74.15 years (2024) vs World Bank 71.288 years (2024) — different methodology; BPS is the headline.</li>
        <li><strong>Population:</strong> BPS mid-year projection 281,603,800 (mid-2024) vs World Bank estimate 283,487,931 (2024) vs the civil registration (Dukcapil) total on yet another basis — compare only within one basis.</li>
        <li><strong>Internet use:</strong> APJII 79.5% (2024, survey) vs World Bank 72.78% (2024) — different measurement bases.</li>
        <li><strong>Trade:</strong> BPS customs totals (exports US$264.70B, 2024) vs BACI reconciled partner shares vs World Bank balance-of-payments goods &amp; services (exports US$311.51B, 2024) — different coverage.</li>
      </ol>
      <p class="note">Sources used across this site: BPS — Statistics Indonesia (including Sakernas and Susenas), World Bank World Development Indicators, Bank Indonesia, UNDP, APJII, BACI, UN DESA World Population Prospects, and the Ministry of Trade.</p>
    </section>`;
  const input = root.querySelector("#src-search");
  const body = root.querySelector("#src-body");
  const count = root.querySelector("#src-count");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = q === "" ? allRows : allRows.filter((r) =>
      [r.figure, r.value, r.source, r.year, r.basis].join(" ").toLowerCase().includes(q));
    body.innerHTML = rowHtml(filtered);
    count.textContent = String(filtered.length);
  });
}
