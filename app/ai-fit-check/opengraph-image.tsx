import { ogCard, OG_SIZE } from "@/lib/og-card";
import { OFFER_PATH } from "@/lib/offer-path";

export const runtime = "nodejs";
export const alt = "The AI Fit Check: flat fee, credited toward the Discovery Sprint";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Tioga AI · The AI Fit Check",
    headline: "Find out whether an AI use case is worth building, before you build it",
    facts: [
      `${OFFER_PATH.fitCheckPrice} flat`,
      `Credited toward the ${OFFER_PATH.sprintPrice} Sprint`,
    ],
    label: `The credit is valid for ${OFFER_PATH.creditDays} days from the readout.`,
  });
}
