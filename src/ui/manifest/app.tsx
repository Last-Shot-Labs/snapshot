/**
 * ManifestApp — renders an entire application from a manifest config.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createSnapshot } from "../../create-snapshot";
import { SnapshotApiContext, useActionExecutor } from "../actions/executor";
import { AppContextProvider, useResolveFrom, useSubscribe } from "../context/index";
import { Nav } from "../components/layout/nav";
import { DrawerComponent } from "../components/overlay/drawer";
import { ModalComponent } from "../components/overlay/modal";
import { resolveTokens } from "../tokens/resolve";
import { compileManifest } from "./compiler";
import {
  ManifestRuntimeProvider,
  RouteRuntimeProvider,
  useManifestResourceCache,
} from "./runtime";
import { PageRenderer } from "./renderer";
import type {
  CompiledManifest,
  CompiledRoute,
  ManifestAppProps,
  OverlayConfig,
} from "./types";

export function injectStyleSheet(id: string, css: string): void {
  if (typeof document === "undefined") return;
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

function evaluateRouteGuard(
  route: CompiledRoute | null,
  user: Record<string, unknown> | null,
  resolvedCondition: unknown,
): boolean {
  if (!route?.guard) {
    return true;
  }

  const roles = [
    ...(typeof user?.["role"] === "string" ? [String(user["role"])] : []),
    ...(Array.isArray(user?.["roles"])
      ? (user?.["roles"] as unknown[]).map((value) => String(value))
      : []),
  ];

  if (route.guard.authenticated && !user) {
    return false;
  }

  if (
    route.guard.roles &&
    route.guard.roles.length > 0 &&
    !route.guard.roles.some((role) => roles.includes(role))
  ) {
    return false;
  }

  if (route.guard.condition) {
    const operator = route.guard.condition.operator ?? "truthy";
    const left =
      resolvedCondition && typeof resolvedCondition === "object"
        ? (resolvedCondition as Record<string, unknown>)["left"]
        : undefined;
    const right =
      resolvedCondition && typeof resolvedCondition === "object"
        ? (resolvedCondition as Record<string, unknown>)["right"]
        : undefined;

    switch (operator) {
      case "falsy":
        return !left;
      case "equals":
        return left === right;
      case "not-equals":
        return left !== right;
      case "exists":
        return left !== undefined && left !== null;
      default:
        return Boolean(left);
    }
  }

  return true;
}

function OverlayHost({
  overlays,
}: {
  overlays?: Record<string, OverlayConfig>;
}) {
  if (!overlays) {
    return null;
  }

  return (
    <>
      {Object.entries(overlays).map(([id, overlay]) => {
        if (overlay.type === "drawer") {
          return (
            <DrawerComponent
              key={id}
              config={{ ...overlay, id } as Parameters<typeof DrawerComponent>[0]["config"]}
            />
          );
        }

        return (
          <ModalComponent
            key={id}
            config={{ ...overlay, id } as Parameters<typeof ModalComponent>[0]["config"]}
          />
        );
      })}
    </>
  );
}

function AppShell({
  manifest,
  route,
  currentPath,
  navigate,
  isPreloading,
  api,
}: {
  manifest: CompiledManifest;
  route: CompiledRoute;
  currentPath: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  isPreloading: boolean;
  api: ReturnType<typeof createSnapshot>["api"];
}) {
  const shell =
    route.page.layout ??
    manifest.app.shell ??
    (manifest.navigation?.mode === "top-nav" ? "top-nav" : "full-width");
  const navConfig = manifest.navigation
    ? ({
        type: "nav",
        items: manifest.navigation.items,
        collapsible: true,
        userMenu: true,
      } as const)
    : null;

  const page = (
    <main
      style={{
        flex: 1,
        minWidth: 0,
        overflow: "auto",
      }}
    >
      {isPreloading ? (
        <div data-snapshot-route-loading="" style={{ padding: "1rem" }}>
          Loading...
        </div>
      ) : (
        <PageRenderer
          page={route.page}
          routeId={route.id}
          state={manifest.state}
          resources={manifest.resources}
          api={api}
        />
      )}
    </main>
  );

  if (!navConfig || shell === "minimal" || shell === "full-width") {
    return page;
  }

  if (shell === "top-nav") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid var(--sn-color-border, #e5e7eb)",
          }}
        >
          <Nav config={navConfig} pathname={currentPath} onNavigate={(path) => navigate(path)} />
        </div>
        {page}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "280px",
          borderRight: "1px solid var(--sn-color-border, #e5e7eb)",
          flexShrink: 0,
        }}
      >
        <Nav config={navConfig} pathname={currentPath} onNavigate={(path) => navigate(path)} />
      </aside>
      {page}
    </div>
  );
}

interface ManifestRouterProps {
  manifest: CompiledManifest;
  api: ReturnType<typeof createSnapshot>["api"];
}

function ManifestRouter({ manifest, api }: ManifestRouterProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === "undefined") return "/";
    return window.location.pathname;
  });
  const [isPreloading, setIsPreloading] = useState(false);
  const execute = useActionExecutor();
  const resourceCache = useManifestResourceCache();
  const previousRouteRef = useRef<CompiledRoute | null>(null);
  const rawUser = useSubscribe({ from: "global.user" }) as
    | Record<string, unknown>
    | null;

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, "", to);
    } else {
      window.history.pushState({}, "", to);
    }
    setCurrentPath(to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const route =
    manifest.routeMap[currentPath] ??
    (manifest.app.home ? manifest.routeMap[manifest.app.home] : undefined) ??
    manifest.firstRoute ??
    (manifest.app.notFound ? manifest.routeMap[manifest.app.notFound] : undefined) ??
    null;

  const resolvedGuard = useResolveFrom({
    condition: route?.guard?.condition ?? null,
  }).condition;
  const routeAllowed = evaluateRouteGuard(route, rawUser, resolvedGuard);

  useEffect(() => {
    if (!route || routeAllowed) {
      return;
    }

    const fallback =
      route.guard?.redirectTo ??
      manifest.app.home ??
      manifest.firstRoute?.path ??
      "/";
    if (fallback !== currentPath) {
      navigate(fallback, { replace: true });
    }
  }, [currentPath, manifest.app.home, manifest.firstRoute?.path, navigate, route, routeAllowed]);

  useEffect(() => {
    if (!route || !routeAllowed) {
      return;
    }

    let cancelled = false;

    const runLifecycle = async () => {
      const previousRoute = previousRouteRef.current;
      if (previousRoute && previousRoute.id !== route.id && previousRoute.leave) {
        if (typeof previousRoute.leave === "string") {
          await execute(
            { type: "run-workflow", workflow: previousRoute.leave },
            {
              route: previousRoute,
            },
          );
        } else {
          await execute(previousRoute.leave as never, {
            route: previousRoute,
          });
        }
      }

      previousRouteRef.current = route;

      if (route.preload && route.preload.length > 0) {
        setIsPreloading(true);
        try {
          await Promise.all(
            route.preload.map((name) =>
              resourceCache ? resourceCache.preloadResource(name) : Promise.resolve(),
            ),
          );
        } finally {
          if (!cancelled) {
            setIsPreloading(false);
          }
        }
      } else {
        setIsPreloading(false);
      }

      if (route.enter) {
        if (typeof route.enter === "string") {
          await execute(
            { type: "run-workflow", workflow: route.enter },
            { route },
          );
        } else {
          await execute(route.enter as never, { route });
        }
      }
    };

    void runLifecycle();

    return () => {
      cancelled = true;
    };
  }, [execute, resourceCache, route, routeAllowed]);

  if (!route || !routeAllowed) {
    return null;
  }

  return (
    <RouteRuntimeProvider
      value={{
        currentPath,
        currentRoute: route,
        navigate,
        isPreloading,
      }}
    >
      <AppShell
        manifest={manifest}
        route={route}
        currentPath={currentPath}
        navigate={navigate}
        isPreloading={isPreloading}
        api={api}
      />
    </RouteRuntimeProvider>
  );
}

export function ManifestApp({
  manifest,
  apiUrl,
  snapshotConfig,
}: ManifestAppProps) {
  const compiledManifest = useMemo(() => compileManifest(manifest), [manifest]);
  const snapshot = useMemo(
    () =>
      createSnapshot({
        apiUrl,
        ...snapshotConfig,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiUrl],
  );

  useEffect(() => {
    if (compiledManifest.theme) {
      const css = resolveTokens(compiledManifest.theme);
      injectStyleSheet("snapshot-tokens", css);
    }
  }, [compiledManifest.theme]);

  return (
    <snapshot.QueryProvider>
      <SnapshotApiContext.Provider value={snapshot.api}>
        <ManifestRuntimeProvider manifest={compiledManifest} api={snapshot.api}>
          <AppContextProvider
            globals={compiledManifest.state}
            resources={compiledManifest.resources}
            api={snapshot.api}
          >
            <ManifestRouter manifest={compiledManifest} api={snapshot.api} />
            <OverlayHost overlays={compiledManifest.overlays} />
          </AppContextProvider>
        </ManifestRuntimeProvider>
      </SnapshotApiContext.Provider>
    </snapshot.QueryProvider>
  );
}
