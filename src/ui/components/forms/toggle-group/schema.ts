import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";
import { fromRefSchema } from "../../_base/types";
import { actionSchema } from "../../../actions/types";

export const toggleGroupConfigSchema = extendComponentSchema({
  type: z.literal("toggle-group"),
  mode: z.enum(["single", "multiple"]).optional(),
  items: z.array(
    z
      .object({
        value: z.string(),
        label: z.string().optional(),
        icon: z.string().optional(),
        disabled: z.union([z.boolean(), fromRefSchema]).optional(),
      })
      .strict(),
  ),
  defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
  value: z.union([z.string(), z.array(z.string()), fromRefSchema]).optional(),
  size: z.enum(["sm", "md", "lg"]).optional(),
  variant: z.enum(["outline", "ghost"]).optional(),
  publishTo: z.string().optional(),
  onChange: actionSchema.optional(),
}).strict();
