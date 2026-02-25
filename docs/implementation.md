# @kobana/ui — Plano de Implementação

Estado atual: **greenfield** — apenas documentação existe, zero código.

Baseado em: `docs/kobana-ui-design-system-v2.md` e `docs/component-catalog.md`

---

## Visão Geral

| Fase | Escopo | Duração | Entregável |
|------|--------|---------|------------|
| **0** | Setup do projeto | 2 dias | Repo funcional com build, lint, test |
| **1** | CLI + Registry | 1.5 semanas | `npx @kobana/ui init`, `add`, `list` |
| **2** | Compostos Tier 1 | 2 semanas | DataTable, PageHeader, FilterBar, StatusBadge, ConfirmDialog, FormSection |
| **3** | Compostos Tier 2 + Hooks | 1.5 semanas | CopyIdCell, AddressFormFields, Comboboxes, CurrencyInput, hooks |
| **4** | Templates | 1 semana | ListPage, DetailPage, FormPage |
| **5** | CLI avançada | 1 semana | `update`, `diff`, versionamento por componente |
| **6** | Storybook + Docs | 1 semana | Storybook com todos os componentes documentados |
| **7** | Adoção | contínuo | ESLint rules, migração, workshop |

**Total estimado: ~8 semanas**

---

## Fase 0 — Setup do Projeto (2 dias)

O objetivo é ter um repositório funcional com tooling configurado antes de escrever qualquer componente ou CLI.

### 0.1 Inicialização do repositório

```
kobana-ui/
  package.json
  tsconfig.json
  tsconfig.build.json
  .eslintrc.json
  .prettierrc
  .gitignore
  turbo.json              # (se monorepo no futuro)
  LICENSE
```

**package.json:**
```json
{
  "name": "@kobana/ui",
  "version": "0.1.0",
  "description": "Kobana Design System — CLI + Registry",
  "type": "module",
  "bin": {
    "kobana-ui": "./dist/cli/index.js"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "test": "vitest",
    "test:run": "vitest run",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "prepublishOnly": "npm run build"
  }
}
```

**Dependências de desenvolvimento:**
- `typescript`, `tsup` (bundler para CLI)
- `vitest` (testes)
- `eslint`, `prettier`
- `@types/node`

**Dependências da CLI (runtime):**
- `commander` — parsing de comandos
- `chalk` — output colorido
- `ora` — spinners
- `prompts` — perguntas interativas
- `execa` — execução de comandos shell (instalar shadcn, npm packages)
- `fs-extra` — operações de filesystem
- `diff` — gerar diffs para comando update

### 0.2 Estrutura de diretórios

```
kobana-ui/
  src/
    cli/
      index.ts
      commands/
      utils/
    components/
      composites/
      templates/
    hooks/
    tokens/
  registry/
    registry.json
    schemas/
      component.schema.json
  stories/
    composites/
    templates/
  __tests__/
    cli/
    components/
  docs/
```

### 0.3 Build config

**tsup.config.ts** — Compila apenas a CLI (componentes são copiados como source):
```typescript
export default defineConfig({
  entry: ['src/cli/index.ts'],
  format: ['esm'],
  target: 'node18',
  clean: true,
  dts: false,
  shims: true,
  banner: { js: '#!/usr/bin/env node' }
});
```

### 0.4 Checklist da Fase 0

- [ ] `npm init` com escopo `@kobana`
- [ ] tsconfig.json (target ES2022, moduleResolution bundler)
- [ ] tsup configurado para CLI
- [ ] vitest configurado
- [ ] eslint + prettier
- [ ] .gitignore (node_modules, dist, .next, coverage)
- [ ] Estrutura de diretórios criada
- [ ] `npm run build` funciona sem erros
- [ ] `npm run test` funciona (mesmo sem testes ainda)

---

## Fase 1 — CLI + Registry (1.5 semanas)

### 1.1 Registry JSON (Dia 1)

Criar `registry/registry.json` com a estrutura base e o schema de validação.

