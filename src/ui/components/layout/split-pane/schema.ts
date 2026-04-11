import { z } from "zod";

export const splitPaneConfigSchema = z.object({
  type: z.literal("split-pane"),
  id: z.string().optional(),
  direction: z.enum(["horizontal", "vertical"]).optional(),
  defaultSplit: z.number().min(0).max(100).optional(),
  minSize: z.number().optional(),
  children: z.array(z.unknown()).max(2),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
}).strict();
