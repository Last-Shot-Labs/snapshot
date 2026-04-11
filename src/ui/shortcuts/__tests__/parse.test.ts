import { describe, expect, it } from "vitest";
import { parseChord } from "../parse";

describe("parseChord", () => {
  it("parses a chord into multiple combos", () => {
    expect(parseChord("g then d")).toEqual([
      { key: "g", ctrl: false, alt: false, shift: false, meta: false },
      { key: "d", ctrl: false, alt: false, shift: false, meta: false },
    ]);
  });

  it("returns a single combo for non-chord shortcuts", () => {
    expect(parseChord("ctrl+k")).toEqual([
      { key: "k", ctrl: true, alt: false, shift: false, meta: false },
    ]);
  });

  it("treats then as case-insensitive", () => {
    expect(parseChord("g ThEn d")).toHaveLength(2);
  });
});
