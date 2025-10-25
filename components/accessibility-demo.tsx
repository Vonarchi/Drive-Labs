import * as React from 'react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Button,
  Input,
  Label,
  Textarea,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  EmptyState,
  LoadingState,
  ErrorState
} from './ui'

export function AccessibilityDemo() {
  const [isDark, setIsDark] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
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
            <h1 className="text-4xl font-bold">Accessibility Demo</h1>
            <p className="text-muted text-lg mt-2">WCAG 2.1 AA compliant components</p>
          </div>
          <Button onClick={toggleDarkMode} variant="secondary">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        {/* Accessibility Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contrast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">4.5:1 minimum for text</p>
              <p className="text-sm text-fg-high-contrast font-medium">High contrast text</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Tab to focus</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">44×44px min</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Keyboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">Tab, Enter, Escape</p>
            </CardContent>
          </Card>
        </div>

        {/* Form with Proper Labels */}
        <Card>
          <CardHeader>
            <CardTitle>Accessible Form</CardTitle>
            <CardDescription>Proper label associations and keyboard navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Enter your full name"
                  required
                  aria-describedby="name-help"
                />
                <p id="name-help" className="text-sm text-muted">
                  This will be displayed on your profile
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email"
                  required
                  aria-describedby="email-help"
                />
                <p id="email-help" className="text-sm text-muted">
                  We'll never share your email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  placeholder="Enter your message"
                  rows={4}
                  aria-describedby="message-help"
                />
                <p id="message-help" className="text-sm text-muted">
                  Maximum 500 characters
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Submit Form</Button>
                <Button type="button" variant="secondary">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Interactive Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dialog Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog with Focus Trap</CardTitle>
              <CardDescription>Escape closes, focus trapped inside</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Accessible Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog has proper focus management and keyboard navigation.
                      Press Escape to close or Tab to navigate.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dialog-input">Dialog Input</Label>
                      <Input id="dialog-input" placeholder="Type something..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="secondary">Cancel</Button>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Sheet Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Sheet with Focus Trap</CardTitle>
              <CardDescription>Escape closes, focus trapped inside</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Accessible Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet has proper focus management and keyboard navigation.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="sheet-input">Sheet Input</Label>
                      <Input id="sheet-input" placeholder="Type something..." />
                    </div>
                    <Button className="w-full">Action Button</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Accessible Tabs</CardTitle>
            <CardDescription>Keyboard navigation with arrow keys</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tab 1 Content</h3>
                  <p className="text-muted">This is the first tab content. Use Tab to navigate between tabs.</p>
                  <Button>Action in Tab 1</Button>
                </div>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tab 2 Content</h3>
                  <p className="text-muted">This is the second tab content.</p>
                  <Button variant="secondary">Action in Tab 2</Button>
                </div>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tab 3 Content</h3>
                  <p className="text-muted">This is the third tab content.</p>
                  <Button variant="ghost">Action in Tab 3</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* State Patterns with Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Empty State</CardTitle>
              <CardDescription>role="status" for screen readers</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="No data yet"
                description="Create your first item to get started."
                primaryAction={{
                  label: "Create Item",
                  onClick: () => console.log('Create item')
                }}
                icon={<ProjectIcon />}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading State</CardTitle>
              <CardDescription>role="status" with aria-label</CardDescription>
            </CardHeader>
            <CardContent>
              <LoadingState variant="card" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error State</CardTitle>
              <CardDescription>role="alert" for immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorState
                title="Something went wrong"
                description="Please try again or contact support."
                errorId="ERR-001"
                onRetry={() => console.log('Retry')}
                icon={<ErrorIcon />}
              />
            </CardContent>
          </Card>
        </div>

        {/* Live Demo Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Live Accessibility Demo</CardTitle>
            <CardDescription>Test different states and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={simulateLoading} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Simulate Loading'}
              </Button>
              <Button onClick={simulateError} variant="secondary">
                Simulate Error
              </Button>
              <Button onClick={() => setHasError(false)} variant="ghost">
                Clear Error
              </Button>
            </div>

            {(isLoading || hasError) && (
              <div className="mt-6">
                {isLoading && (
                  <LoadingState variant="page" count={2} />
                )}
                {hasError && (
                  <ErrorState
                    title="Demo error occurred"
                    description="This is a simulated error for demonstration purposes."
                    errorId="DEMO-ERR-001"
                    onRetry={() => setHasError(false)}
                    onContactSupport={() => console.log('Contact support')}
                    icon={<ErrorIcon />}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Accessibility Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Checklist</CardTitle>
            <CardDescription>WCAG 2.1 AA compliance features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Visual</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Minimum 4.5:1 contrast ratio
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Focus rings always visible
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    High contrast text variants
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Interaction</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    44×44px minimum touch targets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Keyboard navigation support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Focus trapping in modals
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Semantic</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Proper ARIA roles and labels
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Label associations with inputs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Screen reader announcements
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Escape closes modals/sheets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Tab order is logical
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Skip links for long content
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
