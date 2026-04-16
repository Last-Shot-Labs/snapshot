// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HighlightedText } from "../component";

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
  usePublish: () => vi.fn(),
}));

describe("HighlightedText", () => {
  it("renders matching text inside mark elements", () => {
    render(
      <HighlightedText
        config={{
          type: "highlighted-text",
          className: "component-root",
          text: "The quick brown fox",
          highlight: "fox",
          slots: {
            root: { className: "slot-root" },
          },
        }}
      />,
    );

    const text = screen.getByTestId("highlighted-text");
    expect(text.className).toContain("component-root");
    expect(text.className).toContain("slot-root");
    expect(text.textContent).toContain("The quick brown fox");
    expect(screen.getByTestId("highlight-mark").textContent).toBe("fox");
  });
});
