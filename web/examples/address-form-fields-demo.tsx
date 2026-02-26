"use client"

import { useState } from "react"

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">CEP</label>
          <input
            value={form.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            placeholder="00000-000"
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Estado</label>
          <select
            value={form.state}
            onChange={(e) => updateField("state", e.target.value)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">Selecionar...</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Cidade</label>
          <input
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="Cidade"
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium">Rua</label>
          <input
            value={form.street}
            onChange={(e) => updateField("street", e.target.value)}
            placeholder="Rua, Avenida..."
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Número</label>
          <input
            value={form.number}
            onChange={(e) => updateField("number", e.target.value)}
            placeholder="123"
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Complemento</label>
          <input
            value={form.complement}
            onChange={(e) => updateField("complement", e.target.value)}
            placeholder="Apt, Sala..."
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bairro</label>
          <input
            value={form.neighborhood}
            onChange={(e) => updateField("neighborhood", e.target.value)}
            placeholder="Bairro"
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          />
        </div>
      </div>
    </div>
  )
}
