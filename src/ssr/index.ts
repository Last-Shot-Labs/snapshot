// src/ssr/index.ts
// Public exports for @lastshotlabs/snapshot/ssr
// Server-side only — not for browser bundles.

// ─── Core render function ─────────────────────────────────────────────────────

/**
 * Core streaming render function.
 * Called by renderer factories; rarely used directly by consumers.
 */
export { renderPage } from "./render";

// ─── Renderers ────────────────────────────────────────────────────────────────

/**
 * File-based React renderer for bunshot-ssr.
 *
 * Routes are resolved from `server/routes/` directory files.
 * Use with `createSsrPlugin` from `@lastshotlabs/bunshot-ssr`.
 */
export { createReactRenderer } from "./renderer";

/**
 * Manifest-driven SSR renderer for bunshot-ssr.
 *
 * Routes are resolved from the Snapshot manifest config.
 * Enables SSR for config-driven pages with no server route files required.
 */
export { createManifestRenderer } from "./manifest-renderer";

// ─── Types — renderer config ──────────────────────────────────────────────────

export type {
  /** Config for `createReactRenderer()`. */
  SnapshotSsrConfig,
  /** Config for `createManifestRenderer()`. */
  ManifestSsrConfig,
  /** Server-side resolver for a named manifest resource. */
  ManifestPreloadResolver,
  /** Structural equivalent of `SsrRouteMatch` from bunshot-ssr. */
  ServerRouteMatchShape,
  /** Structural equivalent of `SsrShell` from bunshot-ssr. */
  SsrShellShape,
  /** Per-request SSR context (fresh QueryClient per request). */
  SsrRequestContext,
} from "./types";

// ─── Types — server route file contract ──────────────────────────────────────
// Consumers import from @lastshotlabs/snapshot/ssr only — not from bunshot-ssr.

export type {
  /** Context passed to every `load()` and `meta()` function. */
  SsrLoadContext,
  /** Union of all valid `load()` return types. */
  SsrLoaderReturn,
  /** Successful `load()` result with data and optional query cache entries. */
  SsrLoadResult,
  /** Redirect signal from `load()`. */
  SsrRedirectResult,
  /** Not-found signal from `load()`. */
  SsrNotFoundResult,
  /** A TanStack Query cache entry to pre-seed during SSR. */
  SsrQueryCacheEntry,
} from "./types";

// ─── Types — meta / head injection ───────────────────────────────────────────

/**
 * Structural equivalent of `SsrMeta` from bunshot-ssr.
 * Used as the return type of server route `meta()` functions.
 */
export type { SsrMetaShape as SsrMeta } from "./head";

// ─── State utilities (exported for testing / advanced use) ────────────────────

/** XSS-safe JSON serialization. Safe to embed in `<script>` tags. */
export { safeJsonStringify } from "./state";
