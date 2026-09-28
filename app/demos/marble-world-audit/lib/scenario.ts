// Marble (World Labs) World-Generation Audit — grounded in a REAL trial run,
// not a simulated/composite scenario like the other demos in this folder.
// Full methodology + raw outputs: ~/MarbleTrial/ (marble_trial.py, measure.html,
// runs/20260821T222610Z/). See the local Claude memory store/
// marble-trial-completed-2026-08-21.md for the source record.

export type AuditCheckItem = {
  claim: string;
  verified: boolean;
  detail: string;
};

export const TRIAL_META = {
  runId: "20260821T222610Z",
  date: "2026-08-21",
  inputType: "Single photo (image-to-world)",
  model: "marble-1.1",
  cost: "$1.20 per generation",
};

export const TOS_CHECKLIST: AuditCheckItem[] = [
  {
    claim: "Free tier: you own the generated output",
    verified: false,
    detail: "World Labs retains ownership of free-tier output, and free-tier input carries an irrevocable training license.",
  },
  {
    claim: "Free tier: your input photo isn't used for training beyond this generation",
    verified: false,
    detail: "Free-tier terms grant an irrevocable right to train on submitted input — it doesn't expire when you delete the world.",
  },
  {
    claim: "Paid API: you get commercial rights to generated output",
    verified: true,
    detail: "Confirmed — paid API access grants commercial rights, with limits on sublicensing, attribution, and usage volume.",
  },
  {
    claim: "Exported files carry provenance/training metadata (C2PA, XMP, EXIF)",
    verified: false,
    detail: "Scanned 14 exported files (2 real generations) byte-for-byte. Zero real provenance markers found. See the provenance panel below.",
  },
];

export const PROVENANCE_RESULT = {
  filesScanned: 14,
  runsScanned: 2,
  realMarkersFound: 0,
  falsePositiveCaught: {
    file: "mesh_collider.glb",
    matched: '"extras"',
    resolution: 'Opened the glTF JSON chunk directly — the only extras field present is meshes[0].extras = {"processed": true}, an internal pipeline flag, not identity or training-provenance data.',
  },
};

export const METRIC_SCALE_RESULT = {
  referenceLabel: "Total visible wall width in the source photo (left window's outer edge to right window's outer edge)",
  referenceValueFt: 12,
  referenceMethod: "Measured by eye, not a tape measure — a soft baseline, not a precision reference.",
  reconstructedValueFt: 14.29,
  reconstructedMethod: "Two-point click distance in the exported collider mesh, scaled by the API's own metric_scale_factor (0.9789486), measured with a purpose-built local click-to-measure tool (three.js).",
  errorPct: 19.1,
  errorDirection: "overshoot",
  caveat: "Single-image generation with the camera at an angle to the wall — some scale error is expected. 19% is large enough to matter for any dimensional-accuracy claim and should be caveated, or re-tested with a precise reference and/or multi-image input, before being cited in client-facing material.",
};

// ── Same audit, second vendor (added 2026-09-28). The same provenance method,
// re-implemented for MP4 in ~/CosmosTrial/cosmos_trial.py, run on 3 Cosmos
// outputs NVIDIA itself publishes in its GitHub repos
// (nvidia-cosmos/cosmos-predict2.5, nvidia-cosmos/cosmos-predict2). Terms are
// quoted from primary documents fetched 2026-09-28. Full write-up: vault
// research/cosmos-vs-marble-provenance-and-terms-audit-2026-09-28.md.
// A fresh hosted-API generation has NOT been run yet, so that cell stays
// "not yet tested". Don't fill it in without a real run.

export type VendorColumn = { key: "marble" | "cosmosHosted" | "cosmosOpen"; label: string; source: string };

export const COSMOS_COLUMNS: VendorColumn[] = [
  { key: "marble", label: "World Labs Marble (paid API)", source: "World Labs ToS, last updated Jan 21, 2026" },
  { key: "cosmosHosted", label: "NVIDIA Cosmos, hosted API", source: "NVIDIA API Trial Terms of Service" },
  { key: "cosmosOpen", label: "NVIDIA Cosmos, open weights (self-hosted)", source: "NVIDIA Open Model License, Oct 24, 2025" },
];

export type ComparisonRow = { dimension: string; marble: string; cosmosHosted: string; cosmosOpen: string };

export const COSMOS_COMPARISON: ComparisonRow[] = [
  {
    dimension: "Who owns the output",
    marble: "Paid users own it (free tier doesn't).",
    cosmosHosted: "You own Generated Content, unless the model's own licence says otherwise (§6.3).",
    cosmosOpen: "“NVIDIA claims no ownership rights in outputs.”",
  },
  {
    dimension: "Vendor use of your content",
    marble: "Training licence is on until you opt out; opting out applies going forward only.",
    cosmosHosted: "Not stored after the session (§2.3), but NVIDIA may collect inputs and outputs “to improve NVIDIA products and services, including AI models” (§3.3).",
    cosmosOpen: "Runs on your own hardware. The licence gives NVIDIA no access to your data.",
  },
  {
    dimension: "Production use",
    marble: "Allowed on paid tiers.",
    cosmosHosted: "No: “limited trial purposes only and without use … in production” (§1.2).",
    cosmosOpen: "Allowed: the models are “commercially usable”.",
  },
  {
    dimension: "Obligations on you",
    marble: "Volume, sublicensing and attribution limits on API output.",
    cosmosHosted: "Trial-only use; terms can change when published (§15.7).",
    cosmosOpen: "Show “Built on NVIDIA Cosmos”. Licence ends automatically if you bypass the model’s guardrails without a substitute.",
  },
  {
    dimension: "Output marking in the terms",
    marble: "None.",
    cosmosHosted: "None.",
    cosmosOpen: "None (nor in NVIDIA’s Trustworthy AI terms).",
  },
  {
    dimension: "Markers in real files",
    marble: "0 real markers in 14 exported files (2 generations).",
    cosmosHosted: "Not yet tested: needs a fresh hosted generation.",
    cosmosOpen: "0 markers in 3 NVIDIA-published outputs; only an ffmpeg muxer tag (Lavf61.1.100).",
  },
];

export const COSMOS_SCAN = {
  filesScanned: 3,
  realMarkersFound: 0,
  c2paBoxes: 0,
  positiveControl:
    "To show the scanner isn’t blind, a synthetic MP4 carrying a C2PA manifest box was run through it first. It was flagged correctly, so the zeros here are real negatives.",
  caveat:
    "These are NVIDIA’s published sample files, which may have been re-encoded after generation. A fresh generation through the hosted API is the next check. The scan proves markers are absent; it can’t see an invisible pixel-level watermark, and NVIDIA documents none.",
};

export const AUDIT_QUESTION =
  "If a vendor tells you their AI-generated 3D reconstruction is commercially usable and dimensionally accurate, do you take that on faith — or do you check?";

export const METHODOLOGY_NOTE =
  "Every number on this page came from an actual run against World Labs' World API, not a mocked or illustrative scenario — 2 real generations (~$2.40), a byte-level provenance scan of every exported file, and a real two-point measurement against a physical reference. The test harness itself had 3 real integration bugs along the way (API response fields didn't match assumed names) — all caught and fixed by running it, not by reading documentation alone. The Cosmos panel (added Sept 28, 2026) reuses the same scan method on NVIDIA’s own published Cosmos outputs and compares terms quoted from NVIDIA’s primary documents. It is a terms review, not legal advice.";
