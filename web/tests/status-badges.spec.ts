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

function parseColorStringToRGB(s: string): [number, number, number] {
  const rgb = s.match(/rgba?\\(([^)]+)\\)/);
  if (rgb) {
    const parts = rgb[1].split(',').map((p) => Number(p.trim()));
    return parts.slice(0, 3) as [number, number, number];
  }
  const hex = s.trim().toLowerCase();
  if (hex.startsWith('#')) {
    const v = hex.length === 4
      ? [hex[1] + hex[1], hex[2] + hex[2], hex[3] + hex[3]]
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
    return v.map((h) => parseInt(h, 16)) as [number, number, number];
  }
  throw new Error(`Unsupported color format: ${s}`);
}

async function toRGBViaCanvas(page, cssColor: string): Promise<[number, number, number]> {
  const [r, g, b] = await page.evaluate((color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    return [data[0], data[1], data[2]];
  }, cssColor);
  return [r, g, b];
}

async function assertBadgeContrast(page, selector: string, min = 4.5) {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  const bgRaw = await el.evaluate((node) => getComputedStyle(node as HTMLElement).backgroundColor);
  const fgRaw = await el.evaluate((node) => getComputedStyle(node as HTMLElement).color);
  const bg = await toRGBViaCanvas(page, bgRaw);
  const fg = await toRGBViaCanvas(page, fgRaw);
  const ratio = contrastRatio(fg, bg);
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
