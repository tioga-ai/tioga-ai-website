import { test, expect } from "@playwright/test";

// The homepage hero no longer mounts the WebGL shader field (review fix 10).
// It renders the static glow instead. The field components stay in the repo
// but are not on the conversion path; this spec guards that they do not
// come back on "/" by accident.

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
  await page.route("**/_vercel/speed-insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  );
});

for (const reducedMotion of [false, true]) {
  test(`home hero has no WebGL canvas (reducedMotion=${reducedMotion})`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));
    if (reducedMotion) await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.getByTestId("hero-field-canvas")).toHaveCount(0);
    await expect(page.locator("canvas")).toHaveCount(0);

    const realErrors = consoleErrors.filter((e) => !e.includes("Extension context invalidated"));
    expect(realErrors, "console errors on /").toEqual([]);
  });
}
