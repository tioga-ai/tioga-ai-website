// CI guard: banned public-copy wording from REVIEW.md rule 3 (principal-led practice, never solo or staffing-up language).
// Run: npm run check:wording
// Scans public copy and prompts under app/, lib/ and components/ plus llms.txt. Add a path to ALLOW only with a reason.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "lib", "components"];
const EXTRA_FILES = ["public/llms.txt", "llms.txt"];
const ALLOW = new Set(["app/changelog/page.tsx"]); // history prose may quote old wording
const RULES = [
  { name: "solo practice/run", re: /\bsolo[- ](?:practice|practitioner|run|founder|consultancy)\b/i },
  { name: "at least for now", re: /\bat least for now\b/i },
  { name: "team to staff up", re: /\b(?:team|staff)\s+(?:to\s+)?staff(?:ed)?\s+up\b|\bstaff(?:ing)? up\b/i },
  { name: "one founder", re: /\bone founder\b|\bsingle founder\b/i },
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx|js|jsx|mjs|md|mdx|txt)$/.test(name)) yield p;
  }
}

const files = [];
for (const root of ROOTS) if (existsSync(root)) files.push(...walk(root));
for (const f of EXTRA_FILES) if (existsSync(f)) files.push(f);

const bad = [];
for (const file of files) {
  if (ALLOW.has(file)) continue;
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const r of RULES) if (r.re.test(line)) bad.push(`${file}:${i + 1}: ${r.name}: ${line.trim().slice(0, 120)}`);
  });
}
if (bad.length) {
  console.error('Banned wording found (REVIEW.md rule 3: say "principal-led practice"):\n' + bad.join("\n"));
  process.exit(1);
}
console.log(`check-wording: OK (${files.length} files)`);
