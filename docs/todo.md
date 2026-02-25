# @kobana/ui — TODO

---

## Fase 0 — Setup do Projeto

### Inicialização
- [x] Criar `package.json` com escopo `@kobana/ui`
- [x] Criar `tsconfig.json` (target ES2022, moduleResolution bundler)
- [x] Criar `tsconfig.build.json`
- [x] Criar `.gitignore` (node_modules, dist, .next, coverage, storybook-static)
- [x] Criar `.eslintrc.json`
- [x] Criar `.prettierrc`
- [x] Criar `LICENSE`

### Build
- [x] Instalar dependências dev: `typescript`, `tsup`, `vitest`, `eslint`, `prettier`, `@types/node`
- [x] Instalar dependências CLI: `commander`, `chalk`, `ora`, `prompts`, `execa`, `fs-extra`, `diff`
- [x] Criar `tsup.config.ts` (entry: cli, format: esm, target: node18, banner: shebang)
- [x] Validar `npm run build` funciona sem erros
- [x] Validar `npm run test` funciona sem erros

### Estrutura de diretórios
- [x] Criar `src/cli/index.ts`
- [x] Criar `src/cli/commands/`
- [x] Criar `src/cli/utils/`
- [x] Criar `src/components/composites/`
- [x] Criar `src/components/templates/`
- [x] Criar `src/hooks/`
- [x] Criar `src/tokens/`
- [x] Criar `registry/`
- [x] Criar `registry/schemas/`
- [x] Criar `stories/composites/`
- [x] Criar `stories/templates/`
- [x] Criar `__tests__/cli/`
- [x] Criar `__tests__/components/`

---

## Fase 1 — CLI + Registry

### Registry
- [x] Criar `registry/schemas/component.schema.json`
- [x] Criar `registry/registry.json` com 6 componentes iniciais (status-badge, confirm-dialog, page-header, filter-bar, form-section, data-table)
- [x] Validar schema contra registry

### CLI — Entry point
- [x] `src/cli/index.ts` com commander (name, description, version)
- [x] Registrar comandos: init, add, list
- [x] Configurar bin no package.json

### CLI — Utilitários
- [x] `src/cli/utils/config.ts` — `loadConfig()`, `saveConfig()`, `findConfigPath()`
- [x] `src/cli/utils/registry.ts` — `fetchRegistry()`, `getComponent()`, `listComponents()`
- [x] `src/cli/utils/resolver.ts` — `resolveDependencies()`, detecção circular, deduplicação
- [x] `src/cli/utils/installer.ts` — `installComponent()`, `rewriteImports()`, `installShadcnDeps()`, `installNpmDeps()`
- [x] Detecção de package manager (npm/pnpm/yarn/bun)

### Comando `init`
- [x] Detectar shadcn configurado (buscar `components.json`)
- [x] Perguntas interativas (pasta, TypeScript, alias)
- [x] Criar estrutura de pastas `src/components/kobana/` (composites, templates, hooks, tokens)
- [x] Gerar `kobana.json` na raiz do projeto consumidor
- [x] Validar dependências base (react, tailwindcss)

### Comando `add`
- [x] Ler `kobana.json`
- [x] Buscar componente(s) no registry
- [x] Resolver árvore de dependências completa
- [x] Verificar o que já está instalado (skip duplicatas)
- [x] Instalar dependências shadcn (`npx shadcn@latest add ...`)
- [x] Instalar dependências npm
- [x] Copiar arquivos kobana para pasta destino
- [x] Reescrever imports (ajustar alias do projeto)
- [x] Atualizar `installed` no `kobana.json`
- [x] Suportar múltiplos componentes: `add data-table page-header`

### Comando `list`
- [x] Ler `kobana.json` (componentes instalados)
- [x] Buscar registry (todos os componentes)
- [x] Exibir agrupado por categoria (composite, template, hook, token)
- [x] Indicar status: ✔ instalado / ○ disponível

