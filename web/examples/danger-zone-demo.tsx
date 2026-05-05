"use client"

import { useState } from "react"

export default function DangerZoneDemo() {
  const [confirmed, setConfirmed] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const actions = [
    {
      key: "revert",
      title: "Reverter para Confirmada",
      description: "Reverta o status para poder editar novamente.",
      variant: "warning" as const,
      button: "Reverter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
      ),
    },
    {
      key: "pause",
      title: "Pausar assinatura",
      description: "Pause a cobrança temporariamente.",
      variant: "danger" as const,
      button: "Pausar",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" /></svg>
      ),
    },
    {
      key: "cancel",
      title: "Cancelar assinatura",
      description: "Encerre a assinatura permanentemente.",
      variant: "danger" as const,
      button: "Cancelar",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
      ),
    },
    {
      key: "delete",
      title: "Excluir rascunho",
      description: "Exclua permanentemente. Esta ação não pode ser desfeita.",
      variant: "danger" as const,
      button: "Excluir",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
      ),
    },
  ]

  const variantStyles = {
    danger: {
      border: "border-destructive/30",
      btn: "border-destructive/50 text-destructive hover:bg-destructive/10",
    },
    warning: {
      border: "border-status-warning/30",
      btn: "border-status-warning/50 text-status-warning hover:bg-status-warning/10",
    },
  }

  async function handleConfirm() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setConfirmed(null)
  }

  return (
    <div className="w-full">
      {/* DangerZone card */}
      <div className="rounded-xl border border-destructive/30 bg-card text-card-foreground shadow">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-destructive">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            Zona de Perigo
          </h3>
          <p className="text-sm text-muted-foreground">
            Ações que podem afetar permanentemente esta assinatura
          </p>
        </div>
        {/* Content */}
        <div className="space-y-3 px-6 pb-6">
          {actions.map(({ key, title, description, variant, button, icon }) => (
            <div
              key={key}
              className={`flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between ${variantStyles[variant].border}`}
            >
              <div className="space-y-1">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <button
                onClick={() => setConfirmed(key)}
                className={`inline-flex shrink-0 items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors ${variantStyles[variant].btn}`}
              >
                {icon}
                {button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation dialog */}
      {confirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <h3 className="text-lg font-semibold">
              Confirmar ação
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tem certeza que deseja executar esta ação? Esta operação pode não ser reversível.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirmed(null)}
                className="rounded-md border px-4 py-2 text-sm"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                disabled={loading}
              >
                {loading ? "Aguarde..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
