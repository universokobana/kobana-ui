import Link from "next/link"

const features = [
  {
    title: "CLI-driven",
    description: "Instale e atualize componentes via CLI. Zero configuração manual.",
  },
  {
    title: "3 Camadas",
    description: "Primitivos (shadcn/ui) → Compostos → Templates. Arquitetura escalável.",
  },
  {
    title: "TypeScript-first",
    description: "Tipagem completa. Autocomplete e verificação de tipos em todos os componentes.",
  },
  {
    title: "Copy, Don't Install",
    description: "Componentes são copiados para o projeto. Controle total, sem acoplamento.",
  },
]

const components = [
  "DataTable", "PageHeader", "FilterBar", "FormSection", "StatusBadge",
  "ConfirmDialog", "EmptyState", "CopyCell", "CurrencyInput", "NumberInput",
  "EntityCombobox", "AddressFormFields", "AppLayout", "AppSidebar",
  "ThemeToggle", "ExportModal", "ImportModal", "RequirePermission", "HeaderNotifications",
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-8 px-4 py-24 text-center md:px-8 md:py-32">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Kobana UI
            </h1>
            <p className="mx-auto max-w-[42rem] text-lg text-gray-400 sm:text-xl">
              Design System para produtos Kobana. Componentes compostos,
              reutilizáveis e acessíveis construídos com shadcn/ui.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#D3FD54] px-8 text-sm font-semibold text-black shadow transition-colors hover:bg-[#D3FD54]/90"
            >
              Get Started
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Componentes
            </Link>
          </div>
          <div className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 font-mono text-sm text-gray-300">
            npx @kobana/ui init
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* Features */}
        <section className="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border p-6">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* Components Grid */}
        <section className="pb-16">
          <h2 className="mb-6 text-center text-2xl font-bold">
            {components.length} Componentes
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {components.map((name) => (
              <span
                key={name}
                className="rounded-md border bg-muted/50 px-3 py-1.5 font-mono text-xs"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="mx-auto max-w-2xl pb-24">
          <h2 className="mb-6 text-center text-2xl font-bold">Quick Start</h2>
          <div className="space-y-3 rounded-lg border bg-muted/50 p-6">
            <div className="font-mono text-sm">
              <span className="text-muted-foreground"># Inicializar</span>
              <br />
              npx @kobana/ui init
            </div>
            <div className="font-mono text-sm">
              <span className="text-muted-foreground"># Adicionar componentes</span>
              <br />
              npx @kobana/ui add data-table page-header status-badge
            </div>
            <div className="font-mono text-sm">
              <span className="text-muted-foreground"># Usar no código</span>
              <br />
              {`import { DataTable } from "@/components/kobana/data-table"`}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
