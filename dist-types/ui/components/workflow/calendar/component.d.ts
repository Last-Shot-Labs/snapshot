import type { CalendarConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, fetches data, delegates to CalendarBase.
 */
export declare function Calendar({ config }: {
    config: CalendarConfig;
}): import("react/jsx-runtime").JSX.Element | null;
