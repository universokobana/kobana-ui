# @kobana/ui-docs

Site de documentação do design system Kobana. Construído com [Fumadocs](https://fumadocs.vercel.app/) + Next.js.

## Setup

```bash
cd web
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:4000](http://localhost:4000).

O comando inicia o Next.js com Turbopack e um watcher que sincroniza conteúdo MDX automaticamente.

### Windows / PowerShell

O script `dev` usa `&` no estilo bash (`node scripts/watch-content.mjs & next dev …`) para rodar o watcher e o Next.js em paralelo. **PowerShell não suporta esse operador** — `npm run dev` vai iniciar apenas o watcher e o servidor Next.js nunca sobe.

Use uma das alternativas abaixo:

```powershell
# A) Sem watcher de MDX (mais simples — basta rodar o Next.js):
npx next dev --turbopack --port 4000

# B) Em dois terminais separados:
#   Terminal 1
node scripts/watch-content.mjs
#   Terminal 2
npx next dev --turbopack --port 4000
```

Como alternativa, rodar `npm run dev` dentro de um shell compatível com bash (Git Bash, WSL) também funciona.

## Build

```bash
npm run build
npm start
```

## Estrutura

```
web/
├── app/                    # App Router (layout, páginas, API)
│   └── docs/[[...slug]]/   # Rota dinâmica para toda a documentação
├── content/docs/           # Conteúdo MDX (fonte de verdade)
│   ├── components/         # Docs de compostos (1 MDX por componente)
│   ├── templates/          # Docs de templates
│   ├── hooks/              # Docs de hooks
│   └── tokens/             # Docs de design tokens
├── components/             # Componentes do site (preview, source, header)
├── examples/               # Demos interativas (*-demo.tsx)
├── lib/
│   ├── registry.ts         # Registro de demos para <ComponentPreview>
│   └── source.ts           # Loader do Fumadocs
├── styles/                 # CSS global
├── middleware.ts            # CSP nonce-based (sem unsafe-inline)
└── source.config.ts        # Configuração Fumadocs
```

## Adicionando documentação de um componente

1. Crie o exemplo em `examples/<nome>-demo.tsx` (deve exportar `default`)
2. Registre em `lib/registry.ts`:
   ```ts
   entry("<nome>-demo", () => import("@/examples/<nome>-demo")),
   ```
3. Crie o MDX em `content/docs/components/<nome>.mdx`:
   ```mdx
   ---
   title: NomeDoComponente
   description: Descrição curta.
   ---

   <ComponentPreview name="<nome>-demo" />

   ## Instalação
   ...
   ```
4. Adicione ao `content/docs/components/meta.json`

## Testes E2E

```bash
npm run test:e2e
```

Usa [Playwright](https://playwright.dev/).

## Segurança

O middleware aplica CSP nonce-based em todas as rotas. **Nunca use `unsafe-inline` ou `unsafe-eval`** — veja `CLAUDE.md` na raiz do monorepo.
