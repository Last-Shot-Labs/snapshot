// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Slider } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "copy.sliderLabel": "Opacity",
  "copy.sliderSuffix": "%",
  "copy.sliderDisabled": false,
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

afterEach(() => {
  cleanup();
});

describe("Slider", () => {
  it("updates the displayed value and dispatches change actions", () => {
    executeSpy.mockReset();

    render(
      <Slider
        config={{
          type: "slider",
          className: "component-root",
          min: 0,
          max: 100,
          step: 1,
          range: false,
          defaultValue: 50,
          label: { from: "copy.sliderLabel" },
          suffix: { from: "copy.sliderSuffix" },
          showValue: true,
          showLimits: false,
          on: {
            change: { type: "set-opacity" } as never,
          },
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const root = document.querySelector('[data-snapshot-component="slider"]');
    expect(root?.className).toContain("component-root");
    expect(root?.className).toContain("slot-root");
    expect(screen.getByText("Opacity")).toBeDefined();
    fireEvent.change(screen.getByRole("slider"), { target: { value: "75" } });

    expect(screen.getByText("75%")).toBeTruthy();
    expect(executeSpy).toHaveBeenCalledWith(
      { type: "set-opacity" },
      { id: undefined, value: 75 },
    );
  });

  it("applies distinct start and end input slots in range mode", () => {
    const { container } = render(
      <Slider
        config={{
          type: "slider",
          id: "price-range",
          min: 0,
          max: 100,
          range: true,
          defaultValue: [20, 80],
          slots: {
            inputStart: { className: "input-start-slot" },
            inputEnd: { className: "input-end-slot" },
          },
        }}
      />,
    );

    const startInput = container.querySelector(
      '[data-snapshot-id="price-range-input-start"]',
    ) as HTMLInputElement | null;
    const endInput = container.querySelector(
      '[data-snapshot-id="price-range-input-end"]',
    ) as HTMLInputElement | null;

    expect(startInput?.className).toContain("input-start-slot");
    expect(endInput?.className).toContain("input-end-slot");
    expect(startInput?.style.position).toBe("relative");
    expect(startInput?.style.zIndex).toBe("2");
    expect(endInput?.style.position).toBe("relative");
    expect(endInput?.style.zIndex).toBe("3");
  });

  it("resolves templated labels and suffixes against route runtime", () => {
    render(
      <Slider
        config={{
          type: "slider",
          min: 0,
          max: 100,
          range: false,
          defaultValue: 25,
          label: "Opacity {route.params.id}",
          suffix: " {route.params.id}",
          showValue: true,
          showLimits: false,
        }}
      />,
    );

    expect(screen.getByText("Opacity alpha")).toBeDefined();
    expect(screen.getByText("25 alpha")).toBeTruthy();
  });
});
