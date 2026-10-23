// Impure helpers (random ids, simulated latency, wall-clock time) for the demo
// pages. They live at module scope on purpose: the demos call them only from
// event handlers and async simulation steps, never to compute rendered output,
// and keeping them out of component bodies lets the React Compiler purity
// lint stay on without hiding real mistakes.

export function newActionId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Simulated ERP round-trip latency in ms: `base` plus up to `spread` of jitter.
export function jitterLatency(base: number, spread: number): number {
  return base + Math.round(Math.random() * spread);
}
