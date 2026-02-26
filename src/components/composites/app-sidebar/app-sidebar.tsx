'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface NavItem {
  /** Display title */
  title: string;
  /** Route path */
  href: string;
  /** Lucide icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional badge count */
  badge?: number;
  /** Whether this item is currently active */
  active?: boolean;
}

export interface AppSidebarProps {
  /** Navigation items */
  navItems: NavItem[];
  /** Logo/branding element */
  logo?: React.ReactNode;
  /** Collapsed logo (shown when sidebar is collapsed) */
  collapsedLogo?: React.ReactNode;
  /** Whether sidebar starts collapsed */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Called when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Function to determine if a nav item is active. Receives href. */
  isActive?: (href: string) => boolean;
  /** Render function for links (to support Next.js Link, React Router, etc.) */
  renderLink?: (props: { href: string; className: string; children: React.ReactNode }) => React.ReactNode;
  /** Labels */
  labels?: {
    collapse?: string;
    expand?: string;
  };
  /** Footer content (shown above collapse toggle) */
  footer?: React.ReactNode;
  className?: string;
}

export const AppSidebar = React.forwardRef<HTMLElement, AppSidebarProps>(
  (
    {
      navItems,
      logo,
      collapsedLogo,
      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      isActive,
      renderLink,
      labels,
      footer,
      className,
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
    const collapsed = controlledCollapsed ?? internalCollapsed;

    const toggleCollapsed = () => {
      const next = !collapsed;
      setInternalCollapsed(next);
      onCollapsedChange?.(next);
    };

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
      <aside
        ref={ref}
        className={cn(
          'flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300',
          collapsed ? 'w-16' : 'w-64',
          className,
        )}
      >
        {/* Logo */}
        {(logo || collapsedLogo) && (
          <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
            {collapsed ? collapsedLogo ?? logo : logo}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive ? isActive(item.href) : item.active;
            const Icon = item.icon;

            return (
              <React.Fragment key={item.href}>
                {link({
                  href: item.href,
                  className: cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70',
                  ),
                  children: (
                    <>
                      {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  ),
                })}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Footer */}
        {footer && <div className="px-2 py-2">{footer}</div>}

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            type="button"
            onClick={toggleCollapsed}
            className="flex items-center justify-center w-full rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
                <span>{labels?.collapse ?? 'Recolher'}</span>
              </>
            )}
          </button>
        </div>
      </aside>
    );
  },
);
AppSidebar.displayName = 'AppSidebar';
