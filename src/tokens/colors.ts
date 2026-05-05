/**
 * Kobana Brand Colors
 *
 * Paleta oficial conforme Branding Book.
 * As cores principais (lime, black) devem sempre predominar.
 */
export const brandColors = {
  /** Cor primária da marca — CTAs, destaques, elementos interativos */
  lime: '#D3FD54',
  /** Textos, fundos escuros, contraste */
  black: '#000000',
  /** Fundos claros, textos em fundo escuro */
  white: '#FDFDFB',
  /** Textos secundários, elementos neutros */
  gray: '#676767',
  /** Destaques, CTAs secundários */
  purple: '#A630DA',
} as const;

export type BrandColor = keyof typeof brandColors;

/**
 * Cores semânticas mapeadas à paleta da marca.
 */
export const semanticColors = {
  /** Ação principal — Kobana Lime */
  primary: brandColors.lime,
  /** Texto sobre primary — preto para contraste sobre lime */
  primaryForeground: brandColors.black,
  /** Ação secundária / destaque alternativo */
  accent: brandColors.purple,
  /** Texto principal */
  text: brandColors.black,
  /** Texto secundário */
  textSecondary: brandColors.gray,
  /** Texto invertido (sobre fundo escuro) */
  textInverse: brandColors.white,
  /** Fundo padrão claro */
  background: brandColors.white,
  /** Fundo escuro */
  backgroundDark: brandColors.black,
} as const;

/**
 * Cores de status para feedback ao usuário.
 */
export const statusColors = {
  success: 'var(--color-status-success)',
  warning: 'var(--color-status-warning)',
  error: 'var(--color-status-error)',
  info: 'var(--color-status-info)',
  active: 'var(--color-status-active)',
  inactive: 'var(--color-status-inactive)',
} as const;

export type StatusColor = keyof typeof statusColors;

/**
 * CSS to be added to the consumer project's global styles.
 * Install via: npx @kobana/ui add tokens
 *
 * Targets Tailwind v4. The `@theme inline` block registers the Kobana brand
 * and status tokens so utilities like `bg-kobana-lime`, `text-status-success`,
 * and `bg-status-error-bg` are generated. The `inline` keyword keeps the
 * `var()` reference at runtime, so the `.dark` overrides flip values without
 * regenerating utilities.
 */
export const tokensCss = `@layer base {
  :root {
    /* Kobana Brand Colors (HSL components for alpha modulation) */
    --kobana-lime: 73 99% 66%;
    --kobana-black: 0 0% 0%;
    --kobana-white: 60 20% 99%;
    --kobana-gray: 0 0% 40%;
    --kobana-purple: 285 75% 52%;

    /* Status Colors — values mirror Underlith canonical (web/styles/underlith.tokens.css).
       For each family: deep value (-), tinted near-surface (-bg), and the
       foreground to use when the deep value is the bg (-on, Material/HIG style). */
    --color-status-success: oklch(0.30 0.13 145);
    --color-status-warning: oklch(0.40 0.12 75);
    --color-status-error: oklch(0.40 0.16 25);
    --color-status-info: oklch(0.40 0.13 240);
    --color-status-active: oklch(0.20 0.10 130);
    --color-status-inactive: oklch(0.50 0 0);

    --color-status-success-bg: oklch(0.98 0.03 145);
    --color-status-warning-bg: oklch(0.97 0.04 75);
    --color-status-error-bg: oklch(0.97 0.04 25);
    --color-status-info-bg: oklch(0.97 0.04 240);
    --color-status-active-bg: hsl(var(--kobana-lime));
    --color-status-inactive-bg: oklch(0.95 0 0);

    --color-status-success-on: oklch(0.98 0.03 145);
    --color-status-warning-on: oklch(0.97 0.04 75);
    --color-status-error-on: oklch(0.97 0.04 25);
    --color-status-info-on: oklch(0.97 0.04 240);
    --color-status-active-on: oklch(0.985 0 0);
    --color-status-inactive-on: oklch(0.95 0 0);
  }

  .dark {
    --color-status-success: oklch(0.78 0.18 145);
    --color-status-warning: oklch(0.82 0.16 75);
    --color-status-error: oklch(0.72 0.20 25);
    --color-status-info: oklch(0.78 0.15 240);
    --color-status-active: oklch(0.20 0.10 130);
    --color-status-inactive: oklch(0.65 0 0);

    --color-status-success-bg: oklch(0.22 0.06 145);
    --color-status-warning-bg: oklch(0.25 0.06 75);
    --color-status-error-bg: oklch(0.22 0.07 25);
    --color-status-info-bg: oklch(0.22 0.06 240);
    --color-status-active-bg: hsl(var(--kobana-lime));
    --color-status-inactive-bg: oklch(0.25 0 0);

    --color-status-success-on: oklch(0.22 0.06 145);
    --color-status-warning-on: oklch(0.25 0.06 75);
    --color-status-error-on: oklch(0.22 0.07 25);
    --color-status-info-on: oklch(0.22 0.06 240);
    --color-status-active-on: oklch(0.985 0 0);
    --color-status-inactive-on: oklch(0.25 0 0);
  }

  /* Dashboard theme — Kobana Lime as primary */
  .dashboard-theme {
    --primary: hsl(73 99% 66%);
    --primary-foreground: hsl(0 0% 0%);
    --ring: hsl(73 99% 66%);
  }

  .dark .dashboard-theme,
  .dashboard-theme.dark {
    --primary: hsl(73 99% 66%);
    --primary-foreground: hsl(0 0% 0%);
    --ring: hsl(73 99% 66%);
  }
}

@theme inline {
  --color-kobana-lime: hsl(var(--kobana-lime));
  --color-kobana-black: hsl(var(--kobana-black));
  --color-kobana-white: hsl(var(--kobana-white));
  --color-kobana-gray: hsl(var(--kobana-gray));
  --color-kobana-purple: hsl(var(--kobana-purple));

  --color-status-success: var(--color-status-success);
  --color-status-success-bg: var(--color-status-success-bg);
  --color-status-success-on: var(--color-status-success-on);
  --color-status-warning: var(--color-status-warning);
  --color-status-warning-bg: var(--color-status-warning-bg);
  --color-status-warning-on: var(--color-status-warning-on);
  --color-status-error: var(--color-status-error);
  --color-status-error-bg: var(--color-status-error-bg);
  --color-status-error-on: var(--color-status-error-on);
  --color-status-info: var(--color-status-info);
  --color-status-info-bg: var(--color-status-info-bg);
  --color-status-info-on: var(--color-status-info-on);
  --color-status-active: var(--color-status-active);
  --color-status-active-bg: var(--color-status-active-bg);
  --color-status-active-on: var(--color-status-active-on);
  --color-status-inactive: var(--color-status-inactive);
  --color-status-inactive-bg: var(--color-status-inactive-bg);
  --color-status-inactive-on: var(--color-status-inactive-on);
}
`;
