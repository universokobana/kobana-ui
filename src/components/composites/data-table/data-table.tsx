import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { DataTableToolbar } from './data-table-toolbar';
import type { DataTableToolbarLabels } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';
import { DataTableColumnVisibility } from './data-table-column-visibility';
import type { DataTablePaginationLabels } from './data-table-pagination';
import { DataTableActions, type RowAction } from './data-table-actions';
import { DataTableBulkActions, type BulkAction } from './data-table-bulk-actions';
import { DataTableEmpty } from './data-table-empty';
import { DataTableLoading } from './data-table-loading';

// ─── Inline checkbox (no external dep) ───────────────────────────────────────

function TableCheckbox({
  checked,
  indeterminate,
  onChange,
  'aria-label': ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  'aria-label'?: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={ariaLabel}
      className="size-4 rounded border border-input accent-primary"
    />
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PaginationConfig {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface DataTableLabels {
  toolbar?: DataTableToolbarLabels;
  pagination?: DataTablePaginationLabels;
  selectAll?: string;
  selectRow?: string;
  openMenu?: string;
}

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // Search
  searchKey?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  isSearching?: boolean;

  // Filters
  filterComponent?: React.ReactNode;

  // Pagination
  pagination?: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;

  // Selection
  selectable?: boolean;
  bulkActions?: BulkAction<TData>[];

  // Row actions
  rowActions?: RowAction<TData>[];

  // States
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (row: TData) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;

  // Columns
  columnLabels?: Record<string, string>;

  // Labels (i18n)
  labels?: DataTableLabels;

  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DataTable<TData, TValue = unknown>({
  columns: userColumns,
  data,
  searchKey,
  searchPlaceholder,
  onSearch,
  isSearching,
  filterComponent,
  pagination,
  onPageChange,
  onPerPageChange,
  selectable = false,
  bulkActions,
  rowActions,
  isLoading = false,
  emptyState,
  onRowClick,
  onRefresh,
  isRefreshing,
  columnLabels,
  labels,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [searchValue, setSearchValue] = React.useState('');
  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // Build columns with optional selection and actions columns
  const columns = React.useMemo(() => {
    const cols: ColumnDef<TData, any>[] = [];

    if (selectable) {
      cols.push({
        id: 'select',
        header: ({ table }) => (
          <TableCheckbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onChange={(value) => table.toggleAllPageRowsSelected(value)}
            aria-label={labels?.selectAll ?? 'Selecionar todos'}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            checked={row.getIsSelected()}
            onChange={(value) => row.toggleSelected(value)}
            aria-label={labels?.selectRow ?? 'Selecionar linha'}
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      });
    }

    cols.push(...(userColumns as ColumnDef<TData, any>[]));

    if (rowActions && rowActions.length > 0) {
      cols.push({
        id: 'actions',
        header: () => null,
        cell: ({ row }) => <DataTableActions row={row.original} actions={rowActions} />,
        enableSorting: false,
        enableHiding: false,
        size: 50,
      });
    }

    // Column visibility icon in the last column header
    cols.push({
      id: '_column_visibility',
      header: ({ table: t }) => (
        <DataTableColumnVisibility table={t} columnLabels={columnLabels} />
      ),
      cell: () => null,
      enableSorting: false,
      enableHiding: false,
      size: 40,
    });

    return cols;
  }, [userColumns, selectable, rowActions, labels, columnLabels]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: selectable,
    manualPagination: true,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((r) => r.original);
  const colSpan = columns.length;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (onSearch) {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => onSearch(value), 300);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <DataTableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearch ? handleSearch : undefined}
        isSearching={isSearching}
        filterComponent={filterComponent}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        labels={labels?.toolbar}
      />

      {bulkActions && <DataTableBulkActions selectedRows={selectedRows} actions={bulkActions} />}

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                      className={cn(
                        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
                        header.id === 'actions' && 'sticky right-0 bg-background w-[50px]',
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <DataTableLoading colSpan={colSpan} />
              ) : table.getRowModel().rows.length === 0 ? (
                <DataTableEmpty colSpan={colSpan}>{emptyState}</DataTableEmpty>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(
                      'group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          'p-4 align-middle [&:has([role=checkbox])]:pr-0',
                          cell.column.id === 'actions' && 'sticky right-0 bg-background w-[50px]',
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <DataTablePagination
          page={pagination.page}
          perPage={pagination.perPage}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
          selectedCount={selectable ? selectedRows.length : undefined}
          labels={labels?.pagination}
        />
      )}
    </div>
  );
}
