import express from "express";
import path from "node:path";
import fs from "node:fs";
import { Eta } from "eta";
import { ProjectSpec } from "../schemas/project_spec.js";
import { makeZip } from "../utils/zip.js";
import { uploadToDrive } from "../utils/drive.js";

export const router = express.Router();

router.post("/generate-app", express.json({ limit: "2mb" }), async (req, res) => {
  try {
    const spec = ProjectSpec.parse(req.body);

    const runId = `${spec.name}-${Date.now()}`;
    const outDir = path.join(process.cwd(), "tmp", runId);
    fs.mkdirSync(outDir, { recursive: true });

    for (const tpl of spec.templates) {
      const tplPath = path.join(process.cwd(), "src", "templates", tpl);
      if (!fs.existsSync(tplPath)) {
        return res.status(400).json({ errors: [{ path: ["templates"], message: `missing template: ${tpl}` }] });
      }
      const eta = new Eta();
      const templateContent = await eta.readFile(tplPath);
      const rendered = await eta.renderStringAsync(templateContent, { ...spec.variables, spec });
      if (rendered == null) return res.status(500).json({ error: `Failed to render ${tpl}` });

      const outName = tpl.endsWith(".eta") ? tpl.slice(0, -4) : tpl;
      const outPath = path.join(outDir, outName);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, typeof rendered === "string" ? rendered : String(rendered), "utf8");
    }

    const zipPath = path.join(process.cwd(), "tmp", `${runId}.zip`);
    await makeZip({ sourceDir: outDir, zipPath });

    if (spec.mode === "drive") {
      try {
        const { link } = await uploadToDrive(zipPath);
        return res.json({ status: "ok", mode: "drive", link, artifact: path.basename(zipPath) });
      } catch (e) {
        console.error("Drive upload failed:", e);
        return res.status(502).json({ error: "Drive upload failed" });
      }
    }

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(zipPath)}"`);
    fs.createReadStream(zipPath).pipe(res);
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ errors: err.issues });
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
