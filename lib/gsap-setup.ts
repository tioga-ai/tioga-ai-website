// Single place plugins get registered -- Phase 4 (scroll cinematics).
// GSAP's own docs recommend registering plugins exactly once; scattering
// `gsap.registerPlugin(...)` calls across every component that needs
// ScrollTrigger/SplitText risks double-registration warnings and makes it
// unclear which module "owns" the setup. Every scroll-cinematics component
// imports gsap/ScrollTrigger/SplitText from here, never straight from the
// "gsap" package.
//
// SSR safety: this module is only ever imported from "use client" components
// (ScrollReveal, SmoothScrollProvider, the homepage hero cinematic piece),
// but Next.js App Router still evaluates client-component modules during the
// server render pass for the initial HTML. `gsap.registerPlugin` itself does
// not touch the DOM (it just stores plugin config), so it's safe to call
// during SSR -- but the `typeof window` guard below is cheap insurance and
// matches the guard style already used elsewhere in this repo
// (`components/HeroFieldLoader.tsx`'s WebGL detection, `lib/site-config.ts`'s
// `readCssToken`).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function ensureGsapPlugins(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };
