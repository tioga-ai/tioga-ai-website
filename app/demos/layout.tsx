import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live AI Demos",
  description:
    "Try Tioga AI's live, interactive demos — document classification, email triage, invoice parsing, MCP enterprise integrations, and more, powered by Claude.",
  alternates: { canonical: "/demos" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Live AI Demos — Tioga AI",
    description:
      "Try my live, interactive AI demos — powered by Claude, not staged screenshots.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live AI Demos — Tioga AI",
    description: "Try my live, interactive AI demos — powered by Claude, not staged screenshots.",
    images: ["/opengraph-image"],
  },
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
