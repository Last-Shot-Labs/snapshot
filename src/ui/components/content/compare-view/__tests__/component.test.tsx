// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompareView } from "../component";

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
}));

describe("CompareView", () => {
  it("renders both panes and diff labels", () => {
    render(
      <CompareView
        config={{
          type: "compare-view",
          left: "one\ntwo",
          right: "one\nthree",
          leftLabel: "Before",
          rightLabel: "After",
        }}
      />,
    );

    expect(screen.getByTestId("compare-view")).toBeTruthy();
    expect(screen.getByTestId("compare-left-label").textContent).toBe("Before");
    expect(screen.getByTestId("compare-right-label").textContent).toBe("After");
    expect(screen.getByTestId("compare-right").textContent).toContain("three");
  });
});
