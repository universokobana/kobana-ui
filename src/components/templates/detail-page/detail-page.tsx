import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/kobana/composites/page-header';
import { cn } from '@/lib/utils';

export interface DetailPageTab {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface DetailPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  backHref?: string;
  tabs?: DetailPageTab[];
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function DetailPage({
  title,
  description,
  breadcrumbs,
  actions,
  backHref,
  tabs,
  children,
  isLoading,
  className,
}: DetailPageProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Separator />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={actions}
        backHref={backHref}
      />

      {tabs && tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0].value}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        children
      )}
    </div>
  );
}

export interface DetailSectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  columns?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const;

export function DetailSection({
  title,
  description,
  actions,
  columns = 1,
  children,
  className,
}: DetailSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
      <div className={cn('grid gap-4', gridCols[columns])}>{children}</div>
    </div>
  );
}
