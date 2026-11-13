// Returns the text of the FIRST text block in a Messages API response, or "".
// Newer models can lead with a thinking block, so response.content[0] is not always text
// (the 2026-11-13 Haiku 4.5 -> 5.5 change returned "No JSON in response" from every route that read
// content[0] directly). Always read text through this helper.
import type Anthropic from "@anthropic-ai/sdk";

export function firstText(response: Pick<Anthropic.Message, "content">): string {
  for (const block of response.content) {
    if (block.type === "text") return block.text;
  }
  return "";
}
