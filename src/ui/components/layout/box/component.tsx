"use client";

import { createElement } from "react";
import { ComponentRenderer } from "../../../manifest/renderer";
import type { BoxConfig } from "./types";

export function Box({ config }: { config: BoxConfig }) {
  const children = config.children?.map((child, i) => (
    <ComponentRenderer
      key={(child as { id?: string }).id ?? i}
      config={child}
    />
  ));

  return createElement(config.as ?? "div", null, children);
}
