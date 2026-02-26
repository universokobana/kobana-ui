"use client"

import { useState } from "react"

export default function FormPageDemo() {
  const [dirty, setDirty] = useState(false)

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Nova Cobrança</h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cliente</label>
            <input
              placeholder="Selecionar cliente..."
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              onChange={() => setDirty(true)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Valor</label>
            <input
              placeholder="R$ 0,00"
              className="h-9 w-full rounded-md border bg-background px-3 text-right text-sm"
              onChange={() => setDirty(true)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Vencimento</label>
            <input
              type="date"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              onChange={() => setDirty(true)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <input
              placeholder="Descrição da cobrança"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              onChange={() => setDirty(true)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <button className="rounded-md border px-4 py-2 text-sm">Cancelar</button>
        <button
          className={`rounded-md px-4 py-2 text-sm ${
            dirty
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          disabled={!dirty}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}
