import { highlightCode } from "@/lib/highlight-code"
import { CopyButton } from "@/components/copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string
  lang?: string
}) {
  const html = await highlightCode(code, lang)

  return (
    <div className="relative">
      <div
        className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyButton value={code} className="absolute right-2 top-2" />
    </div>
  )
}
