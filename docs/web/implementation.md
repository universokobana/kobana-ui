# Kobana UI — Documentation Website

Plano de implementação do site de documentação e exemplos do design system,
inspirado na arquitetura do shadcn/ui.

---

## Decisões Arquiteturais

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Local | `web/` no mesmo repo | Mesma abordagem do shadcn/ui. Componente e docs versionados juntos |
| Framework | **Next.js 15 (App Router)** | SSG para docs, RSC para ler source code no server |
| Docs engine | **Fumadocs** | Mesmo do shadcn/ui — MDX, search, ToC, sidebar automática |
| Styling | **Tailwind CSS v4** | Consistência com o design system |
| Syntax highlight | **Shiki** | Suporte a temas light/dark, mesmo do shadcn |
| Package manager | **pnpm** | Workspace com o pacote raiz |
| Deploy | **Vercel** | Zero-config para Next.js |

---

## Estrutura de Diretórios

```
kobana-ui/
├── src/                          # Pacote (CLI + registry) — não muda
├── registry/                     # Registry JSON — não muda
├── docs/                         # Specs/docs internos — não muda
│
├── web/                          # ← NOVO — Site de documentação
│   ├── package.json              # Dependências próprias (Next.js, Fumadocs, etc.)
│   ├── next.config.mjs
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── components.json           # shadcn/ui config para primitivos usados no site
│   │
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (ThemeProvider, fonts)
│   │   ├── page.tsx              # Homepage / landing
│   │   ├── docs/
│   │   │   └── [[...slug]]/
│   │   │       └── page.tsx      # Catch-all para docs (Fumadocs)
│   │   └── examples/
│   │       └── [...slug]/
│   │           └── page.tsx      # Iframe para preview isolado de exemplos
│   │
│   ├── content/                  # MDX — conteúdo das páginas
│   │   └── docs/
│   │       ├── index.mdx                     # Introdução
│   │       ├── installation.mdx              # Como instalar o CLI
│   │       ├── cli.mdx                       # Comandos (add, update, diff, list)
│   │       ├── architecture.mdx              # Modelo de 3 camadas
│   │       ├── tokens/
│   │       │   ├── colors.mdx
│   │       │   ├── spacing.mdx
│   │       │   └── typography.mdx
│   │       ├── components/
│   │       │   ├── data-table.mdx
│   │       │   ├── page-header.mdx
│   │       │   ├── filter-bar.mdx
│   │       │   ├── form-section.mdx
│   │       │   ├── status-badge.mdx
│   │       │   ├── confirm-dialog.mdx
│   │       │   ├── empty-state.mdx
│   │       │   ├── copy-cell.mdx
│   │       │   ├── currency-input.mdx
│   │       │   ├── number-input.mdx
│   │       │   ├── entity-combobox.mdx
│   │       │   ├── address-form-fields.mdx
│   │       │   ├── app-layout.mdx
│   │       │   ├── app-header.mdx
│   │       │   ├── app-sidebar.mdx
│   │       │   ├── theme-toggle.mdx
│   │       │   ├── locale-toggle.mdx
│   │       │   ├── require-permission.mdx
│   │       │   ├── export-modal.mdx
│   │       │   └── header-notifications.mdx
│   │       ├── templates/
│   │       │   ├── list-page.mdx
│   │       │   ├── detail-page.mdx
│   │       │   └── form-page.mdx
│   │       └── hooks/
│   │           ├── use-data-table.mdx
│   │           ├── use-filters.mdx
│   │           ├── use-pagination.mdx
│   │           └── use-debounce.mdx
│   │
│   ├── examples/                 # Exemplos "vivos" dos componentes
│   │   ├── status-badge-demo.tsx
│   │   ├── status-badge-variants.tsx
│   │   ├── data-table-demo.tsx
│   │   ├── data-table-selection.tsx
│   │   ├── filter-bar-demo.tsx
│   │   ├── page-header-demo.tsx
│   │   ├── page-header-with-actions.tsx
│   │   ├── form-section-demo.tsx
│   │   ├── currency-input-demo.tsx
│   │   ├── confirm-dialog-demo.tsx
│   │   ├── empty-state-demo.tsx
│   │   ├── copy-cell-demo.tsx
│   │   ├── list-page-demo.tsx
│   │   ├── detail-page-demo.tsx
│   │   ├── form-page-demo.tsx
│   │   └── ...                   # Um arquivo por variação/exemplo
│   │
│   ├── components/               # Componentes do site (não do design system)
│   │   ├── component-preview.tsx       # Preview live + código fonte
│   │   ├── component-source.tsx        # Exibe source code com highlight
│   │   ├── code-block.tsx              # Bloco de código com copy button
│   │   ├── mdx-components.tsx          # Override de elementos MDX
│   │   ├── site-header.tsx             # Header do site
│   │   ├── site-footer.tsx             # Footer
│   │   ├── sidebar-nav.tsx             # Navegação lateral
│   │   ├── theme-provider.tsx          # next-themes provider
│   │   ├── copy-button.tsx             # Botão copiar código
│   │   └── toc.tsx                     # Table of contents
│   │
│   ├── lib/
│   │   ├── source.ts                   # Fumadocs source loader
│   │   ├── highlight-code.ts           # Shiki highlighter com cache
│   │   ├── registry.ts                 # Lookup de componentes/exemplos
│   │   └── utils.ts                    # cn(), helpers
│   │
│   ├── registry/                 # Registry local do site
│   │   ├── ui/                   # Primitivos shadcn usados nos exemplos
│   │   ├── examples/             # Symlink ou cópia dos examples/
│   │   └── __index__.tsx         # Mapa lazy de todos os exemplos
│   │
│   ├── hooks/
│   │   └── use-copy-to-clipboard.ts
│   │
│   └── styles/
│       └── globals.css           # Tailwind + CSS variables do design system
│
├── pnpm-workspace.yaml           # ← NOVO — Define workspace
├── package.json                  # Pacote raiz (não muda)
└── turbo.json                    # ← NOVO (opcional) — Task runner
```

