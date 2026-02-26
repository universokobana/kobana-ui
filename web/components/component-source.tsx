import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { highlightCode } from "@/lib/highlight-code"
import { CopyButton } from "@/components/copy-button"

export async function ComponentSource({
  name,
  src,
}: {
  name?: string
  src?: string
}) {
  const filePath = src
    ? join(process.cwd(), src)
    : join(process.cwd(), "examples", `${name}.tsx`)

  let code: string
  try {
    code = await readFile(filePath, "utf-8")
  } catch {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        Arquivo fonte não encontrado: {name || src}
      </div>
    )
  }

  const html = await highlightCode(code.trim(), "tsx")

  return (
    <div className="relative my-4">
      <div
        className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyButton value={code.trim()} className="absolute right-2 top-2" />
    </div>
  )
}
