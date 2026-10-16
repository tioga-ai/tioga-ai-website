import { test, expect } from "@playwright/test";

// 2026-10-15: the animated explainer on /solutions/governed-write-path. The text
// version must always be present and match the dated-run record on the page; when
// the clip is enabled (MEDIA_ORIGIN set at build) it must be click-to-play only.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("text version of the explainer is present and states the dated run", async ({ page }) => {
  await page.goto("/solutions/governed-write-path");
  const details = page.locator("details", { hasText: "Read the same explainer as text" });
  await details.locator("summary").click();
  const body = await details.innerText();
  for (const s of [
    "How a governed write reaches the ERP",
    "The agent proposes a change. It does not write.",
    "A block is recorded.",
    "never a direct database write",
    "2026-07-31",
    "3 writes persisted, each re-read to confirm",
    "2 rejected: vendor on hold; closed purchase order",
    "the write ran through a stored procedure, not an ERP application. Not a client system.",
  ]) {
    expect(body, s).toContain(s);
  }
  // The dated record the explainer points to is on the same page.
  await expect(page.locator("#snowflake-run-2026-07-31")).toBeVisible();
});

test("clip, when enabled, never autoplays or loops and is labelled as not a recording", async ({ page }) => {
  await page.goto("/solutions/governed-write-path");
  const video = page.locator("video");
  if ((await video.count()) === 0) test.skip(true, "MEDIA_ORIGIN not set: text-only build");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("preload", "none");
  expect(await video.evaluate((v: HTMLVideoElement) => v.autoplay || v.loop)).toBe(false);
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await expect(page.getByText("not a recording", { exact: false }).first()).toBeVisible();
});

test("explainer fits a 390px phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/solutions/governed-write-path");
  const { doc, vw } = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, vw: window.innerWidth }));
  expect(doc).toBeLessThanOrEqual(vw);
});
