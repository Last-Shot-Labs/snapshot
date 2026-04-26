/**
 * Perform client-side navigation without depending on a specific router.
 *
 * Snapshot auth hooks are used by apps that may not mount TanStack Router.
 * Updating `window.history` and dispatching `popstate` keeps BrowserRouter and
 * similar history-based routers in sync without requiring a router provider.
 */
export function navigateToPath(
  to: string | undefined,
  { replace = false }: { replace?: boolean } = {},
): void {
  if (!to || typeof window === "undefined") {
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
