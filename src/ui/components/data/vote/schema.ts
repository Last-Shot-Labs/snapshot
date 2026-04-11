import { z } from "zod";

export const voteConfigSchema = z.object({
  type: z.literal("vote"),
  id: z.string().optional(),
  value: z.union([z.number(), z.object({ $ref: z.string() })]).optional(),
  upAction: z.record(z.unknown()).optional(),
  downAction: z.record(z.unknown()).optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
}).strict();
