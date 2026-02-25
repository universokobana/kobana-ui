import { describe, it, expect } from 'vitest';
import { resolveDependencies } from '../../src/cli/utils/resolver.js';
import { Registry } from '../../src/cli/utils/registry.js';

const mockRegistry: Registry = {
  name: '@kobana/ui',
  version: '0.1.0',
  components: {
    'status-badge': {
      name: 'StatusBadge',
      description: 'Status badge',
      category: 'composite',
      version: '0.1.0',
      files: ['src/components/composites/status-badge/status-badge.tsx'],
      dependencies: { shadcn: ['badge'], kobana: [], npm: [] },
    },
    'filter-bar': {
      name: 'FilterBar',
      description: 'Filter bar',
      category: 'composite',
      version: '0.1.0',
      files: ['src/components/composites/filter-bar/filter-bar.tsx'],
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
    'circular-a': {
      name: 'CircularA',
      description: 'Circular A',
      category: 'composite',
      version: '0.1.0',
      files: [],
      dependencies: { shadcn: [], kobana: ['circular-b'], npm: [] },
    },
    'circular-b': {
      name: 'CircularB',
      description: 'Circular B',
      category: 'composite',
      version: '0.1.0',
      files: [],
      dependencies: { shadcn: [], kobana: ['circular-a'], npm: [] },
    },
  },
};

describe('resolveDependencies', () => {
  it('resolves a simple component without kobana deps', () => {
    const result = resolveDependencies(['status-badge'], mockRegistry);
    expect(result.kobana).toHaveLength(1);
    expect(result.kobana[0].slug).toBe('status-badge');
    expect(result.shadcn).toEqual(['badge']);
    expect(result.npm).toEqual([]);
  });

  it('resolves transitive kobana dependencies', () => {
    const result = resolveDependencies(['data-table'], mockRegistry);
    const slugs = result.kobana.map((k) => k.slug);
    expect(slugs).toContain('filter-bar');
    expect(slugs).toContain('status-badge');
    expect(slugs).toContain('data-table');
    // Dependencies must come before the component that depends on them
    expect(slugs.indexOf('filter-bar')).toBeLessThan(slugs.indexOf('data-table'));
    expect(slugs.indexOf('status-badge')).toBeLessThan(slugs.indexOf('data-table'));
  });

  it('deduplicates already installed components', () => {
    const installed = { 'status-badge': { version: '0.1.0', installedAt: '2026-01-01' } };
    const result = resolveDependencies(['data-table'], mockRegistry, installed);
    const slugs = result.kobana.map((k) => k.slug);
    expect(slugs).not.toContain('status-badge');
    expect(slugs).toContain('filter-bar');
    expect(slugs).toContain('data-table');
  });

  it('collects all shadcn deps from the tree', () => {
    const result = resolveDependencies(['data-table'], mockRegistry);
    expect(result.shadcn).toContain('table');
    expect(result.shadcn).toContain('checkbox');
    expect(result.shadcn).toContain('input');
    expect(result.shadcn).toContain('select');
    expect(result.shadcn).toContain('button');
    expect(result.shadcn).toContain('badge');
  });

  it('collects all npm deps from the tree', () => {
    const result = resolveDependencies(['data-table'], mockRegistry);
    expect(result.npm).toContain('@tanstack/react-table');
  });

  it('detects circular dependencies', () => {
    expect(() => resolveDependencies(['circular-a'], mockRegistry)).toThrow(
      'Circular dependency detected',
    );
  });

  it('throws for unknown component', () => {
    expect(() => resolveDependencies(['nonexistent'], mockRegistry)).toThrow(
      'Component "nonexistent" not found',
    );
  });

  it('handles multiple components at once', () => {
    const result = resolveDependencies(['status-badge', 'filter-bar'], mockRegistry);
    const slugs = result.kobana.map((k) => k.slug);
    expect(slugs).toContain('status-badge');
    expect(slugs).toContain('filter-bar');
  });
});
