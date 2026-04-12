import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema } from "../../_base/schema";

export const hoverCardConfigSchema = extendComponentSchema({
  type: z.literal("hover-card"),
  trigger: componentConfigSchema,
  content: z.array(componentConfigSchema),
  align: z.enum(["start", "center", "end"]).optional(),
  side: z.enum(["top", "bottom", "left", "right"]).optional(),
  openDelay: z.number().optional(),
  closeDelay: z.number().optional(),
  width: z.string().optional(),
}).strict();