### Testes da CLI
- [x] `__tests__/cli/resolver.test.ts` — resolve simples, transitivas, circular, deduplicação, coleta shadcn, coleta npm
- [x] `__tests__/cli/installer.test.ts` — copia arquivos, reescreve imports shadcn, reescreve imports kobana, não sobrescreve, detecta package manager
- [x] `__tests__/cli/config.test.ts` — lê válido, falha inválido, busca subindo diretórios
- [x] `__tests__/cli/commands/init.test.ts` — cria pastas, gera kobana.json, detecta shadcn
- [x] `__tests__/cli/commands/add.test.ts` — adiciona simples, adiciona com deps, skip instalado, atualiza kobana.json
- [x] Teste end-to-end: `init` + `add` em projeto limpo

---

## Fase 2 — Compostos Tier 1

### Design Tokens
- [x] `src/tokens/colors.ts` — cores semânticas (success, warning, error, info)
- [x] `src/tokens/spacing.ts` — escala 4px base
- [x] `src/tokens/typography.ts` — font sizes, weights, line heights
- [x] CSS variables (oklch) para tema light/dark
- [x] Registrar no registry como componente `tokens`

### StatusBadge
- [x] `src/components/composites/status-badge/status-badge.tsx`
- [x] `src/components/composites/status-badge/index.ts`
- [x] Props: `status`, `label`, `size` (sm/md), `icon`, `className`
- [x] Mapeamento status → cor/ícone (active, inactive, pending, error, processing)
- [x] Prop `statusConfig` para mapear status custom
- [x] Deps: shadcn badge
- [x] Atualizar registry

### ConfirmDialog
- [x] `src/components/composites/confirm-dialog/confirm-dialog.tsx`
- [x] `src/components/composites/confirm-dialog/index.ts`
- [x] Props: `open`, `onOpenChange`, `variant` (danger/warning/info), `title`, `description`, `confirmLabel`, `cancelLabel`, `onConfirm` (sync + async), `isLoading`, `children` (trigger)
- [x] Ícone e cor por variant
- [x] Loading state no botão de confirmar
- [x] Deps: shadcn alert-dialog, button
- [x] Atualizar registry

### PageHeader
- [x] `src/components/composites/page-header/page-header.tsx`
- [x] `src/components/composites/page-header/index.ts`
- [x] Props: `title`, `description`, `breadcrumbs` (array), `actions` (ReactNode), `backHref`, `className`
- [x] Breadcrumbs com links
- [x] Botão de voltar quando `backHref`
- [x] Layout: título + descrição à esquerda, ações à direita
- [x] Deps: shadcn breadcrumb, button
- [x] Atualizar registry

### FilterBar
- [x] `src/components/composites/filter-bar/filter-bar.tsx`
- [x] `src/components/composites/filter-bar/filter-bar-types.ts`
- [x] `src/components/composites/filter-bar/index.ts`
- [x] FilterConfig: `key`, `label`, `type` (text/select/multi-select/date-range/custom), `options`, `placeholder`, `component`
- [x] Props: `filters`, `values`, `onChange`, `onClear`, `className`
- [x] Filtro tipo text (input com debounce)
- [x] Filtro tipo select
- [x] Filtro tipo multi-select
- [x] Filtro tipo date-range (calendar popover)
- [x] Filtro tipo custom (renderiza ReactNode)
- [x] Botão "Limpar filtros"
- [x] Badge de contagem de filtros ativos
- [x] Deps: shadcn input, select, popover, calendar, button, badge
- [x] Atualizar registry

### FormSection
- [x] `src/components/composites/form-section/form-section.tsx`
- [x] `src/components/composites/form-section/index.ts`
- [x] Props: `title`, `description`, `columns` (1/2/3), `children`, `className`
- [x] Grid responsivo (1 col em mobile, N colunas em desktop)
- [x] Separator entre seções
- [x] Deps: shadcn separator
- [x] Atualizar registry

