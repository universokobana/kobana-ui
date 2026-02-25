import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface CopyCellProps {
  value: string;
  truncate?: number;
  className?: string;
}

export const CopyCell = React.forwardRef<HTMLDivElement, CopyCellProps>(
  ({ value, truncate, className }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const displayValue = truncate && value.length > truncate
      ? `${value.slice(0, truncate)}...`
      : value;

    const handleCopy = async (e: React.MouseEvent) => {
      e.stopPropagation();
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div ref={ref} className={cn('flex items-center gap-1', className)}>
              <span className="font-mono text-xs text-muted-foreground">{displayValue}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleCopy}
              >
                <span className="text-xs">{copied ? '✓' : '⎘'}</span>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-mono text-xs">{value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

CopyCell.displayName = 'CopyCell';
