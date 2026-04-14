'use client';

import { useSubscribe } from "../../../context/hooks";
import { ModalComponent } from "../modal";
import type { ModalConfig } from "../modal";
import type { ConfirmDialogConfig } from "./types";

/**
 * Confirmation dialog alias built on top of the modal overlay runtime.
 */
export function ConfirmDialogComponent({
  config,
}: {
  config: ConfirmDialogConfig;
}) {
  const description = useSubscribe(config.description ?? "") as string;

  const modalConfig: ModalConfig = {
    type: "modal",
    id: config.id,
    title: config.title,
    size: config.size ?? "sm",
    onOpen: config.onOpen,
    onClose: config.onClose,
    urlParam: config.urlParam,
    trapFocus: config.trapFocus ?? true,
    initialFocus: config.initialFocus,
    returnFocus: config.returnFocus ?? true,
    className: config.className,
    style: config.style,
    content: description
      ? [
          {
            type: "text",
            value: description,
            variant: "muted",
          },
        ]
      : [],
    footer: {
      align: "right",
      actions: [
        {
          label: config.cancelLabel ?? "Cancel",
          variant: config.cancelVariant ?? "secondary",
          action: config.cancelAction,
          dismiss: config.dismissOnCancel ?? true,
        },
        {
          label: config.confirmLabel ?? "Confirm",
          variant: config.confirmVariant ?? "default",
          action: config.confirmAction,
          dismiss: config.dismissOnConfirm ?? true,
        },
      ],
    },
  };

  return <ModalComponent config={modalConfig} />;
}
