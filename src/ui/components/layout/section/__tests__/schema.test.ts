// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { sectionConfigSchema } from "../schema";

describe("sectionConfigSchema", () => {
  it("accepts hero-style layout props", () => {
    const result = sectionConfigSchema.safeParse({
      type: "section",
      height: "screen",
      align: "center",
      justify: "between",
      bleed: true,
      children: [{ type: "text", text: "Hero" }],
    });

    expect(result.success).toBe(true);
  });
});
