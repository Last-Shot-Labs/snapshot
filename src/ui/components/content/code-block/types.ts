import type { z } from "zod";
import type { codeBlockConfigSchema } from "./schema";

/** Inferred config type from the CodeBlock Zod schema. */
export type CodeBlockConfig = z.infer<typeof codeBlockConfigSchema>;
