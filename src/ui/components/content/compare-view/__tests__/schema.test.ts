// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { compareViewConfigSchema } from "../schema";

describe("compareViewConfigSchema", () => {
  it("accepts a compare view config", () => {
    const result = compareViewConfigSchema.safeParse({
      type: "compare-view",
      left: "line one",
      right: "line two",
      leftLabel: "Before",
      rightLabel: "After",
    });

    expect(result.success).toBe(true);
  });
});
