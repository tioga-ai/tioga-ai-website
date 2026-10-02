import { test, expect } from "@playwright/test";

// Structural checks only — no AI calls, no cost, runs on every push/PR.
// Catches broken pages, broken nav, and the "every page has the same
// <title>" SEO regression found during the 2026-07-27 audit.

const PAGES = [
  { path: "/", title: "Tioga AI — AI Agents, Built and Governed in Your Real Systems" },
  { path: "/services", title: "Services — Tioga AI" },
  { path: "/mcp", title: "MCP Integrations — Tioga AI" },
  { path: "/mcp/vs-custom-integration", title: "MCP vs. Custom Integration — Tioga AI" },
  { path: "/mcp/vs-rpa", title: "MCP vs. RPA — Tioga AI" },
  { path: "/demos", title: "Live AI Demos — Tioga AI" },
  { path: "/demos/governance-ledger", title: "Governance Ledger Demo — Tioga AI" },
  { path: "/demos/ap-exception-workflow", title: "Governed AP Exception Workflow Demo — Tioga AI" },
  { path: "/demos/quickbooks-bill-approval", title: "Governed QuickBooks Bill Approval Demo — Tioga AI" },
  { path: "/demos/capital-equipment-order", title: "Governed Capital Equipment Order Booking Demo — Tioga AI" },
  { path: "/demos/field-service-classification", title: "Governed Field Service Billable Classification Demo — Tioga AI" },
  { path: "/demos/erp-reporting-copilot", title: "ERP Reporting Copilot Demo — Tioga AI" },
  { path: "/demos/composed-evidence", title: "Composed Evidence Demo — Tioga AI" },
  { path: "/demos/fusion-ai-readiness-assessment", title: "Oracle Fusion Cloud AI-Readiness Assessment — Tioga AI" },
  { path: "/demos/agent-autonomy-mapper", title: "Agent Autonomy Tier Mapper — Tioga AI" },
  { path: "/demos/agent-write-path-exposure-check", title: "Agent Write-Path Exposure Check — Tioga AI" },
  { path: "/trust/evidence-map", title: "Agent Action Evidence Map — Tioga AI" },
  { path: "/articles/vendor-governance-is-vendor-evidence", title: "A Vendor's Governance Module Is the Vendor's Evidence About Itself — Tioga AI" },
  { path: "/demos/context-window-data-minimization", title: "Context-Window Data Minimization Demo — Tioga AI" },
  { path: "/demos/timecard-exception-shadow-mode", title: "Timecard Exception Agent, Shadow-Mode Demo — Tioga AI" },
  { path: "/demos/headcount-forecast-draft-provenance", title: "Headcount Forecast Draft, Per-Cell Provenance Demo — Tioga AI" },
  { path: "/about", title: "About — Tioga AI" },
  { path: "/contact", title: "Contact — Tioga AI" },
  { path: "/trust", title: "Trust & Governance — Tioga AI" },
  { path: "/trust/eu-ai-act", title: "EU AI Act Exposure — Tioga AI" },
  { path: "/trust/eu-ai-act/calculator", title: "EU AI Act Readiness Calculator — Tioga AI" },
  { path: "/trust/framework-mapping", title: "NIST AI RMF ↔ ISO 42001 ↔ EU AI Act Mapping — Tioga AI" },
  { path: "/engineering", title: "How I Built It — Tioga AI" },
  { path: "/engineering/invoice-processing", title: "How I Built the Invoice Processing Demo — Tioga AI" },
  { path: "/engineering/email-triage", title: "How I Built the Email Triage Demo — Tioga AI" },
  { path: "/engineering/fusion-ai-readiness-assessment", title: "How I Built the Fusion Cloud AI-Readiness Assessment Demo — Tioga AI" },
  { path: "/showcase", title: "The Gateway Corridor — Tioga AI" },
  { path: "/changelog", title: "Build Log — Tioga AI" },
  { path: "/samples/discovery-sprint-scope.html", title: "Sample: 5-Day Discovery Sprint Scope — Tioga AI" },
  { path: "/samples/governance-evidence-excerpt.html", title: "Sample: Governance Evidence Excerpt — Tioga AI" },
  { path: "/samples/ai-governance-executive-summary.html", title: "Sample: AI Governance Readiness — Executive Summary — Tioga AI" },
  { path: "/samples/weekly-value-report.html", title: "Sample: Weekly Value Report — Tioga AI" },
  { path: "/articles", title: "Articles — Tioga AI" },
  { path: "/articles/governed-write-path-pattern", title: "How a Governed AI Write-Path Actually Works — Tioga AI" },
  { path: "/articles/framework-mapping-not-three-checklists", title: "NIST AI RMF vs. ISO 42001 vs. EU AI Act: One Mapping, Not Three Checklists — Tioga AI" },
  { path: "/articles/mcp-scoped-permissions", title: "MCP Integration Still Needs Approval Gates — Tioga AI" },
  { path: "/articles/migration-complexity-scoring", title: "What Actually Drives Oracle Fusion Cloud AI-Agent Readiness — Tioga AI" },
  { path: "/articles/ai-cost-governance-ledger", title: "What a Real AI Cost-Governance Ledger Looks Like — Tioga AI" },
  { path: "/articles/ap-exception-auto-approve-antipattern", title: "Why 'Auto-Approve Everything Under $X' Is an AP Governance Anti-Pattern — Tioga AI" },
];

