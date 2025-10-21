// src/server.ts
import express from 'express';
import { projectSpecSchema } from './schemas/project_spec'; // no .js
import { runPipeline } from './pipeline/run';               // no .js
import { driveLabsPipeline } from './pipelines/app_pipeline'; // no .js
import { router as generateRouter } from './api/generate-app';

const app = express();
app.use(express.json());
app.use('/api', generateRouter);

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
  });
});

// Add an owner extractor. If you're fronting with Supabase Auth, pass user id in header `x-user-id` from your API gateway/Edge Function.
app.post("/pipeline/run", async (req, res) => {
  try {
    const ownerId = (req.headers["x-user-id"] as string) || undefined;
    const { runId, finalState } = await driveLabsPipeline(req.body?.projectSpec || { name: "labs-app" }, ownerId);
    res.json({ runId, finalState });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message || "pipeline failed" });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`[orchestrator] listening on http://localhost:${port} (${process.env.NODE_ENV || 'development'})`);
});
