import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { resolveDependencies } from '../../../src/cli/utils/resolver.js';
import { installComponent, rewriteImports } from '../../../src/cli/utils/installer.js';
import { saveConfig, loadConfig, KobanaConfig } from '../../../src/cli/utils/config.js';
import { Registry } from '../../../src/cli/utils/registry.js';

const mockRegistry: Registry = {
  name: '@kobana/ui',
  version: '0.1.0',
  components: {
    'status-badge': {
      name: 'StatusBadge',
      description: 'Status badge',
      category: 'composite',
      version: '0.1.0',
      files: [
        'src/components/composites/status-badge/status-badge.tsx',
        'src/components/composites/status-badge/index.ts',
      ],
      dependencies: { shadcn: ['badge'], kobana: [], npm: [] },
    },
    'filter-bar': {
      name: 'FilterBar',
      description: 'Filter bar',
      category: 'composite',
      version: '0.1.0',
      files: [
        'src/components/composites/filter-bar/filter-bar.tsx',
        'src/components/composites/filter-bar/index.ts',
      ],
      dependencies: { shadcn: ['input', 'select', 'button'], kobana: [], npm: [] },
    },
    'data-table': {
      name: 'DataTable',
      description: 'Data table',
      category: 'composite',
      version: '0.1.0',
      files: ['src/components/composites/data-table/data-table.tsx'],
      dependencies: {
        shadcn: ['table', 'checkbox'],
        kobana: ['filter-bar', 'status-badge'],
        npm: ['@tanstack/react-table'],
      },
    },
  },
};

describe('add command logic', () => {
  let tmpDir: string;
  let sourceDir: string;
  let config: KobanaConfig;

  beforeEach(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-add-test-'));
    sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-source-'));

    // Setup source files
    for (const [, component] of Object.entries(mockRegistry.components)) {
      for (const file of component.files) {
        const filePath = path.join(sourceDir, file);
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(
          filePath,
          `// ${component.name}\nimport { Button } from '@/components/ui/button';\nexport const ${component.name} = () => null;\n`,
        );
      }
    }

    // Setup consumer project config
    config = {
      componentDir: 'src/components/kobana',
      typescript: true,
      alias: '@/components/kobana',
      shadcnAlias: '@/components/ui',
      registry: 'https://example.com/registry.json',
      installed: {},
    };

    await saveConfig(config, tmpDir);
  });

  afterEach(() => {
    fs.removeSync(tmpDir);
    fs.removeSync(sourceDir);
  });

  it('adds a simple component without kobana deps', async () => {
    const resolved = resolveDependencies(['status-badge'], mockRegistry, config.installed);
    expect(resolved.kobana).toHaveLength(1);
    expect(resolved.kobana[0].slug).toBe('status-badge');

    // Install the component
    for (const { slug, component } of resolved.kobana) {
      await installComponent(component, slug, config, sourceDir, tmpDir);
    }

    // Verify files exist
    expect(
      fs.existsSync(
        path.join(tmpDir, 'src/components/kobana/composites/status-badge/status-badge.tsx'),
      ),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(tmpDir, 'src/components/kobana/composites/status-badge/index.ts'),
      ),
    ).toBe(true);
  });

  it('adds a component with transitive deps', async () => {
    const resolved = resolveDependencies(['data-table'], mockRegistry, config.installed);

    // Should resolve filter-bar and status-badge before data-table
    const slugs = resolved.kobana.map((k) => k.slug);
    expect(slugs).toContain('filter-bar');
    expect(slugs).toContain('status-badge');
    expect(slugs).toContain('data-table');

    // Install all
    for (const { slug, component } of resolved.kobana) {
      await installComponent(component, slug, config, sourceDir, tmpDir);
    }

    // Verify all component files exist
    expect(
      fs.existsSync(
        path.join(tmpDir, 'src/components/kobana/composites/data-table/data-table.tsx'),
      ),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(tmpDir, 'src/components/kobana/composites/filter-bar/filter-bar.tsx'),
      ),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(tmpDir, 'src/components/kobana/composites/status-badge/status-badge.tsx'),
      ),
    ).toBe(true);
  });

  it('skips already installed components', () => {
    const installed = {
      'status-badge': { version: '0.1.0', installedAt: '2026-01-01' },
      'filter-bar': { version: '0.1.0', installedAt: '2026-01-01' },
    };
    const resolved = resolveDependencies(['data-table'], mockRegistry, installed);
    const slugs = resolved.kobana.map((k) => k.slug);
    expect(slugs).toEqual(['data-table']);
    expect(slugs).not.toContain('status-badge');
    expect(slugs).not.toContain('filter-bar');
  });

  it('updates kobana.json after installation', async () => {
    const resolved = resolveDependencies(['status-badge'], mockRegistry, config.installed);

    // Install and track
    for (const { slug, component } of resolved.kobana) {
      await installComponent(component, slug, config, sourceDir, tmpDir);
      config.installed[slug] = {
        version: component.version,
        installedAt: new Date().toISOString().split('T')[0],
      };
    }

    await saveConfig(config, tmpDir);

    // Reload and verify
    const reloaded = await loadConfig(tmpDir);
    expect(reloaded.installed['status-badge']).toBeDefined();
    expect(reloaded.installed['status-badge'].version).toBe('0.1.0');
  });

  it('does not overwrite existing component files', async () => {
    // Pre-create a file with custom content
    const existingPath = path.join(
      tmpDir,
      'src/components/kobana/composites/status-badge/status-badge.tsx',
    );
    await fs.ensureDir(path.dirname(existingPath));
    await fs.writeFile(existingPath, '// custom local modification');

    // Install — should not overwrite
    const resolved = resolveDependencies(['status-badge'], mockRegistry, config.installed);
    for (const { slug, component } of resolved.kobana) {
      await installComponent(component, slug, config, sourceDir, tmpDir);
    }

    const content = await fs.readFile(existingPath, 'utf-8');
    expect(content).toBe('// custom local modification');
  });

  it('rewrites imports in installed files to match project aliases', async () => {
    const customConfig: KobanaConfig = {
      ...config,
      alias: '~/lib/kobana',
      shadcnAlias: '~/lib/ui',
    };

    const resolved = resolveDependencies(['status-badge'], mockRegistry, customConfig.installed);
    for (const { slug, component } of resolved.kobana) {
      await installComponent(component, slug, customConfig, sourceDir, tmpDir);
    }

    const content = await fs.readFile(
      path.join(tmpDir, 'src/components/kobana/composites/status-badge/status-badge.tsx'),
      'utf-8',
    );
    expect(content).toContain('~/lib/ui/button');
    expect(content).not.toContain('@/components/ui/button');
  });
});
