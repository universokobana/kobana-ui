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
 * Fetch registry from local path (relative to the kobana-ui repo root).
 * Used when running the CLI in development or when the registry is bundled.
 */
export async function fetchLocalRegistry(): Promise<Registry> {
  const registryPath = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    '../../../registry/registry.json',
  );
  return fetchRegistry(registryPath);
}
