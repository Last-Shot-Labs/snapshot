// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmptyState } from "../component";

const executeSpy = vi.fn();
const refValues: Record<string, unknown> = {
  "emptyState.title": "Resolved title {route.params.id}",
  "emptyState.description": "Resolved description on {route.path}",
  "emptyState.actionLabel": "Resolved action {route.params.id}",
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
      currentRoute: { id: "empty" },
      currentPath: "/search/results",
      params: { id: "results" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => executeSpy,
}));

vi.mock("../../../../icons/index", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid="empty-state-icon-node">{name}</span>,
}));

afterEach(() => {
  cleanup();
});

describe("EmptyState", () => {
  it("renders content and dispatches the optional action", () => {
    executeSpy.mockReset();

    render(
      <EmptyState
        config={{
          type: "empty-state",
          title: "No results",
          description: "Try again",
          icon: "search",
          actionLabel: "Clear filters",
          action: { type: "reset" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("empty-state-title").textContent).toBe("No results");
    expect(screen.getByTestId("empty-state-description").textContent).toBe("Try again");
    fireEvent.click(screen.getByTestId("empty-state-action"));
    expect(executeSpy).toHaveBeenCalledWith({ type: "reset" });
  });

  it("applies canonical root and action surfaces", () => {
    const { container } = render(
      <EmptyState
        config={{
          type: "empty-state",
          id: "search-empty",
          className: "empty-root",
          title: "No results",
          actionLabel: "Clear filters",
          action: { type: "reset" } as never,
          slots: {
            root: { className: "root-slot" },
            action: { className: "action-slot" },
          },
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-id="search-empty"]')?.className,
    ).toContain("root-slot");
    expect(
      container.querySelector('[data-snapshot-id="search-empty"]')?.className,
    ).toContain("empty-root");
    expect(
      container.querySelector('[data-snapshot-id="search-empty-action"]')
        ?.className,
    ).toContain(
      "action-slot",
    );
  });

  it("renders ref-backed copy", () => {
    render(
      <EmptyState
        config={{
          type: "empty-state",
          title: { from: "emptyState.title" } as never,
          description: { from: "emptyState.description" } as never,
          actionLabel: { from: "emptyState.actionLabel" } as never,
          action: { type: "reset" } as never,
        }}
      />,
    );

    expect(screen.getByTestId("empty-state-title").textContent).toBe(
      "Resolved title results",
    );
    expect(screen.getByTestId("empty-state-description").textContent).toBe(
      "Resolved description on /search/results",
    );
    expect(screen.getByTestId("empty-state-action").textContent).toContain(
      "Resolved action results",
    );
  });
});
