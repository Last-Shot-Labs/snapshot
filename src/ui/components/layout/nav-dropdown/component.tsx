"use client";

import { useRef, useState } from "react";
import { useSubscribe } from "../../../context/index";
import { renderIcon } from "../../../icons/render";
import { ComponentRenderer } from "../../../manifest/renderer";
import { SurfaceStyles } from "../../_base/surface-styles";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import { ButtonControl } from "../../forms/button";
import { FloatingMenuStyles, FloatingPanel } from "../../primitives/floating-menu";
import { NavLink } from "../nav-link";
import type { NavLinkConfig } from "../nav-link/types";
import type { NavDropdownConfig } from "./types";

function isNavLinkConfig(config: unknown): config is NavLinkConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "type" in config &&
    (config as { type?: string }).type === "nav-link"
  );
}

export function NavDropdown({
  config,
  onNavigate,
}: {
  config: NavDropdownConfig;
  onNavigate?: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerMode = config.trigger ?? "click";

  const rawUser = useSubscribe({ from: "global.user" });
  const user = rawUser as { role?: string; roles?: string[] } | null;
  if (config.authenticated === true && !user) {
    return null;
  }
  if (config.authenticated === false && user) {
    return null;
  }
  if (config.roles?.length) {
    const userRoles = [...(user?.role ? [user.role] : []), ...(user?.roles ?? [])];
    if (!config.roles.some((role) => userRoles.includes(role))) {
      return null;
    }
  }

  const rootId = config.id ?? "nav-dropdown";
  const rootSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-root`,
    implementationBase: {
      position: "relative",
      display: "inline-flex",
    },
    componentSurface: config,
    itemSurface: config.slots?.root,
  });
  const labelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-trigger-label`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      whiteSpace: "nowrap",
    },
    componentSurface: config.slots?.triggerLabel,
  });
  const iconSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-trigger-icon`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
    },
    componentSurface: config.slots?.triggerIcon,
  });

  return (
    <div
      ref={containerRef}
      data-snapshot-component="nav-dropdown"
      data-snapshot-id={`${rootId}-root`}
      className={rootSurface.className}
      style={rootSurface.style}
      onPointerEnter={triggerMode === "hover" ? () => setIsOpen(true) : undefined}
      onPointerLeave={triggerMode === "hover" ? () => setIsOpen(false) : undefined}
    >
      <FloatingMenuStyles />
      <ButtonControl
        variant="ghost"
        disabled={config.disabled}
        onClick={() => setIsOpen((value) => !value)}
        surfaceId={`${rootId}-trigger`}
        surfaceConfig={config.slots?.trigger}
        activeStates={[
          ...(isOpen ? (["open"] as const) : []),
          ...(config.current ? (["current"] as const) : []),
        ]}
      >
        {config.icon ? (
          <span
            data-snapshot-id={`${rootId}-trigger-icon`}
            className={iconSurface.className}
            style={iconSurface.style}
          >
            {renderIcon(config.icon, 16)}
          </span>
        ) : null}
        <span
          data-snapshot-id={`${rootId}-trigger-label`}
          className={labelSurface.className}
          style={labelSurface.style}
        >
          {config.label}
        </span>
      </ButtonControl>

      <FloatingPanel
        open={isOpen}
        onClose={() => setIsOpen(false)}
        containerRef={containerRef}
        align={config.align ?? "start"}
        surfaceId={`${rootId}-panel`}
        slot={config.slots?.panel}
        activeStates={isOpen ? ["open"] : []}
        minWidth={config.width}
      >
        {config.items.map((item, index) => {
          const itemSurface = resolveSurfacePresentation({
            surfaceId: `${rootId}-item-${index}`,
            implementationBase: {
              display: "block",
              width: "100%",
              minWidth: 0,
            },
            componentSurface: config.slots?.item,
          });

          return (
            <div
              key={(item as { id?: string }).id ?? index}
              role="none"
              data-snapshot-id={`${rootId}-item-${index}`}
              className={itemSurface.className}
              style={itemSurface.style}
            >
              {isNavLinkConfig(item) ? (
                <NavLink config={item} onNavigate={onNavigate} />
              ) : (
                <ComponentRenderer config={item} />
              )}
              <SurfaceStyles css={itemSurface.scopedCss} />
            </div>
          );
        })}
      </FloatingPanel>
      <SurfaceStyles css={rootSurface.scopedCss} />
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={iconSurface.scopedCss} />
    </div>
  );
}
