/**
 * Runtime component registry.
 *
 * Maps component type strings to React component implementations.
 * Used by ComponentRenderer to resolve config → component.
 * Framework registers built-in components; consumers register custom ones.
 */

import type { ConfigDrivenComponent } from "./types";

const runtimeComponentRegistry = new Map<string, ConfigDrivenComponent>();

/**
 * Register a React component for a manifest component type string.
 * Used by the framework for built-in components and by consumers for custom components.
 *
 * Emits a dev warning if overriding an existing registration.
 *
 * @param type - The component type string (e.g. "row", "heading", "stat-card")
 * @param component - The React component that renders this type
 */
export function registerComponent(
  type: string,
  component: ConfigDrivenComponent,
): void {
  if (
    runtimeComponentRegistry.has(type) &&
    typeof process !== "undefined" &&
    process.env?.["NODE_ENV"] === "development"
  ) {
    console.warn(`[snapshot] Overriding component "${type}"`);
  }
  runtimeComponentRegistry.set(type, component);
}

/**
 * Retrieve the registered React component for a type string.
 * Returns undefined if no component is registered for the given type.
 *
 * @param type - The component type string
 * @returns The registered component, or undefined
 */
export function getRegisteredComponent(
  type: string,
): ConfigDrivenComponent | undefined {
  return runtimeComponentRegistry.get(type);
}

export function resetRegisteredComponents(): void {
  runtimeComponentRegistry.clear();
}
