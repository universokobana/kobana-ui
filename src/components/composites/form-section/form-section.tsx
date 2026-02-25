import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface FormSectionProps {
  title: string;
  description?: string;
  columns?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const;

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, description, columns = 1, children, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Separator />
        <div className={cn('grid gap-4', gridCols[columns])}>{children}</div>
      </div>
    );
  },
);

FormSection.displayName = 'FormSection';
