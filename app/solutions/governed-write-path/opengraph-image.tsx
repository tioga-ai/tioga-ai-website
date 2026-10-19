import { ogCard, OG_SIZE } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = "Governed write-path for AI agents: dated sandbox run, 3 writes persisted, 2 rejected";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Tioga AI · Governed write-path",
    headline: "How an AI agent writes to your ERP, with a gate, a log and a rollback",
    facts: ["3 writes persisted", "2 writes rejected", "Run dated 2026-07-31"],
    label: "Snowflake sandbox run record, read back after each write. Not a client result.",
  });
}
