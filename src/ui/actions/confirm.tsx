import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

/** Internal confirm-dialog request stored in the atom-backed manager queue. */
export interface ConfirmRequest {
  title?: string;
  message?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  requireInput?: string;
  resolve: (confirmed: boolean) => void;
}

/** Options accepted when opening a confirmation dialog. */
export type ConfirmOptions = Omit<ConfirmRequest, "resolve">;

export const confirmAtom = atom<ConfirmRequest | null>(null);

/** Imperative API for opening a confirmation dialog from manifest actions or custom UI. */
export interface ConfirmManager {
  show: (options: ConfirmOptions) => Promise<boolean>;
}

/** Return the shared confirmation manager for the current Snapshot UI tree. */
export function useConfirmManager(): ConfirmManager {
  const [, setConfirm] = useAtom(confirmAtom);

  const show = useCallback(
    (options: ConfirmOptions): Promise<boolean> =>
      new Promise<boolean>((resolve) => {
        setConfirm({ ...options, resolve });
      }),
    [setConfirm],
  );

  return { show };
}

/** Render the global confirmation dialog for requests queued through `useConfirmManager`. */
export function ConfirmDialog(): ReactNode {
  const [request, setRequest] = useAtom(confirmAtom);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [request]);

  if (!request) {
    return null;
  }

  const title = request.title ?? "Confirmation";
  const description = request.description ?? request.message;
  const isDestructive = request.variant === "destructive";
  const requiresInput = typeof request.requireInput === "string";
  const isInputValid = !requiresInput || inputValue === request.requireInput;

  const handleConfirm = () => {
    if (!isInputValid) {
      return;
    }
    request.resolve(true);
    setRequest(null);
  };

  const handleCancel = () => {
    request.resolve(false);
    setRequest(null);
  };

  return (
    <div
      data-snapshot-confirm=""
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--sn-z-index-modal, 10000)" as unknown as number,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--sn-spacing-lg, 1.5rem)",
        background:
          "color-mix(in oklch, var(--sn-color-foreground, #111) 30%, transparent)",
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="snapshot-confirm-title"
        aria-describedby="snapshot-confirm-description"
        style={{
          width: "min(100%, var(--sn-container-sm, 28rem))",
          display: "grid",
          gap: "var(--sn-spacing-md, 1rem)",
          background: "var(--sn-color-card, #fff)",
          color: "var(--sn-color-foreground, #111)",
          border:
            "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
          borderRadius: "var(--sn-radius-lg, 0.75rem)",
          boxShadow: "var(--sn-shadow-xl, 0 25px 50px -12px rgba(0,0,0,0.25))",
          padding: "var(--sn-spacing-lg, 1.5rem)",
        }}
      >
        <div style={{ display: "grid", gap: "var(--sn-spacing-xs, 0.25rem)" }}>
          <h2
            id="snapshot-confirm-title"
            style={{
              fontSize: "var(--sn-font-size-lg, 1.125rem)",
              fontWeight:
                "var(--sn-font-weight-semibold, 600)" as unknown as number,
            }}
          >
            {title}
          </h2>
          {description ? (
            <p
              id="snapshot-confirm-description"
              style={{
                fontSize: "var(--sn-font-size-sm, 0.875rem)",
                color: "var(--sn-color-muted-foreground, #6b7280)",
              }}
            >
              {description}
            </p>
          ) : null}
        </div>

        {requiresInput ? (
          <div
            style={{ display: "grid", gap: "var(--sn-spacing-xs, 0.25rem)" }}
          >
            <label
              htmlFor="snapshot-confirm-input"
              style={{
                fontSize: "var(--sn-font-size-sm, 0.875rem)",
                fontWeight:
                  "var(--sn-font-weight-medium, 500)" as unknown as number,
              }}
            >
              Type {request.requireInput} to confirm
            </label>
            <input
              id="snapshot-confirm-input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              style={{
                width: "100%",
                minHeight: "var(--sn-input-height, 2.5rem)",
                padding:
                  "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
                border:
                  "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
                borderRadius: "var(--sn-radius-md, 0.5rem)",
                background: "var(--sn-color-background, #ffffff)",
                color: "var(--sn-color-foreground, #111827)",
              }}
            />
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "var(--sn-spacing-sm, 0.5rem)",
          }}
        >
          <button
            onClick={handleCancel}
            type="button"
            style={{
              padding:
                "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
              borderRadius: "var(--sn-radius-md, 0.375rem)",
              border:
                "var(--sn-border-thin, 1px) solid var(--sn-color-border, #d1d5db)",
              background: "transparent",
              color: "var(--sn-color-foreground, #111)",
              cursor: "pointer",
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              fontFamily: "inherit",
            }}
          >
            {request.cancelLabel ?? "Cancel"}
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            disabled={!isInputValid}
            style={{
              padding:
                "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
              borderRadius: "var(--sn-radius-md, 0.375rem)",
              border: "none",
              background: isDestructive
                ? "var(--sn-color-destructive, #ef4444)"
                : "var(--sn-color-primary, #2563eb)",
              color: isDestructive
                ? "var(--sn-color-destructive-foreground, #fff)"
                : "var(--sn-color-primary-foreground, #fff)",
              cursor: isInputValid ? "pointer" : "not-allowed",
              fontSize: "var(--sn-font-size-sm, 0.875rem)",
              fontFamily: "inherit",
              opacity: isInputValid ? 1 : "var(--sn-opacity-disabled, 0.5)",
            }}
          >
            {request.confirmLabel ?? "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
