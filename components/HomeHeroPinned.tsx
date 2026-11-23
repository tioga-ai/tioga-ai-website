"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import StaticGlow from "@/components/StaticGlow";
import HeroDemo from "@/components/HeroDemo";
import TrackedCTA from "@/components/TrackedCTA";
import { CAL_LINK } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// Homepage hero. It no longer pins for an extra viewport of scroll, no
// longer runs Lenis smooth scrolling, and no longer mounts the WebGL
// shader field: the background is the static glow (StaticGlow). The file
// keeps its old name to avoid churn in imports. What remains is the
// one-time headline reveal below.
//
// The stat-strip that used to live here (four numbers pulled from
// lib/governance-ledger.ts's STATS, counting up on scrub) was removed
// 2026-09-07 per the Astra + Fable adversarial launch-readiness reviews:
// both independently flagged a small internal-infrastructure metric
// ("17 calls logged," etc.) sitting in the primary hero/conversion path as
// evidence of experimentation scale, not customer-facing proof, and noise
// against the narrower one-buyer/one-workflow hero message below. The same
// data is still real and still on the site -- see the "Governance Ledger
// Callout" section further down this page (GovernanceLedgerPreview) and
// the full /demos/governance-ledger page -- just no longer in the very
// first thing a visitor sees.

export default function HomeHeroPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      // Hard bypass: no SplitText split. The headline ships opacity-0 in
      // its static className (fixes a first-paint double-render flash in
      // the animated path below), so reveal it explicitly here.
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      return;
    }

    // --- Character-level headline reveal (one-time, not scroll-linked). ---
    // type: "words, chars" (not just "chars") -- splitting straight into
    // chars wraps every character, including spaces, in its own
    // inline-block span, which lets the browser break a line between any
    // two characters instead of only at word boundaries. Splitting words
    // first keeps each word's own wrapper as the line-break unit.
    //
    // mask: "words": each char starts 110% below its final position; the
    // mask clips it so chars rise into view from behind their own word
    // instead of hanging over the subhead. The split is reverted on
    // completion because a permanent word mask at this tight leading
    // (1.05) would clip descenders (g, y) at rest.
    let split: SplitText | null = null;
    if (headlineRef.current) {
      split = new SplitText(headlineRef.current, { type: "words, chars", mask: "words" });
      // Same synchronous block as the split, no frame gap: reveal the
      // headline at the moment its characters are ready to animate.
      gsap.set(headlineRef.current, { opacity: 1 });
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.018,
        ease: "power3.out",
        delay: 0.1,
        onComplete: () => {
          split?.revert();
          split = null;
        },
      });
    }

    return () => {
      split?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="pt-36 pb-12 px-6 max-w-5xl mx-auto text-center md:text-left relative z-0 overflow-hidden">
        <StaticGlow />
        <h1 ref={headlineRef} className="text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight text-balance hero-h1-guard" style={{ color: "var(--text)" }}>
          AI agents, built and governed in your real systems.
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto md:mx-0 mb-3 leading-relaxed">
          Agentic automation for the systems your business runs on. ERP like
          SAP and Oracle, CRM like Salesforce, data platforms like Snowflake,
          or QuickBooks for the SMB stack. Every integration gets the right
          connection, clear controls, and evidence of what it did.
        </p>
        <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto md:mx-0 mb-8">
          Five-day discovery sprint, $5,000 flat — scoped to your workflow, credited toward what comes next.
        </p>
        <div data-testid="hero-cta-group" className="flex flex-col items-center sm:flex-row gap-4 justify-center md:justify-start">
          <TrackedCTA
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            event="cta_book_call"
            data={{ location: "hero" }}
            className="px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--accent-dark)" }}
          >
            Book a 20-minute intro call
          </TrackedCTA>
          <TrackedCTA
            href="/ai-fit-check"
            event="cta_ai_fit_check"
            data={{ location: "hero" }}
            className="px-8 py-3.5 rounded-xl font-semibold transition-all hover:opacity-90"
            style={{ border: "2px solid var(--text)", color: "var(--text)", background: "var(--bg-card)" }}
          >
            Start with the AI Fit Check — $1,500
          </TrackedCTA>
        </div>
        <HeroDemo />
      </section>
    </div>
  );
}
