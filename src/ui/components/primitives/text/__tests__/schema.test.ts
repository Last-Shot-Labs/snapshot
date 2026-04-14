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

  it("accepts config-driven text values", () => {
    const result = textConfigSchema.safeParse({
      type: "text",
      value: {
        expr: "route.params.name",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects unknown text slots", () => {
    const result = textConfigSchema.safeParse({
      type: "text",
      value: "Hello",
      slots: {
        label: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
