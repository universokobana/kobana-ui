import * as React from 'react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { StateCombobox } from './state-combobox';
import { CityCombobox } from './city-combobox';

interface FieldNames {
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  state?: string;
  city?: string;
  cityIbgeCode?: string;
}

const defaultFieldNames: Required<FieldNames> = {
  zipCode: 'zipCode',
  street: 'street',
  number: 'number',
  complement: 'complement',
  neighborhood: 'neighborhood',
  state: 'state',
  city: 'city',
  cityIbgeCode: 'cityIbgeCode',
};

export interface AddressFormFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any; // UseFormReturn — kept as any to avoid requiring react-hook-form as dependency
  baseName?: string;
  disabled?: boolean;
  cepApiUrl?: string;
  citiesApiUrl?: string;
  fieldNames?: FieldNames;
  className?: string;
}

function formatCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return digits;
}

export function AddressFormFields({
  form,
  baseName,
  disabled = false,
  cepApiUrl = 'https://viacep.com.br/ws',
  citiesApiUrl,
  fieldNames: customFieldNames,
  className,
}: AddressFormFieldsProps) {
  const [cepLoading, setCepLoading] = React.useState(false);
  const names = { ...defaultFieldNames, ...customFieldNames };

  const fieldPath = (name: string) => (baseName ? `${baseName}.${name}` : name);

  const handleCepChange = async (cep: string) => {
    const digits = cep.replace(/\D/g, '');
    form.setValue(fieldPath(names.zipCode), formatCep(cep));

    if (digits.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`${cepApiUrl}/${digits}/json/`);
        const data = await res.json();
        if (!data.erro) {
          if (data.logradouro) form.setValue(fieldPath(names.street), data.logradouro);
          if (data.bairro) form.setValue(fieldPath(names.neighborhood), data.bairro);
          if (data.uf) form.setValue(fieldPath(names.state), data.uf);
          if (data.localidade) form.setValue(fieldPath(names.city), data.localidade);
          if (data.ibge) form.setValue(fieldPath(names.cityIbgeCode), data.ibge);
        }
      } catch {
        // CEP lookup failed — user fills manually
      } finally {
        setCepLoading(false);
      }
    }
  };

  const currentState = form.watch(fieldPath(names.state));

  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {/* CEP */}
      <FormField
        control={form.control}
        name={fieldPath(names.zipCode)}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  placeholder="00000-000"
                  disabled={disabled}
                  onChange={(e) => handleCepChange(e.target.value)}
                  maxLength={9}
                />
                {cepLoading && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">
                    ↻
                  </span>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Estado */}
      <FormField
        control={form.control}
        name={fieldPath(names.state)}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <StateCombobox
                value={field.value || ''}
                onChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Cidade */}
      <FormField
        control={form.control}
        name={fieldPath(names.city)}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <CityCombobox
                value={field.value || ''}
                onChange={(city, ibgeCode) => {
                  field.onChange(city);
                  if (ibgeCode) {
                    form.setValue(fieldPath(names.cityIbgeCode), ibgeCode);
                  }
                }}
                state={currentState || ''}
                citiesApiUrl={citiesApiUrl}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Rua */}
      <FormField
        control={form.control}
        name={fieldPath(names.street)}
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Rua</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Rua, Avenida, etc." disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Número */}
      <FormField
        control={form.control}
        name={fieldPath(names.number)}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nº" disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Complemento */}
      <FormField
        control={form.control}
        name={fieldPath(names.complement)}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Apto, Sala, etc." disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bairro */}
      <FormField
        control={form.control}
        name={fieldPath(names.neighborhood)}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Bairro" disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
