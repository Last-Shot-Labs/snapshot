import { z } from "zod";

export const carouselConfigSchema = z.object({
  type: z.literal("carousel"),
  id: z.string().optional(),
  autoPlay: z.boolean().optional(),
  interval: z.number().optional(),
  showDots: z.boolean().optional(),
  showArrows: z.boolean().optional(),
  children: z.array(z.unknown()).optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
}).strict();
