// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "copy.colorLabel": "Brand color",
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

describe("ColorPicker", () => {
  it("dispatches change actions when the value changes", () => {
    executeSpy.mockReset();

    const { container } = render(
      <ColorPicker
        config={{
          type: "color-picker",
          id: "brand-color",
          className: "color-picker-root",
          label: { from: "copy.colorLabel" },
          format: "hex",
          allowCustom: true,
          showAlpha: false,
          on: {
            change: { type: "set-color" } as never,
          },
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-id="brand-color"]')?.className,
    ).toContain("color-picker-root");
    expect(screen.getByText("Brand color")).toBeDefined();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "#ff0000" },
    });

    expect(executeSpy).toHaveBeenCalledWith(
      { type: "set-color" },
      { id: "brand-color", value: "#ff0000" },
    );
  });

  it("resolves templated labels against route runtime", () => {
    render(
      <ColorPicker
        config={{
          type: "color-picker",
          label: "Color {route.params.id}",
          format: "hex",
          allowCustom: false,
          showAlpha: false,
        }}
      />,
    );

    expect(screen.getByText("Color alpha")).toBeDefined();
  });
});
