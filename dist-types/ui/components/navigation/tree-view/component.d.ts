import type { TreeViewConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, handles remote data, publishes
 * state, delegates rendering to TreeViewBase.
 */
export declare function TreeView({ config }: {
    config: TreeViewConfig;
}): import("react/jsx-runtime").JSX.Element | null;
