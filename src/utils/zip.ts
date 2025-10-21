import fs from "node:fs";
import archiver from "archiver";

export async function makeZip(opts: { sourceDir: string; zipPath: string }) {
  const { sourceDir, zipPath } = opts;
  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => resolve());
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize().catch(reject);
  });
}

