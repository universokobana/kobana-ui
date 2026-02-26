'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RequirePermissionProps {
  /** Single permission required */
  permission?: string;
  /** All of these permissions required (AND logic) */
  allPermissions?: string[];
  /** Any of these permissions required (OR logic) */
  anyPermissions?: string[];
  /** Function to check if user has a permission. Usually provided via context. */
  can: (permission: string) => boolean;
  /** Whether permissions are still loading */
  isLoading?: boolean;
  /** Content to show when user has permission */
  children: React.ReactNode;
  /** Content to show when user lacks permission (optional) */
  fallback?: React.ReactNode;
  className?: string;
}

export function RequirePermission({
  permission,
  allPermissions,
  anyPermissions,
  can,
  isLoading = false,
  children,
  fallback = null,
}: RequirePermissionProps) {
  if (isLoading) {
    return null;
  }

  let hasAccess = false;

  if (permission) {
    hasAccess = can(permission);
  } else if (allPermissions && allPermissions.length > 0) {
    hasAccess = allPermissions.every((p) => can(p));
  } else if (anyPermissions && anyPermissions.length > 0) {
    hasAccess = anyPermissions.some((p) => can(p));
  } else {
    hasAccess = true;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Higher-order component version.
 *
 * Usage:
 * ```tsx
 * const ProtectedButton = withRequirePermission(Button, {
 *   permission: 'admin.write',
 *   can: (p) => userPermissions.includes(p),
 * });
 * ```
 */
export function withRequirePermission<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<RequirePermissionProps, 'children'>,
) {
  return function ProtectedComponent(props: P) {
    return (
      <RequirePermission {...options}>
        <Component {...props} />
      </RequirePermission>
    );
  };
}

/* ─── Access Denied card ─── */

export interface AccessDeniedProps {
  title?: string;
  description?: string;
  backLabel?: string;
  onBack?: () => void;
  className?: string;
}

export function AccessDenied({
  title = 'Acesso Negado',
  description = 'Você não tem permissão para acessar esta página.',
  backLabel = 'Voltar',
  onBack,
  className,
}: AccessDeniedProps) {
  return (
    <div className={cn('flex items-center justify-center min-h-[400px] p-4', className)}>
      <div className="max-w-md w-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col items-center space-y-1.5 p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-destructive"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m14.5 9.5-5 5" />
              <path d="m9.5 9.5 5 5" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </div>
        {onBack && (
          <div className="flex items-center p-6 pt-0 justify-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              {backLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
