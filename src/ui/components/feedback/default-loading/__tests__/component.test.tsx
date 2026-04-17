import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const subscribedValues: Record<string, unknown> = {
  "copy.loading.label": "Loading data",
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
  useResolveFrom: <T,>(value: T) => resolveRefs(value),
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

import { DefaultLoading } from "../component";

describe("DefaultLoading", () => {
  it("renders a static loading spinner", () => {
    const html = renderToStaticMarkup(
      <DefaultLoading
        config={{
          type: "spinner",
          label: "Loading",
          className: "component-root",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    expect(html).toContain("Loading");
    expect(html).toContain('role="status"');
    expect(html).toContain("component-root");
    expect(html).toContain("slot-root");
  });

  it("renders a ref-backed label", () => {
    const html = renderToStaticMarkup(
      <DefaultLoading
        config={{
          type: "spinner",
          label: { from: "copy.loading.label" },
        }}
      />,
    );

    expect(html).toContain("Loading data");
  });

  it("renders a templated label", () => {
    const html = renderToStaticMarkup(
      <DefaultLoading
        config={{
          type: "spinner",
          label: "Loading {route.params.id}",
        }}
      />,
    );

    expect(html).toContain("Loading alpha");
  });
});
