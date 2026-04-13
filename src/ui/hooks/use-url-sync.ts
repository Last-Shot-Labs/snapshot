"use client";

import { useEffect, useRef } from "react";

export interface UseUrlSyncOptions {
  params: Record<string, string>;
  state: Record<string, unknown>;
  onStateFromUrl: (state: Record<string, string>) => void;
  replace?: boolean;
  enabled: boolean;
}

/** Keep a slice of local state synchronized with URL query parameters. */
export function useUrlSync(options: UseUrlSyncOptions): void {
  const { params, state, onStateFromUrl, replace = true, enabled } = options;
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const stateFromUrl: Record<string, string> = {};
    for (const [stateKey, paramName] of Object.entries(params)) {
      const value = urlParams.get(paramName);
      if (value !== null) {
        stateFromUrl[stateKey] = value;
      }
    }

    if (Object.keys(stateFromUrl).length > 0) {
      onStateFromUrl(stateFromUrl);
    }

    initializedRef.current = true;
  }, [enabled, onStateFromUrl, params]);

  useEffect(() => {
    if (!enabled || !initializedRef.current || typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    for (const [stateKey, paramName] of Object.entries(params)) {
      const value = state[stateKey];
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(paramName, String(value));
      } else {
        url.searchParams.delete(paramName);
      }
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl === currentUrl) {
      return;
    }

    if (replace) {
      window.history.replaceState(null, "", nextUrl);
      return;
    }

    window.history.pushState(null, "", nextUrl);
  }, [enabled, params, replace, state]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const stateFromUrl: Record<string, string> = {};
      for (const [stateKey, paramName] of Object.entries(params)) {
        const value = urlParams.get(paramName);
        if (value !== null) {
          stateFromUrl[stateKey] = value;
        }
      }
      onStateFromUrl(stateFromUrl);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, onStateFromUrl, params]);
}
