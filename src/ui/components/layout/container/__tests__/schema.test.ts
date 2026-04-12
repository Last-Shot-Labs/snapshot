// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { containerConfigSchema } from "../schema";

describe("containerConfigSchema", () => {
  it("accepts token-based max widths and children", () => {
    const result = containerConfigSchema.safeParse({
      type: "container",
      maxWidth: "xl",
      padding: "md",
      center: true,
      children: [{ type: "heading", text: "Hello" }],
    });

    expect(result.success).toBe(true);
  });

  it("accepts numeric max widths", () => {
    const result = containerConfigSchema.safeParse({
      type: "container",
      maxWidth: 1200,
      children: [{ type: "heading", text: "Hello" }],
    });

    expect(result.success).toBe(true);
  });
});
