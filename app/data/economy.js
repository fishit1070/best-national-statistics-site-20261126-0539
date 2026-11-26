export const GDP_TILES = [
  { label: "GDP (nominal, BPS)", value: "Rp22,139.0 trillion", sub: "Current prices", source: "BPS", year: "2024" },
  { label: "GDP (nominal, World Bank)", value: "US$1.396 trillion", sub: "Exact: US$1,396,301,788,462", source: "World Bank WDI", year: "2024" },
  { label: "GDP per capita (BPS)", value: "US$4,960.3", sub: "Nominal, current US$", source: "BPS", year: "2024" },
  { label: "GDP per capita (World Bank)", value: "US$4,925.44", sub: "Nominal, current US$", source: "World Bank WDI", year: "2024" },
  { label: "GDP per capita, PPP", value: "US$16,472", sub: "PPP, current international $", source: "World Bank WDI", year: "2024" },
  { label: "GNI per capita, Atlas", value: "US$4,910", sub: "Atlas method, current US$", source: "World Bank WDI", year: "2024" },
  { label: "Real GDP growth", value: "5.03%", sub: "BPS figure for 2024", source: "BPS", year: "2024" },
  { label: "Household consumption", value: "54.04%", sub: "Share of GDP", source: "BPS", year: "2024" },
];

export const SECTORS = [
  { label: "Manufacturing", value: 18.98 },
  { label: "Wholesale & retail trade", value: 13.07 },
  { label: "Agriculture, forestry & fishing", value: 12.61 },
  { label: "Construction", value: 10.09 },
  { label: "Mining & quarrying", value: 9.15 },
  { label: "All other sectors", value: 36.10 },
];

export const GROWTH_SERIES = [
  { label: "2015", value: 4.876 }, { label: "2016", value: 5.033 },
  { label: "2017", value: 5.070 }, { label: "2018", value: 5.174 },
  { label: "2019", value: 5.019 }, { label: "2020", value: -2.066 },
  { label: "2021", value: 3.703 }, { label: "2022", value: 5.307 },
  { label: "2023", value: 5.049 }, { label: "2024", value: 5.033 },
];

// Per-year comparison table. Growth: World Bank annual %; population: World Bank total;
// inflation: World Bank annual average %. 2015–2019 inflation from the verified series;
// 2020–2024 from the same series (1.920, 1.560, 4.209, 3.669, 2.182).
export const COMPARE_YEARS = [
  { year: 2015, growth: 4.876, population: 261799249, inflation: 6.363 },
  { year: 2016, growth: 5.033, population: 264627418, inflation: 3.526 },
  { year: 2017, growth: 5.070, population: 267346658, inflation: 3.809 },
  { year: 2018, growth: 5.174, population: 269951846, inflation: 3.198 },
  { year: 2019, growth: 5.019, population: 272489381, inflation: 3.031 },
  { year: 2020, growth: -2.066, population: 274814866, inflation: 1.920 },
  { year: 2021, growth: 3.703, population: 276758053, inflation: 1.560 },
  { year: 2022, growth: 5.307, population: 278830529, inflation: 4.209 },
  { year: 2023, growth: 5.049, population: 281190067, inflation: 3.669 },
  { year: 2024, growth: 5.033, population: 283487931, inflation: 2.182 },
];