### DataTable
- [x] `src/components/composites/data-table/data-table.tsx` — componente principal
- [x] `src/components/composites/data-table/data-table-toolbar.tsx` — busca + filtros + column visibility
- [x] `src/components/composites/data-table/data-table-pagination.tsx` — paginação com page size selector
- [x] `src/components/composites/data-table/data-table-actions.tsx` — ações por linha (dropdown)
- [x] `src/components/composites/data-table/data-table-bulk-actions.tsx` — ações em massa
- [x] `src/components/composites/data-table/data-table-column-header.tsx` — header sortável (asc/desc)
- [x] `src/components/composites/data-table/data-table-empty.tsx` — estado vazio
- [x] `src/components/composites/data-table/data-table-loading.tsx` — skeleton loading
- [x] `src/components/composites/data-table/index.ts`
- [x] Props genéricas: `columns`, `data`
- [x] Busca: `searchKey`, `searchPlaceholder`, `onSearch` (debounce 300ms)
- [x] Filtros: `filters`, `filterValues`, `onFilterChange` (integra FilterBar)
- [x] Paginação: `pagination` (page, perPage, total, totalPages), `onPageChange`, `onPerPageChange`
- [x] Seleção: `selectable`, `bulkActions` (label, icon, onClick, variant)
- [x] Ações por linha: `rowActions` (label, icon, onClick, variant, hidden)
- [x] Estados: `isLoading`, `emptyState`, `onRowClick`, `onRefresh`
- [x] Column visibility toggle
- [x] Coluna de ações sticky à direita
- [x] `columnLabels` para tradução de headers
- [x] Deps: shadcn table, checkbox, dropdown-menu, skeleton, button, select | kobana filter-bar, status-badge | npm @tanstack/react-table
- [x] Atualizar registry

### Qualidade — Fase 2
- [x] Todos os compostos aceitam `className`
- [x] Todos usam `forwardRef` onde renderizam DOM
- [x] Props exportadas como tipos nomeados (não inline)
- [x] Testar via CLI: `add` de cada componente em projeto limpo

---

## Fase 3 — Compostos Tier 2 + Hooks

### Hooks
- [x] `src/hooks/use-data-table.ts` — encapsula sorting, filtering, pagination, selection do TanStack Table
- [x] `src/hooks/use-filters.ts` — estado de filtros com URL sync (`toSearchParams`, `fromSearchParams`, `activeCount`)
- [x] `src/hooks/use-pagination.ts` — paginação server-side com URL sync (`page`, `perPage`, `offset`, `setPage`, `setPerPage`)
- [x] `src/hooks/use-debounce.ts` — debounce genérico
- [x] Registrar hooks no registry

### CopyCell
- [x] `src/components/composites/copy-cell/copy-cell.tsx`
- [x] `src/components/composites/copy-cell/index.ts`
- [x] Props: `value`, `truncate` (max chars), `className`
- [x] Copy to clipboard com feedback visual (ícone Check, 2s)
- [x] Tooltip com valor completo
- [x] Deps: shadcn button, tooltip
- [x] Atualizar registry

### CurrencyInput
- [x] `src/components/composites/currency-input/currency-input.tsx`
- [x] `src/components/composites/currency-input/index.ts`
- [x] Props: `value` (centavos), `onChange`, `currency` (BRL/USD), `locale`, `disabled`, `className`
- [x] Formatação automática de moeda
- [x] Integração com react-hook-form
- [x] Deps: shadcn input
- [x] Atualizar registry

