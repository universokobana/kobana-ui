'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ImportError {
  row: number;
  error: string;
}

export interface ImportData {
  id: string;
  status: ImportStatus;
  fileName?: string | null;
  totalRows?: number | null;
  processedRows?: number | null;
  successCount?: number | null;
  errorCount?: number | null;
  errors?: ImportError[];
  errorMessage?: string | null;
}

export type ImportStatus =
  | 'idle'
  | 'pending'
  | 'processing'
  | 'completed'
  | 'completed_with_errors'
  | 'failed';

export interface ImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Async function that uploads the file and returns initial import data */
  onImport: (file: File) => Promise<ImportData>;
  /** Async function that polls for import status by id */
  onPollStatus: (importId: string) => Promise<ImportData>;
  /** Called when import completes successfully (or with errors) */
  onComplete?: () => void;
  /** Accepted file types (e.g. ".csv") */
  accept?: string;
  /** Polling interval in ms (default: 2000) */
  pollIntervalMs?: number;
  /** Labels for customization */
  labels?: {
    title?: string;
    description?: string;
    selectFile?: string;
    dropFile?: string;
    invalidFileType?: string;
    processing?: string;
    progress?: (processed: number, total: number) => string;
    completed?: string;
    completedStats?: (success: number, total: number) => string;
    completedWithErrors?: string;
    completedWithErrorsStats?: (success: number, errors: number, total: number) => string;
    errorRow?: (row: number, error: string) => string;
    moreErrors?: (count: number) => string;
    failed?: string;
    failedDescription?: string;
    cancel?: string;
    confirm?: string;
    close?: string;
    retry?: string;
  };
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const defaultLabels = {
  title: 'Importar',
  description: 'Importe dados a partir de um arquivo CSV.',
  selectFile: 'Clique ou arraste um arquivo CSV',
  dropFile: 'Solte o arquivo aqui',
  invalidFileType: 'Tipo de arquivo inválido. Selecione um arquivo CSV.',
  processing: 'Processando importação...',
  progress: (processed: number, total: number) => `${processed} de ${total} registros processados`,
  completed: 'Importação concluída!',
  completedStats: (success: number, total: number) =>
    `${success} de ${total} registros importados com sucesso.`,
  completedWithErrors: 'Importação concluída com erros',
  completedWithErrorsStats: (success: number, errors: number, total: number) =>
    `${success} importados, ${errors} erros de ${total} registros.`,
  errorRow: (row: number, error: string) => `Linha ${row}: ${error}`,
  moreErrors: (count: number) => `...e mais ${count} erros`,
  failed: 'Falha na importação',
  failedDescription: 'Ocorreu um erro ao processar a importação.',
  cancel: 'Cancelar',
  confirm: 'Importar',
  close: 'Fechar',
  retry: 'Tentar novamente',
};

