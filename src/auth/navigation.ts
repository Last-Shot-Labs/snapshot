/**
 * Optional router-aware navigator. Apps that mount a router whose internal
 * history doesn't subscribe to `popstate` (e.g. TanStack Router) can register
 * a navigator at runtime; auth hooks call it instead of falling through to the
 * `pushState + popstate` path.
 *
 * Registration is per-process: the snapshot instance exposes `setNavigator()`
 * which apps wire after constructing their router. The closure here reads the
 * current value on each call so registration order does not matter.
 */
export type Navigator = (to: string, opts: { replace?: boolean }) => void;

let runtimeNavigator: Navigator | null = null;

export function setRuntimeNavigator(nav: Navigator | null): void {
  runtimeNavigator = nav;
}

/**
 * Perform client-side navigation. Calls the registered runtime navigator when
 * one is present (router-aware path); otherwise falls back to `pushState +
 * popstate` so history-subscribed routers (BrowserRouter, etc.) still update.
 */
export function navigateToPath(
  to: string | undefined,
  { replace = false }: { replace?: boolean } = {},
): void {
  if (!to || typeof window === "undefined") {
    return;
  }

  if (runtimeNavigator) {
    runtimeNavigator(to, { replace });
    return;
  }

  const historyState = window.history.state ?? {};
  if (replace) {
    window.history.replaceState(historyState, "", to);
  } else {
    window.history.pushState(historyState, "", to);
  }

  window.dispatchEvent(new PopStateEvent("popstate", { state: historyState }));
}
