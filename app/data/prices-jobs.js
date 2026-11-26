export const CPI_SERIES = [
  { label: "2015", value: 6.363 }, { label: "2016", value: 3.526 },
  { label: "2017", value: 3.809 }, { label: "2018", value: 3.198 },
  { label: "2019", value: 3.031 }, { label: "2020", value: 1.920 },
  { label: "2021", value: 1.560 }, { label: "2022", value: 4.209 },
  { label: "2023", value: 3.669 }, { label: "2024", value: 2.182 },
];

export const INFLATION_TILES = [
  { label: "Inflation (Dec 2024, y/y)", value: "1.57%", sub: "BPS consumer price index, year on year", source: "BPS", year: "Dec 2024" },
  { label: "Inflation (2024 annual avg)", value: "2.182%", sub: "World Bank annual average", source: "World Bank WDI", year: "2024" },
  { label: "CPI, December 2024", value: "106.80", sub: "+0.44% month on month", source: "BPS", year: "Dec 2024" },
  { label: "Bank Indonesia target band", value: "2.5% ±1%", sub: "Inflation target", source: "Bank Indonesia", year: "2024" },
];

export const LABOUR_TILES = [
  { label: "Unemployment (TPT)", value: "4.76%", sub: "Open unemployment rate", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Labour force", value: "153.05 million", sub: "+3.67 million year on year", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Employed", value: "145.77 million", sub: "People in work", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Unemployed", value: "7.28 million", sub: "People without work, seeking work", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Working-age population", value: "216.79 million", sub: "Ages 15 and over", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Formal workers", value: "59.19 million", sub: "40.60% of the employed", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Average monthly wage", value: "Rp3.09 million", sub: "Average wage of employees", source: "BPS Sakernas", year: "Feb 2025" },
  { label: "Unemployment a year earlier", value: "4.82%", sub: "TPT, February 2024", source: "BPS Sakernas", year: "Feb 2024" },
];

// ILO modelled unemployment, World Bank WDI — a modelled series, NOT the BPS headline TPT.
export const ILO_SERIES = [
  { label: "2015", value: 4.514 }, { label: "2016", value: 4.301 },
  { label: "2017", value: 3.783 }, { label: "2018", value: 4.387 },
  { label: "2019", value: 3.590 }, { label: "2020", value: 4.255 },
  { label: "2021", value: 3.827 }, { label: "2022", value: 3.462 },
  { label: "2023", value: 3.308 }, { label: "2024", value: 3.301 },
];

export const WAGE_PANEL = {
  jakarta: { label: "UMP Jakarta (highest provincial)", value: "Rp5,396,761", unit: "per month", source: "Provincial minimum wage (UMP)", year: "2025" },
  centralJava: { label: "UMP Central Java (lowest provincial)", value: "Rp2,169,348", unit: "per month", source: "Provincial minimum wage (UMP)", year: "2025" },
  increase: "Average national UMP increase +6.5% in 2025.",
  youth: "Youth unemployment (ILO modelled): 13.1% in 2024.",
};
