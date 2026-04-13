import { describe, expect, it } from "vitest";
import { treeViewConfigSchema } from "../schema";

describe("treeViewConfigSchema", () => {
  it("accepts canonical tree slots and badges", () => {
    const result = treeViewConfigSchema.safeParse({
      type: "tree-view",
      items: [
        {
          label: "Docs",
          badge: "3",
          slots: {
            row: { className: "tree-row" },
            badge: { className: "tree-badge" },
          },
        },
      ],
      slots: {
        root: { className: "tree-root" },
        children: { className: "tree-children" },
      },
    });

    expect(result.success).toBe(true);
  });
});
