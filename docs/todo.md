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
- [ ] Validar dependências base (react, tailwindcss)

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
- [ ] `__tests__/cli/commands/init.test.ts` — cria pastas, gera kobana.json, detecta shadcn
- [ ] `__tests__/cli/commands/add.test.ts` — adiciona simples, adiciona com deps, skip instalado, atualiza kobana.json
- [ ] Teste end-to-end: `init` + `add` em projeto limpo

---

## Fase 2 — Compostos Tier 1

### Design Tokens
- [ ] `src/tokens/colors.ts` — cores semânticas (success, warning, error, info)
- [ ] `src/tokens/spacing.ts` — escala 4px base
- [ ] `src/tokens/typography.ts` — font sizes, weights, line heights
- [ ] CSS variables (oklch) para tema light/dark
- [ ] Registrar no registry como componente `tokens`

### StatusBadge
- [ ] `src/components/composites/status-badge/status-badge.tsx`
- [ ] `src/components/composites/status-badge/index.ts`
- [ ] Props: `status`, `label`, `size` (sm/md), `icon`, `className`
- [ ] Mapeamento status → cor/ícone (active, inactive, pending, error, processing)
- [ ] Prop `statusConfig` para mapear status custom
- [ ] Deps: shadcn badge
- [ ] Atualizar registry

### ConfirmDialog
- [ ] `src/components/composites/confirm-dialog/confirm-dialog.tsx`
- [ ] `src/components/composites/confirm-dialog/index.ts`
- [ ] Props: `open`, `onOpenChange`, `variant` (danger/warning/info), `title`, `description`, `confirmLabel`, `cancelLabel`, `onConfirm` (sync + async), `isLoading`, `children` (trigger)
- [ ] Ícone e cor por variant
- [ ] Loading state no botão de confirmar
- [ ] Deps: shadcn alert-dialog, button
- [ ] Atualizar registry

### PageHeader
- [ ] `src/components/composites/page-header/page-header.tsx`
- [ ] `src/components/composites/page-header/index.ts`
- [ ] Props: `title`, `description`, `breadcrumbs` (array), `actions` (ReactNode), `backHref`, `className`
- [ ] Breadcrumbs com links
- [ ] Botão de voltar quando `backHref`
- [ ] Layout: título + descrição à esquerda, ações à direita
- [ ] Deps: shadcn breadcrumb, button
- [ ] Atualizar registry

### FilterBar
- [ ] `src/components/composites/filter-bar/filter-bar.tsx`
- [ ] `src/components/composites/filter-bar/filter-bar-types.ts`
- [ ] `src/components/composites/filter-bar/index.ts`
- [ ] FilterConfig: `key`, `label`, `type` (text/select/multi-select/date-range/custom), `options`, `placeholder`, `component`
- [ ] Props: `filters`, `values`, `onChange`, `onClear`, `className`
- [ ] Filtro tipo text (input com debounce)
- [ ] Filtro tipo select
- [ ] Filtro tipo multi-select
- [ ] Filtro tipo date-range (calendar popover)
- [ ] Filtro tipo custom (renderiza ReactNode)
- [ ] Botão "Limpar filtros"
- [ ] Badge de contagem de filtros ativos
- [ ] Deps: shadcn input, select, popover, calendar, button, badge
- [ ] Atualizar registry

### FormSection
- [ ] `src/components/composites/form-section/form-section.tsx`
- [ ] `src/components/composites/form-section/index.ts`
- [ ] Props: `title`, `description`, `columns` (1/2/3), `children`, `className`
- [ ] Grid responsivo (1 col em mobile, N colunas em desktop)
- [ ] Separator entre seções
- [ ] Deps: shadcn separator
- [ ] Atualizar registry

