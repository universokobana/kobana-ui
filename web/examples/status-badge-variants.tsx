export default function StatusBadgeVariants() {
  const statuses = [
    { status: "active", label: "Ativo", icon: "●", color: "bg-status-active-bg text-status-active" },
    { status: "inactive", label: "Inativo", icon: "○", color: "bg-status-inactive-bg text-status-inactive" },
    { status: "pending", label: "Pendente", icon: "◷", color: "bg-status-warning-bg text-status-warning" },
    { status: "error", label: "Erro", icon: "✕", color: "bg-status-error-bg text-status-error" },
    { status: "processing", label: "Processando", icon: "↻", color: "bg-status-info-bg text-status-info" },
    { status: "success", label: "Sucesso", icon: "✓", color: "bg-status-success-bg text-status-success" },
    { status: "warning", label: "Alerta", icon: "⚠", color: "bg-status-warning-bg text-status-warning" },
    { status: "info", label: "Info", icon: "ℹ", color: "bg-status-info-bg text-status-info" },
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
