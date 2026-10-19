import { ogCard, OG_SIZE } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "AI agents for Oracle Fusion Cloud ERP and EBS: browser simulation on synthetic data";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Tioga AI · Oracle Fusion Cloud ERP & EBS",
    headline: "AI agents for Oracle, without the rip-and-replace",
    facts: ["Browser simulation", "Synthetic data", "No Fusion connection"],
    label: "The demo on this page is a simulation, not a run against Oracle.",
  });
}
