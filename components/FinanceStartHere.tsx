import Link from "next/link";
import TrackedCTA from "@/components/TrackedCTA";

// "Start here for finance leaders" layer (decision D8a, 2026-10-02). The sixteen-offer catalog
// stays whole at /services; this sits beside the homepage chooser for a CFO or Controller who
// asks "what do I do first?". Two first steps, then four paths. The write-path diagnostic is
// shown as "scoped on request" with no price until the insurance question (D2) is resolved.
const FIRST_STEPS = [
  {
    name: "The AI Fit Check",
    meta: "$1,500 · one day · fully remote",
    desc: "A short paid qualification: a written go / no-go on one workflow, the constraints, and a proposed next step.",
    href: "/ai-fit-check",
    ctaLabel: "Start with the Fit Check",
    event: "cta_finance_fit_check",
  },
  {
    name: "Write-path diagnostic",
    meta: "Scoped on request",
    desc: "A read-only look at one agent-to-ERP write path: what it can change, what stops it, and what record it leaves. No write access, no production changes.",
    href: "/contact",
    ctaLabel: "Ask about a diagnostic",
    event: "cta_finance_write_path_diagnostic",
  },
];

const PATHS = [
  { name: "AP and payments write path", desc: "Agents that approve, release or change payments and vendor records.", href: "/solutions/ap-automation" },
  { name: "Close and reconciliation", desc: "Agent-assisted close and matching work, with an audit trail a controller can read.", href: "/services" },
  { name: "Financial-services governance", desc: "An agent inventory, tiers of autonomy and evidence for a regulated firm.", href: "/solutions/ai-governance" },
  { name: "EU and ISO readiness", desc: "What the EU AI Act and ISO 42001 ask of the agents you already run.", href: "/trust/eu-ai-act" },
];

export default function FinanceStartHere() {
  return (
    <section className="px-6 pb-16 max-w-6xl mx-auto" aria-labelledby="finance-start-here">
      <div className="text-center mb-8">
        <h2 id="finance-start-here" className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Start here for finance leaders
        </h2>
        <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
          Two ways to begin, then four paths. All sixteen engagements stay on the{" "}
          <Link href="/services" className="underline" style={{ color: "var(--accent)" }}>
            full services page
          </Link>
          .
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {FIRST_STEPS.map((step) => (
          <div
            key={step.href}
            className="flex flex-col p-6 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>{step.name}</h3>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-muted)" }}>{step.meta}</p>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
            <TrackedCTA
              href={step.href}
              event={step.event}
              data={{ location: "finance_start_here" }}
              className="px-6 py-3 rounded-xl text-white font-semibold text-sm text-center transition-all hover:opacity-90"
              style={{ background: "var(--accent-dark)" }}
            >
              {step.ctaLabel}
            </TrackedCTA>
          </div>
        ))}
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PATHS.map((path) => (
          <li key={path.name}>
            <Link
              href={path.href}
              className="block h-full p-5 rounded-2xl transition-colors"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <span className="block text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{path.name}</span>
              <span className="block text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{path.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
