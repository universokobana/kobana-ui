import * as React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import type { FilterBarProps, FilterConfig, FilterOption } from './filter-bar-types';

export type { FilterBarProps, FilterConfig, FilterOption };
export type { FilterType } from './filter-bar-types';

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ filters, values, onChange, onClear, className }, ref) => {
    const activeCount = Object.entries(values).filter(
      ([, v]) => v !== undefined && v !== '' && v !== null && !(Array.isArray(v) && v.length === 0),
    ).length;

    const handleChange = (key: string, value: unknown) => {
      onChange({ ...values, [key]: value });
    };

    return (
      <div ref={ref} className={cn('flex flex-wrap items-center gap-2', className)}>
        {filters.map((filter) => (
          <FilterField
            key={filter.key}
            filter={filter}
            value={values[filter.key]}
            onChange={(value) => handleChange(filter.key, value)}
          />
        ))}
        {activeCount > 0 && onClear && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Limpar filtros
            <Badge variant="secondary" className="ml-1">
              {activeCount}
            </Badge>
          </Button>
        )}
      </div>
    );
  },
);

FilterBar.displayName = 'FilterBar';

interface FilterFieldProps {
  filter: FilterConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

function FilterField({ filter, value, onChange }: FilterFieldProps) {
  switch (filter.type) {
    case 'text':
      return (
        <Input
          placeholder={filter.placeholder || filter.label}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-[200px]"
        />
      );

    case 'select':
      return (
        <Select
          value={(value as string) || ''}
          onValueChange={(v) => onChange(v || undefined)}
        >
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue placeholder={filter.placeholder || filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'multi-select':
      return <MultiSelectFilter filter={filter} value={value} onChange={onChange} />;

    case 'date-range':
      return <DateRangeFilter filter={filter} value={value} onChange={onChange} />;

    case 'custom':
      return <>{filter.component}</>;

    default:
      return null;
  }
}

function MultiSelectFilter({ filter, value, onChange }: FilterFieldProps) {
  const selectedValues = (value as string[]) || [];

  const toggleValue = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];
    onChange(newValues.length > 0 ? newValues : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          {filter.label}
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedValues.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2" align="start">
        <div className="space-y-1">
          {filter.options?.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => toggleValue(option.value)}
                className="rounded border-input"
              />
              {option.label}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DateRangeFilter({ filter, value, onChange }: FilterFieldProps) {
  const dateRange = value as { from?: Date; to?: Date } | undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          {filter.label}
          {dateRange?.from && (
            <Badge variant="secondary" className="ml-1">
              1
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange as { from: Date; to?: Date }}
          onSelect={(range) => onChange(range || undefined)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
