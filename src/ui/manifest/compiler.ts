import type { SafeParseReturnType, ZodError } from "zod";
import { getMissingAuthScreenIds } from "./auth-routes";
import { manifestConfigSchema, withManifestCustomComponents } from "./schema";
import type {
  CompiledManifest,
  CompiledRoute,
  ManifestConfig,
  PageConfig,
  RouteConfig,
} from "./types";

function toPageConfig(route: RouteConfig): PageConfig {
  return {
    layout: route.layout,
    title: route.title,
    content: route.content,
    roles: route.roles,
    breadcrumb: route.breadcrumb,
  };
}

function buildCompiledManifest(manifest: ManifestConfig): CompiledManifest {
  const missingAuthScreens = getMissingAuthScreenIds(manifest);
  if (missingAuthScreens.length > 0) {
    const screen = missingAuthScreens[0];
    throw new Error(
      `Auth screen "${screen}" is enabled but no route has id "${screen}". Add { "id": "${screen}", "path": "/your-path", ... } to routes.`,
    );
  }

  const routes: CompiledRoute[] = manifest.routes.map((route) => ({
    id: route.id,
    path: route.path,
    page: toPageConfig(route),
    preload: route.preload,
    refreshOnEnter: route.refreshOnEnter,
    invalidateOnLeave: route.invalidateOnLeave,
    enter: route.enter,
    leave: route.leave,
    guard: route.guard,
  }));

  const routeMap = Object.fromEntries(
    routes.map((route) => [route.path, route]),
  ) as Record<string, CompiledRoute>;

  return {
    raw: manifest,
    app: {
      shell: manifest.app?.shell ?? "full-width",
      title: manifest.app?.title,
      home: manifest.app?.home ?? routes[0]?.path,
      loading: manifest.app?.loading,
      error: manifest.app?.error,
      notFound: manifest.app?.notFound,
      offline: manifest.app?.offline,
    },
    theme: manifest.theme,
    state: manifest.state,
    resources: manifest.resources,
    workflows: manifest.workflows,
    overlays: manifest.overlays,
    navigation: manifest.navigation,
    auth: manifest.auth,
    routes,
    routeMap,
    firstRoute: routes[0] ?? null,
  };
}

/**
 * Define a manifest without compiling it.
 *
 * @param manifest - Manifest object to return unchanged
 * @returns The same manifest object, typed as `ManifestConfig`
 */
export function defineManifest<TManifest extends ManifestConfig>(
  manifest: TManifest,
): TManifest {
  return manifest;
}

/**
 * Parse an unknown value into a validated manifest.
 *
 * @param manifest - Unknown input value
 * @returns The parsed manifest
 */
export function parseManifest(manifest: unknown): ManifestConfig {
  return withManifestCustomComponents(manifest, () =>
    manifestConfigSchema.parse(manifest),
  );
}

/**
 * Parse an unknown value into a validated manifest without throwing.
 *
 * @param manifest - Unknown input value
 * @returns A Zod safe-parse result for the manifest
 */
export function safeParseManifest(
  manifest: unknown,
): SafeParseReturnType<unknown, ManifestConfig> {
  return withManifestCustomComponents(manifest, () =>
    manifestConfigSchema.safeParse(manifest),
  );
}

/**
 * Parse and compile a manifest into the runtime shape.
 *
 * @param manifest - Manifest JSON or object
 * @returns The compiled manifest runtime model
 */
export function compileManifest(manifest: unknown): CompiledManifest {
  return buildCompiledManifest(parseManifest(manifest));
}

/**
 * Parse and compile a manifest without throwing.
 *
 * @param manifest - Manifest JSON or object
 * @returns The parsed manifest and compiled runtime model, or validation errors
 */
export function safeCompileManifest(manifest: unknown):
  | { success: true; manifest: ManifestConfig; compiled: CompiledManifest }
  | {
      success: false;
      error: ZodError<unknown>;
    } {
  const parsed = safeParseManifest(manifest);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error,
    };
  }

  return {
    success: true,
    manifest: parsed.data,
    compiled: buildCompiledManifest(parsed.data),
  };
}
