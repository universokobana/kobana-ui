import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, type PaginationConfig } from '@/components/kobana/composites/data-table';
import type { RowAction } from '@/components/kobana/composites/data-table';
import type { FilterConfig } from '@/components/kobana/composites/filter-bar';
import { cn } from '@/lib/utils';

// ─── Icons (inline SVGs) ────────────────────────────────────────────────────

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

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ManageListPageProps<TData> {
  // Header
  icon?: React.ReactNode;
  title: string;
  description?: string;
  headerAction?: React.ReactNode;

  // DataTable
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  filters?: FilterConfig[];
  filterComponent?: React.ReactNode;
  searchKey?: string;
  searchPlaceholder?: string;
  pagination?: PaginationConfig;
  rowActions?: RowAction<TData>[];

  // Callbacks
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (values: Record<string, unknown>) => void;
  onRowClick?: (row: TData) => void;
  onRefresh?: () => void;

  // States
  isLoading?: boolean;
  isRefreshing?: boolean;

  // Empty
  emptyTitle?: string;
  emptyDescription?: string;

  // Labels
  labels?: {
    refresh?: string;
  };

  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ManageListPage<TData>({
  icon,
  title,
  description,
  headerAction,
  columns,
  data,
  filterComponent,
  searchKey,
  searchPlaceholder,
  pagination,
  rowActions,
  onPageChange,
  onPerPageChange,
  onSearch,
  onRowClick,
  onRefresh,
  isLoading,
  isRefreshing,
  emptyTitle,
  emptyDescription,
  labels,
  className,
}: ManageListPageProps<TData>) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {headerAction}
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={data}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        onSearch={onSearch}
        filterComponent={
          <div className="flex items-center gap-3">
            {filterComponent}
            {onRefresh && (
              <>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                >
                  <RefreshIcon className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
                  {labels?.refresh ?? 'Atualizar'}
                </button>
              </>
            )}
          </div>
        }
        pagination={pagination}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        rowActions={rowActions}
        isLoading={isLoading}
        onRowClick={onRowClick}
        onRefresh={onRefresh}
      />
    </div>
  );
}
