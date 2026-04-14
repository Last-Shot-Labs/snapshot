import { describe, expect, it } from "vitest";
import { bootBuiltins } from "../../../../manifest/boot-builtins";
import { columnConfigSchema } from "../schema";

describe("columnConfigSchema", () => {
  it("accepts a vertical layout config", () => {
    bootBuiltins();

    const result = columnConfigSchema.safeParse({
      type: "column",
      gap: "lg",
      align: "stretch",
      children: [{ type: "text", value: "A" }],
    });

    expect(result.success).toBe(true);
  });
});
