import { test, expect } from "@playwright/test";

// Hidden preview: noindex, not in the sitemap. Remove those assertions when deliberately published.
// The provider list must match /trust (one shared source).
test("working-with-us is noindex, lists pending items, and matches the trust page providers", async ({ page, request }) => {
  await page.goto("/working-with-us");
  expect(await page.locator('meta[name="robots"]').getAttribute("content")).toContain("noindex");
  await expect(page.getByTestId("stated-item")).toHaveCount(4);
  await expect(page.getByRole("heading", { name: "To be added after review" })).toBeVisible();
  for (const name of ["Anthropic", "Google (Gmail SMTP)", "Vercel", "Cal.com"]) {
    await expect(page.getByText(name, { exact: false }).first()).toBeVisible();
  }
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/working-with-us");
  await page.goto("/trust");
  await expect(page.getByText("Cal.com").first()).toBeVisible();
});
