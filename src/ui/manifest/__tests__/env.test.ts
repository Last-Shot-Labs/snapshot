import { describe, expect, it } from "vitest";
import { isEnvRef, resolveEnvRef } from "../env";

describe("env helpers", () => {
  it("detects env refs", () => {
    expect(isEnvRef({ env: "API_URL" })).toBe(true);
    expect(isEnvRef({ env: 123 })).toBe(false);
    expect(isEnvRef(null)).toBe(false);
  });

  it("resolves env refs from the provided env source", () => {
    expect(resolveEnvRef({ env: "API_URL" }, { API_URL: "https://api.example.com" })).toBe(
      "https://api.example.com",
    );
  });

  it("falls back to the declared default when the env var is missing", () => {
    expect(
      resolveEnvRef(
        { env: "API_URL", default: "https://fallback.example.com" },
        {},
      ),
    ).toBe("https://fallback.example.com");
  });
});
