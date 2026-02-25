# @kobana/ui

## Design System

Documentação de Arquitetura e Guia de Implementação

Abordagem CLI + Registry — inspirado no shadcn/ui

React · Tailwind CSS · shadcn/ui

Kobana — Fevereiro 2026

Versão 2.0 — Documento Interno

---

## 1. Visão Geral

O @kobana/ui é o design system interno da Kobana, construído como uma camada de composição sobre o shadcn/ui. Seu objetivo principal é eliminar inconsistências visuais entre telas, reduzir o tempo de desenvolvimento e garantir que todos os sistemas da Kobana sigam o mesmo padrão de interface.

> **Modelo de distribuição**
>
> Assim como o shadcn/ui, o @kobana/ui NÃO é um pacote NPM instalado como dependência. Os componentes são copiados para dentro de cada projeto através de uma CLI. Isso garante autonomia total: cada projeto tem o código-fonte dos componentes e pode customizá-los localmente se necessário.

### 1.1 Por que CLI + Registry?

Os projetos da Kobana vivem em repositórios separados. Um pacote NPM tradicional criaria problemas de versionamento, sincronização e acoplamento. A abordagem de CLI resolve isso:

- **Sem dependência externa:** o código vive dentro do projeto, sem registry privado.
- **Autonomia total:** cada projeto pode customizar componentes localmente sem afetar outros.
- **Atualização opt-in:** o dev escolhe quando atualizar cada componente, sem breaking changes forçados.
- **Mesmo mental model:** devs que já usam shadcn conhecem o fluxo. Zero curva de aprendizado.
- **Tree-shaking natural:** só entra no projeto o que é usado.

### 1.2 Princípios do Design System

- **Composição sobre configuração:** componentes compostos que orquestram primitivos do shadcn, sem modificá-los.
- **Opiniões fortes, escape hatches:** o caminho fácil produz o resultado consistente; customizações exigem intenção.
- **Progressividade:** use o componente mais alto nível disponível. Só desça quando necessário.
- **Documentação como contrato:** se não está no Storybook, não existe como componente reutilizável.

---

## 2. Como Funciona

O sistema é composto por três peças: um repositório central com os componentes fonte e o registry, uma CLI que lê o registry e copia componentes, e a pasta destino dentro de cada projeto consumidor.

### 2.1 Fluxo de Uso pelo Desenvolvedor

1. **Inicialização:** o dev roda `npx @kobana/ui init` no projeto. A CLI cria a pasta de destino, o arquivo de configuração `kobana.json` e instala dependências base.
2. **Adição de componentes:** o dev roda `npx @kobana/ui add data-table`. A CLI consulta o registry, resolve dependências (shadcn + kobana) e copia os arquivos.
3. **Atualização:** o dev roda `npx @kobana/ui update data-table`. A CLI mostra um diff do que mudou e pede confirmação. Se o dev customizou localmente, ele resolve o merge.
4. **Listagem:** o dev roda `npx @kobana/ui list` para ver todos os componentes disponíveis e quais já estão instalados.

### 2.2 Exemplo Prático

Um desenvolvedor precisa criar uma página de listagem de boletos:

```bash
# 1. Inicializar (só na primeira vez)
npx @kobana/ui init

# 2. Adicionar o template de listagem
npx @kobana/ui add list-page

# A CLI automaticamente resolve e instala:
# - shadcn: table, pagination, input, select, dropdown-menu, badge
# - kobana: data-table, page-header, filter-bar, status-badge
# - kobana: list-page (template)

# 3. Usar no código
# import { ListPage } from '@/components/kobana/templates/list-page'
```

### 2.3 Resolução de Dependências

Cada componente do @kobana/ui pode depender de primitivos do shadcn e/ou de outros compostos do kobana. A CLI resolve toda a árvore automaticamente:

```
DataTable
├─ shadcn: table, checkbox, dropdown-menu, skeleton
├─ kobana: filter-bar
│  └─ shadcn: input, select, popover, calendar
├─ kobana: status-badge
│  └─ shadcn: badge
└─ npm: @tanstack/react-table

ListPage
├─ kobana: data-table (+ todas suas deps acima)
├─ kobana: page-header
│  └─ shadcn: breadcrumb, button
└─ kobana: confirm-dialog
   └─ shadcn: alert-dialog
```

