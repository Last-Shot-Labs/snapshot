import type {
  CSSProperties,
  KeyboardEventHandler,
  ReactNode,
  Ref,
} from "react";
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
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  buttonRef?: Ref<HTMLButtonElement>;
  surfaceId?: string;
  surfaceConfig?: Record<string, unknown>;
  itemSurfaceConfig?: Record<string, unknown>;
  testId?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaPressed?: boolean;
  ariaChecked?: boolean;
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | true;
  ariaSelected?: boolean;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  role?: string;
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
