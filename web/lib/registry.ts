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
  // Grupo 2 — Extended composites
  entry("number-input-demo", () => import("@/examples/number-input-demo")),
  entry("entity-combobox-demo", () => import("@/examples/entity-combobox-demo")),
  entry("address-form-fields-demo", () => import("@/examples/address-form-fields-demo")),
  entry("app-layout-demo", () => import("@/examples/app-layout-demo")),
  entry("app-header-demo", () => import("@/examples/app-header-demo")),
  entry("app-sidebar-demo", () => import("@/examples/app-sidebar-demo")),
  entry("theme-toggle-demo", () => import("@/examples/theme-toggle-demo")),
  entry("locale-toggle-demo", () => import("@/examples/locale-toggle-demo")),
  entry("require-permission-demo", () => import("@/examples/require-permission-demo")),
  entry("export-modal-demo", () => import("@/examples/export-modal-demo")),
  entry("import-modal-demo", () => import("@/examples/import-modal-demo")),
  entry("header-notifications-demo", () => import("@/examples/header-notifications-demo")),
  // Templates
  entry("list-page-demo", () => import("@/examples/list-page-demo")),
  entry("detail-page-demo", () => import("@/examples/detail-page-demo")),
  entry("form-page-demo", () => import("@/examples/form-page-demo")),
  entry("dashboard-login-page-demo", () => import("@/examples/dashboard-login-page-demo")),
  entry("portal-page-demo", () => import("@/examples/portal-page-demo")),
  entry("manage-list-page-demo", () => import("@/examples/manage-list-page-demo")),
  entry("manage-login-page-demo", () => import("@/examples/manage-login-page-demo")),
])

export function getRegistryEntry(name: string): RegistryEntry | undefined {
  return registry[name]
}

export function getRegistryEntries(): RegistryEntry[] {
  return Object.values(registry)
}
