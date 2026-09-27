"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SceneLoader, { type SceneLoaderMode } from "../../../components/three/SceneLoader";
import Fallback from "./Fallback";
import Interaction from "./Interaction";
import { ReachMapProvider } from "./reachMapContext";

// ssr: false must be called from a client component in the App Router —
// this loader exists solely to isolate that call from the server-component
// page.tsx (which carries the route metadata), same pattern as
// ShowcaseCanvasLoader.tsx.
const AgentReachMapScene = dynamic(() => import("./Scene"), { ssr: false });

// Three tier swatches for the on-canvas legend below -- same three tiers,
// same hues, as Scene.tsx's own tierColor map (--accent / --scene-warning-light
// / --blue), just restated as plain-language DOM text for someone who never
// scrolls to Interaction.tsx's list/detail panel.
const TIER_LEGEND: { color: string; label: string; meaning: string }[] = [
  { color: "var(--accent)", label: "Agent-owned", meaning: "crosses automatically, no approval" },
  { color: "var(--scene-warning-light)", label: "Human-supervised", meaning: "waits for a named approver" },
  { color: "var(--blue)", label: "Human-owned", meaning: "advisory only — no gate to cross" },
];

function LegendRow({ color, label, meaning }: { color: string; label: string; meaning: string }) {
  return (
    <div className="flex items-start gap-1.5">
      <span className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{ background: color }} />
      <span className="leading-snug">
        <span className="font-semibold" style={{ color: "var(--text-on-dark)" }}>
          {label}
        </span>
        <span style={{ color: "var(--text-muted-on-dark)" }}> — {meaning}</span>
      </span>
    </div>
  );
}

// Wires Scene + Interaction + Fallback together on top of the generic
// components/three/SceneLoader.tsx: the DOM agent list/detail panel
// (Interaction.tsx) only makes sense alongside a mounted canvas to bridge
// into, so it renders only in "scene" mode — the no-WebGL/reduced-motion
// Fallback table is already a complete, self-sufficient page on its own.
export default function AgentReachMapCanvasLoader() {
  const [mode, setMode] = useState<SceneLoaderMode>("loading");

  return (
    <ReachMapProvider>
      <div style={{ position: "relative" }}>
        <SceneLoader
          testIdPrefix="agent-reach-map-canvas"
          renderScene={(onContextLost) => <AgentReachMapScene onContextLost={onContextLost} />}
          fallback={<Fallback />}
          onModeChange={setMode}
        />
        {/* In-canvas labels + legend -- 2026-09-14 blind critique: "nothing
            currently tells a non-interacting visitor what a node/edge is,"
            sharpened 2026-09-26: "every node and line is dark red on
            near-black... the three authorization tiers are visually
            indistinguishable." The DOM agent list/detail panel below
            (Interaction.tsx) already explains this in depth, but that's
            below the fold and requires scrolling/clicking first -- this is
            the one-glance version for someone who never interacts at all.
            Absolutely positioned over the canvas corner, not inside the R3F
            scene itself (Scene.tsx stays a pure Canvas, matching its
            existing separation from this file's own DOM-wrapper
            responsibilities). Only shown once the real scene has mounted --
            the loading/fallback states already explain themselves without
            this. */}
        {mode === "scene" && (
          <>
            <div
              className="absolute top-3 left-3 text-[10px] uppercase tracking-wide font-semibold pointer-events-none"
              style={{ color: "var(--text-muted-on-dark)" }}
            >
              Scheduled agents
            </div>
            <div
              className="absolute top-3 right-3 text-[10px] uppercase tracking-wide font-semibold text-right pointer-events-none"
              style={{ color: "var(--text-muted-on-dark)" }}
            >
              Systems they touch
            </div>
            <div
              className="absolute bottom-3 left-3 rounded-lg px-3 py-2 flex flex-col gap-1.5 text-[10px] pointer-events-none max-w-[230px]"
              style={{ background: "#05070Ccc", border: "1px solid var(--border)" }}
            >
              {TIER_LEGEND.map((row) => (
                <LegendRow key={row.label} {...row} />
              ))}
            </div>
          </>
        )}
      </div>
      {mode === "scene" && <Interaction />}
    </ReachMapProvider>
  );
}
