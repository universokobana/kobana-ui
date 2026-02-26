import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

// ─── Icons ───────────────────────────────────────────────────────────────────

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

interface DataTableColumnVisibilityProps<TData> {
  table: Table<TData>;
  columnLabels?: Record<string, string>;
}

export function DataTableColumnVisibility<TData>({
  table,
  columnLabels,
}: DataTableColumnVisibilityProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hidableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide());

  if (hidableColumns.length === 0) return null;

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <SlidersIcon className="size-4" />
        <span className="sr-only">Colunas</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-[180px] rounded-md border bg-popover p-1 shadow-md">
          {hidableColumns.map((column) => {
            const isVisible = column.getIsVisible();
            return (
              <button
                key={column.id}
                type="button"
                onClick={() => column.toggleVisibility(!isVisible)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm capitalize text-popover-foreground transition-colors hover:bg-accent"
              >
                <span className={cn('flex size-4 items-center justify-center rounded-sm border border-primary', isVisible ? 'bg-primary text-primary-foreground' : 'opacity-50')}>
                  {isVisible && <CheckIcon className="size-3" />}
                </span>
                {columnLabels?.[column.id] ?? column.id}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
