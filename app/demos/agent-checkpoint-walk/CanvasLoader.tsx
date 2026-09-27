"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SceneLoader, { type SceneLoaderMode } from "../../../components/three/SceneLoader";
import Fallback from "./Fallback";
import Interaction from "./Interaction";
import { CheckpointWalkProvider, useCheckpointWalk } from "./checkpointWalkContext";
import { findAgent, systemRow } from "./checkpointLayout";
import type { Tier } from "../../../lib/agent-register";

// ssr: false must be called from a client component in the App Router —
// this loader exists solely to isolate that call from the server-component
// page.tsx (which carries the route metadata), same pattern as
// agent-reach-map/CanvasLoader.tsx.
const AgentCheckpointWalkScene = dynamic(() => import("./Scene"), { ssr: false });

// Same three tiers/colors as agent-reach-map/CanvasLoader.tsx's legend
// (--accent / --scene-warning-light / --blue) so the two demos read as one
// consistent visual language, not a fresh palette per page.
const STATUS_LABEL: Record<Tier, string> = {
  "agent-owned": "Crosses automatically",
  "human-supervised": "Waiting for a named approver",
  "human-owned": "No gate — advisory only",
};

const STATUS_COLOR: Record<Tier, string> = {
  "agent-owned": "var(--accent)",
  "human-supervised": "var(--scene-warning-light)",
  "human-owned": "var(--blue)",
};

// On-canvas labels -- 2026-09-14 blind critique: "on load the gate reads as
// an abstract red object, with no visible origin (agent), destination
// (system) or approval state." Same DOM-overlay idiom as
// agent-reach-map/CanvasLoader.tsx's legend (no 3D text, per repo
// convention) -- reads the same checkpointWalkContext state Scene.tsx and
// Interaction.tsx already read (selectedAgentId/selectedWriteIndex,
// defaulted in checkpointWalkContext.tsx to DEFAULT_AGENT_ID / write 0), no
// new data invented. Fixed screen-space anchors (left/center/right), not
// projected from the real 3D positions -- same bounded, non-pixel-tracked
// approach as agent-reach-map's own column labels.
function CheckpointOverlay() {
  const { selectedAgentId, selectedWriteIndex } = useCheckpointWalk();
  const agent = selectedAgentId ? findAgent(selectedAgentId) : undefined;
  const write = agent && selectedWriteIndex !== null ? agent.writes[selectedWriteIndex] : undefined;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] uppercase tracking-wide font-semibold max-w-[38%]"
        style={{ color: "var(--text-muted-on-dark)" }}
      >
        Agent
        {agent && (
          <div
            className="normal-case tracking-normal font-normal mt-0.5 text-[11px] leading-snug"
            style={{ color: "var(--text-on-dark)" }}
          >
            {agent.name}
          </div>
        )}
      </div>
      <div
        className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] uppercase tracking-wide font-semibold text-right max-w-[38%]"
        style={{ color: "var(--text-muted-on-dark)" }}
      >
        System
        {write && (
          <div
            className="normal-case tracking-normal font-normal mt-0.5 text-[11px] leading-snug"
            style={{ color: "var(--text-on-dark)" }}
          >
            {systemRow(write.system).name}
          </div>
        )}
      </div>
      {/* top-24 (96px), not top-3 -- verified live the site's own sticky
          nav (fixed, 89px tall on every breakpoint) covers this canvas's
          literal top edge whenever it's scrolled flush against the
          viewport top (a real resting scroll position, e.g. after
          selecting a write lane in Interaction.tsx below and scrolling
          back up, not just a test artifact) -- 96px clears that with
          margin, and still sits above the Gate's own halo/frame (which
          starts lower, around 1/3 down the canvas), so "near the gate"
          still holds. */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 max-w-[200px] text-center"
        style={{ background: "#05070Ccc", border: "1px solid var(--border)" }}
      >
        <span
          className="text-[10px] uppercase tracking-wide font-semibold"
          style={{ color: "var(--text-muted-on-dark)" }}
        >
          Gate
        </span>
        {write ? (
          <span
            className="text-[11px] font-medium leading-snug flex items-center gap-1.5"
            style={{ color: "var(--text-on-dark)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_COLOR[write.tier] }} />
            {STATUS_LABEL[write.tier]}
          </span>
        ) : (
          <span className="text-[11px]" style={{ color: "var(--text-muted-on-dark)" }}>
            Select an agent
          </span>
        )}
      </div>
    </div>
  );
}

export default function AgentCheckpointWalkCanvasLoader() {
  const [mode, setMode] = useState<SceneLoaderMode>("loading");

  return (
    <CheckpointWalkProvider>
      <div style={{ position: "relative" }}>
        <SceneLoader
          testIdPrefix="agent-checkpoint-walk-canvas"
          renderScene={(onContextLost) => <AgentCheckpointWalkScene onContextLost={onContextLost} />}
          fallback={<Fallback />}
          onModeChange={setMode}
        />
        {mode === "scene" && <CheckpointOverlay />}
      </div>
      {mode === "scene" && <Interaction />}
    </CheckpointWalkProvider>
  );
}
