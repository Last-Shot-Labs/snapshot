import type { CSSProperties, ReactNode, Ref } from "react";
import type { z } from "zod";
import type { RuntimeSurfaceState } from "../../_base/style-surfaces";
import type { selectConfigSchema } from "./schema";

export type SelectConfig = z.input<typeof selectConfigSchema>;

export interface SelectControlProps {
  selectRef?: Ref<HTMLSelectElement>;
  selectId?: string;
  value: string;
  disabled?: boolean;
  ariaLabel?: string;
  onChangeValue?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  surfaceId?: string;
  surfaceConfig?: Record<string, unknown>;
  itemSurfaceConfig?: Record<string, unknown>;
  activeStates?: RuntimeSurfaceState[];
  testId?: string;
  children: ReactNode;
}
