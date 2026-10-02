import { test, expect } from "@playwright/test";

// Guards for decision D15a (2026-10-02): NIST tag wording matches the site's verified evidence map,
// and the agent register matches the live automation estate. Each assertion fails on the
// pre-change production site and passes on this branch.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("AP exception demo tags the scope check with the verified GOVERN 1.4 wording", async ({ page }) => {
  await page.goto("/demos/ap-exception-workflow");
  await page.getByRole("button", { name: /^1 —/ }).click();
  const body = page.locator("body");
  await expect(body).toContainText("transparent policies, procedures, and other controls", { timeout: 10000 });
  const text = (await body.textContent()) ?? "";
  expect(text).not.toMatch(/GOVERN-1\.4 — documented authorities & scope/);
});

test("QuickBooks demo tags the scope check with the verified GOVERN 1.4 wording", async ({ page }) => {
  await page.goto("/demos/quickbooks-bill-approval");
  await page.getByRole("button", { name: /^1 —/ }).first().click();
  const body = page.locator("body");
  await expect(body).toContainText("transparent policies, procedures, and other controls", { timeout: 10000 });
  const text = (await body.textContent()) ?? "";
  expect(text).not.toMatch(/GOVERN-1\.4 — documented authorities & scope/);
});

test("reach map describes the current 27-job register, not the retired 29", async ({ page }) => {
  await page.goto("/demos/agent-reach-map");
  const text = (await page.locator("body").textContent()) ?? "";
  expect(text).toMatch(/27-job/);
  expect(text).not.toMatch(/29-job/);
});

test("checkpoint walk describes the current 27-agent register", async ({ page }) => {
  await page.goto("/demos/agent-checkpoint-walk");
  const text = (await page.locator("body").textContent()) ?? "";
  expect(text).toMatch(/27/);
  expect(text).not.toMatch(/29 scheduled agents|29-job/);
});
