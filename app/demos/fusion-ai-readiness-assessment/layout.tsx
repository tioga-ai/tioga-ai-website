import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oracle Fusion Cloud AI-Readiness Assessment — Tioga AI",
  description:
    "Answer a few questions about your Oracle Fusion Cloud ERP environment and get a sample AI-agent-readiness assessment — role/security scope, REST API discipline, audit trail, and human-approval gates — generated in about 60 seconds.",
  alternates: { canonical: "/demos/fusion-ai-readiness-assessment" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Oracle Fusion Cloud AI-Readiness Assessment — Tioga AI",
    description: "How ready is your Fusion Cloud ERP environment to safely run governed AI agents against it?",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oracle Fusion Cloud AI-Readiness Assessment — Tioga AI",
    description: "How ready is your Fusion Cloud ERP environment to safely run governed AI agents against it?",
    images: ["/opengraph-image"],
  },
};

export default function FusionAiReadinessAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
