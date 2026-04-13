import { describe, expect, it } from "vitest";
import {
  mergeClassNames,
  resolveSurfaceConfig,
  resolveSurfaceStateOrder,
} from "../style-surfaces";

describe("style-surfaces", () => {
  it("merges class names without preserving empties", () => {
    expect(mergeClassNames("root", undefined, "item")).toBe("root item");
  });

  it("applies canonical state precedence", () => {
    expect(resolveSurfaceStateOrder(["hover", "current", "disabled", "active"])).toEqual([
      "hover",
      "current",
      "active",
      "disabled",
    ]);
  });

  it("lets item surface config override component surface config", () => {
    const resolved = resolveSurfaceConfig({
      componentSurface: {
        className: "component-root",
        style: { color: "red" },
      },
      itemSurface: {
        className: "item-root",
        style: { color: "blue" },
      },
    });

    expect(resolved.resolvedConfigForWrapper?.className).toBe("component-root item-root");
    expect(resolved.resolvedConfigForWrapper?.style).toEqual({ color: "blue" });
  });
});
