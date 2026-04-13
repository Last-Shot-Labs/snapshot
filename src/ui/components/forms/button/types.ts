import type { CSSProperties, ReactNode } from "react";
import type { z } from "zod";
import type { buttonConfigSchema } from "./schema";

export type ButtonConfig = z.infer<typeof buttonConfigSchema>;

export interface ButtonControlProps {
  children: ReactNode;
  type?: "button" | "submit";
  variant?: ButtonConfig["variant"];
  size?: ButtonConfig["size"];
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  surfaceId?: string;
  surfaceConfig?: Record<string, unknown>;
  itemSurfaceConfig?: Record<string, unknown>;
  testId?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | true;
  ariaSelected?: boolean;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  role?: "button" | "tab";
  tabIndex?: number;
  activeStates?: Array<
    | "hover"
    | "focus"
    | "open"
    | "selected"
    | "current"
    | "active"
    | "completed"
    | "invalid"
    | "disabled"
  >;
}
