import { source } from "@/lib/source"
import fs from "node:fs/promises"
import path from "node:path"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? ""
  const slugs = slug.split("/").filter(Boolean)

  const page = source.getPage(slugs.length > 0 ? slugs : undefined)
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  let content = ""
  try {
    const filePath =
      page.file?.absolutePath ??
      path.join(process.cwd(), "content", page.file?.path ?? "")
    content = await fs.readFile(filePath, "utf-8")
  } catch {
    const slugPath = slugs.join("/")
    const candidates = [
      path.join(process.cwd(), "content", "docs", `${slugPath}.mdx`),
      path.join(process.cwd(), "content", "docs", slugPath, "index.mdx"),
    ]
    for (const candidate of candidates) {
      try {
        content = await fs.readFile(candidate, "utf-8")
        break
      } catch {
        // try next
      }
    }
  }

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 })
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `inline; filename="${slugs[slugs.length - 1] || "index"}.md"`,
    },
  })
}
