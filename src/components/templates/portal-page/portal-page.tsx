import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Icons (inline SVGs) ────────────────────────────────────────────────────

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PortalPageStat {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  iconClassName?: string;
}

export interface PortalPageItem {
  id: string;
  icon: React.ReactNode;
  iconClassName?: string;
  title: React.ReactNode;
  badge?: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  value?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface PortalPageSection {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'warning' | 'danger';
  items: PortalPageItem[];
}

export interface PortalPagePagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  buildPageUrl?: (page: number) => string;
  labels?: {
    showing?: string;
    previous?: string;
    next?: string;
  };
}

export interface PortalPageEmptyState {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export interface PortalPageProps {
  // Header
  title: string;
  description?: string;
  headerAction?: React.ReactNode;

  // Stats
  stats?: PortalPageStat[];

  // Sections
  sections: PortalPageSection[];

  // Pagination (applies to main section)
  pagination?: PortalPagePagination;

  // Empty state (shown when all sections are empty)
  emptyState?: PortalPageEmptyState;

  // Footer content (e.g., quick actions, info cards)
  footer?: React.ReactNode;

  className?: string;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function PortalHeader({
  title,
  description,
  headerAction,
}: {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {headerAction}
    </div>
  );
}

function PortalPageStats({ stats }: { stats: PortalPageStat[] }) {
  const gridCols = stats.length <= 2
    ? 'sm:grid-cols-2'
    : stats.length === 3
      ? 'sm:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={cn('grid gap-4', gridCols)}>
      {stats.map((stat, index) => (
        <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center gap-4">
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', stat.iconClassName)}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PortalPageItemRow({ item }: { item: PortalPageItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', item.iconClassName)}>
          {item.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{item.title}</p>
            {item.badge}
          </div>
          {item.subtitle && (
            <div className="text-sm text-muted-foreground">{item.subtitle}</div>
          )}
          {item.meta && (
            <div className="text-sm text-muted-foreground">{item.meta}</div>
          )}
        </div>
      </div>
      {(item.value || item.actions) && (
        <div className="flex items-center gap-4">
          {item.value && (
            <div className="text-lg font-semibold">{item.value}</div>
          )}
          {item.actions && (
            <div className="flex gap-2">{item.actions}</div>
          )}
        </div>
      )}
    </div>
  );
}

const sectionVariants = {
  default: '',
  warning: 'border-yellow-500/20 bg-yellow-500/5',
  danger: 'border-red-500/20 bg-red-500/5',
} as const;

const sectionTitleVariants = {
  default: '',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
} as const;

function PortalPageSectionCard({ section }: { section: PortalPageSection }) {
  const variant = section.variant ?? 'default';

  return (
    <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', sectionVariants[variant])}>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className={cn('flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight', sectionTitleVariants[variant])}>
          {section.icon}
          {section.title}
        </h3>
        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </div>
      <div className="space-y-4 p-6 pt-0">
        {section.items.map((item) => (
          <PortalPageItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function PortalPagePaginationBar({ pagination }: { pagination: PortalPagePagination }) {
  const { page, perPage, total, totalPages, onPageChange, buildPageUrl, labels } = pagination;
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const showingText = labels?.showing
    ?? `Mostrando ${from} a ${to} de ${total} resultados`;
  const previousText = labels?.previous ?? 'Anterior';
  const nextText = labels?.next ?? 'Próximo';

  const PrevContent = () => (
    <>
      <ChevronLeftIcon className="mr-1 h-4 w-4" />
      {previousText}
    </>
  );

  const NextContent = () => (
    <>
      {nextText}
      <ChevronRightIcon className="ml-1 h-4 w-4" />
    </>
  );

  return (
    <div className="mt-6 flex items-center justify-between border-t pt-4">
      <p className="text-sm text-muted-foreground">{showingText}</p>
      <div className="flex gap-2">
        {buildPageUrl ? (
          <>
            {page > 1 ? (
              <a
                href={buildPageUrl(page - 1)}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                <PrevContent />
              </a>
            ) : (
              <span className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm opacity-50 cursor-not-allowed">
                <PrevContent />
              </span>
            )}
            {page < totalPages ? (
              <a
                href={buildPageUrl(page + 1)}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                <NextContent />
              </a>
            ) : (
              <span className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm opacity-50 cursor-not-allowed">
                <NextContent />
              </span>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PrevContent />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <NextContent />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function PortalEmpty({ emptyState }: { emptyState: PortalPageEmptyState }) {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {emptyState.icon && (
          <div className="text-muted-foreground/50">{emptyState.icon}</div>
        )}
        <p className="mt-4 text-lg font-medium">{emptyState.title}</p>
        {emptyState.description && (
          <p className="text-sm text-muted-foreground">{emptyState.description}</p>
        )}
        {emptyState.action && (
          <div className="mt-4">{emptyState.action}</div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function PortalPage({
  title,
  description,
  headerAction,
  stats,
  sections,
  pagination,
  emptyState,
  footer,
  className,
}: PortalPageProps) {
  const allEmpty = sections.every((s) => s.items.length === 0);

  return (
    <div className={cn('space-y-6', className)}>
      <PortalHeader
        title={title}
        description={description}
        headerAction={headerAction}
      />

      {stats && stats.length > 0 && (
        <PortalPageStats stats={stats} />
      )}

      {allEmpty && emptyState ? (
        <PortalEmpty emptyState={emptyState} />
      ) : (
        sections.map((section, index) => {
          if (section.items.length === 0) return null;
          const isLastSection = index === sections.length - 1;
          return (
            <React.Fragment key={index}>
              <PortalPageSectionCard section={section} />
              {isLastSection && pagination && pagination.totalPages > 1 && (
                <PortalPagePaginationBar pagination={pagination} />
              )}
            </React.Fragment>
          );
        })
      )}

      {footer}
    </div>
  );
}
