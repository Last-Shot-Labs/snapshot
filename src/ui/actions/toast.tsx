import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useActionExecutor } from "./executor";
import { useManifestRuntime } from "../manifest/runtime";
import type { ActionConfig } from "./types";

type ToastVariant = "success" | "error" | "warning" | "info";
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastUndoConfig {
  label: string;
  action: ActionConfig;
  duration: number;
}

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  icon?: string;
  color?: string;
  action?: { label: string; onClick: () => void };
  undo?: ToastUndoConfig;
}

export interface ShowToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  icon?: string;
  color?: string;
  action?: { label: string; onClick: () => void };
  undo?: {
    label?: string;
    action: ActionConfig;
    duration?: number;
  };
}

export const toastQueueAtom = atom<ToastItem[]>([]);

export interface ToastManager {
  show: (options: ShowToastOptions) => string;
  dismiss: (id: string) => void;
}

let toastCounter = 0;

export function useToastManager(): ToastManager {
  const runtime = useManifestRuntime();
  const [, setQueue] = useAtom(toastQueueAtom);
  const manifestToast = runtime?.toast;

  const show = useCallback(
    (options: ShowToastOptions): string => {
      const id = `toast-${++toastCounter}-${Date.now()}`;
      const variant = options.variant ?? "info";
      const variantDefaults = manifestToast?.variants?.[variant];
      const toast: ToastItem = {
        id,
        message: options.message,
        variant,
        duration:
          options.duration ??
          options.undo?.duration ??
          variantDefaults?.duration ??
          manifestToast?.duration ??
          4000,
        icon: options.icon ?? variantDefaults?.icon,
        color: options.color ?? variantDefaults?.color,
        action: options.action,
        undo: options.undo
          ? {
              label: options.undo.label ?? "Undo",
              action: options.undo.action,
              duration: options.undo.duration ?? 5000,
            }
          : undefined,
      };
      setQueue((currentQueue) => [...currentQueue, toast]);
      return id;
    },
    [manifestToast?.duration, manifestToast?.variants, setQueue],
  );

  const dismiss = useCallback(
    (id: string) => {
      setQueue((currentQueue) => currentQueue.filter((toast) => toast.id !== id));
    },
    [setQueue],
  );

  return { show, dismiss };
}

const variantStyles: Record<ToastItem["variant"], React.CSSProperties> = {
  success: {
    background: "var(--sn-color-success, #22c55e)",
    color: "var(--sn-color-success-foreground, #ffffff)",
  },
  error: {
    background: "var(--sn-color-destructive, #ef4444)",
    color: "var(--sn-color-destructive-foreground, #ffffff)",
  },
  warning: {
    background: "var(--sn-color-warning, #f59e0b)",
    color: "var(--sn-color-warning-foreground, #ffffff)",
  },
  info: {
    background: "var(--sn-color-info, #3b82f6)",
    color: "var(--sn-color-info-foreground, #ffffff)",
  },
};

