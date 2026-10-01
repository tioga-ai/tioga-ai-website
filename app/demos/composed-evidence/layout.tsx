import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Composed Evidence Demo — Tioga AI",
  description:
    "Watch one order-finalization request land in a universal AI assistant's log and an ERP's own log — each recording only half the story — then see Tioga's governance layer compose both into one attributable audit record.",
  alternates: { canonical: "/demos/composed-evidence" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Composed Evidence Demo — Tioga AI",
    description:
      "A live, governed write-path demo grounded in a real, vendor-acknowledged gap: neither a universal AI assistant nor an ERP vendor's own execution agent composes the other half of the audit story.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Composed Evidence Demo — Tioga AI",
    description: "A live, governed write-path demo grounded in a real, vendor-acknowledged gap: neither a universal AI assistant nor an ERP vendor's own execution agent composes the other half of the audit story.",
    images: ["/opengraph-image"],
  },
};

export default function ComposedEvidenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
