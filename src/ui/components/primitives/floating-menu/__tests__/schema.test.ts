import { describe, expect, it } from "vitest";
import { floatingMenuConfigSchema } from "../schema";

describe("floatingMenuConfigSchema", () => {
  it("accepts floating-menu primitives with slot surfaces", () => {
    const result = floatingMenuConfigSchema.safeParse({
      type: "floating-menu",
      triggerLabel: "Actions",
      items: [
        {
          type: "label",
          text: "Section",
        },
        {
          type: "item",
          label: "Edit",
          action: { type: "navigate", to: "/edit" },
          slots: {
            item: {
              className: "menu-item",
            },
          },
        },
        {
          type: "separator",
        },
      ],
      slots: {
        panel: {
          className: "menu-panel",
        },
        item: {
          className: "menu-item",
        },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts config-driven trigger and item labels", () => {
    const result = floatingMenuConfigSchema.safeParse({
      type: "floating-menu",
      triggerLabel: {
        t: "menu.actions",
      },
      items: [
        {
          type: "label",
          text: {
            expr: "route.path",
          },
        },
        {
          type: "item",
          label: {
            from: "global.selection.name",
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("rejects extra properties", () => {
    const result = floatingMenuConfigSchema.safeParse({
      type: "floating-menu",
      items: [],
      primitiveProps: { invalid: true },
    });

    expect(result.success).toBe(false);
  });

  it("rejects unknown root and entry slot names", () => {
    const result = floatingMenuConfigSchema.safeParse({
      type: "floating-menu",
      items: [
        {
          type: "item",
          label: "Edit",
          slots: {
            panel: {
              className: "not-supported",
            },
          },
        },
      ],
      slots: {
        content: {
          className: "not-supported",
        },
      },
    });

    expect(result.success).toBe(false);
  });
});
