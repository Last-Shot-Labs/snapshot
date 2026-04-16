// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialogComponent } from "../component";

const modalCapture = vi.hoisted(() => ({ config: null as Record<string, unknown> | null }));

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
}));

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
});
