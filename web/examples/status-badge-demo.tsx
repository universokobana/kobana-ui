export default function StatusBadgeDemo() {
  const statuses = [
    { status: "active", label: "Ativo", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    { status: "pending", label: "Pendente", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { status: "error", label: "Erro", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
    { status: "processing", label: "Processando", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    { status: "success", label: "Sucesso", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    { status: "warning", label: "Alerta", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { status: "info", label: "Info", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    { status: "inactive", label: "Inativo", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
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
