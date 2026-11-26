import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const appDir = join(scriptDir, "app");
const shotsDir = join(scriptDir, "screenshots");

if (!existsSync(appDir)) {
  console.error("app/ directory not found next to main.ts");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
cpSync(appDir, join(outputDir, "app"), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outputDir, "screenshots"), { recursive: true });
}

const dossierBytes = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, "dossier.json"), dossierBytes);
console.log("Indonesia in Numbers: dossier written to " + join(outputDir, "dossier.json"));
