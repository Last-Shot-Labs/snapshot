import type { z } from "zod";
import type { carouselConfigSchema } from "./schema";

/** Inferred config type from the Carousel Zod schema. */
export type CarouselSchemaConfig = z.infer<typeof carouselConfigSchema>;
