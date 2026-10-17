import type { Metadata } from "next";
import Link from "next/link";
import { PRACTICES } from "@/lib/practices";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three practices, sixteen priced engagements — systems-led AI automation, agent layers for your existing systems, and AI governance, for businesses on QuickBooks, NetSuite, Salesforce, Oracle Fusion Cloud ERP, Oracle EBS, SAP, or something else.",
  alternates: { canonical: "/services" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Services — Tioga AI",
    description:
      "Three practices, sixteen priced engagements — systems-led AI automation, agent layers for your existing systems, and AI governance, whatever system of record you run.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Tioga AI",
    description: "Three practices, sixteen priced engagements — systems-led AI automation, agent layers for your existing systems, and AI governance, whatever system of record you run.",
    images: ["/opengraph-image"],
  },
};


// One labeled field of a service card. Each field is its own <dl> with a single dt/dd pair, which keeps the
// definition-list markup valid wherever it sits in the grid. Label style follows design.md ("Small caps labels").
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <dl>
      <dt className="text-xs font-mono uppercase tracking-wide" style={{ color: "var(--accent)" }}>{label}</dt>
      <dd className="mt-1">{children}</dd>
    </dl>
  );
}

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text)" }}>
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6" style={{ color: "var(--text)" }}>Services</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed mb-4">
          Tioga AI runs three practices — automating finance and operations, modernizing ERP with an agent layer, and governing enterprise AI. Sixteen engagements sit underneath them, each scoped to deliver a concrete, reviewable output — not a slide deck — with pricing and timelines defined up front.
        </p>
        <p className="text-[var(--text-muted)] text-sm max-w-2xl leading-relaxed mb-16">
          Every engagement below starts with a 5-day{" "}
          <Link href="/discovery-sprint" style={{ color: "var(--accent)" }} className="underline hover:text-[var(--text)] transition-colors">
            Discovery Sprint
          </Link>{" "}
          ($5,000 flat, prototype included) that scopes the work before any larger commitment. If you move forward, the $5,000 is credited toward the price of the engagement below. Not sure yet whether you have a real, provisionable use case? Start with the{" "}
          <Link href="/ai-fit-check" style={{ color: "var(--accent)" }} className="underline hover:text-[var(--text)] transition-colors">
            AI Fit Check
          </Link>{" "}
          instead — one day, $1,500, fully remote, credited in full toward the Sprint if you proceed.
        </p>

        <div className="space-y-16">
          {PRACTICES.map((practice, pi) => (
            <div key={practice.key}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-sm font-mono" style={{ color: "var(--accent)" }}>
                  {String(pi + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{practice.name}</h2>
              </div>
              <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed mb-6">{practice.blurb}</p>
              <div className="space-y-4">
                {practice.offers.map((offer) => (
                  <div
                    key={offer.name}
                    className="p-7 rounded-2xl"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>{offer.name}</h3>
                    <div className="space-y-4" data-testid="service-card-fields">
                      <Field label="What you get">
                        <span className="text-sm text-[var(--text-muted)] leading-relaxed">{offer.desc}</span>
                      </Field>
                      {offer.buyer && (
                        <Field label="Best for">
                          <span className="text-sm text-[var(--text-muted)] leading-relaxed">{offer.buyer}</span>
                        </Field>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                        <Field label="Price">
                          <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{offer.price}</span>
                        </Field>
                        <Field label="Timeline">
                          <span className="text-sm" style={{ color: "var(--text)" }}>{offer.duration}</span>
                        </Field>
                        <Field label="Starts with">
                          <span className="text-sm" style={{ color: "var(--text)" }}>
                            <Link href="/discovery-sprint" className="underline underline-offset-2 hover:text-[var(--accent)] transition-colors">
                              5-day Discovery Sprint
                            </Link>
                            , $5,000 credited
                          </span>
                        </Field>
                      </div>
                      <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                        <Field label="Next step">
                          <Link
                            href={offer.href ?? `/contact?offer=${encodeURIComponent(offer.name)}`}
                            className="text-sm font-medium transition-colors hover:text-[var(--text)]"
                            style={{ color: "var(--accent)" }}
                          >
                            {offer.ctaLabel ?? "Start a conversation about this engagement →"}
                          </Link>
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-7 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>Sample artifacts</h2>
          <p className="text-sm text-[var(--text-muted)] mb-5 max-w-2xl">
            Four sanitized samples of what an engagement actually produces — illustrative data, real format.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/samples/discovery-sprint-scope.html", label: "Discovery sprint scope" },
              { href: "/samples/governance-evidence-excerpt.html", label: "Governance evidence excerpt" },
              { href: "/samples/ai-governance-executive-summary.html", label: "Governance readiness — exec summary" },
              { href: "/samples/weekly-value-report.html", label: "Weekly value report (ongoing engagements)" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-3 rounded-xl transition-colors hover:text-[var(--text)]"
                style={{ background: "var(--bg-dark)", border: "1px solid var(--border)", color: "var(--accent)" }}
              >
                {s.label} →
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
          >
            Start a conversation
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            Not sure where to start?{" "}
            <Link href="/#services" style={{ color: "var(--accent)" }} className="underline underline-offset-2 hover:text-[var(--text)] transition-colors">
              See the three entry-point offers →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
