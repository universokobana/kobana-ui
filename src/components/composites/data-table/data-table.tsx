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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';
import { DataTableActions, type RowAction } from './data-table-actions';
import { DataTableBulkActions, type BulkAction } from './data-table-bulk-actions';
import { DataTableEmpty } from './data-table-empty';
import { DataTableLoading } from './data-table-loading';

export interface PaginationConfig {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // Search
  searchKey?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;

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

  // Columns
  columnLabels?: Record<string, string>;

  className?: string;
}

export function DataTable<TData, TValue = unknown>({
  columns: userColumns,
  data,
  searchKey,
  searchPlaceholder,
  onSearch,
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
  columnLabels,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [searchValue, setSearchValue] = React.useState('');

  // Build columns with optional selection and actions columns
  const columns = React.useMemo(() => {
    const cols: ColumnDef<TData, any>[] = [];

    if (selectable) {
      cols.push({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
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

    return cols;
  }, [userColumns, selectable, rowActions]);

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
    onSearch?.(value);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <DataTableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearch ? handleSearch : undefined}
        filterComponent={filterComponent}
        onRefresh={onRefresh}
        columnLabels={columnLabels}
      />

      {bulkActions && <DataTableBulkActions selectedRows={selectedRows} actions={bulkActions} />}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    className={cn(
                      header.id === 'actions' && 'sticky right-0 bg-background',
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableLoading colSpan={colSpan} />
            ) : table.getRowModel().rows.length === 0 ? (
              <DataTableEmpty colSpan={colSpan}>{emptyState}</DataTableEmpty>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(onRowClick && 'cursor-pointer')}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id === 'actions' && 'sticky right-0 bg-background',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
        />
      )}
    </div>
  );
}
