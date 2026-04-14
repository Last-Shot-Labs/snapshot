/**
 * @vitest-environment happy-dom
 */
import { z } from "zod";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../../manifest/schema", () => ({
  componentConfigSchema: z.object({ type: z.string() }).passthrough(),
}));

import { stackConfigSchema } from "../schema";

describe("stackConfigSchema", () => {
  it("accepts canonical root and item slots", () => {
    const result = stackConfigSchema.safeParse({
      type: "stack",
      children: [{ type: "text", value: "Child" }],
      slots: {
        root: { className: "stack-root" },
        item: { className: "stack-item" },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts responsive maxHeight through the universal style contract", () => {
    const result = stackConfigSchema.safeParse({
      type: "stack",
      children: [{ type: "text", value: "Child" }],
      maxHeight: {
        default: "20rem",
        lg: "32rem",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects unknown stack slots", () => {
    const result = stackConfigSchema.safeParse({
      type: "stack",
      children: [{ type: "text", value: "Child" }],
      slots: {
        panel: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