**registry/schemas/component.schema.json:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["name", "description", "category", "files", "dependencies"],
  "properties": {
    "name": { "type": "string" },
    "description": { "type": "string" },
    "category": { "enum": ["composite", "template", "hook", "token"] },
    "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
    "files": {
      "type": "array",
      "items": { "type": "string" }
    },
    "dependencies": {
      "type": "object",
      "properties": {
        "shadcn": { "type": "array", "items": { "type": "string" } },
        "kobana": { "type": "array", "items": { "type": "string" } },
        "npm": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```

**registry/registry.json** — iniciar com os componentes da Fase 2:
```json
{
  "$schema": "./schemas/component.schema.json",
  "name": "@kobana/ui",
  "version": "0.1.0",
  "components": {
    "status-badge": { ... },
    "confirm-dialog": { ... },
    "page-header": { ... },
    "filter-bar": { ... },
    "form-section": { ... },
    "data-table": { ... }
  }
}
```

### 1.2 CLI — Estrutura base (Dia 1-2)

**src/cli/index.ts:**
```typescript
import { Command } from 'commander';
const program = new Command();

program
  .name('kobana-ui')
  .description('Kobana Design System CLI')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);

program.parse();
```

### 1.3 Comando `init` (Dia 2-3)

**src/cli/commands/init.ts**

Responsabilidades:
1. Detectar se shadcn está configurado (procurar `components.json`)
2. Perguntar interativamente: pasta de componentes, TypeScript, alias de import
3. Criar pasta `src/components/kobana/` (composites, templates, hooks, tokens)
4. Gerar `kobana.json` na raiz do projeto
5. Validar que as dependências base existem (react, tailwindcss)

**Fluxo:**
```
$ npx @kobana/ui init

  ◆ Onde ficam seus componentes? (src/components)
  ◆ Usar TypeScript? (sim)
  ◆ Alias de import? (@/components/kobana)
  ◆ shadcn detectado ✓

  ✔ Criado kobana.json
  ✔ Criado src/components/kobana/composites/
  ✔ Criado src/components/kobana/templates/
  ✔ Criado src/components/kobana/hooks/
  ✔ Pronto!
```

**Arquivo gerado — kobana.json:**
```json
{
  "$schema": "https://raw.githubusercontent.com/kobana/ui/main/registry/schemas/config.schema.json",
  "componentDir": "src/components/kobana",
  "typescript": true,
  "alias": "@/components/kobana",
  "shadcnAlias": "@/components/ui",
  "registry": "https://raw.githubusercontent.com/kobana/ui/main/registry/registry.json",
  "installed": {}
}
```

### 1.4 Utilitários da CLI (Dia 3-4)

**src/cli/utils/config.ts** — Ler/escrever `kobana.json`:
- `loadConfig()` — lê e valida kobana.json
- `saveConfig()` — escreve kobana.json
- `findConfigPath()` — busca kobana.json subindo diretórios

**src/cli/utils/registry.ts** — Fetch e parse do registry:
- `fetchRegistry()` — baixa registry.json (remote ou local)
- `getComponent(name)` — retorna definição de um componente
- `listComponents()` — lista todos os componentes disponíveis

**src/cli/utils/resolver.ts** — Resolução de dependências:
- `resolveDependencies(componentName)` — retorna árvore completa (shadcn + kobana + npm)
- Detecção de dependências circulares
- Deduplicação de dependências já instaladas

**src/cli/utils/installer.ts** — Cópia de arquivos:
- `installComponent(component, config)` — copia arquivos para pasta destino
- `rewriteImports(content, config)` — reescreve paths de import baseado no alias
- `installShadcnDeps(deps)` — roda `npx shadcn@latest add ...`
- `installNpmDeps(deps)` — roda `npm install ...` ou `pnpm add ...`
- Detecção de package manager (npm/pnpm/yarn/bun)

### 1.5 Comando `add` (Dia 4-5)

**src/cli/commands/add.ts**

Responsabilidades:
1. Ler kobana.json
2. Buscar componente(s) no registry
3. Resolver árvore de dependências completa
4. Verificar o que já está instalado (skip duplicatas)
5. Instalar dependências shadcn (via `npx shadcn@latest add`)
6. Instalar dependências npm
7. Copiar arquivos kobana para pasta destino
8. Reescrever imports (ajustar alias)
9. Atualizar `installed` no kobana.json

**Fluxo:**
```
$ npx @kobana/ui add data-table

  ◇ Resolvendo dependências...

  Será instalado:
    shadcn: table, checkbox, dropdown-menu, skeleton
    kobana: filter-bar, status-badge, data-table
    npm: @tanstack/react-table

  ◆ Continuar? (sim)

  ✔ shadcn: table, checkbox, dropdown-menu, skeleton
  ✔ kobana: filter-bar → src/components/kobana/composites/filter-bar/
  ✔ kobana: status-badge → src/components/kobana/composites/status-badge/
  ✔ kobana: data-table → src/components/kobana/composites/data-table/
  ✔ npm: @tanstack/react-table
  ✔ 3 componentes adicionados.
```

### 1.6 Comando `list` (Dia 5)

**src/cli/commands/list.ts**

Responsabilidades:
1. Ler kobana.json para saber o que está instalado
2. Buscar registry para listar tudo
3. Exibir agrupado por categoria com status (✔ instalado / ○ disponível)

### 1.7 Testes da CLI (Dia 5-7)

**__tests__/cli/**

Testes unitários com vitest:

- `resolver.test.ts`
  - Resolve dependência simples (componente sem deps kobana)
  - Resolve dependência com deps kobana transitivas
  - Detecta dependência circular
  - Deduplica deps já instaladas
  - Coleta todas as deps shadcn da árvore
  - Coleta todas as deps npm da árvore

- `installer.test.ts`
  - Copia arquivos para pasta correta
  - Reescreve imports de shadcn
  - Reescreve imports de kobana
  - Não sobrescreve componente já existente (sem flag force)
  - Detecta package manager do projeto

- `config.test.ts`
  - Lê kobana.json válido
  - Falha em kobana.json inválido
  - Encontra kobana.json subindo diretórios

- `commands/init.test.ts`
  - Cria estrutura de pastas
  - Gera kobana.json com valores padrão
  - Detecta shadcn existente

- `commands/add.test.ts`
  - Adiciona componente simples
  - Adiciona componente com deps
  - Pula componente já instalado
  - Atualiza kobana.json após instalação

### 1.8 Checklist da Fase 1

- [ ] registry.json com schema e 6 componentes iniciais
- [ ] CLI entry point com commander
- [ ] Comando `init` funcional
- [ ] Utilitários: config, registry, resolver, installer
- [ ] Comando `add` funcional
- [ ] Comando `list` funcional
- [ ] Rewrite de imports funcionando
- [ ] Detecção de package manager
- [ ] Testes cobrindo resolver, installer, config
- [ ] `npm run build` gera CLI funcional
- [ ] Teste end-to-end: init + add em projeto limpo

---

## Fase 2 — Compostos Tier 1 (2 semanas)

Ordem de implementação baseada em dependências (bottom-up):

### 2.1 Design Tokens (Dia 1)

**src/tokens/colors.ts**
```typescript
export const statusColors = {
  success: 'var(--color-status-success)',
  warning: 'var(--color-status-warning)',
  error: 'var(--color-status-error)',
  info: 'var(--color-status-info)',
} as const;
```

**src/tokens/spacing.ts** — Escala 4px base.

**src/tokens/typography.ts** — Font sizes, weights, line heights.

**CSS variables** (instaladas via `npx @kobana/ui add tokens`):
```css
@layer base {
  :root {
    --color-status-success: oklch(0.72 0.19 142);
    --color-status-warning: oklch(0.75 0.18 85);
    --color-status-error: oklch(0.63 0.24 25);
    --color-status-info: oklch(0.7 0.15 250);
  }
}
```

### 2.2 StatusBadge (Dia 2)

**Sem dependências kobana** — ponto de partida ideal.

**src/components/composites/status-badge/**
- `status-badge.tsx`
- `index.ts`

**Deps shadcn:** badge
**Deps npm:** nenhuma

**Referência:** `kobana-billing/components/nfe/nfe-status-badge.tsx`

Generalizar para suportar status genéricos:
```typescript
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'processing' | string;
  label?: string;
  size?: 'sm' | 'md';
  icon?: boolean;
  className?: string;
}
```

**Mapeamento de status → cor/ícone:** configurável via prop `statusConfig` para domínios específicos.

### 2.3 ConfirmDialog (Dia 3)

**Sem dependências kobana.**

**src/components/composites/confirm-dialog/**
- `confirm-dialog.tsx`
- `index.ts`

**Deps shadcn:** alert-dialog, button
**Deps npm:** nenhuma

**Referência:** Padrão recorrente no kobana-billing (dialogs de exclusão, cancelamento).

```typescript
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: 'danger' | 'warning' | 'info';
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  children?: ReactNode; // trigger
}
```

### 2.4 PageHeader (Dia 4)

**Sem dependências kobana.**

**src/components/composites/page-header/**
- `page-header.tsx`
- `index.ts`

**Deps shadcn:** breadcrumb, button
**Deps npm:** nenhuma

**Referência:** Padrão em ~50 páginas do kobana-billing.

```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: ReactNode;
  backHref?: string;
  className?: string;
}
```

### 2.5 FilterBar (Dia 5-6)

**Sem dependências kobana.**

**src/components/composites/filter-bar/**
- `filter-bar.tsx`
- `filter-bar-types.ts`
- `index.ts`

**Deps shadcn:** input, select, popover, calendar, button, badge
**Deps npm:** nenhuma

**Referência:** `kobana-billing/components/ui/data-table.tsx` (parte de filtros).

```typescript
type FilterType = 'text' | 'select' | 'multi-select' | 'date-range' | 'custom';

interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  component?: ReactNode; // para type: 'custom'
}

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onClear?: () => void;
  className?: string;
}
```

### 2.6 FormSection (Dia 7)

**Sem dependências kobana.**

**src/components/composites/form-section/**
- `form-section.tsx`
- `index.ts`

**Deps shadcn:** separator
**Deps npm:** nenhuma

**Referência:** Padrão em ~15 páginas de formulário do kobana-billing.

```typescript
interface FormSectionProps {
  title: string;
  description?: string;
  columns?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}
```

### 2.7 DataTable (Dia 8-12)

O componente mais complexo e crítico. **Última a ser implementada** na Fase 2 porque depende de FilterBar e StatusBadge.

**src/components/composites/data-table/**
- `data-table.tsx` — componente principal
- `data-table-toolbar.tsx` — busca + filtros + column visibility
- `data-table-pagination.tsx` — paginação com page size
- `data-table-actions.tsx` — ações por linha (dropdown)
- `data-table-bulk-actions.tsx` — ações em massa
- `data-table-column-header.tsx` — header sortável
- `data-table-empty.tsx` — estado vazio
- `data-table-loading.tsx` — skeleton loading
- `index.ts`

**Deps shadcn:** table, checkbox, dropdown-menu, skeleton, button, select
**Deps kobana:** filter-bar, status-badge
**Deps npm:** @tanstack/react-table

**Referência principal:** `kobana-billing/components/ui/data-table.tsx`

```typescript
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // Busca
  searchKey?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;

  // Filtros
  filters?: FilterConfig[];
  filterValues?: Record<string, any>;
  onFilterChange?: (values: Record<string, any>) => void;

  // Paginação
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;

  // Seleção
  selectable?: boolean;
  bulkActions?: Array<{
    label: string;
    icon?: ReactNode;
    onClick: (rows: TData[]) => void;
    variant?: 'default' | 'destructive';
  }>;

  // Ações por linha
  rowActions?: Array<{
    label: string;
    icon?: ReactNode;
    onClick: (row: TData) => void;
    variant?: 'default' | 'destructive';
    hidden?: (row: TData) => boolean;
  }>;

  // Estados
  isLoading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (row: TData) => void;
  onRefresh?: () => void;

  // Colunas
  columnLabels?: Record<string, string>;

  className?: string;
}
```

### 2.8 Checklist da Fase 2

- [ ] Design tokens (colors, spacing, typography)
- [ ] StatusBadge com variantes e ícones
- [ ] ConfirmDialog com variants (danger, warning, info) e async onConfirm
- [ ] PageHeader com breadcrumbs e ações
- [ ] FilterBar com tipos: text, select, multi-select, date-range, custom
- [ ] FormSection com grid de 1-3 colunas
- [ ] DataTable completo (toolbar, pagination, sorting, selection, actions, empty, loading)
- [ ] Todos os componentes aceitam `className`
- [ ] Todos usam `forwardRef` onde aplicável
- [ ] Props exportadas como tipos nomeados
- [ ] Registry atualizado com todos os componentes e deps
- [ ] Testes da CLI: `add` de cada componente em projeto limpo

---

## Fase 3 — Compostos Tier 2 + Hooks (1.5 semanas)

### 3.1 Hooks (Dia 1-2)

**src/hooks/use-data-table.ts**
Hook que encapsula o estado do DataTable (sorting, filtering, pagination, selection):
```typescript
function useDataTable<TData>(options: {
  data: TData[];
  columns: ColumnDef<TData>[];
  serverSide?: boolean;
  defaultPageSize?: number;
}): {
  table: Table<TData>;
  sorting: SortingState;
  filtering: ColumnFiltersState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
}
```

**src/hooks/use-filters.ts**
Hook para gerenciar estado de filtros com URL sync:
```typescript
function useFilters(config: FilterConfig[]): {
  values: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  clearAll: () => void;
  activeCount: number;
  toSearchParams: () => URLSearchParams;
  fromSearchParams: (params: URLSearchParams) => void;
}
```

**src/hooks/use-pagination.ts**
Hook para paginação server-side:
```typescript
function usePagination(options?: {
  defaultPage?: number;
  defaultPerPage?: number;
  syncUrl?: boolean;
}): {
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  offset: number;
}
```

**src/hooks/use-debounce.ts**
```typescript
function useDebounce<T>(value: T, delay?: number): T
```

### 3.2 CopyCell (Dia 3)

**src/components/composites/copy-cell/**
- `copy-cell.tsx`
- `index.ts`

**Deps shadcn:** button, tooltip
**Referência:** `kobana-billing/components/manage/copy-id-cell.tsx`

```typescript
interface CopyCellProps {
  value: string;
  truncate?: number;
  className?: string;
}
```

### 3.3 CurrencyInput (Dia 3)

**src/components/composites/currency-input/**
- `currency-input.tsx`
- `index.ts`

**Deps shadcn:** input
**Referência:** `kobana-billing/components/ui/currency-input.tsx`

```typescript
interface CurrencyInputProps {
  value: number; // em centavos
  onChange: (value: number) => void;
  currency?: string; // default: 'BRL'
  locale?: string;
  disabled?: boolean;
  className?: string;
}
```

### 3.4 AddressFormFields (Dia 4-5)

**src/components/composites/address-form-fields/**
- `address-form-fields.tsx`
- `state-combobox.tsx`
- `city-combobox.tsx`
- `index.ts`

**Deps shadcn:** form, input, popover, command
**Deps npm:** nenhuma (usa fetch nativo para API de CEP)
**Referência:** `kobana-billing/components/forms/address-form-fields.tsx`

Generalizar para:
- CEP lookup configurável (endpoint customizável)
- Fieldnames mapeáveis para diferentes schemas de form
- Funcionar com qualquer react-hook-form

### 3.5 EntityCombobox (Dia 6)

Componente genérico de combobox com busca assíncrona. Substitui os vários comboboxes específicos (Customer, Company, etc).

**src/components/composites/entity-combobox/**
- `entity-combobox.tsx`
- `index.ts`

**Deps shadcn:** popover, command, button
**Referência:** Padrão comum em CustomerCombobox, CompanySelector, BillingAccountCombobox.

```typescript
interface EntityComboboxProps<T> {
  value: string;
  onChange: (value: string, entity?: T) => void;
  onSearch: (query: string) => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  renderSelected?: (item: T) => ReactNode;
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}
```

### 3.6 EmptyState (Dia 7)

**src/components/composites/empty-state/**
- `empty-state.tsx`
- `index.ts`

**Deps shadcn:** button

```typescript
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  className?: string;
}
```

### 3.7 Checklist da Fase 3

- [ ] useDataTable hook com sorting, filtering, pagination, selection
- [ ] useFilters hook com URL sync
- [ ] usePagination hook com URL sync
- [ ] useDebounce hook
- [ ] CopyCell com truncate e tooltip
- [ ] CurrencyInput com formatação BRL/USD
- [ ] AddressFormFields com CEP lookup e comboboxes
- [ ] EntityCombobox genérico com busca async
- [ ] EmptyState com ícone, título, descrição e ação
- [ ] Registry atualizado
- [ ] Testes dos hooks

---

## Fase 4 — Templates (1 semana)

### 4.1 ListPage (Dia 1-3)

**src/components/templates/list-page/**
- `list-page.tsx`
- `index.ts`

**Deps kobana:** data-table, page-header, confirm-dialog, empty-state

```typescript
interface ListPageProps<TData> {
  // Header
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };

  // DataTable
  columns: ColumnDef<TData>[];
  data: TData[];
  filters?: FilterConfig[];
  searchKey?: string;
  searchPlaceholder?: string;
  pagination?: PaginationConfig;
  selectable?: boolean;
  bulkActions?: BulkAction[];
  rowActions?: RowAction<TData>[];

  // Callbacks
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (values: Record<string, any>) => void;
  onRowClick?: (row: TData) => void;
  onRefresh?: () => void;

  // Estados
  isLoading?: boolean;
  emptyState?: {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}
