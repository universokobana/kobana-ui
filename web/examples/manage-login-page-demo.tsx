"use client"

import React, { useState } from "react"

// ─── Inline Logo ──────────────────────────────────────────────────────────────

function KobanaLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-lg bg-[#D3FD54]">
        <span className="text-lg font-bold text-black">K</span>
      </div>
      <span className="text-lg font-bold text-white">kobana</span>
    </div>
  )
}

// ─── Inline Icons ─────────────────────────────────────────────────────────────

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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export default function ManageLoginPageDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setError("Acesso negado. Apenas emails @kobana.com.br são permitidos.")
    setIsLoading(false)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ minHeight: 500 }}>
      <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
          {/* Header */}
          <div className="mb-6 space-y-4 text-center">
            <div className="flex justify-center">
              <KobanaLogo />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Backoffice Admin</h1>
              <p className="mt-1 text-sm text-slate-400">Acesso restrito à equipe Kobana</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google login button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 size-4" />
                  Entrando...
                </>
              ) : (
                <>
                  <GoogleIcon className="mr-2 size-4" />
                  Entrar com Google
                </>
              )}
            </button>

            {/* Restriction notice */}
            <p className="text-center text-xs text-slate-500">
              Apenas emails @kobana.com.br são autorizados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
