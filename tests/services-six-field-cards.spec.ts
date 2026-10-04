import { test, expect } from "@playwright/test";

// Guard for the 2026-10-04 enterprise-lane decision: every engagement on /services is a decision-ready card
// with the same six labeled fields. Fails on the pre-change page (no labels), passes on this branch.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("every service card shows the six fields in order", async ({ page }) => {
  await page.goto("/services");
  const cards = page.getByTestId("service-card-fields");
  const count = await cards.count();
  expect(count).toBe(16);
  for (let i = 0; i < count; i++) {
    const labels = await cards.nth(i).locator("dt").allTextContents();
    // "Best for" is optional in the data model, but all 16 current offers carry it.
    expect(labels).toEqual(["What you get", "Best for", "Price", "Timeline", "Starts with", "Next step"]);
  }
});

test("Starts with links to the Discovery Sprint and Next step keeps the offer link", async ({ page }) => {
  await page.goto("/services");
  const first = page.getByTestId("service-card-fields").first();
  await expect(first.getByRole("link", { name: "5-day Discovery Sprint" })).toHaveAttribute("href", "/discovery-sprint");
  await expect(first.getByRole("link", { name: /Start a conversation about this engagement/ })).toHaveAttribute(
    "href",
    /^\/contact\?offer=/
  );
  // Standing Watch cards keep their own destination.
  const sw = page.getByRole("link", { name: "See the full Standing Watch ladder →" });
  await expect(sw).toHaveCount(3);
  await expect(sw.first()).toHaveAttribute("href", "/solutions/standing-watch");
});
