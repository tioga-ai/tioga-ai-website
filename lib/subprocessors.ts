// Single source for the website's subprocessor list. Used by /trust and /working-with-us so they cannot disagree.
export const SUBPROCESSORS = [
  { name: "Anthropic", purpose: "Processes text submitted to demos, the chat widget, and contact-form classification, per Anthropic's own privacy policy." },
  { name: "Google (Gmail SMTP)", purpose: "Delivers contact-form notifications, build-log sign-up notifications, and optional demo-result emails — nothing beyond that." },
  { name: "Vercel", purpose: "Hosts this site and its serverless functions, and provides its web analytics and page-performance measurement (Vercel Web Analytics and Speed Insights)." },
  { name: "Cal.com", purpose: "Processes the name, email, and scheduling details you provide when you book an intro call, per its own privacy policy." },
];
