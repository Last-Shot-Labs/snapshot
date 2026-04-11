/**
 * Generate a CSS string that bridges Snapshot's --sn-* design tokens
 * to Tailwind CSS v4 @theme variables.
 *
 * This allows manifest apps to use className: "bg-primary text-foreground"
 * etc. in their manifest JSON, with values driven by the token system.
 */
export function generateTailwindBridge(): string {
  return `@import "tailwindcss";

@theme {
  --color-background: var(--sn-color-background);
  --color-foreground: var(--sn-color-foreground);
  --color-card: var(--sn-color-card);
  --color-card-foreground: var(--sn-color-card-foreground);
  --color-popover: var(--sn-color-popover, var(--sn-color-card));
  --color-popover-foreground: var(--sn-color-popover-foreground, var(--sn-color-card-foreground));
  --color-primary: var(--sn-color-primary);
  --color-primary-foreground: var(--sn-color-primary-foreground);
  --color-secondary: var(--sn-color-secondary);
  --color-secondary-foreground: var(--sn-color-secondary-foreground);
  --color-muted: var(--sn-color-muted);
  --color-muted-foreground: var(--sn-color-muted-foreground);
  --color-accent: var(--sn-color-accent);
  --color-accent-foreground: var(--sn-color-accent-foreground);
  --color-destructive: var(--sn-color-destructive);
  --color-destructive-foreground: var(--sn-color-destructive-foreground);
  --color-success: var(--sn-color-success);
  --color-success-foreground: var(--sn-color-success-foreground);
  --color-warning: var(--sn-color-warning);
  --color-warning-foreground: var(--sn-color-warning-foreground);
  --color-info: var(--sn-color-info);
  --color-info-foreground: var(--sn-color-info-foreground);
  --color-border: var(--sn-color-border);
  --color-input: var(--sn-color-input);
  --color-ring: var(--sn-color-ring);
  --color-chart-1: var(--sn-chart-1);
  --color-chart-2: var(--sn-chart-2);
  --color-chart-3: var(--sn-chart-3);
  --color-chart-4: var(--sn-chart-4);
  --color-chart-5: var(--sn-chart-5);
  --radius-sm: var(--sn-radius-sm);
  --radius-md: var(--sn-radius-md);
  --radius-lg: var(--sn-radius-lg);
  --radius-xl: var(--sn-radius-xl);
  --spacing-xs: var(--sn-spacing-xs);
  --spacing-sm: var(--sn-spacing-sm);
  --spacing-md: var(--sn-spacing-md);
  --spacing-lg: var(--sn-spacing-lg);
  --spacing-xl: var(--sn-spacing-xl);
  --font-sans: var(--sn-font-sans);
  --font-mono: var(--sn-font-mono);
}
`;
}
