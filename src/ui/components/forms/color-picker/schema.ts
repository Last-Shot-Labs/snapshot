import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { baseComponentConfigSchema } from "../../_base/types";

/** Schema for color picker components with optional swatches, alpha, and change actions. */
export const colorPickerConfigSchema = baseComponentConfigSchema
  .extend({
    type: z.literal("color-picker"),
    format: z.enum(["hex", "rgb", "hsl"]).default("hex"),
    defaultValue: z.string().optional(),
    swatches: z.array(z.string()).optional(),
    allowCustom: z.boolean().default(true),
    showAlpha: z.boolean().default(false),
    label: z.string().optional(),
    onChange: z.union([actionSchema, z.array(actionSchema)]).optional(),
  })
  .strict();
