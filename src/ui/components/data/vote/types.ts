import type { z } from "zod";
import type { voteConfigSchema } from "./schema";

/** Inferred config type from the Vote Zod schema. */
export type VoteSchemaConfig = z.infer<typeof voteConfigSchema>;