for (const { path, title } of PAGES) {
  test(`${path} loads, has correct title, no console errors`, async ({ page }) => {
    // @vercel/analytics's and @vercel/speed-insights's scripts only resolve
    // on real Vercel infra (they're served by the platform, not this app) —
    // every non-Vercel environment (this CI runner, local `next start`)
    // 404s on them, which the X-Content-Type-Options: nosniff header then
    // turns into a second "refused to execute" console error. Stub both so
    // the assertion below still catches real regressions instead of this
    // permanent false positive (confirmed 2026-08-09: broke the suite the
    // moment Analytics was added, then again the moment Speed Insights was
    // added — same root cause, different package).
    await page.route("**/_vercel/insights/**", (route) =>
      route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
    );
    await page.route("**/_vercel/speed-insights/**", (route) =>
      route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
    );

    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    const response = await page.goto(path);
    expect(response?.status(), `${path} should return 200`).toBe(200);
    await expect(page).toHaveTitle(title);

    // Filter out noise that isn't a real regression (e.g. third-party
    // extension warnings) — tighten this list if it gets too permissive.
    const realErrors = consoleErrors.filter(
      (e) => !e.includes("Extension context invalidated")
    );
    expect(realErrors, `console errors on ${path}`).toEqual([]);
  });
}

test("nav links resolve to real destinations", async ({ page }) => {
  await page.goto("/");
  const navLinks = page.locator("nav a[href]");
  const hrefs = await navLinks.evaluateAll((els) =>
    els.map((el) => el.getAttribute("href")).filter(Boolean)
  );
  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs as string[]) {
    if (href.startsWith("mailto:") || href.startsWith("http")) continue;
    const target = href.startsWith("/#") ? "/" : href.split("#")[0] || "/";
    const response = await page.request.get(target);
    expect(response.status(), `nav link ${href} -> ${target}`).toBe(200);
  }
});

test("footer links resolve to real destinations", async ({ page }) => {
  await page.goto("/");
  const footerLinks = page.locator("footer a[href]");
  const hrefs = await footerLinks.evaluateAll((els) =>
    els.map((el) => el.getAttribute("href")).filter(Boolean)
  );

  for (const href of hrefs as string[]) {
    if (href.startsWith("mailto:") || href.startsWith("http")) continue;
    const target = href.startsWith("/#") ? "/" : href.split("#")[0] || "/";
    const response = await page.request.get(target);
    expect(response.status(), `footer link ${href} -> ${target}`).toBe(200);
  }
});

test("SEO files are present and well-formed", async ({ page }) => {
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("<urlset");
  expect(sitemapBody).toContain("<loc>https://tioga.ai/</loc>");

  const og = await page.request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toBe("image/png");
});

test("homepage has unique per-page OG/Twitter metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image"
  );
});

