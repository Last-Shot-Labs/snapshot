// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PresenceIndicator } from "../component";

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (typeof value === "object" && value !== null && "from" in value) {
    return undefined as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
        key,
        resolveRefs(nested),
      ]),
    ) as T;
  }

  return value;
}

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
  useResolveFrom: <T,>(value: T) => resolveRefs(value),
}));

vi.mock("../../../../manifest/runtime", async () => {
  const actual =
    await vi.importActual<typeof import("../../../../manifest/runtime")>(
      "../../../../manifest/runtime"
    );

  return {
    ...actual,
    useManifestRuntime: () => ({ raw: {}, app: {}, auth: {} }),
    useRouteRuntime: () => ({
      currentRoute: { id: "workspace", path: "/workspace/:id" },
      currentPath: "/workspace/alpha",
      params: { id: "alpha" },
      query: {},
    }),
  };
});

afterEach(() => {
  cleanup();
});

describe("PresenceIndicator", () => {
  it("renders status label and dot", () => {
    render(
      <PresenceIndicator
        config={{
          type: "presence-indicator",
          className: "component-root",
          status: "online",
          label: "Ada",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const indicator = screen.getByTestId("presence-indicator");
    expect(indicator.className).toContain("component-root");
    expect(indicator.className).toContain("slot-root");
    expect(screen.getByTestId("presence-label").textContent).toBe("Ada");
    expect(screen.getByTestId("presence-dot")).toBeTruthy();
  });

  it("resolves templated labels against route runtime", () => {
    render(
      <PresenceIndicator
        config={{
          type: "presence-indicator",
          status: "online",
          label: "User {route.params.id}",
        }}
      />,
    );

    expect(screen.getByTestId("presence-label").textContent).toBe("User alpha");
  });
});
