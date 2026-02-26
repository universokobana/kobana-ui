"use client"

import { useState } from "react"

// Inline icons
function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className ?? ""}`}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

// ─── Demo ────────────────────────────────────────────────────────────────────

export default function DashboardLoginPageDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [magicLinkEmail, setMagicLinkEmail] = useState("")
  const [magicLinkStatus, setMagicLinkStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle")
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    alert("Redirecionando para o provedor OAuth...")
  }

  const handleMagicLinkSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!magicLinkEmail.trim()) return

    setMagicLinkStatus("sending")
    await new Promise((r) => setTimeout(r, 1500))
    setMagicLinkStatus("sent")
  }

  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center rounded-lg bg-black">
      <div className="w-full max-w-md space-y-8 px-4">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-[#D3FD54]">
            <span className="font-display text-lg font-bold text-black">K</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Billing
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-4 text-center">
            <h2 className="font-display text-xl font-semibold text-white">
              Entrar
            </h2>
            <p className="mt-1 text-sm text-[#676767]">
              Acesse o painel de gestão de cobranças.
            </p>
          </div>

          <div className="space-y-4">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Primary login button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#D3FD54] px-4 text-sm font-semibold text-black transition-colors hover:bg-[#D3FD54]/90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 size-4" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar com Kobana
                  <ExternalLinkIcon className="ml-2 size-4" />
                </>
              )}
            </button>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-[#676767]">ou</span>
              </div>
            </div>

            {/* Magic link */}
            {magicLinkStatus === "sent" ? (
              <div className="space-y-3 py-2 text-center">
                <CheckCircleIcon className="mx-auto size-8 text-green-500" />
                <p className="text-sm font-medium text-white">Link enviado!</p>
                <p className="text-sm text-[#676767]">
                  Verifique sua caixa de entrada. Enviamos um link de acesso para seu e-mail.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMagicLinkStatus("idle")
                    setMagicLinkEmail("")
                  }}
                  className="text-sm text-[#D3FD54] hover:underline"
                >
                  Enviar outro
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicLinkSend} className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="demo-magic-email" className="block text-sm text-[#676767]">
                    Entrar com link mágico
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#676767]" />
                    <input
                      id="demo-magic-email"
                      type="email"
                      placeholder="nome@empresa.com.br"
                      value={magicLinkEmail}
                      onChange={(e) => setMagicLinkEmail(e.target.value)}
                      required
                      className="h-10 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white placeholder:text-[#676767]/50 focus:border-[#D3FD54]/50 focus:outline-none focus:ring-1 focus:ring-[#D3FD54]/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={magicLinkStatus === "sending" || !magicLinkEmail.trim()}
                  className="inline-flex h-10 w-full items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
                >
                  {magicLinkStatus === "sending" ? (
                    <>
                      <LoaderIcon className="mr-2 size-4" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <MailIcon className="mr-2 size-4" />
                      Enviar link mágico
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Terms */}
            <p className="text-center text-sm text-[#676767]">
              Ao continuar, você concorda com os{" "}
              <button type="button" className="text-[#D3FD54] hover:underline">
                Termos de Uso
              </button>{" "}
              e{" "}
              <button type="button" className="text-[#D3FD54] hover:underline">
                Política de Privacidade
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
