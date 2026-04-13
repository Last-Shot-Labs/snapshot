"use client";

import { useEffect, useRef } from "react";

/** Options controlling interval-based polling from client components. */
export interface UsePollOptions {
  interval: number;
  pauseWhenHidden: boolean;
  onPoll: () => void;
  enabled: boolean;
}

/**
 * Invoke a callback on an interval with optional document-visibility pausing.
 */
export function usePoll({
  interval,
  pauseWhenHidden,
  onPoll,
  enabled,
}: UsePollOptions): void {
  const onPollRef = useRef(onPoll);
  onPollRef.current = onPoll;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    let timer: number | undefined;

    const start = () => {
      if (timer !== undefined) {
        return;
      }
      if (
        pauseWhenHidden &&
        typeof document !== "undefined" &&
        document.hidden
      ) {
        return;
      }
      timer = window.setInterval(() => {
        if (
          pauseWhenHidden &&
          typeof document !== "undefined" &&
          document.hidden
        ) {
          return;
        }
        onPollRef.current();
      }, interval);
    };

    const stop = () => {
      if (timer === undefined) {
        return;
      }
      window.clearInterval(timer);
      timer = undefined;
    };

    const handleVisibilityChange = () => {
      if (!pauseWhenHidden || typeof document === "undefined") {
        return;
      }
      if (document.hidden) {
        stop();
        return;
      }
      onPollRef.current();
      start();
    };

    start();
    if (pauseWhenHidden && typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      stop();
      if (pauseWhenHidden && typeof document !== "undefined") {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      }
    };
  }, [enabled, interval, pauseWhenHidden]);
}
