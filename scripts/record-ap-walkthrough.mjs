// Records a silent walkthrough of the AP exception browser simulation (/demos/ap-exception-workflow).
// 2026-10-19 website motion review, build 2. The page is the real simulation; a label is burned into the
// frame so the clip can never be mistaken for a live ERP session.
//
//   BASE_URL=http://localhost:3100 OUT_DIR=/path/to/scratch node scripts/record-ap-walkthrough.mjs
//   ffmpeg -i <OUT_DIR>/raw.webm -an -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 31 -preset slow -pix_fmt yuv420p -movflags +faststart ap-exception-walkthrough.mp4
//
// The MP4 is NOT committed (binaries go to the public Blob store, served at /media/).
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR ?? "./out";
fs.mkdirSync(OUT_DIR, { recursive: true });

const LABEL = "Recording of a browser simulation · synthetic data · no Fusion or client connection";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: OUT_DIR, size: { width: 1280, height: 720 } },
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
await page.route("**/_vercel/**", (r) => r.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
await page.goto(`${BASE_URL}/demos/ap-exception-workflow`, { waitUntil: "load" });

await page.addStyleTag({
  content: `#rec-label{position:fixed;top:0;left:0;right:0;z-index:2147483647;padding:10px 16px;font:600 15px/1.2 ui-monospace,Menlo,monospace;background:#221F19;color:#FCFCF9;text-align:center}`,
});
await page.evaluate((t) => {
  const d = document.createElement("div");
  d.id = "rec-label";
  d.textContent = t;
  document.body.appendChild(d);
  document.documentElement.style.scrollPaddingTop = "60px";
}, LABEL);

const pause = (ms) => page.waitForTimeout(ms);
const smoothTo = async (locator) => {
  await locator.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "start" }));
  await pause(900);
};
const click = async (locator) => {
  await smoothTo(locator);
  await pause(500);
  await locator.click();
};
const ledger = page.getByRole("heading", { name: "Audit ledger" });

// Hide dev-only chrome (Next dev indicator) and the chat widget so the frame shows only the simulation.
await page.addStyleTag({ content: `nextjs-portal{display:none!important} [aria-label*="chat" i]{display:none!important}` });

await pause(2500);
await click(page.getByRole("button", { name: /1 — Auto-approved/ }));
await smoothTo(ledger);
await pause(3500);
await click(page.getByRole("button", { name: /2 — Escalated/ }));
await smoothTo(page.getByRole("heading", { name: "Pending human approvals" }));
await pause(2500);
await page.getByRole("button", { name: "Approve", exact: true }).first().click();
await smoothTo(ledger);
await pause(3500);
await click(page.getByRole("button", { name: /5 — Blocked \(vendor on hold\)/ }));
await smoothTo(ledger);
await pause(3500);
await click(page.getByRole("button", { name: /7 — Claimed-vs-actual/ }));
await smoothTo(ledger);
await pause(2500);
await click(page.getByRole("button", { name: "Run reconciliation pass" }));
await pause(4000);
await smoothTo(ledger);
await pause(3500);

const video = page.video();
await ctx.close();
await browser.close();
const raw = path.join(OUT_DIR, "raw.webm");
fs.renameSync(await video.path(), raw);
console.log("saved", raw);
