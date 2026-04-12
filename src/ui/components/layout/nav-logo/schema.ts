import { z } from "zod";
import { extendComponentSchema } from "../../_base/schema";

export const navLogoConfigSchema = extendComponentSchema({
  type: z.literal("nav-logo"),
  src: z.string().optional(),
  text: z.string().optional(),
  path: z.string().optional(),
  logoHeight: z.string().optional(),
}).strict();
