import { useState, useCallback, useMemo } from 'react';
import type { FilterConfig } from '@/components/kobana/composites/filter-bar/filter-bar-types';

export interface UseFiltersReturn {
  values: Record<string, unknown>;
  setFilter: (key: string, value: unknown) => void;
  clearAll: () => void;
  activeCount: number;
  toSearchParams: () => URLSearchParams;
  fromSearchParams: (params: URLSearchParams) => void;
}

export function useFilters(config: FilterConfig[]): UseFiltersReturn {
  const [values, setValues] = useState<Record<string, unknown>>({});

  const setFilter = useCallback((key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearAll = useCallback(() => {
    setValues({});
  }, []);

  const activeCount = useMemo(() => {
    return Object.entries(values).filter(
      ([, v]) => v !== undefined && v !== '' && v !== null && !(Array.isArray(v) && v.length === 0),
    ).length;
  }, [values]);

  const toSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined || value === '' || value === null) continue;
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(','));
      } else if (typeof value === 'object' && value !== null) {
        params.set(key, JSON.stringify(value));
      } else {
        params.set(key, String(value));
      }
    }
    return params;
  }, [values]);

  const fromSearchParams = useCallback(
    (params: URLSearchParams) => {
      const newValues: Record<string, unknown> = {};
      for (const filter of config) {
        const value = params.get(filter.key);
        if (value === null) continue;

        if (filter.type === 'multi-select') {
          newValues[filter.key] = value.split(',');
        } else if (filter.type === 'date-range') {
          try {
            newValues[filter.key] = JSON.parse(value);
          } catch {
            // ignore invalid JSON
          }
        } else {
          newValues[filter.key] = value;
        }
      }
      setValues(newValues);
    },
    [config],
  );

  return { values, setFilter, clearAll, activeCount, toSearchParams, fromSearchParams };
}
