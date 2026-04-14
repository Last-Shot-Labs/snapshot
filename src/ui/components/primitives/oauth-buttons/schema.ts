import { z } from "zod";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { primitiveTextValueSchema } from "../schema-helpers";

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
  heading: primitiveTextValueSchema.optional(),
  slots: slotsSchema(oauthButtonsSlotNames).optional(),
}).strict();
