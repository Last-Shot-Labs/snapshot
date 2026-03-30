import { z } from "zod";

// ── Color tokens ─────────────────────────────────────────────────────────────

/** A color pair: light and dark mode values. */
const colorPairSchema = z.object({
  light: z.string(),
  dark: z.string(),
});

export type ColorPair = z.infer<typeof colorPairSchema>;

const colorTokensSchema = z.object({
  primary: colorPairSchema,
  "primary-foreground": colorPairSchema,
  secondary: colorPairSchema,
  "secondary-foreground": colorPairSchema,
  destructive: colorPairSchema,
  "destructive-foreground": colorPairSchema,
  muted: colorPairSchema,
  "muted-foreground": colorPairSchema,
  accent: colorPairSchema,
  "accent-foreground": colorPairSchema,
  background: colorPairSchema,
  foreground: colorPairSchema,
  card: colorPairSchema,
  "card-foreground": colorPairSchema,
  popover: colorPairSchema,
  "popover-foreground": colorPairSchema,
  border: colorPairSchema,
  input: colorPairSchema,
  ring: colorPairSchema,
});

export type ColorTokens = z.infer<typeof colorTokensSchema>;

// ── Spacing tokens ───────────────────────────────────────────────────────────

const spacingTokensSchema = z.object({
  px: z.string(),
  "0.5": z.string(),
  "1": z.string(),
  "1.5": z.string(),
  "2": z.string(),
  "2.5": z.string(),
  "3": z.string(),
  "3.5": z.string(),
  "4": z.string(),
  "5": z.string(),
  "6": z.string(),
  "7": z.string(),
  "8": z.string(),
  "9": z.string(),
  "10": z.string(),
  "12": z.string(),
  "14": z.string(),
  "16": z.string(),
  "20": z.string(),
  "24": z.string(),
  "28": z.string(),
  "32": z.string(),
  "36": z.string(),
  "40": z.string(),
  "44": z.string(),
  "48": z.string(),
  "52": z.string(),
  "56": z.string(),
  "60": z.string(),
  "64": z.string(),
  "72": z.string(),
  "80": z.string(),
  "96": z.string(),
});

export type SpacingTokens = z.infer<typeof spacingTokensSchema>;

// ── Radius tokens ────────────────────────────────────────────────────────────

const radiusTokensSchema = z.object({
  none: z.string(),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  "2xl": z.string(),
  full: z.string(),
});

export type RadiusTokens = z.infer<typeof radiusTokensSchema>;

// ── Typography tokens ────────────────────────────────────────────────────────

const fontFamilyTokensSchema = z.object({
  sans: z.string(),
  serif: z.string(),
  mono: z.string(),
});

const fontSizeTokensSchema = z.object({
  xs: z.string(),
  sm: z.string(),
  base: z.string(),
  lg: z.string(),
  xl: z.string(),
  "2xl": z.string(),
  "3xl": z.string(),
  "4xl": z.string(),
  "5xl": z.string(),
});

const fontWeightTokensSchema = z.object({
  thin: z.string(),
  light: z.string(),
  normal: z.string(),
  medium: z.string(),
  semibold: z.string(),
  bold: z.string(),
  extrabold: z.string(),
});

const lineHeightTokensSchema = z.object({
  none: z.string(),
  tight: z.string(),
  snug: z.string(),
  normal: z.string(),
  relaxed: z.string(),
  loose: z.string(),
});

const letterSpacingTokensSchema = z.object({
  tighter: z.string(),
  tight: z.string(),
  normal: z.string(),
  wide: z.string(),
  wider: z.string(),
  widest: z.string(),
});

const typographyTokensSchema = z.object({
  fontFamily: fontFamilyTokensSchema,
  fontSize: fontSizeTokensSchema,
  fontWeight: fontWeightTokensSchema,
  lineHeight: lineHeightTokensSchema,
  letterSpacing: letterSpacingTokensSchema,
});

export type TypographyTokens = z.infer<typeof typographyTokensSchema>;

// ── Shadow tokens ────────────────────────────────────────────────────────────

const shadowTokensSchema = z.object({
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  "2xl": z.string(),
  none: z.string(),
});

export type ShadowTokens = z.infer<typeof shadowTokensSchema>;

// ── Breakpoint tokens ────────────────────────────────────────────────────────

const breakpointTokensSchema = z.object({
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  "2xl": z.string(),
});

export type BreakpointTokens = z.infer<typeof breakpointTokensSchema>;

// ── Z-index tokens ───────────────────────────────────────────────────────────

const zIndexTokensSchema = z.object({
  dropdown: z.string(),
  sticky: z.string(),
  overlay: z.string(),
  modal: z.string(),
  popover: z.string(),
  tooltip: z.string(),
  toast: z.string(),
});

export type ZIndexTokens = z.infer<typeof zIndexTokensSchema>;

// ── Transition tokens ────────────────────────────────────────────────────────

const durationTokensSchema = z.object({
  instant: z.string(),
  fast: z.string(),
  normal: z.string(),
  slow: z.string(),
});

const easingTokensSchema = z.object({
  "ease-in": z.string(),
  "ease-out": z.string(),
  "ease-in-out": z.string(),
  spring: z.string(),
});

const transitionTokensSchema = z.object({
  duration: durationTokensSchema,
  easing: easingTokensSchema,
});

export type TransitionTokens = z.infer<typeof transitionTokensSchema>;

// ── Interaction tokens ───────────────────────────────────────────────────────

const interactionTokensSchema = z.object({
  "hover:lift": z.string(),
  "hover:glow": z.string(),
  "hover:darken": z.string(),
  "hover:scale-up": z.string(),
  "press:scale-down": z.string(),
  "press:darken": z.string(),
  "focus:ring": z.string(),
  "focus:outline": z.string(),
  "enter:fade-in": z.string(),
  "enter:slide-up": z.string(),
  "enter:scale-in": z.string(),
});

export type InteractionTokens = z.infer<typeof interactionTokensSchema>;

// ── Full token set ───────────────────────────────────────────────────────────

export const tokenSetSchema = z.object({
  colors: colorTokensSchema,
  spacing: spacingTokensSchema,
  radius: radiusTokensSchema,
  typography: typographyTokensSchema,
  shadows: shadowTokensSchema,
  breakpoints: breakpointTokensSchema,
  zIndex: zIndexTokensSchema,
  transitions: transitionTokensSchema,
  interactions: interactionTokensSchema,
});

export type TokenSet = z.infer<typeof tokenSetSchema>;

/** The names of all token categories. */
export type TokenCategory = keyof TokenSet;

/** All token category schemas, keyed by category name. */
export const categorySchemas = {
  colors: colorTokensSchema,
  spacing: spacingTokensSchema,
  radius: radiusTokensSchema,
  typography: typographyTokensSchema,
  shadows: shadowTokensSchema,
  breakpoints: breakpointTokensSchema,
  zIndex: zIndexTokensSchema,
  transitions: transitionTokensSchema,
  interactions: interactionTokensSchema,
} as const satisfies Record<TokenCategory, z.ZodType>;
