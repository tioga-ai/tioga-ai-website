import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headcount Forecast Draft, Per-Cell Provenance Demo — Tioga AI",
  description:
    "An agent drafts a headcount-plan update — never a locked/approved version — with every changed line tagged to its source data and stated assumption, and flagged if it feeds a management-review-control-sensitive forecast. A human reviewer approves or rejects each line before the draft-vs-approved diff is final. 100% synthetic data.",
  alternates: { canonical: "/demos/headcount-forecast-draft-provenance" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Headcount Forecast Draft, Per-Cell Provenance Demo — Tioga AI",
    description:
      "Hallucination doesn't silently become a real budget line: every proposed headcount/comp/burden change is traceable to a named input and a named assumption, gated by human review, in a draft that never auto-promotes to the approved budget.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Headcount Forecast Draft, Per-Cell Provenance Demo — Tioga AI",
    description: "Hallucination doesn't silently become a real budget line: every proposed headcount/comp/burden change is traceable to a named input and a named assumption, gated by human review, in a draft that never auto-promotes to the approved budget.",
    images: ["/opengraph-image"],
  },
};

export default function HeadcountForecastDraftProvenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
