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
} as const;

export type StatusColor = keyof typeof statusColors;

/**
 * CSS to be added to the consumer project's global styles.
 * Install via: npx @kobana/ui add tokens
 */
export const tokensCss = `@layer base {
  :root {
    /* Kobana Brand Colors (HSL) */
    --kobana-lime: 73 99% 66%;
    --kobana-black: 0 0% 0%;
    --kobana-white: 60 20% 99%;
    --kobana-gray: 0 0% 40%;
    --kobana-purple: 285 75% 52%;

    /* Status Colors */
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
`;
