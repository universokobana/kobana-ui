import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface QuickOption {
  key: string;
  label: string;
  getRange: () => { start: string; end: string };
}

export interface DateRangePickerLabels {
  quickSelection?: string;
  customPeriod?: string;
  startDate?: string;
  endDate?: string;
  apply?: string;
  clear?: string;
  allTime?: string;
  from?: string;
  until?: string;
}

export interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onDateChange: (startDate: string, endDate: string) => void;
  quickOptions?: QuickOption[];
  labels?: DateRangePickerLabels;
  formatDate?: (dateStr: string) => string;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Defaults                                                                  */
/* -------------------------------------------------------------------------- */

const defaultLabels: Required<DateRangePickerLabels> = {
  quickSelection: 'Seleção Rápida',
  customPeriod: 'Período Personalizado',
  startDate: 'Data Inicial',
  endDate: 'Data Final',
  apply: 'Aplicar',
  clear: 'Limpar',
  allTime: 'Todo o Período',
  from: 'De',
  until: 'Até',
};

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function daysAgo(n: number): { start: string; end: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - n);
  return { start: toISODate(start), end: toISODate(today) };
}

const defaultQuickOptions: QuickOption[] = [
  {
    key: 'today',
    label: 'Hoje',
    getRange: () => daysAgo(0),
  },
  {
    key: 'yesterday',
    label: 'Ontem',
    getRange: () => {
      const d = daysAgo(1);
      return { start: d.start, end: d.start };
    },
  },
  {
    key: 'last7Days',
    label: 'Últimos 7 dias',
    getRange: () => daysAgo(6),
  },
  {
    key: 'last30Days',
    label: 'Últimos 30 dias',
    getRange: () => daysAgo(29),
  },
  {
    key: 'last90Days',
    label: 'Últimos 90 dias',
    getRange: () => daysAgo(89),
  },
  {
    key: 'allTime',
    label: 'Todo o Período',
    getRange: () => ({ start: '', end: '' }),
  },
];

function defaultFormatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      startDate: controlledStart = '',
      endDate: controlledEnd = '',
      onDateChange,
      quickOptions = defaultQuickOptions,
      labels: labelsProp,
      formatDate = defaultFormatDate,
      align = 'end',
      className,
    },
    ref,
  ) => {
    const labels = { ...defaultLabels, ...labelsProp };

    const [open, setOpen] = React.useState(false);
    const [localStart, setLocalStart] = React.useState(controlledStart);
    const [localEnd, setLocalEnd] = React.useState(controlledEnd);
    const [selectedQuick, setSelectedQuick] = React.useState<string | null>(
      !controlledStart && !controlledEnd ? 'allTime' : null,
    );

    React.useEffect(() => {
      setLocalStart(controlledStart);
      setLocalEnd(controlledEnd);
    }, [controlledStart, controlledEnd]);

    const hasFilter = controlledStart || controlledEnd;

    const handleQuickSelect = (option: QuickOption) => {
      setSelectedQuick(option.key);
      const { start, end } = option.getRange();
      setLocalStart(start);
      setLocalEnd(end);
      onDateChange(start, end);
      setOpen(false);
    };

    const applyCustom = () => {
      onDateChange(localStart, localEnd);
      setOpen(false);
    };

    const clear = () => {
      setLocalStart('');
      setLocalEnd('');
      setSelectedQuick(null);
      onDateChange('', '');
      setOpen(false);
    };

    const buttonLabel = (() => {
      if (controlledStart && controlledEnd) {
        return `${formatDate(controlledStart)} - ${formatDate(controlledEnd)}`;
      }
      if (controlledStart) return `${labels.from} ${formatDate(controlledStart)}`;
      if (controlledEnd) return `${labels.until} ${formatDate(controlledEnd)}`;
      return labels.allTime;
    })();

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              hasFilter && 'border-primary text-primary',
              className,
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {buttonLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <div className="flex">
            {/* Quick Selection */}
            <div className="border-r p-4">
              <p className="mb-3 whitespace-nowrap text-sm font-medium text-muted-foreground">
                {labels.quickSelection}
              </p>
              <div className="flex flex-col gap-1">
                {quickOptions.map((option) => (
                  <Button
                    key={option.key}
                    variant={selectedQuick === option.key ? 'secondary' : 'ghost'}
                    className="justify-start whitespace-nowrap"
                    onClick={() => handleQuickSelect(option)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Period */}
            <div className="p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {labels.customPeriod}
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drp-start">{labels.startDate}</Label>
                  <Input
                    id="drp-start"
                    type="date"
                    value={localStart}
                    onChange={(e) => {
                      setLocalStart(e.target.value);
                      setSelectedQuick(null);
                    }}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drp-end">{labels.endDate}</Label>
                  <Input
                    id="drp-end"
                    type="date"
                    value={localEnd}
                    onChange={(e) => {
                      setLocalEnd(e.target.value);
                      setSelectedQuick(null);
                    }}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  {hasFilter && (
                    <Button variant="outline" className="flex-1" onClick={clear}>
                      {labels.clear}
                    </Button>
                  )}
                  <Button onClick={applyCustom} className="flex-1">
                    {labels.apply}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