### AddressFormFields
- [x] `src/components/composites/address-form-fields/address-form-fields.tsx`
- [x] `src/components/composites/address-form-fields/state-combobox.tsx` — 27 estados BR
- [x] `src/components/composites/address-form-fields/city-combobox.tsx` — cidades IBGE (depende do estado)
- [x] `src/components/composites/address-form-fields/index.ts`
- [x] Props: `form` (UseFormReturn), `baseName`, `disabled`, `cepApiUrl`, `citiesApiUrl`, `fieldNames` (mapping), `translationNamespace`
- [x] Auto-lookup de CEP com preenchimento (rua, bairro, estado, cidade)
- [x] Formatação CEP (99999-999)
- [x] Seletor de estado com combobox e busca
- [x] Combobox de cidade (dependente do estado, async)
- [x] Campos: rua, número, complemento, bairro
- [x] Deps: shadcn form, input, popover, command
- [x] Atualizar registry

### EntityCombobox
- [x] `src/components/composites/entity-combobox/entity-combobox.tsx`
- [x] `src/components/composites/entity-combobox/index.ts`
- [x] Props genéricas: `value`, `onChange`, `onSearch` (async), `renderItem`, `renderSelected`, `getItemValue`, `getItemLabel`
- [x] Props UI: `placeholder`, `searchPlaceholder`, `emptyMessage`, `label`, `disabled`, `className`
- [x] Busca assíncrona com debounce
- [x] Loading state durante busca
- [x] Empty state quando sem resultados
- [x] Deps: shadcn popover, command, button
- [x] Atualizar registry

### EmptyState
- [x] `src/components/composites/empty-state/empty-state.tsx`
- [x] `src/components/composites/empty-state/index.ts`
- [x] Props: `icon` (ReactNode), `title`, `description`, `action` ({ label, onClick, icon }), `className`
- [x] Layout centralizado
- [x] Deps: shadcn button
- [x] Atualizar registry

### Testes — Fase 3
- [x] Testes dos hooks (useDataTable, useFilters, usePagination, useDebounce)
- [x] Testar via CLI: `add` de cada componente novo

---

## Fase 4 — Templates

### ListPage
- [x] `src/components/templates/list-page/list-page.tsx`
- [x] `src/components/templates/list-page/index.ts`
- [x] Compõe: PageHeader + FilterBar + DataTable + EmptyState
- [x] Props de header: `title`, `description`, `breadcrumbs`, `primaryAction`
- [x] Props de DataTable: `columns`, `data`, `filters`, `searchKey`, `pagination`, `selectable`, `bulkActions`, `rowActions`
- [x] Props de callbacks: `onPageChange`, `onPerPageChange`, `onSearch`, `onFilterChange`, `onRowClick`, `onRefresh`
- [x] Props de estado: `isLoading`, `emptyState` ({ title, description, actionLabel, onAction })
- [x] Monta tudo automaticamente
- [x] Deps kobana: data-table, page-header, confirm-dialog, empty-state
- [x] Atualizar registry

### DetailPage
- [x] `src/components/templates/detail-page/detail-page.tsx`
- [x] `src/components/templates/detail-page/detail-section.tsx`
- [x] `src/components/templates/detail-page/index.ts`
- [x] Props: `title`, `description`, `breadcrumbs`, `actions`, `backHref`, `tabs` (array), `children`, `isLoading`
- [x] DetailSection: `title`, `description`, `actions`, `columns` (1/2/3), `children`
- [x] Tabs opcionais (shadcn Tabs)
- [x] Loading skeleton
- [x] Deps kobana: page-header, confirm-dialog
- [x] Deps shadcn: tabs, separator
- [x] Atualizar registry

### FormPage
- [x] `src/components/templates/form-page/form-page.tsx`
- [x] `src/components/templates/form-page/form-page-actions.tsx`
- [x] `src/components/templates/form-page/index.ts`
- [x] Props: `title`, `description`, `breadcrumbs`, `backHref`, `onSubmit` (async), `onCancel`, `submitLabel`, `cancelLabel`, `isSubmitting`, `isDirty`, `children`
- [x] Barra de ações sticky no rodapé (cancelar / salvar)
- [x] ConfirmDialog quando `isDirty` e tenta sair
- [x] Deps kobana: page-header, form-section, confirm-dialog
- [x] Deps shadcn: button
- [x] Atualizar registry

