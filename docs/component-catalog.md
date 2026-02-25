# @kobana/ui — Catálogo de Componentes

Extraído do projeto `kobana-billing` em 2026-02-25.

Referência completa de todos os compostos, templates e padrões identificados para o design system.

---

## Sumário

- [1. Layout](#1-layout)
- [2. Data Display](#2-data-display)
- [3. Forms](#3-forms)
- [4. Feedback & Dialogs](#4-feedback--dialogs)
- [5. Payment & Checkout](#5-payment--checkout)
- [6. Table Cells](#6-table-cells)
- [7. Providers & Context](#7-providers--context)
- [8. UI Primitivos Customizados](#8-ui-primitivos-customizados)
- [9. Hooks](#9-hooks)
- [10. Templates de Página](#10-templates-de-página)
- [11. Padrões Arquiteturais](#11-padrões-arquiteturais)
- [12. Mapa de Navegação](#12-mapa-de-navegação)
- [13. Priorização para o Design System](#13-priorização-para-o-design-system)

---

## 1. Layout

### 1.1 Header

**Origem:** `components/layout/header.tsx`

Header principal da aplicação (dashboard).

**Funcionalidades:**
- Customer scope selector (dropdown com busca de clientes)
- Theme toggle (light/dark com transição suave)
- Language switcher (pt-BR / en-US)
- Dropdown de notificações com ícone de sino
- User menu com perfil, configurações e logout
- Trigger do modal de bug report

**Primitivos shadcn:** DropdownMenu, Button, Tooltip

**Props:** Nenhuma prop externa — usa session e hooks internamente (next-auth, next-themes, next-intl).

---

### 1.2 Sidebar

**Origem:** `components/layout/sidebar.tsx`

Sidebar principal de navegação com estado colapsável.

**Funcionalidades:**
- Logo com app switcher dropdown
- Grupos de navegação (billing, catalog, customers, reports, operations, fiscal, system)
- Toggle colapsável/expandível com animação
- Highlight de rota ativa
- Tooltips no estado colapsado
- Variante mobile: `MobileSidebar` (usa Sheet)

**Primitivos shadcn:** Button, DropdownMenu, Tooltip, Sheet (mobile)

**API:**
- `Sidebar()` — Desktop (hidden on mobile)
- `MobileSidebar()` — Mobile navigation
- Context: `useSidebar` para gerenciamento de estado
- Estados: `isCollapsed` (toggleable), `activeNavigation`

---

### 1.3 PortalHeader

**Origem:** `components/portal/portal-header.tsx`

Header do portal do cliente com branding customizado.

**Funcionalidades:**
- Logo customizado (variantes light/dark)
- Trigger de menu mobile (Sheet)
- Branding da organização
- Theme toggle, language switcher, bug report
- User menu com perfil/configurações/logout

**Primitivos shadcn:** Button, Sheet, DropdownMenu

**Props:**
```typescript
interface PortalHeaderProps {
  customerName?: string;
  customerEmail?: string;
}
```

---

### 1.4 PortalSidebar

**Origem:** `components/portal/portal-sidebar.tsx`

Sidebar do portal do cliente com feature flags.

**Funcionalidades:**
- Navegação dinâmica baseada em config do portal
- Toggle de feature (ex: `enabledFeatures.plans`)
- Seção de produtos com separador
- Settings no rodapé
- Variante mobile: `PortalMobileSidebar`
- Descrições opcionais nos itens de navegação

**Primitivos shadcn:** Separator, Link

**API:**
- `PortalSidebar()` — Desktop
- `PortalMobileSidebar()` — Mobile
- Feature detection: `enabledFeatures.plans`

---

### 1.5 ManageHeader

**Origem:** `components/manage/manage-header.tsx`

Header do painel administrativo.

**Funcionalidades:**
- Account selector com combobox
- Search input
- Theme toggle, language switcher, bug report
- Badge de notificações com contagem
- Dropdown de perfil do usuário

**Primitivos shadcn:** Button, Popover, Command, Input

**Integrações:** `useManageAccount` hook, suporte multi-account.

---

### 1.6 ManageSidebar

**Origem:** `components/manage/manage-sidebar.tsx`

Sidebar do painel administrativo.

**Funcionalidades:**
- Tema dark (slate-900 background)
- Navegação hierárquica (main, account data, system)
- Logo com badge "ADMIN"
- Variante mobile via Sheet
- Highlight de estado ativo

**Primitivos shadcn:** Button, Sheet

**API:**
- `ManageSidebar()` — Desktop (hidden on lg)
- `ManageMobileSidebar()` — Mobile trigger

---

## 2. Data Display

### 2.1 DataTable

**Origem:** `components/ui/data-table.tsx`

Tabela de dados enterprise com TanStack React Table.

**Funcionalidades:**
- Sorting (server-side ou client-side)
- Filtro de colunas
- Toggle de visibilidade de colunas
- Paginação (suporte server-side)
- Busca com debounce (300ms)
- Botão de refresh
- Seleção de linhas
- Coluna de ações sticky (direita)
- Loading states com skeleton
- Suporte a componente de filtro customizado
- Layout com busca acima dos filtros

**Primitivos shadcn:** Table, Button, DropdownMenu, Checkbox, Skeleton

**Props:**
```typescript
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  isSearching?: boolean;
  filterComponent?: React.ReactNode;
  columnLabels?: Record<string, string>;
  searchAboveFilters?: boolean;
}
```

---

### 2.2 DataTableColumnHeader

**Origem:** `components/manage/data-table-column-header.tsx`

Header de coluna com sorting e hide.

**Funcionalidades:**
- Dropdown com opções de sort (asc/desc)
- Opção de esconder coluna
- Ícones indicadores de estado de sort

**Primitivos shadcn:** Button, DropdownMenu

**Props:**
```typescript
interface DataTableColumnHeaderProps<TField extends string> {
  title: string;
  field: string;
  sortField?: TField | null;
  sortOrder?: 'asc' | 'desc' | null;
  onSort?: (field: TField, order: SortOrder) => void;
  onHide?: (field: string) => void;
  canSort?: boolean;
  canHide?: boolean;
}
```

---

### 2.3 ProductsPricingTable

**Origem:** `components/products-pricing-table.tsx`

Tabela de preços de produtos.

**Funcionalidades:**
- Links de produtos
- Setup fees (one-time)
- Cobranças recorrentes
- Multiplicadores de quantidade
- Suporte a produtos metered
- Preço por ciclo com descontos
- Referência mensal para ciclos multi-mês
- Subtotal e breakdown de desconto
- Tratamento de produtos one-time

**Primitivos shadcn:** Card

**Props:**
```typescript
interface ProductsPricingTableProps {
  items: ProductPricingItem[];
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  billingCycle?: string;
  cycleDiscountSettings?: CycleDiscountSettings;
}
```

---

### 2.4 NfeCard

**Origem:** `components/nfe/nfe-card.tsx`

Card de exibição de Nota Fiscal Eletrônica.

**Funcionalidades:**
- Badge de status
- Data de emissão e valor
- Código de verificação
- Chave de acesso (NFe key)
- Botões de download PDF/XML
- Exibição de mensagem de erro
- Estados processing/pending
- Botão de refresh

**Primitivos shadcn:** Card, Button, Badge

**Props:**
```typescript
interface NfeCardProps {
  nfe: {
    id: string;
    status: string;
    nfeNumber?: string;
    nfeSeries?: string;
    nfeKey?: string;
    verificationCode?: string;
    issueDate?: string;
    amountCents: number;
    // ...
  };
  currency?: string;
  onRefresh?: () => void;
  className?: string;
}
```

---

### 2.5 CreditBalanceCard

**Origem:** `components/portal/credit-balance-card.tsx`

Card de saldo de créditos do cliente.

**Funcionalidades:**
- Exibição de saldo disponível
- Alerta de créditos expirando
- Botão de aplicar créditos
- Integração com ApplyCreditsDialog

**Primitivos shadcn:** Card, Button, Badge, Alert

**Props:**
```typescript
interface CreditBalanceCardProps {
  invoiceId: string;
  availableBalance: number;
  invoiceRemainingCents: number;
  maxApplicable: number;
  canApply: boolean;
  creditsExpiringSoon: number;
  credits: Array<{
    id: string;
    type: string;
    amountRemainingCents: number;
    description?: string;
    expiresAt?: string;
  }>;
  onCreditsApplied?: () => void;
}
```

---

## 3. Forms

### 3.1 AddressFormFields

**Origem:** `components/forms/address-form-fields.tsx`

Campos completos de endereço brasileiro com lookup de CEP.

**Funcionalidades:**
- Auto-lookup de CEP com preenchimento automático (rua, bairro, estado, cidade)
- Formatação de CEP (99999-999)
- Seletor de estado com combobox
- Combobox de cidade (depende do estado)
- Inputs: rua, número, complemento, bairro
- Mapeamento dinâmico de nomes de campos
- Namespace de tradução configurável
- Endpoints de API customizáveis

**Primitivos shadcn:** FormField, FormControl, FormItem, FormLabel, FormMessage, Input

**Props:**
```typescript
interface AddressFormFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  baseName: string; // ex: 'billingAddress'
  disabled?: boolean;
  cepApiUrl?: string;
  citiesApiUrl?: string;
  fieldNames?: {
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    state?: string;
    city?: string;
    cityIbgeCode?: string;
  };
  translationNamespace?: string;
}
```

---

### 3.2 ProductItemsField

**Origem:** `components/forms/product-items-field.tsx`

Seleção dinâmica de produtos em formulários.

**Funcionalidades:**
- Botão de adicionar produto com modal/popover
- Busca de produto com combobox
- Seleção de preço (depende do produto)
- Input de quantidade com incremento
- Suporte a child products (setup multiply)
- Excluir/restaurar child products
- Cálculo de total estimado
- Badges de tipo de produto (base, addon, metered, one-time)
- Tooltips de ajuda por tipo
- Exibição de grupo do produto
- Botão de remover produto

**Primitivos shadcn:** Button, Card, Badge, Popover, Command, Input, Select, Switch, Sheet, Alert

**Props:** Altamente customizável com configurações extensivas de labels.

---

### 3.3 StateCombobox

**Origem:** `components/forms/state-combobox.tsx`

Seletor de estado brasileiro (UF).

**Funcionalidades:**
- Todos os 27 estados brasileiros (26 estados + DF)
- Busca no combobox
- Componente controlado

**Primitivos shadcn:** Popover, Command

---

### 3.4 CityCombobox

**Origem:** `components/forms/city-combobox.tsx`

Seletor de cidade do banco IBGE.

**Funcionalidades:**
- Depende da seleção de estado
- Suporte a código IBGE
- Loading assíncrono de cidades
- Busca

**Primitivos shadcn:** Popover, Command, Loader

---

### 3.5 CompanySelector

**Origem:** `components/forms/company-selector.tsx`

Busca e seleção de empresa com integração de formulário.

**Funcionalidades:**
- Busca assíncrona de empresas
- Exibição de CNPJ
- Badge da empresa selecionada
- Limpar seleção
- Integração com form field

**Primitivos shadcn:** FormField, Popover, Command, Button, Badge

---

### 3.6 CompanySelectorStandalone

**Origem:** `components/forms/company-selector-standalone.tsx`

Seleção de empresa sem integração de formulário. Mesmas funcionalidades do CompanySelector, porém independente.

---

### 3.7 CnpjLookupField

**Origem:** `components/forms/cnpj-lookup-field.tsx`

Input de CNPJ com auto-lookup de dados da empresa.

**Funcionalidades:**
- Validação de CNPJ
- Auto-fetch de info da empresa quando CNPJ válido
- Exibição de razão social
- Indicadores de status

**Primitivos shadcn:** FormField, Input, Alert

---

### 3.8 CustomerCombobox

**Origem:** `components/forms/customer-combobox.tsx`

Busca e seleção de cliente em formulários.

**Funcionalidades:**
- Busca assíncrona de clientes
- Exibição de email do cliente
- Seleção via combobox

**Primitivos shadcn:** Popover, Command, Button

---

## 4. Feedback & Dialogs

### 4.1 ApplyCreditsDialog

**Origem:** `components/portal/apply-credits-dialog.tsx`

Dialog para aplicação de créditos em faturas.

**Funcionalidades:**
- Exibição de créditos a serem aplicados (simulação FIFO)
- Badges de tipo de crédito
- Exibição de data de expiração
- Seção de resumo
- Cálculo de saldo
- Saldo resultante após aplicação
- Indicador "pagará integralmente"
- Ação de aplicar com loading state
- Tratamento de sucesso/erro

**Primitivos shadcn:** Dialog, Button, Badge, Separator, Alert

**Props:**
```typescript
interface ApplyCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  availableBalance: number;
  invoiceRemainingCents: number;
  maxApplicable: number;
  credits: Array<{
    id: string;
    type: string;
    amountRemainingCents: number;
    description?: string;
    expiresAt?: string;
  }>;
  onSuccess?: () => void;
}
```

---

### 4.2 PermissionsEditorDialog

**Origem:** `components/manage/permissions-editor-dialog.tsx`

Dialog complexo de gerenciamento de permissões.

**Funcionalidades:**
- Grupos de permissões em accordion
- Permissões hierárquicas (wildcards full-access)
- Seleção de grupo com estados indeterminados
- Checkboxes individuais de permissão
- Descrições e códigos de permissão
- Botões "Selecionar tudo" / "Limpar tudo"
- Badges de contagem de permissões por grupo
- Full-access desabilita outras permissões
- Wildcards destacados
- Loading e error states com retry
- Ações save/cancel

**Primitivos shadcn:** Dialog, Checkbox, Label, Badge, ScrollArea, Accordion, Button

**Props:**
```typescript
interface PermissionsEditorDialogProps {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (userId: string, permissions: string[]) => Promise<void>;
}
```

---

### 4.3 BugReportModal

**Origem:** `components/bug-report/bug-report-modal.tsx`

Modal de report de bug com integração Capture.dev.

**Funcionalidades:**
- Modal com fluxo de report
- Lista de features (screenshot, descrição, info técnica)
- Info de atalho de teclado
- Abre ferramenta de screenshot do Capture.dev

**Primitivos shadcn:** Dialog, Button, Tooltip

**Props:**
```typescript
interface BugReportModalProps {
  tooltipLabel?: string;
}
```

---

### 4.4 NfeStatusBadge

**Origem:** `components/nfe/nfe-status-badge.tsx`

Badge de status para estados de NFe.

**Funcionalidades:**
- Ícones por status (pending, processing, issued, canceled, error)
- Cores por status
- Spinner animado para processing
- Suporte a tradução
- Cores para dark mode

**Primitivos shadcn:** Badge (custom styled)

**Props:**
```typescript
interface NfeStatusBadgeProps {
  status: 'pending' | 'processing' | 'issued' | 'canceled' | 'error';
  className?: string;
}
```

---

## 5. Payment & Checkout

### 5.1 CheckoutForm

**Origem:** `components/checkout/checkout-form.tsx`

Fluxo completo de checkout/pagamento.

**Funcionalidades:**
- Fluxo multi-step (select → processing → payment → success/error)
- Seletor de método de pagamento (PIX, Boleto, Cartão)
- Sheet de detalhes da fatura
- Exibição de breakdown de impostos
- Exibição de créditos aplicados
- Detalhe de line items
- Forms específicos por método (PixPayment, BoletoPayment, CardPayment)
- Polling para status de boleto em processamento
- Tratamento de erros e retry
- Loading states

**Primitivos shadcn:** Card, Button, Alert, Sheet

**Props:**
```typescript
interface CheckoutFormProps {
  invoice: InvoiceDetails;
  availableMethods: PaymentMethodType[];
  pagarmePublicKey?: string;
  onCreatePayment: (
    method: PaymentMethodType,
    cardData?: CardData,
    paymentMethodId?: string
  ) => Promise<PaymentResult>;
  onPaymentSuccess?: (paymentId?: string, method?: PaymentMethodType) => void;
  className?: string;
}
```

---

### 5.2 PaymentMethodSelector

**Origem:** `components/checkout/payment-method-selector.tsx`

Seleção de método de pagamento via radio.

**Funcionalidades:**
- Opções: Card, PIX, Boleto
- Ícones com badges coloridos
- Texto descritivo
- Labels de tempo de processamento
- Renderização condicional baseada em métodos disponíveis

**Primitivos shadcn:** Card, RadioGroup, Label

**Props:**
```typescript
interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onMethodChange: (method: PaymentMethodType) => void;
  availableMethods?: PaymentMethodType[];
  disabled?: boolean;
}
```

---

### 5.3 PixPayment

**Origem:** `components/checkout/pix-payment.tsx`

Exibição e monitoramento de pagamento PIX.

**Funcionalidades:**
- Exibição de QR Code
- Cópia do texto do QR Code
- Timer de expiração
- Polling de confirmação de pagamento
- Botão de refresh
- Exibição de tempo restante

---

### 5.4 BoletoPayment

**Origem:** `components/checkout/boleto-payment.tsx`

Exibição de pagamento por boleto.

**Funcionalidades:**
- Exibição de código de barras
- Cópia do código de barras
- Download de PDF
- Exibição de data de vencimento
- Instruções de pagamento

---

### 5.5 CardPayment

**Origem:** `components/checkout/card-payment.tsx`

Formulário de pagamento por cartão de crédito.

**Funcionalidades:**
- Campos de input do cartão
- Lista de cartões salvos
- Seleção de cartão
- Estado de processamento
- Exibição de erros

---

## 6. Table Cells

### 6.1 CopyIdCell

**Origem:** `components/manage/copy-id-cell.tsx`

Célula de tabela com ID e botão copy-to-clipboard.

**Funcionalidades:**
- Trunca IDs longos
- Copy to clipboard
- Feedback de sucesso (ícone Check, timeout 2s)
- Tooltip com ID completo

**Primitivos shadcn:** Button, Tooltip

**Props:**
```typescript
interface CopyIdCellProps {
  id: string;
}
```

---

### 6.2 AccountLinkCell

**Origem:** `components/manage/account-link-cell.tsx`

Célula de tabela com nome de conta como link.

**Funcionalidades:**
- Nome da conta como link
- Email subordinado
- Suporte a dark mode

**Props:**
```typescript
interface AccountLinkCellProps {
  accountId: string;
  accountName: string;
  accountEmail?: string;
}
```

---

## 7. Providers & Context

### 7.1 PortalConfigProvider

**Origem:** `components/providers/portal-config-provider.tsx`

Provedor de configuração do portal.

**Funcionalidades:**
- Nome da empresa, título, logo (light/dark)
- Disponibilidade de métodos de pagamento
- Feature flags (checkout, plans)
- Suporte a idiomas
- Configurações de convite de usuário

**Hooks:** `usePortalConfig()`, `usePortalConfigOptional()`

**Props:**
```typescript
interface PortalConfigProviderProps {
  config: PortalConfigWithDefaults;
  children: ReactNode;
}
```

---

### 7.2 CustomerScopeProvider

**Origem:** `components/layout/customer-scope-context.tsx`

Gerenciamento de estado de escopo de cliente.

**Funcionalidades:**
- Persistência em localStorage
- Tratamento de hidratação
- Context: `CustomerScopeContext`

**Hook:** `useCustomerScope()`

**API:**
```typescript
interface CustomerScopeContextType {
  customer: ScopedCustomer | null;
  setCustomer: (customer: ScopedCustomer | null) => void;
  clearScope: () => void;
  isHydrated: boolean;
}
```

---

### 7.3 ManageAccountContext

**Origem:** `components/manage/manage-account-context.tsx`

Gerenciamento de seleção de conta no admin. Similar ao CustomerScopeContext mas para manage account.

---

### 7.4 ThemeProvider

**Origem:** `components/providers/theme-provider.tsx`

Gerenciamento de tema light/dark via next-themes.

---

### 7.5 Session Providers

**Origens:**
- `components/providers/session-provider.tsx`
- `components/providers/manage-session-provider.tsx`
- `components/providers/portal-session-provider.tsx`

Provedores de sessão next-auth para diferentes seções da aplicação.

---

## 8. UI Primitivos Customizados

### 8.1 CurrencyInput

**Origem:** `components/ui/currency-input.tsx`

Input com formatação automática de moeda (BRL, USD, etc).

---

### 8.2 NumberInput

**Origem:** `components/ui/number-input.tsx`

Input específico para números com validação.

---

### 8.3 PercentageInput

**Origem:** `components/ui/percentage-input.tsx`

Input de percentual com formatação.

---

### 8.4 LanguageSwitcher

**Origem:** `components/ui/language-switcher.tsx`

Troca de idioma entre pt-BR e en-US.

**Funcionalidades:**
- Dropdown com seleção de idioma
- Integração com next-intl

---

### 8.5 Logo

**Origem:** `components/ui/logo.tsx`

Logo responsivo com variantes de tema (light/dark).

---

## 9. Hooks

### 9.1 useDebounce

**Origem:** `hooks/use-debounce.ts`

Debounce de valores para operações de busca/filtro.

```typescript
function useDebounce<T>(value: T, delay: number): T
```

---

### 9.2 useCustomerScope

**Origem:** `components/layout/customer-scope-context.tsx`

Retorna estado do escopo de cliente, setters e função de limpeza.

---

### 9.3 useManageAccount

**Origem:** `components/manage/manage-account-context.tsx`

Retorna conta selecionada, lista de contas e setters.

---

### 9.4 usePortalConfig / usePortalConfigOptional

**Origem:** `components/providers/portal-config-provider.tsx`

Retorna objeto de configuração do portal.

---

## 10. Templates de Página

O projeto possui 3 áreas (dashboard, portal, manage) com ~50+ páginas que seguem padrões recorrentes.

### 10.1 ListPage

**Padrão:** PageHeader + FilterBar + DataTable + Paginação

**Páginas que usam:**
- subscriptions, invoices, payments, customers, plans, products
- nfes, credits, coupons, service-items, dunning, plan-changes
- tax-rules, tax-periods, withholdings, companies, gateways
- webhooks, notifications, audit, administrators, roles

**Composição típica:**
```tsx
<div>
  <PageHeader title="..." actions={<Button>Novo</Button>} />
  <FilterComponent />
  <DataTable
    columns={columns}
    data={data}
    pagination={pagination}
    onPageChange={handlePageChange}
    onSearch={handleSearch}
  />
</div>
```

---

### 10.2 DetailPage

**Padrão:** Breadcrumb + Header + Tabs/Seções + Ações

**Páginas que usam:**
- subscription/[id], invoice/[id], customer/[id], plan/[id]
- product/[id], company/[id], organization/[id]

**Composição típica:**
```tsx
<div>
  <Breadcrumbs items={[...]} />
  <PageHeader title="..." actions={<ActionButtons />} />
  <Tabs>
    <TabContent value="overview">...</TabContent>
    <TabContent value="history">...</TabContent>
  </Tabs>
</div>
```

---

### 10.3 FormPage

**Padrão:** Header + FormSections + Barra de ações

**Páginas que usam:**
- new subscription, new invoice, new customer, new plan
- new product, new coupon, edit forms

**Composição típica:**
```tsx
<div>
  <PageHeader title="Novo ..." />
  <Form>
    <FormSection title="Dados básicos" columns={2}>
      <FormField ... />
    </FormSection>
    <FormSection title="Endereço">
      <AddressFormFields ... />
    </FormSection>
    <ActionBar>
      <Button variant="outline">Cancelar</Button>
      <Button type="submit">Salvar</Button>
    </ActionBar>
  </Form>
</div>
```

---

### 10.4 SettingsPage

**Padrão:** Sidebar de navegação + Seções de configuração

**Páginas que usam:**
- settings, portal config, notifications, api, members

---

### 10.5 CheckoutPage

**Padrão:** Steps + Payment flow

**Páginas que usam:**
- portal checkout

---

## 11. Padrões Arquiteturais

### 11.1 Forms
- **React Hook Form:** todos os componentes de formulário usam `UseFormReturn`
- **Agrupamento de campos:** campos de endereço agrupados com lookup automático de CEP
- **Seletores dependentes:** cidade depende de estado, preços dependem de produto
- **Campos dinâmicos:** ProductItemsField suporta adicionar/remover itens com validação

### 11.2 Data Display
- **Paginação server-side:** DataTable suporta paginação manual
- **Busca debounced:** 300ms de debounce em inputs de busca
- **Ações sticky:** coluna de ações sempre visível à direita
- **Visibilidade de colunas:** toggle de visibilidade
- **Multi-level sorting:** integração TanStack React Table

### 11.3 Dialogs/Modais
- **Dialogs de confirmação:** ApplyCreditsDialog, PermissionsEditorDialog
- **Fluxos em steps:** CheckoutForm com progressão multi-step
- **Sheet drawers:** navegação mobile, detalhes de fatura

### 11.4 Context/State
- **Feature flags:** PortalConfig com toggles de features
- **Persistência de estado:** CustomerScope usa localStorage
- **Filtro por escopo:** seleção de Customer/Account afeta dados exibidos

### 11.5 Pagamento
- **Multi-método:** PIX, Boleto, Cartão
- **Polling:** status de boleto (intervalo 2s, máx 60s)
- **Tratamento de erros:** mensagens de erro específicas por gateway
- **Breakdown de impostos:** exibição detalhada de cálculo de impostos

### 11.6 Responsividade
- **Sidebars mobile:** navegação baseada em Sheet no mobile
- **Estados colapsados:** sidebar colapsável em telas grandes
- **Breakpoints:** prefixos sm, lg para comportamento responsivo
- **Dark mode:** suporte completo em toda a aplicação

---

## 12. Mapa de Navegação

### Dashboard (~30 páginas)
```
/dashboard
├── subscriptions (list, [id], new)
├── invoices (list, [id], new)
├── payments (list, [id])
├── nfes (list)
├── credits (list, new)
├── proposals (list, [id], new)
├── plans (list, [id], new)
├── products (list, [id], new)
├── coupons (list, [id], new)
├── service-items (list, new)
├── customers (list, [id], new)
├── users (list)
├── reports (overview, fiscal)
├── analytics
├── dunning (list, [id])
├── plan-changes (list)
├── simples (tax config)
├── tax-rules (list, new)
├── tax-periods (list)
├── withholdings (list)
├── companies (list, [id], new)
├── gateways (list, new)
├── portal (config)
├── api (keys, webhooks)
├── notifications (list)
├── events (list)
├── audit (list)
├── members (list)
└── settings
```

### Portal (~10 páginas)
```
/portal
├── account (overview)
├── subscriptions (list, [id])
├── invoices (list, [id])
├── payments (list)
├── credits (list)
├── payment-methods (list)
├── products (list)
├── proposals (list, [id])
├── profile
└── settings
```

### Manage/Admin (~20 páginas)
```
/manage
├── organizations (list, [id])
├── companies (list)
├── customers (list)
├── subscriptions (list)
├── invoices (list)
├── payments (list)
├── gateways (list)
├── plans (list)
├── products (list)
├── nfes (list)
├── coupons (list)
├── credits (list)
├── dunning (list)
├── plan-changes (list)
├── webhooks (list)
├── notifications (list)
├── audit (list)
├── administrators (list)
├── roles (list)
└── rate-limits (list)
```

---

## 13. Priorização para o Design System

### Tier 1 — Críticos (usados em quase todas as páginas)
| Componente | Ocorrências | Impacto |
|---|---|---|
| DataTable | ~40+ páginas | Altíssimo |
| PageHeader (padrão) | ~50+ páginas | Altíssimo |
| Sidebar + Header (layout) | Todas as páginas | Altíssimo |
| FilterBar (padrão) | ~30+ páginas | Alto |

### Tier 2 — Essenciais (usados em muitas páginas)
| Componente | Ocorrências | Impacto |
|---|---|---|
| FormSection (padrão) | ~15+ páginas | Alto |
| StatusBadge / NfeStatusBadge | ~20+ páginas | Alto |
| ConfirmDialog (padrão) | ~15+ páginas | Médio-Alto |
| CopyIdCell | ~10+ páginas | Médio |
| AddressFormFields | ~5+ páginas | Médio |

### Tier 3 — Específicos de Domínio
| Componente | Ocorrências | Impacto |
|---|---|---|
| CheckoutForm | 1 página | Baixo (mas complexo) |
| PaymentMethodSelector | 1 página | Baixo |
| ProductItemsField | ~3 páginas | Médio |
| ProductsPricingTable | ~3 páginas | Médio |
| PermissionsEditorDialog | 1 página | Baixo |
| CreditBalanceCard | 1 página | Baixo |
| NfeCard | 1 página | Baixo |

### Tier 4 — Utilitários
| Componente | Ocorrências | Impacto |
|---|---|---|
| CurrencyInput | ~10+ páginas | Médio |
| StateCombobox / CityCombobox | ~5+ páginas | Médio |
| CompanySelector | ~3+ páginas | Baixo |
| CustomerCombobox | ~5+ páginas | Médio |
| LanguageSwitcher | Todas | Médio |
| useDebounce | ~10+ usos | Médio |
