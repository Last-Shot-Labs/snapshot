import type { DropdownMenuConfig } from "./types";
/**
 * Manifest-driven dropdown menu adapter.
 *
 * Resolves primitive values and actions from manifest config, then delegates
 * all rendering to `DropdownMenuBase`.
 */
export declare function DropdownMenu({ config }: {
    config: DropdownMenuConfig;
}): import("react/jsx-runtime").JSX.Element;
