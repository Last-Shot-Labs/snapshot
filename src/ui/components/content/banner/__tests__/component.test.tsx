// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Banner } from "../component";

vi.mock("../../../../manifest/renderer", () => ({
  ComponentRenderer: ({ config }: { config: { id?: string; type: string } }) => (
    <div data-testid="banner-child">{config.id ?? config.type}</div>
  ),
}));

describe("Banner", () => {
  it("renders nested children through the manifest renderer", () => {
    const { container } = render(
      <Banner
        config={{
          type: "banner",
          align: "left",
          background: {
            color: "#111827",
            overlay: "linear-gradient(rgba(0,0,0,0.3), transparent)",
          },
          children: [{ type: "markdown", id: "hero-copy", content: "# Hero" } as never],
        }}
      />,
    );

    expect(
      container.querySelector('[data-snapshot-component="banner"]'),
    ).toBeTruthy();
    expect(screen.getByTestId("banner-child").textContent).toContain("hero-copy");
  });
});
