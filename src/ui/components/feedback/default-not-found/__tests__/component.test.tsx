import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const subscribedValues: Record<string, unknown> = {
  "copy.notFound.title": "Missing page {route.params.id}",
  "copy.notFound.description": "That route does not exist at {route.path}.",
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
      currentRoute: { id: "missing" },
      currentPath: "/missing/route-9",
      params: { id: "route-9" },
      query: {},
    }),
  };
});

import { DefaultNotFound } from "../component";

describe("DefaultNotFound", () => {
  it("renders a static not-found state", () => {
    const html = renderToStaticMarkup(
      <DefaultNotFound
        config={{
          type: "not-found",
          className: "component-root",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    expect(html).toContain("Page not found");
    expect(html).toContain("404");
    expect(html).toContain("component-root");
    expect(html).toContain("slot-root");
  });

  it("renders ref-backed copy", () => {
    const html = renderToStaticMarkup(
      <DefaultNotFound
        config={{
          type: "not-found",
          title: { from: "copy.notFound.title" },
          description: { from: "copy.notFound.description" },
        }}
      />,
    );

    expect(html).toContain("Missing page route-9");
    expect(html).toContain("That route does not exist at /missing/route-9.");
  });
});
