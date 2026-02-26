import Link from "next/link"
import { source } from "@/lib/source"

export function PagesList({ basePath }: { basePath: string }) {
  const pages = source.getPages()
    .filter((page) =>
      page.url.startsWith(`${basePath}/`) && page.url !== basePath
    )
    .sort((a, b) => a.data.title.localeCompare(b.data.title))

  if (pages.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6">
      {pages.map((page) => (
        <Link
          key={page.url}
          href={page.url}
          className="inline-flex items-center text-base font-medium underline-offset-4 hover:underline"
        >
          {page.data.title}
        </Link>
      ))}
    </div>
  )
}

export function ComponentsList() {
  return <PagesList basePath="/docs/components" />
}

export function TemplatesList() {
  return <PagesList basePath="/docs/templates" />
}
