# Implementation Log

> Auto-updated after each implementation cycle.

---

## Fase 0 — Setup do Projeto

### Inicialização + Build + Estrutura de diretórios

- Created `package.json` with scope `@kobana/ui`, type module, bin entry for CLI
- Created `tsconfig.json` targeting ES2022, moduleResolution bundler
- Created `tsconfig.build.json` extending base config
- Created `.gitignore`, `.eslintrc.json`, `.prettierrc`, `LICENSE`
- Installed dev deps: typescript, tsup, vitest, eslint, prettier, @types/node
- Installed CLI deps: commander, chalk, ora, prompts, execa, fs-extra, diff
- Created `tsup.config.ts` (entry: CLI, format: ESM, target: node18, shebang banner)
- Created CLI entry point `src/cli/index.ts` with commander
- Created full directory structure: src/cli, components, hooks, tokens, registry, stories, __tests__
- Validated `npm run build` and `npm run test` both pass

**Commit:** `74c9347`

---

## Fase 1 — CLI + Registry

### Registry + CLI Entry + Utilitários + Comandos + Testes

- Created `registry/schemas/component.schema.json` with JSON Schema validation
- Created `registry/registry.json` with 6 initial components (status-badge, confirm-dialog, page-header, filter-bar, form-section, data-table)
- Implemented CLI entry point with commander, registering init/add/list commands
- Utils:
  - `config.ts`: loadConfig, saveConfig, findConfigPath (searches up directories)
  - `registry.ts`: fetchRegistry (local + remote), getComponent, listComponents
  - `resolver.ts`: resolveDependencies with topological ordering, circular detection, deduplication
  - `installer.ts`: installComponent, rewriteImports, installShadcnDeps, installNpmDeps, detectPackageManager
- Command `init`: detects shadcn, interactive prompts, creates kobana.json + dir structure
- Command `add`: resolves full dep tree, installs shadcn/npm/kobana components, updates kobana.json
- Command `list`: shows components grouped by category with install status
- 24 tests: resolver (8), installer (8), config (7), setup (1)
- Build produces working CLI binary (`node dist/index.js --help`)

**Commit:** `28ff278`

### Comando init — Validação + Testes CLI restantes

- Added base dependency validation (react, tailwindcss) to init command
- Created `__tests__/cli/commands/init.test.ts` (6 tests): directory creation, config generation, shadcn detection, dependency validation
- Created `__tests__/cli/commands/add.test.ts` (6 tests): simple add, transitive deps, skip installed, config update, no-overwrite, import rewriting
- Created `__tests__/cli/e2e.test.ts` (4 tests): full init+add flow with real registry
- Total: 40 tests passing

**Commit:** `14e5741`

---

## Fase 2 — Compostos Tier 1

### Design Tokens + StatusBadge + ConfirmDialog + PageHeader + FilterBar + FormSection + DataTable

- **Tokens:** colors.ts (8 semantic status colors with CSS vars for light/dark), spacing.ts (4px base scale), typography.ts (font sizes, weights, line heights). Registered in registry as `tokens` component.
- **StatusBadge:** Configurable status→color/icon mapping. Props: status, label, size, icon, statusConfig, className. Supports custom status strings via statusConfig prop. Uses forwardRef.
- **ConfirmDialog:** Three variants (danger/warning/info) with variant-specific icon and button colors. Async onConfirm support with auto loading state. Uses AlertDialog from shadcn. forwardRef.
- **PageHeader:** Breadcrumbs with links, back button, title/description, actions slot. Uses shadcn Breadcrumb. forwardRef.
- **FilterBar:** Five filter types (text, select, multi-select, date-range, custom). Active filter count badge. Clear all button. Uses shadcn Input, Select, Popover, Calendar, Button, Badge. forwardRef.
- **FormSection:** Responsive grid (1/2/3 columns) with mobile-first breakpoints. Title, description, separator. forwardRef.
- **DataTable:** 9 sub-components:
  - data-table.tsx — main component with TanStack React Table
  - data-table-toolbar.tsx — search, refresh, column visibility toggle
  - data-table-pagination.tsx — page navigation, per-page selector, selected count
  - data-table-actions.tsx — per-row dropdown with normal/destructive actions
  - data-table-bulk-actions.tsx — bulk actions bar when rows selected
  - data-table-column-header.tsx — sortable headers with sort/hide dropdown
  - data-table-empty.tsx — empty state row
  - data-table-loading.tsx — skeleton loading rows
  - index.ts — exports all components and types
