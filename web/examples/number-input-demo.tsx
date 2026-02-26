"use client"

import { useState } from "react"

export default function NumberInputDemo() {
  const [value, setValue] = useState(1234)

  function formatNumber(num: number) {
    return new Intl.NumberFormat("pt-BR").format(num)
  }

  function handleChange(raw: string) {
    const digits = raw.replace(/\D/g, "")
    setValue(Number(digits) || 0)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Quantidade</label>
        <input
          inputMode="numeric"
          value={formatNumber(value)}
          onChange={(e) => handleChange(e.target.value)}
          className="h-9 w-48 rounded-md border bg-background px-3 text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Valor numérico: {value}
        </p>
      </div>
    </div>
  )
}