### DataTable
- [ ] `src/components/composites/data-table/data-table.tsx` — componente principal
- [ ] `src/components/composites/data-table/data-table-toolbar.tsx` — busca + filtros + column visibility
- [ ] `src/components/composites/data-table/data-table-pagination.tsx` — paginação com page size selector
- [ ] `src/components/composites/data-table/data-table-actions.tsx` — ações por linha (dropdown)
- [ ] `src/components/composites/data-table/data-table-bulk-actions.tsx` — ações em massa
- [ ] `src/components/composites/data-table/data-table-column-header.tsx` — header sortável (asc/desc)
- [ ] `src/components/composites/data-table/data-table-empty.tsx` — estado vazio
- [ ] `src/components/composites/data-table/data-table-loading.tsx` — skeleton loading
- [ ] `src/components/composites/data-table/index.ts`
- [ ] Props genéricas: `columns`, `data`
- [ ] Busca: `searchKey`, `searchPlaceholder`, `onSearch` (debounce 300ms)
- [ ] Filtros: `filters`, `filterValues`, `onFilterChange` (integra FilterBar)
- [ ] Paginação: `pagination` (page, perPage, total, totalPages), `onPageChange`, `onPerPageChange`
- [ ] Seleção: `selectable`, `bulkActions` (label, icon, onClick, variant)
- [ ] Ações por linha: `rowActions` (label, icon, onClick, variant, hidden)
- [ ] Estados: `isLoading`, `emptyState`, `onRowClick`, `onRefresh`
- [ ] Column visibility toggle
- [ ] Coluna de ações sticky à direita
- [ ] `columnLabels` para tradução de headers
- [ ] Deps: shadcn table, checkbox, dropdown-menu, skeleton, button, select | kobana filter-bar, status-badge | npm @tanstack/react-table
- [ ] Atualizar registry

### Qualidade — Fase 2
- [ ] Todos os compostos aceitam `className`
- [ ] Todos usam `forwardRef` onde renderizam DOM
- [ ] Props exportadas como tipos nomeados (não inline)
- [ ] Testar via CLI: `add` de cada componente em projeto limpo

---

## Fase 3 — Compostos Tier 2 + Hooks

### Hooks
- [ ] `src/hooks/use-data-table.ts` — encapsula sorting, filtering, pagination, selection do TanStack Table
- [ ] `src/hooks/use-filters.ts` — estado de filtros com URL sync (`toSearchParams`, `fromSearchParams`, `activeCount`)
- [ ] `src/hooks/use-pagination.ts` — paginação server-side com URL sync (`page`, `perPage`, `offset`, `setPage`, `setPerPage`)
- [ ] `src/hooks/use-debounce.ts` — debounce genérico
- [ ] Registrar hooks no registry

### CopyCell
- [ ] `src/components/composites/copy-cell/copy-cell.tsx`
- [ ] `src/components/composites/copy-cell/index.ts`
- [ ] Props: `value`, `truncate` (max chars), `className`
- [ ] Copy to clipboard com feedback visual (ícone Check, 2s)
- [ ] Tooltip com valor completo
- [ ] Deps: shadcn button, tooltip
- [ ] Atualizar registry

### CurrencyInput
- [ ] `src/components/composites/currency-input/currency-input.tsx`
- [ ] `src/components/composites/currency-input/index.ts`
- [ ] Props: `value` (centavos), `onChange`, `currency` (BRL/USD), `locale`, `disabled`, `className`
- [ ] Formatação automática de moeda
- [ ] Integração com react-hook-form
- [ ] Deps: shadcn input
- [ ] Atualizar registry

### AddressFormFields
- [ ] `src/components/composites/address-form-fields/address-form-fields.tsx`
- [ ] `src/components/composites/address-form-fields/state-combobox.tsx` — 27 estados BR
- [ ] `src/components/composites/address-form-fields/city-combobox.tsx` — cidades IBGE (depende do estado)
- [ ] `src/components/composites/address-form-fields/index.ts`
- [ ] Props: `form` (UseFormReturn), `baseName`, `disabled`, `cepApiUrl`, `citiesApiUrl`, `fieldNames` (mapping), `translationNamespace`
- [ ] Auto-lookup de CEP com preenchimento (rua, bairro, estado, cidade)
- [ ] Formatação CEP (99999-999)
- [ ] Seletor de estado com combobox e busca
- [ ] Combobox de cidade (dependente do estado, async)
- [ ] Campos: rua, número, complemento, bairro
- [ ] Deps: shadcn form, input, popover, command
- [ ] Atualizar registry

### EntityCombobox
- [ ] `src/components/composites/entity-combobox/entity-combobox.tsx`
- [ ] `src/components/composites/entity-combobox/index.ts`
- [ ] Props genéricas: `value`, `onChange`, `onSearch` (async), `renderItem`, `renderSelected`, `getItemValue`, `getItemLabel`
- [ ] Props UI: `placeholder`, `searchPlaceholder`, `emptyMessage`, `label`, `disabled`, `className`
- [ ] Busca assíncrona com debounce
- [ ] Loading state durante busca
- [ ] Empty state quando sem resultados
- [ ] Deps: shadcn popover, command, button
- [ ] Atualizar registry

