import { describe, expect, it } from "vitest";
import { headingConfigSchema } from "../schema";

describe("headingConfigSchema", () => {
  it("accepts a heading config", () => {
    const result = headingConfigSchema.safeParse({
      type: "heading",
      text: "Section title",
      level: 2,
      align: "center",
    });

    expect(result.success).toBe(true);
  });
});
