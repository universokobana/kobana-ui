import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Icons ───────────────────────────────────────────────────────────────────

function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RowAction<TData> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: TData) => void;
  variant?: 'default' | 'destructive';
  hidden?: (row: TData) => boolean;
}

interface DataTableActionsProps<TData> {
  row: TData;
  actions: RowAction<TData>[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DataTableActions<TData>({ row, actions }: DataTableActionsProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const visibleActions = actions.filter((action) => !action.hidden?.(row));
  if (visibleActions.length === 0) return null;

  const destructiveActions = visibleActions.filter((a) => a.variant === 'destructive');
  const normalActions = visibleActions.filter((a) => a.variant !== 'destructive');

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <span className="sr-only">Abrir menu</span>
        <MoreHorizontalIcon className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-md border bg-popover p-1 shadow-md">
          {normalActions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
            >
              {action.icon && <span className="size-4">{action.icon}</span>}
              {action.label}
            </button>
          ))}
          {destructiveActions.length > 0 && normalActions.length > 0 && (
            <div className="my-1 h-px bg-border" />
          )}
          {destructiveActions.map((action, index) => (
            <button
              key={`d-${index}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive transition-colors hover:bg-accent"
            >
              {action.icon && <span className="size-4">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
