// Single source of truth for Claude model IDs used by the site. Change a model HERE and nowhere else:
// scripts/check-model-ids.mjs (run in CI as `npm run check:models`) fails if a raw model ID appears
// anywhere else under app/, lib/ or components/.
// Why: seven routes pinned claude-haiku-4-5-20251001 (Anthropic lists Haiku 4.5 with a standing
// "not sooner than 2026-11-24" retirement date). The 2026-07-27 outage came from the same pattern.
// The daily prod-health-check workflow calls every demo endpoint, so a bad ID here is caught there.

/** Fast, low-cost model for the short-form demo and classifier routes. */
export const FAST_MODEL = "claude-haiku-5-5";
export const FAST_MODEL_NAME = "Claude Haiku 5.5";

/** Longer-form demo model (migration and readiness demos). */
export const DEMO_MODEL = "claude-sonnet-5";
export const DEMO_MODEL_NAME = "Claude Sonnet 5";
