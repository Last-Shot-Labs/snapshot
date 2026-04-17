// @vitest-environment jsdom
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { InlineEdit } from "../component";

const mockExecute = vi.fn();
const mockPublish = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "copy.inlineEditPlaceholder": "Rename item {route.params.id}",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (value && typeof value === "object") {
    if ("from" in (value as Record<string, unknown>)) {
      return subscribedValues[(value as unknown as { from: string }).from] as T;
    }

    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        resolveRefs(entry),
      ]),
    ) as T;
  }

  return value;
}

vi.mock("../../../../context/hooks", async () => {
  const actual = await vi.importActual("../../../../context/hooks");

  return {
    ...actual,
    usePublish: () => mockPublish,
    useSubscribe: (value: unknown) =>
      typeof value === "object" && value !== null && "from" in value
        ? subscribedValues[(value as { from: string }).from]
        : value,
    useResolveFrom: resolveRefs,
  };
});

vi.mock("../../../../manifest/runtime", async () => {
  const actual = await vi.importActual("../../../../manifest/runtime");

  return {
    ...actual,
    useManifestRuntime: () => ({
      raw: { routes: [] },
      app: {},
      auth: {},
    }),
    useRouteRuntime: () => ({
      currentRoute: { id: "item" },
      currentPath: "/items/99",
      params: { id: "99" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => mockExecute,
}));

describe("InlineEdit", () => {
  it("applies canonical root, hover, and input slot styling", () => {
    const { container } = render(
      <InlineEdit
        config={{
          type: "inline-edit",
          id: "inline-edit-demo",
          value: "Snapshot",
          className: "inline-edit-root",
          fontSize: "2rem",
          slots: {
            display: {
              states: {
                hover: {
                  className: "inline-edit-hover",
                },
              },
            },
            input: {
              className: "inline-edit-input-slot",
            },
          },
        }}
      />,
    );

    const root = container.querySelector('[data-snapshot-id="inline-edit-demo-root"]');
    const displayText = container.querySelector(
      '[data-snapshot-id="inline-edit-demo-display-text"]',
    );

    expect(root?.className).toContain("inline-edit-root");
    expect((root as HTMLElement | null)?.style.fontSize).toBe("");
    expect((displayText as HTMLElement | null)?.style.fontSize).toBe("2rem");

    const display = screen.getByTestId("inline-edit-display");
    fireEvent.pointerEnter(display);
    expect(display.className).toContain("inline-edit-hover");

    fireEvent.click(display);

    expect(screen.getByTestId("inline-edit-input").className).toContain(
      "inline-edit-input-slot",
    );
  });

  it("renders a ref-backed placeholder when there is no value", () => {
    render(
      <InlineEdit
        config={{
          type: "inline-edit",
          id: "inline-edit-empty",
          value: "",
          placeholder: { from: "copy.inlineEditPlaceholder" },
        }}
      />,
    );

    expect(screen.getByText("Rename item 99")).toBeDefined();
  });
});
