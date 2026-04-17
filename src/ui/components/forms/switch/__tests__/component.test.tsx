// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "copy.switchLabel": "Enable notifications",
  "copy.switchDescription": "Receive email alerts for new activity",
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

describe("Switch", () => {
  it("toggles checked state and dispatches the action", () => {
    executeSpy.mockReset();

    const { container } = render(
      <Switch
        config={{
          type: "switch",
          id: "notifications-switch",
          className: "switch-root-class",
          label: { from: "copy.switchLabel" },
          description: { from: "copy.switchDescription" },
          on: {
            change: { type: "toggle-notifications" } as never,
          },
          slots: {
            root: { className: "switch-root-slot" },
          },
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-id="notifications-switch"]')?.className,
    ).toContain("switch-root-class");
    expect(
      container.querySelector('[data-snapshot-id="notifications-switch"]')?.className,
    ).toContain("switch-root-slot");
    expect(screen.getByText("Enable notifications")).toBeDefined();
    expect(screen.getByText("Receive email alerts for new activity")).toBeDefined();

    fireEvent.click(screen.getByTestId("switch"));

    expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("true");
    expect(executeSpy).toHaveBeenCalledWith(
      { type: "toggle-notifications" },
      { id: "notifications-switch", checked: true, value: true },
    );
  });

  it("resolves templated label and description against route runtime", () => {
    render(
      <Switch
        config={{
          type: "switch",
          label: "Notifications {route.params.id}",
          description: "Path {route.path}",
        }}
      />,
    );

    expect(screen.getByText("Notifications alpha")).toBeDefined();
    expect(screen.getByText("Path /workspace/alpha")).toBeDefined();
  });
});
