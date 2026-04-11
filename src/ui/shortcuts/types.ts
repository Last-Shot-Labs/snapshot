import type { ActionConfig } from "../actions/types";

/** Keyboard shortcut definition from manifest. */
export interface ShortcutBinding {
  /** The action to execute when this shortcut fires. */
  type: string;
  /** Additional action properties (modal name, event name, etc.) */
  [key: string]: unknown;
}

/** Parsed keyboard combo. */
export interface ParsedCombo {
  key: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
}
