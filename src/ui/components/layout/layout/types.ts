import type { ReactNode } from "react";
import type { LayoutConfig } from "./schema";

/** Props for the Layout component. */
export interface LayoutProps {
  /** Layout configuration from the manifest. */
  config: LayoutConfig;
  /** The nav element to render in the layout (sidebar or top). */
  nav?: ReactNode;
  /** The page content to render inside the layout. */
  children: ReactNode;
}

/** Layout variant type extracted from the schema. */
export type LayoutVariant = LayoutConfig["variant"];
