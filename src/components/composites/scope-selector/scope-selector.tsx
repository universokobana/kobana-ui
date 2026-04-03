import * as React from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface ScopeSelectorProps<T> {
  value: T | null;
  onChange: (value: T | null) => void;
  onSearch: (query: string) => Promise<T[]>;
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  icon?: React.ReactNode;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  clearLabel?: string;
  groupHeading?: string;
  align?: 'start' | 'center' | 'end';
  popoverWidth?: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function ScopeSelector<T>({
  value,
  onChange,
  onSearch,
  getItemValue,
  getItemLabel,
  renderItem,
  icon,
  placeholder = 'Filtrar...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Nenhum resultado encontrado.',
  loadingMessage = 'Carregando...',
  clearLabel = 'Limpar filtro',
  groupHeading,
  align = 'end',
  popoverWidth = 'w-[350px]',
  className,
}: ScopeSelectorProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const fetchItems = React.useCallback(
    async (search: string) => {
      setLoading(true);
      try {
        const results = await onSearch(search);
        setItems(results);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [onSearch],
  );

  React.useEffect(() => {
    if (open) fetchItems(query);
  }, [open, fetchItems, query]);

  const handleSelect = (item: T) => {
    onChange(item);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const defaultIcon = icon ?? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const listContent = (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder={searchPlaceholder}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {loading ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            <Loader2 className="mx-auto mb-2 h-4 w-4 animate-spin" />
            {loadingMessage}
          </div>
        ) : (
          <>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup heading={value ? undefined : groupHeading}>
              {items.map((item) => {
                const itemValue = getItemValue(item);
                const isSelected = value != null && getItemValue(value) === itemValue;
                return (
                  <CommandItem
                    key={itemValue}
                    value={itemValue}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {renderItem ? renderItem(item) : (
                      <span className="font-medium">{getItemLabel(item)}</span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );

  /* ---- Selected state: compact badge ---- */
  if (value) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-transparent bg-secondary px-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/80',
              className,
            )}
          >
            <span className="h-3.5 w-3.5 shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">{defaultIcon}</span>
            <span className="max-w-[120px] truncate">{getItemLabel(value)}</span>
            <span
              role="button"
              tabIndex={0}
              className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full p-0 hover:bg-destructive/20"
              onClick={handleClear}
              onKeyDown={(e) => e.key === 'Enter' && handleClear(e)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">{clearLabel}</span>
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className={cn(popoverWidth, 'p-0')} align={align}>
          {listContent}
        </PopoverContent>
      </Popover>
    );
  }

  /* ---- Empty state: icon button ---- */
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-9 w-9', className)}
          title={placeholder}
        >
          {defaultIcon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(popoverWidth, 'p-0')} align={align}>
        {listContent}
      </PopoverContent>
    </Popover>
  );
}
