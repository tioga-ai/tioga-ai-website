import { test, expect } from "@playwright/test";

// 2026-10-19 website motion review, builds 4 to 7.
// 4: per-page Open Graph images. 5: the governed-write-path explainer sits above the "Who this is for" card.
// 6: evidence-map stage stepper (every row stays in the page; the buttons only highlight). 7: demo card stills.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

const OG_ROUTES = ["/solutions/governed-write-path", "/solutions/oracle", "/ai-fit-check", "/demos"];

test.describe("per-page Open Graph images", () => {
  for (const route of OG_ROUTES) {
    test(`${route} points og:image and twitter:image at its own card`, async ({ page, request }) => {
      await page.goto(route);
      const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      const tw = await page.locator('meta[name="twitter:image"]').first().getAttribute("content");
      for (const url of [og, tw]) {
        expect(url, `${route} image meta`).toBeTruthy();
        expect(new URL(url!, "http://x").pathname).toContain(`${route}/opengraph-image`);
      }
      const res = await request.get(`${route}/opengraph-image`);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    });
  }

  test("the site-wide card still serves", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
  });
});

test("governed-write-path: the explainer comes before the 'Who this is for' card", async ({ page }) => {
  await page.goto("/solutions/governed-write-path");
  const explainer = page.getByText("Read the same explainer as text");
  const who = page.getByText("Who this is for");
  await expect(explainer).toBeVisible();
  const [a, b] = await Promise.all([
    explainer.evaluate((e) => e.getBoundingClientRect().top + window.scrollY),
    who.evaluate((e) => e.getBoundingClientRect().top + window.scrollY),
  ]);
  expect(a).toBeLessThan(b);
});

test.describe("evidence-map stepper", () => {
  test("all six stages render with JavaScript off", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/trust/evidence-map");
    await expect(page.locator("[data-stage]")).toHaveCount(6);
    await expect(page.locator("[data-stage]").first()).toContainText("MEASURE 2.4");
    await ctx.close();
  });

  test("a stage button highlights its row, dims the others, and toggles off", async ({ page }) => {
    await page.goto("/trust/evidence-map");
    await page.waitForLoadState("networkidle");
    const btn = page.getByRole("button", { name: /Approve or deny/ });
    await btn.click();
    await expect(btn).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-stage="Approve or deny"]')).toHaveAttribute("data-active", "true");
    await expect(page.locator('[data-stage="Read"]')).toHaveAttribute("data-active", "false");
    expect(Number(await page.locator('[data-stage="Read"]').evaluate((e) => getComputedStyle(e).opacity))).toBeLessThan(1);
    // The dimmed row's content is still in the page.
    await expect(page.locator('[data-stage="Read"]')).toContainText("Art. 12(1)");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator('[data-stage="Read"]')).toHaveAttribute("data-active", "false");
  });
});

test("demos: every featured demo card carries a loaded still with reserved size", async ({ page }) => {
  await page.goto("/demos");
  const stills = page.locator('img[src^="/demos/stills/"]');
  await expect(stills).toHaveCount(17);
  for (let i = 0; i < 17; i++) {
    const img = stills.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute("width", "800");
    await expect(img).toHaveAttribute("height", "450");
    await expect.poll(() => img.evaluate((e: HTMLImageElement) => e.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByRole("link", { name: "Governed AP Exception Workflow" }).first()).toBeVisible();
  await expect(page.getByText("Finance leaders: start with the")).toBeVisible();
});
