import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface BulkAction<TData> {
  label: string;
  icon?: React.ReactNode;
  onClick: (rows: TData[]) => void;
  variant?: 'default' | 'destructive';
}

interface DataTableBulkActionsProps<TData> {
  selectedRows: TData[];
  actions: BulkAction<TData>[];
  className?: string;
}

export function DataTableBulkActions<TData>({
  selectedRows,
  actions,
  className,
}: DataTableBulkActionsProps<TData>) {
  if (selectedRows.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-2 rounded-md bg-muted p-2', className)}>
      <span className="text-sm text-muted-foreground">
        {selectedRows.length} selecionado(s)
      </span>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant === 'destructive' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => action.onClick(selectedRows)}
        >
          {action.icon && <span className="mr-1">{action.icon}</span>}
          {action.label}
        </Button>
      ))}
    </div>
  );
}
