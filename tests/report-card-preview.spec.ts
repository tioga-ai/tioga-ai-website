import { test, expect } from "@playwright/test";

// The lead-offer page is a layout preview: it must stay noindex and out of the sitemap
// until the real copy is reviewed (counsel and E&O). Remove this test when the page ships.
test("report-card preview is noindex and not in the sitemap", async ({ page, request }) => {
  await page.goto("/report-card");
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots).toContain("noindex");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/report-card");
});