> **Sem duplicação**
>
> Se um primitivo do shadcn já existe no projeto, a CLI não sobrescreve. Se um composto do kobana já foi adicionado, a CLI avisa e pergunta se quer atualizar.

---

## 3. Arquitetura em Camadas

O design system é organizado em três camadas. Cada camada consome apenas a camada inferior, nunca a superior.

| Camada | Descrição | Exemplos |
|---|---|---|
| **Primitivos** | Componentes do shadcn/ui. Instalados via CLI do próprio shadcn quando necessário. | Button, Input, Select, Dialog, Table, Tooltip, Badge |
| **Compostos** | Componentes que combinam primitivos com lógica de layout, estado e comportamento. Instalados via CLI do @kobana/ui. | DataTable, FormSection, PageHeader, FilterBar, ConfirmDialog, StatusBadge |
| **Templates** | Layouts de página completos. Instalados via CLI do @kobana/ui. | ListPage, DetailPage, FormPage, SettingsPage |

### 3.1 Fluxo de Decisão do Desenvolvedor

Ao implementar uma nova tela, siga esta ordem de prioridade:

| # | Pergunta | Ação |
|---|---|---|
| **1** | Existe um template que resolve? | `npx @kobana/ui add list-page` e configure. |
| **2** | Não existe template, mas existe composto? | `npx @kobana/ui add data-table` e compose. |
| **3** | Precisa de algo completamente novo? | Use shadcn diretamente. Promova a composto se reutilizado 3x. |

---

## 4. Repositório Central

O @kobana/ui vive em um repositório Git independente. Ele contém os componentes fonte, o registry JSON, a CLI e a documentação via Storybook.

### 4.1 Estrutura de Diretórios

```
kobana-ui/
  package.json
  tsconfig.json
  registry/
    registry.json              # Índice de todos os componentes
    schemas/
      component.schema.json    # Schema de validação
  src/
    cli/
      index.ts                 # Entry point da CLI
      commands/
        init.ts                # Comando init
        add.ts                 # Comando add
        update.ts              # Comando update
        list.ts                # Comando list
        diff.ts                # Comando diff
      utils/
        registry.ts            # Fetch e parse do registry
        resolver.ts            # Resolução de dependências
        installer.ts           # Cópia de arquivos
        config.ts              # Leitura do kobana.json
    components/
      composites/
        data-table/
          data-table.tsx
          data-table-filters.tsx
          data-table-pagination.tsx
          data-table-actions.tsx
          index.ts
        page-header/
          page-header.tsx
          index.ts
        filter-bar/
          filter-bar.tsx
          index.ts
        form-section/
          form-section.tsx
          index.ts
        confirm-dialog/
          confirm-dialog.tsx
          index.ts
        status-badge/
          status-badge.tsx
          index.ts
      templates/
        list-page/
          list-page.tsx
          index.ts
        detail-page/
          detail-page.tsx
          index.ts
        form-page/
          form-page.tsx
          index.ts
    hooks/
      use-data-table.ts
      use-filters.ts
      use-pagination.ts
    tokens/
      colors.ts
      spacing.ts
      typography.ts
  stories/
    composites/
    templates/
```

### 4.2 Registry JSON

O registry é o coração do sistema. É um arquivo JSON que descreve cada componente, seus arquivos, dependências de shadcn, dependências de kobana e dependências NPM. A CLI consulta este arquivo para resolver o que precisa ser instalado.

**Estrutura do Registry**

