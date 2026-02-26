import { source } from "@/lib/source"
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/mdx-components"
import { DocsCopyPage } from "@/components/docs-copy-page"
import fs from "node:fs/promises"
import path from "node:path"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  let rawContent = ""
  try {
    const filePath = page.file?.absolutePath
      ?? path.join(process.cwd(), "content", page.file?.path ?? "")
    rawContent = await fs.readFile(filePath, "utf-8")
  } catch {
    // fallback: try common content path patterns
    const slugPath = (params.slug ?? []).join("/")
    const candidates = [
      path.join(process.cwd(), "content", "docs", `${slugPath}.mdx`),
      path.join(process.cwd(), "content", "docs", slugPath, "index.mdx"),
    ]
    for (const candidate of candidates) {
      try {
        rawContent = await fs.readFile(candidate, "utf-8")
        break
      } catch {
        // try next
      }
    }
  }

  const slugPath = (params.slug ?? []).join("/")
  const pageUrl = `https://ui.kobana.com.br${page.url}`

  return (
    <DocsPage toc={page.data.toc}>
      <div className="flex items-center justify-between gap-2">
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsCopyPage page={rawContent} url={pageUrl} slug={slugPath} />
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
