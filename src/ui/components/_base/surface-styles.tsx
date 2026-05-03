'use client';

import { useMemo } from "react";

/**
 * Stable, fast hash for CSS strings used as the dedup key.
 * djb2 — collision-resistant enough for content-addressed style tags.
 */
function hashCss(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) + hash) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

// Module-level registry of CSS hashes already emitted to the document. On the
// client, the first SurfaceStyles for a given hash mounts the <style> tag and
// every subsequent SurfaceStyles render with the same css is a no-op. SSR
// uses the existing data-sn-style attribute on emitted tags so repeated SSR
// passes (or hydration) won't double-mount: hydration matches the existing
// markup, and client renders see the live tag and skip re-mounting.
const emittedHashes: Set<string> = (() => {
  if (typeof window === "undefined") return new Set();
  const w = window as unknown as { __snStyleHashes?: Set<string> };
  if (!w.__snStyleHashes) {
    w.__snStyleHashes = new Set<string>();
    // Seed from any pre-existing tags (SSR-emitted or hot-reloaded).
    if (typeof document !== "undefined") {
      const existing = document.querySelectorAll("style[data-sn-style]");
      existing.forEach((el) => {
        const hash = el.getAttribute("data-sn-style");
        if (hash) w.__snStyleHashes!.add(hash);
      });
    }
  }
  return w.__snStyleHashes;
})();

export function SurfaceStyles({ css }: { css?: string }) {
  const hash = useMemo(() => (css ? hashCss(css) : null), [css]);
  if (!css || !hash) return null;
  if (typeof window !== "undefined" && emittedHashes.has(hash)) {
    return null;
  }
  if (typeof window !== "undefined") {
    emittedHashes.add(hash);
  }
  return (
    <style data-sn-style={hash} dangerouslySetInnerHTML={{ __html: css }} />
  );
}