export function ImportModal({
  open,
  onOpenChange,
  onImport,
  onPollStatus,
  onComplete,
  accept = '.csv',
  pollIntervalMs = 2000,
  labels: labelsProp,
  className,
}: ImportModalProps) {
  const [status, setStatus] = React.useState<ImportStatus>('idle');
  const [importData, setImportData] = React.useState<ImportData | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);
  const pollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const labels = { ...defaultLabels, ...labelsProp };

  const stopPolling = React.useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      setStatus('idle');
      setImportData(null);
      setSelectedFile(null);
      setFileError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      stopPolling();
    }
  }, [open, stopPolling]);

  React.useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const validateAndSetFile = (file: File) => {
    const acceptedExtensions = accept.split(',').map((ext) => ext.trim().toLowerCase());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!acceptedExtensions.includes(fileExtension)) {
      setFileError(labels.invalidFileType);
      return;
    }

    setFileError(null);
    setSelectedFile(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropZoneRef.current && !dropZoneRef.current.contains(event.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const pollImportStatus = React.useCallback(
    async (importId: string) => {
      try {
        const data = await onPollStatus(importId);
        setImportData(data);

        if (
          data.status === 'completed' ||
          data.status === 'completed_with_errors' ||
          data.status === 'failed'
        ) {
          setStatus(data.status);
          stopPolling();
        }
      } catch (error) {
        console.error('Error polling import status:', error);
      }
    },
    [onPollStatus, stopPolling],
  );

  const handleImport = async () => {
    if (!selectedFile) return;

    setStatus('pending');

    try {
      const result = await onImport(selectedFile);
      setImportData(result);
      setStatus('processing');

      pollIntervalRef.current = setInterval(() => {
        pollImportStatus(result.id);
      }, pollIntervalMs);
    } catch {
      setStatus('failed');
    }
  };

  const handleClose = () => {
    const shouldNotifyComplete = status === 'completed' || status === 'completed_with_errors';
    onOpenChange(false);
    if (shouldNotifyComplete) {
      onComplete?.();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80" onClick={handleClose} aria-hidden="true" />

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
            {/* FileSpreadsheet icon */}
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
              <path d="M8 13h2" />
              <path d="M14 13h2" />
              <path d="M8 17h2" />
              <path d="M14 17h2" />
            </svg>
            <h2 className="text-lg font-semibold">{labels.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{labels.description}</p>
        </div>

        {/* Body */}
        <div className="py-6">
          {status === 'idle' && (
            <div className="space-y-4">
              <div
                ref={dropZoneRef}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={cn(
                  'flex flex-col items-center gap-4 rounded-lg border-2 border-dashed p-6 transition-colors',
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  onChange={handleFileSelect}
                  className="hidden"
                  id="import-modal-file-upload"
                />
                <label
                  htmlFor="import-modal-file-upload"
                  className="flex cursor-pointer flex-col items-center gap-2 text-center"
                >
                  {/* Upload icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      'transition-colors',
                      isDragging ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span
                    className={cn(
                      'text-sm transition-colors',
                      isDragging ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {isDragging ? labels.dropFile : labels.selectFile}
                  </span>
                </label>
              </div>

              {fileError && (
                <p className="text-sm text-destructive text-center">{fileError}</p>
              )}

              {selectedFile && (
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-2">
                    {/* FileSpreadsheet small icon */}
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
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M8 13h2" />
                      <path d="M14 13h2" />
                      <path d="M8 17h2" />
                      <path d="M14 17h2" />
                    </svg>
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </span>
                </div>
              )}
            </div>
          )}

          {(status === 'pending' || status === 'processing') && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {/* Spinner */}
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
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{labels.processing}</p>
                {importData?.totalRows && importData?.processedRows !== undefined && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {labels.progress(importData.processedRows ?? 0, importData.totalRows)}
                  </p>
                )}
              </div>
            </div>
          )}

          {status === 'completed' && importData && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {/* CheckCircle icon */}
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
                <p className="text-sm text-muted-foreground">
                  {labels.completedStats(
                    importData.successCount || 0,
                    importData.totalRows || 0,
                  )}
                </p>
              </div>
            </div>
          )}

          {status === 'completed_with_errors' && importData && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {/* AlertTriangle icon */}
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
                className="text-yellow-500"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              <div className="text-center">
                <p className="font-medium">{labels.completedWithErrors}</p>
                <p className="text-sm text-muted-foreground">
                  {labels.completedWithErrorsStats(
                    importData.successCount || 0,
                    importData.errorCount || 0,
                    importData.totalRows || 0,
                  )}
                </p>
              </div>
              {importData.errors && importData.errors.length > 0 && (
                <div className="max-h-32 w-full overflow-auto rounded-lg bg-muted p-3 text-xs">
                  {importData.errors.slice(0, 5).map((err, i) => (
                    <div key={i} className="text-destructive">
                      {labels.errorRow(err.row, err.error)}
                    </div>
                  ))}
                  {importData.errors.length > 5 && (
                    <div className="text-muted-foreground mt-1">
                      {labels.moreErrors(importData.errors.length - 5)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {status === 'failed' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {/* XCircle icon */}
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
                <p className="font-medium text-destructive">{labels.failed}</p>
                <p className="text-sm text-muted-foreground">
                  {importData?.errorMessage || labels.failedDescription}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          {status === 'idle' && (
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
                onClick={handleImport}
                disabled={!selectedFile}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
              >
                {labels.confirm}
              </button>
            </>
          )}

          {(status === 'pending' || status === 'processing') && (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              {labels.cancel}
            </button>
          )}

          {(status === 'completed' || status === 'completed_with_errors') && (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
            >
              {labels.close}
            </button>
          )}

          {status === 'failed' && (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                {labels.close}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setImportData(null);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                {labels.retry}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
