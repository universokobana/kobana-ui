import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

export interface PhoneTypeOption {
  value: string;
  label: string;
}

export interface MultiplePhonesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name?: string;
  disabled?: boolean;
  className?: string;
  addLabel?: string;
  typeLabel?: string;
  areaCodeLabel?: string;
  numberLabel?: string;
  phoneTypes?: PhoneTypeOption[];
  defaultType?: string;
  defaultCountryCode?: string;
}

const defaultPhoneTypes: PhoneTypeOption[] = [
  { value: 'mobile', label: 'Celular' },
  { value: 'landline', label: 'Fixo' },
];

export const MultiplePhones = React.forwardRef<
  HTMLDivElement,
  MultiplePhonesProps
>(
  (
    {
      form,
      name = 'phones',
      disabled = false,
      className,
      addLabel = 'Adicionar telefone',
      typeLabel = 'Tipo',
      areaCodeLabel = 'DDD',
      numberLabel = 'Número',
      phoneTypes = defaultPhoneTypes,
      defaultType = 'mobile',
      defaultCountryCode = '55',
    },
    ref,
  ) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name,
    });

    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-4">
            <FormField
              control={form.control}
              name={`${name}.${index}.type`}
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel>{typeLabel}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {phoneTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${name}.${index}.areaCode`}
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormLabel>{areaCodeLabel}</FormLabel>
                  <FormControl>
                    <Input maxLength={2} {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${name}.${index}.number`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{numberLabel}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              label: '',
              type: defaultType,
              countryCode: defaultCountryCode,
            })
          }
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </Button>
      </div>
    );
  },
);

MultiplePhones.displayName = 'MultiplePhones';
