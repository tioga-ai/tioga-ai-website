import { ImageResponse } from "next/og";

// Shared 1200x630 card for the per-page opengraph-image routes. Same layout and brand colours as
// app/opengraph-image.tsx; literal hex is required here because Satori cannot resolve var()
// (the CLAUDE.md exception for OG images). Text on each card must match its page.
export const OG_SIZE = { width: 1200, height: 630 };

export type OgCardProps = {
  kicker: string;
  headline: string;
  facts?: string[];
  label: string;
};

export function ogCard({ kicker, headline, facts = [], label }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#F5F3EF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "9999px", background: "#C83406" }} />
          <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "0.08em", color: "#C83406", textTransform: "uppercase" }}>
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ fontSize: "58px", fontWeight: 700, color: "#221F19", lineHeight: 1.15, maxWidth: "1020px" }}>
            {headline}
          </div>
          {facts.length > 0 && (
            <div style={{ display: "flex", gap: "16px" }}>
              {facts.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    padding: "14px 22px",
                    background: "#FCFCF9",
                    border: "2px solid #CDCAC2",
                    borderRadius: "16px",
                    fontSize: "26px",
                    color: "#221F19",
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "24px", color: "#56524A" }}>{label}</div>
          <div style={{ display: "flex", width: "100%", height: "6px", borderRadius: "9999px", background: "linear-gradient(90deg, #C83406, #A50000)" }} />
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
