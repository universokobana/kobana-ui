import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface CurrencyInputProps {
  value: number; // in cents
  onChange: (value: number) => void;
  currency?: string;
  locale?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

function formatCurrency(cents: number, locale: string, currency: string): string {
  const amount = cents / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function parseCurrencyInput(raw: string): number {
  // Remove everything except digits
  const digits = raw.replace(/\D/g, '');
  return parseInt(digits || '0', 10);
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, currency = 'BRL', locale = 'pt-BR', disabled, className, name, id }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() =>
      formatCurrency(value, locale, currency),
    );

    React.useEffect(() => {
      setDisplayValue(formatCurrency(value, locale, currency));
    }, [value, locale, currency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const cents = parseCurrencyInput(raw);
      onChange(cents);
      setDisplayValue(formatCurrency(cents, locale, currency));
    };

    const handleFocus = () => {
      if (value === 0) {
        setDisplayValue('');
      }
    };

    const handleBlur = () => {
      setDisplayValue(formatCurrency(value, locale, currency));
    };

    return (
      <Input
        ref={ref}
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={cn('text-right', className)}
        inputMode="numeric"
      />
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';
