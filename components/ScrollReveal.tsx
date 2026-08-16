"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap-setup";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Passed straight through -- needed on sections that are anchor-link targets (#services, #process, #contact). */
  id?: string;
  /** Starting vertical offset in px the element rises from. */
  y?: number;
  /** Scroll distance (as a viewport-height fraction string GSAP understands, e.g. "top 85%") the reveal starts at. */
  start?: string;
  /** Where the reveal finishes -- past this point the element is fully in its resting state. */
  end?: string;
}

// The one shared reveal component the Phase 4 spec asks for -- Trionn's
// `BlurTextReveal` shape, generalized: centralizes the prefers-reduced-motion
// branch and the will-change cleanup in one place instead of repeating both
// per section (this repo has ~11 homepage sections below the hero; without
// this, that's 11 places to get the reduced-motion branch right, and 11
// places to forget to strip `will-change`).
//
// Follows the spec's ref pattern literally: GSAP tweens a real DOM node via
// a ref, scrubbed by scroll position. No React state is ever read from or
// written by the scroll callback -- that would re-render the section (and
// everything under it) on every scroll tick, the exact perf trap the spec
// calls out.
export default function ScrollReveal({
  children,
  className,
  id,
  y = 32,
  start = "top 88%",
  end = "top 55%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ensureGsapPlugins();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      // Hard bypass: final resting state, immediately, no ScrollTrigger
      // instance created at all -- nothing to unpin or disable later.
      gsap.set(el, { opacity: 1, y: 0, clearProps: "willChange" });
      return;
    }

    gsap.set(el, { opacity: 0, y, willChange: "opacity, transform" });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 0.6,
      },
      onComplete: () => gsap.set(el, { clearProps: "willChange" }),
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, start, end]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
