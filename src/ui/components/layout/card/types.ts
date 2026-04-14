import type { z } from "zod";
import type { cardConfigSchema } from "./schema";

export type CardConfig = z.infer<typeof cardConfigSchema>;
