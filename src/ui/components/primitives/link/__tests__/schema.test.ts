/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { linkConfigSchema } from "../schema";

describe("linkConfigSchema", () => {
  it("accepts canonical link slots and optional icon/badge surfaces", () => {
    const result = linkConfigSchema.safeParse({
      type: "link",
      text: "Dashboard",
      to: "/dashboard",
      icon: "home",
      badge: "Beta",
      slots: {
        root: { className: "link-root" },
        label: { className: "link-label" },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts config-driven link text, href, and badges", () => {
    const result = linkConfigSchema.safeParse({
      type: "link",
      text: {
        t: "nav.dashboard",
      },
      to: {
        expr: "route.path",
      },
      badge: {
        from: "global.releaseChannel",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects unknown link slots", () => {
    const result = linkConfigSchema.safeParse({
      type: "link",
      text: "Dashboard",
      to: "/dashboard",
      slots: {
        trigger: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
