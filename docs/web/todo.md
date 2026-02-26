# Kobana UI Docs — TODO

---

## Fase 0 — Setup do Workspace

### Workspace e Package
- [ ] Criar `pnpm-workspace.yaml` na raiz
- [ ] Atualizar `.gitignore` com entradas do web/
- [ ] Criar `web/package.json` com dependências
- [ ] Criar `web/tsconfig.json`
- [ ] Criar `web/postcss.config.mjs`
- [ ] Criar `web/next.config.mjs` com Fumadocs MDX loader
- [ ] Criar `web/source.config.ts` para Fumadocs
- [ ] Criar `web/styles/globals.css` com Tailwind v4 + CSS variables
- [ ] Criar `web/components.json` para shadcn/ui
- [ ] Criar `web/lib/utils.ts` com cn()
- [ ] Instalar dependências com pnpm
- [ ] Validar: `pnpm --filter @kobana/ui-docs dev` roda sem erros

---

## Fase 1 — Layout e Navegação

### Root Layout e Providers
- [ ] `web/app/layout.tsx` — Root layout com ThemeProvider, fontes, metadata
- [ ] `web/components/theme-provider.tsx` — next-themes
- [ ] `web/lib/source.ts` — Fumadocs source loader

### Site Shell
- [ ] `web/app/(app)/layout.tsx` — Site wrapper com header + footer
- [ ] `web/components/site-header.tsx` — Logo, links (Docs, GitHub), theme toggle
- [ ] `web/components/site-footer.tsx` — Links úteis, copyright

### Landing Page
- [ ] `web/app/(app)/(root)/page.tsx` — Homepage minimalista

### Docs Pages
- [ ] `web/app/(app)/docs/layout.tsx` — Layout de docs com sidebar + ToC
- [ ] `web/app/(app)/docs/[[...slug]]/page.tsx` — Catch-all com Fumadocs
- [ ] `web/content/docs/index.mdx` — Placeholder intro page
- [ ] `web/content/docs/meta.json` — Sidebar ordering
- [ ] Validar: navegação entre páginas funciona

---

## Fase 2 — Sistema de Preview de Componentes

### Syntax Highlighting
- [ ] `web/lib/highlight-code.ts` — Shiki highlighter com temas

### Component Preview
- [ ] `web/components/component-preview.tsx` — Preview container
- [ ] `web/components/component-source.tsx` — Source code display
- [ ] `web/components/code-block.tsx` — Bloco de código com copy
- [ ] `web/components/copy-button.tsx` — Botão copiar com feedback

### MDX Components
- [ ] `web/mdx-components.tsx` — Override de elementos MDX + custom components

### Registry de Exemplos
- [ ] `web/lib/registry.ts` — Lookup de componentes/exemplos
- [ ] `web/registry/__index__.tsx` — Auto-generated index com lazy imports
- [ ] `web/examples/status-badge-demo.tsx` — Primeiro exemplo para validação
- [ ] Validar: ComponentPreview renderiza preview + código

---

## Fase 3 — Páginas de Fundação

### Conteúdo Base
- [ ] `content/docs/index.mdx` — Introdução ao design system
- [ ] `content/docs/installation.mdx` — Como instalar o CLI
- [ ] `content/docs/cli.mdx` — Comandos (init, add, update, list, diff)
- [ ] `content/docs/architecture.mdx` — Modelo de 3 camadas

### Tokens
- [ ] `content/docs/tokens/colors.mdx` — Paleta de cores semânticas
- [ ] `content/docs/tokens/spacing.mdx` — Escala de espaçamento
- [ ] `content/docs/tokens/typography.mdx` — Tipografia

---

## Fase 4 — Documentação dos Composites — Grupo 1

### Exemplos
- [ ] `examples/data-table-demo.tsx`
- [ ] `examples/page-header-demo.tsx`
- [ ] `examples/filter-bar-demo.tsx`
- [ ] `examples/form-section-demo.tsx`
- [ ] `examples/status-badge-variants.tsx`
- [ ] `examples/confirm-dialog-demo.tsx`
- [ ] `examples/empty-state-demo.tsx`
- [ ] `examples/copy-cell-demo.tsx`
- [ ] `examples/currency-input-demo.tsx`

### MDX Pages
- [ ] `content/docs/components/data-table.mdx`
- [ ] `content/docs/components/page-header.mdx`
- [ ] `content/docs/components/filter-bar.mdx`
- [ ] `content/docs/components/form-section.mdx`
- [ ] `content/docs/components/status-badge.mdx`
- [ ] `content/docs/components/confirm-dialog.mdx`
- [ ] `content/docs/components/empty-state.mdx`
- [ ] `content/docs/components/copy-cell.mdx`
- [ ] `content/docs/components/currency-input.mdx`
- [ ] Atualizar `meta.json` com grupo Components

---

## Fase 5 — Documentação dos Composites — Grupo 2

### Exemplos
- [ ] `examples/number-input-demo.tsx`
- [ ] `examples/entity-combobox-demo.tsx`
- [ ] `examples/address-form-fields-demo.tsx`
- [ ] `examples/app-layout-demo.tsx`
- [ ] `examples/app-header-demo.tsx`
- [ ] `examples/app-sidebar-demo.tsx`
- [ ] `examples/theme-toggle-demo.tsx`
- [ ] `examples/locale-toggle-demo.tsx`
- [ ] `examples/require-permission-demo.tsx`
- [ ] `examples/export-modal-demo.tsx`
- [ ] `examples/header-notifications-demo.tsx`

### MDX Pages
- [ ] `content/docs/components/number-input.mdx`
- [ ] `content/docs/components/entity-combobox.mdx`
- [ ] `content/docs/components/address-form-fields.mdx`
- [ ] `content/docs/components/app-layout.mdx`
- [ ] `content/docs/components/app-header.mdx`
- [ ] `content/docs/components/app-sidebar.mdx`
- [ ] `content/docs/components/theme-toggle.mdx`
- [ ] `content/docs/components/locale-toggle.mdx`
- [ ] `content/docs/components/require-permission.mdx`
- [ ] `content/docs/components/export-modal.mdx`
- [ ] `content/docs/components/header-notifications.mdx`
- [ ] Atualizar `meta.json`

---

## Fase 6 — Templates e Hooks

### Exemplos
- [ ] `examples/list-page-demo.tsx`
- [ ] `examples/detail-page-demo.tsx`
- [ ] `examples/form-page-demo.tsx`

### MDX Pages
- [ ] `content/docs/templates/list-page.mdx`
- [ ] `content/docs/templates/detail-page.mdx`
- [ ] `content/docs/templates/form-page.mdx`
- [ ] `content/docs/hooks/use-data-table.mdx`
- [ ] `content/docs/hooks/use-filters.mdx`
- [ ] `content/docs/hooks/use-pagination.mdx`
- [ ] `content/docs/hooks/use-debounce.mdx`
- [ ] Atualizar `meta.json` com Templates e Hooks

---

## Fase 7 — Homepage e Polish

### Landing Page
- [ ] Homepage final com hero, features, grid de componentes
- [ ] 404 page

### SEO e Meta
- [ ] Meta tags, Open Graph, sitemap
- [ ] Favicon

### Responsiveness
- [ ] Mobile responsiveness review
