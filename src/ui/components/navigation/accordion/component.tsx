'use client';

import React, { useState, useCallback } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";
import { renderIcon } from "../../../icons/render";
import { ButtonControl } from "../../forms/button";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import type { AccordionConfig } from "./types";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

/**
 * Resolves the initial set of open indices from the config.
 */
function resolveDefaultOpen(
  defaultOpen: number | number[] | undefined,
): Set<number> {
  if (defaultOpen === undefined) return new Set();
  if (typeof defaultOpen === "number") return new Set([defaultOpen]);
  return new Set(defaultOpen);
}

/**
 * Chevron indicator component for accordion headers.
 */
function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        transition: `transform var(--sn-duration-normal, 250ms) var(--sn-ease-out, ease-out)`,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        fontSize: "var(--sn-font-size-sm, 0.875rem)",
        color: "var(--sn-color-muted-foreground, #6b7280)",
        flexShrink: 0,
      }}
    >
      ▼
    </span>
  );
}

/**
 * Accordion component — renders expandable/collapsible content sections.
 *
 * Supports single-open and multi-open modes, three visual variants
 * (default, bordered, separated), and renders child content via
 * ComponentRenderer for recursive manifest composition.
 *
 * @param props.config - The accordion config from the manifest
 */
export function AccordionComponent({ config }: { config: AccordionConfig }) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() =>
    resolveDefaultOpen(config.defaultOpen),
  );

  const mode = config.mode ?? "single";
  const variant = config.variant ?? "default";
  const iconPosition = config.iconPosition ?? "right";

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (mode === "single") {
            next.clear();
          }
          next.add(index);
        }
        return next;
      });
    },
    [mode],
  );

  const containerStyle: React.CSSProperties =
    variant === "bordered"
      ? {
          border:
            "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
          borderRadius: "var(--sn-radius-md, 0.5rem)",
          overflow: "hidden",
        }
      : variant === "separated"
        ? {
            display: "flex",
            flexDirection: "column",
            gap: "var(--sn-spacing-sm, 0.5rem)",
          }
        : {};
  const rootId = config.id ?? "accordion";
  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    implementationBase: containerStyle as Record<string, unknown>,
    componentSurface: config,
    itemSurface: config.slots?.root,
  });

  return (
    <div
      data-snapshot-component="accordion"
      data-testid="accordion"
      data-snapshot-id={`${rootId}-root`}
      className={rootSurface.className}
      style={rootSurface.style}
    >
      <style>{`
        [data-snapshot-component="accordion"] button:not([disabled]):hover {
          background: var(--sn-color-secondary, #f3f4f6);
        }
        [data-snapshot-component="accordion"] button:focus {
          outline: none;
        }
        [data-snapshot-component="accordion"] button:focus-visible {
          outline: 2px solid var(--sn-ring-color, var(--sn-color-primary, #2563eb));
          outline-offset: var(--sn-ring-offset, 2px);
        }
      `}</style>
      {config.items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const isDisabled = item.disabled === true;

        const itemStyle: React.CSSProperties =
          variant === "separated"
            ? {
                border:
                  "var(--sn-border-thin, 1px) solid var(--sn-color-border, #e5e7eb)",
                borderRadius: "var(--sn-radius-md, 0.5rem)",
                boxShadow: "var(--sn-shadow-sm, 0 1px 2px rgba(0,0,0,0.05))",
                backgroundColor: "var(--sn-color-card, #ffffff)",
                overflow: "hidden",
              }
            : {};
        const itemSurface = resolveSurfacePresentation({
          surfaceId: `${rootId}-item-${index}`,
          implementationBase: itemStyle as Record<string, unknown>,
          componentSurface: config.slots?.item,
          itemSurface: item.slots?.item,
          activeStates: [
            ...(isOpen ? ["open"] : []),
            ...(isDisabled ? ["disabled"] : []),
          ] as Array<"open" | "disabled">,
        });
        const triggerLabelSurface = resolveSurfacePresentation({
          surfaceId: `${rootId}-trigger-label-${index}`,
          componentSurface: config.slots?.triggerLabel,
          itemSurface: item.slots?.triggerLabel,
        });
        const triggerIconSurface = resolveSurfacePresentation({
          surfaceId: `${rootId}-trigger-icon-${index}`,
          componentSurface: config.slots?.triggerIcon,
          itemSurface: item.slots?.triggerIcon,
        });
        const contentSurface = resolveSurfacePresentation({
          surfaceId: `${rootId}-content-${index}`,
          componentSurface: config.slots?.content,
          itemSurface: item.slots?.content,
          activeStates: isOpen ? ["open"] : [],
        });

        const showDivider =
          variant !== "separated" && index < config.items.length - 1;

        return (
          <div
            key={index}
            data-testid={`accordion-item-${index}`}
            data-snapshot-id={`${rootId}-item-${index}`}
            className={itemSurface.className}
            style={itemSurface.style}
          >
            {/* Header */}
            <ButtonControl
              type="button"
              data-testid={`accordion-header-${index}`}
              onClick={() => !isDisabled && toggle(index)}
              disabled={isDisabled}
              ariaExpanded={isOpen}
              surfaceId={`${rootId}-trigger-${index}`}
              surfaceConfig={item.slots?.trigger ?? config.slots?.trigger}
              activeStates={[
                ...(isOpen ? ["open"] : []),
                ...(isDisabled ? ["disabled"] : []),
              ] as Array<"open" | "disabled">}
            >
              <span
                data-snapshot-id={`${rootId}-trigger-label-${index}`}
                className={triggerLabelSurface.className}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--sn-spacing-xs, 0.25rem)",
                  flex: 1,
                  ...(triggerLabelSurface.style as React.CSSProperties),
                }}
              >
                {item.icon && (
                  <span
                    aria-hidden="true"
                    data-snapshot-id={`${rootId}-trigger-icon-${index}`}
                    className={triggerIconSurface.className}
                    style={triggerIconSurface.style}
                  >
                    {renderIcon(item.icon, 16)}
                  </span>
                )}
                {item.title}
              </span>
              <Chevron open={isOpen} />
            </ButtonControl>

            {/* Content panel — uses CSS grid row trick for smooth height animation */}
            <div
              data-testid={`accordion-panel-${index}`}
              data-accordion-content=""
              role="region"
              data-snapshot-id={`${rootId}-content-${index}`}
              className={contentSurface.className}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: `grid-template-rows var(--sn-duration-normal, 250ms) var(--sn-ease-out, ease-out)`,
                ...(contentSurface.style as React.CSSProperties),
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: `0 var(--sn-spacing-md, 1rem) var(--sn-spacing-md, 1rem)`,
                    opacity: isOpen ? 1 : 0,
                    transition: `opacity var(--sn-duration-fast, 150ms) var(--sn-ease-out, ease-out)`,
                  }}
                >
                  {item.content.map((child, childIndex) => (
                    <ComponentRenderer
                      key={
                        (child as ComponentConfig).id ??
                        `accordion-${index}-child-${childIndex}`
                      }
                      config={child as ComponentConfig}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Divider for default/bordered variants */}
            {showDivider && (
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--sn-color-border, #e5e7eb)",
                }}
              />
            )}
            <SurfaceStyles css={itemSurface.scopedCss} />
            <SurfaceStyles css={triggerLabelSurface.scopedCss} />
            <SurfaceStyles css={triggerIconSurface.scopedCss} />
            <SurfaceStyles css={contentSurface.scopedCss} />
          </div>
        );
      })}
      <SurfaceStyles css={rootSurface.scopedCss} />
    </div>
  );
}
