import type { KanbanConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, fetches data, delegates to KanbanBase.
 */
export declare function Kanban({ config }: {
    config: KanbanConfig;
}): import("react/jsx-runtime").JSX.Element | null;
