// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialogComponent } from "../component";

const modalCapture = vi.hoisted(() => ({ config: null as Record<string, unknown> | null }));
const refValues: Record<string, unknown> = {
  "state.dialog.confirm": "Delete forever {route.params.id}",
  "state.dialog.cancel": "Keep it for {route.path}",
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
      value && typeof value === "object" && "from" in (value as Record<string, unknown>)
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
      currentRoute: { id: "dialog" },
      currentPath: "/dialog/delete",
      params: { id: "delete" },
      query: {},
    }),
  };
});

vi.mock("../../modal", () => ({
  ModalComponent: ({ config }: { config: Record<string, unknown> }) => {
    modalCapture.config = config;
    return <div data-testid="confirm-dialog-modal" />;
  },
}));

describe("ConfirmDialogComponent", () => {
  it("adapts confirm-dialog config into a modal overlay config", () => {
    render(
      <ConfirmDialogComponent
        config={{
          type: "confirm-dialog",
          id: "delete-confirmation",
          className: "confirm-root-class",
          style: { opacity: 0.85 },
          title: "Delete item",
          description: "This action cannot be undone.",
          confirmLabel: "Delete",
          cancelLabel: "Keep",
          confirmAction: { type: "close-modal", modal: "delete-confirmation" },
        }}
      />,
    );

    expect(screen.getByTestId("confirm-dialog-modal")).toBeDefined();
    expect(modalCapture.config?.type).toBe("modal");
    expect(modalCapture.config?.className).toContain("confirm-root-class");
    expect((modalCapture.config?.style as { opacity?: number } | undefined)?.opacity).toBe(0.85);
    const content = modalCapture.config?.content as Array<{ value: string }> | undefined;
    const footer = modalCapture.config?.footer as
      | { actions: Array<{ label: string }> }
      | undefined;
    expect(content?.[0]?.value).toBe("This action cannot be undone.");
    expect(footer?.actions[0]?.label).toBe("Keep");
    expect(footer?.actions[1]?.label).toBe("Delete");
  });

  it("resolves ref-backed footer labels before adapting to modal config", () => {
    render(
      <ConfirmDialogComponent
        config={{
          type: "confirm-dialog",
          title: "Delete item",
          confirmLabel: { from: "state.dialog.confirm" } as never,
          cancelLabel: { from: "state.dialog.cancel" } as never,
        }}
      />,
    );

    const footer = modalCapture.config?.footer as
      | { actions: Array<{ label: string }> }
      | undefined;
    expect(footer?.actions[0]?.label).toBe("Keep it for /dialog/delete");
    expect(footer?.actions[1]?.label).toBe("Delete forever delete");
  });
});
