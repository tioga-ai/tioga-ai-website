// Static blur-blob background for the homepage hero. position:absolute inside
// the hero section's own relative/overflow-hidden wrapper, so it has no layout
// impact. HeroFieldLoader renders the same element as its no-WebGL fallback.
export default function StaticGlow() {
  return (
    <div
      className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 pointer-events-none"
      style={{ background: "radial-gradient(ellipse, var(--accent), transparent 70%)", filter: "blur(60px)" }}
    />
  );
}
