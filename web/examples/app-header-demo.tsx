"use client"

import { useState } from "react"

export default function AppHeaderDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full rounded-lg border">
      <header className="flex h-14 items-center border-b px-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mr-3 rounded-md p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
        >
          ☰
        </button>
        <span className="text-sm font-medium">Dashboard</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="h-8 w-8 rounded-full bg-primary text-xs text-primary-foreground">
            JS
          </button>
          {menuOpen && (
            <div className="absolute right-4 top-14 z-10 rounded-md border bg-background p-1 shadow-md">
              <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-muted">
                Perfil
              </button>
              <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-muted">
                Sair
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}
