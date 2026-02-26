'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AppLayoutProps {
  /** Sidebar element (e.g. <AppSidebar />) */
  sidebar: React.ReactNode;
  /** Header element (e.g. <AppHeader />) */
  header: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
  /** Whether mobile menu is open */
  mobileMenuOpen?: boolean;
  /** Called when mobile menu open state changes */
  onMobileMenuOpenChange?: (open: boolean) => void;
  /** Label for the mobile menu sheet (accessibility) */
  mobileMenuLabel?: string;
  className?: string;
}

export function AppLayout({
  sidebar,
  header,
  children,
  mobileMenuOpen = false,
  onMobileMenuOpenChange,
  mobileMenuLabel = 'Menu de navegação',
  className,
}: AppLayoutProps) {
  return (
    <div className={cn('flex h-screen overflow-hidden', className)}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">{sidebar}</div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
            onClick={() => onMobileMenuOpenChange?.(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
            <div className="sr-only">{mobileMenuLabel}</div>
            {sidebar}
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {header}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
