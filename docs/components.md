# UI Components

This document describes the shadcn-style UI components built with the Drive Labs design system.

## Usage Rules

### Button Variants
- **Primary**: Main calls, one per view - use for the primary action
- **Secondary**: Neutral actions - use for secondary or alternative actions  
- **Ghost**: Tertiary/toolbar - use for subtle actions or toolbar buttons

### Accessibility
- Keep labels ≤ 24 characters for better readability
- Always include `aria-label` when using icon-only buttons
- Use semantic HTML elements and proper ARIA attributes

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui'

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// As child element
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `asChild`: `boolean` - Render as child element using Radix Slot

### Card

A flexible card component with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input

A styled input field component.

```tsx
import { Input } from '@/components/ui'

<Input type="email" placeholder="Enter your email" />
<Input disabled placeholder="Disabled input" />
```

### Badge

A small status indicator component.

```tsx
import { Badge } from '@/components/ui'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="outline">Outline</Badge>
```

**Props:**
- `variant`: `'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'`

### Label

A form label component.

```tsx
import { Label } from '@/components/ui'

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Textarea

A styled textarea component.

```tsx
import { Textarea } from '@/components/ui'

<Textarea placeholder="Enter your message" />
<Textarea disabled placeholder="Disabled textarea" />
```

### Alert

A notification component for displaying important messages.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui'

<Alert>
  <AlertTitle>Default Alert</AlertTitle>
  <AlertDescription>This is a default alert message.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed successfully.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please review your input.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

**Props:**
- `variant`: `'default' | 'destructive' | 'success' | 'warning'`

### Tabs

A tabbed interface component for organizing content.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'

<Tabs defaultValue="overview" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <div>Overview content</div>
  </TabsContent>
  <TabsContent value="analytics">
    <div>Analytics content</div>
  </TabsContent>
  <TabsContent value="reports">
    <div>Reports content</div>
  </TabsContent>
</Tabs>
```

### Dialog

A modal dialog component for important actions and confirmations.

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your project.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Sheet

A slide-out panel component for additional content and settings.

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>
        Configure your project settings and preferences.
      </SheetDescription>
    </SheetHeader>
    <div className="space-y-4 py-4">
      {/* Your content */}
    </div>
    <SheetFooter>
      <Button>Save Changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Props:**
- `side`: `'top' | 'bottom' | 'left' | 'right'` - Sheet position

### Skeleton

A loading placeholder component for better user experience.

```tsx
import { Skeleton } from '@/components/ui'

// Basic skeleton
<Skeleton className="h-4 w-[250px]" />

// Card skeleton
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>
```

## State Patterns

### Empty State

A friendly component for when there's no content to display.

```tsx
import { EmptyState } from '@/components/ui'

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
```

**Props:**
- `title`: `string` - Friendly headline (≤ 24 chars)
- `description`: `string` - 1-2 line explanation
- `primaryAction`: `{ label: string, onClick: () => void }` - Main CTA
- `secondaryAction`: `{ label: string, onClick: () => void }` - Secondary action
- `icon`: `React.ReactNode` - Optional icon

### Loading State

Page-level skeletons matching final layout proportions.

```tsx
import { LoadingState } from '@/components/ui'

// Page loading (3-5 skeletons)
<LoadingState variant="page" count={3} />

// Card loading
<LoadingState variant="card" />

// List loading
<LoadingState variant="list" count={4} />

// Table loading
<LoadingState variant="table" count={5} />
```

**Props:**
- `variant`: `'page' | 'card' | 'list' | 'table'` - Layout type
- `count`: `number` - Number of skeleton items (default: 3)

**Accessibility:**
- `role="status"` for loading states
- `aria-label="Loading content"` for screen readers

### Error State

Plain language error messages with retry and support options.

```tsx
import { ErrorState } from '@/components/ui'

<ErrorState
  title="Something went wrong"
  description="We couldn't load your projects. Please try again."
  errorId="ERR-2024-001"
  onRetry={retryAction}
  onContactSupport={contactSupport}
  icon={<ErrorIcon />}
/>
```

**Props:**
- `title`: `string` - Plain language error title
- `description`: `string` - Clear explanation of what happened
- `errorId`: `string` - Copyable error ID for support
- `onRetry`: `() => void` - Retry action
- `onContactSupport`: `() => void` - Contact support action
- `icon`: `React.ReactNode` - Optional error icon

