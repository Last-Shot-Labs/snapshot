import type { ChatWindowConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, composes manifest sub-components, delegates to ChatWindowBase.
 */
export declare function ChatWindow({ config }: {
    config: ChatWindowConfig;
}): import("react/jsx-runtime").JSX.Element | null;
