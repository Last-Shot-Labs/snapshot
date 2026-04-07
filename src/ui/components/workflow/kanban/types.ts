import type { z } from "zod";
import type { kanbanConfigSchema, kanbanColumnSchema } from "./schema";

/** Inferred config type from the Kanban Zod schema. */
export type KanbanConfig = z.infer<typeof kanbanConfigSchema>;

/** Inferred column definition type. */
export type KanbanColumnConfig = z.infer<typeof kanbanColumnSchema>;