function resolveToastContainerPositionStyle(position: ToastPosition): {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform?: string;
} {
  switch (position) {
    case "top-left":
      return {
        top: "var(--sn-spacing-md, 1rem)",
        left: "var(--sn-spacing-md, 1rem)",
      };
    case "top-center":
      return {
        top: "var(--sn-spacing-md, 1rem)",
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "top-right":
      return {
        top: "var(--sn-spacing-md, 1rem)",
        right: "var(--sn-spacing-md, 1rem)",
      };
    case "bottom-left":
      return {
        bottom: "var(--sn-spacing-md, 1rem)",
        left: "var(--sn-spacing-md, 1rem)",
      };
    case "bottom-center":
      return {
        bottom: "var(--sn-spacing-md, 1rem)",
        left: "50%",
        transform: "translateX(-50%)",
      };
    default:
      return {
        bottom: "var(--sn-spacing-md, 1rem)",
        right: "var(--sn-spacing-md, 1rem)",
      };
  }
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const execute = useActionExecutor();
  const [remainingMs, setRemainingMs] = useState(toast.undo?.duration ?? toast.duration);

  useEffect(() => {
    if (toast.duration === 0) {
      return;
    }

    const startedAt = Date.now();
    const timer = setInterval(() => {
      const timeout = toast.undo?.duration ?? toast.duration;
      const nextRemaining = Math.max(0, timeout - (Date.now() - startedAt));
      setRemainingMs(nextRemaining);
      if (nextRemaining <= 0) {
        clearInterval(timer);
        onDismiss(toast.id);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [onDismiss, toast.duration, toast.id, toast.undo?.duration]);

  const undoCountdown = useMemo(
    () => (toast.undo ? Math.max(0, Math.ceil(remainingMs / 1000)) : null),
    [remainingMs, toast.undo],
  );

  return (
    <div
      style={{
        padding: "var(--sn-spacing-sm, 0.75rem) var(--sn-spacing-md, 1rem)",
        borderRadius: "var(--sn-radius-md, 0.5rem)",
        boxShadow: "var(--sn-shadow-md, 0 2px 8px rgba(0,0,0,0.15))",
        display: "flex",
        alignItems: "center",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        ...variantStyles[toast.variant],
        ...(toast.color
          ? {
              backgroundColor: toast.color,
              color: "var(--sn-color-foreground, #ffffff)",
            }
          : null),
      }}
      role="status"
      aria-live="polite"
    >
      {toast.icon ? <span aria-hidden="true">{toast.icon}</span> : null}
      <span style={{ flex: 1 }}>{toast.message}</span>
      {toast.action ? (
        <button
          onClick={toast.action.onClick}
          type="button"
          style={{
            background: "transparent",
            border: "var(--sn-border-default, 1px) solid currentColor",
            color: "inherit",
            cursor: "pointer",
            padding: "var(--sn-spacing-2xs, 0.25rem) var(--sn-spacing-xs, 0.5rem)",
            borderRadius: "var(--sn-radius-sm, 0.25rem)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
          }}
        >
          {toast.action.label}
        </button>
      ) : null}
      {toast.undo ? (
        <button
          type="button"
          onClick={() => {
            void execute(toast.undo!.action);
            onDismiss(toast.id);
          }}
          style={{
            background: "transparent",
            border: "var(--sn-border-default, 1px) solid currentColor",
            color: "inherit",
            cursor: "pointer",
            padding: "var(--sn-spacing-2xs, 0.25rem) var(--sn-spacing-xs, 0.5rem)",
            borderRadius: "var(--sn-radius-sm, 0.25rem)",
            fontSize: "var(--sn-font-size-sm, 0.875rem)",
          }}
        >
          {toast.undo.label} {undoCountdown !== null ? `(${undoCountdown})` : ""}
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          padding: "var(--sn-spacing-2xs, 0.25rem)",
          fontSize: "var(--sn-font-size-md, 1rem)",
          lineHeight: "var(--sn-leading-none, 1)",
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer(): ReactNode {
  const runtime = useManifestRuntime();
  const [queue, setQueue] = useAtom(toastQueueAtom);
  const position = runtime?.toast?.position ?? "bottom-right";

  if (queue.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        ...resolveToastContainerPositionStyle(position),
        zIndex: "var(--sn-z-index-toast, 9999)" as unknown as number,
        display: "flex",
        flexDirection: "column",
        gap: "var(--sn-spacing-sm, 0.5rem)",
        maxWidth: "24rem",
      }}
      data-snapshot-toasts=""
    >
      {queue.map((toast) => (
        <ToastCard
          key={toast.id}
          toast={toast}
          onDismiss={(id) => {
            setQueue((currentQueue) => currentQueue.filter((entry) => entry.id !== id));
          }}
        />
      ))}
    </div>
  );
}
