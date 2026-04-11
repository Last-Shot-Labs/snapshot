import { z } from "zod";

export const embedConfigSchema = z.object({
  type: z.literal("embed"),
  id: z.string().optional(),
  url: z.string(),
  aspectRatio: z.string().optional(),
  title: z.string().optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
}).strict();
