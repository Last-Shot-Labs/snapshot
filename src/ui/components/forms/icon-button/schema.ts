import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { fromRefSchema } from "../../_base/types";
import { actionSchema } from "../../../actions/types";

export const iconButtonConfigSchema = extendComponentSchema({
  type: z.literal("icon-button"),
  icon: z.string(),
  size: z.enum(["xs", "sm", "md", "lg"]).optional(),
  variant: z
    .enum(["default", "secondary", "outline", "ghost", "destructive", "link"])
    .optional(),
  shape: z.enum(["circle", "square"]).optional(),
  ariaLabel: z.string(),
  action: actionSchema.optional(),
  disabled: z.union([z.boolean(), fromRefSchema]).optional(),
  tooltip: z.union([z.string(), fromRefSchema]).optional(),
  slots: slotsSchema(["root", "icon"]).optional(),
}).strict();
