import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

// ─── Icons ───────────────────────────────────────────────────────────────────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DataTableToolbarLabels {
  search?: string;
  refresh?: string;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isSearching?: boolean;
  filterComponent?: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  labels?: DataTableToolbarLabels;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = 'Buscar...',
  searchValue,
  onSearchChange,
  isSearching,
  filterComponent,
  onRefresh,
  isRefreshing,
  labels,
  className,
}: DataTableToolbarProps<TData>) {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Row 1: Search */}
      {onSearchChange && (
        <div className="relative w-full max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder={searchPlaceholder}
            value={searchValue ?? ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-8 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          {isSearching && (
            <LoaderIcon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          )}
        </div>
      )}

      {/* Row 2: Filters + Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {filterComponent}
        </div>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              <RefreshIcon className={cn('size-4', isRefreshing && 'animate-spin')} />
              <span className="sr-only">{labels?.refresh ?? 'Atualizar'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
