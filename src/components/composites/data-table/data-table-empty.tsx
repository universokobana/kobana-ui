import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DataTableEmptyProps {
  colSpan: number;
  children?: React.ReactNode;
  className?: string;
}

export function DataTableEmpty({ colSpan, children, className }: DataTableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn('h-24 text-center', className)}>
        {children || (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <p className="text-sm">Nenhum resultado encontrado.</p>
          </div>
        )}
      </td>
    </tr>
  );
}