```json
{
  "$schema": "./schemas/component.schema.json",
  "name": "@kobana/ui",
  "version": "2.0.0",
  "baseUrl": "https://raw.githubusercontent.com/kobana/ui/main",
  "components": {
    "data-table": {
      "name": "DataTable",
      "description": "Tabela de dados com filtros, paginação e ações",
      "category": "composite",
      "files": [
        "src/components/composites/data-table/data-table.tsx",
        "src/components/composites/data-table/data-table-filters.tsx",
        "src/components/composites/data-table/data-table-pagination.tsx",
        "src/components/composites/data-table/data-table-actions.tsx",
        "src/components/composites/data-table/index.ts"
      ],
      "dependencies": {
        "shadcn": ["table", "checkbox", "dropdown-menu", "skeleton"],
        "kobana": ["filter-bar", "status-badge"],
        "npm": ["@tanstack/react-table"]
      }
    },
    "list-page": {
      "name": "ListPage",
      "description": "Template de página de listagem completa",
      "category": "template",
      "files": [
        "src/components/templates/list-page/list-page.tsx",
        "src/components/templates/list-page/index.ts"
      ],
      "dependencies": {
        "shadcn": [],
        "kobana": ["data-table", "page-header", "confirm-dialog"],
        "npm": []
      }
    }
  }
}
```

> **Importante: Versionamento do Registry**
>
> Cada componente no registry pode ter um campo "version" individual. Isso permite que a CLI detecte se o componente local está desatualizado e ofereça update com diff.

---

## 5. CLI — Comandos

A CLI é publicada no NPM como @kobana/ui e executada via npx. Ela não precisa ser instalada como dependência do projeto.

### 5.1 init

Inicializa o @kobana/ui em um projeto existente. Cria o arquivo de configuração e a estrutura de pastas.

```bash
npx @kobana/ui init

# Perguntas interativas:
# - Onde ficam seus componentes? (default: src/components)
# - Usar TypeScript? (default: sim)
# - Qual o alias de import? (default: @/components)
# - shadcn já está configurado? (detecta automaticamente)
```

**Arquivo kobana.json gerado**

```json
{
  "componentDir": "src/components/kobana",
  "typescript": true,
  "alias": "@/components/kobana",
  "registry": "https://raw.githubusercontent.com/kobana/ui/main/registry/registry.json",
  "installed": {}
}
```

### 5.2 add

Adiciona um ou mais componentes ao projeto. Resolve dependências automaticamente.

```bash
# Adicionar um componente
npx @kobana/ui add data-table

# Adicionar múltiplos
npx @kobana/ui add data-table page-header confirm-dialog

# Adicionar um template (instala todas as dependências)
npx @kobana/ui add list-page

# Output esperado:
# ✔ Instalando dependências shadcn: table, checkbox, dropdown-menu...
# ✔ Adicionando filter-bar em src/components/kobana/composites/
# ✔ Adicionando status-badge em src/components/kobana/composites/
# ✔ Adicionando data-table em src/components/kobana/composites/
# ✔ Instalando pacotes npm: @tanstack/react-table
# ✔ Pronto! 3 componentes adicionados.
```

### 5.3 update

Atualiza componentes já instalados para a versão mais recente do registry. Mostra diff antes de aplicar.

```bash
# Atualizar um componente específico
npx @kobana/ui update data-table

# Atualizar todos
npx @kobana/ui update --all

# Verificar o que mudou sem aplicar
npx @kobana/ui diff data-table

# Output esperado:
# ⚠ data-table foi modificado localmente. Mostrar diff? (s/n)
# --- local/data-table.tsx
# +++ registry/data-table.tsx
# @@ -42,7 +42,9 @@
# Aplicar atualização? (s/n)
```

### 5.4 list

Lista todos os componentes disponíveis no registry com status de instalação.

```bash
npx @kobana/ui list

# Output esperado:
# Compostos:
#  ✔ data-table       Tabela com filtros, paginação e ações
#  ✔ page-header      Cabeçalho de página padrão
#  ✔ filter-bar       Barra de filtros reutilizável
#  ○ form-section     Seção de formulário com grid
#  ○ confirm-dialog   Dialog de confirmação
#  ○ status-badge     Badge semântico de status
#
# Templates:
#  ○ list-page        Página de listagem completa
#  ○ detail-page      Página de detalhe
#  ○ form-page        Página de formulário
#
# Hooks:
#  ○ use-data-table   Hook para DataTable
#  ○ use-filters      Hook para filtros
#  ○ use-pagination   Hook para paginação
```

### 5.5 diff

Mostra as diferenças entre a versão local de um componente e a versão mais recente do registry. Útil para avaliar antes de atualizar.

