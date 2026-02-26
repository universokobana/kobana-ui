"use client"

import { useState } from "react"

export default function FilterBarDemo() {
  const [values, setValues] = useState<Record<string, string>>({
    search: "",
    status: "",
    type: "",
  })

  const activeCount = Object.values(values).filter(Boolean).length

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          placeholder="Buscar..."
          value={values.search}
          onChange={(e) => setValues({ ...values, search: e.target.value })}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        />
        <select
          value={values.status}
          onChange={(e) => setValues({ ...values, status: e.target.value })}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Status</option>
          <option value="active">Ativo</option>
          <option value="pending">Pendente</option>
          <option value="inactive">Inativo</option>
        </select>
        <select
          value={values.type}
          onChange={(e) => setValues({ ...values, type: e.target.value })}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Tipo</option>
          <option value="pix">Pix</option>
          <option value="boleto">Boleto</option>
          <option value="card">Cartão</option>
        </select>
        {activeCount > 0 && (
          <>
            <span className="inline-flex h-5 items-center rounded-full bg-primary/10 px-2 text-xs font-medium text-primary">
              {activeCount} ativo{activeCount > 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setValues({ search: "", status: "", type: "" })}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Limpar filtros
            </button>
          </>
        )}
      </div>
    </div>
  )
}
