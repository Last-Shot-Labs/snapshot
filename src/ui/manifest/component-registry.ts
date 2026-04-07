import type { ComponentType } from "react";

/**
 * A registered component entry mapping a type string to a React component.
 */
interface RegisteredComponent {
  /** The React component implementation. */
  component: ComponentType<{ config: Record<string, unknown> }>;
  /** Whether this is a custom (user-provided) component override. */
  isCustom: boolean;
}

const registry = new Map<string, RegisteredComponent>();

/**
 * Register a component implementation for a given type string.
 * Used by component modules to make themselves available to the manifest renderer.
 *
 * @param type - The component type string (e.g., "layout", "nav", "stat-card")
 * @param component - The React component to render for this type
 * @param options - Registration options
 */
export function registerComponent(
  type: string,
  component: ComponentType<{ config: Record<string, unknown> }>,
  options: { isCustom?: boolean } = {},
): void {
  if (registry.has(type) && !options.isCustom) {
    // Built-in overriding built-in is fine on hot reload; warn otherwise
    if (registry.get(type)?.isCustom) {
      // Custom was already registered; skip built-in
      return;
    }
  }
  if (registry.has(type) && options.isCustom) {
    console.warn(
      `[snapshot] Overriding built-in component "${type}" with custom implementation`,
    );
  }
  registry.set(type, { component, isCustom: options.isCustom ?? false });
}

/**
 * Get the registered component for a given type string.
 *
 * @param type - The component type string
 * @returns The registered component entry, or undefined if not registered
 */
export function getComponent(type: string): RegisteredComponent | undefined {
  return registry.get(type);
}

/**
 * Get all registered component type strings. For debugging and dev tools.
 *
 * @returns Array of registered type strings
 */
export function getRegisteredTypes(): string[] {
  return Array.from(registry.keys());
}

/**
 * Clear all registrations. Used in tests.
 * @internal
 */
export function clearRegistry(): void {
  registry.clear();
}
