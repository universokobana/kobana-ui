export default function EmptyStateDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl text-muted-foreground">📋</div>
      <h3 className="mt-4 text-lg font-semibold">Nenhuma cobrança encontrada</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Crie sua primeira cobrança para começar a receber pagamentos.
      </p>
      <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        Nova Cobrança
      </button>
    </div>
  )
}
