import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const subscribedValues: Record<string, unknown> = {
  "copy.error.title": "Request failed for {route.params.id}",
  "copy.error.description": "Please try again on {route.path}.",
  "copy.error.retry": "Retry {route.params.id}",
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
      currentRoute: { id: "error" },
      currentPath: "/errors/500",
      params: { id: "500" },
      query: {},
    }),
  };
});

import { DefaultError } from "../component";

describe("DefaultError", () => {
  it("renders a static error state", () => {
    const html = renderToStaticMarkup(
      <DefaultError
        config={{
          type: "error-page",
          title: "Oops",
          className: "component-root",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    expect(html).toContain("Oops");
    expect(html).toContain('role="alert"');
    expect(html).toContain("component-root");
    expect(html).toContain("slot-root");
  });

  it("renders ref-backed copy", () => {
    const html = renderToStaticMarkup(
      <DefaultError
        config={{
          type: "error-page",
          title: { from: "copy.error.title" },
          description: { from: "copy.error.description" },
          retryLabel: { from: "copy.error.retry" },
          showRetry: true,
        }}
      />,
    );

    expect(html).toContain("Request failed for 500");
    expect(html).toContain("Please try again on /errors/500.");
    expect(html).toContain("Retry 500");
  });
});
