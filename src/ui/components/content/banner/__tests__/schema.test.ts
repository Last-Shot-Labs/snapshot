// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { bannerConfigSchema } from "../schema";

describe("bannerConfigSchema", () => {
  it("accepts a banner config with background and children", () => {
    const result = bannerConfigSchema.safeParse({
      type: "banner",
      background: {
        image: "https://example.com/banner.jpg",
        overlay: "linear-gradient(black, transparent)",
      },
      height: { default: "24rem" },
      align: "center",
      children: [{ type: "markdown", content: "# Welcome" }],
    });

    expect(result.success).toBe(true);
  });
});
