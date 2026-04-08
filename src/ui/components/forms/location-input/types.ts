import type { z } from "zod";
import type { locationInputConfigSchema } from "./schema";

/** Inferred config type from the LocationInput Zod schema. */
export type LocationInputConfig = z.infer<typeof locationInputConfigSchema>;
