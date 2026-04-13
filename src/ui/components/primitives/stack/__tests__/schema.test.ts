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
});
