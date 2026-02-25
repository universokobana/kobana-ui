export const statusColors = {
  success: 'var(--color-status-success)',
  warning: 'var(--color-status-warning)',
  error: 'var(--color-status-error)',
  info: 'var(--color-status-info)',
} as const;

export type StatusColor = keyof typeof statusColors;

/**
 * CSS to be added to the consumer project's global styles.
 * Install via: npx @kobana/ui add tokens
 */
export const tokensCss = `@layer base {
  :root {
    --color-status-success: oklch(0.72 0.19 142);
    --color-status-warning: oklch(0.75 0.18 85);
    --color-status-error: oklch(0.63 0.24 25);
    --color-status-info: oklch(0.7 0.15 250);

    --color-status-success-bg: oklch(0.72 0.19 142 / 0.1);
    --color-status-warning-bg: oklch(0.75 0.18 85 / 0.1);
    --color-status-error-bg: oklch(0.63 0.24 25 / 0.1);
    --color-status-info-bg: oklch(0.7 0.15 250 / 0.1);
  }

  .dark {
    --color-status-success: oklch(0.78 0.17 142);
    --color-status-warning: oklch(0.8 0.16 85);
    --color-status-error: oklch(0.7 0.22 25);
    --color-status-info: oklch(0.76 0.13 250);

    --color-status-success-bg: oklch(0.78 0.17 142 / 0.15);
    --color-status-warning-bg: oklch(0.8 0.16 85 / 0.15);
    --color-status-error-bg: oklch(0.7 0.22 25 / 0.15);
    --color-status-info-bg: oklch(0.76 0.13 250 / 0.15);
  }
}
`;
