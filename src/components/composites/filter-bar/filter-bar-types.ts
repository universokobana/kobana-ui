import type { ReactNode } from 'react';

export type FilterType = 'text' | 'select' | 'multi-select' | 'date-range' | 'custom';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  placeholder?: string;
  component?: ReactNode;
}

export interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  onClear?: () => void;
  className?: string;
}