```

**O que o template faz automaticamente:**
- Monta PageHeader com título, breadcrumbs e botão de ação primária
- Configura FilterBar se `filters` fornecido
- Configura DataTable com todas as props passadas
- Exibe EmptyState quando `data` vazio
- Mostra skeleton quando `isLoading`

### 4.2 DetailPage (Dia 3-4)

**src/components/templates/detail-page/**
- `detail-page.tsx`
- `detail-section.tsx`
- `index.ts`

**Deps kobana:** page-header, confirm-dialog

```typescript
interface DetailPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: ReactNode;
  backHref?: string;
  tabs?: Array<{ value: string; label: string; content: ReactNode }>;
  children?: ReactNode; // se sem tabs
  isLoading?: boolean;
}

interface DetailSectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  columns?: 1 | 2 | 3;
  children: ReactNode;
}
```

### 4.3 FormPage (Dia 4-5)

**src/components/templates/form-page/**
- `form-page.tsx`
- `form-page-actions.tsx`
- `index.ts`

**Deps kobana:** page-header, form-section, confirm-dialog

```typescript
interface FormPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  backHref?: string;
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isDirty?: boolean; // mostra ConfirmDialog ao sair
  children: ReactNode;
}
```

**O que o template faz automaticamente:**
- Monta PageHeader com breadcrumbs
- Renderiza children (FormSections)
- Barra de ações sticky no rodapé (cancelar / salvar)
- ConfirmDialog se isDirty e tentou sair

### 4.4 Checklist da Fase 4

- [ ] ListPage compondo PageHeader + DataTable + EmptyState
- [ ] DetailPage com tabs opcionais e DetailSection
- [ ] FormPage com barra sticky e guard de navegação
- [ ] Registry atualizado com templates e deps
- [ ] Teste end-to-end: `add list-page` instala tudo

---

## Fase 5 — CLI Avançada (1 semana)

### 5.1 Versionamento por componente (Dia 1)

Adicionar campo `version` a cada componente no registry:
```json
{
  "data-table": {
    "version": "1.0.0",
    ...
  }
}
```

Salvar versão instalada no `kobana.json`:
```json
{
  "installed": {
    "data-table": { "version": "1.0.0", "installedAt": "2026-03-01" },
    "page-header": { "version": "1.0.0", "installedAt": "2026-03-01" }
  }
}
```

### 5.2 Comando `diff` (Dia 2-3)

**src/cli/commands/diff.ts**

1. Ler versão local do arquivo
2. Buscar versão do registry
3. Gerar diff colorido com a lib `diff`
4. Exibir no terminal

```
$ npx @kobana/ui diff data-table

  data-table (local: 1.0.0 → registry: 1.1.0)

  --- local/data-table.tsx
  +++ registry/data-table.tsx
  @@ -42,7 +42,9 @@
  - <div className="flex items-center">
  + <div className="flex items-center gap-2">
  +   <RefreshButton onClick={onRefresh} />
