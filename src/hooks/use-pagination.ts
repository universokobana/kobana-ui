import { useState, useCallback, useMemo } from 'react';

export interface UsePaginationOptions {
  defaultPage?: number;
  defaultPerPage?: number;
}

export interface UsePaginationReturn {
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  offset: number;
}

export function usePagination(options?: UsePaginationOptions): UsePaginationReturn {
  const [page, setPageState] = useState(options?.defaultPage ?? 1);
  const [perPage, setPerPageState] = useState(options?.defaultPerPage ?? 20);

  const setPage = useCallback((newPage: number) => {
    setPageState(Math.max(1, newPage));
  }, []);

  const setPerPage = useCallback((newPerPage: number) => {
    setPerPageState(newPerPage);
    setPageState(1); // Reset to first page when changing page size
  }, []);

  const offset = useMemo(() => (page - 1) * perPage, [page, perPage]);

  return { page, perPage, setPage, setPerPage, offset };
}
