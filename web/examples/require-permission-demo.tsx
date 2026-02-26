"use client"

import { useState } from "react"

export default function RequirePermissionDemo() {
  const [permissions, setPermissions] = useState<Set<string>>(
    new Set(["charges:read", "charges:create"]),
  )

  function can(permission: string) {
    return permissions.has(permission)
  }

  function toggle(permission: string) {
    const next = new Set(permissions)
    if (next.has(permission)) next.delete(permission)
    else next.add(permission)
    setPermissions(next)
  }

  const allPermissions = [
    "charges:read",
    "charges:create",
    "charges:delete",
    "customers:read",
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Permissões ativas:</p>
        <div className="flex flex-wrap gap-2">
          {allPermissions.map((p) => (
            <button
              key={p}
              onClick={() => toggle(p)}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                can(p)
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm font-medium">Conteúdo protegido:</p>
        {can("charges:read") ? (
          <p className="text-sm text-green-600">
            ✓ Você pode ver cobranças
          </p>
        ) : (
          <p className="text-sm text-red-600">
            ✕ Sem permissão para ver cobranças
          </p>
        )}
        {can("charges:delete") ? (
          <button className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">
            Excluir Cobrança
          </button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Botão de excluir oculto (requer charges:delete)
          </p>
        )}
      </div>
    </div>
  )
}
