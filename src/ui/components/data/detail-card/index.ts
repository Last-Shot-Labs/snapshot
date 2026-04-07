export { DetailCard } from "./component";
export { detailCardConfigSchema } from "./schema";
export type {
  DetailCardConfig,
  DetailFieldConfig,
  DetailCardAction,
  DetailFieldFormat,
} from "./schema";
export type { ResolvedField, UseDetailCardResult } from "./types";
export { useDetailCard } from "./hook";

import { DetailCard } from "./component";
import { detailCardConfigSchema } from "./schema";
import { registerComponent } from "../../../manifest/component-registry";
import { registerComponentSchema } from "../../../manifest/schema";

/**
 * Register detail-card in the component and schema registries.
 */
registerComponent(
  "detail-card",
  DetailCard as React.ComponentType<{ config: Record<string, unknown> }>,
);
registerComponentSchema(
  "detail-card",
  detailCardConfigSchema as import("zod").ZodType<unknown>,
);
