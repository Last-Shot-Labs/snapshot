'use client';

import { useResolveFrom } from "../../../context/hooks";
import { extractSurfaceConfig } from "../../_base/style-surfaces";
import {
  resolveOptionalPrimitiveValue,
  usePrimitiveValueOptions,
} from "../../primitives/resolve-value";
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
  const primitiveOptions = usePrimitiveValueOptions();
  const resolvedConfig = useResolveFrom({
    description: config.description,
    confirmLabel: config.confirmLabel,
    cancelLabel: config.cancelLabel,
  });
  const description =
    resolveOptionalPrimitiveValue(resolvedConfig.description, primitiveOptions) ?? "";
  const confirmLabel = resolveOptionalPrimitiveValue(
    resolvedConfig.confirmLabel,
    primitiveOptions,
  );
  const cancelLabel = resolveOptionalPrimitiveValue(
    resolvedConfig.cancelLabel,
    primitiveOptions,
  );
  const modalSurfaceConfig = extractSurfaceConfig(config);

  const modalConfig: ModalConfig = {
    type: "modal",
    id: config.id,
    ...modalSurfaceConfig,
    title: config.title,
    size: config.size ?? "sm",
    onOpen: config.onOpen,
    onClose: config.onClose,
    urlParam: config.urlParam,
    trapFocus: config.trapFocus ?? true,
    initialFocus: config.initialFocus,
    returnFocus: config.returnFocus ?? true,
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
          label: cancelLabel ?? "Cancel",
          variant: config.cancelVariant ?? "secondary",
          action: config.cancelAction,
          dismiss: config.dismissOnCancel ?? true,
        },
        {
          label: confirmLabel ?? "Confirm",
          variant: config.confirmVariant ?? "default",
          action: config.confirmAction,
          dismiss: config.dismissOnConfirm ?? true,
        },
      ],
    },
    slots: config.slots as ModalConfig["slots"],
  };

  return <ModalComponent config={modalConfig} />;
}
