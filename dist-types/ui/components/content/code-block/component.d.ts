import type { CodeBlockConfig } from "./types";
/**
 * Manifest adapter — resolves config refs and delegates to CodeBlockBase.
 */
export declare function CodeBlock({ config }: {
    config: CodeBlockConfig;
}): import("react/jsx-runtime").JSX.Element | null;
