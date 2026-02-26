import { TemplatesList } from "@/components/components-list"

export default function TemplatesPage() {
  return (
    <article className="flex flex-col w-full max-w-[900px] mx-auto px-4 py-6 gap-4 md:px-6 md:pt-8 xl:px-8 xl:pt-14">
      <h1 className="text-3xl font-semibold">Templates</h1>
      <p className="mb-4 text-lg text-muted-foreground">
        Templates de página completos para acelerar o desenvolvimento.
      </p>
      <TemplatesList />
    </article>
  )
}
