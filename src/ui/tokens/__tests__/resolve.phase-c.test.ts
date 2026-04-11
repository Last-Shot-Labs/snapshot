// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { registerBuiltInFlavors } from "../flavors";
import { resolveFrameworkStyles, resolveTokens } from "../resolve";

registerBuiltInFlavors();

describe("Phase C token resolution", () => {
  it("emits scrollbar variables from theme config", () => {
    const css = resolveTokens({
      overrides: {
        components: {
          scrollbar: {
            width: "10px",
            track: "var(--sn-color-background)",
            thumb: "var(--sn-color-muted)",
            thumbHover: "var(--sn-color-primary)",
            radius: "full",
          },
        },
      },
    });

    expect(css).toContain("--sn-scrollbar-width: 10px;");
    expect(css).toContain("--sn-scrollbar-thumb:");
    expect(css).toContain("--sn-scrollbar-thumb-hover:");
  });

  it("includes scrollbar rules and the bounce keyframe in framework CSS", () => {
    const css = resolveFrameworkStyles();

    expect(css).toContain("::-webkit-scrollbar");
    expect(css).toContain("@keyframes sn-bounce");
  });
});
