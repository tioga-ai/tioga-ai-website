import Link from "next/link";
import { GOVERNED_WRITE_EXPLAINER as E } from "@/components/explainer/governed-write-explainer";

// Home page: the control point, shown in the first screens instead of several sections down.
// Server component, no client JS, no motion of its own (the ScrollReveal wrapper in app/page.tsx
// handles entrance, and is skipped under prefers-reduced-motion). Text comes from the same
// source as the explainer clip on /solutions/governed-write-path so the two cannot disagree.
export default function MechanismStrip() {
  return (
    <section data-testid="mechanism-strip" aria-labelledby="mechanism-strip-title" className="px-6 pb-16 max-w-5xl mx-auto">
      <h2 id="mechanism-strip-title" className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
        {E.title}
      </h2>
      <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
        Four steps between an agent&apos;s proposal and a change in your system of record.
      </p>
      <ol
        className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
        style={{ background: "var(--border)", border: "1px solid var(--border)" }}
      >
        {E.steps.map((s) => (
          <li key={s.n} className="px-6 py-5" style={{ background: "var(--bg-card)" }}>
            <p className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>
              {s.n} {s.label}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="text-sm mt-4" style={{ color: "var(--text)" }}>
        <span className="font-mono text-xs uppercase tracking-wide mr-2" style={{ color: "var(--accent)" }}>{E.datedRun.heading}</span>{" "}
        {E.datedRun.persisted}; {E.datedRun.rejected}.
      </p>
      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        {E.datedRun.footer}{" "}
        <Link href="/solutions/governed-write-path" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
          See the run record and the 32-second explainer
        </Link>
        .
      </p>
    </section>
  );
}