### EmptyState
- [ ] `src/components/composites/empty-state/empty-state.tsx`
- [ ] `src/components/composites/empty-state/index.ts`
- [ ] Props: `icon` (ReactNode), `title`, `description`, `action` ({ label, onClick, icon }), `className`
- [ ] Layout centralizado
- [ ] Deps: shadcn button
- [ ] Atualizar registry

### Testes — Fase 3
- [ ] Testes dos hooks (useDataTable, useFilters, usePagination, useDebounce)
- [ ] Testar via CLI: `add` de cada componente novo

---

## Fase 4 — Templates

### ListPage
- [ ] `src/components/templates/list-page/list-page.tsx`
- [ ] `src/components/templates/list-page/index.ts`
- [ ] Compõe: PageHeader + FilterBar + DataTable + EmptyState
- [ ] Props de header: `title`, `description`, `breadcrumbs`, `primaryAction`
- [ ] Props de DataTable: `columns`, `data`, `filters`, `searchKey`, `pagination`, `selectable`, `bulkActions`, `rowActions`
- [ ] Props de callbacks: `onPageChange`, `onPerPageChange`, `onSearch`, `onFilterChange`, `onRowClick`, `onRefresh`
- [ ] Props de estado: `isLoading`, `emptyState` ({ title, description, actionLabel, onAction })
- [ ] Monta tudo automaticamente
- [ ] Deps kobana: data-table, page-header, confirm-dialog, empty-state
- [ ] Atualizar registry

### DetailPage
- [ ] `src/components/templates/detail-page/detail-page.tsx`
- [ ] `src/components/templates/detail-page/detail-section.tsx`
- [ ] `src/components/templates/detail-page/index.ts`
- [ ] Props: `title`, `description`, `breadcrumbs`, `actions`, `backHref`, `tabs` (array), `children`, `isLoading`
- [ ] DetailSection: `title`, `description`, `actions`, `columns` (1/2/3), `children`
- [ ] Tabs opcionais (shadcn Tabs)
- [ ] Loading skeleton
- [ ] Deps kobana: page-header, confirm-dialog
- [ ] Deps shadcn: tabs, separator
- [ ] Atualizar registry

### FormPage
- [ ] `src/components/templates/form-page/form-page.tsx`
- [ ] `src/components/templates/form-page/form-page-actions.tsx`
- [ ] `src/components/templates/form-page/index.ts`
- [ ] Props: `title`, `description`, `breadcrumbs`, `backHref`, `onSubmit` (async), `onCancel`, `submitLabel`, `cancelLabel`, `isSubmitting`, `isDirty`, `children`
- [ ] Barra de ações sticky no rodapé (cancelar / salvar)
- [ ] ConfirmDialog quando `isDirty` e tenta sair
- [ ] Deps kobana: page-header, form-section, confirm-dialog
- [ ] Deps shadcn: button
- [ ] Atualizar registry

### Testes — Fase 4
- [ ] Teste end-to-end: `add list-page` instala tudo (data-table + page-header + filter-bar + status-badge + confirm-dialog + empty-state)
- [ ] Teste end-to-end: `add detail-page` instala tudo
- [ ] Teste end-to-end: `add form-page` instala tudo

---

## Fase 5 — CLI Avançada

### Versionamento
- [ ] Adicionar campo `version` a cada componente no registry
- [ ] Salvar versão instalada no `kobana.json` (`installed.*.version`)
- [ ] Salvar hash do arquivo no `kobana.json` (`installed.*.hash`)
- [ ] Salvar data de instalação (`installed.*.installedAt`)

### Comando `diff`
- [ ] `src/cli/commands/diff.ts`
- [ ] Ler versão local do arquivo
- [ ] Buscar versão do registry
- [ ] Gerar diff colorido (lib `diff`)
- [ ] Exibir no terminal
- [ ] Flag `--all` para comparar todos os instalados

### Comando `update`
- [ ] `src/cli/commands/update.ts`
- [ ] Comparar versões locais vs registry
- [ ] Listar componentes desatualizados
- [ ] Mostrar diff antes de aplicar
- [ ] Pedir confirmação
- [ ] Sobrescrever arquivo se confirmado
- [ ] Detectar modificação local (hash diferente) e avisar
- [ ] Atualizar versão e hash no `kobana.json`
- [ ] Flag `--all` — atualizar todos
- [ ] Flag `--force` — sobrescrever sem confirmação
- [ ] Flag `--dry-run` — mostrar sem aplicar

### Testes — Fase 5
- [ ] `__tests__/cli/commands/diff.test.ts` — gera diff correto, mostra "up to date" quando sem mudanças
- [ ] `__tests__/cli/commands/update.test.ts` — atualiza componente, detecta modificação local, flags --all/--force/--dry-run

