import type { MarkdownConfig } from "./types";
/**
 * Manifest adapter — resolves config refs and delegates to MarkdownBase.
 */
export declare function Markdown({ config }: {
    config: MarkdownConfig;
}): import("react/jsx-runtime").JSX.Element | null;
