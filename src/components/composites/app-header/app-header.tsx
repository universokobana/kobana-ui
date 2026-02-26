'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AppHeaderUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface AppHeaderProps {
  /** User information for the avatar menu */
  user?: AppHeaderUser | null;
  /** Called when mobile menu button is clicked */
  onMenuClick?: () => void;
  /** Called when sign out is clicked */
  onSignOut?: () => void;
  /** User menu items (rendered between user info and sign out) */
  menuItems?: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }>;
  /** Content rendered in the right side, before the user menu (e.g. ThemeToggle, HeaderNotifications) */
  actions?: React.ReactNode;
  /** Content rendered in the left side, after the menu button (e.g. breadcrumbs) */
  leftContent?: React.ReactNode;
  /** Render function for links */
  renderLink?: (props: { href: string; className: string; children: React.ReactNode }) => React.ReactNode;
  /** Labels */
  labels?: {
    menu?: string;
    signOut?: string;
    profile?: string;
  };
  className?: string;
}

function getInitials(name?: string | null): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    {
      user,
      onMenuClick,
      onSignOut,
      menuItems = [],
      actions,
      leftContent,
      renderLink,
      labels,
      className,
    },
    ref,
  ) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Close menu on outside click
    React.useEffect(() => {
      if (!menuOpen) return;
      const handleClick = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [menuOpen]);

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
      <header
        ref={ref}
        className={cn(
          'h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className,
        )}
      >
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {onMenuClick && (
              <button
                type="button"
                onClick={onMenuClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                <span className="sr-only">{labels?.menu ?? 'Menu'}</span>
              </button>
            )}
            {leftContent}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {actions}

            {/* User Menu */}
            {user && (
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-transparent hover:border-accent transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || ''}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {getInitials(user.name)}
                    </div>
                  )}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50">
                    {/* User info */}
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      {user.email && (
                        <p className="text-xs leading-none text-muted-foreground mt-1">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <div className="my-1 h-px bg-muted" />

                    {/* Custom menu items */}
                    {menuItems.map((item, i) =>
                      item.href ? (
                        <React.Fragment key={i}>
                          {link({
                            href: item.href,
                            className:
                              'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground w-full',
                            children: (
                              <>
                                {item.icon}
                                {item.label}
                              </>
                            ),
                          })}
                        </React.Fragment>
                      ) : (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            item.onClick?.();
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground w-full text-left"
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ),
                    )}

                    {/* Sign out */}
                    {onSignOut && (
                      <>
                        {menuItems.length > 0 && <div className="my-1 h-px bg-muted" />}
                        <button
                          type="button"
                          onClick={() => {
                            onSignOut();
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent w-full text-left text-destructive"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                          {labels?.signOut ?? 'Sair'}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  },
);
AppHeader.displayName = 'AppHeader';