```bash
npx @kobana/ui diff data-table
npx @kobana/ui diff --all
```

---

## 6. Estrutura no Projeto Consumidor

Após a inicialização e instalação de componentes, a estrutura dentro de cada projeto fica assim:

```
src/
  components/
    ui/                        # Primitivos do shadcn (já existente)
      button.tsx
      input.tsx
      table.tsx
      ...
    kobana/                    # Componentes do @kobana/ui
      composites/
        data-table/
          data-table.tsx
          data-table-filters.tsx
          data-table-pagination.tsx
          data-table-actions.tsx
          index.ts
        page-header/
          page-header.tsx
          index.ts
        filter-bar/
        status-badge/
      templates/
        list-page/
          list-page.tsx
          index.ts
      hooks/
        use-data-table.ts
      tokens/
        colors.ts
        spacing.ts
kobana.json                    # Configuração do @kobana/ui
```

### 6.1 Imports no Código

Os componentes são importados via alias, exatamente como os componentes do shadcn:

```tsx
// Primitivos do shadcn (sem mudança)
import { Button } from '@/components/ui/button'

// Compostos do @kobana/ui
import { DataTable } from '@/components/kobana/composites/data-table'
import { PageHeader } from '@/components/kobana/composites/page-header'

// Templates do @kobana/ui
import { ListPage } from '@/components/kobana/templates/list-page'

// Hooks do @kobana/ui
import { useDataTable } from '@/components/kobana/hooks/use-data-table'
```

---

## 7. Catálogo de Componentes Compostos

Esta seção descreve os componentes compostos principais, suas responsabilidades e a API pública esperada.

### 7.1 DataTable

O componente central do sistema. Encapsula tabela, filtros, paginação, ordenação, seleção de linhas e ações em massa. Usa @tanstack/react-table internamente.

**Responsabilidades**

- Renderizar colunas com tipagem forte via generics
- Filtros integrados (busca textual, selects, date range)
- Paginação server-side e client-side
- Ordenação por coluna
- Seleção de linhas com ações em massa
- Ações por linha via dropdown
- Estado vazio customizável
- Loading skeleton automático

**Props Principais**

| Prop | Tipo | Req | Descrição |
|---|---|---|---|
| columns | `ColumnDef<T>[]` | Sim | Definição das colunas (TanStack Table). |
| data | `T[]` | Sim | Array de dados a serem exibidos. |
| filters | `FilterConfig[]` | Não | Filtros exibidos acima da tabela. |
| pagination | `PaginationConfig` | Não | Paginação (pageSize, total, onChange). |
| selectable | `boolean` | Não | Habilita seleção com checkbox. |
| bulkActions | `BulkAction[]` | Não | Ações quando há linhas selecionadas. |
| rowActions | `RowAction<T>[]` | Não | Ações no dropdown de cada linha. |
| emptyState | `ReactNode` | Não | Componente quando não há dados. |
| isLoading | `boolean` | Não | Exibe skeleton de carregamento. |
| onRowClick | `(row: T) => void` | Não | Callback ao clicar em uma linha. |

### 7.2 PageHeader

Cabeçalho padrão de página com título, descrição, breadcrumbs e ações.

| Prop | Tipo | Descrição |
|---|---|---|
| title | `string` | Título principal da página. |
| description | `string` | Texto descritivo abaixo do título. |
| breadcrumbs | `Breadcrumb[]` | Migalhas de pão para navegação. |
| actions | `ReactNode` | Botões de ação posicionados à direita. |

### 7.3 FilterBar

Barra de filtros reutilizável. Suporta texto, select, multi-select, date range e custom.

| Prop | Tipo | Descrição |
|---|---|---|
| filters | `FilterConfig[]` | Array de configurações de filtro. |
| values | `Record<string, any>` | Valores atuais dos filtros (controlado). |
| onChange | `(values) => void` | Callback quando qualquer filtro muda. |
| onClear | `() => void` | Callback para limpar todos os filtros. |

### 7.4 FormSection

Agrupa campos de formulário com título, descrição e grid consistente. Integra com React Hook Form.

