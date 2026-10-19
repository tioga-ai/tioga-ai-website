// Click-to-play recording of the AP exception browser simulation (2026-10-19 website motion review,
// build 2). Same rules as ExplainerVideo: no autoplay, no loop, no audio track, reserved 16:9 box,
// poster shows the result frame. The label is also burned into the video frame itself.
// Serves from /media/ (public Blob store, see next.config.js); renders nothing until MEDIA_ORIGIN is set,
// so the page is complete without it.
export const AP_WALKTHROUGH = {
  file: "ap-exception-walkthrough.mp4",
  poster: "/explainers/ap-walkthrough-poster.jpg",
  title: "Walkthrough of the AP exception simulation",
  label: "Recording of a browser simulation · synthetic data · no Fusion or client connection",
  summary:
    "An approved $1,200 adjustment, an $8,000 one escalated to a person, a payment blocked because its vendor is on hold, and a reconciliation pass that catches an agent's \"resolved\" status that the ledger contradicts.",
} as const;

export default function ApWalkthroughVideo({ src }: { src?: string }) {
  if (!src) return null;
  const A = AP_WALKTHROUGH;
  return (
    <figure data-testid="ap-walkthrough" className="m-0 mb-8">
      <div
        className="overflow-hidden"
        style={{ aspectRatio: "16 / 9", border: "1px solid var(--border)", borderRadius: "1rem", background: "var(--bg-card)" }}
      >
        <video controls playsInline muted preload="none" poster={A.poster} width={1280} height={720} aria-label={A.title} className="w-full h-full block">
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
        <span className="font-mono">{A.label}.</span> {A.summary}
      </figcaption>
    </figure>
  );
}
