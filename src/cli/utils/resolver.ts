import { Registry, getComponent, ComponentDef } from './registry.js';

export interface ResolvedDependencies {
  /** Kobana components to install, in dependency order (deps first) */
  kobana: Array<{ slug: string; component: ComponentDef }>;
  /** All shadcn components needed (deduplicated) */
  shadcn: string[];
  /** All npm packages needed (deduplicated) */
  npm: string[];
}

export function resolveDependencies(
  componentNames: string[],
  registry: Registry,
  installed: Record<string, unknown> = {},
): ResolvedDependencies {
  const kobanaOrder: Array<{ slug: string; component: ComponentDef }> = [];
  const allShadcn = new Set<string>();
  const allNpm = new Set<string>();
  const visited = new Set<string>();
  const inStack = new Set<string>();

  function resolve(slug: string): void {
    if (visited.has(slug)) return;

    if (inStack.has(slug)) {
      throw new Error(`Circular dependency detected: ${slug}`);
    }

    const component = getComponent(registry, slug);
    if (!component) {
      throw new Error(`Component "${slug}" not found in registry.`);
    }

    inStack.add(slug);

    // Resolve kobana dependencies first (depth-first)
    for (const dep of component.dependencies.kobana) {
      resolve(dep);
    }

    inStack.delete(slug);
    visited.add(slug);

    // Collect shadcn deps
    for (const dep of component.dependencies.shadcn) {
      allShadcn.add(dep);
    }

    // Collect npm deps
    for (const dep of component.dependencies.npm) {
      allNpm.add(dep);
    }

    // Add to install list if not already installed
    if (!installed[slug]) {
      kobanaOrder.push({ slug, component });
    }
  }

  for (const name of componentNames) {
    resolve(name);
  }

  return {
    kobana: kobanaOrder,
    shadcn: Array.from(allShadcn),
    npm: Array.from(allNpm),
  };
}
