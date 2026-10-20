import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import fs from "node:fs";

// 2026-10-19 website motion review, build 2: the AP exception walkthrough clip.
// The player only renders when MEDIA_ORIGIN is set at build (same gate as the governed-write explainer);
// the repo-level checks always run.

test("no video binaries are tracked in git, and the poster is small", () => {
  const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n");
  // Two older standing-watch hero files are already tracked; this clip must never join them.
  const media = tracked.filter((f) => /ap-exception-walkthrough|ap-walkthrough.*\.(mp4|webm|mov)$/i.test(f));
  expect(media, "binaries belong in the Blob store, not git").toEqual([]);
  expect(fs.statSync("public/explainers/ap-walkthrough-poster.jpg").size).toBeLessThanOrEqual(100 * 1024);
});

for (const path of ["/demos/ap-exception-workflow", "/solutions/oracle", "/solutions/ap-automation"]) {
  test(`walkthrough on ${path} is click-to-play, labelled, and never autoplays`, async ({ page }) => {
    await page.route("**/_vercel/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
    await page.goto(path);
    const video = page.locator("video[aria-label='Walkthrough of the AP exception simulation']");
    if ((await video.count()) === 0) test.skip(true, "MEDIA_ORIGIN not set: text-only build");
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("preload", "none");
    expect(await video.evaluate((v: HTMLVideoElement) => v.autoplay || v.loop || !v.paused)).toBe(false);
    expect(await video.locator("source").getAttribute("src")).toMatch(/^\/media\/ap-exception-walkthrough\.mp4$/);
    const caption = await page.getByTestId("ap-walkthrough").innerText();
    expect(caption).toContain("browser simulation");
    expect(caption).toContain("synthetic data");
    expect(caption).toContain("no Fusion or client connection");
  });
}

test("the simulation still works with the walkthrough slot in place", async ({ page }) => {
  await page.route("**/_vercel/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
  await page.goto("/demos/ap-exception-workflow");
  await page.getByRole("button", { name: /1 — Auto-approved/ }).click();
  await expect(page.getByText("executed").first()).toBeVisible();
});
