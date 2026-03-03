"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

const mockUsers: User[] = [
  { id: "1", name: "Maria Silva", email: "maria@example.com" },
  { id: "2", name: "João Santos", email: "joao@example.com" },
  { id: "3", name: "Ana Oliveira", email: "ana@example.com" },
  { id: "4", name: "Carlos Lima", email: "carlos@example.com" },
  { id: "5", name: "Fernanda Costa", email: "fernanda@example.com" },
]

async function searchUsers(query: string): Promise<User[]> {
  await new Promise((r) => setTimeout(r, 300))
  if (!query) return mockUsers
  return mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  )
}

export default function EntityComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [selectedName, setSelectedName] = useState("")
  const [items, setItems] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  const handleSearch = useCallback((q: string) => {
    setQuery(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const results = await searchUsers(q)
        setItems(results)
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [])

  useEffect(() => {
    if (open) handleSearch("")
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [open, handleSearch])

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium">Responsável</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex h-9 w-full items-center justify-between rounded-md border bg-background px-3 text-sm ${
            !value ? "text-muted-foreground" : ""
          }`}
        >
          <span className="truncate">
            {selectedName || "Selecionar responsável..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border-b bg-transparent px-3 py-2 text-sm outline-none"
              autoFocus
            />
            <div className="max-h-48 overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center py-6 text-sm text-muted-foreground">
                  <Loader2 className="mb-2 h-4 w-4 animate-spin" />
                  Carregando...
                </div>
              ) : items.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  Nenhum resultado encontrado.
                </p>
              ) : (
                items.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setValue(user.id)
                      setSelectedName(user.name)
                      setOpen(false)
                      setQuery("")
                    }}
                    className="flex w-full items-center px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 shrink-0 ${
                        value === user.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
