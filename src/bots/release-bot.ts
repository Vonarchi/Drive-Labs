import type { DriveBot, BotContext, BotOutput } from "../types/bot";
import path from "node:path";
import fs from "node:fs";
import { makeZip } from "../utils/zip";

export const ReleaseBot: DriveBot = {
  name: "ReleaseBot",
  async run(input, ctx: BotContext): Promise<BotOutput> {
    const runDir = path.join(process.cwd(), "tmp", ctx.runId, "release");
    fs.mkdirSync(runDir, { recursive: true });

    const planned = (input as any).plannedFiles || [];
    for (const f of planned) {
      const outPath = path.join(runDir, f.path);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, f.content, "utf8");
    }

    const zipPath = path.join(process.cwd(), "tmp", `${ctx.runId}-release.zip`);
    await makeZip({ sourceDir: runDir, zipPath });
    return { artifactZipPath: zipPath, notes: "Release ZIP packaged." };
  },
};
