export async function renderTrade(root) {
  const { TRADE_TILES, PARTNERS, TRADE_NOTE } = await import("../data/trade.js");
  root.innerHTML = `
    <h2>Trade &amp; Connectivity</h2>
    <p class="lede">Indonesia exported US$264.70B and imported US$233.66B in 2024 (BPS customs totals, January–December), a surplus of US$31.04B on total trade of US$498.36B, up 3.6% year on year.</p>
    <div class="kpi-grid">
      ${TRADE_TILES.map((t) => `
        <div class="kpi" style="cursor:default">
          <span class="kpi-label">${t.label}</span>
          <span class="kpi-value">${t.value}</span>
          <span class="kpi-sub">${t.sub}</span>
          <span class="src">Source: ${t.source}, ${t.year}</span>
        </div>`).join("")}
    </div>
    <section class="panel">
      <p class="panel-head">Top trading partners · BACI reconciled, 2024</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Partner</th><th class="num">Exports to partner</th><th class="num">Imports from partner</th><th class="num">Export share</th><th class="num">Import share</th></tr></thead>
        <tbody>${PARTNERS.map((p) => `<tr><td>${p.partner}</td><td class="num">${p.exportsUsd}</td><td class="num">${p.importsUsd}</td><td class="num">${p.exportShare === null ? "—" : p.exportShare.toFixed(1) + "%"}</td><td class="num">${p.importShare === null ? "—" : p.importShare.toFixed(1) + "%"}</td></tr>`).join("")}</tbody>
      </table></div>
      <p class="src">Source: BACI reconciled data, 2024. China takes 23.6% of Indonesia's exports and supplies 31.4% of its imports.</p>
    </section>
    <section class="panel">
      <p class="panel-head">What Indonesia sells</p>
      <p>${TRADE_NOTE.product}</p>
      <p class="note">Exports of non-oil &amp; gas goods were US$248.83B and oil &amp; gas US$15.89B; imports were US$197.38B non-oil &amp; gas and US$36.28B oil &amp; gas (BPS / Ministry of Trade, Jan–Dec 2024).</p>
    </section>
    <section class="panel">
      <p class="panel-head">Basis note</p>
      <p>${TRADE_NOTE.basis} ${TRADE_NOTE.bopNote}</p>
    </section>`;
}
