import * as React from 'react'
import { Button } from './button'
import { cn } from '@/lib/cn'

export interface ErrorStateProps {
  title: string
  description: string
  errorId?: string
  onRetry?: () => void
  onContactSupport?: () => void
  icon?: React.ReactNode
  className?: string
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ 
    title, 
    description, 
    errorId,
    onRetry,
    onContactSupport,
    icon,
    className,
    ...props 
  }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copyErrorId = async () => {
      if (errorId) {
        try {
          await navigator.clipboard.writeText(errorId)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to copy error ID:', err)
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-danger/20 bg-danger/5 p-8 text-center',
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {icon && (
          <div className="mb-4 flex justify-center text-danger">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2 text-danger">{title}</h3>
        <p className="text-sm text-muted mb-4">{description}</p>
        
        {errorId && (
          <div className="mb-4">
            <p className="text-xs text-muted mb-2">Error ID for support:</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                {errorId}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyErrorId}
                className="h-6 px-2 text-xs"
                aria-label={copied ? 'Copied!' : 'Copy error ID'}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              Try Again
            </Button>
          )}
          {onContactSupport && (
            <Button variant="secondary" onClick={onContactSupport}>
              Contact Support
            </Button>
          )}
        </div>
      </div>
    )
  }
)
ErrorState.displayName = 'ErrorState'
