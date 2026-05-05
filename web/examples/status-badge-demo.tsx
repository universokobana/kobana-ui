export default function StatusBadgeDemo() {
  const statuses = [
    { status: "active", label: "Ativo", color: "bg-status-active-bg text-status-active" },
    { status: "pending", label: "Pendente", color: "bg-status-warning-bg text-status-warning" },
    { status: "error", label: "Erro", color: "bg-status-error-bg text-status-error" },
    { status: "processing", label: "Processando", color: "bg-status-info-bg text-status-info" },
    { status: "success", label: "Sucesso", color: "bg-status-success-bg text-status-success" },
    { status: "warning", label: "Alerta", color: "bg-status-warning-bg text-status-warning" },
    { status: "info", label: "Info", color: "bg-status-info-bg text-status-info" },
    { status: "inactive", label: "Inativo", color: "bg-status-inactive-bg text-status-inactive" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map(({ status, label, color }) => (
        <span
          key={status}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
