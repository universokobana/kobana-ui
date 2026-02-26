# Kobana UI Docs — TODO

---

## Fase 0 — Setup do Workspace

### Workspace e Package
- [x] Criar `pnpm-workspace.yaml` na raiz
- [x] Atualizar `.gitignore` com entradas do web/
- [x] Criar `web/package.json` com dependências
- [x] Criar `web/tsconfig.json`
- [x] Criar `web/postcss.config.mjs`
- [x] Criar `web/next.config.mjs` com Fumadocs MDX loader
- [x] Criar `web/source.config.ts` para Fumadocs
- [x] Criar `web/styles/globals.css` com Tailwind v4 + CSS variables
- [x] Criar `web/components.json` para shadcn/ui
- [x] Criar `web/lib/utils.ts` com cn()
- [x] Instalar dependências com pnpm
- [x] Validar: `pnpm --filter @kobana/ui-docs dev` roda sem erros

---

## Fase 1 — Layout e Navegação

### Root Layout e Providers
- [x] `web/app/layout.tsx` — Root layout com ThemeProvider, fontes, metadata
- [x] `web/components/theme-provider.tsx` — next-themes
- [x] `web/lib/source.ts` — Fumadocs source loader

### Site Shell
- [x] `web/app/(app)/layout.tsx` — Site wrapper com header + footer
- [x] `web/components/site-header.tsx` — Logo, links (Docs, GitHub), theme toggle
- [x] `web/components/site-footer.tsx` — Links úteis, copyright

### Landing Page
- [x] `web/app/(app)/(root)/page.tsx` — Homepage minimalista

### Docs Pages
- [x] `web/app/(app)/docs/layout.tsx` — Layout de docs com sidebar + ToC
- [x] `web/app/(app)/docs/[[...slug]]/page.tsx` — Catch-all com Fumadocs
- [x] `web/content/docs/index.mdx` — Placeholder intro page
- [x] `web/content/docs/meta.json` — Sidebar ordering
- [x] Validar: navegação entre páginas funciona

---

## Fase 2 — Sistema de Preview de Componentes

### Syntax Highlighting
- [x] `web/lib/highlight-code.ts` — Shiki highlighter com temas

### Component Preview
- [x] `web/components/component-preview.tsx` — Preview container
- [x] `web/components/component-source.tsx` — Source code display
- [x] `web/components/code-block.tsx` — Bloco de código com copy
- [x] `web/components/copy-button.tsx` — Botão copiar com feedback

### MDX Components
- [x] `web/mdx-components.tsx` — Override de elementos MDX + custom components

### Registry de Exemplos
- [x] `web/lib/registry.ts` — Lookup de componentes/exemplos
- [x] `web/registry/__index__.tsx` — Auto-generated index com lazy imports
- [x] `web/examples/status-badge-demo.tsx` — Primeiro exemplo para validação
- [x] Validar: ComponentPreview renderiza preview + código

---

## Fase 3 — Páginas de Fundação

### Conteúdo Base
- [x] `content/docs/index.mdx` — Introdução ao design system
- [x] `content/docs/installation.mdx` — Como instalar o CLI
- [x] `content/docs/cli.mdx` — Comandos (init, add, update, list, diff)
- [x] `content/docs/architecture.mdx` — Modelo de 3 camadas

### Tokens
- [x] `content/docs/tokens/colors.mdx` — Paleta de cores semânticas
- [x] `content/docs/tokens/spacing.mdx` — Escala de espaçamento
- [x] `content/docs/tokens/typography.mdx` — Tipografia

---

## Fase 4 — Documentação dos Composites — Grupo 1

### Exemplos
- [x] `examples/data-table-demo.tsx`
- [x] `examples/page-header-demo.tsx`
- [x] `examples/filter-bar-demo.tsx`
- [x] `examples/form-section-demo.tsx`
- [x] `examples/status-badge-variants.tsx`
- [x] `examples/confirm-dialog-demo.tsx`
- [x] `examples/empty-state-demo.tsx`
- [x] `examples/copy-cell-demo.tsx`
- [x] `examples/currency-input-demo.tsx`

### MDX Pages
- [x] `content/docs/components/data-table.mdx`
- [x] `content/docs/components/page-header.mdx`
- [x] `content/docs/components/filter-bar.mdx`
- [x] `content/docs/components/form-section.mdx`
- [x] `content/docs/components/status-badge.mdx`
- [x] `content/docs/components/confirm-dialog.mdx`
- [x] `content/docs/components/empty-state.mdx`
- [x] `content/docs/components/copy-cell.mdx`
- [x] `content/docs/components/currency-input.mdx`
- [x] Atualizar `meta.json` com grupo Components

---

## Fase 5 — Documentação dos Composites — Grupo 2

### Exemplos
- [x] `examples/number-input-demo.tsx`
- [x] `examples/entity-combobox-demo.tsx`
- [x] `examples/address-form-fields-demo.tsx`
- [x] `examples/app-layout-demo.tsx`
- [x] `examples/app-header-demo.tsx`
- [x] `examples/app-sidebar-demo.tsx`
- [x] `examples/theme-toggle-demo.tsx`
- [x] `examples/locale-toggle-demo.tsx`
- [x] `examples/require-permission-demo.tsx`
- [x] `examples/export-modal-demo.tsx`
- [x] `examples/header-notifications-demo.tsx`

### MDX Pages
- [x] `content/docs/components/number-input.mdx`
- [x] `content/docs/components/entity-combobox.mdx`
- [x] `content/docs/components/address-form-fields.mdx`
- [x] `content/docs/components/app-layout.mdx`
- [x] `content/docs/components/app-header.mdx`
- [x] `content/docs/components/app-sidebar.mdx`
- [x] `content/docs/components/theme-toggle.mdx`
- [x] `content/docs/components/locale-toggle.mdx`
- [x] `content/docs/components/require-permission.mdx`
- [x] `content/docs/components/export-modal.mdx`
- [x] `content/docs/components/header-notifications.mdx`
- [x] Atualizar `meta.json`

---

## Fase 6 — Templates e Hooks

### Exemplos
- [x] `examples/list-page-demo.tsx`
- [x] `examples/detail-page-demo.tsx`
- [x] `examples/form-page-demo.tsx`

### MDX Pages
- [x] `content/docs/templates/list-page.mdx`
- [x] `content/docs/templates/detail-page.mdx`
- [x] `content/docs/templates/form-page.mdx`
- [x] `content/docs/hooks/use-data-table.mdx`
- [x] `content/docs/hooks/use-filters.mdx`
- [x] `content/docs/hooks/use-pagination.mdx`
- [x] `content/docs/hooks/use-debounce.mdx`
- [x] Atualizar `meta.json` com Templates e Hooks

---

## Fase 7 — Homepage e Polish

### Landing Page
- [x] Homepage final com hero, features, grid de componentes
- [x] 404 page

### SEO e Meta
- [x] Meta tags, Open Graph, sitemap
- [ ] Favicon

### Responsiveness
- [x] Mobile responsiveness review
