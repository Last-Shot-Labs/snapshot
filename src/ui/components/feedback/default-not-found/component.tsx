"use client";

import type { CSSProperties } from "react";
import type { NotFoundConfig } from "./schema";

/**
 * Default not-found feedback shown when no route matches.
 */
export function DefaultNotFound({ config }: { config: NotFoundConfig }) {
  return (
    <main
      aria-labelledby="snapshot-not-found-title"
      className={config.className}
      data-snapshot-feedback="not-found"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--sn-spacing-2xl, 3rem)",
        background: "var(--sn-color-background, #f8fafc)",
        color: "var(--sn-color-foreground, #0f172a)",
        ...(config.style as CSSProperties),
      }}
    >
      <section
        style={{
          maxWidth: "32rem",
          textAlign: "center",
          display: "grid",
          gap: "var(--sn-spacing-md, 1rem)",
        }}
      >
        <p
          style={{
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--sn-color-muted-foreground, #64748b)",
            fontSize: "var(--sn-font-size-xs, 0.75rem)",
          }}
        >
          404
        </p>
        <h1
          id="snapshot-not-found-title"
          style={{
            margin: 0,
            fontSize: "var(--sn-font-size-4xl, 2.25rem)",
            fontWeight: "var(--sn-font-weight-bold, 700)",
          }}
        >
          {config.title ?? "Page not found"}
        </h1>
        <p
          style={{
            margin: 0,
            color: "var(--sn-color-muted-foreground, #64748b)",
          }}
        >
          {config.description ?? "The page you are looking for does not exist."}
        </p>
      </section>
    </main>
  );
}
