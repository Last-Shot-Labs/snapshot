// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import {
  manifestConfigSchema,
  shortcutConfigSchema,
  shortcutsConfigSchema,
} from "../schema";

describe("shortcut schemas", () => {
  it("accepts shortcut bindings with action arrays", () => {
    const result = shortcutConfigSchema.safeParse({
      label: "Open palette",
      action: [
        { type: "open-modal", modal: "command-palette" },
        { type: "track", event: "palette.opened" },
      ],
      disabled: false,
    });

    expect(result.success).toBe(true);
  });

  it("accepts a shortcuts map on the manifest root", () => {
    expect(
      shortcutsConfigSchema.safeParse({
        "ctrl+k": {
          action: { type: "open-modal", modal: "command-palette" },
        },
      }).success,
    ).toBe(true);

    expect(
      manifestConfigSchema.safeParse({
        shortcuts: {
          "g then d": {
            action: { type: "navigate", to: "/dashboard" },
          },
        },
        routes: [
          {
            id: "home",
            path: "/",
            content: [{ type: "heading", text: "Hello" }],
          },
        ],
      }).success,
    ).toBe(true);
  });
});