---

## Fase 6 — Storybook + Documentação

### Setup
- [ ] Instalar Storybook (`npx storybook@latest init --type react`)
- [ ] Configurar Tailwind CSS no Storybook
- [ ] Configurar dark mode toggle
- [ ] Instalar viewport addon (mobile/desktop)
- [ ] Instalar a11y addon
- [ ] Configurar autodocs

### Stories — Compostos
- [ ] `stories/composites/StatusBadge.stories.tsx` — default, variantes, sizes, custom config
- [ ] `stories/composites/ConfirmDialog.stories.tsx` — danger, warning, info, async, loading
- [ ] `stories/composites/PageHeader.stories.tsx` — simples, breadcrumbs, ações, backHref
- [ ] `stories/composites/FilterBar.stories.tsx` — text, select, multi-select, date-range, custom, clear
- [ ] `stories/composites/FormSection.stories.tsx` — 1 col, 2 cols, 3 cols, com descrição
- [ ] `stories/composites/DataTable.stories.tsx` — default, loading, empty, search, filters, pagination, selection, bulk actions, row actions, sorting, column visibility
- [ ] `stories/composites/CopyCell.stories.tsx` — default, truncated, copy feedback
- [ ] `stories/composites/CurrencyInput.stories.tsx` — BRL, USD, disabled
- [ ] `stories/composites/AddressFormFields.stories.tsx` — default, CEP lookup, disabled
- [ ] `stories/composites/EntityCombobox.stories.tsx` — default, async search, loading, empty
- [ ] `stories/composites/EmptyState.stories.tsx` — default, com ícone, com ação

### Stories — Templates
- [ ] `stories/templates/ListPage.stories.tsx` — completo, loading, empty, com filtros
- [ ] `stories/templates/DetailPage.stories.tsx` — sem tabs, com tabs, loading
- [ ] `stories/templates/FormPage.stories.tsx` — default, submitting, dirty guard

### Documentação por componente
- [ ] Cada story inclui descrição do componente
- [ ] Cada story inclui comando CLI de instalação
- [ ] Cada story inclui tabela de props (autodocs)
- [ ] Cada story inclui exemplos de uso correto
- [ ] Cada story inclui exemplos de uso incorreto

### Deploy
- [ ] Configurar deploy automático do Storybook (GitHub Pages ou Vercel)
- [ ] Deploy no merge da main

---

## Fase 7 — Adoção

### ESLint Rules
- [ ] Criar pacote `@kobana/eslint-plugin-ui`
- [ ] Regra `no-direct-shadcn-table` — avisa import de Table fora de kobana
- [ ] Regra `prefer-kobana-composite` — sugere compostos para padrões conhecidos (AlertDialog → ConfirmDialog, Breadcrumb+heading → PageHeader)
- [ ] Documentar como instalar e configurar

### Publicação NPM
- [ ] Configurar `.npmignore` (stories, tests, storybook, docs, __tests__)
- [ ] Validar `npm pack` inclui apenas: dist/, registry/, src/components/, src/hooks/, src/tokens/
- [ ] Publicar `@kobana/ui` no NPM (`npm publish --access public`)
- [ ] Verificar `npx @kobana/ui init` funciona após publicação
- [ ] Verificar `npx @kobana/ui add data-table` funciona após publicação

### Migração POC (kobana-billing)
- [ ] Rodar `npx @kobana/ui init` no kobana-billing
- [ ] Migrar listagem de subscriptions → ListPage template
- [ ] Migrar detalhe de subscription → DetailPage template
- [ ] Migrar formulário de novo customer → FormPage template
- [ ] Validar visualmente e funcionalmente cada tela migrada
- [ ] Remover código duplicado antigo
- [ ] Documentar lições aprendidas

### Workshop com o time
- [ ] Preparar slides: motivação e princípios do design system (20min)
- [ ] Preparar demo: CLI init + add + uso (20min)
- [ ] Preparar live coding: migrar uma tela juntos (30min)
- [ ] Preparar tour do Storybook: como consultar e contribuir (20min)
- [ ] Preparar hands-on: cada dev migra uma tela (30min)
- [ ] Realizar workshop (2h)

### Processo de contribuição
- [ ] Documentar como criar novo componente composto
- [ ] Documentar como atualizar registry
- [ ] Documentar critérios de promoção (3x rule)
- [ ] Documentar code review requirements (2 aprovações)
