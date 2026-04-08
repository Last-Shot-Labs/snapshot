import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { warnOnce, _resetWarnings } from "../warnings";

describe("warnOnce", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    _resetWarnings();
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    originalNodeEnv = process.env.NODE_ENV;
    // Ensure dev mode
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    warnSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("emits warning on first call", () => {
    warnOnce("test-key", "test message");
    expect(warnSpy).toHaveBeenCalledWith("test message");
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("deduplicates by key — only warns once", () => {
    warnOnce("test-key", "test message");
    warnOnce("test-key", "test message");
    warnOnce("test-key", "test message");
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("different keys each warn independently", () => {
    warnOnce("key-a", "message a");
    warnOnce("key-b", "message b");
    expect(warnSpy).toHaveBeenCalledTimes(2);
  });

  it("no-ops in production", () => {
    process.env.NODE_ENV = "production";
    warnOnce("prod-key", "should not warn");
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("_resetWarnings allows re-warning after reset", () => {
    warnOnce("test-key", "first");
    expect(warnSpy).toHaveBeenCalledTimes(1);
    _resetWarnings();
    warnOnce("test-key", "second");
    expect(warnSpy).toHaveBeenCalledTimes(2);
  });
});
