"use client";

import { useEffect, useState } from "react";
import { useSubscribe } from "../../../context/index";
import { useActionExecutor } from "../../../actions/executor";
import { renderIcon } from "../../../icons/render";
import { ButtonControl } from "../../forms/button";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import type { NavLinkConfig } from "./types";

function SurfaceStyles({ css }: { css?: string }) {
  return css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

export function NavLink({ config }: { config: NavLinkConfig }) {
  const execute = useActionExecutor();

  const resolvedLabel = useSubscribe(
    typeof config.label === "object" && "from" in config.label
      ? config.label
      : undefined,
  );
  const label =
    typeof config.label === "string"
      ? config.label
      : typeof resolvedLabel === "string"
        ? resolvedLabel
        : "";

  const resolvedBadge = useSubscribe(
    typeof config.badge === "object" &&
      config.badge !== null &&
      "from" in config.badge
      ? config.badge
      : undefined,
  );
  const badge =
    typeof config.badge === "number"
      ? config.badge
      : typeof resolvedBadge === "number"
        ? resolvedBadge
        : null;

  const resolvedDisabled = useSubscribe(
    typeof config.disabled === "object" &&
      config.disabled !== null &&
      "from" in config.disabled
      ? config.disabled
      : undefined,
  );
  const isDisabled =
    typeof config.disabled === "boolean"
      ? config.disabled
      : typeof resolvedDisabled === "boolean"
        ? resolvedDisabled
        : false;

  const resolvedActive = useSubscribe(
    typeof config.active === "object" &&
      config.active !== null &&
      "from" in config.active
      ? config.active
      : undefined,
  );

  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setCurrentPath(window.location.pathname);
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const matchChildren = config.matchChildren !== false;
  const isActive =
    typeof config.active === "boolean"
      ? config.active
      : typeof resolvedActive === "boolean"
        ? resolvedActive
        : matchChildren
          ? currentPath === config.path || currentPath.startsWith(`${config.path}/`)
          : currentPath === config.path;

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

  const labelSurface = resolveSurfacePresentation({
    surfaceId: `${config.id ?? config.path}-label`,
    implementationBase: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    componentSurface: config.slots?.label,
  });
  const iconSurface = resolveSurfacePresentation({
    surfaceId: `${config.id ?? config.path}-icon`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
    },
    componentSurface: config.slots?.icon,
  });
  const badgeSurface = resolveSurfacePresentation({
    surfaceId: `${config.id ?? config.path}-badge`,
    implementationBase: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "1.25rem",
      height: "1.25rem",
      borderRadius: "var(--sn-radius-full, 9999px)",
      background: "var(--sn-color-primary)",
      color: "var(--sn-color-primary-foreground)",
    },
    componentSurface: config.slots?.badge,
  });

  return (
    <div data-snapshot-component="nav-link">
      <ButtonControl
        variant="ghost"
        disabled={isDisabled}
        onClick={() => {
          if (!isDisabled) {
            void execute({ type: "navigate", to: config.path } as Parameters<typeof execute>[0]);
          }
        }}
        surfaceId={config.id ?? config.path}
        surfaceConfig={config.slots?.root}
        activeStates={isActive ? ["current"] : []}
      >
        {config.icon ? (
          <span
            data-snapshot-id={`${config.id ?? config.path}-icon`}
            className={iconSurface.className}
            style={iconSurface.style}
          >
            {renderIcon(config.icon, 16)}
          </span>
        ) : null}
        <span
          data-snapshot-id={`${config.id ?? config.path}-label`}
          className={labelSurface.className}
          style={labelSurface.style}
        >
          {label}
        </span>
        {badge !== null && badge > 0 ? (
          <span
            data-snapshot-id={`${config.id ?? config.path}-badge`}
            className={badgeSurface.className}
            style={badgeSurface.style}
          >
            {badge}
          </span>
        ) : null}
      </ButtonControl>
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={iconSurface.scopedCss} />
      <SurfaceStyles css={badgeSurface.scopedCss} />
    </div>
  );
}