### Testes — Fase 4
- [x] Teste end-to-end: `add list-page` instala tudo (data-table + page-header + filter-bar + status-badge + confirm-dialog + empty-state)
- [x] Teste end-to-end: `add detail-page` instala tudo
- [x] Teste end-to-end: `add form-page` instala tudo

---

## Fase 5 — CLI Avançada

### Versionamento
- [x] Adicionar campo `version` a cada componente no registry
- [x] Salvar versão instalada no `kobana.json` (`installed.*.version`)
- [x] Salvar hash do arquivo no `kobana.json` (`installed.*.hash`)
- [x] Salvar data de instalação (`installed.*.installedAt`)

### Comando `diff`
- [x] `src/cli/commands/diff.ts`
- [x] Ler versão local do arquivo
- [x] Buscar versão do registry
- [x] Gerar diff colorido (lib `diff`)
- [x] Exibir no terminal
- [x] Flag `--all` para comparar todos os instalados

### Comando `update`
- [x] `src/cli/commands/update.ts`
- [x] Comparar versões locais vs registry
- [x] Listar componentes desatualizados
- [x] Mostrar diff antes de aplicar
- [x] Pedir confirmação
- [x] Sobrescrever arquivo se confirmado
- [x] Detectar modificação local (hash diferente) e avisar
- [x] Atualizar versão e hash no `kobana.json`
- [x] Flag `--all` — atualizar todos
- [x] Flag `--force` — sobrescrever sem confirmação
- [x] Flag `--dry-run` — mostrar sem aplicar

### Testes — Fase 5
- [x] `__tests__/cli/commands/diff.test.ts` — gera diff correto, mostra "up to date" quando sem mudanças
- [x] `__tests__/cli/commands/update.test.ts` — atualiza componente, detecta modificação local, flags --all/--force/--dry-run

---

## Fase 6 — Storybook + Documentação ⏸️ DEFERRED

> Deferred: requires React + Tailwind environment and interactive Storybook setup. See `docs/questions.md`.

### Setup
- [ ] ~Instalar Storybook (`npx storybook@latest init --type react`)~ ⏸️
- [ ] ~Configurar Tailwind CSS no Storybook~ ⏸️
- [ ] ~Configurar dark mode toggle~ ⏸️
- [ ] ~Instalar viewport addon (mobile/desktop)~ ⏸️
- [ ] ~Instalar a11y addon~ ⏸️
- [ ] ~Configurar autodocs~ ⏸️

### Stories — Compostos
- [ ] ~All story files~ ⏸️

### Stories — Templates
- [ ] ~All story files~ ⏸️

### Documentação por componente
- [ ] ~All documentation~ ⏸️

### Deploy
- [ ] ~Configurar deploy automático do Storybook~ ⏸️

---

## Fase 7 — Adoção ⏸️ DEFERRED

> Deferred: requires npm credentials, kobana-billing access, and team coordination. See `docs/questions.md`.

### ESLint Rules
- [ ] ~Criar pacote `@kobana/eslint-plugin-ui`~ ⏸️ (separate package)

### Publicação NPM
- [x] Configurar `.npmignore` (stories, tests, storybook, docs, __tests__)
- [x] Validar `npm pack` inclui apenas: dist/, registry/, src/components/, src/hooks/, src/tokens/
- [ ] ~Publicar `@kobana/ui` no NPM~ ⏸️ (requires credentials)
- [ ] ~Verificar `npx @kobana/ui init` funciona após publicação~ ⏸️
- [ ] ~Verificar `npx @kobana/ui add data-table` funciona após publicação~ ⏸️

### Migração POC (kobana-billing)
- [ ] ~All migration tasks~ ⏸️ (requires kobana-billing access)

### Workshop com o time
- [ ] ~All workshop tasks~ ⏸️ (team coordination)

### Processo de contribuição
- [ ] ~All documentation tasks~ ⏸️ (team coordination)
