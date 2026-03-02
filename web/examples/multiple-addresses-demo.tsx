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

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddressEntry {
  label: string
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

const emptyAddress: Omit<AddressEntry, "label"> = {
  zipCode: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export default function MultipleAddressesDemo() {
  const [addresses, setAddresses] = useState<AddressEntry[]>([])

  function addAddress() {
    setAddresses([...addresses, { label: "", ...emptyAddress }])
  }

  function removeAddress(index: number) {
    setAddresses(addresses.filter((_, i) => i !== index))
  }

  function updateAddress(index: number, field: keyof AddressEntry, value: string) {
    const updated = [...addresses]
    updated[index] = { ...updated[index], [field]: value }
    setAddresses(updated)
  }

  return (
    <div className="space-y-4">
      {addresses.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhum endereco adicional.</p>
      )}

      {addresses.map((address, index) => (
        <div key={index} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <input
              value={address.label}
              onChange={(e) => updateAddress(index, "label", e.target.value)}
              placeholder="Label (ex: Comercial, Entrega)"
              className="h-9 flex-1 rounded-md border bg-background px-3 text-sm"
            />
            <button
              type="button"
              onClick={() => removeAddress(index)}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="w-[12.5ch] space-y-1">
              <label className="text-sm font-medium">CEP</label>
              <input
                value={address.zipCode}
                onChange={(e) => updateAddress(index, "zipCode", e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Rua</label>
                <input
                  value={address.street}
                  onChange={(e) => updateAddress(index, "street", e.target.value)}
                  placeholder="Rua, Avenida, etc."
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
              <div className="w-[10ch] space-y-1">
                <label className="text-sm font-medium">Numero</label>
                <input
                  value={address.number}
                  onChange={(e) => updateAddress(index, "number", e.target.value)}
                  placeholder="No"
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Complemento</label>
                <input
                  value={address.complement}
                  onChange={(e) => updateAddress(index, "complement", e.target.value)}
                  placeholder="Apto, Sala, etc."
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Bairro</label>
                <input
                  value={address.neighborhood}
                  onChange={(e) => updateAddress(index, "neighborhood", e.target.value)}
                  placeholder="Bairro"
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Estado</label>
                <input
                  value={address.state}
                  onChange={(e) => updateAddress(index, "state", e.target.value)}
                  placeholder="UF"
                  maxLength={2}
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Cidade</label>
                <input
                  value={address.city}
                  onChange={(e) => updateAddress(index, "city", e.target.value)}
                  placeholder="Cidade"
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addAddress}
        className="inline-flex h-8 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <PlusIcon className="h-4 w-4" />
        Adicionar endereco
      </button>

      {addresses.length > 0 && (
        <div className="rounded-md bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground">Estado atual:</p>
          <pre className="mt-1 text-xs">{JSON.stringify(addresses, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
