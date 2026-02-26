"use client"

import { useState } from "react"

const data = [
  { id: "1", name: "Cobrança #001", status: "active", amount: "R$ 150,00", date: "2024-01-15" },
  { id: "2", name: "Cobrança #002", status: "pending", amount: "R$ 300,00", date: "2024-01-16" },
  { id: "3", name: "Cobrança #003", status: "error", amount: "R$ 75,50", date: "2024-01-17" },
  { id: "4", name: "Cobrança #004", status: "active", amount: "R$ 1.200,00", date: "2024-01-18" },
  { id: "5", name: "Cobrança #005", status: "pending", amount: "R$ 450,00", date: "2024-01-19" },
]

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

export default function DataTableDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggleSelect(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  function toggleAll() {
    if (selected.size === data.length) setSelected(new Set())
    else setSelected(new Set(data.map((d) => d.id)))
  }

  return (
    <div className="w-full space-y-2">
      {selected.size > 0 && (
        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">
          <span>{selected.size} selecionado(s)</span>
          <button className="rounded border px-2 py-0.5 text-xs hover:bg-background">
            Excluir
          </button>
        </div>
      )}
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-10 p-3">
                <input
                  type="checkbox"
                  checked={selected.size === data.length}
                  onChange={toggleAll}
                  className="rounded"
                />
              </th>
              <th className="p-3 text-left font-medium">Nome</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-right font-medium">Valor</th>
              <th className="p-3 text-left font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleSelect(row.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[row.status]}`}>
                    {row.status === "active" ? "Ativo" : row.status === "pending" ? "Pendente" : "Erro"}
                  </span>
                </td>
                <td className="p-3 text-right font-mono">{row.amount}</td>
                <td className="p-3 text-muted-foreground">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Mostrando 1-5 de 5</span>
        <div className="flex gap-1">
          <button className="rounded border px-3 py-1 text-xs" disabled>Anterior</button>
          <button className="rounded border px-3 py-1 text-xs" disabled>Próximo</button>
        </div>
      </div>
    </div>
  )
}
