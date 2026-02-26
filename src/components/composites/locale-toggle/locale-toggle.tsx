'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface LocaleOption {
  value: string;
  label: string;
}

export interface LocaleToggleProps {
  /** Current active locale */
  locale: string;
  /** Available locales */
  locales?: LocaleOption[];
  /** Called when locale changes */
  onLocaleChange: (locale: string) => void;
  /** Screen reader label */
  srLabel?: string;
  className?: string;
}

const defaultLocales: LocaleOption[] = [
  { value: 'pt-BR', label: 'Português (BR)' },
  { value: 'en', label: 'English' },
];

export function LocaleToggle({
  locale,
  locales = defaultLocales,
  onLocaleChange,
  srLabel = 'Alterar idioma',
  className,
}: LocaleToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('h-9 w-9', className)}>
          <Globe className="h-4 w-4" />
          <span className="sr-only">{srLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem key={l.value} onClick={() => onLocaleChange(l.value)}>
            {l.label} {locale === l.value && '✓'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
