import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export interface DataTableLoadingProps {
  colSpan: number;
  rows?: number;
}

export function DataTableLoading({ colSpan, rows = 5 }: DataTableLoadingProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: colSpan }).map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
