// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useReorderable } from "../use-reorderable";

describe("useReorderable", () => {
  afterEach(() => {
    cleanup();
  });

  it("reorders items within the same collection", async () => {
    const onReorder = vi.fn();
    const { result } = renderHook(() =>
      useReorderable({
        items: ["a", "b", "c"],
        getKey: (item) => item,
        onReorder,
      }),
    );

    await act(async () => {
      await result.current.moveItem("a", "c");
    });

    expect(result.current.orderedItems).toEqual(["b", "c", "a"]);
    expect(onReorder).toHaveBeenCalledWith({
      oldIndex: 0,
      newIndex: 2,
      item: "a",
      items: ["b", "c", "a"],
    });
  });

  it("removes and reinserts items for cross-component transfers", () => {
    const { result } = renderHook(() =>
      useReorderable({
        items: [{ id: "1", label: "One" }, { id: "2", label: "Two" }],
        getKey: (item) => item.id,
      }),
    );

    let removed:
      | ReturnType<typeof result.current.removeItem>
      | null
      | undefined;
    act(() => {
      removed = result.current.removeItem("1");
    });

    expect(removed).toMatchObject({
      id: "1",
      index: 0,
      item: { id: "1", label: "One" },
      items: [{ id: "2", label: "Two" }],
    });

    act(() => {
      result.current.insertItem({ id: "1", label: "One" }, { itemId: "1" });
    });

    expect(result.current.orderedItems).toEqual([
      { id: "2", label: "Two" },
      { id: "1", label: "One" },
    ]);
  });
});
