// Single source of truth for the Fit Check -> Discovery Sprint path. The diagram on
// /ai-fit-check and the FAQ/"what happens at the end" copy on the same page read these,
// so a price change cannot leave the picture and the text disagreeing
// (tests/fit-check-path.spec.ts fails if they drift).
export const OFFER_PATH = {
  fitCheckPrice: "$1,500",
  sprintPrice: "$5,000",
  sprintBalanceAfterCredit: "$3,500",
  creditDays: 60,
  readoutBusinessDays: 2,
} as const;
