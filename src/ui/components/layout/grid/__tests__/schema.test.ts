// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { gridConfigSchema } from "../schema";

describe("gridConfigSchema", () => {
  it("accepts named areas and children", () => {
    const result = gridConfigSchema.safeParse({
      type: "grid",
      areas: ["header header", "sidebar main"],
      columns: "240px 1fr",
      rows: "auto 1fr",
      gap: "md",
      children: [{ type: "heading", text: "Header", area: "header" }],
    });

    expect(result.success).toBe(true);
  });

  it("accepts responsive areas and columns", () => {
    const result = gridConfigSchema.safeParse({
      type: "grid",
      areas: { default: ["main"], lg: ["sidebar main"] },
      columns: { default: 1, lg: "240px 1fr" },
      children: [{ type: "heading", text: "Main" }],
    });

    expect(result.success).toBe(true);
  });

  it("requires at least one child", () => {
    const result = gridConfigSchema.safeParse({
      type: "grid",
      areas: ["main"],
      children: [],
    });

    expect(result.success).toBe(false);
  });
});
