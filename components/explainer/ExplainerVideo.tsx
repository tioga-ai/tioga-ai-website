import { GOVERNED_WRITE_EXPLAINER as E } from "./governed-write-explainer";

// Click-to-play explainer. No autoplay, no loop, no audio track. The 16:9 box
// is reserved so the page does not shift. The text version is always rendered,
// so the page is complete without the video (and when no media origin is set).
export default function ExplainerVideo({ src, poster }: { src?: string; poster: string }) {
  return (
    <figure className="m-0">
      {src && (
        <>
          <div
            className="overflow-hidden"
            style={{ aspectRatio: "16 / 9", border: "1px solid var(--border)", borderRadius: "1rem", background: "var(--bg-card)" }}
          >
            <video
              controls
              playsInline
              muted
              preload="none"
              poster={poster}
              width={1920}
              height={1080}
              aria-label={E.title}
              className="w-full h-full block"
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
          <figcaption className="text-xs mt-2 font-mono" style={{ color: "var(--text-muted)" }}>
            {E.caption}
          </figcaption>
        </>
      )}
      <details className="mt-4">
        <summary className="text-sm cursor-pointer" style={{ color: "var(--accent)" }}>
          Read the same explainer as text
        </summary>
        <div className="mt-3 p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "1rem" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>{E.title}</h3>
          <ol className="list-none p-0 m-0 space-y-3">
            {E.steps.map((s) => (
              <li key={s.n} className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <span className="font-mono text-xs uppercase tracking-wide mr-3" style={{ color: "var(--accent)" }}>
                  {s.n} {s.label}
                </span>
                {s.text}
              </li>
            ))}
          </ol>
          <p className="font-mono text-xs uppercase tracking-wide mt-5 mb-1" style={{ color: "var(--accent)" }}>
            {E.datedRun.heading}
          </p>
          <ul className="list-none p-0 m-0 text-sm" style={{ color: "var(--text-muted)" }}>
            <li>{E.datedRun.persisted}</li>
            <li>{E.datedRun.rejected}</li>
          </ul>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            {E.datedRun.footer} {E.datedRun.pointer}
          </p>
        </div>
      </details>
    </figure>
  );
}
