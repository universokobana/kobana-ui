"use client"

import { useState } from "react"

const navItems = [
  { title: "Dashboard", href: "/", active: true },
  { title: "Cobranças", href: "/charges", badge: 3 },
  { title: "Clientes", href: "/customers" },
  { title: "Transferências", href: "/transfers" },
  { title: "Configurações", href: "/settings" },
]

export default function AppSidebarDemo() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-80">
      <aside
        className={`flex flex-col rounded-lg border transition-all ${collapsed ? "w-14" : "w-56"}`}
      >
        <div className="flex h-12 items-center border-b px-3 font-bold">
          {collapsed ? "K" : "Kobana"}
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <div
              key={item.title}
              className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <span>{collapsed ? item.title[0] : item.title}</span>
              {!collapsed && item.badge && (
                <span className="rounded-full bg-red-100 px-1.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  {item.badge}
                </span>
              )}
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
    </div>
  )
}
