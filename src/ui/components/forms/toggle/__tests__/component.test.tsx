// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "toolbar.boldLabel": "Bold",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (typeof value === "object" && value !== null && "from" in value) {
    return subscribedValues[(value as { from: string }).from] as T;
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
  useSubscribe: (value: unknown) =>
    typeof value === "object" && value !== null && "from" in value
      ? subscribedValues[(value as { from: string }).from]
      : value,
  usePublish: () => publishSpy,
  useResolveFrom: <T,>(value: T) => resolveRefs(value),
}));

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => executeSpy,
}));

vi.mock("../../../../icons/index", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid="toggle-icon">{name}</span>,
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

describe("Toggle", () => {
  it("toggles pressed state and dispatches the change action", () => {
    executeSpy.mockReset();

    const { container } = render(
      <Toggle
        config={{
          type: "toggle",
          id: "bold-toggle",
          className: "toggle-root-class",
          label: { from: "toolbar.boldLabel" },
          icon: "bold",
          on: {
            change: { type: "toggle-bold" } as never,
          },
          slots: {
            root: { className: "toggle-root-slot" },
          },
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-id="bold-toggle"]')?.className,
    ).toContain("toggle-root-class");
    expect(
      container.querySelector('[data-snapshot-id="bold-toggle"]')?.className,
    ).toContain("toggle-root-slot");
    expect(screen.getByText("Bold")).toBeDefined();

    fireEvent.click(screen.getByTestId("toggle"));

    expect(screen.getByTestId("toggle").getAttribute("aria-pressed")).toBe("true");
    expect(executeSpy).toHaveBeenCalledWith(
      { type: "toggle-bold" },
      { id: "bold-toggle", pressed: true, value: true },
    );
  });

  it("resolves templated labels against route runtime", () => {
    render(
      <Toggle
        config={{
          type: "toggle",
          label: "Bold {route.params.id}",
        }}
      />,
    );

    expect(screen.getByText("Bold alpha")).toBeDefined();
  });
});
