/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { dividerConfigSchema } from "../schema";

describe("dividerConfigSchema", () => {
  it("accepts canonical divider slots", () => {
    const result = dividerConfigSchema.safeParse({
      type: "divider",
      label: "Profile",
      slots: {
        root: { className: "divider-root" },
        label: { color: "text.muted" },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts translated divider labels", () => {
    const result = dividerConfigSchema.safeParse({
      type: "divider",
      label: {
        t: "profile.section",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects unknown divider slots", () => {
    const result = dividerConfigSchema.safeParse({
      type: "divider",
      slots: {
        separator: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
