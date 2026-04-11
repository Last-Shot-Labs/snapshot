// @vitest-environment happy-dom
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const execute = vi.fn();

vi.mock("../../../actions/executor", () => ({
  useActionExecutor: () => execute,
}));

import { ContextMenuPortal } from "../context-menu-portal";

describe("ContextMenuPortal", () => {
  beforeEach(() => {
    execute.mockClear();
    cleanup();
  });

  it("renders at the requested coordinates and executes menu actions with context", () => {
    const onClose = vi.fn();
    render(
      <ContextMenuPortal
        items={[
          {
            label: "Copy",
            action: { type: "copy-to-clipboard", text: "{email}" },
          },
        ]}
        state={{ x: 120, y: 160, context: { email: "user@example.com" } }}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByText("Copy"));
    expect(onClose).toHaveBeenCalled();
    expect(execute).toHaveBeenCalledWith(
      { type: "copy-to-clipboard", text: "{email}" },
      { email: "user@example.com" },
    );
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <ContextMenuPortal
        items={[{ label: "Open" }]}
        state={{ x: 40, y: 40 }}
        onClose={onClose}
      />,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
