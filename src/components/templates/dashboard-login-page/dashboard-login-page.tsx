'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Icons (inline SVGs) ────────────────────────────────────────────────────

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('animate-spin', className)}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DashboardLoginPageLabels {
  title?: string;
  login?: string;
  loginDescription?: string;
  loginWithProvider?: string;
  loggingIn?: string;
  or?: string;
  magicLinkEmailLabel?: string;
  magicLinkEmailPlaceholder?: string;
  magicLinkSend?: string;
  magicLinkSending?: string;
  magicLinkSent?: string;
  magicLinkSentDescription?: string;
  magicLinkSendAnother?: string;
  magicLinkError?: string;
  termsPrefix?: string;
  termsOfUse?: string;
  and?: string;
  privacyPolicy?: string;
}

export interface DashboardLoginPageProps {
  /** Logo element rendered above the card */
  logo?: React.ReactNode;
  /** Labels for i18n support */
  labels?: DashboardLoginPageLabels;
  /** Called when the user clicks the primary login button (e.g. OAuth) */
  onLogin: () => void | Promise<void>;
  /** Called to send a magic link email. Omit to hide the magic link section. */
  onSendMagicLink?: (email: string) => Promise<void>;
  /** Error message from URL params or external source */
  error?: string | null;
  /** URL for terms of use link */
  termsHref?: string;
  /** URL for privacy policy link */
  privacyHref?: string;
  /** Additional class name for the root container */
  className?: string;
}

// ─── Default labels ──────────────────────────────────────────────────────────

const defaultLabels: Required<DashboardLoginPageLabels> = {
  title: 'Billing',
  login: 'Entrar',
  loginDescription: 'Acesse o painel de gestão de cobranças.',
  loginWithProvider: 'Entrar com Kobana',
  loggingIn: 'Entrando...',
  or: 'ou',
  magicLinkEmailLabel: 'Entrar com link mágico',
  magicLinkEmailPlaceholder: 'nome@empresa.com.br',
  magicLinkSend: 'Enviar link mágico',
  magicLinkSending: 'Enviando...',
  magicLinkSent: 'Link enviado!',
  magicLinkSentDescription: 'Verifique sua caixa de entrada. Enviamos um link de acesso para seu e-mail.',
  magicLinkSendAnother: 'Enviar outro',
  magicLinkError: 'Não foi possível enviar o link. Tente novamente.',
  termsPrefix: 'Ao continuar, você concorda com os',
  termsOfUse: 'Termos de Uso',
  and: 'e',
  privacyPolicy: 'Política de Privacidade',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function DashboardLoginPage({
  logo,
  labels: labelsProp,
  onLogin,
  onSendMagicLink,
  error: externalError,
  termsHref = '#',
  privacyHref = '#',
  className,
}: DashboardLoginPageProps) {
  const labels = { ...defaultLabels, ...labelsProp };

  const [isLoading, setIsLoading] = React.useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = React.useState('');
  const [magicLinkStatus, setMagicLinkStatus] = React.useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await onLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSendMagicLink || !magicLinkEmail.trim()) return;

    setMagicLinkStatus('sending');
    try {
      await onSendMagicLink(magicLinkEmail.trim());
      setMagicLinkStatus('sent');
    } catch {
      setMagicLinkStatus('error');
    }
  };

  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center bg-black', className)}>
      <div className="w-full max-w-md space-y-8 px-4">
        {/* Header with logo */}
        <div className="flex flex-col items-center space-y-4">
          {logo && <div>{logo}</div>}
          <h1 className="font-display text-2xl font-bold text-white">
            {labels.title}
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          {/* Card header */}
          <div className="mb-4 text-center">
            <h2 className="font-display text-xl font-semibold text-white">
              {labels.login}
            </h2>
            <p className="mt-1 text-sm text-[#676767]">
              {labels.loginDescription}
            </p>
          </div>

          <div className="space-y-4">
            {/* Error */}
            {externalError && (
              <div className="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
                <span>{externalError}</span>
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
                  {labels.loggingIn}
                </>
              ) : (
                <>
                  {labels.loginWithProvider}
                  <ExternalLinkIcon className="ml-2 size-4" />
                </>
              )}
            </button>

            {/* Magic link section */}
            {onSendMagicLink && (
              <>
                {/* Separator */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-[#676767]">
                      {labels.or}
                    </span>
                  </div>
                </div>

                {/* Magic link sent state */}
                {magicLinkStatus === 'sent' ? (
                  <div className="space-y-3 py-2 text-center">
                    <CheckCircleIcon className="mx-auto size-8 text-green-500" />
                    <p className="text-sm font-medium text-white">{labels.magicLinkSent}</p>
                    <p className="text-sm text-[#676767]">{labels.magicLinkSentDescription}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setMagicLinkStatus('idle');
                        setMagicLinkEmail('');
                      }}
                      className="text-sm text-[#D3FD54] hover:underline"
                    >
                      {labels.magicLinkSendAnother}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMagicLinkSend} className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="magic-link-email" className="block text-sm text-[#676767]">
                        {labels.magicLinkEmailLabel}
                      </label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#676767]" />
                        <input
                          id="magic-link-email"
                          type="email"
                          placeholder={labels.magicLinkEmailPlaceholder}
                          value={magicLinkEmail}
                          onChange={(e) => setMagicLinkEmail(e.target.value)}
                          required
                          className="h-10 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white placeholder:text-[#676767]/50 focus:border-[#D3FD54]/50 focus:outline-none focus:ring-1 focus:ring-[#D3FD54]/50"
                        />
                      </div>
                    </div>

                    {magicLinkStatus === 'error' && (
                      <div className="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                        <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
                        <span>{labels.magicLinkError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={magicLinkStatus === 'sending' || !magicLinkEmail.trim()}
                      className="inline-flex h-10 w-full items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
                    >
                      {magicLinkStatus === 'sending' ? (
                        <>
                          <LoaderIcon className="mr-2 size-4" />
                          {labels.magicLinkSending}
                        </>
                      ) : (
                        <>
                          <MailIcon className="mr-2 size-4" />
                          {labels.magicLinkSend}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}

            {/* Terms */}
            <p className="text-center text-sm text-[#676767]">
              {labels.termsPrefix}{' '}
              <a href={termsHref} className="text-[#D3FD54] hover:underline">
                {labels.termsOfUse}
              </a>{' '}
              {labels.and}{' '}
              <a href={privacyHref} className="text-[#D3FD54] hover:underline">
                {labels.privacyPolicy}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
