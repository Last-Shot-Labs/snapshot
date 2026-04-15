import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

function responsiveValueSchema<T extends z.ZodTypeAny>(valueSchema: T) {
  return z.union([
    valueSchema,
    z
      .object({
        default: valueSchema,
        sm: valueSchema.optional(),
        md: valueSchema.optional(),
        lg: valueSchema.optional(),
        xl: valueSchema.optional(),
        "2xl": valueSchema.optional(),
      })
      .strict(),
  ]);
}

export const rowConfigSchema = extendComponentSchema({
  type: z.literal("row"),
  children: z.array(componentConfigSchema).min(1),
  gap: responsiveValueSchema(
    z.enum(["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]),
  ).optional(),
  justify: z.enum(["start", "center", "end", "between", "around"]).optional(),
  align: z.enum(["start", "center", "end", "stretch"]).optional(),
  wrap: z.boolean().optional(),
  overflow: z.enum(["auto", "hidden", "scroll", "visible"]).optional(),
  maxHeight: z.string().optional(),
  slots: slotsSchema(["root", "item"]).optional(),
}).strict();