```

### 5.3 Comando `update` (Dia 3-5)

**src/cli/commands/update.ts**

1. Comparar versões locais vs registry
2. Listar componentes desatualizados
3. Para cada um, mostrar diff
4. Pedir confirmação
5. Se confirmado, sobrescrever arquivo
6. Se componente foi modificado localmente, avisar e pedir merge manual
7. Atualizar versão no kobana.json

Flags:
- `--all` — atualizar todos
- `--force` — sobrescrever sem confirmação
- `--dry-run` — mostrar o que seria atualizado sem aplicar

### 5.4 Detecção de modificação local

Calcular hash do arquivo quando instalado, salvar no kobana.json:
```json
{
  "installed": {
    "data-table": {
      "version": "1.0.0",
      "hash": "a1b2c3d4",
      "modified": false
    }
  }
}
```

No `update`, comparar hash atual vs salvo. Se diferente → componente foi customizado localmente.

### 5.5 Checklist da Fase 5

- [ ] Campo version em cada componente do registry
- [ ] Hash de arquivo no kobana.json
- [ ] Comando `diff` com output colorido
- [ ] Comando `update` com confirmação e merge-safe
- [ ] Flag `--all`, `--force`, `--dry-run`
- [ ] Detecção de modificação local
- [ ] Testes dos novos comandos

---

## Fase 6 — Storybook + Docs (1 semana)

### 6.1 Setup do Storybook (Dia 1)

```bash
npx storybook@latest init --type react
```

Configurar:
- Tailwind CSS no Storybook
- Dark mode toggle
- Viewport addon (mobile/desktop)
- a11y addon
- autodocs

### 6.2 Stories dos Compostos (Dia 2-4)

Para cada componente, criar stories cobrindo:

| Story | O que mostra |
|-------|-------------|
| Default | Estado padrão |
| Variants | Todas as variantes de props |
| Loading | Estado de carregamento |
| Empty | Estado vazio |
| Error | Estado de erro |
| Responsive | Mobile vs desktop |
| Interactive | Ações e callbacks |

Estrutura:
```
stories/
  composites/
    StatusBadge.stories.tsx
    ConfirmDialog.stories.tsx
    PageHeader.stories.tsx
    FilterBar.stories.tsx
    FormSection.stories.tsx
    DataTable.stories.tsx
    CopyCell.stories.tsx
    CurrencyInput.stories.tsx
    AddressFormFields.stories.tsx
    EntityCombobox.stories.tsx
    EmptyState.stories.tsx
  templates/
    ListPage.stories.tsx
    DetailPage.stories.tsx
    FormPage.stories.tsx
