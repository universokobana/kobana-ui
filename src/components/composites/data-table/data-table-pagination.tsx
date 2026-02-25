import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface DataTablePaginationProps {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  selectedCount?: number;
  className?: string;
}

export function DataTablePagination({
  page,
  perPage,
  total,
  totalPages,
  onPageChange,
  onPerPageChange,
  selectedCount,
  className,
}: DataTablePaginationProps) {
  return (
    <div className={cn('flex items-center justify-between px-2 py-4', className)}>
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedCount !== undefined && selectedCount > 0 ? (
          <span>{selectedCount} de {total} selecionado(s)</span>
        ) : (
          <span>{total} registro(s)</span>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Por página</p>
          <Select
            value={String(perPage)}
            onValueChange={(value) => onPerPageChange?.(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={String(perPage)} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {page} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(1)}
            disabled={page <= 1}
          >
            «
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
          >
            ‹
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
          >
            ›
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(totalPages)}
            disabled={page >= totalPages}
          >
            »
          </Button>
        </div>
      </div>
    </div>
  );
}
