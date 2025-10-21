import { z } from "zod";

export const ProjectSpec = z.object({
  name: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/i, "use letters, numbers, dash"),
  description: z.string().max(500).optional(),
  templates: z.array(z.string().min(1)).min(1),
  variables: z.record(z.any()).default({}),
  mode: z.enum(["local","drive"]).default("local")
});

export type ProjectSpecT = z.infer<typeof ProjectSpec>;

