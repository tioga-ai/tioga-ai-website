// Single source of truth for the governed-write explainer clip. The same
// strings were given to Claude Motion verbatim to make the MP4, and are
// rendered as the text version beside it. If either changes, re-render the
// clip: the text version and the video must never disagree.
// Dated-run claims mirror #snowflake-run-2026-07-31 on the same page.

export const GOVERNED_WRITE_EXPLAINER = {
  title: "How a governed write reaches the ERP",
  label: "Animated explainer · not a recording",
  caption: "Animated explainer of the text on this page; not a recording.",
  steps: [
    { n: "01", label: "Propose", text: "The agent proposes a change. It does not write." },
    { n: "02", label: "Policy check", text: "A policy gate checks the proposal before anything is sent." },
    {
      n: "03",
      label: "Approve or block",
      text: "Above a threshold, an approval step decides. A block is recorded.",
    },
    {
      n: "04",
      label: "Write and read back",
      text: "Through the application's own API and rules, never a direct database write. The result is read back.",
    },
  ],
  datedRun: {
    heading: "Dated run · 2026-07-31",
    persisted: "3 writes persisted, each re-read to confirm",
    rejected: "2 rejected: vendor on hold; closed purchase order",
    footer: "Real Snowflake sandbox tenant, synthetic data; the write ran through a stored procedure, not an ERP application. Not a client system.",
    pointer: "Run record below.",
  },
} as const;
