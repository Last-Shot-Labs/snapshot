import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { fromRefSchema } from "../../_base/types";

/**
 * Inline code primitive schema for manifest-rendered code snippets.
 */
export const codeConfigSchema = extendComponentSchema({
  type: z.literal("code"),
  value: z.union([z.string(), fromRefSchema]),
  fallback: z.string().optional(),
  slots: slotsSchema(["root"]).optional(),
}).strict();
