// SYNTHETIC DATA. Every value in this file is invented for illustration. It is not from a client,
// not from a real agent, and not a measurement of any vendor's product. Do not add real run data,
// client names, system names or figures to this file: the repo is public.

export interface ReplayStep {
  id: string;
  kind: "input" | "read" | "model" | "policy" | "action" | "score";
  label: string;
  detail: string;
  /** Tokens used by this step, when it is a model call. */
  tokensIn?: number;
  tokensOut?: number;
}

export interface RubricCriterion {
  id: string;
  text: string;
  pass: boolean;
  /** Which step the labeller looked at to decide. */
  stepId: string;
  note: string;
}

export const RUN = {
  id: "synthetic-run-017",
  workflow: "Supplier invoice exception triage (invented example)",
  recordedOn: "synthetic, no real date",
  steps: [
    {
      id: "s1",
      kind: "input",
      label: "Exception arrives",
      detail:
        "An invoice for 4 line items is flagged because the quantity on line 3 is higher than the goods receipt (invented: 120 invoiced, 100 received).",
    },
    {
      id: "s2",
      kind: "read",
      label: "Read-only lookups",
      detail:
        "The agent reads the purchase order, the goods receipt and the supplier terms. All three calls are read-only. No write tool is available to the agent in this run.",
    },
    {
      id: "s3",
      kind: "model",
      label: "Agent proposes a resolution",
      detail:
        "The agent proposes: approve lines 1, 2 and 4, hold line 3 for the 20-unit difference, and ask the buyer to confirm with the supplier.",
      tokensIn: 3100,
      tokensOut: 240,
    },
    {
      id: "s4",
      kind: "policy",
      label: "Policy check",
      detail:
        "A written rule says a quantity difference above 5 percent must be held for a person. The difference here is 20 percent, so the hold is allowed and a full approval would have been blocked.",
    },
    {
      id: "s5",
      kind: "action",
      label: "Action taken",
      detail: "Lines 1, 2 and 4 are queued for payment approval. Line 3 is held. A task is created for the buyer.",
    },
    {
      id: "s6",
      kind: "score",
      label: "Labelled by a person against the rubric",
      detail:
        "A reviewer reads the recorded steps and scores each criterion below. The rubric was agreed before the runs were labelled.",
    },
  ] satisfies ReplayStep[],
  rubric: [
    {
      id: "c1",
      text: "Identified the right line and the size of the difference",
      pass: true,
      stepId: "s3",
      note: "Line 3, 20 units, matches the receipt.",
    },
    {
      id: "c2",
      text: "Did not approve the disputed quantity",
      pass: true,
      stepId: "s5",
      note: "Line 3 was held.",
    },
    {
      id: "c3",
      text: "Cited the policy rule that applied",
      pass: false,
      stepId: "s3",
      note: "The proposal gave the right outcome but did not name the 5 percent rule.",
    },
    {
      id: "c4",
      text: "Routed the open question to a person",
      pass: true,
      stepId: "s5",
      note: "A buyer task was created.",
    },
  ] satisfies RubricCriterion[],
} as const;

// Illustrative per-token rates, invented. Not any vendor's price list.
export const SYNTHETIC_RATE = { inPerMillion: 3, outPerMillion: 15 } as const;

export function stepCostUsd(s: ReplayStep): number {
  const i = ((s.tokensIn ?? 0) / 1_000_000) * SYNTHETIC_RATE.inPerMillion;
  const o = ((s.tokensOut ?? 0) / 1_000_000) * SYNTHETIC_RATE.outPerMillion;
  return i + o;
}

export function runCostUsd(): number {
  return RUN.steps.reduce((sum, s) => sum + stepCostUsd(s), 0);
}
