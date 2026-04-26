import type { TimelineConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, wires actions/publish, and delegates to TimelineBase.
 */
export declare function Timeline({ config }: {
    config: TimelineConfig;
}): import("react/jsx-runtime").JSX.Element | null;
