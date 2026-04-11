'use client';

import type { ReactNode } from "react";

export interface AutoSkeletonConfig {
  variant?: "auto" | "table" | "list" | "card" | "text" | "chart" | "stat";
  rows?: number;
  count?: number;
}

function Block({
  height,
  width = "100%",
  radius = "var(--sn-radius-md, 0.375rem)",
}: {
  height: string;
  width?: string;
  radius?: string;
}): ReactNode {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: "var(--sn-color-muted, #e5e7eb)",
        animation:
          "sn-pulse var(--sn-duration-slow, 2s) var(--sn-ease-in-out, ease-in-out) infinite",
      }}
    />
  );
}

function TableSkeleton({ rows }: { rows: number }): ReactNode {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Block height="2.25rem" radius="var(--sn-radius-lg, 0.5rem)" />
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0.75rem",
          }}
        >
          <Block height="2rem" />
          <Block height="2rem" />
          <Block height="2rem" />
          <Block height="2rem" />
        </div>
      ))}
    </div>
  );
}

function ListSkeleton({ rows }: { rows: number }): ReactNode {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <Block height="2.5rem" width="2.5rem" radius="9999px" />
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "0.375rem" }}>
            <Block height="0.875rem" width={index % 2 === 0 ? "55%" : "68%"} />
            <Block height="0.75rem" width={index % 2 === 0 ? "82%" : "74%"} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CardSkeleton({ count }: { count: number }): ReactNode {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.max(1, Math.min(count, 3))}, minmax(0, 1fr))`,
        gap: "1rem",
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          style={{
            border: "1px solid var(--sn-color-border, #e5e7eb)",
            borderRadius: "var(--sn-radius-lg, 0.75rem)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <Block height="1rem" width="40%" />
          <Block height="2rem" width="65%" />
          <Block height="0.875rem" width="52%" />
        </div>
      ))}
    </div>
  );
}

export function AutoSkeleton({
  componentType,
  config,
}: {
  componentType?: string;
  config?: AutoSkeletonConfig;
}): ReactNode {
  const variant =
    config?.variant && config.variant !== "auto"
      ? config.variant
      : componentType === "data-table"
        ? "table"
        : componentType === "list" || componentType === "feed"
          ? "list"
          : componentType === "chart"
            ? "chart"
            : componentType === "stat-card"
              ? "stat"
              : "card";
  const rows = config?.rows ?? config?.count ?? 5;

  return (
    <div data-snapshot-auto-skeleton="">
      <style>{`
        @keyframes sn-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: var(--sn-opacity-muted, 0.55); }
        }
      `}</style>
      {variant === "table" ? <TableSkeleton rows={rows} /> : null}
      {variant === "list" ? <ListSkeleton rows={rows} /> : null}
      {variant === "card" ? <CardSkeleton count={Math.max(1, Math.min(rows, 3))} /> : null}
      {variant === "chart" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Block height="1rem" width="30%" />
          <Block height="16rem" radius="var(--sn-radius-lg, 0.75rem)" />
        </div>
      ) : null}
      {variant === "stat" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Block height="0.875rem" width="36%" />
          <Block height="2rem" width="58%" />
          <Block height="0.75rem" width="40%" />
        </div>
      ) : null}
      {variant === "text" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {Array.from({ length: rows }, (_, index) => (
            <Block
              key={index}
              height="0.875rem"
              width={index % 3 === 0 ? "92%" : index % 3 === 1 ? "78%" : "64%"}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
