import { z } from 'zod';

export const projectSpecSchema = z.object({
  name: z.string().min(1, 'name is required'),
  // add fields as needed
});

export type ProjectSpec = z.infer<typeof projectSpecSchema>;

