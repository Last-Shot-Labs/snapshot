// @vitest-environment happy-dom
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

vi.mock("../../../manifest/runtime", () => ({
  useManifestRuntime: () => null,
  useRouteRuntime: () => null,
}));

vi.mock("../../../context", () => ({
  useSubscribe: () => null,
}));

import { ComponentWrapper } from "../component-wrapper";

describe("ComponentWrapper", () => {
  afterEach(() => {
    cleanup();
  });

  it("applies sticky, z-index, transition, animation, glass, and background styles", () => {
    const { container } = render(
      <ComponentWrapper
        type="card"
        id="hero"
        sticky={{ top: "1rem", zIndex: "sticky" }}
        zIndex="overlay"
        transition={{ property: "opacity", duration: "fast", easing: "out" }}
        animation={{ enter: "fade-up", duration: "slow", stagger: 80 }}
        glass
        background={{
          gradient: {
            type: "linear",
            direction: "135deg",
            stops: [
              { color: "var(--sn-color-primary)", position: "0%" },
              { color: "var(--sn-color-accent)", position: "100%" },
            ],
          },
        }}
      >
        <div>content</div>
      </ComponentWrapper>,
    );

    const element = container.firstElementChild as HTMLElement;
    expect(element.dataset.snapshotComponent).toBe("card");
    expect(element.dataset.snapshotId).toBe("hero");
    expect(element.style.position).toBe("sticky");
    expect(element.style.top).toBe("1rem");
    expect(element.style.zIndex).toContain("var(--sn-z-index-overlay");
    expect(element.style.transition).toContain("opacity");
    expect(element.style.animation).toContain("sn-fade-up");
    expect(element.style.backdropFilter).toContain("blur");
    expect(element.style.backgroundImage).toContain("linear-gradient");
  });

  it("applies canonical root slot backgrounds from config", () => {
    const { container } = render(
      <ComponentWrapper
        type="panel"
        id="slot-root"
        config={{
          type: "panel",
          slots: {
            root: {
              bg: {
                gradient: {
                  type: "linear",
                  direction: "90deg",
                  stops: [
                    { color: "#111111", position: "0%" },
                    { color: "#eeeeee", position: "100%" },
                  ],
                },
              },
            },
          },
        }}
      >
        <div>content</div>
      </ComponentWrapper>,
    );

    const element = container.firstElementChild as HTMLElement;
    expect(element.style.backgroundImage).toContain("linear-gradient");
  });
});
