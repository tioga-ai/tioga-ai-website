import type { Metadata } from "next";
import Link from "next/link";
import { STATS, TOTAL_CALLS } from "../../lib/governance-ledger";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "What Tioga AI has actually run and recorded: a dated governed-write run, an excerpt of its own AI call ledger, and the daily production check. Each item says what it is and what it is not.",
  alternates: { canonical: "/proof" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Proof — Tioga AI",
    description: "Dated records from Tioga's own systems, each labelled with what it does and does not show.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof — Tioga AI",
    description: "Dated records from Tioga's own systems, each labelled with what it does and does not show.",
    images: ["/opengraph-image"],
  },
};

// Every fact on this page is taken from a source that already ships on the site (the governed-write
// run record, lib/governance-ledger.ts, .github/workflows/prod-health-check.yml). Nothing here is new
// evidence. If a source changes, change it there; the ledger numbers below are imported, not retyped.

const EVIDENCE = [
  {
    tier: "Real system, synthetic data",
    title: "Governed write against a real Snowflake account",
    date: "2026-07-31",
    shows:
      "3 writes to an open purchase order persisted and were confirmed by re-reading the state afterwards. 2 writes were rejected by policy (a vendor on hold, a closed purchase order). The gateway-to-Snowflake round trip was logged with policy-check and audit-trail data.",
    notShows:
      "Not a client deployment and not a production system. The account was a sandbox created for the run, with seed data. Identifiers are removed from the public record.",
    href: "/solutions/governed-write-path#snowflake-run-2026-07-31",
    cta: "Read the run record",
  },
  {
    tier: "Real data, our own infrastructure",
    title: "Excerpt from Tioga's AI call ledger",
    date: "Captured Sep 8–9 2026",
    shows: `${TOTAL_CALLS} model calls from Tioga's own routing gateway, each with what was requested, what served it, token counts, cost and the pool it was charged to.`,
    notShows:
      "A dated excerpt, not a live feed. It excludes a separate private billing pool. It describes Tioga's own usage, not a client's.",
    href: "/demos/governance-ledger",
    cta: "Open the ledger excerpt",
  },
  {
    tier: "Automated check",
    title: "Daily production check of every live demo",
    date: "Runs daily, 13:00 UTC",
    shows:
      "A scheduled job runs the functional test suite against the live site and calls each demo endpoint, so a retired model or a broken route is found by the job rather than by a visitor. The workflow file and every run are public.",
    notShows:
      "A passing run means the tests passed that day. It does not measure answer quality, and it covers this website only, not any client work.",
    href: "https://github.com/tioga-ai/tioga-ai-website/actions/workflows/prod-health-check.yml",
    cta: "See the workflow and its runs",
    external: true,
  },
] as const;

export default function ProofPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text)" }}>
      <section className="pt-36 pb-12 px-6 max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: "var(--accent)" }}>
          Proof
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: "var(--text)" }}>
          What we have run, and what each record does not show.
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
          Three records from Tioga&apos;s own systems. Each one is dated, each one says what kind of evidence it is,
          and each one says what it should not be read as.
        </p>
      </section>

      <section aria-labelledby="records-title" className="px-6 pb-16 max-w-5xl mx-auto">
        <h2 id="records-title" className="sr-only">
          Records
        </h2>
        <ol className="list-none p-0 m-0 flex flex-col gap-6">
          {EVIDENCE.map((e, i) => (
            <li
              key={e.title}
              data-testid="proof-record"
              className="p-6 rounded-2xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <p className="font-mono text-xs uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")} · {e.tier} · {e.date}
              </p>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                {e.title}
              </h3>
              <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm leading-relaxed m-0">
                <div>
                  <dt className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                    What it shows
                  </dt>
                  <dd className="m-0" style={{ color: "var(--text-muted)" }}>
                    {e.shows}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                    What it does not show
                  </dt>
                  <dd className="m-0" style={{ color: "var(--text-muted)" }}>
                    {e.notShows}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm">
                {"external" in e && e.external ? (
                  <a href={e.href} className="underline underline-offset-2" style={{ color: "var(--accent)" }} rel="noopener noreferrer">
                    {e.cta} →
                  </a>
                ) : (
                  <Link href={e.href} className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
                    {e.cta} →
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ledger-numbers-title" className="px-6 pb-16 max-w-5xl mx-auto">
        <h2 id="ledger-numbers-title" className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Ledger excerpt, in numbers
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
          Imported from the same data file as the ledger page, so the two cannot disagree.
        </p>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-5 py-5" style={{ background: "var(--bg-card)" }}>
              <div className="text-2xl font-bold mb-1" style={{ color: "var(--accent)" }}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </div>
              <div className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="limits-title" className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 id="limits-title" className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Read these records as follows
        </h2>
        <ul className="m-0 pl-5 text-sm leading-relaxed flex flex-col gap-2" style={{ color: "var(--text-muted)" }}>
          <li>They describe Tioga&apos;s own systems and synthetic data. None of them is a client engagement.</li>
          <li>Each is a dated snapshot. A later date on this page means the record was refreshed, not that it updates itself.</li>
          <li>None of them is a guarantee about how an agent will behave in your environment.</li>
        </ul>
        <p className="text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Questions about any record:{" "}
          <Link href="/contact" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
            contact us
          </Link>
          . The change history is in the{" "}
          <Link href="/changelog" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
            build log
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
