import Link from "next/link"

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-8 px-4 py-24 text-center md:py-32">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Kobana UI
        </h1>
        <p className="mx-auto max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
          Design System para produtos Kobana. Componentes compostos,
          reutilizáveis e acessíveis construídos com shadcn/ui.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/docs"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Get Started
        </Link>
        <div className="inline-flex h-10 items-center justify-center rounded-md border bg-muted px-4 font-mono text-sm">
          npx @kobana/ui init
        </div>
      </div>
    </div>
  )
}
