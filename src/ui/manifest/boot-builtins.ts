/**
 * Boot-time built-in registration.
 *
 * This centralizes the built-in component and flavor registration so the
 * runtime can call it explicitly before any manifest-driven work begins.
 */

import { registerBuiltInComponents } from "../components/register";
import { registerBuiltInFlavors } from "../tokens/flavors";
import { registerBuiltInLayouts } from "../layouts/register";
import { registerBuiltInGuards } from "./guard-registry";

let booted = false;

/**
 * Register all built-in manifest registries exactly once.
 *
 * @returns Nothing.
 */
export function bootBuiltins(): void {
  if (booted) {
    return;
  }

  booted = true;
  registerBuiltInComponents();
  registerBuiltInFlavors();
  registerBuiltInLayouts();
  registerBuiltInGuards();
}

/** Reset the boot flag so tests can re-run built-in registration deterministically. */
export function resetBootBuiltins(): void {
  booted = false;
}