| Prop | Tipo | Descrição |
|---|---|---|
| title | `string` | Título da seção do formulário. |
| description | `string` | Texto explicativo da seção. |
| columns | `1 \| 2 \| 3` | Número de colunas do grid (default: 1). |
| children | `ReactNode` | Campos do formulário. |

### 7.5 ConfirmDialog

Dialog de confirmação padronizado para ações destrutivas. Suporta variantes de severidade.

| Prop | Tipo | Descrição |
|---|---|---|
| variant | `danger \| warning \| info` | Define cor e ícone do dialog. |
| title | `string` | Título do dialog. |
| description | `string` | Mensagem explicativa. |
| confirmLabel | `string` | Texto do botão de confirmação. |
| onConfirm | `() => void \| Promise` | Callback de confirmação (suporta async). |

### 7.6 StatusBadge

Badge semântico que mapeia status do domínio para cores e ícones consistentes.

| Prop | Tipo | Descrição |
|---|---|---|
| status | `active \| inactive \| pending \| error` | Status que define cor e ícone automaticamente. |
| label | `string` | Texto exibido (default: status capitalizado). |
| size | `sm \| md` | Tamanho do badge. |

---

## 8. Templates de Página

Templates são o nível mais alto de abstração. Definem o layout completo de uma página compondo componentes compostos. O dev só passa a configuração específica do domínio.

### 8.1 ListPage

Template para páginas de listagem. Compõe: PageHeader + FilterBar + DataTable.

**O que inclui automaticamente**

- PageHeader com título, descrição e botão de ação primária
- FilterBar configurada via array de filtros
- DataTable com paginação, ordenação e ações
- Estado vazio padrão com ilustração e CTA
- Loading state com skeletons
- URL sync automático de filtros e paginação

### 8.2 DetailPage

Template para páginas de detalhe de um registro. Inclui header com breadcrumbs, seções de informação, tabs opcionais e ações contextuais.

### 8.3 FormPage

Template para criação e edição. Inclui header, FormSections organizadas, barra de ações sticky no rodapé e navegação lateral em formulários longos.

---

## 9. Design Tokens

Tokens são os valores fundamentais do design system. Definidos como variáveis CSS e exportados como constantes TypeScript. São adicionados ao projeto via `npx @kobana/ui add tokens`.

### 9.1 Cores Semânticas

| Token | Uso | Variável CSS |
|---|---|---|
| status-success | Sucesso, ativo, aprovado | `--color-status-success` |
| status-warning | Atenção, pendente | `--color-status-warning` |
| status-error | Erro, rejeitado, inativo | `--color-status-error` |
| status-info | Informativo, neutro | `--color-status-info` |

### 9.2 Espaçamento

Escala de 4px como base, alinhada com as classes do Tailwind.

| Token | Valor | Tailwind | Uso Comum |
|---|---|---|---|
| space-xs | 4px | p-1, gap-1 | Entre ícone e texto |
| space-sm | 8px | p-2, gap-2 | Padding de badges |
| space-md | 16px | p-4, gap-4 | Padding de cards |
| space-lg | 24px | p-6, gap-6 | Entre seções |
| space-xl | 32px | p-8, gap-8 | Margens de página |

---

## 10. Desenvolvimento do Repositório Central

### 10.1 Processo de Criação de Componente

Todo novo componente composto deve seguir este processo:

1. **Identifique o padrão:** o componente aparece em pelo menos 3 telas? Se sim, promova.
2. **Defina a API primeiro:** escreva as props e tipos antes de implementar. Revise com o time.
3. **Implemente com Storybook:** desenvolva isolado no Storybook, cobrindo todas as variações.
4. **Atualize o registry:** adicione o componente ao `registry.json` com todas as dependências.
5. **Teste a CLI:** rode `npx @kobana/ui add [componente]` em um projeto limpo e valide.
6. **Documente:** JSDoc em todas as props, stories demonstrando uso correto e incorreto.
7. **Code review:** PRs requerem aprovação de pelo menos 2 devs.

### 10.2 Convenções de Código

