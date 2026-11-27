export const OVERVIEW_KPIS = [
  { label: "Population", value: "281,603,800", sub: "Mid-year projection", source: "BPS", year: "2024", route: "population" },
  { label: "GDP (nominal)", value: "Rp22,139.0 trillion", sub: "Current prices", source: "BPS", year: "2024", route: "economy" },
  { label: "GDP per capita", value: "US$4,960.3", sub: "Nominal, current US$", source: "BPS", year: "2024", route: "economy" },
  { label: "Real GDP growth", value: "5.03%", sub: "Year on year", source: "BPS", year: "2024", route: "economy" },
  { label: "Inflation", value: "1.57%", sub: "Year on year, December", source: "BPS", year: "Dec 2024", route: "prices-jobs" },
  { label: "Unemployment (TPT)", value: "4.76%", sub: "Open unemployment rate", source: "BPS Sakernas", year: "Feb 2025", route: "prices-jobs" },
  { label: "Poverty rate", value: "8.47%", sub: "23.85 million people", source: "BPS Susenas", year: "Mar 2025", route: "living" },
  { label: "Life expectancy", value: "74.15 years", sub: "At birth", source: "BPS", year: "2024", route: "living" },
];

export const GDP_GROWTH_SERIES = [
  { label: "2015", value: 4.876 }, { label: "2016", value: 5.033 },
  { label: "2017", value: 5.070 }, { label: "2018", value: 5.174 },
  { label: "2019", value: 5.019 }, { label: "2020", value: -2.066 },
  { label: "2021", value: 3.703 }, { label: "2022", value: 5.307 },
  { label: "2023", value: 5.049 }, { label: "2024", value: 5.033 },
];

export const TOP_PROVINCES = [
  { name: "West Java", population: 50345200 },
  { name: "East Java", population: 41814500 },
  { name: "Central Java", population: 37892300 },
  { name: "North Sumatra", population: 15588500 },
  { name: "Banten", population: 12431400 },
];

export const TODAY_ITEMS = [
  { text: "Poverty fell to 8.47% in March 2025 — 23.85 million people.", source: "BPS Susenas, Mar 2025" },
  { text: "Unemployment 4.76% in February 2025, down from 4.82% a year earlier.", source: "BPS Sakernas, Feb 2025" },
  { text: "GDP grew 5.03% in 2024 — a decade at ~5% except the 2020 COVID dip.", source: "BPS / World Bank, 2024" },
];
