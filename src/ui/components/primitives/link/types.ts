import type { z } from "zod";
import type { linkConfigSchema } from "./schema";

export type LinkConfig = z.infer<typeof linkConfigSchema>;
