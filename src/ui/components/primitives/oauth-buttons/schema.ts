import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const oauthButtonsSlotNames = [
  "root",
  "heading",
  "provider",
  "providerIcon",
  "providerLabel",
  "providerDescription",
] as const;

export const oauthButtonsConfigSchema = extendComponentSchema({
  type: z.literal("oauth-buttons"),
  heading: z.string().optional(),
  onSuccess: z.array(actionSchema).optional(),
  slots: slotsSchema(oauthButtonsSlotNames).optional(),
}).strict();
