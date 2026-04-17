// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocationInput } from "../component";

const subscribedValues: Record<string, unknown> = {
  "copy.locationLabel": "Office {route.params.id}",
  "copy.locationPlaceholder": "Search in {route.path}",
  "copy.locationHelper": "Search for an address near {route.params.id}",
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
      currentRoute: { id: "locations" },
      currentPath: "/locations/hq",
      params: { id: "hq" },
      query: {},
    }),
  };
});

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => vi.fn(),
}));

vi.mock("../../../_base/use-component-data", () => ({
  useComponentData: () => ({ data: [], isLoading: false }),
}));

vi.mock("../../../../icons/index", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe("LocationInput", () => {
  it("renders the label, input, and helper text", () => {
    render(
      <LocationInput
        config={{
          type: "location-input",
          id: "office",
          searchEndpoint: { resource: "locations" },
          label: { from: "copy.locationLabel" },
          placeholder: { from: "copy.locationPlaceholder" },
          helperText: { from: "copy.locationHelper" },
        }}
      />,
    );

    expect(screen.getByText("Office hq")).toBeDefined();
    expect(screen.getByTestId("location-search")).toBeDefined();
    expect(screen.getByText("Search for an address near hq")).toBeDefined();
    expect(screen.getByPlaceholderText("Search in /locations/hq")).toBeDefined();
  });

  it("applies distinct helper and error surfaces", () => {
    const { container } = render(
      <LocationInput
        config={{
          type: "location-input",
          id: "office",
          className: "location-root-class",
          searchEndpoint: { resource: "locations" },
          helperText: "Search for an address",
          errorText: "Location is required",
          slots: {
            root: { className: "location-root-slot" },
            helper: { className: "helper-slot" },
            error: { className: "error-slot" },
          },
        }}
      />,
    );

    expect(screen.getByText("Location is required")).toBeDefined();
    expect(
      container.querySelector('[data-snapshot-id="office"]')?.className,
    ).toContain("location-root-class");
    expect(
      container.querySelector('[data-snapshot-id="office"]')?.className,
    ).toContain("location-root-slot");
    expect(container.querySelector('[data-snapshot-id="office-helper"]')).toBeNull();
    expect(
      container.querySelector('[data-snapshot-id="office-error"]')?.className,
    ).toContain("error-slot");
  });
});
