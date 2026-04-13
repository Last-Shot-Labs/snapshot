// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { markdownConfigSchema } from "../schema";

describe("markdownConfigSchema", () => {
  it("accepts markdown content config", () => {
    const result = markdownConfigSchema.safeParse({
      type: "markdown",
      content: "# Heading",
      maxHeight: "20rem",
    });

    expect(result.success).toBe(true);
  });
});
