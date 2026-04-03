import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface ScopeContextValue<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  clear: () => void;
  isHydrated: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

const ScopeContext = React.createContext<ScopeContextValue<unknown> | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*  Provider                                                                  */
/* -------------------------------------------------------------------------- */

export interface ScopeProviderProps {
  storageKey: string;
  children: React.ReactNode;
}

export function ScopeProvider({ storageKey, children }: ScopeProviderProps) {
  const [value, setValueState] = React.useState<unknown>(null);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setValueState(JSON.parse(stored));
      }
    } catch {
      // ignore corrupt data
    }
    setIsHydrated(true);
  }, [storageKey]);

  const setValue = React.useCallback(
    (next: unknown) => {
      setValueState(next);
      try {
        if (next != null) {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch {
        // quota or private-mode — fail silently
      }
    },
    [storageKey],
  );

  const clear = React.useCallback(() => setValue(null), [setValue]);

  const ctx = React.useMemo<ScopeContextValue<unknown>>(
    () => ({
      value: isHydrated ? value : null,
      setValue,
      clear,
      isHydrated,
    }),
    [value, setValue, clear, isHydrated],
  );

  return <ScopeContext.Provider value={ctx}>{children}</ScopeContext.Provider>;
}

/* -------------------------------------------------------------------------- */
/*  Hook                                                                      */
/* -------------------------------------------------------------------------- */

const NOOP_CTX: ScopeContextValue<unknown> = {
  value: null,
  setValue: () => {},
  clear: () => {},
  isHydrated: true,
};

export function useScope<T = unknown>(): ScopeContextValue<T> {
  const ctx = React.useContext(ScopeContext);
  return (ctx ?? NOOP_CTX) as ScopeContextValue<T>;
}
