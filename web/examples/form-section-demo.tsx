export default function FormSectionDemo() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Informações Pessoais</h3>
          <p className="text-sm text-muted-foreground">
            Dados básicos do cadastro
          </p>
        </div>
        <div className="h-px bg-border" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome</label>
            <input
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="João Silva"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="joao@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">CPF</label>
            <input
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="000.000.000-00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Telefone</label>
            <input
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="(11) 99999-0000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
