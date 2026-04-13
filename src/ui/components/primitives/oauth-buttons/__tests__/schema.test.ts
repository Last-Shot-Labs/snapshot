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
        provider: { className: "oauth-provider" },
        providerLabel: { className: "oauth-provider-label" },
      },
    });

    expect(result.success).toBe(true);
  });
});
