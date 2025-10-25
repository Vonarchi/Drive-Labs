# Theme Import Examples

This file shows practical examples of importing the Drive Labs theme in different scenarios.

## Quick Start

```javascript
// Import once in your app entry point
import '@/styles/theme.css'      // CSS custom properties
import '@/styles/globals.css'    // Tailwind + components
```

## Framework Examples

### Next.js App Router
```tsx
// src/app/layout.tsx
import '@/styles/theme.css'
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg text-fg">
        {children}
      </body>
    </html>
  )
}
```

### React + Vite
```tsx
// src/main.tsx
import '@/styles/theme.css'
import '@/styles/globals.css'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
```

### Vue.js
```javascript
// src/main.js
import '@/styles/theme.css'
import '@/styles/globals.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### Vanilla HTML
```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="./styles/theme.css">
    <link rel="stylesheet" href="./styles/globals.css">
</head>
<body class="bg-bg text-fg">
    <!-- Your content -->
</body>
</html>
```

## Component Usage

Once imported, use the design system in your components:

```tsx
// React component
export function Card({ title, children }) {
  return (
    <div className="bg-muted rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="text-muted">{children}</div>
    </div>
  )
}

export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
}
```

```vue
<!-- Vue component -->
<template>
  <div class="bg-muted rounded-xl p-6">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div class="text-muted">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps(['title'])
</script>
```

## Dark Mode Toggle

```tsx
// React dark mode hook
import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  return { isDark, toggleDarkMode }
}
```

```javascript
// Vanilla JS dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', 
    document.documentElement.classList.contains('dark')
  )
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark')
}
```

## CSS Custom Properties Usage

You can also use the theme variables directly in CSS:

```css
/* Custom component using theme variables */
.my-component {
  background-color: hsl(var(--bg));
  color: hsl(var(--fg));
  border: 1px solid hsl(var(--ring));
  border-radius: 0.75rem; /* 12px */
  padding: 1.5rem; /* 24px */
}

.my-button {
  background-color: hsl(var(--brand));
  color: hsl(var(--brand-50));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem; /* 6px */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.my-button:hover {
  background-color: hsl(var(--brand-600));
}
```

## TypeScript Support

For better TypeScript support, create a types file:

```typescript
// src/types/theme.ts
export type ThemeVariant = 'light' | 'dark'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface ThemeContextType {
  theme: ThemeVariant
  toggleTheme: () => void
}
```

## Build Process

Make sure your build process includes the CSS:

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:css": "tailwindcss -i ./src/styles/globals.css -o ./dist/styles.css"
  }
}
```

## Troubleshooting

### Import not working?
1. Check file paths are correct
2. Ensure theme.css is imported before globals.css
3. Verify your build tool is processing CSS imports

### Classes not applying?
1. Run `pnpm build:css` to regenerate CSS
2. Check Tailwind config includes your source files
3. Clear browser cache

### Dark mode not working?
1. Ensure theme.css is imported
2. Check the `dark` class is being added to `<html>`
3. Verify CSS custom properties are loading
