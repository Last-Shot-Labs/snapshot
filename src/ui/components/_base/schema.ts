import { z } from "zod";

export const componentTokenOverridesSchema = z.record(z.string());

const fromRefSchema = z
  .object({
    from: z.string(),
    transform: z
      .enum([
        "uppercase",
        "lowercase",
        "trim",
        "length",
        "number",
        "boolean",
        "string",
        "json",
        "keys",
        "values",
        "first",
        "last",
        "count",
        "sum",
        "join",
        "split",
        "default",
      ])
      .optional(),
    transformArg: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

export const componentZIndexSchema = z.union([
  z.enum(["base", "dropdown", "sticky", "overlay", "modal", "popover", "toast"]),
  z.number(),
]);

export const componentAnimationSchema = z
  .object({
    enter: z.enum([
      "fade",
      "fade-up",
      "fade-down",
      "slide-left",
      "slide-right",
      "scale",
      "bounce",
    ]),
    duration: z
      .union([z.enum(["instant", "fast", "normal", "slow"]), z.number()])
      .optional(),
    delay: z.number().optional(),
    easing: z
      .union([
        z.enum(["default", "in", "out", "in-out", "spring"]),
        z.string(),
      ])
      .optional(),
    stagger: z.number().optional(),
  })
  .strict();

export const componentGradientStopSchema = z
  .object({
    color: z.string(),
    position: z.string().optional(),
  })
  .strict();

export const componentGradientSchema = z
  .object({
    type: z.enum(["linear", "radial", "conic"]).default("linear"),
    direction: z.string().optional(),
    stops: z.array(componentGradientStopSchema).min(2),
  })
  .strict();

export const componentBackgroundSchema = z.union([
  z.string(),
  z
    .object({
      image: z.string().optional(),
      overlay: z.string().optional(),
      gradient: componentGradientSchema.optional(),
      position: z.string().optional(),
      size: z.enum(["cover", "contain", "auto"]).optional(),
      fixed: z.boolean().optional(),
    })
    .strict(),
]);

export const componentTransitionSchema = z.union([
  z.enum(["all", "colors", "opacity", "shadow", "transform"]),
  z
    .object({
      property: z.string().default("all"),
      duration: z
        .union([z.enum(["instant", "fast", "normal", "slow"]), z.number()])
        .optional(),
      easing: z
        .union([
          z.enum(["default", "in", "out", "in-out", "spring"]),
          z.string(),
        ])
        .optional(),
    })
    .strict(),
]);

export const extendedBaseComponentSchema = z.object({
  id: z.string().optional(),
  tokens: componentTokenOverridesSchema.optional(),
  visibleWhen: z.string().optional(),
  visible: z.union([z.boolean(), fromRefSchema]).optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
  sticky: z
    .union([
      z.boolean(),
      z
        .object({
          top: z.string().optional(),
          zIndex: componentZIndexSchema.optional(),
        })
        .strict(),
    ])
    .optional(),
  zIndex: componentZIndexSchema.optional(),
  animation: componentAnimationSchema.optional(),
  glass: z.boolean().optional(),
  background: componentBackgroundSchema.optional(),
  transition: componentTransitionSchema.optional(),
});

export function extendComponentSchema<T extends z.ZodRawShape>(shape: T) {
  return extendedBaseComponentSchema.extend(shape);
}
