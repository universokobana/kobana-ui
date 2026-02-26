"use client"

export default function ListPageDemo() {
  const data = [
    { id: "1", name: "Cliente A", status: "active", amount: "R$ 1.500,00" },
    { id: "2", name: "Cliente B", status: "pending", amount: "R$ 750,00" },
    { id: "3", name: "Cliente C", status: "error", amount: "R$ 320,00" },
  ]

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Cobranças</h2>
          <p className="text-sm text-muted-foreground">Gerencie suas cobranças</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Nova Cobrança
        </button>
      </div>
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-medium">Nome</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-3">{row.name}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-right font-mono">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