---

## Isolamento do Pacote

Para garantir que o site **não afeta** o pacote publicado:

1. **pnpm-workspace.yaml** na raiz:
   ```yaml
   packages:
     - "."
     - "web"
   ```

2. **package.json** da raiz — adicionar campo `files` (se não existir):
   ```json
   {
     "files": ["dist/", "registry/", "src/"]
   }
   ```
   Isso garante que `web/` nunca vai para o npm.

3. **tsup** continua buildando apenas `src/` — nenhuma mudança necessária.

4. **.gitignore** — adicionar:
   ```
   web/.next/
   web/node_modules/
   web/.source/
   ```

---

## Fases de Implementação

### Fase 0 — Setup do Workspace (1h)

- [ ] Criar `pnpm-workspace.yaml` na raiz
- [ ] Criar `web/package.json` com Next.js + Fumadocs + Tailwind v4
- [ ] Criar `web/tsconfig.json`
- [ ] Criar `web/next.config.mjs` com Fumadocs MDX loader
- [ ] Criar `web/source.config.ts` para Fumadocs
- [ ] Criar `web/tailwind.config.ts` com tokens do Kobana
- [ ] Criar `web/styles/globals.css` com variáveis CSS do design system
- [ ] Configurar `web/components.json` para shadcn/ui (primitivos do site)
- [ ] Instalar primitivos shadcn necessários no site (button, badge, tabs, etc.)
- [ ] Validar: `pnpm --filter web dev` roda sem erros

### Fase 1 — Layout e Navegação (2h)

- [ ] `web/app/layout.tsx` — Root layout com ThemeProvider, fontes, metadata
- [ ] `web/components/theme-provider.tsx` — next-themes
- [ ] `web/components/site-header.tsx` — Logo Kobana, links (Docs, GitHub), theme toggle
- [ ] `web/components/site-footer.tsx` — Links úteis, copyright
- [ ] `web/app/page.tsx` — Landing page minimalista:
  - Headline: "Kobana UI"
  - Subtítulo: "Design System para produtos Kobana"
  - CTA: "Get Started" → /docs
  - Quick install: `npx @kobana/ui init`
- [ ] `web/app/docs/layout.tsx` — Layout de docs com sidebar + ToC
- [ ] `web/app/docs/[[...slug]]/page.tsx` — Catch-all com Fumadocs
- [ ] `web/lib/source.ts` — Fumadocs source loader
- [ ] Validar: navegação entre páginas funciona

### Fase 2 — Sistema de Preview de Componentes (3h)

Esta é a peça central — permite mostrar componentes vivos com código fonte.

- [ ] `web/lib/highlight-code.ts` — Shiki highlighter
  - Temas: github-dark + github-light
  - LRU cache para performance
  - Suporte a TypeScript/TSX
