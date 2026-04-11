// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { listConfigSchema } from "../schema";

describe("listConfigSchema phase D", () => {
  it("accepts drag, drop, context menu, and polling props", () => {
    const result = listConfigSchema.safeParse({
      type: "list",
      draggable: true,
      dragGroup: "backlog",
      dropTargets: ["backlog"],
      onReorder: { type: "api", method: "POST", endpoint: "/api/reorder" },
      onDrop: { type: "toast", message: "Dropped" },
      contextMenu: [
        {
          label: "Open",
          action: { type: "navigate", to: "/items/{id}" },
        },
      ],
      poll: { interval: 5000, pauseWhenHidden: true },
      items: [{ id: "1", title: "Item 1" }],
    });

    expect(result.success).toBe(true);
  });
});
