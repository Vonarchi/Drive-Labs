import express from "express";
import { router as generateRouter } from "./api/generate-app.js";
import { driveLabsPipeline } from "./pipelines/app_pipeline.js";

const app = express();
app.use(express.json());
app.use("/api", generateRouter);

app.post("/pipeline/run", async (req, res) => {
  try {
    const { runId, finalState } = await driveLabsPipeline(req.body?.projectSpec || { name: "labs-app" });
    res.json({ runId, finalState });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message || "pipeline failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Drive Labs Orchestrator listening on ${port}`));
