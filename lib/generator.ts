import { Eta } from "eta";
import * as changeCase from "change-case";
import { TemplateInputZ } from "./schemas";

const eta = new Eta();

export async function generateProjectFiles(raw: unknown) {
  const spec = TemplateInputZ.parse(raw);           // ✅ hard validation
  const ctx = {
    ...spec,
    nameParam: changeCase.kebabCase(spec.name),
    Name: changeCase.pascalCase(spec.name),
  };

  // Load base template files from /templates/next-tailwind/**
  // Any ".eta" file gets rendered; others are copied.
  const out: Array<{ path:string; data:string }> = [];

  const files = await import("./template-manifest").then(m => m.filesFor(spec.stack));
  for (const f of files) {
    if (f.path.endsWith(".eta")) {
            out.push({ path: f.path.replace(/\.eta$/, ""), data: eta.renderString(f.contents, ctx) ?? "" });
    } else {
      out.push({ path: f.path, data: f.contents });
    }
  }

  return out;
}
