import ApExceptionWorkflow from "./ApExceptionWorkflow";
import ApWalkthroughVideo, { AP_WALKTHROUGH } from "@/components/explainer/ApWalkthroughVideo";

// Server wrapper (2026-10-19): the simulation itself is a client component; this reads MEDIA_ORIGIN at
// request time and passes the click-to-play walkthrough in as a slot. Same validation as
// next.config.js and /solutions/governed-write-path: a bad origin must not render a player with no route.
export default function ApExceptionWorkflowPage() {
  const origin = (process.env.MEDIA_ORIGIN ?? "").replace(/\/$/, "");
  const src = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(origin) ? `/media/${AP_WALKTHROUGH.file}` : undefined;
  return <ApExceptionWorkflow walkthrough={<ApWalkthroughVideo src={src} />} />;
}
