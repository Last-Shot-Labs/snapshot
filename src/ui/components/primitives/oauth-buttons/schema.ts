import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { extendComponentSchema } from "../../_base/schema";

export const oauthButtonsConfigSchema = extendComponentSchema({
  type: z.literal("oauth-buttons"),
  heading: z.string().optional(),
  onSuccess: z.array(actionSchema).optional(),
}).strict();
