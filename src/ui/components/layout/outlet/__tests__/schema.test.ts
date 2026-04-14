import { describe, expect, it } from "vitest";
import { bootBuiltins } from "../../../../manifest/boot-builtins";
import { outletComponentSchema } from "../schema";

describe("outletComponentSchema", () => {
  it("accepts fallback content", () => {
    bootBuiltins();

    const result = outletComponentSchema.safeParse({
      type: "outlet",
      fallback: [{ type: "text", value: "No nested route" }],
    });

    expect(result.success).toBe(true);
  });
});
