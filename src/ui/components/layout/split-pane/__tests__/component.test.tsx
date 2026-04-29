/**
 * @vitest-environment jsdom
 */
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../../../manifest/renderer", () => ({
  ComponentRenderer: ({ config }: { config: { id?: string; type: string } }) => (
    <div>{config.id ?? config.type}</div>
  ),
}));

import { SplitPane } from "../component";

describe("SplitPane", () => {
  it("renders canonical root and divider slots", () => {
    render(
      <SplitPane
        config={{
          type: "split-pane",
          id: "workspace-split",
          className: "component-root",
          direction: "horizontal",
          children: [
            { type: "text", id: "left-pane", value: "Left" },
            { type: "text", id: "right-pane", value: "Right" },
          ] as unknown as Array<{ type: string }>,
          slots: {
            root: { className: "split-root-slot" },
            pane: { className: "split-pane-slot" },
            firstPane: { className: "split-first-pane-slot" },
            secondPane: { className: "split-second-pane-slot" },
            divider: { className: "split-divider-slot" },
          },
        }}
      />,
    );

    const root = document.querySelector('[data-snapshot-id="workspace-split-root"]');
    const firstPane = document.querySelector(
      '[data-snapshot-id="workspace-split-first-pane"]',
    );
    const secondPane = document.querySelector(
      '[data-snapshot-id="workspace-split-second-pane"]',
    );
    const divider = document.querySelector('[data-snapshot-id="workspace-split-divider"]');
    expect(root?.className).toContain("component-root");
    expect(root?.className).toContain("split-root-slot");
    expect(firstPane?.className).toContain("split-pane-slot");
    expect(firstPane?.className).toContain("split-first-pane-slot");
    expect(secondPane?.className).toContain("split-pane-slot");
    expect(secondPane?.className).toContain("split-second-pane-slot");
    expect(divider?.className).toContain("split-divider-slot");
    expect(screen.getByText("left-pane")).toBeTruthy();
    expect(screen.getByText("right-pane")).toBeTruthy();
  });
});
