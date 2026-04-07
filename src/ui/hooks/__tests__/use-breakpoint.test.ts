import { describe, it, expect } from "vitest";
import { resolveResponsiveValue } from "../use-breakpoint";
import type { Breakpoint } from "../use-breakpoint";

describe("resolveResponsiveValue", () => {
  it("returns flat values unchanged", () => {
    expect(resolveResponsiveValue(42, "default")).toBe(42);
    expect(resolveResponsiveValue("hello", "lg")).toBe("hello");
    expect(resolveResponsiveValue(true, "xl")).toBe(true);
  });

  it("returns null unchanged", () => {
    expect(resolveResponsiveValue(null, "default")).toBeNull();
  });

  it("returns default when breakpoint is default", () => {
    const value = { default: 1, md: 2, lg: 3 };
    expect(resolveResponsiveValue(value, "default")).toBe(1);
  });

  it("returns exact breakpoint value when defined", () => {
    const value = { default: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 };
    expect(resolveResponsiveValue(value, "sm")).toBe(2);
    expect(resolveResponsiveValue(value, "md")).toBe(3);
    expect(resolveResponsiveValue(value, "lg")).toBe(4);
    expect(resolveResponsiveValue(value, "xl")).toBe(5);
    expect(resolveResponsiveValue(value, "2xl")).toBe(6);
  });

  it("cascades down to next smaller breakpoint", () => {
    const value = { default: 1, md: 3 };
    // lg is not defined, falls back to md
    expect(resolveResponsiveValue(value, "lg")).toBe(3);
    // xl is not defined, falls back to md (skipping lg which is also not defined)
    expect(resolveResponsiveValue(value, "xl")).toBe(3);
    // 2xl cascades down to md
    expect(resolveResponsiveValue(value, "2xl")).toBe(3);
    // sm is not defined, falls back to default
    expect(resolveResponsiveValue(value, "sm")).toBe(1);
  });

  it("cascades correctly with sparse breakpoints", () => {
    const value = { default: "a", lg: "b" };
    expect(resolveResponsiveValue(value, "default")).toBe("a");
    expect(resolveResponsiveValue(value, "sm")).toBe("a");
    expect(resolveResponsiveValue(value, "md")).toBe("a");
    expect(resolveResponsiveValue(value, "lg")).toBe("b");
    expect(resolveResponsiveValue(value, "xl")).toBe("b");
    expect(resolveResponsiveValue(value, "2xl")).toBe("b");
  });

  it("handles all breakpoints defined", () => {
    const value = {
      default: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      "2xl": 5,
    };
    const breakpoints: Breakpoint[] = [
      "default",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
    ];
    breakpoints.forEach((bp, i) => {
      expect(resolveResponsiveValue(value, bp)).toBe(i);
    });
  });

  it("works with object values", () => {
    const value = {
      default: { cols: 1 },
      md: { cols: 2 },
      lg: { cols: 3 },
    };
    expect(resolveResponsiveValue(value, "default")).toEqual({ cols: 1 });
    expect(resolveResponsiveValue(value, "md")).toEqual({ cols: 2 });
    expect(resolveResponsiveValue(value, "lg")).toEqual({ cols: 3 });
    expect(resolveResponsiveValue(value, "xl")).toEqual({ cols: 3 });
  });

  it("treats non-responsive objects without default key as flat values", () => {
    // An object without a "default" key should be treated as a flat value
    const value = { cols: 2, rows: 3 };
    expect(resolveResponsiveValue(value, "lg")).toEqual({ cols: 2, rows: 3 });
  });
});
