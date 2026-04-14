import { z } from "zod";
import { tRefSchema } from "../../i18n/schema";
import { envRefSchema } from "../../manifest/env";
import { fromRefSchema } from "../_base/types";

export const primitiveExprSchema = z
  .object({
    expr: z.string(),
  })
  .strict();

export const primitiveTextValueSchema = z.union([
  z.string(),
  fromRefSchema,
  envRefSchema,
  primitiveExprSchema,
  tRefSchema,
]);

export const primitiveStringValueSchema = z.union([
  z.string(),
  fromRefSchema,
  envRefSchema,
  primitiveExprSchema,
]);

export const primitiveDisplayValueSchema = z.union([
  z.string(),
  z.number(),
  fromRefSchema,
  envRefSchema,
  primitiveExprSchema,
  tRefSchema,
]);
