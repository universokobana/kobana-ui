import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const defaultStatusConfig: Record<string, { color: string; bgColor: string }> = {
  active: {
    color: 'var(--color-status-success)',
    bgColor: 'var(--color-status-success-bg)',
  },
  inactive: {
    color: 'var(--color-status-error)',
    bgColor: 'var(--color-status-error-bg)',
  },
  pending: {
    color: 'var(--color-status-warning)',
    bgColor: 'var(--color-status-warning-bg)',
  },
  error: {
    color: 'var(--color-status-error)',
    bgColor: 'var(--color-status-error-bg)',
  },
  processing: {
    color: 'var(--color-status-info)',
    bgColor: 'var(--color-status-info-bg)',
  },
  success: {
    color: 'var(--color-status-success)',
    bgColor: 'var(--color-status-success-bg)',
  },
  warning: {
    color: 'var(--color-status-warning)',
    bgColor: 'var(--color-status-warning-bg)',
  },
  info: {
    color: 'var(--color-status-info)',
    bgColor: 'var(--color-status-info-bg)',
  },
};

const statusIcons: Record<string, string> = {
  active: '●',
  inactive: '○',
  pending: '◷',
  error: '✕',
  processing: '↻',
  success: '✓',
  warning: '⚠',
  info: 'ℹ',
};

export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'processing' | 'success' | 'warning' | 'info' | (string & {});
  label?: string;
  size?: 'sm' | 'md';
  icon?: boolean;
  statusConfig?: Record<string, { color: string; bgColor: string; icon?: string }>;
  className?: string;
}

export const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, label, size = 'md', icon = true, statusConfig, className }, ref) => {
    const config = { ...defaultStatusConfig, ...statusConfig };
    const statusDef = config[status] || {
      color: 'var(--color-status-info)',
      bgColor: 'var(--color-status-info-bg)',
    };

    const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
    const iconChar = statusConfig?.[status]?.icon || statusIcons[status];

    return (
      <Badge
        ref={ref}
        variant="outline"
        className={cn(
          'inline-flex items-center gap-1 border-transparent font-medium',
          size === 'sm' ? 'px-1.5 py-0 text-xs' : 'px-2 py-0.5 text-xs',
          className,
        )}
        style={{
          color: statusDef.color,
          backgroundColor: statusDef.bgColor,
        }}
      >
        {icon && iconChar && (
          <span
            className={cn(
              'inline-flex shrink-0',
              status === 'processing' && 'animate-spin',
            )}
            aria-hidden="true"
          >
            {iconChar}
          </span>
        )}
        {displayLabel}
      </Badge>
    );
  },
);

StatusBadge.displayName = 'StatusBadge';
