"use client"

import { useState } from "react"

// ─── Inline Icons ─────────────────────────────────────────────────────────────

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PhoneEntry {
  type: string
  areaCode: string
  number: string
}

const phoneTypeLabels: Record<string, string> = {
  mobile: "Celular",
  landline: "Fixo",
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export default function MultiplePhonesDemo() {
  const [phones, setPhones] = useState<PhoneEntry[]>([
    { type: "landline", areaCode: "11", number: "3456-7890" },
  ])

  function addPhone() {
    setPhones([...phones, { type: "mobile", areaCode: "", number: "" }])
  }

  function removePhone(index: number) {
    setPhones(phones.filter((_, i) => i !== index))
  }

  function updatePhone(index: number, field: keyof PhoneEntry, value: string) {
    const updated = [...phones]
    updated[index] = { ...updated[index], [field]: value }
    setPhones(updated)
  }

  return (
    <div className="space-y-4">
      {phones.map((phone, index) => (
        <div key={index} className="flex items-end gap-4">
          <div className="w-32 space-y-1">
            <label className="text-sm font-medium">Tipo</label>
            <div className="relative">
              <select
                value={phone.type}
                onChange={(e) => updatePhone(index, "type", e.target.value)}
                className="h-9 w-full appearance-none rounded-md border bg-background px-3 pr-8 text-sm"
              >
                <option value="mobile">Celular</option>
                <option value="landline">Fixo</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div className="w-20 space-y-1">
            <label className="text-sm font-medium">DDD</label>
            <input
              value={phone.areaCode}
              onChange={(e) => updatePhone(index, "areaCode", e.target.value)}
              maxLength={2}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium">Numero</label>
            <input
              value={phone.number}
              onChange={(e) => updatePhone(index, "number", e.target.value)}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          {index > 0 && (
            <button
              type="button"
              onClick={() => removePhone(index)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addPhone}
        className="inline-flex h-8 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <PlusIcon className="h-4 w-4" />
        Adicionar telefone
      </button>
      <div className="rounded-md bg-muted p-3">
        <p className="text-xs font-medium text-muted-foreground">Estado atual:</p>
        <pre className="mt-1 text-xs">{JSON.stringify(phones.map(p => ({ ...p, typeLabel: phoneTypeLabels[p.type] })), null, 2)}</pre>
      </div>
    </div>
  )
}
