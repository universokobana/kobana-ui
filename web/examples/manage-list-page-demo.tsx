"use client"

import React, { useState } from "react"

// ─── Inline Icons ────────────────────────────────────────────────────────────

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ChevronsUpDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
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

function ChevronsLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" />
    </svg>
  )
}

function ChevronsRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" />
    </svg>
  )
}

function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" /><path d="M12 8v8" />
    </svg>
  )
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

// ─── MultiSelectFilter ──────────────────────────────────────────────────────

function MultiSelectFilter({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: { value: string; label: string }[]
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function toggle(value: string) {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-dashed border-input bg-background px-3 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <PlusCircleIcon className="size-4 text-muted-foreground" />
        {label}
        {selected.length > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-secondary px-1 text-[11px] font-medium">
            {selected.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-[180px] rounded-md border bg-popover p-1 shadow-md">
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Filtrar por {label.toLowerCase()}</p>
          <div className="my-1 h-px bg-border" />
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              >
                <span className={`flex size-4 items-center justify-center rounded-sm border ${isSelected ? "bg-primary text-primary-foreground border-primary" : "opacity-50 border-input"}`}>
                  {isSelected && <CheckIcon className="size-3" />}
                </span>
                {opt.label}
              </button>
            )
          })}
          {selected.length > 0 && (
            <>
              <div className="my-1 h-px bg-border" />
              <button
                type="button"
                onClick={() => onChange([])}
                className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent"
              >
                Limpar filtros
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

type SortKey = "name" | "status" | "subscriptions" | "mrr" | "createdAt" | null
type SortDir = "asc" | "desc"

const allCustomers = [
  { id: "cus_01", name: "Maria Silva", email: "maria@empresa.com", document: "123.456.789-00", status: "active", subscriptions: 2, invoices: 12, mrr: 29900, totalPaid: 358800, createdAt: "2023-06-15" },
  { id: "cus_02", name: "João Santos", email: "joao@corp.com.br", document: "98.765.432/0001-10", status: "active", subscriptions: 1, invoices: 8, mrr: 14900, totalPaid: 119200, createdAt: "2023-08-20" },
  { id: "cus_03", name: "Ana Costa", email: "ana@startup.io", document: "234.567.890-11", status: "suspended", subscriptions: 0, invoices: 3, mrr: 0, totalPaid: 44700, createdAt: "2024-01-10" },
  { id: "cus_04", name: "Carlos Oliveira", email: "carlos@tech.com", document: "45.678.901/0001-23", status: "active", subscriptions: 3, invoices: 24, mrr: 89700, totalPaid: 1076400, createdAt: "2022-11-05" },
  { id: "cus_05", name: "Beatriz Lima", email: "bia@design.co", document: "345.678.901-22", status: "active", subscriptions: 1, invoices: 6, mrr: 9900, totalPaid: 59400, createdAt: "2024-02-01" },
  { id: "cus_06", name: "Pedro Souza", email: "pedro@agency.com", document: "56.789.012/0001-34", status: "closed", subscriptions: 0, invoices: 15, mrr: 0, totalPaid: 447000, createdAt: "2022-03-12" },
  { id: "cus_07", name: "Fernanda Alves", email: "fernanda@shop.com", document: "456.789.012-33", status: "active", subscriptions: 1, invoices: 4, mrr: 19900, totalPaid: 79600, createdAt: "2024-03-15" },
  { id: "cus_08", name: "Lucas Pereira", email: "lucas@saas.dev", document: "67.890.123/0001-45", status: "suspended", subscriptions: 0, invoices: 2, mrr: 0, totalPaid: 29800, createdAt: "2024-01-22" },
]

const statusLabels: Record<string, string> = { active: "Ativo", suspended: "Suspenso", closed: "Encerrado" }
const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  suspended: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value / 100)
}

// ─── Demo ────────────────────────────────────────────────────────────────────

export default function ManageListPageDemo() {
  const [search, setSearch] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [page, setPage] = useState(1)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [visibleCols, setVisibleCols] = useState({ name: true, status: true, subscriptions: true, mrr: true, totalPaid: true, createdAt: true })
  const perPage = 5

  // Filter
  let filtered = allCustomers.filter((row) => {
    if (search && !row.name.toLowerCase().includes(search.toLowerCase()) && !row.email.toLowerCase().includes(search.toLowerCase())) return false
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(row.status)) return false
    return true
  })

  // Sort
  if (sortKey) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "number" && typeof bVal === "number") return sortDir === "asc" ? aVal - bVal : bVal - aVal
      return sortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal))
    })
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  function SortButton({ field, label }: { field: SortKey; label: string }) {
    const isActive = sortKey === field
    return (
      <button
        type="button"
        onClick={() => handleSort(field)}
        className="-ml-3 inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {label}
        {isActive && sortDir === "desc" ? (
          <ChevronDownIcon className="size-4" />
        ) : isActive && sortDir === "asc" ? (
          <ChevronDownIcon className="size-4 rotate-180" />
        ) : (
          <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
        )}
      </button>
    )
  }

  const from = Math.min((page - 1) * perPage + 1, total)
  const to = Math.min(page * perPage, total)

  return (
    <div className="w-full space-y-6">
      {/* Header: Icon + Title */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <UsersIcon className="h-6 w-6 text-muted-foreground" />
          <div>
            <h2 className="text-2xl font-bold">Clientes</h2>
            <p className="text-sm text-muted-foreground">Todos os clientes de todas as organizações</p>
          </div>
        </div>
      </div>

      {/* Toolbar: Search + Filters | Spacer | Refresh + Columns */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <MultiSelectFilter
          label="Status"
          options={[
            { value: "active", label: "Ativo" },
            { value: "suspended", label: "Suspenso" },
            { value: "closed", label: "Encerrado" },
          ]}
          selected={selectedStatuses}
          onChange={(v) => { setSelectedStatuses(v); setPage(1) }}
        />
        {selectedStatuses.length > 0 && (
          <button
            type="button"
            onClick={() => { setSelectedStatuses([]); setPage(1) }}
            className="h-8 rounded-md px-3 text-sm text-muted-foreground hover:bg-accent"
          >
            Limpar filtros
          </button>
        )}

        <div className="flex-1" />

        <button className="inline-flex h-8 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent">
          <RefreshIcon className="size-4" />
          Atualizar
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setColumnsOpen(!columnsOpen)}
            className="inline-flex h-8 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent"
          >
            <SlidersIcon className="size-4" />
            Colunas
          </button>
          {columnsOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-[160px] rounded-md border bg-popover p-1 shadow-md">
              {(Object.keys(visibleCols) as (keyof typeof visibleCols)[]).map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setVisibleCols((prev) => ({ ...prev, [col]: !prev[col] }))}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span className={`flex size-4 items-center justify-center rounded-sm border ${visibleCols[col] ? "bg-primary text-primary-foreground border-primary" : "opacity-50 border-input"}`}>
                    {visibleCols[col] && <CheckIcon className="size-3" />}
                  </span>
                  {{ name: "Cliente", status: "Status", subscriptions: "Assinaturas", mrr: "MRR", totalPaid: "Total Pago", createdAt: "Desde" }[col]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                {visibleCols.name && <th className="h-12 px-4 text-left font-medium text-muted-foreground"><SortButton field="name" label="Cliente" /></th>}
                {visibleCols.status && <th className="h-12 px-4 text-left font-medium text-muted-foreground"><SortButton field="status" label="Status" /></th>}
                {visibleCols.subscriptions && <th className="h-12 px-4 text-center font-medium text-muted-foreground"><SortButton field="subscriptions" label="Assinaturas" /></th>}
                {visibleCols.mrr && <th className="h-12 px-4 text-right font-medium text-muted-foreground"><SortButton field="mrr" label="MRR" /></th>}
                {visibleCols.totalPaid && <th className="h-12 px-4 text-right font-medium text-muted-foreground">Total Pago</th>}
                {visibleCols.createdAt && <th className="h-12 px-4 text-left font-medium text-muted-foreground"><SortButton field="createdAt" label="Desde" /></th>}
                <th className="h-12 w-[50px] px-2">
                  <div className="flex justify-end">
                    <ExternalLinkIcon className="size-4 text-muted-foreground opacity-0" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {paged.length === 0 ? (
                <tr><td colSpan={7} className="h-24 text-center text-muted-foreground">Nenhum cliente encontrado.</td></tr>
              ) : (
                paged.map((row) => (
                  <tr key={row.id} className="group border-b transition-colors hover:bg-muted/50">
                    {visibleCols.name && (
                      <td className="p-4">
                        <div className="font-medium">{row.name}</div>
                        <div className="text-xs text-muted-foreground">{row.email}</div>
                      </td>
                    )}
                    {visibleCols.status && (
                      <td className="p-4">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[row.status]}`}>
                          {statusLabels[row.status]}
                        </span>
                      </td>
                    )}
                    {visibleCols.subscriptions && <td className="p-4 text-center">{row.subscriptions}</td>}
                    {visibleCols.mrr && <td className="p-4 text-right font-medium text-green-600">{formatCurrency(row.mrr)}</td>}
                    {visibleCols.totalPaid && <td className="p-4 text-right font-mono">{formatCurrency(row.totalPaid)}</td>}
                    {visibleCols.createdAt && <td className="p-4 text-muted-foreground">{row.createdAt}</td>}
                    <td className="p-4 text-right">
                      <button type="button" className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent">
                        <MoreHorizontalIcon className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Página {page} de {totalPages}
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Por página</span>
            <select className="h-8 w-[70px] rounded-md border border-input bg-background text-sm" defaultValue={perPage} disabled>
              {[5, 10, 20, 50].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button type="button" onClick={() => setPage(1)} disabled={page <= 1} className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent disabled:opacity-50">
              <ChevronsLeftIcon className="size-4" />
            </button>
            <button type="button" onClick={() => setPage(page - 1)} disabled={page <= 1} className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent disabled:opacity-50">
              <ChevronLeftIcon className="size-4" />
            </button>
            <button type="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent disabled:opacity-50">
              <ChevronRightIcon className="size-4" />
            </button>
            <button type="button" onClick={() => setPage(totalPages)} disabled={page >= totalPages} className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent disabled:opacity-50">
              <ChevronsRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
