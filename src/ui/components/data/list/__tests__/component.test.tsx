/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AtomRegistryImpl } from "../../../../context/registry";
import {
  AppRegistryContext,
  PageRegistryContext,
} from "../../../../context/providers";
import { SnapshotApiContext } from "../../../../actions/executor";
import { ListComponent } from "../component";

vi.mock("../../../../hooks/use-drag-drop", () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useDroppable: () => ({ isOver: false, setNodeRef: () => undefined }),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => undefined,
    transform: null,
    transition: undefined,
    isDragging: false,
  }),
  verticalListSortingStrategy: {},
  getSortableStyle: () => ({}),
}));

function createWrapper() {
  const registry = new AtomRegistryImpl();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AppRegistryContext.Provider value={null}>
        <PageRegistryContext.Provider value={registry}>
          <SnapshotApiContext.Provider value={null}>
            {children}
          </SnapshotApiContext.Provider>
        </PageRegistryContext.Provider>
      </AppRegistryContext.Provider>
    );
  }

  return { Wrapper, registry };
}

describe("ListComponent", () => {
  afterEach(() => {
    cleanup();
  });

  it("applies canonical root and item slots", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ListComponent
          config={{
            type: "list",
            id: "orders",
            className: "list-config-root",
            items: [
              {
                id: "1",
                title: "Order A",
                description: "Pending",
                slots: {
                  itemTitle: { className: "title-slot" },
                },
              },
            ],
            slots: {
              root: { className: "root-slot" },
              item: { className: "item-slot" },
              itemBody: { className: "body-slot" },
            },
          }}
        />
      </Wrapper>,
    );

    expect(screen.getByTestId("list").className).toContain("list-config-root");
    expect(screen.getByTestId("list").className).toContain("root-slot");
    expect(screen.getByTestId("list-item").className).toContain("item-slot");
    expect(
      document.querySelector('[data-snapshot-id="orders-item-body-0"]')?.className,
    ).toContain("body-slot");
    expect(screen.getByText("Order A").className).toContain("title-slot");
  });

  it("resolves ref-backed static items", () => {
    const { Wrapper, registry } = createWrapper();
    const titleAtom = registry.register("list-copy");
    registry.store.set(titleAtom, {
      title: "Ref Order",
      description: "Queued",
      badge: "New",
    });

    render(
      <Wrapper>
        <ListComponent
          config={{
            type: "list",
            id: "ref-orders",
            items: [
              {
                id: "1",
                title: { from: "state.list-copy.title" } as never,
                description: { from: "state.list-copy.description" } as never,
                badge: { from: "state.list-copy.badge" } as never,
              },
            ],
          }}
        />
      </Wrapper>,
    );

    expect(screen.getByText("Ref Order")).toBeTruthy();
    expect(screen.getByText("Queued")).toBeTruthy();
    expect(screen.getByText("New")).toBeTruthy();
  });

  it("renders a ref-backed empty message", () => {
    const { Wrapper, registry } = createWrapper();
    const titleAtom = registry.register("list-copy");
    registry.store.set(titleAtom, {
      empty: "Nothing here",
    });

    render(
      <Wrapper>
        <ListComponent
          config={{
            type: "list",
            id: "ref-orders",
            items: [],
            emptyMessage: { from: "state.list-copy.empty" } as never,
          }}
        />
      </Wrapper>,
    );

    expect(screen.getByText("Nothing here")).toBeTruthy();
  });

  it("applies empty fallback and virtualization slots", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ListComponent
          config={{
            type: "list",
            id: "virtual-orders",
            items: [
              { id: "1", title: "Order A" },
              { id: "2", title: "Order B" },
              { id: "3", title: "Order C" },
            ],
            virtualize: true,
            slots: {
              list: { className: "list-slot" },
              virtualContent: { className: "virtual-content-slot" },
              virtualSpacer: { className: "virtual-spacer-slot" },
            },
          }}
        />
      </Wrapper>,
    );

    expect(
      document.querySelector('[data-snapshot-id="virtual-orders-list"]')?.className,
    ).toContain("list-slot");
    expect(
      document.querySelector('[data-snapshot-id="virtual-orders-virtual-content"]')?.className,
    ).toContain("virtual-content-slot");
    expect(
      document.querySelector('[data-snapshot-id="virtual-orders-virtual-spacer"]')?.className,
    ).toContain("virtual-spacer-slot");
  });

  it("applies emptyMessage, dropZone, sortableItem, and itemHandle slots", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ListComponent
          config={{
            type: "list",
            id: "drag-orders",
            draggable: true,
            items: [{ id: "1", title: "Order A" }],
            slots: {
              dropZone: { className: "drop-zone-slot" },
              sortableItem: { className: "sortable-item-slot" },
              itemHandle: { className: "item-handle-slot" },
            },
          }}
        />
        <ListComponent
          config={{
            type: "list",
            id: "empty-orders",
            items: [],
            emptyMessage: "Nothing here",
            slots: {
              emptyState: { className: "empty-slot" },
              emptyMessage: { className: "empty-message-slot" },
            },
          }}
        />
      </Wrapper>,
    );

    expect(
      document.querySelector('[data-snapshot-id="drag-orders-drop-zone"]')?.className,
    ).toContain("drop-zone-slot");
    expect(
      document.querySelector('[data-snapshot-id="1-sortable-item"]')?.className,
    ).toContain("sortable-item-slot");
    expect(
      document.querySelector('[data-snapshot-id="drag-orders-item-handle-0"]')?.className,
    ).toContain("item-handle-slot");
    const emptyNode = screen.getByTestId("list-empty");
    expect(emptyNode.className).toContain("empty-slot");
    expect(emptyNode.className).toContain("empty-message-slot");
  });

  it("keeps the loadingState wrapper when auto skeleton loading is enabled", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ListComponent
          config={{
            type: "list",
            id: "loading-orders",
            data: "GET /api/orders",
            loading: {
              variant: "list",
              className: "loading-config-root",
            },
            slots: {
              loadingState: { className: "loading-slot" },
            },
          }}
        />
      </Wrapper>,
    );

    expect(
      document.querySelector('[data-snapshot-id="loading-orders-loading"]')?.className,
    ).toContain("loading-slot");
    expect(
      document.querySelector('[data-snapshot-auto-skeleton]')?.className,
    ).toContain("loading-config-root");
  });
});
