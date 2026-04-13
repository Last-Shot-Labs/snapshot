import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { baseComponentConfigSchema } from "../../_base/types";

const disabledDateSchema = z.union([
  z.string(),
  z
    .object({
      dayOfWeek: z.array(z.number().int().min(0).max(6)),
    })
    .strict(),
]);

const presetSchema = z
  .object({
    label: z.string(),
    start: z.string(),
    end: z.string(),
  })
  .strict();

/** Schema for date picker components covering single, range, and multi-date selection. */
export const datePickerConfigSchema = baseComponentConfigSchema
  .extend({
    type: z.literal("date-picker"),
    mode: z.enum(["single", "range", "multiple"]).default("single"),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    min: z.string().optional(),
    max: z.string().optional(),
    disabledDates: z.array(disabledDateSchema).optional(),
    presets: z.array(presetSchema).optional(),
    format: z.string().optional(),
    valueFormat: z.enum(["iso", "unix", "locale"]).default("iso"),
    onChange: z.union([actionSchema, z.array(actionSchema)]).optional(),
  })
  .strict();
