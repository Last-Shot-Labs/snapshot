/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { oauthButtonsConfigSchema } from "../schema";

describe("oauthButtonsConfigSchema", () => {
  it("accepts canonical provider slots", () => {
    const result = oauthButtonsConfigSchema.safeParse({
      type: "oauth-buttons",
      heading: "Continue with",
      slots: {
        root: { className: "oauth-root" },
        providerGroup: { className: "oauth-provider-group" },
        provider: { className: "oauth-provider" },
        providerLabel: { className: "oauth-provider-label" },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts config-driven headings", () => {
    const result = oauthButtonsConfigSchema.safeParse({
      type: "oauth-buttons",
      heading: {
        t: "auth.providers.heading",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects deprecated onSuccess actions", () => {
    const result = oauthButtonsConfigSchema.safeParse({
      type: "oauth-buttons",
      onSuccess: {
        type: "navigate",
        to: "/dashboard",
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects unknown provider slot names", () => {
    const result = oauthButtonsConfigSchema.safeParse({
      type: "oauth-buttons",
      slots: {
        providerBadge: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
