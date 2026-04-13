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
});
