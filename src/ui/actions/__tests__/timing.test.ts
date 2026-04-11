import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounceAction, throttleAction } from "../timing";

describe("action timing", () => {
  let now = 0;

  beforeEach(() => {
    vi.useFakeTimers();
    now = 0;
    vi.spyOn(Date, "now").mockImplementation(() => now);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("debounces repeated calls by key", async () => {
    const fn = vi.fn(() => "done");
    const first = debounceAction("search", fn, 200);
    const second = debounceAction("search", fn, 200);

    vi.advanceTimersByTime(199);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    await expect(first).resolves.toBe("done");
    await expect(second).resolves.toBe("done");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throttles repeated calls inside the cooldown window", async () => {
    const fn = vi.fn(() => "done");

    await expect(throttleAction("navigate", fn, 1000)).resolves.toBe("done");
    await expect(throttleAction("navigate", fn, 1000)).resolves.toBeUndefined();
    expect(fn).toHaveBeenCalledTimes(1);

    now = 1500;
    await expect(throttleAction("navigate", fn, 1000)).resolves.toBe("done");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