- Nomes de componentes em PascalCase
- Nomes de arquivos em kebab-case
- Cada componente composto em sua própria pasta com `index.ts`
- Props exportadas como tipos nomeados (não inline)
- Todos os componentes devem aceitar `className` para override via Tailwind
- Usar `forwardRef` em todos os componentes que renderizam elementos DOM
- Preferência por composição via `children` ao invés de render props
- Imports de shadcn devem usar o alias `@/components/ui` (a CLI ajusta o path)

### 10.3 Testes da CLI

A CLI deve ter testes automatizados que validam:

- Resolução correta de dependências (sem circular, sem faltante)
- Copia correta de arquivos para a pasta destino
- Detecção de conflitos com componentes já instalados
- Ajuste correto de paths de import baseado no `kobana.json`
- Instalação de dependências NPM via package manager do projeto

---

## 11. Documentação com Storybook

O Storybook vive no repositório central e serve como documentação viva. Deploy automático em cada merge na main.

- Estado padrão (default) de cada componente
- Todas as variantes de props
- Estados de loading e erro
- Estado vazio
- Responsividade
- Exemplos de uso correto e incorreto
- Comando CLI para instalar (em cada page de docs)

### 11.1 Organização

```
stories/
  composites/
    DataTable.stories.tsx
    PageHeader.stories.tsx
    FilterBar.stories.tsx
    FormSection.stories.tsx
    ConfirmDialog.stories.tsx
    StatusBadge.stories.tsx
  templates/
    ListPage.stories.tsx
    DetailPage.stories.tsx
    FormPage.stories.tsx
```

---

## 12. Governança e Adoção

### 12.1 Regras de Uso

- **Proibido:** montar tabelas com Table do shadcn diretamente quando DataTable resolve.
- **Proibido:** criar headers de página custom quando PageHeader resolve.
- **Proibido:** criar dialogs de confirmação custom quando ConfirmDialog resolve.
- **Permitido:** usar primitivos do shadcn para layouts únicos.
- **Permitido:** customizar um componente kobana localmente se necessário (porém documentar o motivo).
- **Obrigatório:** se um padrão novo aparece 3+ vezes, criar issue no repo central.

### 12.2 ESLint Rules (Recomendado)

- **no-direct-shadcn-table:** avisa quando Table do shadcn é importado fora da pasta kobana.
- **prefer-kobana-composite:** sugere uso de compostos quando detecta padrões conhecidos.

### 12.3 Versionamento do Registry

O `registry.json` segue Semantic Versioning (SemVer). Cada componente também tem sua própria versão para que a CLI possa detectar atualizações granulares.

- **Patch (1.0.x):** correções de bugs, ajustes visuais menores.
- **Minor (1.x.0):** novos componentes, novas props opcionais.
- **Major (x.0.0):** breaking changes em APIs existentes.

> **Sobre customizações locais**
>
> Se um projeto customizou um componente localmente, o comando update mostrará um diff e o dev decide se aplica. Customizações locais nunca são sobrescritas sem confirmação.

---

## 13. Roadmap de Implementação

### Fase 1 — Infraestrutura (Semanas 1–2)

- Criar repositório kobana-ui
- Implementar CLI com comandos init, add e list
- Criar `registry.json` com schema de validação
- Setup do Storybook
- Design tokens (cores, espaçamento, tipografia)
- Publicar CLI no NPM como @kobana/ui

### Fase 2 — Compostos Essenciais (Semanas 3–4)

- DataTable (componente mais crítico)
- PageHeader
- FilterBar
- FormSection
- ConfirmDialog
- StatusBadge

### Fase 3 — Templates e CLI Avançada (Semanas 5–6)

- ListPage template
- DetailPage template
- FormPage template
- Comandos update e diff na CLI
- Migração de 2–3 telas existentes como prova de conceito

### Fase 4 — Adoção (Semanas 7–8)

- ESLint rules
- Documentação completa no Storybook
- Deploy automático do Storybook
- Workshop com o time de desenvolvimento
- Migração gradual das telas existentes

> **Próximos passos**
>
> Este documento serve como base para discussão com o time. O passo seguinte é validar o catálogo de componentes com as telas existentes da Kobana, implementar a CLI e o primeiro componente composto (DataTable) como prova de conceito.
