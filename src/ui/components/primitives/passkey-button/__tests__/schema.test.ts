/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { passkeyButtonConfigSchema } from "../schema";

describe("passkeyButtonConfigSchema", () => {
  it("accepts canonical root and label slots", () => {
    const result = passkeyButtonConfigSchema.safeParse({
      type: "passkey-button",
      label: "Sign in with passkey",
      slots: {
        root: { className: "passkey-root" },
        label: { className: "passkey-label" },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts config-driven labels and error workflows", () => {
    const result = passkeyButtonConfigSchema.safeParse({
      type: "passkey-button",
      label: {
        t: "auth.passkey",
      },
      onError: {
        type: "toast",
        variant: "error",
        message: "Failed",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects unknown slot names", () => {
    const result = passkeyButtonConfigSchema.safeParse({
      type: "passkey-button",
      label: "Sign in with passkey",
      slots: {
        trigger: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
