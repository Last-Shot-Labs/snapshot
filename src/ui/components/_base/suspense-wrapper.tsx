'use client';

import { Suspense, type ReactNode } from "react";
import { ComponentRenderer } from "../../manifest/renderer";
import { AutoSkeleton } from "./auto-skeleton";

export interface SuspenseWrapperConfig {
  type: "skeleton" | "spinner" | "custom";
  variant?: "card" | "list" | "text" | "table";
  count?: number;
  component?: Record<string, unknown>;
}

function SpinnerFallback(): ReactNode {
  return (
    <div
      data-snapshot-suspense-fallback=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "var(--sn-spacing-xl, 2rem)",
      }}
    >
      <div
        style={{
          width: "2rem",
          height: "2rem",
          border: "2px solid var(--sn-color-muted, #e5e7eb)",
          borderTopColor: "var(--sn-color-primary, #2563eb)",
          borderRadius: "9999px",
          animation:
            "snapshot-spinner var(--sn-duration-slow, 900ms) linear infinite",
        }}
      />
    </div>
  );
}

export function SuspenseWrapper({
  config,
  children,
}: {
  config?: SuspenseWrapperConfig;
  children: ReactNode;
}): ReactNode {
  if (!config) {
    return children;
  }

  let fallback: ReactNode;
  switch (config.type) {
    case "spinner":
      fallback = <SpinnerFallback />;
      break;
    case "custom":
      fallback = config.component ? (
        <ComponentRenderer config={config.component as Parameters<typeof ComponentRenderer>[0]["config"]} />
      ) : null;
      break;
    default:
      fallback = (
        <AutoSkeleton
          config={{
            variant: config.variant ?? "card",
            count: config.count,
          }}
        />
      );
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
