import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { extendComponentSchema, slotsSchema } from "../../_base/schema";

export const passkeyButtonSlotNames = ["root", "label"] as const;

export const passkeyButtonConfigSchema = extendComponentSchema({
  type: z.literal("passkey-button"),
  label: z.string().default("Sign in with passkey"),
  onSuccess: z.array(actionSchema).optional(),
  slots: slotsSchema(passkeyButtonSlotNames).optional(),
}).strict();
