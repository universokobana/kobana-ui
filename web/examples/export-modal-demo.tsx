"use client"

import { useState } from "react"

type ExportState = "idle" | "confirm" | "processing" | "completed" | "error"

export default function ExportModalDemo() {
  const [state, setState] = useState<ExportState>("idle")
  const [progress, setProgress] = useState(0)

  async function handleExport() {
    setState("processing")
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 300))
      setProgress(i)
    }
    setState("completed")
  }

  return (
    <div>
      <button
        onClick={() => setState("confirm")}
        className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
      >
        Exportar Cobranças
      </button>
      {state !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-lg">
            {state === "confirm" && (
              <>
                <h3 className="text-lg font-semibold">Exportar Cobranças</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Exportar 1.234 registros em formato CSV?
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setState("idle")}
                    className="rounded-md border px-4 py-2 text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleExport}
                    className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                  >
                    Exportar
                  </button>
                </div>
              </>
            )}
            {state === "processing" && (
              <div className="space-y-3 text-center">
                <div className="text-2xl">⏳</div>
                <p className="text-sm">Exportando... {progress}%</p>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            {state === "completed" && (
              <div className="space-y-3 text-center">
                <div className="text-2xl">✅</div>
                <p className="text-sm font-medium">Exportação concluída!</p>
                <p className="text-xs text-muted-foreground">
                  1.234 registros · 256 KB
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setState("idle")
                      setProgress(0)
                    }}
                    className="rounded-md border px-4 py-2 text-sm"
                  >
                    Fechar
                  </button>
                  <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
