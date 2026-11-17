import { test, expect } from "@playwright/test";

// Hidden preview: noindex, not in the sitemap, no price figure. Remove those assertions when deliberately published.
test("report-card preview is noindex, has the headline, shows no price and is not in the sitemap", async ({ page, request }) => {
  const res = await page.goto("/report-card");
  expect(res?.status()).toBe(200);
  expect(await page.locator('meta[name="robots"]').getAttribute("content")).toContain("noindex");
  await expect(page.getByRole("heading", { level: 1, name: "Expand, fix or stop: a plain read on one AI agent workflow." })).toBeVisible();
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/\$\s?\d/);
  expect(text.toLowerCase()).not.toContain("independent");
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/report-card");
});
