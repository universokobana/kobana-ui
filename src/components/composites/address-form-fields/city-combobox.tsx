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

interface City {
  name: string;
  ibgeCode?: string;
}

interface CityComboboxProps {
  value: string;
  onChange: (value: string, ibgeCode?: string) => void;
  state: string;
  citiesApiUrl?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function CityCombobox({
  value,
  onChange,
  state,
  citiesApiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  disabled,
  placeholder = 'Selecione a cidade',
  className,
}: CityComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = React.useState<City[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!state) {
      setCities([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`${citiesApiUrl}/${state}/municipios?orderBy=nome`)
      .then((res) => res.json())
      .then((data: Array<{ nome: string; id: number }>) => {
        if (!cancelled) {
          setCities(data.map((c) => ({ name: c.nome, ibgeCode: String(c.id) })));
        }
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [state, citiesApiUrl]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || !state}
          className={cn('w-full justify-between font-normal', className)}
        >
          {value || placeholder}
          {loading && <span className="ml-2 animate-spin">↻</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cidade..." />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.ibgeCode || city.name}
                  value={city.name}
                  onSelect={() => {
                    onChange(city.name, city.ibgeCode);
                    setOpen(false);
                  }}
                >
                  <span className={cn(value === city.name && 'font-bold')}>
                    {city.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
