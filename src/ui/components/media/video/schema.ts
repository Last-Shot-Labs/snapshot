import { z } from "zod";

export const videoConfigSchema = z.object({
  type: z.literal("video"),
  id: z.string().optional(),
  src: z.string(),
  poster: z.string().optional(),
  controls: z.boolean().optional(),
  autoPlay: z.boolean().optional(),
  loop: z.boolean().optional(),
  muted: z.boolean().optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
}).strict();
