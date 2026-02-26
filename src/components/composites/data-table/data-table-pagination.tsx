import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronsLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronsRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DataTablePaginationLabels {
  showing?: string;
  to?: string;
  of?: string;
  results?: string;
  selected?: string;
  perPage?: string;
  page?: string;
  pageOf?: string;
  firstPage?: string;
  previousPage?: string;
  nextPage?: string;
  lastPage?: string;
}

export interface DataTablePaginationProps {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  selectedCount?: number;
  labels?: DataTablePaginationLabels;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const defaultLabels: Required<DataTablePaginationLabels> = {
  showing: 'Mostrando',
  to: 'a',
  of: 'de',
  results: 'resultados',
  selected: 'selecionado(s)',
  perPage: 'Por página',
  page: 'Página',
  pageOf: 'de',
  firstPage: 'Primeira página',
  previousPage: 'Página anterior',
  nextPage: 'Próxima página',
  lastPage: 'Última página',
};

export function DataTablePagination({
  page,
  perPage,
  total,
  totalPages,
  onPageChange,
  onPerPageChange,
  selectedCount,
  labels: labelsProp,
  className,
}: DataTablePaginationProps) {
  const labels = { ...defaultLabels, ...labelsProp };

  const from = Math.min((page - 1) * perPage + 1, total);
  const to = Math.min(page * perPage, total);

  return (
    <div className={cn('flex items-center justify-between px-2 py-4', className)}>
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedCount !== undefined && selectedCount > 0 ? (
          <span>{selectedCount} {labels.of} {total} {labels.selected}</span>
        ) : (
          <span>
            {labels.showing} {from} {labels.to} {to} {labels.of} {total} {labels.results}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{labels.perPage}</p>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange?.(Number(e.target.value))}
            className="h-8 w-[70px] rounded-md border border-input bg-background text-sm"
          >
            {[10, 20, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {labels.page} {page} {labels.pageOf} {totalPages || 1}
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onPageChange?.(1)}
            disabled={page <= 1}
            className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            <span className="sr-only">{labels.firstPage}</span>
            <ChevronsLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            <span className="sr-only">{labels.previousPage}</span>
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            <span className="sr-only">{labels.nextPage}</span>
            <ChevronRightIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange?.(totalPages)}
            disabled={page >= totalPages}
            className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            <span className="sr-only">{labels.lastPage}</span>
            <ChevronsRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
