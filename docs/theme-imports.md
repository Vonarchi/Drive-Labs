# Theme Import Guide

This guide shows how to import the Drive Labs theme in different frontend frameworks and setups.

## Import Pattern

Always import the theme CSS file first, then the globals CSS file:

```javascript
import '@/styles/theme.css'      // CSS custom properties
import '@/styles/globals.css'    // Tailwind + components
```

## Framework Examples

### Next.js (App Router)

**File: `src/app/layout.tsx`**
```tsx
import '@/styles/theme.css'
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-fg">
        {children}
      </body>
    </html>
  )
}
```

### Next.js (Pages Router)

**File: `pages/_app.tsx`**
```tsx
import '@/styles/theme.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

### React (Vite/Create React App)

**File: `src/main.tsx`**
```tsx
import '@/styles/theme.css'
import '@/styles/globals.css'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')

const root = createRoot(container)
root.render(<App />)
```

### Vue.js

**File: `src/main.js`**
```javascript
import '@/styles/theme.css'
import '@/styles/globals.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### Svelte

**File: `src/app.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/src/styles/theme.css">
    <link rel="stylesheet" href="/src/styles/globals.css">
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### Vanilla HTML

**File: `src/index.html`**
```html
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

## TypeScript Path Mapping

If you're using TypeScript, make sure your `tsconfig.json` includes path mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Build Tools Configuration

### Vite

**File: `vite.config.ts`**
```typescript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Webpack

**File: `webpack.config.js`**
```javascript
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

## CSS Import Order

Always import in this order:

1. **Theme CSS** (`theme.css`) - CSS custom properties
2. **Globals CSS** (`globals.css`) - Tailwind + components

```css
/* ✅ Correct order */
@import '@/styles/theme.css';
@import '@/styles/globals.css';

/* ❌ Wrong order - Tailwind might not see the variables */
@import '@/styles/globals.css';
@import '@/styles/theme.css';
```

## Usage in Components

Once imported, you can use the design system in your components:

```tsx
// React/Next.js
export function Button({ children, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  )
}

// Vue
<template>
  <button :class="`btn btn-${variant}`">
    <slot />
  </button>
</template>
```

## Dark Mode

The theme automatically supports dark mode. Toggle it by adding/removing the `dark` class:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

## Troubleshooting

### Theme Variables Not Working

1. **Check import order**: Theme CSS must be imported before globals CSS
2. **Verify file paths**: Make sure the paths to theme.css are correct
3. **Check build process**: Ensure CSS is being processed correctly

### Tailwind Classes Not Working

1. **Check content paths**: Verify `tailwind.config.ts` includes your source files
2. **Rebuild CSS**: Run `pnpm build:css` after changes
3. **Check imports**: Make sure globals.css is imported after theme.css

### TypeScript Errors

1. **Add path mapping**: Include `@/*` mapping in `tsconfig.json`
2. **Install types**: Install `@types/node` for path resolution
3. **Check file extensions**: Use `.css` extension in imports
