import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

export interface MultipleEmailsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name?: string;
  disabled?: boolean;
  className?: string;
  addLabel?: string;
  labelPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  firstLabelLocked?: boolean;
}

export const MultipleEmails = React.forwardRef<
  HTMLDivElement,
  MultipleEmailsProps
>(
  (
    {
      form,
      name = 'emails',
      disabled = false,
      className,
      addLabel = 'Adicionar e-mail',
      labelPlaceholder = 'Label',
      emailLabel = 'E-mail',
      emailPlaceholder,
      firstLabelLocked = true,
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
              name={`${name}.${index}.label`}
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel>{labelPlaceholder}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={disabled || (firstLabelLocked && index === 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${name}.${index}.address`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{emailLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={emailPlaceholder}
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
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
          onClick={() => append({ label: '', address: '' })}
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </Button>
      </div>
    );
  },
);

MultipleEmails.displayName = 'MultipleEmails';
