/**
 * Kobana Typography Tokens
 *
 * Conforme Branding Book:
 * - Work Sans (primária): textos, títulos, interfaces. Clara, neutra, legível.
 * - Syne (secundária): títulos, números, destaques. Forte personalidade. Evitar textos longos.
 */
export const fontFamily = {
  /** Work Sans — uso geral: body, interfaces, títulos de seção */
  sans: "'Work Sans', sans-serif",
  /** Syne — uso pontual: headings de destaque, números, hero titles */
  display: "'Syne', sans-serif",
} as const;

export type FontFamilyKey = keyof typeof fontFamily;

export const fontSize = {
  xs: '0.75rem',     // 12px — captions, labels, badges
  sm: '0.875rem',    // 14px — body small, table cells
  base: '1rem',      // 16px — body text
  lg: '1.125rem',    // 18px — subtitles
  xl: '1.25rem',     // 20px — section titles
  '2xl': '1.5rem',   // 24px — page titles
  '3xl': '1.875rem', // 30px — hero titles (usar font-display)
} as const;

export type FontSizeKey = keyof typeof fontSize;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontWeightKey = keyof typeof fontWeight;

export const lineHeight = {
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
} as const;

export type LineHeightKey = keyof typeof lineHeight;
