# Tailwind CSS Setup Guide

This project uses Tailwind CSS with a custom design system based on shadcn/ui design tokens.

## Quick Start

1. **Install Dependencies** (already done):
   ```bash
   pnpm install
   ```

2. **Build CSS**:
   ```bash
   pnpm build:css
   ```

3. **View Demo**:
   Open `examples/design-system-demo.html` in your browser to see the design system in action.

## Design System

### Color Tokens

The design system uses CSS custom properties for consistent theming:

- **Background**: `--bg` - Main background color
- **Foreground**: `--fg` - Main text color  
- **Muted**: `--muted` - Subtle background/text color
- **Ring**: `--ring` - Focus ring color
- **Brand**: `--brand` - Primary brand color with scale (50, 100, 600, 700)
- **Status Colors**: `--danger`, `--warning`, `--success`

### Usage in HTML/CSS

```html
<!-- Use semantic color classes -->
<div class="bg-bg text-fg">Main content</div>
<div class="bg-muted text-muted">Subtle content</div>
<button class="bg-brand text-brand-50">Primary button</button>

<!-- Use component classes -->
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-danger">Danger Button</button>
```

### Using Theme Variables Directly

You can also use the CSS custom properties directly in your styles:

```css
/* Import the theme file */
@import './src/styles/theme.css';

/* Use variables directly */
.my-component {
  background-color: hsl(var(--bg));
  color: hsl(var(--fg));
  border: 1px solid hsl(var(--ring));
}

.my-button {
  background-color: hsl(var(--brand));
  color: hsl(var(--brand-50));
}
```

### Dark Mode

The design system includes dark mode support. Toggle it by adding/removing the `dark` class on the `<html>` element:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

## File Structure

```
src/styles/
├── theme.css           # CSS custom properties (shadcn style)
├── globals.css         # Main CSS file with Tailwind imports
tailwind.config.ts      # Tailwind configuration
postcss.config.js       # PostCSS configuration
dist/
└── styles.css         # Generated CSS file
```

## Build Process

The build process compiles both TypeScript and CSS:

```bash
# Build everything (TypeScript + CSS)
pnpm build

# Build CSS only
pnpm build:css

# Development with hot reload
pnpm dev
```

## Customization

### Adding New Colors

1. Add CSS custom properties to `src/styles/globals.css`:
   ```css
   :root {
     --accent: 210 100% 50%;
   }
   ```

2. Add to Tailwind config in `tailwind.config.ts`:
   ```typescript
   colors: {
     accent: 'hsl(var(--accent))',
   }
   ```

### Adding New Components

Add component classes to the `@layer components` section in `globals.css`:

```css
@layer components {
  .card {
    @apply bg-muted rounded-xl p-6 shadow-sm;
  }
}
```

## Integration with Frontend Frameworks

### React/Next.js

```tsx
import '../styles/globals.css';

export default function App() {
  return (
    <div className="bg-bg text-fg min-h-screen">
      <button className="btn btn-primary">Click me</button>
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div class="bg-bg text-fg min-h-screen">
    <button class="btn btn-primary">Click me</button>
  </div>
</template>

<style>
@import '../styles/globals.css';
</style>
```

## Browser Support

The design system works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- CSS Grid
- Flexbox

## Performance

- CSS is minified in production builds
- Only used utility classes are included in the final CSS
- Design tokens are optimized for tree-shaking
