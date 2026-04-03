"use client"

import { useState, useCallback } from "react"

interface Customer {
  id: string
  name: string
  email: string
}

const allCustomers: Customer[] = [
  { id: "1", name: "Acme Corp", email: "contato@acme.com.br" },
  { id: "2", name: "TechStart Ltda", email: "admin@techstart.io" },
  { id: "3", name: "Global Foods S.A.", email: "financeiro@globalfoods.com" },
  { id: "4", name: "Construtora Almeida", email: "obras@almeida.eng.br" },
  { id: "5", name: "Studio Digital", email: "hello@studiodigital.com" },
  { id: "6", name: "Farmácia Popular", email: "compras@farmpopular.com.br" },
  { id: "7", name: "Logística Express", email: "ops@logexpress.com" },
  { id: "8", name: "Escola Futuro", email: "secretaria@escolafuturo.edu.br" },
]

export default function ScopeSelectorDemo() {
  const [selected, setSelected] = useState<Customer | null>(null)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")

  const fetchItems = useCallback(async (search: string) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    const filtered = allCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()),
    )
    setItems(filtered)
    setLoading(false)
  }, [])

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) fetchItems(query)
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    fetchItems(value)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelected(null)
  }

  return (
    <div className="flex items-center gap-4">
      {/* Simulated header bar */}
      <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-2">
        <span className="text-sm text-muted-foreground">Header</span>
        <div className="h-5 w-px bg-border" />

        {/* Scope selector */}
        <div className="relative">
          {selected ? (
            <button
              onClick={() => handleOpenChange(!open)}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-transparent bg-secondary px-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <span className="max-w-[120px] truncate">{selected.name}</span>
              <span
                role="button"
                tabIndex={0}
                className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full p-0 hover:bg-destructive/20"
                onClick={handleClear}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </span>
            </button>
          ) : (
            <button
              onClick={() => handleOpenChange(!open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm hover:bg-accent"
              title="Filtrar por cliente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </button>
          )}

          {/* Popover */}
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 z-50 mt-2 w-[350px] rounded-lg border bg-background shadow-lg">
                <div className="flex items-center border-b px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  <input
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                    placeholder="Buscar cliente..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto p-1">
                  {loading ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                      Carregando...
                    </div>
                  ) : items.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Nenhum cliente encontrado.
                    </div>
                  ) : (
                    <>
                      {!selected && (
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                          Selecione para filtrar
                        </div>
                      )}
                      {items.map((customer) => (
                        <button
                          key={customer.id}
                          onClick={() => {
                            setSelected(customer)
                            setOpen(false)
                            setQuery("")
                          }}
                          className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`mr-2 h-4 w-4 shrink-0 ${selected?.id === customer.id ? "opacity-100" : "opacity-0"}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{customer.name}</span>
                            <span className="text-xs text-muted-foreground">{customer.email}</span>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  )
}
