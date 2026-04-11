import type { z } from "zod";
import type { sliderConfigSchema } from "./schema";

export type SliderConfig = z.infer<typeof sliderConfigSchema>;
