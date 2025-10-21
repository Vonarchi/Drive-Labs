import { DriveBot, BotOutput } from "../types/bot.js";

export const UIUXBot: DriveBot = {
  name: "UIUXBot",
  async run(): Promise<BotOutput> {
    const files = [
      { path: "design/tokens.json", content: JSON.stringify({
          color: { primary: "#111827", accent: "#2563eb" },
          font: { base: "Inter, system-ui, sans-serif" },
          radius: { lg: "16px" }, space: { md: "16px" }
      }, null, 2)},
      { path: "design/ia.md", content: "# IA\n- Home\n- Pricing\n- Docs\n- Account (later)" },
      { path: "design/wireframes.md", content: "# Wireframes (textual)\nHome: Hero -> Features -> CTA\nPricing: Tiers -> CTA\nDocs: Sidebar -> Content" },
    ];
    return { files, notes: "Proposed tokens, IA, and wireframes." };
  },
};
