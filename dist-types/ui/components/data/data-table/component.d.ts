import type { DataTableConfig } from "./types";
/**
 * Config-driven DataTable component.
 *
 * For simple tables (no drag-and-drop, virtual scroll, context menus,
 * or expandable rows), delegates to the standalone DataTableBase.
 * For advanced features, falls back to the full manifest-based rendering.
 */
export declare function DataTable({ config }: {
    config: DataTableConfig;
}): import("react/jsx-runtime").JSX.Element;
