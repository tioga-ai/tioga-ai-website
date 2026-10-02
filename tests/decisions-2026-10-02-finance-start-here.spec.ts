import { test, expect } from "@playwright/test";

// Guard for decision D8a (2026-10-02): the homepage has a "Start here for finance leaders" layer.
// Fails on the pre-change production site, passes on this branch.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("homepage shows the finance-leader start layer with two first steps and four paths", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Start here for finance leaders" });
  await expect(section).toBeVisible();
  await expect(section.getByRole("link", { name: "Start with the Fit Check" })).toHaveAttribute("href", "/ai-fit-check");
  await expect(section.getByRole("link", { name: "Ask about a diagnostic" })).toHaveAttribute("href", "/contact");
  for (const name of [
    "AP and payments write path",
    "Close and reconciliation",
    "Financial-services governance",
    "EU and ISO readiness",
  ]) {
    await expect(section.getByRole("link", { name: new RegExp(name) })).toBeVisible();
  }
});

test("the write-path diagnostic shows no price until insurance coverage is confirmed", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Start here for finance leaders" });
  await expect(section.getByText("Scoped on request")).toBeVisible();
  const text = (await section.textContent()) ?? "";
  expect(text).not.toMatch(/\$8,000|\$12,000|\$8K|\$12K/);
});

test("the finance-leader layer links resolve", async ({ page, request }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Start here for finance leaders" });
  const hrefs = await section.getByRole("link").evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).getAttribute("href")));
  expect(hrefs.length).toBeGreaterThanOrEqual(7);
  for (const href of hrefs.filter((h): h is string => !!h && h.startsWith("/"))) {
    const res = await request.get(href);
    expect(res.status(), href).toBeLessThan(400);
  }
});
