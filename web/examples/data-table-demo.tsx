"use client"

import React, { useState } from "react"

// ─── Inline Icons ────────────────────────────────────────────────────────────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        {label}
        {selected.length > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-primary-foreground">
            {selected.length}
          </span>
        )}
        <ChevronDownIcon className="size-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-[180px] rounded-md border bg-popover p-1 shadow-md">
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
                Limpar filtro
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

type SortKey = "name" | "status" | "amount" | "date" | null
type SortDir = "asc" | "desc"

const allData = [
  { id: "1", name: "Plano Mensal", status: "active", type: "base", amount: 15000, date: "2024-01-15" },
  { id: "2", name: "Plano Anual", status: "active", type: "base", amount: 150000, date: "2024-01-16" },
  { id: "3", name: "Addon Usuários", status: "draft", type: "addon", amount: 3000, date: "2024-01-17" },
  { id: "4", name: "Addon Storage", status: "active", type: "addon", amount: 5000, date: "2024-01-18" },
  { id: "5", name: "Consultoria", status: "archived", type: "one_time", amount: 120000, date: "2024-01-19" },
  { id: "6", name: "Setup Fee", status: "draft", type: "one_time", amount: 50000, date: "2024-01-20" },
  { id: "7", name: "Plano Básico", status: "active", type: "base", amount: 9900, date: "2024-01-21" },
  { id: "8", name: "API Requests", status: "active", type: "metered", amount: 10, date: "2024-01-22" },
]

const statusLabels: Record<string, string> = { active: "Ativo", draft: "Rascunho", archived: "Arquivado" }
const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
}
const typeLabels: Record<string, string> = { base: "Base", addon: "Addon", one_time: "Avulso", metered: "Metrificado" }

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value / 100)
}

// ─── Demo ────────────────────────────────────────────────────────────────────

export default function DataTableDemo() {
  const [search, setSearch] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [visibleCols, setVisibleCols] = useState({ name: true, status: true, type: true, amount: true, date: true })
  const perPage = 5

  // Filter
  let filtered = allData.filter((row) => {
    if (search && !row.name.toLowerCase().includes(search.toLowerCase())) return false
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(row.status)) return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(row.type)) return false
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

  function toggleSelect(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  function toggleAll() {
    if (selected.size === paged.length) setSelected(new Set())
    else setSelected(new Set(paged.map((d) => d.id)))
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
    <div className="w-full space-y-4">
      {/* Toolbar: Search + Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-64">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <MultiSelectFilter
            label="Status"
            options={[
              { value: "active", label: "Ativo" },
              { value: "draft", label: "Rascunho" },
              { value: "archived", label: "Arquivado" },
            ]}
            selected={selectedStatuses}
            onChange={(v) => { setSelectedStatuses(v); setPage(1) }}
          />
          <MultiSelectFilter
            label="Tipo"
            options={[
              { value: "base", label: "Base" },
              { value: "addon", label: "Addon" },
              { value: "one_time", label: "Avulso" },
              { value: "metered", label: "Metrificado" },
            ]}
            selected={selectedTypes}
            onChange={(v) => { setSelectedTypes(v); setPage(1) }}
          />
          {(selectedStatuses.length > 0 || selectedTypes.length > 0) && (
            <button
              type="button"
              onClick={() => { setSelectedStatuses([]); setSelectedTypes([]); setPage(1) }}
              className="h-8 rounded-md px-3 text-sm text-muted-foreground hover:bg-accent"
            >
              Limpar filtros
            </button>
          )}
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">
          <span className="text-muted-foreground">{selected.size} selecionado(s)</span>
          <button type="button" className="rounded-md border px-2 py-0.5 text-xs hover:bg-background" onClick={() => setSelected(new Set())}>
            Arquivar
          </button>
          <button type="button" className="rounded-md border border-destructive/30 px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10" onClick={() => setSelected(new Set())}>
            Excluir
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 w-10 px-4">
                  <input
                    type="checkbox"
                    checked={paged.length > 0 && selected.size === paged.length}
                    onChange={toggleAll}
                    className="size-4 rounded border-input accent-primary"
                  />
                </th>
                {visibleCols.name && <th className="h-12 px-4 text-left font-medium text-muted-foreground"><SortButton field="name" label="Produto" /></th>}
                {visibleCols.status && <th className="h-12 px-4 text-left font-medium text-muted-foreground"><SortButton field="status" label="Status" /></th>}
                {visibleCols.type && <th className="h-12 px-4 text-left font-medium text-muted-foreground">Tipo</th>}
                {visibleCols.amount && <th className="h-12 px-4 text-right font-medium text-muted-foreground"><SortButton field="amount" label="Preço" /></th>}
                {visibleCols.date && <th className="h-12 px-4 text-left font-medium text-muted-foreground"><SortButton field="date" label="Criado em" /></th>}
                <th className="h-12 w-[50px] px-4" />
                <th className="h-12 w-10 px-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setColumnsOpen(!columnsOpen)}
                      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <SlidersIcon className="size-4" />
                    </button>
                    {columnsOpen && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-[160px] rounded-md border bg-popover p-1 shadow-md">
                        {(Object.keys(visibleCols) as (keyof typeof visibleCols)[]).map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setVisibleCols((prev) => ({ ...prev, [col]: !prev[col] }))}
                            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm capitalize hover:bg-accent"
                          >
                            <span className={`flex size-4 items-center justify-center rounded-sm border ${visibleCols[col] ? "bg-primary text-primary-foreground border-primary" : "opacity-50 border-input"}`}>
                              {visibleCols[col] && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3"><path d="M20 6 9 17l-5-5" /></svg>}
                            </span>
                            {{ name: "Produto", status: "Status", type: "Tipo", amount: "Preço", date: "Criado em" }[col]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {paged.length === 0 ? (
                <tr><td colSpan={8} className="h-24 text-center text-muted-foreground">Nenhum resultado encontrado.</td></tr>
              ) : (
                paged.map((row) => (
                  <tr key={row.id} className="group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" data-state={selected.has(row.id) ? "selected" : undefined}>
                    <td className="p-4">
                      <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleSelect(row.id)} className="size-4 rounded border-input accent-primary" />
                    </td>
                    {visibleCols.name && <td className="p-4 font-medium">{row.name}</td>}
                    {visibleCols.status && (
                      <td className="p-4">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[row.status]}`}>
                          {statusLabels[row.status]}
                        </span>
                      </td>
                    )}
                    {visibleCols.type && <td className="p-4 text-muted-foreground">{typeLabels[row.type]}</td>}
                    {visibleCols.amount && <td className="p-4 text-right font-mono">{formatCurrency(row.amount)}</td>}
                    {visibleCols.date && <td className="p-4 text-muted-foreground">{row.date}</td>}
                    <td className="p-4">
                      <button type="button" className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent">
                        <MoreHorizontalIcon className="size-4" />
                      </button>
                    </td>
                    <td className="w-10" />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Mostrando {from} a {to} de {total} resultados
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Por página</span>
            <select className="h-8 w-[70px] rounded-md border border-input bg-background text-sm" defaultValue={perPage} disabled>
              {[5, 10, 20, 50].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {page} de {totalPages}
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
