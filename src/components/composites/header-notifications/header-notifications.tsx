'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  /** Severity or type for color coding */
  severity?: 'info' | 'warning' | 'error' | 'critical';
  /** ISO timestamp */
  timestamp: string;
  /** Whether this notification has been read/acknowledged */
  read?: boolean;
  /** Optional link href */
  href?: string;
}

export interface HeaderNotificationsProps {
  /** Notifications to display */
  notifications: NotificationItem[];
  /** Number of unread notifications (if not provided, computed from notifications) */
  unreadCount?: number;
  /** Whether notifications are loading */
  isLoading?: boolean;
  /** Called when a notification is clicked */
  onNotificationClick?: (notification: NotificationItem) => void;
  /** Link to the full notifications page */
  viewAllHref?: string;
  /** Called when view all is clicked (alternative to viewAllHref) */
  onViewAll?: () => void;
  /** Render function for links */
  renderLink?: (props: { href: string; className: string; children: React.ReactNode }) => React.ReactNode;
  /** Labels */
  labels?: {
    title?: string;
    empty?: string;
    loading?: string;
    viewAll?: string;
    srLabel?: string;
  };
  className?: string;
}

const severityColors: Record<string, string> = {
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  critical: 'bg-red-600',
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
}

const defaultLabels = {
  title: 'Notificações',
  empty: 'Nenhuma notificação',
  loading: 'Carregando...',
  viewAll: 'Ver todas',
  srLabel: 'Notificações',
};

export function HeaderNotifications({
  notifications,
  unreadCount: unreadCountProp,
  isLoading = false,
  onNotificationClick,
  viewAllHref,
  onViewAll,
  renderLink,
  labels: labelsProp,
  className,
}: HeaderNotificationsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const labels = { ...defaultLabels, ...labelsProp };

  const unreadCount =
    unreadCountProp ?? notifications.filter((n) => !n.read).length;

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const defaultRenderLink = ({
    href,
    className: linkClassName,
    children,
  }: {
    href: string;
    className: string;
    children: React.ReactNode;
  }) => (
    <a href={href} className={linkClassName}>
      {children}
    </a>
  );

  const link = renderLink ?? defaultRenderLink;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        {!isLoading && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        <span className="sr-only">
          {unreadCount > 0
            ? `${unreadCount} ${labels.srLabel}`
            : labels.srLabel}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 rounded-md border bg-popover text-popover-foreground shadow-md z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">{labels.title}</h3>
              {unreadCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-muted-foreground">
                <svg className="h-8 w-8 mb-2 animate-spin opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                <p className="text-sm">{labels.loading}</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                <p className="text-sm">{labels.empty}</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => {
                  const content = (
                    <>
                      <div
                        className={cn(
                          'mt-0.5 h-2 w-2 rounded-full flex-shrink-0',
                          severityColors[notification.severity ?? 'info'],
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        {notification.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {notification.description}
                          </p>
                        )}
                      </div>
                    </>
                  );

                  const itemClass =
                    'flex items-start gap-3 px-4 py-3 hover:bg-accent transition-colors cursor-pointer';

                  if (notification.href) {
                    return (
                      <React.Fragment key={notification.id}>
                        {link({
                          href: notification.href,
                          className: itemClass,
                          children: content,
                        })}
                      </React.Fragment>
                    );
                  }

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => onNotificationClick?.(notification)}
                      className={cn(itemClass, 'w-full text-left')}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {(viewAllHref || onViewAll) && (
            <div className="border-t border-border px-4 py-3">
              {viewAllHref ? (
                link({
                  href: viewAllHref,
                  className:
                    'flex items-center justify-center gap-1 text-sm text-primary hover:underline font-medium',
                  children: (
                    <>
                      {labels.viewAll}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </>
                  ),
                })
              ) : (
                <button
                  type="button"
                  onClick={onViewAll}
                  className="flex items-center justify-center gap-1 text-sm text-primary hover:underline font-medium w-full"
                >
                  {labels.viewAll}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
