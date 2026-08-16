"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap-setup";

// Wires Lenis smooth scroll to a shared `gsap.ticker` clock -- Trionn's
// named fix (per the Phase 4 spec) for the scroll-3D jitter class: if Lenis
// and GSAP/ScrollTrigger run on two independent rAF loops, a pinned/scrubbed
// element and the smoothed scroll position drift out of sync frame to frame,
// which reads as jitter exactly where scroll meets a canvas.
//
// Real gotcha (the spec's "Codrops ScrollSmoother wrapper / `effects: false`"
// note, translated to the Lenis stack we're actually using instead of
// ScrollSmoother): ScrollTrigger listens for the native `scroll` event by
// default. Lenis's default (non-virtual-scroll) mode still drives the real
// `window.scrollY`, but doesn't necessarily fire that event on every Lenis
// tick the way ScrollTrigger expects -- so pinned sections can visibly lag
// half a frame behind the smoothed position unless ScrollTrigger is told to
// re-check on every Lenis scroll tick. `lenis.on("scroll", ScrollTrigger.update)`
// below is that fix; skipping it is the equivalent trap on this stack.
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ensureGsapPlugins();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Accessibility non-negotiable (Phase 4 spec): reduced motion fully
    // bypasses Lenis and renders a normal, natively-scrolling document.
    // Nothing below runs -- no smoothing, no ScrollTrigger sync tap.
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
    });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const raf = (time: number) => {
      // gsap.ticker's `time` is seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    // Lenis already smooths the scroll itself; GSAP's own frame-skip lag
    // smoothing on top of that fights it (a second layer of smoothing
    // compounding into an over-damped, laggy feel) -- the standard
    // Lenis+GSAP integration disables it.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
