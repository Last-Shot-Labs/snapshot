// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "../component";

const mockExecute = vi.fn();
const refValues: Record<string, unknown> = {
  "alert.actionLabel": "Resolved Retry {route.params.id}",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (value && typeof value === "object") {
    if ("from" in (value as Record<string, unknown>)) {
      return refValues[(value as unknown as { from: string }).from] as T;
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
    useSubscribe: (value: unknown) =>
      value &&
      typeof value === "object" &&
      "from" in (value as Record<string, unknown>)
        ? refValues[(value as { from: string }).from]
        : value,
    usePublish: () => vi.fn(),
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
      currentRoute: { id: "alerts" },
      currentPath: "/alerts/urgent",
      params: { id: "urgent" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => mockExecute,
}));

describe("Alert", () => {
  it("renders content, runs action, and dismisses", () => {
    render(
      <Alert
        config={{
          type: "alert",
          className: "component-root",
          title: "Success",
          description: "Saved successfully",
          action: { type: "event", name: "alert-action" } as never,
          actionLabel: "Retry",
          dismissible: true,
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const alert = screen.getByTestId("alert");
    expect(alert.className).toContain("component-root");
    expect(alert.className).toContain("slot-root");
    expect(screen.getByTestId("alert-title").textContent).toBe("Success");
    expect(screen.getByTestId("alert-description").textContent).toBe(
      "Saved successfully",
    );

    fireEvent.click(screen.getByTestId("alert-action"));
    expect(mockExecute).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId("alert-dismiss"));
    expect(screen.queryByTestId("alert")).toBeNull();
  });

  it("renders ref-backed action labels", () => {
    render(
      <Alert
        config={{
          type: "alert",
          description: "Saved successfully",
          action: { type: "event", name: "alert-action" } as never,
          actionLabel: { from: "alert.actionLabel" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("alert-action").textContent).toContain(
      "Resolved Retry urgent",
    );
  });
});
