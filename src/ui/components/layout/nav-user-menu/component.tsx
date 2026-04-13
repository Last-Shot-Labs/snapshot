"use client";

import { useRef, useState } from "react";
import { useSubscribe } from "../../../context/index";
import { ButtonControl } from "../../forms/button";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import { FloatingPanel, MenuItem } from "../../primitives/floating-menu";
import { useActionExecutor } from "../../../actions/executor";
import type { NavUserMenuConfig } from "./types";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

export function NavUserMenu({ config }: { config: NavUserMenuConfig }) {
  const rawUser = useSubscribe({ from: "global.user" });
  const user = rawUser as {
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
    roles?: string[];
  } | null;
  const execute = useActionExecutor();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return null;
  }

  const showAvatar = config.showAvatar !== false;
  const showName = config.showName !== false;
  const showEmail = config.showEmail ?? false;
  const mode = config.mode ?? "compact";

  const userRoles = [...(user.role ? [user.role] : []), ...(user.roles ?? [])];
  const menuItems = (config.items ?? []).filter((item) =>
    item.roles?.length ? item.roles.some((role) => userRoles.includes(role)) : true,
  );

  const rootId = config.id ?? "nav-user-menu";
  const avatarSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-avatar`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      borderRadius: "var(--sn-radius-full, 9999px)",
      overflow: "hidden",
      flexShrink: 0,
      background: "var(--sn-color-muted)",
      color: "var(--sn-color-muted-foreground)",
    },
    componentSurface: config.slots?.avatar,
  });

  return (
    <div ref={containerRef} data-snapshot-component="nav-user-menu">
      <ButtonControl
        variant="ghost"
        onClick={() => setIsOpen((value) => !value)}
        surfaceId={`${rootId}-trigger`}
        surfaceConfig={config.slots?.trigger}
        activeStates={isOpen ? ["open"] : []}
      >
        {showAvatar ? (
          <span
            data-snapshot-id={`${rootId}-avatar`}
            className={avatarSurface.className}
            style={avatarSurface.style}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ?? "User"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              (user.name?.charAt(0)?.toUpperCase() ?? "U")
            )}
          </span>
        ) : null}
        {mode === "full" && showName && user.name ? <span>{user.name}</span> : null}
      </ButtonControl>

      <FloatingPanel
        open={isOpen}
        onClose={() => setIsOpen(false)}
        containerRef={containerRef}
        align="end"
        surfaceId={`${rootId}-panel`}
        slot={config.slots?.panel}
      >
        {showEmail && user.email ? (
          <div style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem" }}>
            {user.email}
          </div>
        ) : null}
        {menuItems.map((item, index) => (
          <MenuItem
            key={`${rootId}-item-${index}`}
            label={item.label}
            icon={item.icon}
            onClick={() => {
              setIsOpen(false);
              void execute(item.action as Parameters<typeof execute>[0]);
            }}
            surfaceId={`${rootId}-item-${index}`}
            slot={config.slots?.item ?? item.slots?.item}
            labelSlot={config.slots?.itemLabel ?? item.slots?.itemLabel}
            iconSlot={config.slots?.itemIcon ?? item.slots?.itemIcon}
          />
        ))}
      </FloatingPanel>
      <SurfaceStyles css={avatarSurface.scopedCss} />
    </div>
  );
}
