import { describe, expect, it } from "vitest";
import { buttonConfigSchema } from "../schema";

describe("buttonConfigSchema", () => {
  it("accepts a minimal button config", () => {
    const result = buttonConfigSchema.safeParse({
      type: "button",
      label: "Save",
      action: { type: "navigate", to: "/save" },
    });

    expect(result.success).toBe(true);
  });

  it("accepts canonical slot surfaces", () => {
    const result = buttonConfigSchema.safeParse({
      type: "button",
      label: { from: "global.actions.primaryLabel" },
      icon: "plus",
      action: { type: "navigate", to: "/create" },
      slots: {
        root: {
          className: "button-root",
          states: {
            current: {
              className: "button-root-current",
            },
          },
        },
        label: {
          className: "button-label",
        },
        icon: {
          className: "button-icon",
        },
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects extra properties", () => {
    const result = buttonConfigSchema.safeParse({
      type: "button",
      label: "Save",
      action: { type: "navigate", to: "/save" },
      props: { invalid: true },
    });

    expect(result.success).toBe(false);
  });
});
