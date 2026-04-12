"use client";

import { ComponentRenderer } from "../../../manifest/renderer";
import type { BoxConfig } from "./types";

export function Box({ config }: { config: BoxConfig }) {
  return (
    <>
      {config.children?.map((child, i) => (
        <ComponentRenderer
          key={(child as { id?: string }).id ?? i}
          config={child}
        />
      ))}
    </>
  );
}
