'use client';

import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { cn } from '@/lib/utils';

export interface NumberInputProps
  extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
  value?: number;
  onValueChange?: (value: number) => void;
  /** Thousand separator character. Default: '.' */
  thousandSeparator?: string;
  /** Decimal separator character. Default: ',' */
  decimalSeparator?: string;
  /** Number of decimal places. Default: 0 */
  decimalScale?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      onValueChange,
      thousandSeparator = '.',
      decimalSeparator = ',',
      decimalScale = 0,
      ...props
    },
    ref,
  ) => {
    return (
      <NumericFormat
        getInputRef={ref}
        value={value}
        onValueChange={(values) => {
          onValueChange?.(values.floatValue ?? 0);
        }}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={decimalScale}
        allowNegative={false}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
