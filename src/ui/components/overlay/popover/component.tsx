'use client';

import React, { useEffect, useRef, useState } from "react";
import { useSubscribe, usePublish } from "../../../context/hooks";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { ComponentConfig } from "../../../manifest/types";
import { renderIcon } from "../../../icons/render";
import { ButtonControl } from "../../forms/button";
import { FloatingPanel } from "../../primitives/floating-menu";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import type { PopoverConfig } from "./types";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

export function Popover({ config }: { config: PopoverConfig }) {
  const triggerText = useSubscribe(config.trigger) as string;
  const visible = useSubscribe(config.visible ?? true);
  const publish = usePublish(config.id);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootId = config.id ?? "popover";

  useEffect(() => {
    publish?.({ isOpen });
  }, [isOpen, publish]);

  const triggerLabelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-trigger-label`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
    },
    componentSurface: config.slots?.triggerLabel,
  });
  const triggerIconSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-trigger-icon`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
    },
    componentSurface: config.slots?.triggerIcon,
  });
  const contentSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-content`,
    implementationBase: {
      display: "grid",
      gap: "0.75rem",
    },
    componentSurface: config.slots?.content,
  });
  const titleSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-title`,
    implementationBase: {
      fontWeight: 600,
    },
    componentSurface: config.slots?.title,
  });
  const descriptionSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-description`,
    implementationBase: {
      color: "var(--sn-color-muted-foreground)",
    },
    componentSurface: config.slots?.description,
  });
  const footerSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-footer`,
    implementationBase: {
      display: "grid",
      gap: "0.5rem",
    },
    componentSurface: config.slots?.footer,
  });

  if (visible === false) {
    return null;
  }

  return (
    <div data-snapshot-component="popover" ref={containerRef}>
      <ButtonControl
        variant={config.triggerVariant ?? "outline"}
        onClick={() => setIsOpen((value) => !value)}
        surfaceId={`${rootId}-trigger`}
        surfaceConfig={config.slots?.trigger}
        activeStates={isOpen ? ["open"] : []}
      >
        {config.triggerIcon ? (
          <span
            data-snapshot-id={`${rootId}-trigger-icon`}
            className={triggerIconSurface.className}
            style={triggerIconSurface.style}
          >
            {renderIcon(config.triggerIcon, 16)}
          </span>
        ) : null}
        <span
          data-snapshot-id={`${rootId}-trigger-label`}
          className={triggerLabelSurface.className}
          style={triggerLabelSurface.style}
        >
          {triggerText}
        </span>
      </ButtonControl>

      <FloatingPanel
        open={isOpen}
        onClose={() => setIsOpen(false)}
        containerRef={containerRef}
        side={config.placement ?? "bottom"}
        surfaceId={`${rootId}-panel`}
        slot={config.slots?.panel}
        activeStates={isOpen ? ["open"] : []}
        style={config.width ? ({ width: config.width } as React.CSSProperties) : undefined}
      >
        <div
          data-snapshot-id={`${rootId}-content`}
          className={contentSurface.className}
          style={contentSurface.style}
        >
          {config.title ? (
            <div
              data-snapshot-id={`${rootId}-title`}
              className={titleSurface.className}
              style={titleSurface.style}
            >
              {config.title}
            </div>
          ) : null}
          {config.description ? (
            <div
              data-snapshot-id={`${rootId}-description`}
              className={descriptionSurface.className}
              style={descriptionSurface.style}
            >
              {config.description}
            </div>
          ) : null}
          {config.content?.map((child, index) => (
            <ComponentRenderer
              key={(child as ComponentConfig).id ?? `popover-child-${index}`}
              config={child as ComponentConfig}
            />
          ))}
          {config.footer?.length ? (
            <div
              data-snapshot-id={`${rootId}-footer`}
              className={footerSurface.className}
              style={footerSurface.style}
            >
              {config.footer.map((child, index) => (
                <ComponentRenderer
                  key={(child as ComponentConfig).id ?? `popover-footer-${index}`}
                  config={child as ComponentConfig}
                />
              ))}
            </div>
          ) : null}
        </div>
      </FloatingPanel>
      <SurfaceStyles css={triggerLabelSurface.scopedCss} />
      <SurfaceStyles css={triggerIconSurface.scopedCss} />
      <SurfaceStyles css={contentSurface.scopedCss} />
      <SurfaceStyles css={titleSurface.scopedCss} />
      <SurfaceStyles css={descriptionSurface.scopedCss} />
      <SurfaceStyles css={footerSurface.scopedCss} />
    </div>
  );
}
