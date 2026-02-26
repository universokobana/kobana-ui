'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ExportResult {
  /** Total records exported */
  totalRecords?: number;
  /** File size in bytes */
  fileSize?: number;
  /** Download URL */
  fileUrl?: string;
  /** Suggested file name */
  fileName?: string;
}

export interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Label for what is being exported (e.g. "Cobranças") */
  entityLabel: string;
  /** Total count of records to export (0 = show generic message) */
  totalCount?: number;
  /** Async function that performs the export and returns the result */
  onExport: () => Promise<ExportResult>;
  /** Labels for customization */
  labels?: {
    title?: string;
    description?: string;
    confirmMessage?: string;
    processing?: string;
    completed?: string;
    error?: string;
    cancel?: string;
    export?: string;
    close?: string;
    download?: string;
  };
  className?: string;
}

type ExportState = 'confirm' | 'processing' | 'completed' | 'error';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const defaultLabels = {
  title: 'Exportar',
  description: 'Exporte para um arquivo CSV.',
  confirmMessage: 'registros serão exportados. Deseja continuar?',
  processing: 'Gerando exportação...',
  completed: 'Exportação concluída!',
  error: 'Erro na exportação',
  cancel: 'Cancelar',
  export: 'Exportar',
  close: 'Fechar',
  download: 'Baixar CSV',
};

export function ExportModal({
  open,
  onOpenChange,
  entityLabel,
  totalCount = 0,
  onExport,
  labels: labelsProp,
  className,
}: ExportModalProps) {
  const [state, setState] = React.useState<ExportState>('confirm');
  const [result, setResult] = React.useState<ExportResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const labels = { ...defaultLabels, ...labelsProp };

  React.useEffect(() => {
    if (open) {
      setState('confirm');
      setResult(null);
      setError(null);
    }
  }, [open]);

  const handleExport = async () => {
    setState('processing');
    setError(null);

    try {
      const exportResult = await onExport();
      setResult(exportResult);
      setState('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setState('error');
    }
  };

  const handleDownload = () => {
    if (result?.fileUrl && result?.fileName) {
      const link = document.createElement('a');
      link.href = result.fileUrl;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg',
          className,
        )}
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 12h4" />
              <path d="M10 16h4" />
              <path d="M10 8h1" />
            </svg>
            <h2 className="text-lg font-semibold">
              {labels.title} {entityLabel}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{labels.description}</p>
        </div>

        {/* Body */}
        <div className="py-6">
          {state === 'confirm' && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {totalCount > 0
                  ? `${totalCount} ${entityLabel.toLowerCase()} ${labels.confirmMessage}`
                  : `Todos os registros filtrados serão exportados. Deseja continuar?`}
              </p>
            </div>
          )}

          {state === 'processing' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <svg
                className="h-12 w-12 animate-spin text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-sm text-muted-foreground">{labels.processing}</p>
            </div>
          )}

          {state === 'completed' && result && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <div className="text-center">
                <p className="font-medium">{labels.completed}</p>
                {(result.totalRecords || result.fileSize) && (
                  <p className="text-sm text-muted-foreground">
                    {result.totalRecords && `${result.totalRecords} ${entityLabel.toLowerCase()} exportados`}
                    {result.totalRecords && result.fileSize && ' '}
                    {result.fileSize && `(${formatFileSize(result.fileSize)})`}
                  </p>
                )}
              </div>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-destructive"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              <div className="text-center">
                <p className="font-medium text-destructive">{labels.error}</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          {state === 'confirm' && (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                {labels.cancel}
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                {labels.export}
              </button>
            </>
          )}

          {state === 'completed' && (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                {labels.close}
              </button>
              {result?.fileUrl && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  {labels.download}
                </button>
              )}
            </>
          )}

          {state === 'error' && (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              {labels.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
