// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { AtomRegistryImpl } from "../../../../context/registry";
import {
  AppRegistryContext,
  PageRegistryContext,
} from "../../../../context/providers";
import { TreeView } from "../component";

const refValues: Record<string, unknown> = {
  "tree.docs": "Resolved Docs",
  "tree.count": "7",
};

function resolveRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveRefs(entry)) as T;
  }

  if (
    value &&
    typeof value === "object" &&
    "from" in (value as Record<string, unknown>) &&
    typeof (value as unknown as { from: unknown }).from === "string"
  ) {
    return refValues[(value as unknown as { from: string }).from] as T;
  }

  if (value && typeof value === "object") {
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
  return {
    usePublish: () => vi.fn(),
    useSubscribe: (value: unknown) => value,
    useResolveFrom: <T,>(value: T) => resolveRefs(value),
  };
});

const componentDataState = {
  data: null as unknown,
  isLoading: false,
  error: null as unknown,
  refetch: vi.fn(),
};

vi.mock("../../../_base/use-component-data", () => ({
  useComponentData: () => componentDataState,
}));

vi.mock("../../../../manifest/runtime", async () => {
  const actual =
    await vi.importActual<typeof import("../../../../manifest/runtime")>(
      "../../../../manifest/runtime"
    );

  return {
    ...actual,
    useManifestRuntime: () => ({
      raw: {},
      app: {},
      auth: {},
    }),
    useRouteRuntime: () => ({
      currentRoute: { id: "workspace", path: "/workspace/:id" },
      currentPath: "/workspace/alpha",
      params: { id: "alpha" },
      query: {},
    }),
  };
});

function createWrapper() {
  const registry = new AtomRegistryImpl();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AppRegistryContext.Provider value={null}>
        <PageRegistryContext.Provider value={registry}>
          {children}
        </PageRegistryContext.Provider>
      </AppRegistryContext.Provider>
    );
  }

  return Wrapper;
}

describe("TreeView", () => {
  beforeEach(() => {
    componentDataState.data = null;
    componentDataState.isLoading = false;
    componentDataState.error = null;
    componentDataState.refetch = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it("applies canonical row, badge, and children slots", () => {
    const Wrapper = createWrapper();
    const { container } = render(
      <Wrapper>
        <TreeView
          config={{
            type: "tree-view",
            id: "file-tree",
            className: "tree-root-class",
            items: [
              {
                label: "Docs",
                badge: "3",
                expanded: true,
                slots: {
                  row: { className: "docs-row" },
                  badge: { className: "docs-badge" },
                  children: { className: "docs-children" },
                },
                children: [
                  {
                    label: "Report.pdf",
                  },
                ],
              },
            ],
            slots: {
              root: { className: "tree-root" },
              disclosure: { className: "tree-disclosure" },
            },
          }}
        />
      </Wrapper>,
    );

    expect(
      container.querySelector('[data-snapshot-id="file-tree-root"]')?.className,
    ).toContain("tree-root-class");
    expect(
      container.querySelector('[data-snapshot-id="file-tree-root"]')?.className,
    ).toContain("tree-root");
    expect(
      container.querySelector('[data-snapshot-id="file-tree-row-root-0"]')
        ?.className,
    ).toContain("docs-row");
    expect(screen.getByText("3").className).toContain("docs-badge");
    expect(
      container.querySelector('[data-snapshot-id="file-tree-disclosure-root-0"]')
        ?.className,
    ).toContain("tree-disclosure");
    expect(
      container.querySelector('[data-snapshot-id="file-tree-children-root-0"]')
        ?.className,
    ).toContain("docs-children");
  });

  it("toggles a branch open and closed", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <TreeView
          config={{
            type: "tree-view",
            items: [
              {
                label: "Docs",
                children: [{ label: "Report.pdf" }],
              },
            ],
          }}
        />
      </Wrapper>,
    );

    const row = screen.getByRole("treeitem");
    fireEvent.click(row);
    expect(screen.getByText("Report.pdf")).toBeDefined();
    fireEvent.click(row);
    expect(screen.queryByText("Report.pdf")).toBeNull();
  });

  it("renders ref-backed labels and badges", () => {
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <TreeView
          config={{
            type: "tree-view",
            items: [
              {
                label: { from: "tree.docs" } as never,
                badge: { from: "tree.count" } as never,
              },
            ],
          }}
        />
      </Wrapper>,
    );

    expect(screen.getByText("Resolved Docs")).toBeTruthy();
    expect(screen.getByText("7")).toBeTruthy();
  });

  it("resolves templated labels and badges against route runtime", () => {
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <TreeView
          config={{
            type: "tree-view",
            items: [
              {
                label: "Docs {route.params.id}",
                badge: "{route.params.id}",
              },
            ],
          }}
        />
      </Wrapper>,
    );

    expect(screen.getByText("Docs alpha")).toBeTruthy();
    expect(screen.getByText("alpha")).toBeTruthy();
  });

  it("applies canonical loading skeleton slots", () => {
    componentDataState.isLoading = true;

    const Wrapper = createWrapper();
    const { container } = render(
      <Wrapper>
        <TreeView
          config={{
            type: "tree-view",
            id: "loading-tree",
            data: "GET /api/tree" as never,
            slots: {
              loadingState: { className: "tree-loading-state" },
              loadingItem: { className: "tree-loading-item" },
              loadingMarker: { className: "tree-loading-marker" },
              loadingLabel: { className: "tree-loading-label" },
              loadingLabelSecondary: {
                className: "tree-loading-label-secondary",
              },
            },
          }}
        />
      </Wrapper>,
    );

    expect(screen.getByTestId("tree-view-loading").className).toContain(
      "tree-loading-state",
    );
    expect(
      container.querySelector('[data-snapshot-id="loading-tree-loading-item-0"]')
        ?.className,
    ).toContain("tree-loading-item");
    expect(
      container.querySelector(
        '[data-snapshot-id="loading-tree-loading-marker-0"]',
      )?.className,
    ).toContain("tree-loading-marker");
    expect(
      container.querySelector('[data-snapshot-id="loading-tree-loading-label-0"]')
        ?.className,
    ).toContain("tree-loading-label");
    expect(
      container.querySelector(
        '[data-snapshot-id="loading-tree-loading-label-secondary-0"]',
      )?.className,
    ).toContain("tree-loading-label-secondary");
  });
});
