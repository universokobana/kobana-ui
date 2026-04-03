import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  DangerZone                                                                */
/* -------------------------------------------------------------------------- */

export interface DangerZoneProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DangerZone = React.forwardRef<HTMLDivElement, DangerZoneProps>(
  ({ title, description, icon, children, className }, ref) => {
    return (
      <Card ref={ref} className={cn('border-destructive/50', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            {icon ?? <AlertTriangle className="h-5 w-5" />}
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-3">{children}</CardContent>
      </Card>
    );
  },
);

DangerZone.displayName = 'DangerZone';

/* -------------------------------------------------------------------------- */
/*  DangerZoneItem                                                            */
/* -------------------------------------------------------------------------- */

export interface DangerZoneItemProps {
  title: string;
  description?: string;
  variant?: 'danger' | 'warning';
  children: React.ReactNode;
  className?: string;
}

const itemVariants = {
  danger: 'border-destructive/30',
  warning: 'border-amber-200 dark:border-amber-900',
} as const;

export const DangerZoneItem = React.forwardRef<HTMLDivElement, DangerZoneItemProps>(
  ({ title, description, variant = 'danger', children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between',
          itemVariants[variant],
          className,
        )}
      >
        <div className="space-y-1">
          <p className="font-medium">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="shrink-0">{children}</div>
      </div>
    );
  },
);

DangerZoneItem.displayName = 'DangerZoneItem';
