import { Eta } from "eta";
import * as changeCase from "change-case";

const eta = new Eta();
import { TemplateInputZ } from "./schemas";

/**
 * Client-side file generation (simplified version of server-side generator)
 * This generates files in the browser for immediate preview
 */
export async function generateFilesClient(raw: unknown): Promise<Record<string, string>> {
  const spec = TemplateInputZ.parse(raw);
  const ctx = {
    ...spec,
    nameParam: changeCase.kebabCase(spec.name),
    Name: changeCase.pascalCase(spec.name),
  };

  const files: Record<string, string> = {};

  // Generate basic files for preview
  files["package.json"] = eta.renderString(`
{
  "name": "<%= it.nameParam %>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "^3.4.0"
  }
}`, ctx) || "";

  files["app/layout.tsx"] = eta.renderString(`
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '<%= it.Name %>',
  description: '<%= it.description || "A modern Next.js application" %>'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}`, ctx) || "";

  files["app/page.tsx"] = eta.renderString(`
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to <%= it.Name %>
      </h1>
      
      <p className="text-lg text-center text-gray-600 mb-8">
        <%= it.description || "A modern Next.js application built with Drive Labs" %>
      </p>

<% if (it.features.includes("auth")) { %>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        <p className="text-gray-600 mb-4">
          Sign in or create an account to get started.
        </p>
        <div className="space-y-2">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Sign In
          </button>
          <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50">
            Sign Up
          </button>
        </div>
      </div>
<% } %>

<% if (it.features.includes("forms")) { %>
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" type="email" />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" type="submit">
            Submit
          </button>
        </form>
      </div>
<% } %>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<% for (const feature of it.features) { %>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold"><%= feature.charAt(0).toUpperCase() + feature.slice(1) %></h3>
          </div>
<% } %>
        </div>
      </div>
    </main>
  )
}`, ctx) || "";

  files["app/globals.css"] = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}

body {
  color: rgb(var(--foreground));
  background: rgb(var(--background));
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  files["tailwind.config.ts"] = `
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
}
export default config`;

  files["next.config.js"] = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`;

  files["tsconfig.json"] = `
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;

  return files;
}
