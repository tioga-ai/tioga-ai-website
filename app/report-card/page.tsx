import type { Metadata } from "next";

// PREVIEW LAYOUT ONLY. Not linked from the nav, footer or sitemap; noindex.
// Section structure follows the 2026-11-13 launch review (page outline for the lead offer).
// Every section body is a neutral placeholder on purpose: the buyer wording is still on hold
// (counsel not engaged, E&O not bound), so no offer text, scope, price or data-handling language
// belongs in this public repo yet. Real copy is added in a separate, reviewed change.
export const metadata: Metadata = {
  title: "Report Card (layout preview)",
  description: "Layout preview. Content pending review.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/report-card" },
};

const SECTIONS = [
  "What this is not",
  "Scope",
  "How it works",
  "What you receive",
  "A sample (synthetic)",
  "Price",
  "Data handling",
  "Who is behind it",
  "Questions",
];

export default function ReportCardPreview() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p
        className="text-xs uppercase tracking-wide font-mono mb-6"
        style={{ color: "var(--accent)" }}
      >
        Layout preview, not published content
      </p>
      <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
        Headline pending review
      </h1>
      <p className="text-xl mb-12" style={{ color: "var(--text-muted)" }}>
        One-sentence description pending review.
      </p>

      <ol className="space-y-6">
        {SECTIONS.map((title, i) => (
          <li
            key={title}
            className="p-6 rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{
                color: "var(--text-muted)",
                background: "var(--bg-dark)",
                border: "1px solid var(--border)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-lg font-bold mt-3 mb-2">{title}</h2>
            <p style={{ color: "var(--text-muted)" }}>Content pending review.</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
