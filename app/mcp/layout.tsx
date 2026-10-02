import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MCP Integrations",
    template: "%s — Tioga AI",
  },
  description:
    "See how Claude connects to enterprise systems like SAP, Workday, and Salesforce via the Model Context Protocol — an interactive demo on mock data.",
  alternates: { canonical: "/mcp" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "MCP Integrations — Tioga AI",
    description:
      "How Claude connects to SAP, Salesforce, and ServiceNow via the Model Context Protocol.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCP Integrations — Tioga AI",
    description: "How Claude connects to SAP, Salesforce, and ServiceNow via the Model Context Protocol.",
    images: ["/opengraph-image"],
  },
};

export default function McpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
