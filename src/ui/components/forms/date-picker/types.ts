import type { z } from "zod";
import type { datePickerConfigSchema } from "./schema";

export type DatePickerConfig = z.infer<typeof datePickerConfigSchema>;
