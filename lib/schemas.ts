import { z } from "zod";

export const FileZ = z.object({
  path: z.string().min(1),              // e.g. "app/page.tsx"
  contents: z.string().default(""),
  encoding: z.enum(["utf8","base64"]).default("utf8")
});

export const TemplateInputZ = z.object({
  name: z.string().min(2).max(60),
  description: z.string().max(280).optional(),
  stack: z.enum(["next-tailwind","next-shadcn","remix"]).default("next-tailwind"),
  features: z.array(z.enum([
    "auth","stripe","supabase","seo","og","forms","email","i18n"
  ])).default([]),
  theme: z.object({ primary: z.string().optional(), accent: z.string().optional() }).default({}),
  pages: z.array(z.object({
    route: z.string().regex(/^\/[a-z0-9\-\/]*$/i),
    purpose: z.string()
  })).min(1),
  assets: z.array(FileZ).default([])
});

export type TemplateInput = z.infer<typeof TemplateInputZ>;
