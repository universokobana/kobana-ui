export default function StatusBadgeVariants() {
  const statuses = [
    { status: "active", label: "Ativo", icon: "●", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    { status: "inactive", label: "Inativo", icon: "○", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
    { status: "pending", label: "Pendente", icon: "◷", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { status: "error", label: "Erro", icon: "✕", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
    { status: "processing", label: "Processando", icon: "↻", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    { status: "success", label: "Sucesso", icon: "✓", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    { status: "warning", label: "Alerta", icon: "⚠", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { status: "info", label: "Info", icon: "ℹ", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Com ícone</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map(({ status, label, icon, color }) => (
            <span
              key={status}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Sem ícone</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map(({ status, label, color }) => (
            <span
              key={status}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Tamanho sm</p>
        <div className="flex flex-wrap gap-2">
          {statuses.slice(0, 4).map(({ status, label, icon, color }) => (
            <span
              key={status}
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0 text-xs font-medium ${color}`}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
