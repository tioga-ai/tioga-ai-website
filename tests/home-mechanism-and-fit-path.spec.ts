import { test, expect } from "@playwright/test";

// 2026-10-19 website motion review, builds 1 and 3.
// Build 1: the home headline and the four-step mechanism strip render with JavaScript off.
// Build 3: the Fit Check path diagram uses the same prices as the page FAQ (lib/offer-path.ts).

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test.describe("home, JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

  test("H1 becomes visible without JS and the mechanism strip is in the first 1.5 screens", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1").first();
    await expect(h1).toContainText("AI agents, built and governed in your real systems.");
    // Failsafe reveals the headline after about 1.2 s with no script.
    await expect.poll(async () => Number(await h1.evaluate((e) => getComputedStyle(e).opacity)), { timeout: 5000 }).toBe(1);

    const strip = page.getByTestId("mechanism-strip");
    for (const s of ["01 Propose", "02 Policy check", "03 Approve or block", "04 Write and read back", "2026-07-31"]) {
      await expect(strip, s).toContainText(s);
    }
    const top = await strip.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
    expect(top).toBeLessThan(800 * 1.5);
  });
});

test("home strip text matches the explainer source and the dated run", async ({ page }) => {
  await page.goto("/");
  const strip = page.getByTestId("mechanism-strip");
  await expect(strip).toContainText("The agent proposes a change. It does not write.");
  await expect(strip).toContainText("3 writes persisted, each re-read to confirm");
  await expect(strip).toContainText("2 rejected: vendor on hold; closed purchase order");
  await expect(strip).toContainText("Not a client system");
  // Regression: no missing space between the dated-run label and the first count.
  expect(await strip.innerText()).not.toMatch(/2026-07-31\d/);
});

test("home strip fits a 390px phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const { doc, vw } = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, vw: window.innerWidth }));
  expect(doc).toBeLessThanOrEqual(vw);
});

test("fit check diagram prices equal the FAQ prices", async ({ page }) => {
  await page.goto("/ai-fit-check");
  const diagram = await page.getByTestId("fit-check-path").innerText();
  const faq = await page.locator("dl").innerText();
  for (const price of ["$1,500", "$5,000"]) {
    expect(diagram, price).toContain(price);
    expect(faq, price).toContain(price);
  }
  expect(diagram).toContain("$3,500");
  expect(diagram).toContain("60 days");
  expect(faq).toContain("60 days");
  // Both name the same first-step price and no other dollar figure appears in the diagram.
  const dollars = diagram.match(/\$[\d,]+/g) ?? [];
  expect(new Set(dollars)).toEqual(new Set(["$1,500", "$5,000", "$3,500"]));
  // Regression: JSX once swallowed the space after an interpolated price ("$5,000fee", "for60 days").
  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/\$[\d,]+[A-Za-z]/);
  expect(body).not.toMatch(/\bfor\d/);
});
