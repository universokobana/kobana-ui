import * as React from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/kobana/composites/page-header';
import { ConfirmDialog } from '@/components/kobana/composites/confirm-dialog';
import { cn } from '@/lib/utils';

export interface FormPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  backHref?: string;
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isDirty?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormPage({
  title,
  description,
  breadcrumbs,
  backHref,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  isSubmitting = false,
  isDirty = false,
  children,
  className,
}: FormPageProps) {
  const [showLeaveDialog, setShowLeaveDialog] = React.useState(false);
  const [pendingNavigation, setPendingNavigation] = React.useState<(() => void) | null>(null);

  const handleCancel = () => {
    if (isDirty) {
      setPendingNavigation(() => onCancel || (() => {}));
      setShowLeaveDialog(true);
    } else {
      onCancel?.();
    }
  };

  const handleConfirmLeave = () => {
    pendingNavigation?.();
    setShowLeaveDialog(false);
    setPendingNavigation(null);
  };

  return (
    <div className={cn('space-y-6', className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        backHref={!isDirty ? backHref : undefined}
      />

      <div className="space-y-8">{children}</div>

      <FormPageActions
        onSubmit={onSubmit}
        onCancel={handleCancel}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        open={showLeaveDialog}
        onOpenChange={setShowLeaveDialog}
        variant="warning"
        title="Descartar alterações?"
        description="Você tem alterações não salvas. Deseja sair sem salvar?"
        confirmLabel="Sair sem salvar"
        cancelLabel="Continuar editando"
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}

interface FormPageActionsProps {
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  submitLabel: string;
  cancelLabel: string;
  isSubmitting: boolean;
}

function FormPageActions({
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  isSubmitting,
}: FormPageActionsProps) {
  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t bg-background px-6 py-4">
      {onCancel && (
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          {cancelLabel}
        </Button>
      )}
      <Button onClick={() => onSubmit()} disabled={isSubmitting}>
        {isSubmitting ? '...' : submitLabel}
      </Button>
    </div>
  );
}
