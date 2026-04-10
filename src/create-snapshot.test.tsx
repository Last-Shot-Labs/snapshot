// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { createSnapshot } from "./create-snapshot";

afterEach(() => {
  sessionStorage.clear();
});

describe("createSnapshot", () => {
  it("uses the manifest auth session for token storage", () => {
    const snapshot = createSnapshot({
      apiUrl: "https://api.example.com",
      manifest: {
        auth: {
          screens: ["login"],
          session: {
            mode: "token",
            storage: "sessionStorage",
            key: "manifest.token",
          },
        },
        routes: [
          {
            id: "login",
            path: "/login",
            content: [{ type: "heading", text: "Login" }],
          },
        ],
      },
    });

    snapshot.tokenStorage.set("abc123");
    expect(snapshot.tokenStorage.get()).toBe("abc123");
  });

  it("keeps cookie mode as a no-op token storage by default", () => {
    const snapshot = createSnapshot({
      apiUrl: "https://api.example.com",
      manifest: {
        auth: {
          screens: ["login"],
        },
        routes: [
          {
            id: "login",
            path: "/login",
            content: [{ type: "heading", text: "Login" }],
          },
        ],
      },
    });

    snapshot.tokenStorage.set("abc123");
    expect(snapshot.tokenStorage.get()).toBeNull();
  });
});
