"use client"

import { Suspense, useState } from "react"
import { cn } from "@/lib/utils"
import { getRegistryEntry } from "@/lib/registry"

export function ComponentPreview({
  name,
  className,
  align = "center",
}: {
  name: string
  className?: string
  align?: "start" | "center" | "end"
}) {
  const [showCode, setShowCode] = useState(false)
  const entry = getRegistryEntry(name)

  if (!entry) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Exemplo &quot;{name}&quot; não encontrado no registry.
      </div>
    )
  }

  const Component = entry.component

  return (
    <div className={cn("not-prose group relative my-4", className)}>
      <div
        className={cn(
          "flex min-h-[200px] w-full rounded-lg border p-8",
          align === "center" && "items-center justify-center",
          align === "start" && "items-start justify-start",
          align === "end" && "items-end justify-end",
        )}
      >
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Carregando...</div>
          }
        >
          <Component />
        </Suspense>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {showCode ? "Esconder código" : "Ver código"}
        </button>
      </div>
      {showCode && (
        <div className="mt-2 rounded-lg border bg-muted/50 p-4 text-sm">
          <p className="text-muted-foreground">
            Arquivo: <code>{entry.sourceFile}</code>
          </p>
        </div>
      )}
    </div>
  )
}
