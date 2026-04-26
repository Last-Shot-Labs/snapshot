import type { NotificationFeedConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, fetches data, delegates to NotificationFeedBase.
 */
export declare function NotificationFeed({ config, }: {
    config: NotificationFeedConfig;
}): import("react/jsx-runtime").JSX.Element | null;
