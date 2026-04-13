/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { textConfigSchema } from "../schema";

describe("textConfigSchema", () => {
  it("accepts canonical root slots", () => {
    const result = textConfigSchema.safeParse({
      type: "text",
      value: "Hello",
      slots: {
        root: {
          className: "text-slot",
          color: "text.default",
        },
      },
    });

    expect(result.success).toBe(true);
  });
});
