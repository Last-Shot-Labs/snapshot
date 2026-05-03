// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TypingIndicator } from "../component";

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
}));

describe("TypingIndicator", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders typing text for multiple users", () => {
    render(
      <TypingIndicator
        config={{
          type: "typing-indicator",
          className: "component-root",
          users: [{ name: "Ada" }, { name: "Lin" }],
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const indicator = screen.getByTestId("typing-indicator");
    expect(indicator.className).toContain("component-root");
    expect(indicator.className).toContain("slot-root");
    expect(screen.getByTestId("typing-text").textContent).toContain(
      "Ada and Lin are typing",
    );
  });

  it("normalizes string users and filters invalid entries", () => {
    render(
      <TypingIndicator
        config={{
          type: "typing-indicator",
          users: [" Ada ", "", { name: "Grace" }, { label: "Ignored" }] as never,
        }}
      />,
    );

    expect(screen.getByTestId("typing-text").textContent).toBe(
      "Ada and Grace are typing",
    );
    expect(screen.queryByText(/undefined/)).toBeNull();
  });
});
