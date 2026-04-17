import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const subscribedValues: Record<string, unknown> = {
  "copy.offline.title": "Offline mode for {route.params.id}",
  "copy.offline.description": "Reconnect to sync changes on {route.path}.",
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
      currentRoute: { id: "offline" },
      currentPath: "/sync/alpha",
      params: { id: "alpha" },
      query: {},
    }),
  };
});

import { DefaultOffline } from "../component";

describe("DefaultOffline", () => {
  it("renders a static offline state", () => {
    const html = renderToStaticMarkup(
      <DefaultOffline
        config={{
          type: "offline-banner",
          className: "component-root",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    expect(html).toContain("You&#x27;re offline");
    expect(html).toContain('role="status"');
    expect(html).toContain("component-root");
    expect(html).toContain("slot-root");
  });

  it("renders ref-backed copy", () => {
    const html = renderToStaticMarkup(
      <DefaultOffline
        config={{
          type: "offline-banner",
          title: { from: "copy.offline.title" },
          description: { from: "copy.offline.description" },
        }}
      />,
    );

    expect(html).toContain("Offline mode for alpha");
    expect(html).toContain("Reconnect to sync changes on /sync/alpha.");
  });
});
