import type { z } from "zod";
import type { ResponsiveValue } from "../tokens/utils";

// ── Data source reference ────────────────────────────────────────────────────

/**
 * A reference to an API endpoint. Used by data-bound components.
 *
 * Short form: `"GET /api/users"`
 * Object form: `{ endpoint: "GET /api/users", params: { status: { from: "status-filter" } } }`
 */
export type DataSourceRef =
  | string
  | {
      endpoint: string;
      params?: Record<string, string | { from: string }>;
      pollInterval?: number;
    };

/**
 * Extracts the HTTP method and path from a data source reference.
 */
export function parseDataSourceRef(ref: DataSourceRef): {
  method: string;
  path: string;
  params?: Record<string, string | { from: string }>;
  pollInterval?: number;
} {
  if (typeof ref === "string") {
    const spaceIdx = ref.indexOf(" ");
    if (spaceIdx === -1) return { method: "GET", path: ref };
    return {
      method: ref.slice(0, spaceIdx).toUpperCase(),
      path: ref.slice(spaceIdx + 1),
    };
  }
  const spaceIdx = ref.endpoint.indexOf(" ");
  if (spaceIdx === -1)
    return {
      method: "GET",
      path: ref.endpoint,
      params: ref.params,
      pollInterval: ref.pollInterval,
    };
  return {
    method: ref.endpoint.slice(0, spaceIdx).toUpperCase(),
    path: ref.endpoint.slice(spaceIdx + 1),
    params: ref.params,
    pollInterval: ref.pollInterval,
  };
}

// ── Component config base ────────────────────────────────────────────────────

/**
 * Base fields present on every component config.
 */
export interface ComponentConfigBase {
  /** Component type name — used to resolve from the registry. */
  type: string;
  /** Optional unique ID for inter-component communication and action targeting. */
  id?: string;
  /** Responsive visibility. */
  visible?: ResponsiveValue<boolean>;
  /** CSS class name override. */
  className?: string;
}

// ── Action reference ─────────────────────────────────────────────────────────

/**
 * An action that a component can trigger.
 * See src/components/actions.ts for the full vocabulary.
 */
export interface ActionRef {
  action: string;
  [key: string]: unknown;
}

// ── Component entry (registry) ───────────────────────────────────────────────

/**
 * A registered component: the React implementation + its config schema.
 */
export interface ComponentEntry {
  /** The React component that renders this config-driven component. */
  component: React.ComponentType<{
    config: Record<string, unknown>;
    id?: string;
  }>;
  /** Zod schema that validates the config for this component type. */
  schema: z.ZodType;
}
