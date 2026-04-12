import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";
import { actionSchema } from "../../../actions/types";

export const navUserMenuConfigSchema = extendComponentSchema({
  type: z.literal("nav-user-menu"),
  showAvatar: z.boolean().optional(),
  showEmail: z.boolean().optional(),
  showName: z.boolean().optional(),
  mode: z.enum(["full", "compact"]).optional(),
  items: z
    .array(
      z
        .object({
          label: z.string(),
          icon: z.string().optional(),
          action: actionSchema,
          roles: z.array(z.string()).optional(),
        })
        .strict(),
    )
    .optional(),
}).strict();
