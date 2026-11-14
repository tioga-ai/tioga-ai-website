import { test, expect } from "@playwright/test";

// The replay page is a hidden preview: noindex, not in the sitemap, labelled synthetic.
// Remove the noindex/sitemap assertions when the page is deliberately published.
test("run replay is noindex, labelled synthetic, and steps through to the rubric", async ({ page, request }) => {
  await page.goto("/proof/replay");
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots).toContain("noindex");
  await expect(page.getByText("invented for illustration")).toBeVisible();
  for (let n = 0; n < 5; n++) await page.getByRole("button", { name: "Next step" }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByText("3 of 4 criteria met")).toBeVisible();
  await expect(page.getByRole("button", { name: "Next step" })).toBeDisabled();
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/proof/replay");
});
