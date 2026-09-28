import { test, expect } from "@playwright/test";

// Static demo (no LLM, no API): the audit reveals four panels, the fourth
// being the NVIDIA Cosmos "same audit, second vendor" comparison added
// 2026-09-28. Guards against the reveal sequence or the comparison table
// silently dropping, and against an unverified "hosted API" result being
// filled in without a real run.
test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

test("marble audit reveals the Cosmos comparison panel", async ({ page }) => {
  await page.goto("/demos/marble-world-audit");
  const panel4 = page.getByRole("heading", { name: "Same audit, second vendor: NVIDIA Cosmos" });
  await expect(panel4).toBeVisible();
  await expect(page.getByRole("region", { name: /Marble versus NVIDIA Cosmos/ })).toHaveCount(0);

  await page.getByRole("button", { name: "Run the audit" }).click();

  const table = page.getByRole("region", { name: /Marble versus NVIDIA Cosmos/ });
  await expect(table).toBeVisible({ timeout: 10_000 });
  await expect(table.getByRole("columnheader")).toHaveCount(4);
  await expect(table.getByRole("row")).toHaveCount(7); // header + 6 checks
  await expect(table.getByText("Not yet tested: needs a fresh hosted generation.")).toBeVisible();
  await expect(page.getByText(/Second vendor: same result/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Replay the audit" })).toBeVisible();
});
