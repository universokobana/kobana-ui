import { useState, useMemo } from 'react';
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  Table,
} from '@tanstack/react-table';

export interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  serverSide?: boolean;
  defaultPageSize?: number;
}

export interface UseDataTableReturn<TData> {
  table: Table<TData>;
  sorting: SortingState;
  filtering: ColumnFiltersState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
}

export function useDataTable<TData>({
  data,
  columns,
  serverSide = false,
  defaultPageSize = 20,
}: UseDataTableOptions<TData>): UseDataTableReturn<TData> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters: filtering,
      pagination,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFiltering,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: serverSide ? undefined : getSortedRowModel(),
    getFilteredRowModel: serverSide ? undefined : getFilteredRowModel(),
    getPaginationRowModel: serverSide ? undefined : getPaginationRowModel(),
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    enableRowSelection: true,
  });

  return { table, sorting, filtering, pagination, rowSelection };
}
