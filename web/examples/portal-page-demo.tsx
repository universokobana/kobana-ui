"use client"

import React, { useState } from "react"

// ─── Inline Icons ────────────────────────────────────────────────────────────

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value / 100)
}

const openInvoices = [
  { id: "INV-010", number: "INV-010", status: "open" as const, amount: 45000, dueDate: "25/03/2024", period: "Março 2024" },
  { id: "INV-011", number: "INV-011", status: "overdue" as const, amount: 32000, dueDate: "10/02/2024", period: "Fevereiro 2024" },
]

const paidInvoices = [
  { id: "INV-001", number: "INV-001", amount: 150000, paidAt: "15/02/2024", period: "Janeiro 2024" },
  { id: "INV-002", number: "INV-002", amount: 150000, paidAt: "15/01/2024", period: "Dezembro 2023" },
  { id: "INV-003", number: "INV-003", amount: 120000, paidAt: "15/12/2023", period: "Novembro 2023" },
  { id: "INV-004", number: "INV-004", amount: 120000, paidAt: "15/11/2023", period: "Outubro 2023" },
  { id: "INV-005", number: "INV-005", amount: 120000, paidAt: "15/10/2023", period: "Setembro 2023" },
]

// ─── Demo ────────────────────────────────────────────────────────────────────

export default function PortalPageDemo() {
  const [page, setPage] = useState(1)
  const perPage = 3
  const totalPages = Math.ceil(paidInvoices.length / perPage)
  const pagedInvoices = paidInvoices.slice((page - 1) * perPage, page * perPage)
  const from = (page - 1) * perPage + 1
  const to = Math.min(page * perPage, paidInvoices.length)

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Faturas</h1>
          <p className="text-muted-foreground">Gerencie suas faturas e histórico de pagamentos</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm hover:bg-accent">
          <ClockIcon className="size-4" />
          Filtrar por data
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
              <WalletIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total pago</p>
              <p className="text-2xl font-bold">R$ 6.600,00</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <ReceiptIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faturas pagas</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
              <AlertCircleIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor pendente</p>
              <p className="text-2xl font-bold">R$ 770,00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Invoices */}
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight text-yellow-600">
            <CreditCardIcon className="h-5 w-5" />
            Faturas pendentes
          </h3>
          <p className="text-sm text-muted-foreground">Faturas aguardando pagamento</p>
        </div>
        <div className="space-y-4 p-6 pt-0">
          {openInvoices.map((invoice) => (
            <div key={invoice.id} className="flex flex-col gap-4 rounded-lg border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${invoice.status === "overdue" ? "bg-red-500/10" : "bg-orange-500/10"}`}>
                  <FileTextIcon className={`h-5 w-5 ${invoice.status === "overdue" ? "text-red-500" : "text-orange-500"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{invoice.number}</p>
                    {invoice.status === "overdue" ? (
                      <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600">
                        <AlertCircleIcon className="mr-1 h-3 w-3" />
                        Vencida
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        Pendente
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {invoice.period} &bull; Vence em {invoice.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold">{formatCurrency(invoice.amount)}</p>
                <div className="flex gap-2">
                  <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent">
                    <EyeIcon className="h-4 w-4" />
                    Ver
                  </button>
                  <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
                    <CreditCardIcon className="h-4 w-4" />
                    Pagar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <FileTextIcon className="h-5 w-5" />
            Histórico de faturas
          </h3>
          <p className="text-sm text-muted-foreground">Faturas pagas anteriormente</p>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {pagedInvoices.map((invoice) => (
              <div key={invoice.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{invoice.number}</p>
                      <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600">
                        <CheckCircleIcon className="mr-1 h-3 w-3" />
                        Pago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {invoice.period} &bull; Pago em {invoice.paidAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold">{formatCurrency(invoice.amount)}</p>
                  <div className="flex gap-2">
                    <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent">
                      <EyeIcon className="h-4 w-4" />
                      Ver
                    </button>
                    <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent">
                      <DownloadIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {from} a {to} de {paidInvoices.length} resultados
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="inline-flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="mr-1 h-4 w-4" />
                  Anterior
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="inline-flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
