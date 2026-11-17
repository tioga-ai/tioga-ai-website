import type { Metadata } from "next";

// PREVIEW. noindex, kept out of the sitemap (NOINDEX_ROUTES in app/sitemap.ts), no nav or footer link,
// linked from nowhere. The wording is still under counsel and E&O review, so it ships hidden. No price
// figure, no booking link, no duration, no credit terms and no client results belong on this page yet.
export const metadata: Metadata = {
  title: "Report Card",
  description: "A read-only review of one AI agent workflow's recorded runs.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/report-card" },
};

const NOT = [
  "Not an audit, assurance, certification or opinion on your controls.",
  "Not a guarantee of how the agent behaves on other inputs.",
  "Not a replacement for your vendor's own evaluations or your own testing.",
] as const;

const STEPS = [
  "Kickoff call.",
  "Criteria agreed in writing before any run is scored.",
  "People at Tioga AI label each run.",
  "Readout call.",
] as const;

export default function ReportCardPreview() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text)" }}>
      <section className="pt-36 pb-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: "var(--text)" }}>
          Expand, fix or stop: a plain read on one AI agent workflow.
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
          A read-only review of your agent&apos;s recorded runs: how they scored against criteria you agreed, where they
          failed, and what each correct result cost.
        </p>
      </section>

      <section aria-labelledby="get-title" className="px-6 pb-10 max-w-4xl mx-auto">
        <h2 id="get-title" className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>What you get</h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          The rubric. Every scored run with its label and the reason. Written instructions to score the next batch the
          same way. A short report. You keep all of it.
        </p>
      </section>

      <section aria-labelledby="not-title" className="px-6 pb-10 max-w-4xl mx-auto">
        <h2 id="not-title" className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>What this is not</h2>
        <ul className="m-0 pl-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {NOT.map((x) => (<li key={x}>{x}</li>))}
        </ul>
      </section>

      <section aria-labelledby="how-title" className="px-6 pb-10 max-w-4xl mx-auto">
        <h2 id="how-title" className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>How it works</h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>Four steps.</p>
        <ol className="m-0 pl-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {STEPS.map((x) => (<li key={x}>{x}</li>))}
        </ol>
      </section>

      <section aria-labelledby="price-title" className="px-6 pb-24 max-w-4xl mx-auto">
        <h2 id="price-title" className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>Price</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          One fixed fee, agreed in writing before any run is scored.
        </p>
        <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>What sets the fee</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Three things: how many runs (30 is the minimum), how long each run takes to read, and whether a second person
          labels a sample. We state the fee on the kickoff call, after we have seen the shape of your runs.
        </p>
      </section>
    </main>
  );
}
