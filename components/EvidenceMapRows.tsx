"use client";

import { useState } from "react";

export interface EvidenceRef {
  id: string;
  text: string;
}

export interface EvidenceRow {
  stage: string;
  keep: string;
  nist: EvidenceRef[];
  eu: EvidenceRef[];
  iso: string;
}

// Every row is always in the server HTML and visible with JavaScript off. The stage buttons only
// highlight one row and dim the rest; selecting the same stage again clears it.
export default function EvidenceMapRows({ rows }: { rows: EvidenceRow[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="mb-6" role="group" aria-label="Pick a stage to highlight its evidence">
        <p className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
          Pick a stage to highlight it
        </p>
        <div className="flex flex-wrap gap-2">
          {rows.map((r, i) => {
            const on = active === r.stage;
            return (
              <button
                key={r.stage}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(on ? null : r.stage)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{
                  background: on ? "var(--accent-dark)" : "var(--bg-card)",
                  color: on ? "var(--bg-card)" : "var(--text)",
                  border: `1px solid ${on ? "var(--accent-dark)" : "var(--border)"}`,
                }}
              >
                <span className="font-mono text-xs mr-1.5">{i + 1}</span>
                {r.stage}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 mb-16">
        {rows.map((r) => {
          const on = active === r.stage;
          const dim = active !== null && !on;
          return (
            <div
              key={r.stage}
              data-stage={r.stage}
              data-active={on ? "true" : "false"}
              className="p-6 rounded-2xl transition-opacity"
              style={{
                background: "var(--bg-card)",
                border: `${on ? 2 : 1}px solid ${on ? "var(--accent)" : "var(--border)"}`,
                opacity: dim ? 0.5 : 1,
              }}
            >
              <p className="text-xs font-bold tracking-wide uppercase mb-2" style={{ color: "var(--accent)" }}>{r.stage}</p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text)" }}>
                <span className="font-semibold">Evidence to keep: </span>
                <span className="text-[var(--text-muted)]">{r.keep}</span>
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] mb-1.5">NIST AI RMF</p>
                  <ul className="space-y-2">
                    {r.nist.map((n) => (
                      <li key={n.id} className="text-sm text-[var(--text-muted)] leading-relaxed">
                        <span className="font-mono text-xs mr-1.5" style={{ color: "var(--accent)" }}>{n.id}</span>
                        {n.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:pl-6" style={{ borderLeft: "1px solid var(--border)" }}>
                  <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] mb-1.5">EU AI Act (high-risk scope)</p>
                  {r.eu.length > 0 ? (
                    <ul className="space-y-2">
                      {r.eu.map((e) => (
                        <li key={e.id} className="text-sm text-[var(--text-muted)] leading-relaxed">
                          <span className="font-mono text-xs mr-1.5" style={{ color: "var(--accent)" }}>{e.id}</span>
                          {e.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">No single article cited for this stage here.</p>
                  )}
                </div>
                <div className="md:pl-6" style={{ borderLeft: "1px solid var(--border)" }}>
                  <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] mb-1.5">ISO/IEC 42001</p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{r.iso}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
