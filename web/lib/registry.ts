import { lazy, type ComponentType } from "react"

export interface RegistryEntry {
  name: string
  component: React.LazyExoticComponent<ComponentType>
  sourceFile: string
}

const registry: Record<string, RegistryEntry> = {
  "status-badge-demo": {
    name: "status-badge-demo",
    component: lazy(() => import("@/examples/status-badge-demo")),
    sourceFile: "examples/status-badge-demo.tsx",
  },
}

export function getRegistryEntry(name: string): RegistryEntry | undefined {
  return registry[name]
}

export function getRegistryEntries(): RegistryEntry[] {
  return Object.values(registry)
}

export function registerExample(
  name: string,
  loader: () => Promise<{ default: ComponentType }>,
  sourceFile: string,
) {
  registry[name] = {
    name,
    component: lazy(loader),
    sourceFile,
  }
}
