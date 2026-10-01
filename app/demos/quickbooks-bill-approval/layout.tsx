import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governed QuickBooks Bill Approval Demo — Tioga AI",
  description:
    "Propose a QuickBooks bill for approval — watch a deterministic policy check it against vendor status and duplicate-bill history, then auto-execute, escalate, block, or catch a self-reported claim against the ledger's ground truth.",
  alternates: { canonical: "/demos/quickbooks-bill-approval" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Governed QuickBooks Bill Approval Demo — Tioga AI",
    description:
      "A live, governed write-path demo for the QuickBooks side of the stack: read, decision, approval, simulated write, audit, rejection.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Governed QuickBooks Bill Approval Demo — Tioga AI",
    description: "A live, governed write-path demo for the QuickBooks side of the stack: read, decision, approval, simulated write, audit, rejection.",
    images: ["/opengraph-image"],
  },
};

export default function QuickbooksBillApprovalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