- [ ] `web/lib/registry.ts` — Registry de exemplos
  - Mapa: nome → { component: React.lazy(), sourceFile: string }
  - Lê arquivos de `web/examples/`
- [ ] `web/registry/__index__.tsx` — Auto-generated index com lazy imports
- [ ] `web/components/component-preview.tsx`:
  - Props: `name` (lookup no registry), `align`, `className`
  - Renderiza: preview container + código colapsável
  - Preview: borda, padding, resize opcional
  - Code: syntax highlighted, copy button, collapsible
- [ ] `web/components/component-source.tsx`:
  - Server component que lê o arquivo fonte
  - Aplica syntax highlighting
  - Renderiza com copy button
- [ ] `web/components/code-block.tsx`:
  - Wrapper para blocos de código inline no MDX
  - Copy button integrado
- [ ] `web/components/copy-button.tsx`:
  - Botão copiar com feedback visual (check icon)
- [ ] `web/components/mdx-components.tsx`:
  - Registra `<ComponentPreview>` e `<ComponentSource>` como componentes MDX
  - Override de `<pre>`, `<code>`, `<table>`, `<h1>`-`<h6>`
  - Componentes auxiliares: `<Steps>`, `<Callout>`, `<Tabs>`

### Fase 3 — Páginas de Fundação (1h)

- [ ] `content/docs/index.mdx` — Introdução ao design system
  - O que é, princípios, modelo de 3 camadas
- [ ] `content/docs/installation.mdx`
  - Pré-requisitos (shadcn/ui já configurado)
  - `npx @kobana/ui init`
  - `npx @kobana/ui add <component>`
- [ ] `content/docs/cli.mdx`
  - Todos os comandos: init, add, update, list, diff
  - Exemplos de uso
- [ ] `content/docs/architecture.mdx`
  - Diagrama das 3 camadas
  - Filosofia: copy, don't install
- [ ] `content/docs/tokens/colors.mdx`
  - Paleta visual de cores semânticas
  - CSS variables
  - Exemplo de uso
- [ ] `content/docs/tokens/spacing.mdx`
  - Escala visual
- [ ] `content/docs/tokens/typography.mdx`
  - Tabela de tamanhos, pesos, line-heights

### Fase 4 — Documentação dos Composites — Grupo 1 (3h)

Cada MDX segue o template:

```mdx
---
title: ComponentName
description: Descrição curta
---

<ComponentPreview name="component-demo" />

## Instalação

\`\`\`bash
npx @kobana/ui add component-name
\`\`\`

## Uso

\`\`\`tsx
import { ComponentName } from "@/components/kobana/component-name"
\`\`\`

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| ... | ... | ... | ... |

## Exemplos

### Variante A
<ComponentPreview name="component-variant-a" />

### Variante B
<ComponentPreview name="component-variant-b" />
```

Componentes desta fase (core):
- [ ] `data-table` — demo com dados mock, seleção, bulk actions, paginação
- [ ] `page-header` — com breadcrumbs, ações, botão voltar
- [ ] `filter-bar` — todos os tipos de filtro (text, select, multi, date-range)
- [ ] `form-section` — grid 1/2/3 colunas
- [ ] `status-badge` — todas as variantes (active, error, pending, etc.)
- [ ] `confirm-dialog` — danger, warning, info
- [ ] `empty-state` — com e sem ação
- [ ] `copy-cell` — truncamento + tooltip
- [ ] `currency-input` — BRL e USD

### Fase 5 — Documentação dos Composites — Grupo 2 (2h)

- [ ] `number-input` — formatação numérica
- [ ] `entity-combobox` — busca async
- [ ] `address-form-fields` — auto CEP, cascading selectors
- [ ] `app-layout` — layout responsivo completo
- [ ] `app-header` — com avatar, mobile menu
- [ ] `app-sidebar` — navegação com ícones, badges, collapse
- [ ] `theme-toggle` — light/dark/system
- [ ] `locale-toggle` — seletor de idioma
- [ ] `require-permission` — gate de permissão
- [ ] `export-modal` — modal com progress
- [ ] `header-notifications` — dropdown de notificações

### Fase 6 — Templates e Hooks (2h)

- [ ] `list-page` — exemplo completo com todos os sub-componentes
- [ ] `detail-page` — com tabs e loading skeleton
- [ ] `form-page` — com validação e unsaved changes guard
- [ ] `use-data-table` — API reference + exemplo
- [ ] `use-filters` — API reference + URL sync
- [ ] `use-pagination` — API reference
- [ ] `use-debounce` — API reference

