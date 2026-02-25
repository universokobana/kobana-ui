import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const variantStyles = {
  danger: {
    icon: '⚠',
    actionClass: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
  warning: {
    icon: '⚠',
    actionClass: 'bg-yellow-600 text-white hover:bg-yellow-600/90',
  },
  info: {
    icon: 'ℹ',
    actionClass: '',
  },
} as const;

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: 'danger' | 'warning' | 'info';
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      open,
      onOpenChange,
      variant = 'danger',
      title,
      description,
      confirmLabel = 'Confirmar',
      cancelLabel = 'Cancelar',
      onConfirm,
      isLoading = false,
      children,
      className,
    },
    ref,
  ) => {
    const [internalLoading, setInternalLoading] = React.useState(false);
    const loading = isLoading || internalLoading;
    const styles = variantStyles[variant];

    const handleConfirm = async () => {
      try {
        setInternalLoading(true);
        await onConfirm();
        onOpenChange?.(false);
      } catch {
        // Let the caller handle errors
      } finally {
        setInternalLoading(false);
      }
    };

    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
        <AlertDialogContent ref={ref} className={className}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <span aria-hidden="true">{styles.icon}</span>
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction
              className={cn(styles.actionClass)}
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
            >
              {loading ? '...' : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog';
