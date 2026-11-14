import type { Metadata } from "next";
import RunReplay from "@/components/RunReplay";
import { RUN } from "@/lib/synthetic-run";

// PREVIEW. Not linked from the nav or footer, noindex, kept out of the sitemap. It sits next to the
// lead-offer wording that is still under counsel and E&O review, so it ships hidden until that is
// settled. Synthetic data only (lib/synthetic-run.ts).
export const metadata: Metadata = {
  title: "Run replay (synthetic example)",
  description: "A step-by-step replay of one invented agent run, scored against a written rubric. Synthetic data.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/proof/replay" },
};

export default function ReplayPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text)" }}>
      <section className="pt-36 pb-10 px-6 max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: "var(--accent)" }}>
          Synthetic example
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: "var(--text)" }}>
          Replay one agent run, step by step.
        </h1>
        <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          {RUN.workflow}. Step through what the agent read, what it proposed, which written rule applied, what it did,
          and how a person scored it against a rubric agreed beforehand.
        </p>
        <p className="text-sm leading-relaxed p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
          Everything on this page is invented for illustration. It is not a client run, not a real agent and not a
          measurement of any product. Token counts and rates are made up. One run cannot show how often an agent gets
          it right.
        </p>
      </section>
      <section aria-label="Run replay" className="px-6 pb-24 max-w-4xl mx-auto">
        <RunReplay />
      </section>
    </main>
  );
}