```

### 6.3 Página de docs por componente (Dia 4-5)

Cada story deve incluir:
- Descrição do componente
- Comando CLI para instalar: `npx @kobana/ui add data-table`
- Tabela de props (via autodocs)
- Exemplos de uso correto
- Exemplos de uso incorreto (❌ o que não fazer)
- Dependências

### 6.4 Deploy do Storybook

Configurar deploy automático (GitHub Pages ou Vercel) no merge da main.

### 6.5 Checklist da Fase 6

- [ ] Storybook configurado com Tailwind + dark mode + a11y
- [ ] Stories para todos os 11 compostos
- [ ] Stories para todos os 3 templates
- [ ] Autodocs com tabela de props
- [ ] Exemplos de uso correto e incorreto
- [ ] Deploy automático configurado

---

## Fase 7 — Adoção (contínuo)

### 7.1 ESLint Rules

**Regra 1: no-direct-shadcn-table**
Avisa quando `Table` do shadcn é importado fora da pasta kobana:
```
⚠ Prefira usar DataTable do @kobana/ui ao invés de Table do shadcn diretamente.
  Instale com: npx @kobana/ui add data-table
```

**Regra 2: prefer-kobana-composite**
Sugere uso de compostos quando detecta padrões conhecidos:
- Import de AlertDialog + confirmação inline → sugere ConfirmDialog
- Import de Breadcrumb + heading manual → sugere PageHeader

### 7.2 Publicação no NPM

```bash
npm publish --access public
```

- Scope: `@kobana/ui`
- Inclui apenas: `dist/` (CLI compilada), `registry/`, `src/components/`, `src/hooks/`, `src/tokens/`
- NPM ignores: stories, tests, storybook, docs

### 7.3 Migração do kobana-billing (POC)

Migrar 3 telas como prova de conceito:

| Tela | Template | Componentes |
|------|----------|-------------|
| Listagem de subscriptions | ListPage | DataTable, PageHeader, FilterBar |
| Detalhe de subscription | DetailPage | PageHeader, StatusBadge, Tabs |
| Novo customer | FormPage | FormSection, AddressFormFields |

**Processo por tela:**
1. `npx @kobana/ui init` (uma vez)
2. `npx @kobana/ui add list-page` (ou template relevante)
3. Refatorar página para usar componentes kobana
4. Remover código duplicado antigo
5. Validar visualmente e funcionalmente

### 7.4 Workshop com o time

**Agenda (2h):**
1. (20min) Motivação e princípios do design system
2. (20min) Demo: CLI init + add + uso
3. (30min) Live coding: migrar uma tela juntos
4. (20min) Storybook tour: como consultar e contribuir
5. (30min) Hands-on: cada dev migra uma tela do seu domínio

### 7.5 Checklist da Fase 7

- [ ] ESLint plugin publicado como @kobana/eslint-plugin-ui
- [ ] @kobana/ui publicado no NPM
- [ ] 3 telas migradas no kobana-billing como POC
- [ ] Workshop realizado com o time
- [ ] Processo de contribuição documentado (como adicionar novo componente)

---

## Dependências entre Componentes

```
tokens (sem deps)

