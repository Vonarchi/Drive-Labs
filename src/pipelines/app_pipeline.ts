import { runBotsSequential } from "../utils/bot-runner.js";
import { UIUXBot } from "../bots/uiux-bot.js";
import { SecOpsBot } from "../bots/secops-bot.js";
import { QABot } from "../bots/qa-bot.js";
import { ReleaseBot } from "../bots/release-bot.js";
import { BotContext } from "../types/bot.js";

export async function driveLabsPipeline(projectSpec: any) {
  const runId = `${projectSpec?.name || "app"}-${Date.now()}`;
  const ctx: BotContext = {
    runId,
    mem: {},
    log: (ev, data) => console.log(`[${runId}] ${ev}`, data ?? "")
  };

  const initial = { projectSpec } as any;
  const finalState = await runBotsSequential(
    [UIUXBot, SecOpsBot, QABot, ReleaseBot],
    initial,
    ctx
  );
  return { runId, finalState };
}
