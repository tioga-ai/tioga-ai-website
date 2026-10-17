// Priced-engagement catalog shown on /services and published as JSON at /offers.json.
// One source: edit here and both update. Extracted from app/services/page.tsx 2026-10-17 (no content change).

export interface Offer {
  name: string;
  desc: string;
  price: string;
  duration: string;
  href?: string;
  ctaLabel?: string;
  buyer?: string;
}

export interface Practice {
  key: string;
  name: string;
  blurb: string;
  offers: Offer[];
}

export const PRACTICES: Practice[] = [
  {
    key: "automate",
    name: "Automate finance and operations",
    blurb:
      "Find the highest-ROI manual work in finance, HR, procurement, and operations, then build a production agent against it.",
    offers: [
      {
        name: "AI Operations Assessment",
        desc: "Map manual workflows across finance, HR, procurement, and operations. Rank automation opportunities by ROI and feasibility. Concrete plan in your hands.",
        price: "$10–15K",
        duration: "2–3 weeks",
        buyer: "Finance, HR, procurement, or operations leaders who want manual workflows mapped and ranked by ROI before committing to a build.",
      },
      {
        name: "AI Agent Pilot",
        desc: "Production-ready AI agent built against your highest-value workflow, integrated with your real systems, with governance documentation delivered alongside the code.",
        price: "$25–50K",
        duration: "4–8 weeks",
        buyer: "Teams with a highest-value workflow already identified who are ready for a production-ready agent, not another pilot deck.",
      },
    ],
  },
  {
    key: "erp",
    name: "Modernize ERP with an agent layer",
    blurb:
      "Add AI capability to Oracle Fusion Cloud ERP, Oracle EBS, SAP, or a legacy ERP without ripping out what already works — including the one stalled agent-to-ERP write path that's actually blocking you.",
    offers: [
      {
        name: "Agent-Ready ERP Diagnostic & Governed Write-Path",
        desc: "Assess one stalled agent-to-ERP write path, including what the agent does when the ERP or a dependency it needs is down or degraded (fail closed, queue the action, or fall back to an ungated path), then build a governed version of it — executing through your application's own logic layer, with policy enforcement and an audit-grade evidence trail your control owners can actually clear. Also covers payroll/HRIS and FP&A write paths where those are the boundary system instead — UKG Pro and Workday Adaptive Planning are both in scope. (See About for the founder's hands-on operating history with these systems.)",
        price: "$60–120K",
        duration: "~6 weeks",
        buyer: "Oracle Fusion Cloud ERP, Oracle EBS, or SAP teams with one stalled agent-to-ERP write path already identified.",
      },
      {
        name: "Salesforce Governed Write-Path & Evidence Build",
        desc: "Closes the gap Salesforce's own architects admit exists — hosted MCP servers on Salesforce are GA and free on Enterprise Edition+ with full user attribution, but the governance layer above that (a value/velocity policy an agent's permission set can't express, a server-side approval gate independent of which AI client is calling, a decision ledger recording policy version, approver, and reason for every evaluated write) is yours to build. Tioga builds that layer for one high-value Salesforce write path, and the Phase 1 diagnostic records what the agent does when the platform or a dependency is unavailable (fail closed, queue the action, or fall back to an ungated path).",
        price: "$50–100K",
        duration: "5–8 weeks",
        buyer: "Salesforce teams who already have hosted MCP servers live and need the governance layer above it for one high-value write path.",
      },
      {
        name: "Legacy System AI Augmentation",
        desc: "Add AI capability to your existing ERP, CRM, or HRIS without replacing the underlying system — extending what works rather than ripping it out.",
        price: "$40–100K",
        duration: "8–16 weeks",
        buyer: "Organizations with an existing ERP, CRM, or HRIS they want to extend with AI, not replace.",
      },
      {
        name: "ERP Modernization Advisory",
        desc: "Ongoing strategic guidance for organizations modernizing Oracle Fusion Cloud ERP, Oracle EBS, SAP legacy, or custom ERP environments — with AI integration as a first-class requirement.",
        price: "$15–25K/month",
        duration: "3–12 months",
        buyer: "Organizations modernizing Oracle Fusion Cloud ERP, Oracle EBS, SAP legacy, or custom ERP environments who need ongoing strategic guidance, not a one-off engagement.",
      },
    ],
  },
  {
    key: "govern",
    name: "Govern enterprise AI",
    blurb:
      "NIST AI RMF, ISO 42001, EU AI Act, and US state-law programs — plus fractional leadership — for organizations that need AI risk management built into the architecture, not backfilled after a pilot succeeds. This is the deepest bench of the three practices: ten engagements, from a one-time gap analysis to ongoing governance leadership.",
    offers: [
      {
        name: "AI Governance Readiness Assessment",
        desc: "NIST AI RMF, ISO 42001, EU AI Act, and US state law gap analysis with a prioritized remediation roadmap and sample executive summary.",
        price: "$20–35K",
        duration: "3–4 weeks",
        buyer: "Organizations that need a NIST AI RMF, ISO 42001, EU AI Act, or US state-law gap analysis and a prioritized remediation roadmap.",
      },
      {
        name: "AI Cost & Model Governance Assessment",
        desc: "Model-tiering policy, token/cache optimization, budget guardrails, and model-governance rules — built on the same routing infrastructure behind Tioga's own Governance Ledger demo.",
        price: "$10–20K",
        duration: "2–3 weeks",
        buyer: "Organizations that need model-tiering policy, token/cache optimization, and budget guardrails on their AI spend.",
      },
      // "AI Governance Evidence Package for Insurance Underwriting" removed
      // 2026-09-01: its demand thesis failed independent 3-vote adversarial
      // verification (refuted 0-3) and is marked "do not send" in
      // sales/offer-data-reference.md. Was live on this page despite that
      // internal flag -- see the 2026-09-01 four-axis review.
      {
        name: "Agentic AI Governance Framework",
        desc: "Governance architecture for organizations deploying autonomous AI agents in production — risk registers, oversight controls, and escalation protocols.",
        price: "$30–75K",
        duration: "4–8 weeks",
        buyer: "Organizations deploying autonomous AI agents in production who need risk registers, oversight controls, and escalation protocols.",
      },
      {
        name: "Multi-State AI Compliance Program",
        desc: "Gap analysis and remediation roadmap across US state AI laws for organizations operating in multiple jurisdictions.",
        price: "$40–80K",
        duration: "6–10 weeks",
        buyer: "Organizations operating across multiple US states that need a gap analysis and remediation roadmap for state AI laws.",
      },
      {
        name: "ISO 42001 Implementation Sprint",
        desc: "Structured implementation of an AI management system aligned to ISO 42001, from readiness assessment to certification-ready documentation.",
        price: "$50–120K",
        duration: "3–6 months",
        buyer: "Organizations that need AI risk management built into the architecture and are pursuing ISO 42001 certification-ready documentation.",
      },
      {
        name: "EU AI Act Conformity Program",
        desc: "Full conformity documentation, technical files, and governance controls for organizations subject to the EU AI Act, structured for audit readiness.",
        price: "$75–200K",
        duration: "4–8 months",
        buyer: "Organizations subject to the EU AI Act that need full conformity documentation and technical files, structured for audit readiness.",
      },
      {
        name: "Fractional AI Governance Officer",
        desc: "Ongoing governance leadership for organizations that need AI risk management expertise without a full-time hire — structured as a monthly retainer.",
        price: "$12–25K/month",
        duration: "6–12 months",
        buyer: "Organizations that need ongoing AI governance leadership but aren't ready for a full-time hire.",
      },
      {
        name: "Standing Watch Assessment",
        desc: "Reconciles the agent inventory you already have — from your control plane, platform exports, or a manual list; Tioga does not compete with discovery tooling — and adds what those tools don't: a qualification register and autonomy-tier map, a cross-vendor spend arbitration baseline, a first behavioral probe run across two or more systems, and a seeded findings ledger you keep.",
        price: "$15–35K",
        duration: "3–4 weeks",
        href: "/solutions/standing-watch",
        ctaLabel: "See the full Standing Watch ladder →",
        buyer: "Organizations running agents across more than one platform that need cross-platform verification of what those agents do and one evidence record across them — whether or not they already run an inventory or control-plane product.",
      },
      {
        name: "Standing Watch Build",
        desc: "Implements the behavioral probe harness and the propose-and-approve review workflow in your environment, on your credentials and repositories, on top of whatever control plane or gateway you already own — modeled on router-watch and security-watch. Tioga does not build a gateway, policy engine, or discovery product, and will not be a required runtime dependency. Ownership, operating responsibilities, and any ongoing support scope are defined before the build starts.",
        price: "$60–150K",
        duration: "8–16 weeks, scoped to estate breadth",
        href: "/solutions/standing-watch",
        ctaLabel: "See the full Standing Watch ladder →",
        buyer: "Organizations ready to run the behavioral probe harness and propose-and-approve review workflow in their own environment, on their own credentials, on top of the control plane they already use.",
      },
      {
        name: "Standing Watch Retainer",
        desc: "Router-watch and security-watch as a service, generalized to your estate: a weekly automated watch run, a monthly human review of the findings ledger, and quarterly evidence packs mapped to NIST AI RMF, ISO 42001, and the EU AI Act.",
        price: "$5–15K/month",
        duration: "Ongoing",
        href: "/solutions/standing-watch",
        ctaLabel: "See the full Standing Watch ladder →",
        buyer: "Organizations that want router-watch and security-watch as an ongoing service, with a weekly automated watch run and monthly human review.",
      },
    ],
  },
];
