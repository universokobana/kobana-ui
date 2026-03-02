'use client';

import * as React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OnboardingTask {
  id: string;
  icon: React.ReactNode;
  label: string;
  completed: boolean;
  href?: string;
  onClick?: () => void;
}

export interface OnboardingChecklistProps {
  title?: string;
  description?: string;
  tasks: OnboardingTask[];
  action?: {
    label: string;
    onClick: () => void;
  };
  footer?: React.ReactNode;
  className?: string;
}

export const OnboardingChecklist = React.forwardRef<
  HTMLDivElement,
  OnboardingChecklistProps
>(({ title, description, tasks, action, footer, className }, ref) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const allCompleted = completedCount === totalCount;

  return (
    <div
      ref={ref}
      className={cn('mx-auto flex w-full max-w-xl flex-col items-center', className)}
    >
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && (
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {completedCount} de {totalCount} concluídas
          </p>
        </div>
      )}

      <div className="w-full rounded-lg border">
        {tasks.map((task, index) => {
          const TaskWrapper = task.href ? 'a' : task.onClick ? 'button' : 'div';
          const isInteractive = !!task.href || !!task.onClick;

          return (
            <React.Fragment key={task.id}>
              {index > 0 && <div className="border-t" />}
              <TaskWrapper
                {...(task.href ? { href: task.href } : {})}
                {...(task.onClick && !task.href ? { onClick: task.onClick } : {})}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-3',
                  isInteractive &&
                    'cursor-pointer transition-colors hover:bg-muted/50',
                  task.completed && 'text-muted-foreground',
                )}
              >
                <span className="flex shrink-0 items-center text-muted-foreground">
                  {task.icon}
                </span>

                <span
                  className={cn(
                    'flex-1 text-left text-sm',
                    task.completed && 'line-through',
                  )}
                >
                  {task.label}
                </span>

                <span className="flex shrink-0 items-center">
                  {task.completed ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </span>
              </TaskWrapper>
            </React.Fragment>
          );
        })}
      </div>

      {action && allCompleted && (
        <button
          onClick={action.onClick}
          className="mt-4 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}

      {footer && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
});

OnboardingChecklist.displayName = 'OnboardingChecklist';
