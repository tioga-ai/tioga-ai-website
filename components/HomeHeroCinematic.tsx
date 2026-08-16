"use client";

import { useEffect, useRef } from "react";
import TrackedCTA from "@/components/TrackedCTA";
import HeroFieldLoader from "@/components/HeroFieldLoader";
import { CAL_LINK } from "@/lib/site-config";
import { STATS } from "@/lib/governance-ledger";
import { gsap, ScrollTrigger, SplitText, ensureGsapPlugins } from "@/lib/gsap-setup";
import { heroScrollState } from "@/lib/scrollState";
import { buildCountUpSpec } from "@/lib/countUpFormat";

// Homepage set piece (Phase 4 spec): pin the hero. While pinned, the shader
// field's flow direction rotates and a real-data stat strip counts up on
// scrub. Both effects are driven off the same ScrollTrigger's scrub
// progress so they land in sync -- the flow finishes its sweep exactly as
// the stats finish counting, right as the hero unpins.
//
// Numbers are `lib/governance-ledger.ts`'s `STATS` export verbatim -- the
// same real routing-ledger figures already published on
// `/demos/governance-ledger` and `/showcase`. Nothing here is invented; the
// count-up is presentation of a static, dated figure, not a claim of live
// change (3d-design-standard.md §3.2) -- the "Jul 17-25 2026" label next to
// it is load-bearing, not decoration, per the honesty rule.
const STAT_SPECS = STATS.map((stat) => ({ ...stat, spec: buildCountUpSpec(stat.value) }));

// End of the base direction vector the un-rotated shader used
// (`vec2(uTime * 0.02, uTime * 0.012)`) expressed as an angle, so
// `flowAngle = 0` reproduces exactly the pre-Phase-4 visual instead of a
// jump cut the first time this mounts.
const BASE_FLOW_ANGLE = Math.atan2(0.012, 0.02);

export default function HomeHeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statValueRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    ensureGsapPlugins();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      // Hard accessibility bypass: no pin, no SplitText stagger, no scroll
      // rotation. Headline renders as normal text (it already is -- SplitText
      // never runs) and every stat jumps straight to its real final value.
      heroScrollState.flowAngle = BASE_FLOW_ANGLE;
      statValueRefs.current.forEach((el, i) => {
        if (!el) return;
        el.textContent = STAT_SPECS[i].value;
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Character-level headline reveal, on mount (this is the first thing
      // above the fold -- the natural trigger is page load, not scroll-into-
      // view, since the hero is already in view on load).
      const split = new SplitText(heading, { type: "chars" });
      gsap.set(split.chars, { opacity: 0, y: 24, willChange: "opacity, transform" });
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.018,
        ease: "power3.out",
        onComplete: () => gsap.set(split.chars, { clearProps: "willChange" }),
      });

      // Pin the hero and drive the shader-rotation + count-up off one shared
      // scrub progress value. Ref pattern throughout: the flow angle writes
      // to the module-level `heroScrollState` singleton (read by
      // HeroFieldScene's useFrame loop), and the stat numbers write directly
      // to span `textContent` via refs -- neither ever touches React state,
      // so scrolling never triggers a re-render of this component or
      // anything under it.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          heroScrollState.flowAngle = BASE_FLOW_ANGLE + self.progress * Math.PI * 1.5;
          statValueRefs.current.forEach((el, i) => {
            if (!el) return;
            const spec = STAT_SPECS[i].spec;
            const current = spec.targets.map((t) => t * self.progress);
            el.textContent = spec.render(current);
          });
        },
        onLeaveBack: () => {
          heroScrollState.flowAngle = BASE_FLOW_ANGLE;
        },
      });
    }, section);

    return () => {
      heroScrollState.flowAngle = BASE_FLOW_ANGLE;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-36 pb-16 px-6 max-w-5xl mx-auto text-center relative z-0 overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      <HeroFieldLoader />
      <h1
        ref={headingRef}
        className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight text-balance"
      >
        AI agents for the{" "}
        <span style={{ color: "var(--accent)" }}>ERP</span>{" "}
        you already have.
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-3 leading-relaxed">
        Governed agents for finance, procurement and operations on Oracle EBS and SAP — running inside your identity, approvals and audit trail, every action visible before it executes. No migration required.
      </p>
      <p className="text-sm text-slate-400 max-w-xl mx-auto mb-10">
        Five-day discovery sprint, $5,000 flat — credited toward your project if you move forward.
      </p>
      <div className="flex flex-col items-center sm:flex-row gap-4 justify-center mb-12">
        <TrackedCTA
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          event="cta_book_call"
          data={{ location: "hero" }}
          className="px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
          style={{ background: "var(--accent-dark)" }}
        >
          Book a 20-minute fit call
        </TrackedCTA>
        <TrackedCTA
          href="/demos/ap-exception-workflow"
          event="cta_view_demo"
          data={{ location: "hero" }}
          className="px-8 py-3.5 rounded-xl font-semibold transition-all hover:border-slate-500 hover:text-white"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          See an AP agent run
        </TrackedCTA>
      </div>

      {/* Real governance-ledger numbers, counting up as the hero unpins.
          Same array as /demos/governance-ledger and /showcase -- imported,
          not re-typed, so it can't drift (design-standard §6.4). */}
      <div
        data-testid="hero-stat-strip"
        className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden max-w-3xl mx-auto"
        style={{ background: "var(--border)" }}
      >
        {STAT_SPECS.map((stat, i) => (
          <div key={stat.label} className="px-4 py-4 text-center" style={{ background: "var(--bg-card)" }}>
            <div
              className="text-xl font-bold font-mono mb-1"
              style={{ color: "var(--accent)" }}
              ref={(el) => {
                statValueRefs.current[i] = el;
              }}
            >
              0
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--text-muted-3)" }}>
        Real routing-gateway ledger, Jul 17–25 2026 — a dated excerpt, not a live feed.
      </p>
    </section>
  );
}
