import { createSnapshot } from "@lastshotlabs/snapshot";

export const snapshot = createSnapshot({
  apiUrl: "",
  manifest: {
    app: { home: "/" },
    auth: { session: { mode: "token" } },
    routes: [],
  },
});

export const { api, tokenStorage, queryClient } = snapshot;
