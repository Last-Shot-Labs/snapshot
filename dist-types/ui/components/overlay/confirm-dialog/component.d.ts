import type { ConfirmDialogConfig } from "./types";
/**
 * Manifest-driven confirmation dialog adapter.
 *
 * Resolves primitive values and actions from manifest config, then delegates
 * all rendering to `ConfirmDialogBase`.
 */
export declare function ConfirmDialogComponent({ config, }: {
    config: ConfirmDialogConfig;
}): import("react/jsx-runtime").JSX.Element;
