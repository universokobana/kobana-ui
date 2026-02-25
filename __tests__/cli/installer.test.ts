import { describe, it, expect } from 'vitest';
import { rewriteImports, detectPackageManager } from '../../src/cli/utils/installer.js';
import { KobanaConfig } from '../../src/cli/utils/config.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const mockConfig: KobanaConfig = {
  componentDir: 'src/components/kobana',
  typescript: true,
  alias: '@/components/kobana',
  shadcnAlias: '@/components/ui',
  registry: 'https://example.com/registry.json',
  installed: {},
};

describe('rewriteImports', () => {
  it('rewrites kobana imports', () => {
    const input = `import { FilterBar } from '@/components/kobana/composites/filter-bar';`;
    const result = rewriteImports(input, mockConfig);
    expect(result).toBe(`import { FilterBar } from '@/components/kobana/composites/filter-bar';`);
  });

  it('rewrites shadcn imports', () => {
    const input = `import { Button } from '@/components/ui/button';`;
    const result = rewriteImports(input, mockConfig);
    expect(result).toBe(`import { Button } from '@/components/ui/button';`);
  });

  it('rewrites both kobana and shadcn imports in the same content', () => {
    const input = [
      `import { Button } from '@/components/ui/button';`,
      `import { FilterBar } from '@/components/kobana/composites/filter-bar';`,
    ].join('\n');
    const result = rewriteImports(input, mockConfig);
    expect(result).toContain(`@/components/ui/button`);
    expect(result).toContain(`@/components/kobana/composites/filter-bar`);
  });

  it('rewrites to custom aliases', () => {
    const customConfig: KobanaConfig = {
      ...mockConfig,
      alias: '~/lib/kobana',
      shadcnAlias: '~/lib/ui',
    };
    const input = `import { Button } from '@/components/ui/button';\nimport { FilterBar } from '@/components/kobana/composites/filter-bar';`;
    const result = rewriteImports(input, customConfig);
    expect(result).toContain(`~/lib/ui/button`);
    expect(result).toContain(`~/lib/kobana/composites/filter-bar`);
  });
});

describe('detectPackageManager', () => {
  it('detects npm by default', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      expect(detectPackageManager(tmpDir)).toBe('npm');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('detects pnpm', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'pnpm-lock.yaml'), '');
      expect(detectPackageManager(tmpDir)).toBe('pnpm');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('detects yarn', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'yarn.lock'), '');
      expect(detectPackageManager(tmpDir)).toBe('yarn');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('detects bun', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'bun.lockb'), '');
      expect(detectPackageManager(tmpDir)).toBe('bun');
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});
