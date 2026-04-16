// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PresenceIndicator } from "../component";

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
}));

describe("PresenceIndicator", () => {
  it("renders status label and dot", () => {
    render(
      <PresenceIndicator
        config={{
          type: "presence-indicator",
          className: "component-root",
          status: "online",
          label: "Ada",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const indicator = screen.getByTestId("presence-indicator");
    expect(indicator.className).toContain("component-root");
    expect(indicator.className).toContain("slot-root");
    expect(screen.getByTestId("presence-label").textContent).toBe("Ada");
    expect(screen.getByTestId("presence-dot")).toBeTruthy();
  });
});
