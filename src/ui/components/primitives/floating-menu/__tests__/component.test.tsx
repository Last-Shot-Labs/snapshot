// @vitest-environment jsdom
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  FloatingPanel,
  FloatingMenuStyles,
  MenuItem,
  MenuLabel,
  MenuSeparator,
} from "../component";

describe("floating-menu primitives", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("renders an open floating panel and closes on Escape", () => {
    const onClose = vi.fn();
    const containerRef = createRef<HTMLDivElement>();

    render(
      <div ref={containerRef}>
        <FloatingPanel
          open
          onClose={onClose}
          containerRef={containerRef}
          surfaceId="menu-panel"
          testId="menu-panel"
        >
          <div>Panel body</div>
        </FloatingPanel>
      </div>,
    );

    vi.runAllTimers();
    expect(screen.getByTestId("menu-panel")).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("renders menu item, label, and separator with primitive semantics", () => {
    const onClick = vi.fn();

    render(
      <div>
        <FloatingMenuStyles />
        <MenuLabel text="Actions" surfaceId="menu-label" />
        <MenuItem
          label="Edit"
          onClick={onClick}
          current
          active
          surfaceId="menu-item"
        />
        <MenuSeparator surfaceId="menu-separator" />
      </div>,
    );

    const item = screen.getByRole("menuitem", { name: "Edit" });
    expect(item.getAttribute("data-active")).toBe("true");
    expect(item.getAttribute("data-snapshot-id")).toBe("menu-item");
    expect(screen.getByText("Actions")).toBeTruthy();
    expect(screen.getByRole("separator")).toBeTruthy();

    fireEvent.click(item);
    expect(onClick).toHaveBeenCalled();
  });

  it("prevents clicks for disabled menu items", () => {
    const onClick = vi.fn();

    render(<MenuItem label="Disabled" onClick={onClick} disabled surfaceId="disabled-item" />);

    const item = screen.getByRole("menuitem", { name: "Disabled" });
    expect(item.getAttribute("aria-disabled")).toBe("true");

    fireEvent.click(item);
    expect(onClick).not.toHaveBeenCalled();
  });
});