// ---------------------------------------------------------------------------
// Site-integrity checks added after the 2026-10-01 all-pages QA (two models
// read every page's text against measured headers/scripts). Each one pins a
// class of defect that review found, so the copy cannot drift from reality
// again without a test failing:
//   - claims about security/privacy that contradict what the site really does
//   - pages sharing a generic title/description or leaking the homepage's
//     Twitter copy
//   - "live" badges on pages that are browser simulations or dated excerpts
//   - offer counts quoted in copy that no longer match /services
// All plain HTTP fetches (no AI calls, no cost).
// ---------------------------------------------------------------------------

type Req = import("@playwright/test").APIRequestContext;

const ENTITIES: Record<string, string> = {
  "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&rarr;": "→", "&nbsp;": " ",
};

function decode(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&[a-z]+;/gi, (e) => ENTITIES[e.toLowerCase()] ?? e);
}

async function html(request: Req, path: string): Promise<string> {
  const res = await request.get(path);
  expect(res.status(), `GET ${path}`).toBe(200);
  return res.text();
}

async function bodyText(request: Req, path: string): Promise<string> {
  const raw = await html(request, path);
  return decode(
    raw
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
}

async function sitemapPaths(request: Req): Promise<string[]> {
  const body = await (await request.get("/sitemap.xml")).text();
  return Array.from(body.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => new URL(m[1]).pathname);
}

function meta(raw: string, attr: "name" | "property", key: string): string {
  const m = raw.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`));
  return m ? decode(m[1]) : "";
}

test("every page has a unique title, a unique description, and its own social metadata", async ({ request }) => {
  test.setTimeout(120_000);
  const paths = (await sitemapPaths(request)).filter((p) => !p.endsWith(".html"));
  expect(paths.length).toBeGreaterThan(40);
  const seenTitle = new Map<string, string>();
  const seenDesc = new Map<string, string>();
  const problems: string[] = [];
  for (const path of paths) {
    const raw = await html(request, path);
    const title = decode(raw.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const desc = meta(raw, "name", "description");
    const ogTitle = meta(raw, "property", "og:title");
    const twTitle = meta(raw, "name", "twitter:title");
    if (!title) problems.push(`${path}: no <title>`);
    else if (path !== "/" && !title.endsWith("— Tioga AI")) problems.push(`${path}: title lacks the "— Tioga AI" suffix: ${title}`);
    if (seenTitle.has(title)) problems.push(`${path}: title duplicates ${seenTitle.get(title)}: ${title}`);
    seenTitle.set(title, path);
    if (!desc) problems.push(`${path}: no meta description`);
    else if (seenDesc.has(desc)) problems.push(`${path}: description duplicates ${seenDesc.get(desc)}`);
    seenDesc.set(desc, path);
    if (!meta(raw, "property", "og:image")) problems.push(`${path}: no og:image`);
    if (!meta(raw, "name", "twitter:image")) problems.push(`${path}: no twitter:image`);
    if (twTitle !== ogTitle) problems.push(`${path}: twitter:title "${twTitle}" differs from og:title "${ogTitle}"`);
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("unknown URLs return a 404 with their own title and no canonical link", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page).toHaveTitle("Page not found — Tioga AI");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("privacy page discloses the analytics scripts the site actually loads", async ({ page, request }) => {
  const loaded = new Set<string>();
  page.on("request", (r) => {
    if (r.url().includes("/_vercel/insights/")) loaded.add("Vercel Web Analytics");
    if (r.url().includes("/_vercel/speed-insights/")) loaded.add("Speed Insights");
  });
  await page.goto("/");
  await page.waitForTimeout(1500);
  const privacy = await bodyText(request, "/privacy");
  expect(privacy).not.toMatch(/do not run[^.]*third-party analytics/i);
  for (const product of Array.from(loaded)) {
    expect(privacy, `/privacy must disclose ${product}, which the site loads`).toContain(product);
  }
  const trust = await bodyText(request, "/trust");
  if (loaded.size > 0) {
    expect(trust, "/trust sub-processor list must mention Vercel analytics").toMatch(/Vercel[^.]*analytics/i);
  }
});

test("trust page security claims match the real response headers", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  const csp = h["content-security-policy"] ?? "";
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).not.toContain("'unsafe-eval'");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  const trust = await bodyText(request, "/trust");
  if (/script-src[^;]*'unsafe-inline'/.test(csp)) {
    // The policy allows inline scripts, so the page may not claim otherwise.
    expect(trust).not.toMatch(/no inline script execution/i);
    expect(trust).toMatch(/Inline scripts are currently allowed/i);
  }
});

test("quoted offer counts match the engagements listed on /services", async ({ request }) => {
  // bodyText strips <script>, so the Next.js payload that repeats the page
  // content is not double-counted.
  const services = await bodyText(request, "/services");
  const listed =
    (services.match(/Start a conversation about this engagement/g) ?? []).length +
    (services.match(/See the full Standing Watch ladder/g) ?? []).length;
  expect(listed, "engagements listed on /services").toBe(16);
  expect(services).toMatch(/sixteen/i);
  expect(await bodyText(request, "/trust")).toMatch(/Ten of Tioga AI's sixteen engagements/);
});

test("browser-simulation demos are never badged as live", async ({ request }) => {
  test.setTimeout(120_000);
  const demos = (await sitemapPaths(request)).filter((p) => p.startsWith("/demos/"));
  expect(demos.length).toBeGreaterThan(10);
  const problems: string[] = [];
  for (const path of demos) {
    const text = await bodyText(request, path);
    if (/browser simulation/i.test(text) && /live interactive demo/i.test(text)) {
      problems.push(`${path} is a browser simulation but is badged "Live Interactive Demo"`);
    }
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("the governance ledger is described as a dated excerpt, never as live", async ({ request }) => {
  test.setTimeout(120_000);
  const paths = (await sitemapPaths(request)).filter((p) => p !== "/changelog" && !p.endsWith(".html"));
  const problems: string[] = [];
  for (const path of paths) {
    const text = await bodyText(request, path);
    if (/\blive (governance )?ledger\b/i.test(text)) problems.push(`${path} calls the ledger "live"`);
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("NIST MEASURE 2.7 (security and resilience) is not used to describe behavior monitoring", async ({ request }) => {
  // Production behavior monitoring is MEASURE 2.4 in the NIST AI RMF; 2.7 is
  // AI system security and resilience. The wrong tag was on several pages.
  test.setTimeout(120_000);
  const paths = (await sitemapPaths(request)).filter((p) => !p.endsWith(".html"));
  const problems: string[] = [];
  for (const path of paths) {
    const text = await bodyText(request, path);
    if (/MEASURE[- ]2\.7[^.]{0,60}(behavio|monitor|reconcil)/i.test(text)) {
      problems.push(`${path} tags behavior monitoring as MEASURE 2.7`);
    }
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("legal pages name demos that exist", async ({ request }) => {
  for (const path of ["/privacy", "/terms"]) {
    expect(await bodyText(request, path), path).not.toMatch(/migration assessment/i);
  }
});

// Wording fixed in the 2026-10-01 follow-up QA pass. Each assertion pins one
// statement that was checked against the code or a primary source, so it
// cannot drift back.
test("follow-up QA wording fixes stay in place", async ({ request }) => {
  test.setTimeout(120_000);

  // The free call is the "20-minute intro call"; "Discovery" is the paid Sprint.
  for (const path of ["/showcase", "/demos/agent-reach-map", "/demos/agent-checkpoint-walk", "/demos/field-service-classification"]) {
    const text = await bodyText(request, path);
    expect(text, path).not.toMatch(/discovery call gets you a scoped assessment/i);
    expect(text, path).not.toMatch(/book a discovery call/i);
  }

  // The MCP demo runs on mock data and covers SAP, Workday and Salesforce; its
  // rate limit is 20 requests per 24 hours, held in memory (lib/rate-limit.ts).
  const mcpHtml = await html(request, "/mcp");
  expect(meta(mcpHtml, "name", "description")).not.toMatch(/ServiceNow/);
  expect(meta(mcpHtml, "name", "description")).toMatch(/mock data/i);
  const mcp = await bodyText(request, "/mcp");
  expect(mcp).toMatch(/mock SAP, Workday, and Salesforce/);
  expect(mcp).not.toMatch(/MCP handles auth and routing/);
  const scoped = await bodyText(request, "/articles/mcp-scoped-permissions");
  expect(scoped).toMatch(/20 requests per 24 hours/);
  expect(scoped).not.toMatch(/hard per-IP/i);

  // NIST AI RMF: GOVERN 1.5 is ongoing monitoring/review, not scope enforcement.
  const mapping = await bodyText(request, "/articles/framework-mapping-not-three-checklists");
  expect(mapping).not.toMatch(/GOVERN[- ]1\.5[^.]{0,60}(scope|authorit)/i);

  // Internal roadmap jargon stays out of public demo copy (the changelog is history).
  for (const path of ["/demos/fusion-ai-readiness-assessment", "/demos/ap-exception-workflow", "/engineering/fusion-ai-readiness-assessment"]) {
    expect(await bodyText(request, path), path).not.toMatch(/Phase B/);
  }

  // Articles that cite data newer than their publish date say so.
  for (const path of ["/articles/ai-cost-governance-ledger", "/articles/who-runs-your-ai"]) {
    expect(await bodyText(request, path), path).toMatch(/Updated September 2026/);
  }

  // About: the heading must match the three items under it, and the practice is one person.
  const about = await bodyText(request, "/about");
  expect(about).not.toMatch(/Dual fluency/);
  expect(about).not.toMatch(/held by the same team/);

  // The MCP-vs-custom CTA links where its text says it does.
  const vs = await html(request, "/mcp/vs-custom-integration");
  expect(vs).not.toMatch(/href="\/engineering\/fusion-ai-readiness-assessment"[^>]*>\s*MCP demo/);
});

// Final QA batch (2026-10-01): items whose right answer is fixed by code or by a
// consistency rule, pinned so they cannot drift back.
test("final QA wording and consistency fixes stay in place", async ({ request }) => {
  test.setTimeout(120_000);

  // Legal: do not assert a fictitious-business-name filing the site cannot back up.
  const terms = await bodyText(request, "/terms");
  expect(terms).not.toMatch(/doing business as/i);
  expect(terms).toMatch(/operates the Tioga AI brand/);

  // Privacy: the chat route stores nothing and the widget keeps no history outside the tab.
  const privacy = await bodyText(request, "/privacy");
  expect(privacy).toMatch(/lives only in your open browser tab/);
  expect(privacy).not.toMatch(/not stored after your browser session ends/);

  // Ledger: the one free-pool call carried a small cost, so none settle at exactly $0 —
  // every page that quotes that must say why instead of printing a bare "0 of 16 (0%)".
  for (const path of ["/showcase", "/engineering/governance-ledger", "/articles/ai-cost-governance-ledger"]) {
    const text = await bodyText(request, path);
    expect(text, path).toMatch(/carried (a small cost|\$\s*0\.\d+)/);
    expect(text, path).not.toMatch(/\(\s*0\s*%\s*\)/);
  }

  // One vocabulary for the Fit Check outcome, positioning that matches the three practices,
  // and a catalog sentence that does not claim to be complete.
  expect(await bodyText(request, "/")).not.toMatch(/proceed \/ revise \/ stop/);
  expect(await bodyText(request, "/solutions/ai-governance")).not.toMatch(/actual center of Tioga/);
  expect(await bodyText(request, "/demos")).not.toMatch(/full, current catalog/);

  // The spend meter on the simulated governed-write demos is labeled as simulated.
  for (const path of ["/demos/ap-exception-workflow", "/demos/quickbooks-bill-approval", "/demos/capital-equipment-order", "/demos/field-service-classification"]) {
    const text = await bodyText(request, path);
    expect(text, path).toMatch(/Simulated model spend/);
    expect(text, path).toMatch(/illustrative cap/);
  }

  // Standing Watch: the deferred item is about a remote session, not the automation's reach.
  const watch = await bodyText(request, "/demos/standing-watch");
  expect(watch).not.toMatch(/the automation has no path to enable this itself/);
});
