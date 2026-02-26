"use client"

import { useState } from "react"

export default function AppLayoutDemo() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-64 w-full overflow-hidden rounded-lg border">
      <aside
        className={`flex flex-col border-r bg-muted/30 transition-all ${collapsed ? "w-12" : "w-48"}`}
      >
        <div className="flex h-12 items-center border-b px-3 font-bold">
          {collapsed ? "K" : "Kobana"}
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {["Dashboard", "Cobranças", "Clientes"].map((item) => (
            <div
              key={item}
              className="rounded-md px-2 py-1.5 text-sm hover:bg-muted"
            >
              {collapsed ? item[0] : item}
            </div>
          ))}
        </nav>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="border-t p-2 text-xs text-muted-foreground hover:text-foreground"
        >
          {collapsed ? "→" : "← Recolher"}
        </button>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-12 items-center border-b px-4 text-sm">
          <span className="font-medium">Dashboard</span>
          <span className="ml-auto text-muted-foreground">user@kobana.com</span>
        </header>
        <main className="flex-1 p-4 text-sm text-muted-foreground">
          Conteúdo principal da aplicação.
        </main>
      </div>
    </div>
  )
}
