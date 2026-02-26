"use client"

import { useState } from "react"

export default function ConfirmDialogDemo() {
  const [open, setOpen] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const variants = [
    { key: "danger", label: "Excluir", title: "Excluir registro?", desc: "Esta ação não pode ser desfeita.", btnClass: "bg-red-600 hover:bg-red-700 text-white" },
    { key: "warning", label: "Arquivar", title: "Arquivar item?", desc: "O item será movido para o arquivo.", btnClass: "bg-yellow-600 hover:bg-yellow-700 text-white" },
    { key: "info", label: "Confirmar", title: "Confirmar ação?", desc: "Deseja prosseguir com esta ação?", btnClass: "bg-blue-600 hover:bg-blue-700 text-white" },
  ]

  async function handleConfirm() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setOpen(null)
  }

  return (
    <div className="flex gap-2">
      {variants.map(({ key, label, title, desc, btnClass }) => (
        <div key={key}>
          <button
            onClick={() => setOpen(key)}
            className={`rounded-md px-4 py-2 text-sm font-medium ${btnClass}`}
          >
            {label}
          </button>
          {open === key && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-md border px-4 py-2 text-sm"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`rounded-md px-4 py-2 text-sm font-medium ${btnClass}`}
                    disabled={loading}
                  >
                    {loading ? "Aguarde..." : "Confirmar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
