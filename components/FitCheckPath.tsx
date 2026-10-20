import { OFFER_PATH as P } from "@/lib/offer-path";

// Static diagram of the Fit Check -> Discovery Sprint path (server component, no client JS,
// no motion). All prices and the credit window come from lib/offer-path.ts.
export default function FitCheckPath() {
  const box = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "1rem" } as const;
  return (
    <figure data-testid="fit-check-path">
      <ol className="list-none p-0 m-0 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center" aria-label="How the Fit Check leads to a Discovery Sprint">
        <li className="p-5" style={box}>
          <p className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>Step 1</p>
          <p className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>AI Fit Check · {P.fitCheckPrice}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            One day, fully remote, no system access. Written readout within {P.readoutBusinessDays} business days.
          </p>
        </li>
        <li className="hidden md:flex items-center justify-center font-mono text-sm" style={{ color: "var(--text-muted)" }} aria-hidden="true">
          then →
        </li>
        <li className="grid gap-4">
          <div className="p-5" style={{ ...box, borderColor: "var(--accent)" }}>
            <p className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>If the finding is go</p>
            <p className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>Discovery Sprint · {P.sprintPrice}</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              The {P.fitCheckPrice} credits in full, so you pay {P.sprintBalanceAfterCredit} for the Sprint. Credit valid {P.creditDays} days from the readout, and applies when {P.creditTrigger}.
            </p>
          </div>
          <div className="p-5" style={box}>
            <p className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>If no-go, or not yet</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              You keep the readout and the named use case. No obligation to proceed.
            </p>
          </div>
        </li>
      </ol>
      <figcaption className="text-xs mt-3 font-mono" style={{ color: "var(--text-muted)" }}>
        Diagram of the offer terms on this page, not a guarantee of any finding.
      </figcaption>
    </figure>
  );
}
