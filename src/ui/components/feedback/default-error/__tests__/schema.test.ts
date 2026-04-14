import { describe, expect, it } from "vitest";
import { errorPageConfigSchema } from "../schema";

describe("errorPageConfigSchema", () => {
  it("accepts retryable error states", () => {
    const result = errorPageConfigSchema.safeParse({
      type: "error-page",
      title: "Request failed",
      description: "Please try again.",
      showRetry: true,
    });

    expect(result.success).toBe(true);
  });
});
