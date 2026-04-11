import type { ComponentType, ReactNode } from "react";

export interface RegisteredLayoutProps {
  config: Record<string, unknown>;
  nav?: ReactNode;
  slots?: Record<string, ReactNode>;
  children: ReactNode;
}

export interface RegisteredLayout {
  component: ComponentType<RegisteredLayoutProps>;
}

const layoutRegistry = new Map<string, RegisteredLayout>();

export function registerLayout(
  name: string,
  layout: RegisteredLayout,
): void {
  layoutRegistry.set(name, layout);
}

export function resolveLayout(name: string): RegisteredLayout | undefined {
  return layoutRegistry.get(name);
}

export function getRegisteredLayouts(): string[] {
  return [...layoutRegistry.keys()];
}
