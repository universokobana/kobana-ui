import { lazy, type ComponentType } from "react"

export interface RegistryEntry {
  name: string
  component: React.LazyExoticComponent<ComponentType>
  sourceFile: string
}

function entry(
  name: string,
  loader: () => Promise<{ default: ComponentType }>,
): [string, RegistryEntry] {
  return [
    name,
    {
      name,
      component: lazy(loader),
      sourceFile: `examples/${name}.tsx`,
    },
  ]
}

const registry: Record<string, RegistryEntry> = Object.fromEntries([
  // Grupo 1 — Core composites
  entry("status-badge-demo", () => import("@/examples/status-badge-demo")),
  entry("status-badge-variants", () => import("@/examples/status-badge-variants")),
  entry("confirm-dialog-demo", () => import("@/examples/confirm-dialog-demo")),
  entry("page-header-demo", () => import("@/examples/page-header-demo")),
  entry("filter-bar-demo", () => import("@/examples/filter-bar-demo")),
  entry("form-section-demo", () => import("@/examples/form-section-demo")),
  entry("data-table-demo", () => import("@/examples/data-table-demo")),
  entry("empty-state-demo", () => import("@/examples/empty-state-demo")),
  entry("copy-cell-demo", () => import("@/examples/copy-cell-demo")),
  entry("currency-input-demo", () => import("@/examples/currency-input-demo")),
])

export function getRegistryEntry(name: string): RegistryEntry | undefined {
  return registry[name]
}

export function getRegistryEntries(): RegistryEntry[] {
  return Object.values(registry)
}
