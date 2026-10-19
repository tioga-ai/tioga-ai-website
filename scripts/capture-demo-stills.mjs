// Captures the above-the-fold still of each featured demo, for the /demos cards.
// 2026-10-19 website motion review, build 7. The stills are screenshots of the real demo pages
// (not mockups), 1200x675, converted to WebP and committed under public/demos/stills/ (small files).
//
//   BASE_URL=http://localhost:3100 OUT_DIR=/path/to/scratch node scripts/capture-demo-stills.mjs
//   cwebp -q 80 -resize 800 0 <OUT_DIR>/<name>.png -o public/demos/stills/<name>.webp
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR ?? "./out";
fs.mkdirSync(OUT_DIR, { recursive: true });

const DEMOS = [
  ["standing-watch", "/demos/standing-watch"],
  ["governance-ledger", "/demos/governance-ledger"],
  ["ap-exception-workflow", "/demos/ap-exception-workflow"],
  ["fusion-ai-readiness-assessment", "/demos/fusion-ai-readiness-assessment"],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 675 }, reducedMotion: "reduce" });
const page = await ctx.newPage();
await page.route("**/_vercel/**", (r) => r.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
for (const [name, url] of DEMOS) {
  await page.goto(`${BASE_URL}${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`) });
  console.log("captured", name);
}
await browser.close();
