'use client';

import { useEffect, useMemo, useRef, useState } from "react";

export interface UseVirtualListOptions {
  totalCount: number;
  itemHeight: number;
  overscan: number;
}

export interface UseVirtualListResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalHeight: number;
  startIndex: number;
  endIndex: number;
  offsetTop: number;
  visibleIndices: number[];
}

export function useVirtualList({
  totalCount,
  itemHeight,
  overscan,
}: UseVirtualListOptions): UseVirtualListResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      if (container) {
        setContainerHeight(container.clientHeight);
      }
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    observer.observe(container);
    setContainerHeight(container.clientHeight);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const totalHeight = totalCount * itemHeight;
  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / itemHeight) - overscan),
    [itemHeight, overscan, scrollTop],
  );
  const endIndex = useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    return Math.min(
      totalCount,
      Math.floor(scrollTop / itemHeight) + visibleCount + overscan,
    );
  }, [containerHeight, itemHeight, overscan, scrollTop, totalCount]);
  const offsetTop = startIndex * itemHeight;
  const visibleIndices = useMemo(() => {
    const indices: number[] = [];
    for (let index = startIndex; index < endIndex; index += 1) {
      indices.push(index);
    }
    return indices;
  }, [endIndex, startIndex]);

  return {
    containerRef,
    totalHeight,
    startIndex,
    endIndex,
    offsetTop,
    visibleIndices,
  };
}
