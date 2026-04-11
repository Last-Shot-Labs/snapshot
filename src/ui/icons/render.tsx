import type { ReactNode } from "react";
import { Icon } from "./icon";

export function renderIcon(name: string | undefined, size = 16): ReactNode {
  if (!name) {
    return null;
  }

  return <Icon name={name} size={size} />;
}
