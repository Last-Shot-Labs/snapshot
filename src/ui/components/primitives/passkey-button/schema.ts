import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";
import { primitiveTextValueSchema } from "../schema-helpers";

export const passkeyButtonSlotNames = ["root", "label"] as const;

export const passkeyButtonConfigSchema = extendComponentSchema({
  type: z.literal("passkey-button"),
  label: primitiveTextValueSchema.default("Sign in with passkey"),
  onSuccess: z.union([actionSchema, z.array(actionSchema)]).optional(),
  onError: z.union([actionSchema, z.array(actionSchema)]).optional(),
  slots: slotsSchema(passkeyButtonSlotNames).optional(),
}).strict();
