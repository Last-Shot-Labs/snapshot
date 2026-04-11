import { describe, expect, it } from "vitest";
import { validateField } from "../hook";

describe("validateField", () => {
  it("requires values when required is true", () => {
    expect(
      validateField(
        { name: "email", type: "email", required: true },
        "",
      ),
    ).toBe("email is required");
  });

  it("supports pattern objects with custom messages", () => {
    expect(
      validateField(
        {
          name: "name",
          type: "text",
          validate: {
            pattern: {
              value: "^[A-Z]",
              message: "Must start with uppercase",
            },
          },
        },
        "alice",
      ),
    ).toBe("Must start with uppercase");
  });

  it("supports equality validation against another field", () => {
    expect(
      validateField(
        {
          name: "confirmPassword",
          type: "password",
          validate: { equals: "password" },
        },
        "abc",
        { password: "xyz" },
      ),
    ).toBe("Must match password");
  });

  it("supports dynamic required refs", () => {
    expect(
      validateField(
        {
          name: "reason",
          type: "text",
          required: { from: "needsReason" },
        },
        "",
        { needsReason: true },
      ),
    ).toBe("reason is required");
  });
});
