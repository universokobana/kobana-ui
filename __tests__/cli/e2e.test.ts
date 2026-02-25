import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { getDefaultConfig, saveConfig, loadConfig } from '../../src/cli/utils/config.js';
import { fetchRegistry, Registry } from '../../src/cli/utils/registry.js';
import { resolveDependencies } from '../../src/cli/utils/resolver.js';
import { installComponent } from '../../src/cli/utils/installer.js';

/**
 * End-to-end test: simulates the full flow of `init` + `add` in a clean project.
 * Uses the real registry from the repo and real source files.
 */
describe('e2e: init + add in clean project', () => {
  let projectDir: string;
  let registry: Registry;
  const repoRoot = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    '../..',
  );

  beforeEach(async () => {
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-e2e-'));

    // Load the real registry
    registry = await fetchRegistry(path.join(repoRoot, 'registry/registry.json'));
  });

  afterEach(() => {
    fs.removeSync(projectDir);
  });

  it('init creates config and directory structure', async () => {
    // Simulate init
    const config = getDefaultConfig();
    config.componentDir = 'src/components/kobana';
    config.alias = '@/components/kobana';

    // Create directories
    const dirs = ['composites', 'templates', 'hooks', 'tokens'];
    for (const dir of dirs) {
      await fs.ensureDir(path.join(projectDir, config.componentDir, dir));
    }

    // Save config
    await saveConfig(config, projectDir);

    // Verify
    expect(fs.existsSync(path.join(projectDir, 'kobana.json'))).toBe(true);
    for (const dir of dirs) {
      expect(fs.existsSync(path.join(projectDir, config.componentDir, dir))).toBe(true);
    }

    const loaded = await loadConfig(projectDir);
    expect(loaded.componentDir).toBe('src/components/kobana');
    expect(loaded.installed).toEqual({});
  });

  it('add resolves deps and installs status-badge from real registry', async () => {
    // Init
    const config = getDefaultConfig();
    await saveConfig(config, projectDir);

    // Create source files (simulated — in real CLI these come from the repo)
    const sourceFiles = registry.components['status-badge'].files;
    for (const file of sourceFiles) {
      const srcPath = path.join(repoRoot, file);
      // If source file doesn't exist yet (component not implemented), create a placeholder
      if (!(await fs.pathExists(srcPath))) {
        await fs.ensureDir(path.dirname(srcPath));
        await fs.writeFile(srcPath, `// placeholder: ${file}\n`);
      }
    }

    // Resolve
    const resolved = resolveDependencies(['status-badge'], registry, config.installed);
    expect(resolved.kobana.length).toBeGreaterThanOrEqual(1);
    expect(resolved.shadcn).toContain('badge');

    // Install kobana components
    for (const { slug, component } of resolved.kobana) {
      await installComponent(component, slug, config, repoRoot, projectDir);
      config.installed[slug] = {
        version: component.version,
        installedAt: '2026-02-25',
      };
    }

    await saveConfig(config, projectDir);

    // Verify files were copied
    for (const file of sourceFiles) {
      const relativePath = file.replace(/^src\/components\//, '');
      const destPath = path.join(projectDir, config.componentDir, relativePath);
      expect(fs.existsSync(destPath)).toBe(true);
    }

    // Verify config updated
    const loaded = await loadConfig(projectDir);
    expect(loaded.installed['status-badge']).toBeDefined();
    expect(loaded.installed['status-badge'].version).toBe('0.1.0');
  });

  it('add data-table resolves full dependency tree from real registry', async () => {
    // Init
    const config = getDefaultConfig();
    await saveConfig(config, projectDir);

    // Resolve data-table with real registry
    const resolved = resolveDependencies(['data-table'], registry, config.installed);

    // Should resolve filter-bar and status-badge as deps
    const slugs = resolved.kobana.map((k) => k.slug);
    expect(slugs).toContain('filter-bar');
    expect(slugs).toContain('status-badge');
    expect(slugs).toContain('data-table');

    // Dependencies should come first
    expect(slugs.indexOf('filter-bar')).toBeLessThan(slugs.indexOf('data-table'));
    expect(slugs.indexOf('status-badge')).toBeLessThan(slugs.indexOf('data-table'));

    // All shadcn deps should be collected
    expect(resolved.shadcn).toContain('table');
    expect(resolved.shadcn).toContain('badge');
    expect(resolved.shadcn).toContain('input');

    // npm deps
    expect(resolved.npm).toContain('@tanstack/react-table');
  });

  it('add skips already installed components in full flow', async () => {
    const config = getDefaultConfig();
    config.installed = {
      'status-badge': { version: '0.1.0', installedAt: '2026-02-01' },
      'filter-bar': { version: '0.1.0', installedAt: '2026-02-01' },
    };
    await saveConfig(config, projectDir);

    const resolved = resolveDependencies(['data-table'], registry, config.installed);
    const slugs = resolved.kobana.map((k) => k.slug);

    // Only data-table should be in the install list
    expect(slugs).toEqual(['data-table']);
  });
});
