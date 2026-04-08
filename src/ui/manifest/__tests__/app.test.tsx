/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, afterEach } from "vitest";

vi.hoisted(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { z } from "zod";
import { ManifestApp, injectStyleSheet } from "../app";
import { registerComponent } from "../component-registry";
import { registerComponentSchema } from "../schema";
import type { ManifestConfig } from "../types";
import { useSetStateValue, useStateValue } from "../../state";

import "../structural";

registerComponentSchema(
  "route-state-probe",
  z.object({
    type: z.literal("route-state-probe"),
  }),
);
registerComponent("route-state-probe", function RouteStateProbe() {
  const value = useStateValue("routeCounter");
  const setValue = useSetStateValue("routeCounter");

  return (
    <button onClick={() => setValue(Number(value ?? 0) + 1)}>
      {String(value ?? 0)}
    </button>
  );
});

const minimalManifest: ManifestConfig = {
  app: {
    title: "Snapshot App",
    home: "/",
  },
  routes: [
    {
      id: "home",
      path: "/",
      title: "Home",
      content: [
        {
          type: "heading",
          text: "Welcome Home",
          level: 1,
        },
      ],
    },
  ],
};

describe("injectStyleSheet", () => {
  afterEach(() => {
    const el = document.getElementById("test-style");
    if (el) el.remove();
  });

  it("creates a style element in the head", () => {
    injectStyleSheet("test-style", "body { margin: 0; }");
    const el = document.getElementById("test-style");
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe("body { margin: 0; }");
  });
});

describe("ManifestApp", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    const el = document.getElementById("snapshot-tokens");
    if (el) el.remove();
    window.history.replaceState({}, "", "/");
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("renders page content from manifest", () => {
    render(
      <ManifestApp manifest={minimalManifest} apiUrl="http://localhost" />,
    );
    expect(screen.getByText("Welcome Home")).toBeDefined();
  });

  it("applies theme tokens as injected CSS", () => {
    const manifest: ManifestConfig = {
      theme: {
        flavor: "neutral",
      },
      routes: [
        {
          id: "home",
          path: "/",
          content: [{ type: "heading", text: "Themed" }],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);
    const style = document.getElementById("snapshot-tokens");
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain(":root");
  });

  it("renders the current route when multiple routes exist", () => {
    window.history.replaceState({}, "", "/about");

    const manifest: ManifestConfig = {
      app: {
        home: "/",
      },
      routes: [
        {
          id: "home",
          path: "/",
          content: [{ type: "heading", text: "Home Page" }],
        },
        {
          id: "about",
          path: "/about",
          content: [{ type: "heading", text: "About Page" }],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);
    expect(screen.getByText("About Page")).toBeDefined();
  });

  it("resets route-scoped state when navigation changes routes", async () => {
    const manifest: ManifestConfig = {
      state: {
        routeCounter: {
          scope: "route",
          default: 0,
        },
      },
      routes: [
        {
          id: "home",
          path: "/",
          content: [{ type: "route-state-probe" }],
        },
        {
          id: "about",
          path: "/about",
          content: [{ type: "route-state-probe" }],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);

    fireEvent.click(screen.getByRole("button", { name: "0" }));
    expect(screen.getByRole("button", { name: "1" })).toBeDefined();

    await act(async () => {
      window.history.replaceState({}, "", "/about");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "0" })).toBeDefined();
    });
  });

  it("renders manifest navigation and navigates within the shell", async () => {
    const manifest: ManifestConfig = {
      navigation: {
        mode: "sidebar",
        items: [
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
        ],
      },
      routes: [
        {
          id: "home",
          path: "/",
          content: [{ type: "heading", text: "Home Page" }],
        },
        {
          id: "about",
          path: "/about",
          content: [{ type: "heading", text: "About Page" }],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);
    fireEvent.click(screen.getByRole("button", { name: "About" }));

    await waitFor(() => {
      expect(screen.getByText("About Page")).toBeDefined();
    });
  });

  it("redirects guarded routes to the configured fallback", async () => {
    window.history.replaceState({}, "", "/private");

    const manifest: ManifestConfig = {
      state: {
        user: {
          scope: "app",
          default: null,
        },
      },
      routes: [
        {
          id: "login",
          path: "/login",
          content: [{ type: "heading", text: "Login Page" }],
        },
        {
          id: "private",
          path: "/private",
          guard: {
            authenticated: true,
            redirectTo: "/login",
          },
          content: [{ type: "heading", text: "Private Page" }],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);

    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeDefined();
    });
  });

  it("renders named overlays opened by actions", async () => {
    const manifest: ManifestConfig = {
      overlays: {
        help: {
          type: "modal",
          title: "Need Help?",
          content: [{ type: "heading", text: "Overlay Content" }],
        },
      },
      routes: [
        {
          id: "home",
          path: "/",
          content: [
            {
              type: "button",
              label: "Open Help",
              action: {
                type: "open-modal",
                modal: "help",
              },
            },
          ],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);
    fireEvent.click(screen.getByRole("button", { name: "Open Help" }));

    await waitFor(() => {
      expect(screen.getByText("Need Help?")).toBeDefined();
      expect(screen.getByText("Overlay Content")).toBeDefined();
    });
  });

  it("preloads route resources before rendering page content", async () => {
    let resolveFetch: ((response: Response) => void) | null = null;
    global.fetch = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        }),
    ) as typeof fetch;

    const manifest: ManifestConfig = {
      resources: {
        me: {
          method: "GET",
          endpoint: "/api/me",
        },
      },
      routes: [
        {
          id: "home",
          path: "/",
          preload: ["me"],
          content: [{ type: "heading", text: "Ready" }],
        },
      ],
    };

    render(<ManifestApp manifest={manifest} apiUrl="http://localhost" />);
    expect(screen.getByText("Loading...")).toBeDefined();

    resolveFetch?.(
      new Response(JSON.stringify({ id: 1, name: "Ada" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Ready")).toBeDefined();
    });
  });
});
