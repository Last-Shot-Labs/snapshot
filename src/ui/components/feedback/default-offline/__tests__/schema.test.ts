import { describe, expect, it } from "vitest";
import { offlineBannerConfigSchema } from "../schema";

describe("offlineBannerConfigSchema", () => {
  it("accepts offline status content", () => {
    const result = offlineBannerConfigSchema.safeParse({
      type: "offline-banner",
      title: "Offline",
      description: "Reconnect to continue.",
    });

    expect(result.success).toBe(true);
  });
});
