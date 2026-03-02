import fs from 'fs-extra';
import path from 'path';

export interface ComponentDef {
  name: string;
  description: string;
  category: 'composite' | 'template' | 'hook' | 'token';
  version: string;
  files: string[];
  dependencies: {
    shadcn: string[];
    kobana: string[];
    npm: string[];
  };
}

export interface Registry {
  name: string;
  version: string;
  components: Record<string, ComponentDef>;
}

export async function fetchRegistry(registryUrl: string): Promise<Registry> {
  // If it's a local file path, read directly
  if (!registryUrl.startsWith('http')) {
    const content = await fs.readJSON(registryUrl);
    return content as Registry;
  }

  // For remote URLs, fetch
  const response = await fetch(registryUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as Registry;
}

export function getComponent(registry: Registry, name: string): ComponentDef | undefined {
  return registry.components[name];
}

export function listComponents(registry: Registry): Array<{ slug: string } & ComponentDef> {
  return Object.entries(registry.components).map(([slug, def]) => ({
    slug,
    ...def,
  }));
}

/**
 * Resolve the kobana-ui repo root directory.
 * Works both in development (src/cli/utils/) and after bundling (dist/).
 */
export function getRepoRoot(): string {
  const thisDir = path.dirname(new URL(import.meta.url).pathname);
  // After bundling: dist/ → go 1 level up
  // In source: src/cli/utils/ → go 3 levels up
  if (thisDir.endsWith('/dist') || thisDir.endsWith('\\dist')) {
    return path.resolve(thisDir, '..');
  }
  return path.resolve(thisDir, '../../..');
}

/**
 * Fetch registry from local path (relative to the kobana-ui repo root).
 * Used when running the CLI in development or when the registry is bundled.
 */
export async function fetchLocalRegistry(): Promise<Registry> {
  const registryPath = path.join(getRepoRoot(), 'registry/registry.json');
  return fetchRegistry(registryPath);
}

/**
 * Fetch a single file's content from the same remote base as the registry URL.
 *
 * Example:
 *   registryUrl = "https://raw.githubusercontent.com/kobana/ui/main/registry/registry.json"
 *   filePath    = "src/components/composites/status-badge/status-badge.tsx"
 *   → fetches    "https://raw.githubusercontent.com/kobana/ui/main/src/components/composites/status-badge/status-badge.tsx"
 */
export async function fetchFileContent(registryUrl: string, filePath: string): Promise<string> {
  const baseUrl = registryUrl.replace(/\/registry\/registry\.json$/, '');
  const fileUrl = `${baseUrl}/${filePath}`;
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${fileUrl}: ${response.status}`);
  }
  return response.text();
}
