"use client"

import { useState } from "react"

const locales = [
  { value: "pt-BR", label: "Português (BR)" },
  { value: "en", label: "English" },
]

export default function LocaleToggleDemo() {
  const [locale, setLocale] = useState("pt-BR")
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
      >
        🌐 {locales.find((l) => l.value === locale)?.label}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 rounded-md border bg-background p-1 shadow-md">
          {locales.map((l) => (
            <button
              key={l.value}
              onClick={() => {
                setLocale(l.value)
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm hover:bg-muted"
            >
              {locale === l.value && <span>✓</span>}
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
