import { test, expect } from '@playwright/test';

function luminance([r, g, b]: number[]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(fg: number[], bg: number[]) {
  const L1 = luminance(fg) + 0.05;
  const L2 = luminance(bg) + 0.05;
  return L1 > L2 ? L1 / L2 : L2 / L1;
}

function parseRGB(s: string) {
  const m = s.match(/rgba?\\(([^)]+)\\)/);
  if (!m) throw new Error(`Unsupported color format: ${s}`);
  const parts = m[1].split(',').map((p) => Number(p.trim()));
  return parts.slice(0, 3) as [number, number, number];
}

async function assertBadgeContrast(page, selector: string, min = 4.5) {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  const bg = await el.evaluate((node) => getComputedStyle(node as HTMLElement).backgroundColor);
  const fg = await el.evaluate((node) => getComputedStyle(node as HTMLElement).color);
  const ratio = contrastRatio(parseRGB(fg), parseRGB(bg));
  expect(ratio).toBeGreaterThanOrEqual(min);
}

test.describe('Status badges contrast', () => {
  test('light mode', async ({ page }) => {
    await page.goto('/status-badges-showcase');

    await assertBadgeContrast(page, '[data-badge=status-success]');
    await assertBadgeContrast(page, '[data-badge=status-warning]');
    await assertBadgeContrast(page, '[data-badge=status-error]');
    await assertBadgeContrast(page, '[data-badge=status-info]');
  });

  test('dark mode', async ({ page }) => {
    await page.addInitScript(() => {
      document.documentElement.classList.add('dark');
    });
    await page.goto('/status-badges-showcase');

    await assertBadgeContrast(page, '[data-badge=status-success]', 3.0);
    await assertBadgeContrast(page, '[data-badge=status-warning]', 3.0);
    await assertBadgeContrast(page, '[data-badge=status-error]', 3.0);
    await assertBadgeContrast(page, '[data-badge=status-info]', 3.0);
  });
});
