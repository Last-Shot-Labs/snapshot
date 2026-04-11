import { z } from "zod";
import { fromRefSchema } from "./types";

export const componentTokenOverridesSchema = z.record(z.string());

export const extendedBaseComponentSchema = z.object({
  id: z.string().optional(),
  tokens: componentTokenOverridesSchema.optional(),
  visibleWhen: z.string().optional(),
  visible: z.union([z.boolean(), fromRefSchema]).optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
});

export function extendComponentSchema<T extends z.ZodRawShape>(shape: T) {
  return extendedBaseComponentSchema.extend(shape);
}
