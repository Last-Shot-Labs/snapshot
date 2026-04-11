import { z } from "zod";
import { componentConfigSchema } from "../../../manifest/schema";
import { extendComponentSchema } from "../../_base/schema";

export const stackConfigSchema = extendComponentSchema({
  type: z.literal("stack"),
  children: z.array(componentConfigSchema).min(1),
  gap: z.enum(["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]).default("md"),
  align: z.enum(["stretch", "start", "center", "end"]).default("stretch"),
  justify: z
    .enum(["start", "center", "end", "between", "around"])
    .default("start"),
  maxWidth: z.enum(["xs", "sm", "md", "lg", "xl", "2xl", "full"]).optional(),
  padding: z.enum(["none", "sm", "md", "lg", "xl"]).optional(),
}).strict();
