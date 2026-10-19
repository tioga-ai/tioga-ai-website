import { ogCard, OG_SIZE } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "Live AI demos, each labeled for what it is";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Tioga AI · Live demos",
    headline: "Try the demos. Each one says what it really is.",
    facts: ["Live model call", "Browser simulation", "Dated excerpt"],
    label: "No signup. Each demo is labeled live, simulated or a dated excerpt.",
  });
}
