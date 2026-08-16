// Derives a scrub count-up animation spec directly from a real stat's
// already-formatted display string (e.g. `lib/governance-ledger.ts`'s
// `STATS[i].value`) instead of hand-typing numeric targets and decimal
// precision separately. Two independently-typed copies of the same number
// is exactly the "same ledger, two files" drift bug this repo's design
// standard calls out (3d-design-standard.md §6.4: "Data has exactly one
// source of truth") -- this keeps `STATS` itself the only place the real
// numbers are written.
//
// Handles multi-number strings too ("2 / 17" counts both the 2 and the 17
// up together), which is why the ratio stat doesn't need special-casing.

export interface CountUpSpec {
  /** Final numeric value of each digit run found in the source string, in order. */
  targets: number[];
  /** Renders a given array of current (possibly fractional) values back into the original string shape. */
  render: (current: number[]) => string;
}

const NUMBER_RUN = /[\d.]+/g;

export function buildCountUpSpec(value: string): CountUpSpec {
  const matches = Array.from(value.matchAll(NUMBER_RUN)).map((m) => m[0]);
  const targets = matches.map((m) => parseFloat(m));
  const decimals = matches.map((m) => {
    const dot = m.indexOf(".");
    return dot === -1 ? 0 : m.length - dot - 1;
  });

  const render = (current: number[]) => {
    let i = 0;
    return value.replace(NUMBER_RUN, () => {
      const n = current[i] ?? targets[i];
      const d = decimals[i];
      i += 1;
      return d > 0 ? n.toFixed(d) : String(Math.round(n));
    });
  };

  return { targets, render };
}
