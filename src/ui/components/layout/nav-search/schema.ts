import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";
import { actionSchema } from "../../../actions/types";

export const navSearchConfigSchema = extendComponentSchema({
  type: z.literal("nav-search"),
  placeholder: z.string().optional(),
  onSearch: actionSchema.optional(),
  shortcut: z.string().optional(),
  publishTo: z.string().optional(),
}).strict();