**Accessibility:**
- `role="alert"` for error states
- `aria-live="polite"` for dynamic updates
- Copyable error ID with keyboard support

### State Pattern Best Practices

**Empty States:**
- Use friendly, encouraging language
- Provide clear next steps with primary actions
- Include helpful secondary actions when appropriate
- Keep titles ≤ 24 characters for readability

**Loading States:**
- Match the final layout proportions (3-5 skeletons)
- Use `role="status"` for screen readers
- Provide meaningful `aria-label` descriptions
- Show progress indicators for long operations

**Error States:**
- Use plain language, avoid technical jargon
- Provide specific, actionable error messages
- Include copyable error IDs for support
- Offer retry and support contact options
- Use `role="alert"` for immediate attention

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Use proper focus management for modals and overlays
- Provide skip links for long loading states
- Ensure error states are announced to screen readers

## Accessibility Compliance

### WCAG 2.1 AA Standards

**Visual Contrast:**
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text and UI controls
- High contrast variants available for enhanced accessibility
- Color is never the only means of conveying information

**Focus Management:**
- Focus rings always visible with `focus-visible:shadow-focus`
- Logical tab order for all interactive elements
- Focus trapping within modals and sheets
- Escape key closes dialogs and sheets

**Touch Targets:**
- Minimum 44×44px for all interactive elements
- Adequate spacing between touch targets
- Touch-friendly button sizes and spacing

**Keyboard Navigation:**
- All components are keyboard accessible
- Tab, Enter, Space, and Arrow key support
- Escape key closes modals and sheets
- Focus management for complex interactions

**Screen Reader Support:**
- Proper ARIA roles and labels
- `role="status"` for loading states
- `role="alert"` for error states
- `aria-live="polite"` for dynamic updates
- Label associations with form inputs

**Semantic HTML:**
- Proper heading hierarchy
- Form labels associated with inputs
- Button labels and descriptions
- Icon buttons have `aria-label`

### Accessibility Testing

```tsx
// Test keyboard navigation
<Button onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    // Handle activation
  }
}}>
  Accessible Button
</Button>

// Test focus management
<Dialog onOpenChange={(open) => {
  if (open) {
    // Focus first interactive element
    setTimeout(() => {
      const firstFocusable = document.querySelector('[tabindex="0"]')
      firstFocusable?.focus()
    }, 100)
  }
}}>
  <DialogContent>
    <Button>First Focusable</Button>
  </DialogContent>
</Dialog>

// Test screen reader announcements
<ErrorState
  title="Error occurred"
  description="Please try again"
  role="alert"
  aria-live="polite"
/>
```

## Design System Integration

All components use the Drive Labs design system tokens:

- **Colors**: `bg-bg`, `text-fg`, `bg-muted`, `text-muted`, etc.
- **Brand Colors**: `bg-brand`, `text-brand-50`, `hover:bg-brand-700`
- **Status Colors**: `bg-success`, `bg-warning`, `bg-danger`
- **Spacing**: Consistent spacing using the design system scale
- **Typography**: Font weights and sizes from the design system
- **Focus States**: Consistent focus rings using `ring-ring`

## Dark Mode Support

All components automatically support dark mode through CSS custom properties:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

## Accessibility

Components include proper accessibility features:

- **Focus Management**: Visible focus indicators
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Meets WCAG guidelines
- **Semantic HTML**: Proper HTML elements and structure

## Customization

Components can be customized using the `className` prop:

```tsx
<Button className="w-full" variant="primary">
  Full Width Button
</Button>

<Card className="max-w-md mx-auto">
  <CardContent>Centered card</CardContent>
</Card>
```

## TypeScript Support

All components include full TypeScript support with proper prop types:

```tsx
import { Button, type ButtonProps } from '@/components/ui'

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## Dependencies

The components require these dependencies:

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  }
}
```

## Usage Examples

See `src/components/demo.tsx` for a comprehensive example of all components in action.

## Contributing

When adding new components:

1. Follow the existing patterns and structure
2. Use the design system tokens
3. Include proper TypeScript types
4. Add accessibility features
5. Support dark mode
6. Include in the demo page
7. Update this documentation
