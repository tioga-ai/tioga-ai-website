// CI guard: raw Claude model IDs may appear only in lib/models.ts (and the changelog's history prose).
// Run: npm run check:models
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "lib", "components"];
const ALLOW = new Set(["lib/models.ts", "app/changelog/page.tsx"]);
const RE = /claude-(?:haiku|sonnet|opus)-\d[\w.-]*/g;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(name)) yield p;
  }
}

const bad = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (ALLOW.has(file)) continue;
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      const m = line.match(RE);
      if (m) bad.push(`${file}:${i + 1}: ${m.join(", ")}`);
    });
  }
}
if (bad.length) {
  console.error("Raw model IDs found; import them from lib/models.ts instead:\n" + bad.join("\n"));
  process.exit(1);
}
console.log("check-model-ids: OK");
