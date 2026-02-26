import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronsUpDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

// ─── TanStack Column Header ──────────────────────────────────────────────────

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <button
      type="button"
      className={cn(
        '-ml-3 inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent',
        className,
      )}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span>{title}</span>
      {column.getIsSorted() === 'desc' ? (
        <ChevronDownIcon className="size-4" />
      ) : column.getIsSorted() === 'asc' ? (
        <ChevronDownIcon className="size-4 rotate-180" />
      ) : (
        <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
      )}
    </button>
  );
}

// ─── Simple Sortable Header (without TanStack context) ───────────────────────

export type SortDirection = 'asc' | 'desc' | null;

interface SimpleSortableHeaderProps {
  title: string;
  sortKey: string;
  currentSortKey: string | null;
  currentSortDirection: SortDirection;
  onSort: (key: string) => void;
  className?: string;
}

export function SimpleSortableHeader({
  title,
  sortKey,
  currentSortKey,
  currentSortDirection,
  onSort,
  className,
}: SimpleSortableHeaderProps) {
  const isActive = currentSortKey === sortKey;

  return (
    <button
      type="button"
      className={cn(
        '-ml-3 inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      onClick={() => onSort(sortKey)}
    >
      <span>{title}</span>
      {isActive && currentSortDirection === 'desc' ? (
        <ChevronDownIcon className="size-4" />
      ) : isActive && currentSortDirection === 'asc' ? (
        <ChevronDownIcon className="size-4 rotate-180" />
      ) : (
        <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
      )}
    </button>
  );
}
