import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { AddressFormFields } from '@/components/kobana/composites/address-form-fields';
import type { AddressFormFieldsProps } from '@/components/kobana/composites/address-form-fields';

export interface MultipleAddressesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name?: string;
  disabled?: boolean;
  className?: string;
  addLabel?: string;
  labelPlaceholder?: string;
  emptyMessage?: string;
  addressFormFieldsProps?: Omit<
    AddressFormFieldsProps,
    'form' | 'baseName' | 'disabled'
  >;
}

export const MultipleAddresses = React.forwardRef<
  HTMLDivElement,
  MultipleAddressesProps
>(
  (
    {
      form,
      name = 'addresses',
      disabled = false,
      className,
      addLabel = 'Adicionar endereço',
      labelPlaceholder = 'Label (ex: Comercial, Entrega)',
      emptyMessage = 'Nenhum endereço adicional.',
      addressFormFieldsProps,
    },
    ref,
  ) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name,
    });

    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name={`${name}.${index}.label`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder={labelPlaceholder}
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AddressFormFields
              form={form}
              baseName={`${name}.${index}`}
              disabled={disabled}
              {...addressFormFieldsProps}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ label: '', country: 'BR' })}
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </Button>
      </div>
    );
  },
);

MultipleAddresses.displayName = 'MultipleAddresses';
