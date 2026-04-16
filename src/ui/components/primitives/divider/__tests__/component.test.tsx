/**
 * @vitest-environment jsdom
 */
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../../../context", () => ({
  useSubscribe: () => null,
  useResolveFrom: <T extends Record<string, unknown>>(value: T) => value,
}));

vi.mock("../../../../manifest/runtime", () => ({
  useManifestRuntime: () => null,
  useRouteRuntime: () => null,
}));

import { Divider } from "../component";

describe("Divider", () => {
  it("renders slot-driven label styling", () => {
    render(
      <Divider
        config={{
          type: "divider",
          className: "component-root",
          label: "Section",
          orientation: "horizontal",
          slots: {
            root: {
              className: "divider-root-slot",
            },
            label: {
              className: "divider-label-slot",
            },
          },
        }}
      />,
    );

    const label = screen.getByText("Section");
    expect(label.className).toContain("divider-label-slot");
    expect(screen.getByRole("separator").className).toContain("component-root");
    expect(screen.getByRole("separator").className).toContain("divider-root-slot");
  });
});
