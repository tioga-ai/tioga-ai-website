import type { Metadata } from "next";
import Link from "next/link";
import { CLAIMS } from "@/lib/claims-register";

// PREVIEW. noindex, kept out of the sitemap, no nav link, until the wording is reviewed.
export const metadata: Metadata = {
  title: "What we claim and how to check it",
  description: "Claims this site makes, where each appears, how to check it, what it does not cover, and when it was last checked.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/proof/claims" },
};

export default function ClaimsPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text)" }}>
      <section className="pt-36 pb-10 px-6 max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: "var(--accent)" }}>
          Claims
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: "var(--text)" }}>
          What we claim, and how to check it.
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
          Each row is a claim this site makes. For each one: where it appears, where you can check it, what it does not
          cover, and the date Tioga last checked it. These are Tioga&apos;s own checks.
        </p>
      </section>
      <section aria-label="Claims register" className="px-6 pb-24 max-w-5xl mx-auto">
        <ol className="list-none p-0 m-0 flex flex-col gap-5">
          {CLAIMS.map((c) => (
            <li key={c.id} data-testid="claim-row" id={c.id} className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-xs uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                Appears on {c.appearsOn} · last checked {c.lastChecked}
              </p>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                {c.claim}
              </h2>
              <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm leading-relaxed m-0">
                <div>
                  <dt className="font-semibold mb-1" style={{ color: "var(--text)" }}>How to check it</dt>
                  <dd className="m-0 flex flex-col gap-1">
                    {c.evidence.map((e) =>
                      e.external ? (
                        <a key={e.href} href={e.href} rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
                          {e.label} →
                        </a>
                      ) : (
                        <Link key={e.href} href={e.href} className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
                          {e.label} →
                        </Link>
                      ),
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold mb-1" style={{ color: "var(--text)" }}>What it does not cover</dt>
                  <dd className="m-0" style={{ color: "var(--text-muted)" }}>{c.limits}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
        <p className="text-sm mt-8" style={{ color: "var(--text-muted)" }}>
          Found something that does not match? <Link href="/contact" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>Tell us</Link>.
        </p>
      </section>
    </main>
  );
}
