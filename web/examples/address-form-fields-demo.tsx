"use client"

import { useState, useMemo } from "react"

const STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
]

function StateSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      STATES.filter(
        (s) =>
          s.label.toLowerCase().includes(search.toLowerCase()) ||
          s.value.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  const selected = STATES.find((s) => s.value === value)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-full items-center justify-between rounded-md border bg-background px-3 text-sm"
      >
        {selected ? `${selected.value} - ${selected.label}` : "Selecionar..."}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar estado..."
            className="w-full border-b px-3 py-2 text-sm outline-none"
            autoFocus
          />
          <div className="max-h-48 overflow-auto">
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Nenhum estado encontrado.
              </div>
            )}
            {filtered.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  onChange(s.value)
                  setOpen(false)
                  setSearch("")
                }}
                className="flex w-full px-3 py-2 text-sm hover:bg-accent"
              >
                {s.value} - {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AddressFormFieldsDemo() {
  const [form, setForm] = useState({
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    state: "",
    city: "",
  })

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4">
        {/* CEP */}
        <div className="w-[12.5ch] space-y-2">
          <label className="text-sm font-medium">CEP</label>
          <input
            value={form.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            placeholder="00000-000"
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>

        {/* Rua | Número */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Rua</label>
            <input
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
              placeholder="Rua, Avenida..."
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <div className="w-[10ch] space-y-2">
            <label className="text-sm font-medium">Número</label>
            <input
              value={form.number}
              onChange={(e) => updateField("number", e.target.value)}
              placeholder="123"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
        </div>

        {/* Complemento | Bairro */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Complemento</label>
            <input
              value={form.complement}
              onChange={(e) => updateField("complement", e.target.value)}
              placeholder="Apt, Sala..."
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Bairro</label>
            <input
              value={form.neighborhood}
              onChange={(e) => updateField("neighborhood", e.target.value)}
              placeholder="Bairro"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
        </div>

        {/* Estado | Cidade */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <StateSelect
              value={form.state}
              onChange={(v) => updateField("state", v)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Cidade</label>
            <input
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Cidade"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
