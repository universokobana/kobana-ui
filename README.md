# @kobana/ui

Design system interno da Kobana. CLI + Registry inspirado no [shadcn/ui](https://ui.shadcn.com/).

Os componentes **não são instalados como pacote NPM**. São copiados para dentro de cada projeto via CLI, garantindo autonomia total para customização local.

## Quick Start

```bash
# Inicializar no seu projeto
npx @kobana/ui init

# Adicionar componentes
npx @kobana/ui add data-table
npx @kobana/ui add list-page

# Listar componentes disponíveis
npx @kobana/ui list
```

## Como funciona

```
npx @kobana/ui add data-table
```

A CLI consulta o registry, resolve a árvore de dependências e copia os arquivos:

```
Será instalado:
  shadcn: table, checkbox, dropdown-menu, skeleton
  kobana: filter-bar, status-badge, data-table
  npm: @tanstack/react-table

✔ 3 componentes adicionados.
```

Os arquivos ficam no seu projeto:

```
src/components/
  ui/                          # shadcn (já existente)
    table.tsx
    badge.tsx
    ...
  kobana/                      # @kobana/ui
    composites/
      data-table/
      filter-bar/
      status-badge/
    templates/
      list-page/
    hooks/
    tokens/
```

## Arquitetura

Três camadas, cada uma consome apenas a inferior:

| Camada | Descrição | Exemplos |
|--------|-----------|----------|
| **Primitivos** | shadcn/ui | Button, Input, Table, Dialog, Badge |
| **Compostos** | Combinam primitivos com layout e comportamento | DataTable, PageHeader, FilterBar, ConfirmDialog |
| **Templates** | Layouts de página completos | ListPage, DetailPage, FormPage |

## Componentes

### Compostos

| Componente | Descrição |
|------------|-----------|
| `data-table` | Tabela com filtros, paginação, sorting, seleção e ações |
| `page-header` | Cabeçalho de página com breadcrumbs e ações |
| `filter-bar` | Barra de filtros (text, select, multi-select, date-range) |
| `form-section` | Seção de formulário com grid responsivo |
| `confirm-dialog` | Dialog de confirmação com variantes (danger, warning, info) |
| `status-badge` | Badge semântico de status com cores e ícones |
| `empty-state` | Estado vazio com ícone, título e ação |
| `copy-cell` | Célula com copy-to-clipboard e truncamento |
| `currency-input` | Input com formatação de moeda (BRL, USD) |
| `entity-combobox` | Combobox genérico com busca assíncrona |
| `address-form-fields` | Campos de endereço BR com lookup de CEP |

### Templates

| Template | Descrição |
|----------|-----------|
| `list-page` | PageHeader + FilterBar + DataTable + EmptyState |
| `detail-page` | PageHeader + Tabs + Seções de detalhe |
| `form-page` | PageHeader + FormSections + Barra de ações sticky |

### Hooks

| Hook | Descrição |
|------|-----------|
| `use-data-table` | Estado do DataTable (sorting, filtering, pagination, selection) |
| `use-filters` | Estado de filtros com URL sync |
| `use-pagination` | Paginação server-side com URL sync |
| `use-debounce` | Debounce genérico |

## CLI

### `init`

Inicializa o projeto. Cria `kobana.json` e a estrutura de pastas.

```bash
npx @kobana/ui init
```

### `add`

Adiciona componentes. Resolve dependências automaticamente.

```bash
npx @kobana/ui add data-table
npx @kobana/ui add data-table page-header confirm-dialog
npx @kobana/ui add list-page  # instala template + todas as dependências
```

### `list`

Lista componentes disponíveis e instalados.

```bash
npx @kobana/ui list
```

### `update`

Atualiza componentes para a versão mais recente do registry.

```bash
npx @kobana/ui update data-table
npx @kobana/ui update --all
npx @kobana/ui update --dry-run
```

### `diff`

Mostra diferenças entre a versão local e o registry.

```bash
npx @kobana/ui diff data-table
npx @kobana/ui diff --all
```

## Uso no código

```tsx
// Primitivos shadcn (sem mudança)
import { Button } from '@/components/ui/button'

// Compostos
import { DataTable } from '@/components/kobana/composites/data-table'
import { PageHeader } from '@/components/kobana/composites/page-header'

// Templates
import { ListPage } from '@/components/kobana/templates/list-page'

// Hooks
import { useDataTable } from '@/components/kobana/hooks/use-data-table'
```

## Exemplo: página de listagem

```tsx
import { ListPage } from '@/components/kobana/templates/list-page'

const columns = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'createdAt', header: 'Criado em' },
]

export default function SubscriptionsPage() {
  return (
    <ListPage
      title="Assinaturas"
      description="Gerencie as assinaturas dos clientes"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Assinaturas' }]}
      primaryAction={{ label: 'Nova assinatura', onClick: () => router.push('/new') }}
      columns={columns}
      data={subscriptions}
      pagination={{ page: 1, perPage: 20, total: 100, totalPages: 5 }}
      onPageChange={setPage}
      onSearch={setSearch}
      isLoading={isLoading}
      emptyState={{
        title: 'Nenhuma assinatura',
        description: 'Crie sua primeira assinatura para começar.',
        actionLabel: 'Nova assinatura',
        onAction: () => router.push('/new'),
      }}
    />
  )
}
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Build da CLI
npm run build

# Watch mode
npm run dev

# Testes
npm run test

# Storybook
npm run storybook
```

### Criando um novo componente

1. Implemente em `src/components/composites/<nome>/`
2. Exporte via `index.ts`
3. Adicione ao `registry/registry.json` com dependências
4. Crie story em `stories/composites/<Nome>.stories.tsx`
5. Teste: `npx @kobana/ui add <nome>` em um projeto limpo

## Documentação

- [Design System v2](docs/kobana-ui-design-system-v2.md) — Arquitetura e princípios
- [Catálogo de Componentes](docs/component-catalog.md) — Inventário extraído do kobana-billing
- [Plano de Implementação](docs/implementation.md) — Fases, cronograma e detalhes técnicos
- [TODO](docs/todo.md) — Checklist de tarefas

## Stack

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Table](https://tanstack.com/table)
- [tsup](https://tsup.egoist.dev/) (build da CLI)
- [Vitest](https://vitest.dev/) (testes)
- [Storybook](https://storybook.js.org/) (documentação)
