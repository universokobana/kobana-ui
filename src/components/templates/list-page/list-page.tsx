import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/kobana/composites/page-header';
import { DataTable, type PaginationConfig } from '@/components/kobana/composites/data-table';
import type { BulkAction, RowAction } from '@/components/kobana/composites/data-table';
import type { FilterConfig } from '@/components/kobana/composites/filter-bar';
import { EmptyState } from '@/components/kobana/composites/empty-state';
import { cn } from '@/lib/utils';

export interface ListPageProps<TData> {
  // Header
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  // DataTable
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  filters?: FilterConfig[];
  filterComponent?: React.ReactNode;
  searchKey?: string;
  searchPlaceholder?: string;
  pagination?: PaginationConfig;
  selectable?: boolean;
  bulkActions?: BulkAction<TData>[];
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
  emptyState?: {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
  };

  className?: string;
}

export function ListPage<TData>({
  title,
  description,
  breadcrumbs,
  primaryAction,
  columns,
  data,
  filterComponent,
  searchKey,
  searchPlaceholder,
  pagination,
  selectable,
  bulkActions,
  rowActions,
  onPageChange,
  onPerPageChange,
  onSearch,
  onRowClick,
  onRefresh,
  isLoading,
  emptyState,
  className,
}: ListPageProps<TData>) {
  const isEmpty = !isLoading && data.length === 0;

  return (
    <div className={cn('space-y-6', className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={
          primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.icon && <span className="mr-2">{primaryAction.icon}</span>}
              {primaryAction.label}
            </Button>
          )
        }
      />

      {isEmpty && emptyState ? (
        <EmptyState
          icon={emptyState.icon}
          title={emptyState.title}
          description={emptyState.description}
          action={
            emptyState.actionLabel && emptyState.onAction
              ? { label: emptyState.actionLabel, onClick: emptyState.onAction }
              : undefined
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          onSearch={onSearch}
          filterComponent={filterComponent}
          pagination={pagination}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
          selectable={selectable}
          bulkActions={bulkActions}
          rowActions={rowActions}
          isLoading={isLoading}
          onRowClick={onRowClick}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
