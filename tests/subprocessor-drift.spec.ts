import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Drift guard for the Trust Center claim "Exactly four external parties ever
// touch your data". Upstash and Postmark code paths exist but are env-gated
// off. If a new third-party integration appears in app/ or lib/, or the
// trust-page list changes size, this fails so the Trust Center and Privacy
// Policy get updated in the same PR. File-only check: it does not read
// production env, so it cannot tell whether a gated service is switched on.
const ROOT = path.resolve(__dirname, "..");
const KNOWN_GATED = new Set([
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "POSTMARK_INBOUND_BASIC_AUTH_USER",
  "POSTMARK_INBOUND_BASIC_AUTH_PASS",
]);
const THIRD_PARTY_ENV = /process\.env\.([A-Z0-9_]*(?:UPSTASH|POSTMARK|SENDGRID|RESEND|MAILGUN|TWILIO|SEGMENT|MIXPANEL|POSTHOG|SENTRY|DATADOG|OPENAI|GEMINI|STRIPE)[A-Z0-9_]*)/g;

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

test("no new third-party integration appears without a Trust Center update", () => {
  const found = new Set<string>();
  for (const dir of ["app", "lib", "components"]) {
    const d = path.join(ROOT, dir);
    if (!fs.existsSync(d)) continue;
    for (const f of walk(d)) {
      for (const m of fs.readFileSync(f, "utf8").matchAll(THIRD_PARTY_ENV)) found.add(m[1]);
    }
  }
  const unknown = [...found].filter((v) => !KNOWN_GATED.has(v));
  expect(unknown, `New third-party env vars ${unknown.join(", ")}: update app/trust/page.tsx SUBPROCESSORS, the "Exactly four" wording and /privacy, then add here.`).toEqual([]);
});

test("trust page still lists exactly four sub-processors and says so", () => {
  const src = fs.readFileSync(path.join(ROOT, "app/trust/page.tsx"), "utf8");
  const block = src.match(/const SUBPROCESSORS = \[([\s\S]*?)\n\];/);
  expect(block).not.toBeNull();
  expect((block![1].match(/name:/g) || []).length).toBe(4);
  expect(src).toContain("Exactly four external parties");
});
