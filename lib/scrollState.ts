// Mutable, non-React shared scroll state -- Phase 4 (scroll cinematics).
//
// The spec's ref-object pattern ("animate a mutable ref, read it in the
// render loop, never drive React state from scroll") is usually implemented
// with a single component's `useRef`. Here the writer (a DOM scroll
// controller driven by GSAP ScrollTrigger, in `components/HomeHeroCinematic.tsx`)
// and the reader (the R3F Canvas's `useFrame` loop, in
// `components/HeroFieldScene.tsx`) live in different parts of the component
// tree with no direct parent/child relationship, so a single component ref
// can't bridge them. A module-scope singleton is the same pattern
// generalized: plain property writes/reads, no re-render, no context
// subscription overhead per frame.
export const heroScrollState = {
  // Radians. Rotates the hero shader field's flow direction as the visitor
  // scrolls through the pinned hero. This is chrome, not a data claim -- it
  // doesn't encode any real value, same "honest ambient motion" class as
  // the /showcase gate's scan ring (3d-design-standard.md §3.1's GC test:
  // "what is that motion telling me?" / "nothing, it's chrome").
  flowAngle: 0,
};
