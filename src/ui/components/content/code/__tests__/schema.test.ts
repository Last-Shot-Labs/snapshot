import { describe, expect, it } from "vitest";
import { codeConfigSchema } from "../schema";

describe("codeConfigSchema", () => {
  it("accepts inline code values", () => {
    const result = codeConfigSchema.safeParse({
      type: "code",
      value: "const x = 1",
      fallback: "n/a",
    });

    expect(result.success).toBe(true);
  });
});