status-badge
└─ shadcn: badge

confirm-dialog
└─ shadcn: alert-dialog, button

page-header
└─ shadcn: breadcrumb, button

filter-bar
└─ shadcn: input, select, popover, calendar, button, badge

form-section
└─ shadcn: separator

empty-state
└─ shadcn: button

copy-cell
└─ shadcn: button, tooltip

currency-input
└─ shadcn: input

entity-combobox
└─ shadcn: popover, command, button

address-form-fields
├─ kobana: entity-combobox (ou state/city combobox internos)
└─ shadcn: form, input, popover, command

data-table
├─ kobana: filter-bar, status-badge
├─ shadcn: table, checkbox, dropdown-menu, skeleton, button, select
└─ npm: @tanstack/react-table

list-page
├─ kobana: data-table, page-header, confirm-dialog, empty-state
└─ shadcn: (herda dos compostos)

detail-page
├─ kobana: page-header, confirm-dialog
└─ shadcn: tabs, separator

form-page
├─ kobana: page-header, form-section, confirm-dialog
└─ shadcn: button
```

---

## Critérios de Qualidade

Cada componente entregue deve atender:

| Critério | Descrição |
|----------|-----------|
| **Props tipadas** | Interface exportada, generics onde aplicável |
| **className** | Aceita className para override via Tailwind |
| **forwardRef** | Em componentes que renderizam DOM |
| **Dark mode** | Funciona em ambos os temas |
| **Responsivo** | Funciona em mobile e desktop |
| **Acessível** | Keyboard navigation, ARIA labels |
| **Documentado** | Story no Storybook com todas as variantes |
| **Testado via CLI** | `npx @kobana/ui add [nome]` funciona em projeto limpo |
| **Registry atualizado** | Deps corretas no registry.json |

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| DataTable muito complexo | Alta | Alto | Implementar incrementalmente (MVP → features) |
| CLI quebra em projetos diferentes | Média | Alto | Testar com 3+ projetos reais (billing, portal, manage) |
| Imports não resolvem corretamente | Média | Alto | Testes automatizados de rewrite de imports |
| Time não adota | Média | Alto | Workshop + ESLint rules + POC convincente |
| Manutenção do registry | Baixa | Médio | Automação: script que valida registry vs arquivos |
| Breaking changes em shadcn | Baixa | Médio | Pin de versão do shadcn, testes de integração |
