"use client"

import { useState } from "react"

const mockNotifications = [
  { id: "1", title: "Pagamento recebido", description: "Cobrança #001 paga", severity: "info" as const, timestamp: new Date(Date.now() - 5 * 60_000).toISOString(), read: false },
  { id: "2", title: "Cobrança vencida", description: "Cobrança #002 está vencida", severity: "warning" as const, timestamp: new Date(Date.now() - 2 * 3600_000).toISOString(), read: false },
  { id: "3", title: "Erro na transferência", description: "Transferência #005 falhou", severity: "error" as const, timestamp: new Date(Date.now() - 24 * 3600_000).toISOString(), read: true },
]

function timeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "agora"
  if (mins < 60) return `${mins}min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

const severityColors = {
  info: "bg-blue-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  critical: "bg-red-700",
}

export default function HeaderNotificationsDemo() {
  const [open, setOpen] = useState(false)
  const unread = mockNotifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-md p-2 text-muted-foreground hover:text-foreground"
      >
        🔔
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-80 rounded-md border bg-background shadow-md">
          <div className="border-b px-3 py-2 text-sm font-medium">
            Notificações
          </div>
          <div className="max-h-64 overflow-y-auto">
            {mockNotifications.map((n) => (
              <div
                key={n.id}
                className={`flex gap-3 border-b px-3 py-2.5 text-sm last:border-0 ${!n.read ? "bg-muted/50" : ""}`}
              >
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${severityColors[n.severity]}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {timeAgo(n.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full border-t px-3 py-2 text-center text-xs text-muted-foreground hover:text-foreground">
            Ver todas
          </button>
        </div>
      )}
    </div>
  )
}
