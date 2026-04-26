import type { FloatingMenuConfig } from "./types";
export { FloatingPanel, MenuItem, MenuSeparator, MenuLabel, FloatingMenuStyles, type FloatingPanelProps, type MenuItemProps, } from "./shared";
/**
 * Manifest-driven floating menu adapter.
 *
 * Resolves template strings and actions from manifest config, then delegates
 * all rendering to `FloatingMenuBase`.
 */
export declare function FloatingMenu({ config }: {
    config: FloatingMenuConfig;
}): import("react/jsx-runtime").JSX.Element;
