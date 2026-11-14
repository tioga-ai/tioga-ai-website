import { test, expect } from "@playwright/test";

// Hidden preview: noindex, not in the sitemap. Remove those two assertions when deliberately published.
// Every row must carry a date and a limits statement.
test("claims register is noindex and every row has evidence, limits and a date", async ({ page, request }) => {
  await page.goto("/proof/claims");
  expect(await page.locator('meta[name="robots"]').getAttribute("content")).toContain("noindex");
  const rows = page.getByTestId("claim-row");
  expect(await rows.count()).toBeGreaterThanOrEqual(6);
  for (const row of await rows.all()) {
    await expect(row.getByText(/last checked 20\d\d-\d\d-\d\d/)).toBeVisible();
    await expect(row.getByText("What it does not cover")).toBeVisible();
    expect(await row.getByRole("link").count()).toBeGreaterThan(0);
  }
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/proof/claims");
});
