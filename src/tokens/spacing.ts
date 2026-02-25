/**
 * Spacing scale based on 4px increments, aligned with Tailwind CSS classes.
 */
export const spacing = {
  xs: '4px',   // p-1, gap-1 — between icon and text
  sm: '8px',   // p-2, gap-2 — badge padding
  md: '16px',  // p-4, gap-4 — card padding
  lg: '24px',  // p-6, gap-6 — between sections
  xl: '32px',  // p-8, gap-8 — page margins
  '2xl': '48px', // p-12, gap-12 — large section gaps
} as const;

export type SpacingKey = keyof typeof spacing;
