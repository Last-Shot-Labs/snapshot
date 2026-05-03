import { createSnapshot } from "@lastshotlabs/snapshot";

export const snapshot = createSnapshot({
  apiUrl: "",
  // Code-first apps don't render via the manifest, but a single placeholder
  // route keeps manifest defaults like app.home available to auth redirects.
  manifest: {
    app: { home: "/" },
    auth: { session: { mode: "token" } },
    routes: [{ id: "home", path: "/" }],
  },
});

export const { api, tokenStorage, queryClient } = snapshot;
