import type { Metadata } from "next";
import Link from "next/link";
import { SUBPROCESSORS } from "@/lib/subprocessors";

// PREVIEW. noindex, kept out of the sitemap, no nav link. Drawn only from statements already public
// on /trust and /privacy plus the staffing, data-handling and continuity statements recorded in the
// vendor-diligence pack. Items still waiting on review are shown as "To be added after review" on
// purpose; nothing about insurance, contracts or unreviewed legal wording belongs here yet.
export const metadata: Metadata = {
  title: "Working with us",
  description: "How a Tioga AI engagement handles people, data, providers and handover. What is stated, and what is still to be added.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/working-with-us" },
};

const STATED = [
  {
    h: "Who does the work",
    body: "Tioga AI is a principal-led practice. The principal scopes, performs and signs off every engagement.",
    more: "Before anyone else works on an engagement or can reach a client's systems or data, they are named in the statement of work, the client approves in writing, and they are bound by the same confidentiality and data-handling terms.",
  },
  {
    h: "What AI providers see",
    body: "For AI processing, client material goes to Anthropic only.",
    more: "Another AI provider may be used on a client's material only if the client opts in, in writing, in the statement of work; the provider is shown on the subprocessor list before use; the route is one with data retention turned off; and the data is limited to what the task needs. This is a written rule, not a technical control. Tioga does not claim zero data retention at Anthropic, which handles text under its own retention terms.",
  },
  {
    h: "How long we keep client material",
    body: "Client material is kept for the length of the engagement plus an agreed clarification window, then deleted from Tioga's working environment unless the client asks in writing for it to be kept longer.",
    more: "This applies to Tioga's own working environment. It does not shorten any provider's retention period.",
  },
  {
    h: "Who owns what at handover",
    body: "Tioga will not be a required runtime dependency of anything it builds.",
    more: "Production credentials, repositories, logs and deployment assets stay under the client's control. Deliverables, mappings and evidence documents are handed over in formats the client owns and can maintain without Tioga.",
  },
] as const;

const PENDING = [
  "Insurance coverage",
  "Contract terms and limits",
  "Continuity if the principal is unavailable",
  "Uptime commitments",
];

export default function WorkingWithUs() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: "var(--bg-dark)", color: "var(--text)" }}>
      <section className="pt-36 pb-10 px-6 max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: "var(--accent)" }}>
          Working with us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: "var(--text)" }}>
          How an engagement handles people, data and handover.
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
          For a buyer doing diligence. This page says what is stated today and lists what is still to be added. The{" "}
          <Link href="/trust" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>trust page</Link>{" "}
          covers this website; this page covers an engagement.
        </p>
      </section>

      <section aria-labelledby="stated-title" className="px-6 pb-12 max-w-4xl mx-auto">
        <h2 id="stated-title" className="text-2xl font-bold mb-5" style={{ color: "var(--text)" }}>Stated today</h2>
        <ol className="list-none p-0 m-0 flex flex-col gap-5">
          {STATED.map((s) => (
            <li key={s.h} data-testid="stated-item" className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>{s.h}</h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text)" }}>{s.body}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.more}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="providers-title" className="px-6 pb-12 max-w-4xl mx-auto">
        <h2 id="providers-title" className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>Providers on the site today</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Same list as the trust page, from one shared source.</p>
        <ul className="list-none p-0 m-0 flex flex-col gap-3">
          {SUBPROCESSORS.map((p) => (
            <li key={p.name} className="text-sm leading-relaxed">
              <span className="font-semibold" style={{ color: "var(--text)" }}>{p.name}.</span>{" "}
              <span style={{ color: "var(--text-muted)" }}>{p.purpose}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pending-title" className="px-6 pb-24 max-w-4xl mx-auto">
        <h2 id="pending-title" className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>To be added after review</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          These are not stated yet. Ask about any of them and you will get an answer in writing.
        </p>
        <ul className="m-0 pl-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {PENDING.map((x) => (<li key={x}>{x}</li>))}
        </ul>
        <p className="text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/contact" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>Contact us</Link> with diligence questions.
        </p>
      </section>
    </main>
  );
}
