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

export interface MultipleWebsitesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name?: string;
  disabled?: boolean;
  className?: string;
  addLabel?: string;
  labelPlaceholder?: string;
  urlLabel?: string;
  urlPlaceholder?: string;
}

export const MultipleWebsites = React.forwardRef<
  HTMLDivElement,
  MultipleWebsitesProps
>(
  (
    {
      form,
      name = 'websites',
      disabled = false,
      className,
      addLabel = 'Adicionar website',
      labelPlaceholder = 'Label',
      urlLabel = 'URL',
      urlPlaceholder = 'https://',
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
                    <Input {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${name}.${index}.url`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{urlLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder={urlPlaceholder}
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
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
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ label: '', url: '' })}
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </Button>
      </div>
    );
  },
);

MultipleWebsites.displayName = 'MultipleWebsites';
