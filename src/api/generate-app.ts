import express from "express";
import path from "node:path";
import fs from "node:fs";
import { Eta } from "eta";
import { projectSpecSchema } from "../schemas/project_spec";
import { makeZip } from "../utils/zip";
import { uploadToDrive } from "../utils/drive";

export const router = express.Router();

router.post("/generate-app", express.json({ limit: "2mb" }), async (req, res) => {
  try {
    const spec = projectSpecSchema.parse(req.body);

    const runId = `${spec.name}-${Date.now()}`;
    const outDir = path.join(process.cwd(), "tmp", runId);
    fs.mkdirSync(outDir, { recursive: true });

    // Create a simple README for the project
    const readmePath = path.join(outDir, "README.md");
    fs.writeFileSync(readmePath, `# ${spec.name}\n\nGenerated project.\n`, "utf8");

    const zipPath = path.join(process.cwd(), "tmp", `${runId}.zip`);
    await makeZip({ sourceDir: outDir, zipPath });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(zipPath)}"`);
    fs.createReadStream(zipPath).pipe(res);
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ errors: err.issues });
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
