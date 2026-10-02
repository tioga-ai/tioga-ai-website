import { test, expect } from "@playwright/test";

// Guards for decisions D1a (independence wording) and D10b (homepage claims), 2026-10-02.
// Each assertion fails on the pre-change production site and passes on this branch.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

for (const path of ["/solutions/standing-watch", "/lp/standing-watch"]) {
  test(`${path} does not title itself as independent verification`, async ({ page }) => {
    await page.goto(path);
    const title = await page.title();
    expect(title).not.toMatch(/independent/i);
    expect(title).toMatch(/Cross-Platform/);
  });
}

test("Standing Watch page states that reviews and builds are separate", async ({ page }) => {
  await page.goto("/solutions/standing-watch");
  const text = (await page.locator("body").textContent()) ?? "";
  expect(text).toMatch(/Reviews and builds are separate/);
  expect(text).toMatch(/does not call a control it built independently verified/);
});

test("services and offer chooser no longer promise independent verification", async ({ page }) => {
  await page.goto("/services");
  const services = (await page.locator("body").textContent()) ?? "";
  expect(services).not.toMatch(/need independent verification of what those agents do/);
  await page.goto("/");
  const home = (await page.locator("body").textContent()) ?? "";
  expect(home).not.toMatch(/then adds independent behavioral verification/);
});

test("homepage integrations strip names only systems the site has demos for", async ({ page }) => {
  await page.goto("/");
  const text = (await page.locator("body").textContent()) ?? "";
  expect(text).not.toMatch(/I integrate with your existing enterprise stack/);
  expect(text).toMatch(/Built against demo and test instances, not live client systems/);
  for (const name of ["SharePoint", "Slack", "Microsoft 365"]) {
    await expect(page.getByText(name, { exact: true })).toHaveCount(0);
  }
});

test("MCP page connector-tool count matches the live demo", async ({ page }) => {
  await page.goto("/mcp");
  const text = (await page.locator("body").textContent()) ?? "";
  expect(text).not.toMatch(/10\+/);
  expect(text).toMatch(/example connector tools in the live demo/);
});

test("hero widget shows the same scenario as the demo it links to", async ({ page }) => {
  await page.goto("/");
  const widget = page.getByTestId("hero-demo");
  await expect(widget.getByText("Meridian Steel Supply")).toBeVisible({ timeout: 6000 });
  await expect(widget.getByText(/INV-2214 against PO-4471/)).toBeVisible({ timeout: 6000 });
  await expect(widget.getByText("Meridian Logistics")).toHaveCount(0);
});
