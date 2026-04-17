// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Separator } from "../component";

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
  usePublish: () => vi.fn(),
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

describe("Separator", () => {
  it("renders a labeled horizontal separator", () => {
    const { container } = render(
      <Separator
        config={{
          type: "separator",
          label: "Continue",
          className: "component-root",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    expect(container.querySelector('[data-snapshot-component="separator"]')?.className).toContain("component-root");
    expect(container.querySelector('[data-snapshot-component="separator"]')?.className).toContain("slot-root");
    expect(screen.getByText("Continue")).toBeTruthy();
    expect(screen.getByRole("separator").getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("resolves templated labels against route runtime", () => {
    render(
      <Separator
        config={{
          type: "separator",
          label: "Continue {route.params.id}",
        }}
      />,
    );

    expect(screen.getByText("Continue alpha")).toBeTruthy();
  });
});
