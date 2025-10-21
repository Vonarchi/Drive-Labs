import { runBotsSequential } from "../utils/bot-runner";
import { UIUXBot } from "../bots/uiux-bot";
import { SecOpsBot } from "../bots/secops-bot";
import { QABot } from "../bots/qa-bot";
import { ReleaseBot } from "../bots/release-bot";
import type { BotContext } from "../types/bot";
import { supabase } from "../utils/supabase";

// highlight: add 'owner_id' from caller context (pass it in via API)
export async function driveLabsPipeline(projectSpec: any, ownerId?: string) {
  const runId = `${projectSpec?.name || "app"}-${Date.now()}`;
  // Insert job with owner_id
  await supa.from("jobs").upsert({ run_id: runId, project_spec: projectSpec, owner_id: ownerId ?? null }).select().single();

  const ctx: BotContext = {
    runId,
    mem: {},
    log: async (ev, data) => {
      await supa.from("job_events").insert({
        run_id: runId,
        bot_name: ev.split(":")[1] || "system",
        event_type: ev.includes("START") ? "start" : ev.includes("END") ? "end" : "note",
        payload: data ?? null,
        owner_id: ownerId ?? null
      });
    }
  };

  const initial = { projectSpec } as any;
  const finalState = await runBotsSequential(
    [UIUXBot, SecOpsBot, QABot, ReleaseBot],
    initial,
    ctx
  );

  const artifactUrl = finalState.artifacts?.[0] || null;
  if (artifactUrl) {
    await supa.from("artifacts").insert({
      run_id: runId, kind: "zip", url: artifactUrl, meta: {}, owner_id: ownerId ?? null
    });
  }

  await supa.from("jobs").update({ status: "done", artifact_url: artifactUrl }).eq("run_id", runId);
  return { runId, finalState };
}
