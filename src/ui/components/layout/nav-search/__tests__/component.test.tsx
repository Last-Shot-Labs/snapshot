// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavSearch } from "../component";

const executeSpy = vi.fn();
const publishSpy = vi.fn();
const subscribedValues: Record<string, unknown> = {
  "copy.navSearch.placeholder": "Search docs in {route.params.id}",
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

vi.mock("../../../../context/index", async () => {
  const actual = await vi.importActual("../../../../context/index");

  return {
    ...actual,
    usePublish: () => publishSpy,
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
      currentRoute: { id: "docs" },
      currentPath: "/docs/icons",
      params: { id: "icons" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => executeSpy,
}));

describe("NavSearch", () => {
  it("publishes the search value and submits the search action", () => {
    executeSpy.mockReset();
    publishSpy.mockReset();

    render(
      <NavSearch
        config={{
          type: "nav-search",
          className: "component-root",
          placeholder: { from: "copy.navSearch.placeholder" },
          publishTo: "nav.search",
          onSearch: { type: "search" } as never,
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const input = screen.getByPlaceholderText("Search docs in icons");
    const form = input.closest("form");
    expect(form?.className).toContain("component-root");
    expect(form?.className).toContain("slot-root");
    fireEvent.change(input, { target: { value: "icons" } });
    fireEvent.submit(form!);

    expect(publishSpy).toHaveBeenCalledWith("icons");
    expect(executeSpy).toHaveBeenCalledWith({ type: "search" }, { value: "icons" });
  });
});
