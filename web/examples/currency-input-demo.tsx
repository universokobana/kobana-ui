"use client"

import { useState } from "react"

function formatCurrency(cents: number, locale: string, currency: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100)
}

export default function CurrencyInputDemo() {
  const [valueBRL, setValueBRL] = useState(19900)
  const [valueUSD, setValueUSD] = useState(9999)

  function handleChange(
    raw: string,
    setter: (v: number) => void,
  ) {
    const digits = raw.replace(/\D/g, "")
    setter(Number(digits))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Valor (BRL)</label>
        <input
          inputMode="numeric"
          value={formatCurrency(valueBRL, "pt-BR", "BRL")}
          onChange={(e) => handleChange(e.target.value, setValueBRL)}
          className="h-9 w-48 rounded-md border bg-background px-3 text-right text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Valor em centavos: {valueBRL}
        </p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Valor (USD)</label>
        <input
          inputMode="numeric"
          value={formatCurrency(valueUSD, "en-US", "USD")}
          onChange={(e) => handleChange(e.target.value, setValueUSD)}
          className="h-9 w-48 rounded-md border bg-background px-3 text-right text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Valor em centavos: {valueUSD}
        </p>
      </div>
    </div>
  )
}
