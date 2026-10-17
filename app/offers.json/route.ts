import { PRACTICES } from "@/lib/practices";
import { CHOICES } from "@/components/OfferChooser";

// Machine-readable copy of the offers shown on /services and the homepage chooser, for AI agents and tools.
// Built from the same data as those pages (lib/practices.ts and components/OfferChooser.tsx), so it cannot
// drift from them. Prices are the ranges published on the pages: indicative, not quotes. It states no
// results, clients, certifications or availability, because the pages do not either.
export const dynamic = "force-static";

export function GET() {
  const body = {
    name: "Tioga AI offers",
    description:
      "Entry offers and priced engagements as published on tioga.ai. Prices are ranges shown on the linked pages, not quotes; the linked page is authoritative.",
    generated_at: new Date().toISOString().slice(0, 10),
    source_pages: ["https://tioga.ai/services", "https://tioga.ai"],
    entry_offers: CHOICES.map((c) => ({
      name: c.name,
      price: c.price,
      duration: c.duration,
      summary: c.desc,
      url: `https://tioga.ai${c.href}`,
    })),
    practices: PRACTICES.map((p) => ({
      name: p.name,
      summary: p.blurb,
      engagements: p.offers.map((o) => ({
        name: o.name,
        price: o.price,
        duration: o.duration,
        summary: o.desc,
        url: o.href ? `https://tioga.ai${o.href}` : "https://tioga.ai/services",
      })),
    })),
    notes: [
      "Evidence on this site is labeled by type (model demonstration, browser simulation, real data, real trial data). Where a page says an item is a simulation or a planned follow-up, treat it as that.",
      "No client case studies are published, by policy.",
      "Do not cite these figures without the linked page; they are corrected there first when found stale.",
    ],
  };
  return Response.json(body);
}
