/**
 * Runtime breakpoint detection hooks.
 *
 * Uses `window.matchMedia` for efficient, event-driven breakpoint detection.
 * Falls back to `"default"` in SSR environments where `window` is unavailable.
 *
 * @module
 */

import { useSyncExternalStore } from "react";

/** Breakpoint pixel thresholds (mobile-first, min-width). */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** All breakpoint names including `"default"` (below `sm`). */
export type Breakpoint = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Ordered breakpoint names from largest to smallest for cascade resolution. */
const ORDERED: Breakpoint[] = ["2xl", "xl", "lg", "md", "sm", "default"];

/** Ordered breakpoint names from smallest to largest for matchMedia setup. */
const ASCENDING: (keyof typeof BREAKPOINTS)[] = ["sm", "md", "lg", "xl", "2xl"];

// ── Singleton store ────────────────────────────────────────────────────────
//
// One set of matchMedia listeners shared across all hook instances.
// The store follows the useSyncExternalStore contract.

let currentBreakpoint: Breakpoint = "default";
const listeners = new Set<() => void>();
let initialized = false;

function getSnapshot(): Breakpoint {
  return currentBreakpoint;
}

function getServerSnapshot(): Breakpoint {
  return "default";
}

function subscribe(listener: () => void): () => void {
  // Lazily initialize matchMedia listeners on first subscription
  if (
    !initialized &&
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
  ) {
    initialized = true;
    initMatchMedia();
  }

  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

function computeBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "default";

  const width = window.innerWidth;
  // Walk from largest to smallest — first match wins
  for (const bp of ASCENDING.slice().reverse()) {
    if (width >= BREAKPOINTS[bp]) return bp;
  }
  return "default";
}

function initMatchMedia(): void {
  // Set initial value
  currentBreakpoint = computeBreakpoint();

  // Create a matchMedia listener for each breakpoint
  for (const bp of ASCENDING) {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`);
    const handler = () => {
      const next = computeBreakpoint();
      if (next !== currentBreakpoint) {
        currentBreakpoint = next;
        notifyListeners();
      }
    };
    // Modern browsers
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    }
  }
}

// ── Pure resolution function ───────────────────────────────────────────────

/**
 * Resolve a responsive value for a given breakpoint.
 *
 * Cascades down: if the active breakpoint isn't defined, falls back to the
 * next smaller breakpoint, then `default`. For flat (non-object) values,
 * returns the value directly.
 *
 * @param value - A flat value or a responsive breakpoint map
 * @param breakpoint - The active breakpoint to resolve for
 * @returns The resolved value for the given breakpoint
 */
export function resolveResponsiveValue<T>(
  value: T | { default: T; sm?: T; md?: T; lg?: T; xl?: T; "2xl"?: T },
  breakpoint: Breakpoint,
): T {
  // Flat value — return directly
  if (value === null || typeof value !== "object" || !("default" in value)) {
    return value as T;
  }

  const map = value as {
    default: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    "2xl"?: T;
  };

  // Find the active breakpoint's index in the ordered list (largest first)
  const idx = ORDERED.indexOf(breakpoint);

  // Walk from the active breakpoint down to default, return first defined value
  for (let i = idx; i < ORDERED.length; i++) {
    const bp = ORDERED[i]!;
    if (bp === "default") return map.default;
    if (bp in map && map[bp] !== undefined) return map[bp] as T;
  }

  return map.default;
}

// ── Hooks ──────────────────────────────────────────────────────────────────

/**
 * Returns the currently active breakpoint based on window width.
 *
 * Uses `matchMedia` for efficient, event-driven updates (no resize polling).
 * Returns `"default"` during SSR.
 */
export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Resolve a responsive value to the appropriate value for the current breakpoint.
 *
 * Accepts either a flat value (returned as-is) or a responsive map with
 * breakpoint keys. Falls back to the next smaller defined breakpoint.
 *
 * @param value - A flat value or responsive breakpoint map
 * @returns The resolved value for the current viewport width
 */
export function useResponsiveValue<T>(
  value: T | { default: T; sm?: T; md?: T; lg?: T; xl?: T; "2xl"?: T },
): T {
  const breakpoint = useBreakpoint();
  return resolveResponsiveValue(value, breakpoint);
}
