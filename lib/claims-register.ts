// Public claims register. One row per claim the site makes, with where it appears, how to check it,
// what it does not cover, and when it was last checked. Add a row only after checking the evidence
// yourself; update lastChecked only when you re-check. Do not add client data or unverified claims.

export interface Claim {
  id: string;
  claim: string;
  appearsOn: string;
  evidence: { label: string; href: string; external?: boolean }[];
  limits: string;
  lastChecked: string;
}

export const CLAIMS: Claim[] = [
  {
    id: "no-retention",
    claim: "Tioga does not retain demo or chat submissions after the response is generated.",
    appearsOn: "/privacy, /trust",
    evidence: [{ label: "Privacy Policy, endpoint by endpoint", href: "/privacy" }],
    limits:
      "Describes what Tioga stores. The text is also sent to Anthropic, which handles it under its own retention terms. That is outside Tioga's control and is not covered by this claim.",
    lastChecked: "2026-11-13",
  },
  {
    id: "headers",
    claim: "The site sends a Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff and a Permissions-Policy that blocks camera, microphone and location.",
    appearsOn: "/trust",
    evidence: [{ label: "Response headers of any page (browser developer tools, Network tab)", href: "/trust" }],
    limits:
      "Checked on the home page. The policy still allows inline scripts, which Next.js needs today. A stricter nonce-based policy is not in place.",
    lastChecked: "2026-11-13",
  },
  {
    id: "rate-limit",
    claim: "Per-IP rate limiting on demo and API endpoints is a speed bump against casual abuse, not a hard boundary.",
    appearsOn: "/trust",
    evidence: [
      { label: "Source: lib/rate-limit.ts", href: "https://github.com/tioga-ai/tioga-ai-website/blob/main/lib/rate-limit.ts", external: true },
    ],
    limits:
      "The counter is held in server memory, resets on a restart and is not shared across servers. A determined caller can get around it.",
    lastChecked: "2026-11-13",
  },
  {
    id: "daily-check",
    claim: "A scheduled job runs the functional tests against the live site every day and calls each demo endpoint.",
    appearsOn: "/proof",
    evidence: [
      {
        label: "Workflow file and run history",
        href: "https://github.com/tioga-ai/tioga-ai-website/actions/workflows/prod-health-check.yml",
        external: true,
      },
    ],
    limits:
      "A passing run means the tests passed that day. It does not measure answer quality and covers this website only, not any client work.",
    lastChecked: "2026-11-13",
  },
  {
    id: "snowflake-run",
    claim: "On 2026-07-31 the governed-write pattern persisted 3 writes and rejected 2 against a real Snowflake sandbox account.",
    appearsOn: "/solutions/governed-write-path, /proof",
    evidence: [{ label: "Dated run record", href: "/solutions/governed-write-path#snowflake-run-2026-07-31" }],
    limits:
      "A sandbox account created for the run, with seed data. Not a client deployment. Identifiers are removed. The record was written from the run's verification notes, not from a preserved raw log.",
    lastChecked: "2026-11-13",
  },
  {
    id: "ledger-excerpt",
    claim: "The ledger excerpt is real data from Tioga's own AI routing gateway, captured Sep 8–9 2026.",
    appearsOn: "/demos/governance-ledger, /showcase",
    evidence: [{ label: "Ledger excerpt", href: "/demos/governance-ledger" }],
    limits:
      "A dated excerpt, not a live feed. It leaves out a separate private billing pool. It describes Tioga's own usage, not a client's.",
    lastChecked: "2026-11-13",
  },
];
