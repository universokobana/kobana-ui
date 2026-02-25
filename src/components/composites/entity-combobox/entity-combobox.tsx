import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export interface EntityComboboxProps<T> {
  value: string;
  onChange: (value: string, entity?: T) => void;
  onSearch: (query: string) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  renderSelected?: (item: T) => React.ReactNode;
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function EntityCombobox<T>({
  value,
  onChange,
  onSearch,
  renderItem,
  renderSelected,
  getItemValue,
  getItemLabel,
  placeholder = 'Selecionar...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Nenhum resultado encontrado.',
  disabled,
  className,
}: EntityComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState<T | null>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = React.useCallback(
    (query: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await onSearch(query);
          setItems(results);
        } catch {
          setItems([]);
        } finally {
          setLoading(false);
        }
      }, 300);
    },
    [onSearch],
  );

  React.useEffect(() => {
    if (open) {
      handleSearch('');
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [open, handleSearch]);

  const displayLabel = selectedEntity
    ? (renderSelected ? renderSelected(selectedEntity) : getItemLabel(selectedEntity))
    : value || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('w-full justify-between font-normal', className)}
        >
          <span className="truncate">{displayLabel as React.ReactNode}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={handleSearch}
          />
          <CommandList>
            {loading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Carregando...
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => {
                    const itemValue = getItemValue(item);
                    return (
                      <CommandItem
                        key={itemValue}
                        value={itemValue}
                        onSelect={() => {
                          onChange(itemValue, item);
                          setSelectedEntity(item);
                          setOpen(false);
                        }}
                      >
                        {renderItem(item)}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
