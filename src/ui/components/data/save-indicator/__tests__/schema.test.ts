import { describe, expect, it } from "vitest";
import { saveIndicatorConfigSchema } from "../schema";

describe("saveIndicatorConfigSchema", () => {
  it("accepts state-bound save statuses", () => {
    const result = saveIndicatorConfigSchema.safeParse({
      type: "save-indicator",
      status: { from: "draft.status" },
      savedText: "All changes saved",
    });

    expect(result.success).toBe(true);
  });
});
