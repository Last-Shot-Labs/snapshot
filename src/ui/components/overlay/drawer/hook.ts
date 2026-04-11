import { useEffect, useRef } from "react";
import { useModalManager } from "../../../actions/modal-manager";
import { useSubscribe } from "../../../context/hooks";
import type { DrawerConfig } from "./schema";
import type { UseDrawerReturn } from "./types";

/**
 * Hook that manages drawer state for a given drawer config.
 * Reads open/close state from the modal manager, resolves the title FromRef,
 * and handles the trigger auto-open behavior.
 *
 * @param config - The drawer config from the manifest
 * @returns Drawer state and controls
 */
export function useDrawer(config: DrawerConfig): UseDrawerReturn {
  const { open, close, isOpen, getPayload, getResult } = useModalManager();
  const id = config.id ?? "";
  const currentlyOpen = isOpen(id);
  const payload = getPayload(id);
  const result = getResult(id);

  // Resolve trigger from ref
  const triggerValue = useSubscribe(config.trigger);

  // Track previous trigger value to detect truthy transitions
  const prevTriggerRef = useRef<unknown>(undefined);

  useEffect(() => {
    if (config.trigger === undefined) return;

    const prev = prevTriggerRef.current;
    prevTriggerRef.current = triggerValue;

    // Auto-open when trigger becomes truthy
    if (triggerValue && !prev) {
      open(id);
    }
    // Auto-close when trigger becomes falsy
    if (!triggerValue && prev) {
      close(id);
    }
  }, [triggerValue, config.trigger, id, open, close]);

  useEffect(() => {
    if (!config.urlParam || typeof window === "undefined") {
      return;
    }

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.has(config.urlParam!)) {
        open(id);
      } else {
        close(id);
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, [close, config.urlParam, id, open]);

  useEffect(() => {
    if (!config.urlParam || typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    if (currentlyOpen) {
      url.searchParams.set(config.urlParam, "1");
    } else {
      url.searchParams.delete(config.urlParam);
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [config.urlParam, currentlyOpen]);

  return {
    isOpen: currentlyOpen,
    open: () => open(id),
    close: () => close(id),
    payload,
    result,
  };
}
