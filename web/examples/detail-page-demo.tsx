"use client"

import { useState } from "react"

export default function DetailPageDemo() {
  const [tab, setTab] = useState("info")

  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <nav className="flex text-sm text-muted-foreground">
          <span>Cobranças</span>
          <span className="mx-1">/</span>
          <span>Cobrança #001</span>
        </nav>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cobrança #001</h2>
          <button className="rounded-md border px-3 py-1.5 text-sm">Editar</button>
        </div>
      </div>
      <div className="flex gap-4 border-b">
        {["info", "historico", "pagamentos"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-1 pb-2 text-sm ${
              tab === t ? "border-primary font-medium" : "border-transparent text-muted-foreground"
            }`}
          >
            {t === "info" ? "Informações" : t === "historico" ? "Histórico" : "Pagamentos"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Status</p>
          <p className="font-medium">Ativo</p>
        </div>
        <div>
          <p className="text-muted-foreground">Valor</p>
          <p className="font-medium">R$ 1.500,00</p>
        </div>
        <div>
          <p className="text-muted-foreground">Cliente</p>
          <p className="font-medium">Maria Silva</p>
        </div>
        <div>
          <p className="text-muted-foreground">Criado em</p>
          <p className="font-medium">15/01/2024</p>
        </div>
      </div>
    </div>
  )
}
