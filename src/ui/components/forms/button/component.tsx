'use client';

import type { CSSProperties } from "react";
import { useActionExecutor } from "../../../actions/executor";
import { useSubscribe } from "../../../context/hooks";
import { renderIcon } from "../../../icons/render";
import { BUTTON_INTERACTIVE_CSS, getButtonStyle } from "../../_base/button-styles";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import type { ButtonConfig, ButtonControlProps } from "./types";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

export function ButtonControl({
  children,
  type = "button",
  variant = "default",
  size = "md",
  disabled,
  fullWidth,
  onClick,
  className,
  style,
  surfaceId,
  surfaceConfig,
  itemSurfaceConfig,
  testId,
  ariaCurrent,
  ariaExpanded,
  ariaHasPopup,
  activeStates,
}: ButtonControlProps) {
  const resolvedStates = new Set([
    ...(activeStates ?? []),
    ...(disabled ? (["disabled"] as const) : []),
  ]);
  const rootSurface = resolveSurfacePresentation({
    surfaceId,
    implementationBase: {
      ...getButtonStyle(variant, size, disabled),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: fullWidth ? "100%" : "auto",
      minHeight: size === "lg" ? "3.25rem" : "2.875rem",
      appearance: "none",
      textAlign: "center",
    },
    componentSurface: surfaceConfig,
    itemSurface: itemSurfaceConfig,
    activeStates: Array.from(resolvedStates),
  });

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        data-sn-button=""
        data-variant={variant}
        data-snapshot-id={surfaceId}
        data-testid={testId}
        data-open={resolvedStates.has("open") ? "true" : undefined}
        data-selected={resolvedStates.has("selected") ? "true" : undefined}
        data-current={resolvedStates.has("current") ? "true" : undefined}
        data-active={resolvedStates.has("active") ? "true" : undefined}
        data-disabled={resolvedStates.has("disabled") ? "true" : undefined}
        aria-current={ariaCurrent}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHasPopup}
        aria-disabled={disabled || undefined}
        className={[className, rootSurface.className].filter(Boolean).join(" ") || undefined}
        style={{
          ...(rootSurface.style ?? {}),
          ...(style ?? {}),
        }}
      >
        {children}
      </button>
      <SurfaceStyles css={rootSurface.scopedCss} />
    </>
  );
}

export function Button({ config }: { config: ButtonConfig }) {
  const execute = useActionExecutor();
  const visible = useSubscribe(config.visible ?? true);
  const disabled = useSubscribe(config.disabled ?? false) as boolean;
  const resolvedLabel = useSubscribe(
    typeof config.label === "object" && config.label !== null && "from" in config.label
      ? config.label
      : undefined,
  );

  if (visible === false) {
    return null;
  }

  const variant = config.variant ?? "default";
  const size = config.size ?? "md";
  const fullWidth = config.fullWidth;
  const action = config.action;
  const rootId = config.id ?? "button-root";
  const label =
    typeof config.label === "string"
      ? config.label
      : typeof resolvedLabel === "string"
        ? resolvedLabel
        : "";

  const labelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-label`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    componentSurface: config.slots?.label,
  });
  const iconSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-icon`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    componentSurface: config.slots?.icon ?? config.slots?.leadingIcon,
  });

  return (
    <div data-snapshot-component="button">
      <ButtonControl
        type="button"
        variant={variant}
        size={size}
        disabled={disabled}
        fullWidth={fullWidth}
        onClick={() => {
          if (disabled || !action) {
            return;
          }
          void execute(action as Parameters<typeof execute>[0]);
        }}
        surfaceId={rootId}
        surfaceConfig={config.slots?.root}
      >
        {config.icon ? (
          <span
            data-snapshot-id={`${rootId}-icon`}
            className={iconSurface.className}
            style={iconSurface.style}
          >
            {renderIcon(config.icon, 16)}
          </span>
        ) : null}
        <span
          data-snapshot-id={`${rootId}-label`}
          className={labelSurface.className}
          style={labelSurface.style}
        >
          {label}
        </span>
      </ButtonControl>
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={iconSurface.scopedCss} />
      <style>{BUTTON_INTERACTIVE_CSS}</style>
    </div>
  );
}
