import * as React from 'react'
import { Button } from './button'
import { cn } from '@/lib/cn'

export interface EmptyStateProps {
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
  className?: string
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ 
    title, 
    description, 
    primaryAction, 
    secondaryAction, 
    icon,
    className,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-[hsl(var(--muted))] p-8 text-center',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex justify-center">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-black/60 mb-4">{description}</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    )
  }
)
EmptyState.displayName = 'EmptyState'
