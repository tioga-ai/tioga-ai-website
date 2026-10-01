import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here. Without
// this file the page inherited the generic /demos title and description.
export const metadata: Metadata = {
  title: "Marble World-Generation Audit — Tioga AI",
  description:
    "A dated trial of World Labs' Marble: two real generations, a byte-level provenance scan, and a real physical measurement — plus the same audit run on NVIDIA Cosmos. An excerpt from a real trial, not Tioga's own infrastructure.",
  alternates: { canonical: "/demos/marble-world-audit" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Marble World-Generation Audit — Tioga AI",
    description:
      "What held up and what didn't when a vendor's AI-generated 3D world was checked against its commercial-use and dimensional-accuracy claims.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marble World-Generation Audit — Tioga AI",
    description:
      "What held up and what didn't when a vendor's AI-generated 3D world was checked against its commercial-use and dimensional-accuracy claims.",
    images: ["/opengraph-image"],
  },
};

export default function MarbleWorldAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
