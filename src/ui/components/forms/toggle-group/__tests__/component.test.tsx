/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { AtomRegistryImpl } from "../../../../context/registry";
import {
  AppRegistryContext,
  PageRegistryContext,
} from "../../../../context/providers";
import { ToggleGroup } from "../component";

function createWrapper() {
  const registry = new AtomRegistryImpl();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AppRegistryContext.Provider value={null}>
        <PageRegistryContext.Provider value={registry}>
          {children}
        </PageRegistryContext.Provider>
      </AppRegistryContext.Provider>
    );
  }

  return Wrapper;
}

describe("ToggleGroup", () => {
  it("applies canonical root and item slots", () => {
    const Wrapper = createWrapper();
    const { container } = render(
      <Wrapper>
        <ToggleGroup
          config={{
            type: "toggle-group",
            id: "view-toggle",
            items: [
              {
                value: "grid",
                label: "Grid",
                slots: {
                  itemLabel: { className: "label-slot" },
                },
              },
            ],
            slots: {
              root: { className: "root-slot" },
              item: { className: "item-slot" },
            },
          }}
        />
      </Wrapper>,
    );

    expect(
      container.querySelector('[data-snapshot-id="view-toggle-root"]')?.className,
    ).toContain("root-slot");
    expect(screen.getByRole("button", { name: "Grid" }).className).toContain(
      "item-slot",
    );
    expect(screen.getByText("Grid").className).toContain("label-slot");
  });
});
