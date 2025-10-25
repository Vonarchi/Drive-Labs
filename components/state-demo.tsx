import * as React from 'react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  EmptyState,
  LoadingState,
  ErrorState
} from './ui'

export function StateDemo() {
  const [isDark, setIsDark] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('empty')
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const simulateError = () => {
    setHasError(true)
    setTimeout(() => {
      setHasError(false)
    }, 5000)
  }

  const retryAction = () => {
    setHasError(false)
    console.log('Retrying...')
  }

  const contactSupport = () => {
    console.log('Contacting support...')
  }

  const createProject = () => {
    console.log('Creating new project...')
  }

  const learnMore = () => {
    console.log('Learning more...')
  }

  // Icons for demonstration
  const ProjectIcon = () => (
    <svg className="h-12 w-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  )

  const ErrorIcon = () => (
    <svg className="h-12 w-12 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-bg text-fg p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">State Patterns Demo</h1>
            <p className="text-muted text-lg mt-2">Empty, Loading, and Error state components</p>
          </div>
          <Button onClick={toggleDarkMode} variant="secondary">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>State Controls</CardTitle>
            <CardDescription>Test different state patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={simulateLoading} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Simulate Loading'}
              </Button>
              <Button onClick={simulateError} variant="secondary">
                Simulate Error
              </Button>
              <Button onClick={() => setActiveTab('empty')} variant="ghost">
                Show Empty State
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* State Examples */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="empty">Empty</TabsTrigger>
            <TabsTrigger value="loading">Loading</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
          </TabsList>

          {/* Empty State Tab */}
          <TabsContent value="empty" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Empty State Examples</CardTitle>
                  <CardDescription>Friendly messages with clear actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Empty State */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Basic Empty State</h4>
                    <EmptyState
                      title="No projects yet"
                      description="Create your first project to get started with Drive Labs."
                      primaryAction={{
                        label: "New Project",
                        onClick: createProject
                      }}
                      secondaryAction={{
                        label: "Learn More",
                        onClick: learnMore
                      }}
                      icon={<ProjectIcon />}
                    />
                  </div>

                  {/* Empty State with Icon */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">With Custom Icon</h4>
                    <EmptyState
                      title="No data available"
                      description="There's nothing to show here yet. Try adjusting your filters or add some content."
                      primaryAction={{
                        label: "Add Content",
                        onClick: createProject
                      }}
                      icon={
                        <svg className="h-12 w-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Minimal Empty State */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Minimal Empty State</h4>
                    <EmptyState
                      title="Nothing here"
                      description="This section is empty."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loading State Tab */}
          <TabsContent value="loading" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loading State Examples</CardTitle>
                  <CardDescription>Page-level skeletons matching final layout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Page Loading */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Page Loading (3-5 skeletons)</h4>
                    <LoadingState variant="page" count={3} />
                  </div>

                  {/* Card Loading */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Card Loading</h4>
                    <LoadingState variant="card" />
                  </div>

                  {/* List Loading */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">List Loading</h4>
                    <LoadingState variant="list" count={4} />
                  </div>

                  {/* Table Loading */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Table Loading</h4>
                    <LoadingState variant="table" count={5} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Error State Tab */}
          <TabsContent value="error" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Error State Examples</CardTitle>
                  <CardDescription>Plain language with retry and support options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Error */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Basic Error</h4>
                    <ErrorState
                      title="Something went wrong"
                      description="We couldn't load your projects. Please try again."
                      onRetry={retryAction}
                    />
                  </div>

                  {/* Error with ID */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Error with Support ID</h4>
                    <ErrorState
                      title="Failed to save changes"
                      description="Your changes couldn't be saved. Please try again or contact support if the problem persists."
                      errorId="ERR-2024-001"
                      onRetry={retryAction}
                      onContactSupport={contactSupport}
                      icon={<ErrorIcon />}
                    />
                  </div>

                  {/* Network Error */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Network Error</h4>
                    <ErrorState
                      title="Connection lost"
                      description="Check your internet connection and try again."
                      errorId="NET-ERR-001"
                      onRetry={retryAction}
                      onContactSupport={contactSupport}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Variants Tab */}
          <TabsContent value="variants" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>State Variants</CardTitle>
                  <CardDescription>Different contexts and use cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Different Empty States */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Empty States by Context</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <EmptyState
                        title="No search results"
                        description="Try adjusting your search terms or filters."
                        primaryAction={{
                          label: "Clear Filters",
                          onClick: () => console.log('Clear filters')
                        }}
                      />
                      <EmptyState
                        title="No notifications"
                        description="You're all caught up! Check back later for updates."
                      />
                    </div>
                  </div>

                  {/* Different Loading States */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Loading States by Context</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-2">Dashboard Loading</h5>
                        <LoadingState variant="page" count={2} />
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-2">Settings Loading</h5>
                        <LoadingState variant="list" count={3} />
                      </div>
                    </div>
                  </div>

                  {/* Different Error States */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Error States by Context</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ErrorState
                        title="Permission denied"
                        description="You don't have access to this resource."
                        onContactSupport={contactSupport}
                      />
                      <ErrorState
                        title="Service unavailable"
                        description="The service is temporarily down for maintenance."
                        errorId="MAINT-001"
                        onRetry={retryAction}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Live Demo */}
        {(isLoading || hasError) && (
          <Card>
            <CardHeader>
              <CardTitle>Live State Demo</CardTitle>
              <CardDescription>Currently showing a live state</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <LoadingState variant="page" count={2} />
              )}
              {hasError && (
                <ErrorState
                  title="Demo error occurred"
                  description="This is a simulated error for demonstration purposes."
                  errorId="DEMO-ERR-001"
                  onRetry={() => setHasError(false)}
                  onContactSupport={contactSupport}
                  icon={<ErrorIcon />}
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
