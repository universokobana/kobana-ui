import { ComponentsList } from "@/components/components-list"

export default function ComponentsPage() {
  return (
    <article className="flex flex-col w-full max-w-[900px] mx-auto px-4 py-6 gap-4 md:px-6 md:pt-8 xl:px-8 xl:pt-14">
      <h1 className="text-3xl font-semibold">Componentes</h1>
      <p className="mb-4 text-lg text-muted-foreground">
        Todos os componentes disponíveis no Kobana UI.
      </p>
      <ComponentsList />
    </article>
  )
}
