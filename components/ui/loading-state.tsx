import * as React from 'react'
import { Skeleton } from './skeleton'
import { cn } from '@/lib/cn'

export interface LoadingStateProps {
  variant?: 'page' | 'card' | 'list' | 'table'
  count?: number
  className?: string
}

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ variant = 'page', count = 3, className, ...props }, ref) => {
    const renderPageSkeleton = () => (
      <div className="space-y-6" role="status" aria-label="Loading content">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-muted p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )

    const renderCardSkeleton = () => (
      <div className="rounded-xl border bg-muted p-6 space-y-4" role="status" aria-label="Loading card">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    )

    const renderListSkeleton = () => (
      <div className="space-y-3" role="status" aria-label="Loading list">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    )

    const renderTableSkeleton = () => (
      <div className="space-y-3" role="status" aria-label="Loading table">
        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Table rows */}
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    )

    const renderSkeleton = () => {
      switch (variant) {
        case 'page':
          return renderPageSkeleton()
        case 'card':
          return renderCardSkeleton()
        case 'list':
          return renderListSkeleton()
        case 'table':
          return renderTableSkeleton()
        default:
          return renderPageSkeleton()
      }
    }

    return (
      <div
        ref={ref}
        className={cn('animate-pulse', className)}
        {...props}
      >
        {renderSkeleton()}
      </div>
    )
  }
)
LoadingState.displayName = 'LoadingState'