- All composites accept `className`, use `forwardRef` where applicable, export named types
- Registry updated with tokens component

**Commit:** `8fcbe58`

---

## Fase 3 — Compostos Tier 2 + Hooks

### Hooks + CopyCell + CurrencyInput + AddressFormFields + EntityCombobox + EmptyState

- **useDataTable:** Encapsulates TanStack Table state (sorting, filtering, pagination, selection). Supports server-side mode.
- **useFilters:** Filter state management with URL sync (toSearchParams, fromSearchParams, activeCount).
- **usePagination:** Server-side pagination with page/perPage/offset. Resets page on perPage change.
- **useDebounce:** Generic debounce hook (default 300ms).
- **CopyCell:** Truncated value display with copy-to-clipboard, 2s feedback, tooltip with full value. forwardRef.
- **CurrencyInput:** Value in cents, auto-formats to locale currency. Supports BRL/USD. forwardRef.
- **AddressFormFields:** 7 fields (CEP, state, city, street, number, complement, neighborhood). CEP auto-lookup via ViaCEP. State combobox (27 BR states). City combobox (IBGE API, depends on state). Customizable field names and API URLs.
- **EntityCombobox:** Generic async search combobox with 300ms debounce. Configurable render functions for items and selection.
- **EmptyState:** Centered layout with icon, title, description, action button. forwardRef.
- Registry updated with 11 new entries (6 composites + 4 hooks + 1 token already added in Phase 2).

**Commit:** `75289e8`

---

## Fase 4 — Templates

### ListPage + DetailPage + FormPage

- **ListPage:** Composes PageHeader + DataTable + EmptyState. Props for header (title, description, breadcrumbs, primaryAction), DataTable (columns, data, filters, pagination, selection, actions), callbacks, and empty state. Shows EmptyState when data is empty and not loading.
- **DetailPage:** Composes PageHeader + optional Tabs. DetailSection sub-component with title, description, actions, 1-3 column grid. Loading skeleton state. Supports both tabbed and children-based layouts.
- **FormPage:** Composes PageHeader + sticky action bar + ConfirmDialog. Async onSubmit. Dirty guard with confirmation dialog when isDirty and user tries to leave. FormPageActions internal component for sticky footer.
- Registry updated with 3 templates: list-page (deps: data-table, page-header, empty-state), detail-page (deps: page-header + shadcn tabs/separator/skeleton), form-page (deps: page-header, confirm-dialog).

**Commit:** `22d33c1`

---

## Fase 5 — CLI Avançada

### Versionamento + Diff + Update

- **Versioning:** Every component in registry already has `version` field. Add command now saves hash (SHA-256, 12-char) alongside version and installedAt in kobana.json.
- **computeHash/computeComponentHash:** New utilities in installer.ts for content hashing.
- **diff command:** Colorized diff output (green additions, red deletions, cyan hunks). Supports specific components or `--all`. Shows version difference. Uses `diff` library's `createTwoFilesPatch`.
- **update command:** Full update flow — fetches registry, compares files, shows diff, detects local modifications (hash mismatch), asks confirmation, applies updates, saves new hash. Flags: `--all` (update all), `--force` (skip confirmation), `--dry-run` (show without applying).
- CLI entry point updated to register diff and update commands (5 commands total: init, add, list, diff, update).

**Commit:** `22bdada`
