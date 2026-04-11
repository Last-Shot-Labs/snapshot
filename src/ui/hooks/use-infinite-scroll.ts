'use client';

import { useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
  threshold?: number;
}

/**
 * Observe a sentinel element and load the next page when it enters the viewport.
 */
export function useInfiniteScroll({
  hasNextPage,
  isLoading,
  loadNextPage,
  threshold = 200,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadNextPageRef = useRef(loadNextPage);
  loadNextPageRef.current = loadNextPage;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      !sentinel ||
      !hasNextPage ||
      isLoading
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadNextPageRef.current();
        }
      },
      { rootMargin: `${threshold}px` },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isLoading, threshold]);

  return sentinelRef;
}
