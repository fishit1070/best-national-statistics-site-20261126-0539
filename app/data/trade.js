export const TRADE_TILES = [
  { label: "Exports", value: "US$264.70B", sub: "Non-oil & gas US$248.83B; oil & gas US$15.89B", source: "BPS / Ministry of Trade", year: "Jan–Dec 2024" },
  { label: "Imports", value: "US$233.66B", sub: "Non-oil & gas US$197.38B; oil & gas US$36.28B", source: "BPS / Ministry of Trade", year: "Jan–Dec 2024" },
  { label: "Trade surplus", value: "US$31.04B", sub: "Exports minus imports", source: "BPS / Ministry of Trade", year: "Jan–Dec 2024" },
  { label: "Total trade", value: "US$498.36B", sub: "+3.6% year on year", source: "BPS / Ministry of Trade", year: "Jan–Dec 2024" },
  { label: "Exports, goods & services (BoP)", value: "US$311.51B", sub: "Balance of payments basis", source: "World Bank WDI", year: "2024" },
  { label: "Imports, goods & services (BoP)", value: "US$286.25B", sub: "Balance of payments basis", source: "World Bank WDI", year: "2024" },
];

export const PARTNERS = [
  { partner: "China", exportShare: 23.6, importShare: 31.4, exportsUsd: "US$63B", importsUsd: "US$74B" },
  { partner: "United States", exportShare: null, importShare: null, exportsUsd: "US$27B", importsUsd: "—" },
  { partner: "Japan", exportShare: null, importShare: null, exportsUsd: "US$21B", importsUsd: "—" },
  { partner: "India", exportShare: null, importShare: null, exportsUsd: "US$20B", importsUsd: "—" },
];

export const TRADE_NOTE = {
  basis: "BPS customs totals; partner shares BACI reconciled.",
  product: "Largest export product: mineral fuels & oils, 20.8% of exports (BACI, 2024).",
  bopNote: "World Bank balance-of-payments figures cover goods and services, so they are larger than BPS customs totals for goods alone — do not mix the two bases.",
};
