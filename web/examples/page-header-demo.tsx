export default function PageHeaderDemo() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <nav className="flex text-sm text-muted-foreground">
          <span className="text-blue-600 hover:underline">Dashboard</span>
          <span className="mx-1">/</span>
          <span className="text-blue-600 hover:underline">Cobranças</span>
          <span className="mx-1">/</span>
          <span>Detalhes</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cobranças</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as cobranças do seu negócio
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border px-4 py-2 text-sm">
              Exportar
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
              Nova Cobrança
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
