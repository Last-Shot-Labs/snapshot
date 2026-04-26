import type { ContextMenuConfig } from "./types";
/**
 * Manifest-driven context menu adapter.
 *
 * Resolves primitive values and actions from manifest config, handles
 * visibility and state publishing, then delegates all rendering to
 * `ContextMenuBase`.
 */
export declare function ContextMenu({ config }: {
    config: ContextMenuConfig;
}): import("react/jsx-runtime").JSX.Element | null;
