"use client"

import { useState } from "react"

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

export default function EntityComboboxDemo() {
  const [selected, setSelected] = useState<User | null>(null)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium">Responsável</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-full items-center justify-between rounded-md border bg-background px-3 text-sm"
        >
          {selected ? selected.name : "Selecionar..."}
          <span className="text-muted-foreground">▼</span>
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md">
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-b bg-transparent px-3 py-2 text-sm outline-none"
              autoFocus
            />
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  Nenhum resultado encontrado.
                </p>
              ) : (
                filtered.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setSelected(user)
                      setOpen(false)
                      setQuery("")
                    }}
                    className="flex w-full flex-col px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
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
