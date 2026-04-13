// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Markdown } from "../component";

vi.mock("../../../../context/hooks", () => ({
  useSubscribe: (value: unknown) => value,
  usePublish: () => vi.fn(),
}));

describe("Markdown", () => {
  it("renders markdown headings and links", () => {
    render(
      <Markdown
        config={{
          type: "markdown",
          content: "# Welcome\n\nVisit [Snapshot](https://example.com).",
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Welcome" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Snapshot" }).getAttribute("href")).toBe(
      "https://example.com",
    );
  });
});