### Fase 7 — Homepage e Polish (2h)

- [ ] Landing page final:
  - Hero com código animado ou preview de componentes
  - Cards de features (CLI-driven, 3 camadas, TypeScript-first)
  - Grid de componentes disponíveis
  - Quick start section
- [ ] Search (Fumadocs built-in)
- [ ] Mobile responsiveness
- [ ] SEO: meta tags, Open Graph, sitemap
- [ ] Favicon e branding
- [ ] 404 page

### Fase 8 — Scripts e CI (1h)

- [ ] Script `build-examples-index.ts` — gera `registry/__index__.tsx` automaticamente
- [ ] `turbo.json` para build pipeline (pacote → site)
- [ ] GitHub Actions: build + deploy no Vercel
- [ ] Preview deployments para PRs

---

## Dependências do Site (`web/package.json`)

```json
{
  "name": "@kobana/ui-docs",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 4000",
    "build": "next build",
    "start": "next start",
    "registry:build": "tsx scripts/build-examples-index.ts"
  },
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "fumadocs-core": "^16",
    "fumadocs-ui": "^16",
    "fumadocs-mdx": "^13",
    "shiki": "^1.10",
    "next-themes": "^0.4",
    "class-variance-authority": "^0.7",
    "clsx": "^2",
    "tailwind-merge": "^2",
    "lucide-react": "^0.400",
    "lru-cache": "^10"
  },
  "devDependencies": {
    "typescript": "^5.5",
    "tailwindcss": "^4",
    "@types/node": "^22",
    "@types/react": "^19"
  }
}
```

Dependências adicionais para exemplos que usam componentes Kobana:
- `@tanstack/react-table` (DataTable)
- `react-hook-form` + `zod` + `@hookform/resolvers` (FormPage, AddressFormFields)
- `react-number-format` (NumberInput)
- Primitivos shadcn/ui: button, badge, input, select, table, dialog, popover, etc.

---

## Template MDX de Componente

Modelo padrão para cada página de componente:

```mdx
---
title: StatusBadge
description: Badge semântico com cores e ícones para indicar status.
---

import { ComponentPreview } from "@/components/component-preview"

## Preview

<ComponentPreview name="status-badge-demo" />

## Instalação

\`\`\`bash
npx @kobana/ui add status-badge
\`\`\`

**Dependências instaladas automaticamente:** `badge` (shadcn/ui)

## Importação

\`\`\`tsx
import { StatusBadge } from "@/components/kobana/status-badge"
\`\`\`

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `status` | `"active" \| "inactive" \| "pending" \| "error" \| "processing" \| "success" \| "warning" \| "info"` | — | Status semântico |
| `label` | `string` | — | Texto exibido |
| `showIcon` | `boolean` | `true` | Mostra ícone à esquerda |
| `className` | `string` | — | Classes adicionais |

## Exemplos

### Todas as variantes

<ComponentPreview name="status-badge-variants" />

### Sem ícone

<ComponentPreview name="status-badge-no-icon" />
```

---

## Como o Preview Funciona (Fluxo)

```
MDX: <ComponentPreview name="status-badge-demo" />
  │
  ├─ Client: Carrega componente lazy de registry/__index__.tsx
  │    → examples/status-badge-demo.tsx (React component)
  │    → Renderiza no preview container
  │
  └─ Server: Lê o arquivo examples/status-badge-demo.tsx
       → Aplica syntax highlighting com Shiki
       → Renderiza código com copy button
       → Collapsible no mobile
```

---

## Exemplo de Arquivo de Demo

```tsx
// web/examples/status-badge-demo.tsx
import { StatusBadge } from "@/registry/ui/status-badge"

export default function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="active" label="Ativo" />
      <StatusBadge status="pending" label="Pendente" />
      <StatusBadge status="error" label="Erro" />
      <StatusBadge status="processing" label="Processando" />
    </div>
  )
}
```

Os exemplos importam de `@/registry/ui/` onde os componentes Kobana estão
copiados (via `npx @kobana/ui add` ou manualmente) para uso no site.

---

## Notas

- O site usa os próprios componentes do Kobana UI nos exemplos — dogfooding
- Fumadocs cuida de: sidebar, search, breadcrumbs, ToC, mobile nav
- Cada fase pode ser implementada e deployada incrementalmente
- O site é `private: true` — nunca publicado no npm
- Estimativa total: ~16h de implementação
