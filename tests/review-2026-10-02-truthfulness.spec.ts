import { test, expect } from "@playwright/test";

// Regression guards for the 2026-10-02 website truthfulness pass (copy only, no demo logic):
// the pulled insurance-evidence offer is no longer promoted, the Governance Ledger says what
// it excludes, Automation Oversight makes no present-tense freshness claim over dated data,
// the Oracle and SAP pages describe what the demos actually are, and the Solutions hub defines
// "Live" to cover dated operational excerpts. Each assertion fails on the pre-change page.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("Governance Ledger no longer promotes the pulled insurance offer and states what it excludes", async ({ page }) => {
  await page.goto("/demos/governance-ledger");
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/insurance renewal/i);
  expect(body).toMatch(/metered gateway pool only/i);
  expect(body).toMatch(/flat-rate personal subscription is deliberately left out/i);
});

test("Automation Oversight makes no present-tense 'every day' claim over dated data", async ({ page }) => {
  await page.goto("/demos/automation-oversight");
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/Every day, a background pass/);
  expect(body).toMatch(/As of Aug 30, 2026/);
});

test("Oracle page describes the Fusion demo as a model-generated sample assessment", async ({ page }) => {
  await page.goto("/solutions/oracle");
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/real automated readiness scan/i);
  expect(body).toMatch(/model-generated sample readiness assessment/i);
});

test("SAP FAQ states design intent and the real extent of the public SAP artifacts", async ({ page }) => {
  await page.goto("/solutions/sap");
  // FAQ answers live inside collapsed disclosures, so assert on the DOM text, not visible text.
  const body = (await page.locator("body").textContent()) ?? "";
  expect(body).not.toMatch(/Tioga's agents integrate through SAP's application\/API layer/);
  expect(body).toMatch(/mock connector and simulations, not a production integration/i);
});

test("Solutions hub defines Live to include dated operational excerpts", async ({ page }) => {
  await page.goto("/solutions");
  const text = (await page.locator("body").textContent()) ?? "";
  expect(text).not.toMatch(/public interactive demonstration on synthetic data is available/);
  expect(text).toMatch(/dated excerpt of Tioga's own operations/);
});
