// @vitest-environment happy-dom
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Spacer } from "../component";

describe("Spacer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders vertical spacing by default", () => {
    const { container } = render(<Spacer config={{ type: "spacer" }} />);
    const element = container.firstElementChild as HTMLElement;

    expect(element.style.height).toContain("var(--sn-spacing-md");
    expect(element.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders horizontal spacing when requested", () => {
    const { container } = render(
      <Spacer config={{ type: "spacer", axis: "horizontal", size: "lg" }} />,
    );
    const element = container.firstElementChild as HTMLElement;

    expect(element.style.width).toContain("var(--sn-spacing-lg");
  });
});
