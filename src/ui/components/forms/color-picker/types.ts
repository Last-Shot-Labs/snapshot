import type { z } from "zod";
import type { colorPickerConfigSchema } from "./schema";

export type ColorPickerConfig = z.infer<typeof colorPickerConfigSchema>;
