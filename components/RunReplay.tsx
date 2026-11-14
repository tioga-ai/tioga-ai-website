"use client";

import { useState } from "react";
import { RUN, stepCostUsd, runCostUsd } from "@/lib/synthetic-run";

// Manual stepper over one invented run. No timers and no animation, so nothing to pause for
// prefers-reduced-motion. No network calls. All data comes from lib/synthetic-run.ts.
export default function RunReplay() {
  const [i, setI] = useState(0);
  const step = RUN.steps[i];
  const last = RUN.steps.length - 1;
  const cost = stepCostUsd(step);
  const passed = RUN.rubric.filter((c) => c.pass).length;
  const showScore = step.kind === "score";

  const btn = "px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40";

  return (
    <div data-testid="run-replay">
      <ol className="list-none p-0 m-0 flex flex-wrap gap-2 mb-6" aria-label="Steps in this run">
        {RUN.steps.map((s, n) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setI(n)}
              aria-current={n === i ? "step" : undefined}
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{
                color: n === i ? "var(--bg-card)" : "var(--text-muted)",
                background: n === i ? "var(--accent-dark)" : "var(--bg-dark)",
                border: "1px solid var(--border)",
              }}
            >
              {String(n + 1).padStart(2, "0")} {s.kind}
            </button>
          </li>
        ))}
      </ol>

      <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }} aria-live="polite">
        <p className="font-mono text-xs uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>
          Step {i + 1} of {RUN.steps.length} · {step.kind}
        </p>
        <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
          {step.label}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          {step.detail}
        </p>
        {step.tokensIn !== undefined && (
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            {step.tokensIn} tokens in · {step.tokensOut} tokens out · ${cost.toFixed(4)} at invented rates
          </p>
        )}

        {showScore && (
          <div className="mt-5">
            <table className="w-full text-sm text-left border-collapse">
              <caption className="sr-only">Rubric scores for the synthetic run</caption>
              <thead>
                <tr style={{ color: "var(--text-muted)" }}>
                  <th scope="col" className="py-2 pr-3 font-semibold">Criterion</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Result</th>
                  <th scope="col" className="py-2 font-semibold">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {RUN.rubric.map((c) => (
                  <tr key={c.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="py-2 pr-3" style={{ color: "var(--text)" }}>{c.text}</td>
                    <td className="py-2 pr-3 font-mono" style={{ color: c.pass ? "var(--success)" : "var(--error)" }}>
                      {c.pass ? "met" : "not met"}
                    </td>
                    <td className="py-2" style={{ color: "var(--text-muted)" }}>
                      step {c.stepId.slice(1)}: {c.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm" style={{ color: "var(--text)" }}>
              {passed} of {RUN.rubric.length} criteria met. Model cost for this run: ${runCostUsd().toFixed(4)} at invented
              rates. One run says nothing about a pass rate.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-5">
        <button type="button" className={btn} style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }} onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>
          Previous step
        </button>
        <button type="button" className={`${btn} text-white`} style={{ background: "var(--accent-dark)" }} onClick={() => setI(Math.min(last, i + 1))} disabled={i === last}>
          Next step
        </button>
      </div>
    </div>
  );
}
