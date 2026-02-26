"use client"

import { useState } from "react"

type ImportStatus =
  | "idle"
  | "pending"
  | "processing"
  | "completed"
  | "completed_with_errors"
  | "failed"

export default function ImportModalDemo() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<ImportStatus>("idle")
  const [fileName, setFileName] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [processed, setProcessed] = useState(0)
  const total = 150

  async function simulateImport() {
    setState("pending")
    await new Promise((r) => setTimeout(r, 500))
    setState("processing")
    for (let i = 0; i <= total; i += 30) {
      await new Promise((r) => setTimeout(r, 400))
      setProcessed(Math.min(i, total))
    }
    setProcessed(total)
    setState("completed_with_errors")
  }

  function reset() {
    setOpen(false)
    setState("idle")
    setFileName("")
    setProcessed(0)
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
      >
        Importar Produtos
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-lg">
            {state === "idle" && (
              <>
                <h3 className="text-lg font-semibold">Importar</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Importe dados a partir de um arquivo CSV.
                </p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    setFileName("produtos.csv")
                  }}
                  className={`mt-4 flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25"
                  }`}
                >
                  <span className="text-2xl">📤</span>
                  <button
                    onClick={() => setFileName("produtos.csv")}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {isDragging
                      ? "Solte o arquivo aqui"
                      : "Clique ou arraste um arquivo CSV"}
                  </button>
                </div>
                {fileName && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-muted p-3">
                    <span className="text-sm font-medium">{fileName}</span>
                    <span className="text-xs text-muted-foreground">12.4 KB</span>
                  </div>
                )}
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={reset}
                    className="rounded-md border px-4 py-2 text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={simulateImport}
                    disabled={!fileName}
                    className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
                  >
                    Importar
                  </button>
                </div>
              </>
            )}
            {(state === "pending" || state === "processing") && (
              <div className="space-y-3 text-center">
                <div className="text-2xl">⏳</div>
                <p className="text-sm">Processando importação...</p>
                {state === "processing" && (
                  <p className="text-xs text-muted-foreground">
                    {processed} de {total} registros processados
                  </p>
                )}
              </div>
            )}
            {state === "completed" && (
              <div className="space-y-3 text-center">
                <div className="text-2xl">✅</div>
                <p className="text-sm font-medium">Importação concluída!</p>
                <p className="text-xs text-muted-foreground">
                  {total} de {total} registros importados com sucesso.
                </p>
                <button
                  onClick={reset}
                  className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                  Fechar
                </button>
              </div>
            )}
            {state === "completed_with_errors" && (
              <div className="space-y-3 text-center">
                <div className="text-2xl">⚠️</div>
                <p className="text-sm font-medium">
                  Importação concluída com erros
                </p>
                <p className="text-xs text-muted-foreground">
                  147 importados, 3 erros de {total} registros.
                </p>
                <div className="rounded-lg bg-muted p-3 text-left text-xs">
                  <div className="text-destructive">
                    Linha 12: Campo &quot;email&quot; inválido
                  </div>
                  <div className="text-destructive">
                    Linha 45: Registro duplicado
                  </div>
                  <div className="text-destructive">
                    Linha 98: Campo obrigatório ausente
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                  Fechar
                </button>
              </div>
            )}
            {state === "failed" && (
              <div className="space-y-3 text-center">
                <div className="text-2xl">❌</div>
                <p className="text-sm font-medium text-destructive">
                  Falha na importação
                </p>
                <p className="text-xs text-muted-foreground">
                  Ocorreu um erro ao processar a importação.
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={reset}
                    className="rounded-md border px-4 py-2 text-sm"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => setState("idle")}
                    className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                  >
                    Tentar novamente
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
