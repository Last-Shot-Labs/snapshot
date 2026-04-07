import type { z } from "zod";

/**
 * Schema registry: maps component type strings to their Zod config schemas.
 * Used for manifest validation.
 */
const schemaRegistry = new Map<string, z.ZodType<unknown>>();

/**
 * Register a Zod config schema for a component type.
 * Used during manifest validation to ensure config objects match their schemas.
 *
 * @param type - The component type string (e.g., "layout", "nav")
 * @param schema - The Zod schema for this component's config
 */
export function registerComponentSchema(
  type: string,
  schema: z.ZodType<unknown>,
): void {
  schemaRegistry.set(type, schema);
}

/**
 * Get the registered Zod schema for a component type.
 *
 * @param type - The component type string
 * @returns The Zod schema, or undefined if not registered
 */
export function getComponentSchema(
  type: string,
): z.ZodType<unknown> | undefined {
  return schemaRegistry.get(type);
}

/**
 * Clear all schema registrations. Used in tests.
 * @internal
 */
export function clearSchemaRegistry(): void {
  schemaRegistry.clear();
}
