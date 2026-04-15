// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { bootBuiltins } from "../../../../manifest/boot-builtins";
import { collapsibleConfigSchema } from "../schema";

describe("collapsibleConfigSchema", () => {
  it("accepts a collapsible config", () => {
    bootBuiltins();

    const result = collapsibleConfigSchema.safeParse({
      type: "collapsible",
      defaultOpen: false,
      trigger: { type: "markdown", content: "Toggle" },
      children: [{ type: "markdown", content: "Body" }],
    });

    expect(result.success).toBe(true);
  });

  it("accepts collapsible slot surfaces", () => {
    bootBuiltins();

    const result = collapsibleConfigSchema.safeParse({
      type: "collapsible",
      trigger: { type: "markdown", content: "Toggle" },
      children: [{ type: "markdown", content: "Body" }],
      slots: {
        trigger: { className: "collapsible-trigger-slot" },
        content: { className: "collapsible-content-slot" },
      },
    });

    expect(result.success).toBe(true);
  });
});
