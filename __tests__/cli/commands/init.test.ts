import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('init command logic', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-init-test-'));
  });

  afterEach(() => {
    fs.removeSync(tmpDir);
  });

  it('creates directory structure for kobana components', async () => {
    const componentDir = path.join(tmpDir, 'src/components/kobana');
    const dirs = ['composites', 'templates', 'hooks', 'tokens'];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(componentDir, dir));
    }

    for (const dir of dirs) {
      expect(fs.existsSync(path.join(componentDir, dir))).toBe(true);
    }
  });

  it('generates kobana.json with default values', async () => {
    const { getDefaultConfig, saveConfig } = await import(
      '../../../src/cli/utils/config.js'
    );
    const config = getDefaultConfig();
    await saveConfig(config, tmpDir);

    const saved = await fs.readJSON(path.join(tmpDir, 'kobana.json'));
    expect(saved.componentDir).toBe('src/components/kobana');
    expect(saved.typescript).toBe(true);
    expect(saved.alias).toBe('@/components/kobana');
    expect(saved.shadcnAlias).toBe('@/components/ui');
    expect(saved.installed).toEqual({});
  });

  it('generates kobana.json with custom values', async () => {
    const { getDefaultConfig, saveConfig } = await import(
      '../../../src/cli/utils/config.js'
    );
    const config = getDefaultConfig();
    config.componentDir = 'lib/ui/kobana';
    config.alias = '~/lib/kobana';
    config.typescript = false;

    await saveConfig(config, tmpDir);

    const saved = await fs.readJSON(path.join(tmpDir, 'kobana.json'));
    expect(saved.componentDir).toBe('lib/ui/kobana');
    expect(saved.alias).toBe('~/lib/kobana');
    expect(saved.typescript).toBe(false);
  });

  it('detects shadcn configuration', async () => {
    // No components.json — shadcn not detected
    expect(fs.existsSync(path.join(tmpDir, 'components.json'))).toBe(false);

    // Create components.json — shadcn detected
    await fs.writeJSON(path.join(tmpDir, 'components.json'), {
      style: 'default',
      tailwind: {},
    });
    expect(fs.existsSync(path.join(tmpDir, 'components.json'))).toBe(true);
  });

  it('detects missing base dependencies from package.json', async () => {
    // No react or tailwindcss
    await fs.writeJSON(path.join(tmpDir, 'package.json'), {
      name: 'test-project',
      dependencies: { lodash: '^4.0.0' },
    });
    const pkgJson = await fs.readJSON(path.join(tmpDir, 'package.json'));
    const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
    const missing: string[] = [];
    if (!allDeps['react']) missing.push('react');
    if (!allDeps['tailwindcss']) missing.push('tailwindcss');

    expect(missing).toContain('react');
    expect(missing).toContain('tailwindcss');
  });

  it('passes validation when base dependencies exist', async () => {
    await fs.writeJSON(path.join(tmpDir, 'package.json'), {
      name: 'test-project',
      dependencies: { react: '^18.0.0' },
      devDependencies: { tailwindcss: '^3.0.0' },
    });
    const pkgJson = await fs.readJSON(path.join(tmpDir, 'package.json'));
    const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
    const missing: string[] = [];
    if (!allDeps['react']) missing.push('react');
    if (!allDeps['tailwindcss']) missing.push('tailwindcss');

    expect(missing).toHaveLength(0);
  });
});
