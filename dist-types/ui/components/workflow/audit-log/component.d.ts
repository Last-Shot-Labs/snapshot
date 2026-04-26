import type { AuditLogConfig } from "./types";
/**
 * Manifest adapter — resolves config refs, fetches data, delegates to AuditLogBase.
 */
export declare function AuditLog({ config }: {
    config: AuditLogConfig;
}): import("react/jsx-runtime").JSX.Element | null;
