// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { progressConfigSchema } from "../schema";

describe("progressConfigSchema", () => {
  it("accepts a progress config", () => {
    const result = progressConfigSchema.safeParse({
      type: "progress",
      value: 65,
      label: "Upload",
      showValue: true,
      color: "success",
      slots: {
        circularContainer: { className: "progress-circular-container" },
        circularSvg: { className: "progress-circular-svg" },
        segmentsRow: { className: "progress-segments-row" },
      },
    });

    expect(result.success).toBe(true);
  });
});
