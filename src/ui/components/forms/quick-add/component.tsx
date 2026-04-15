'use client';

import type { CSSProperties, KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { usePublish, useSubscribe } from "../../../context/hooks";
import { Icon } from "../../../icons/index";
import { SurfaceStyles } from "../../_base/surface-styles";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import type { QuickAddConfig } from "./types";

export function QuickAdd({ config }: { config: QuickAddConfig }) {
  const visible = useSubscribe(config.visible ?? true);
  const execute = useActionExecutor();
  const publish = usePublish(config.id);
  const rootId = config.id ?? "quick-add";

  const [value, setValue] = useState("");

  const placeholder = config.placeholder ?? "Add new item...";
  const icon = config.icon ?? "plus";
  const submitOnEnter = config.submitOnEnter ?? true;
  const showButton = config.showButton ?? true;
  const buttonText = config.buttonText ?? "Add";
  const clearOnSubmit = config.clearOnSubmit ?? true;
  const canSubmit = value.trim().length > 0;

  useEffect(() => {
    if (publish) {
      publish({ value });
    }
  }, [publish, value]);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    if (config.submitAction) {
      void execute(config.submitAction);
    }

    if (clearOnSubmit) {
      setValue("");
    }
  }, [clearOnSubmit, config.submitAction, execute, value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (submitOnEnter && event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit, submitOnEnter],
  );

  if (visible === false) {
    return null;
  }

  const rootSurface = resolveSurfacePresentation({
    surfaceId: rootId,
    implementationBase: {
      display: "flex",
      alignItems: "center",
      gap: "sm",
      paddingY: "sm",
      paddingX: "md",
      border: "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
      borderRadius: "lg",
      bg: "var(--sn-color-card, #ffffff)",
    },
    componentSurface: config,
    itemSurface: config.slots?.root,
  });
  const iconSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-icon`,
    implementationBase: {
      color: "var(--sn-color-muted-foreground, #6b7280)",
      style: {
        display: "flex",
        flexShrink: 0,
      },
    },
    componentSurface: config.slots?.icon,
  });
  const inputSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-input`,
    implementationBase: {
      flex: "1",
      fontSize: "sm",
      color: "var(--sn-color-foreground, #111827)",
      focus: {
        ring: "var(--sn-ring-color, var(--sn-color-primary, #2563eb))",
      },
      style: {
        border: "none",
        outline: "none",
        background: "transparent",
        fontFamily: "var(--sn-font-sans, sans-serif)",
        lineHeight: "var(--sn-leading-normal, 1.5)",
        padding: 0,
      },
    },
    componentSurface: config.slots?.input,
  });
  const buttonSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-button`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      gap: "xs",
      paddingY: "xs",
      paddingX: "md",
      fontSize: "sm",
      fontWeight: "medium",
      color: "var(--sn-color-primary-foreground, #ffffff)",
      bg: "var(--sn-color-primary, #2563eb)",
      borderRadius: "md",
      cursor: canSubmit ? "pointer" : "not-allowed",
      opacity: canSubmit ? 1 : 0.5,
      transition: "opacity",
      hover: canSubmit
        ? {
            opacity: 0.9,
          }
        : undefined,
      focus: {
        ring: "var(--sn-ring-color, var(--sn-color-primary, #2563eb))",
      },
      style: {
        border: "none",
        whiteSpace: "nowrap",
      },
    },
    componentSurface: config.slots?.button,
  });

  return (
    <>
      <div
        data-snapshot-component="quick-add"
        data-snapshot-id={rootId}
        data-testid="quick-add"
        className={[config.className, rootSurface.className].filter(Boolean).join(" ") || undefined}
        style={{
          ...(rootSurface.style ?? {}),
          ...((config.style as CSSProperties | undefined) ?? {}),
        }}
      >
        <span
          aria-hidden="true"
          data-snapshot-id={`${rootId}-icon`}
          className={iconSurface.className}
          style={iconSurface.style}
        >
          <Icon name={icon} size={18} />
        </span>

        <input
          data-testid="quick-add-input"
          data-snapshot-id={`${rootId}-input`}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputSurface.className}
          style={inputSurface.style}
        />

        {showButton ? (
          <button
            type="button"
            data-testid="quick-add-button"
            data-snapshot-id={`${rootId}-button`}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={buttonSurface.className}
            style={buttonSurface.style}
          >
            {buttonText}
          </button>
        ) : null}
      </div>
      <SurfaceStyles css={rootSurface.scopedCss} />
      <SurfaceStyles css={iconSurface.scopedCss} />
      <SurfaceStyles css={inputSurface.scopedCss} />
      <SurfaceStyles css={buttonSurface.scopedCss} />
    </>
  );
}
