"use client"

import { useState } from "react"

const quickOptions = [
  { key: "today", label: "Hoje" },
  { key: "yesterday", label: "Ontem" },
  { key: "last7Days", label: "Últimos 7 dias" },
  { key: "last30Days", label: "Últimos 30 dias" },
  { key: "last90Days", label: "Últimos 90 dias" },
  { key: "allTime", label: "Todo o Período" },
]

function toISO(d: Date) {
  return d.toISOString().split("T")[0]
}

function daysAgo(n: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - n)
  return { start: toISO(start), end: toISO(today) }
}

function getRangeForKey(key: string) {
  switch (key) {
    case "today":
      return daysAgo(0)
    case "yesterday": {
      const d = daysAgo(1)
      return { start: d.start, end: d.start }
    }
    case "last7Days":
      return daysAgo(6)
    case "last30Days":
      return daysAgo(29)
    case "last90Days":
      return daysAgo(89)
    default:
      return { start: "", end: "" }
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export default function DateRangePickerDemo() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [localStart, setLocalStart] = useState("")
  const [localEnd, setLocalEnd] = useState("")
  const [selectedQuick, setSelectedQuick] = useState<string | null>("allTime")
  const [open, setOpen] = useState(false)

  const hasFilter = startDate || endDate

  const buttonLabel = (() => {
    if (startDate && endDate) return `${formatDate(startDate)} - ${formatDate(endDate)}`
    if (startDate) return `De ${formatDate(startDate)}`
    if (endDate) return `Até ${formatDate(endDate)}`
    return "Todo o Período"
  })()

  function handleQuickSelect(key: string) {
    setSelectedQuick(key)
    const { start, end } = getRangeForKey(key)
    setStartDate(start)
    setEndDate(end)
    setLocalStart(start)
    setLocalEnd(end)
    setOpen(false)
  }

  function applyCustom() {
    setStartDate(localStart)
    setEndDate(localEnd)
    setOpen(false)
  }

  function clear() {
    setStartDate("")
    setEndDate("")
    setLocalStart("")
    setLocalEnd("")
    setSelectedQuick(null)
    setOpen(false)
  }

  return (
    <div className="flex flex-col items-start gap-4">
      {/* Trigger button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-normal transition-colors hover:bg-accent ${
            hasFilter ? "border-primary text-primary" : "border-input"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          {buttonLabel}
        </button>

        {/* Popover */}
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 z-50 mt-2 rounded-lg border bg-background shadow-lg">
              <div className="flex">
                {/* Quick Selection */}
                <div className="border-r p-4">
                  <p className="mb-3 whitespace-nowrap text-sm font-medium text-muted-foreground">
                    Seleção Rápida
                  </p>
                  <div className="flex flex-col gap-1">
                    {quickOptions.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => handleQuickSelect(opt.key)}
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          selectedQuick === opt.key
                            ? "bg-secondary text-secondary-foreground"
                            : "hover:bg-accent"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Period */}
                <div className="p-4">
                  <p className="mb-3 text-sm font-medium text-muted-foreground">
                    Período Personalizado
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="demo-start" className="text-sm font-medium">
                        Data Inicial
                      </label>
                      <input
                        id="demo-start"
                        type="date"
                        value={localStart}
                        onChange={(e) => {
                          setLocalStart(e.target.value)
                          setSelectedQuick(null)
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="demo-end" className="text-sm font-medium">
                        Data Final
                      </label>
                      <input
                        id="demo-end"
                        type="date"
                        value={localEnd}
                        onChange={(e) => {
                          setLocalEnd(e.target.value)
                          setSelectedQuick(null)
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      {hasFilter && (
                        <button
                          onClick={clear}
                          className="flex-1 rounded-md border px-4 py-2 text-sm transition-colors hover:bg-accent"
                        >
                          Limpar
                        </button>
                      )}
                      <button
                        onClick={applyCustom}
                        className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Current state feedback */}
      {hasFilter && (
        <p className="text-sm text-muted-foreground">
          Filtro ativo: {formatDate(startDate)}
          {endDate && ` — ${formatDate(endDate)}`}
        </p>
      )}
    </div>
  )
}
