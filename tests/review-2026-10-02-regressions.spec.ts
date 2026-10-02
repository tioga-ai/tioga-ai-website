import { test, expect, type Page } from "@playwright/test";

// Regression guards for three small defects found in the 2026-10-02 site review. Each assertion
// fails on the pre-change production site and passes on this branch.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("the Live email & document triage row on /solutions links to the triage demo", async ({ page }) => {
  await page.goto("/solutions");
  // Workflow rows sit inside collapsed disclosures, so count anchors in the DOM.
  const link = page.locator('a[href="/demos?tab=email"]', { hasText: "Email & document triage" });
  await expect(link).toHaveCount(1);
});

test("/services cards no longer use the dark-theme white border remnant", async ({ page }) => {
  await page.goto("/services");
  const html = await page.content();
  expect(html).not.toMatch(/rgba\(255,\s*255,\s*255,\s*0\.08\)/);
});

async function answerAll(page: Page, label: "Yes" | "No" | "Not sure") {
  const groups = page.getByRole("radiogroup");
  const n = await groups.count();
  expect(n).toBe(12);
  for (let i = 0; i < n; i++) {
    await groups.nth(i).getByRole("radio", { name: label, exact: true }).click();
  }
}

test("exposure check: one unconfirmed answer does not claim every control is in place", async ({ page }) => {
  await page.goto("/demos/agent-write-path-exposure-check");
  await answerAll(page, "Yes");
  await page.getByRole("radiogroup").nth(0).getByRole("radio", { name: "Not sure", exact: true }).click();
  await page.getByRole("button", { name: "See my exposure read" }).click();
  const result = page.getByTestId("wpec-result");
  await expect(result.getByText("Low reported exposure")).toBeVisible();
  const text = (await result.innerText()) ?? "";
  expect(text).not.toMatch(/every control in place/i);
  expect(text).not.toMatch(/You reported the write-path controls in place/i);
  expect(text).toMatch(/You reported no missing write-path controls/i);
});
