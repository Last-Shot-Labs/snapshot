"use client";

import type { CSSProperties } from "react";
import { useManifestRuntime } from "../../../manifest/runtime";
import { useActionExecutor } from "../../../actions/executor";
import type { NavLogoConfig } from "./types";

export function NavLogo({ config }: { config: NavLogoConfig }) {
  const manifest = useManifestRuntime();
  const execute = useActionExecutor();

  const text = config.text ?? manifest?.app?.title;
  const src = config.src;
  const path = config.path ?? manifest?.app?.home ?? "/";
  const logoHeight = config.logoHeight ?? "var(--sn-spacing-lg, 1.5rem)";

  const handleClick = () => {
    if (path) {
      void execute({ type: "navigate", to: path } as Parameters<
        typeof execute
      >[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && path) {
      e.preventDefault();
      handleClick();
    }
  };

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--sn-spacing-sm, 0.5rem)",
    cursor: path ? "pointer" : undefined,
    textDecoration: "none",
    flexShrink: 0,
  };

  return (
    <div
      data-nav-logo=""
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={path ? "link" : undefined}
      tabIndex={path ? 0 : undefined}
    >
      {src && (
        <img
          src={src}
          alt={text ?? "Logo"}
          style={{ height: logoHeight, width: "auto" }}
        />
      )}
      {text && (
        <span
          style={{
            fontSize: "var(--sn-font-size-lg, 1.125rem)",
            fontWeight:
              "var(--sn-font-weight-semibold, 600)" as CSSProperties["fontWeight"],
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
