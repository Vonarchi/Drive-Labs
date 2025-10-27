interface TemplateFile {
  path: string;
  contents: string;
}

export function filesFor(stack: "next-tailwind"|"next-shadcn"|"remix"): TemplateFile[] {
  switch (stack) {
    case "next-tailwind":
      return [
        { 
          path: "package.json.eta", 
          contents: `{
  "name": "<%= it.nameParam %>",
  "version": "0.1.0",
  "private": true,
  "scripts": { 
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"<% if (it.features.includes("auth")) { %>,
    "db:push": "supabase db push",
    "db:reset": "supabase db reset"<% } %>
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"<% if (it.features.includes("auth")) { %>,
    "@supabase/supabase-js": "^2.38.0"<% } %><% if (it.features.includes("stripe")) { %>,
    "stripe": "^14.0.0"<% } %><% if (it.features.includes("forms")) { %>,
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0"<% } %>
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "typescript": "^5.0.0"
  }
}` 
        },
        { 
          path: "app/layout.tsx.eta", 
          contents: `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '<%= it.Name %>',
  description: '<%= it.description || "A modern Next.js application with Tailwind CSS" %>',
<% if (it.features.includes("seo")) { %>
  keywords: ['<%= it.features.join("', '") %>'],
  authors: [{ name: 'Drive Labs' }],
  openGraph: {
    title: '<%= it.Name %>',
    description: '<%= it.description || "A modern Next.js application with Tailwind CSS" %>',
    type: 'website',
  },
<% } %>
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
}` 
        },
        { 
          path: "app/page.tsx.eta", 
          contents: `export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to <%= it.Name %>
      </h1>
      
      <p className="text-lg text-center text-gray-600 mb-8">
        <%= it.description || "A modern Next.js application with Tailwind CSS built with Drive Labs" %>
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
}` 
        },
        { 
          path: "app/globals.css.eta", 
          contents: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
<% if (it.theme.primary) { %>  --primary: <%= it.theme.primary %>;<% } %>
<% if (it.theme.accent) { %>  --accent: <%= it.theme.accent %>;<% } %>
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
}` 
        },
        { 
          path: "tailwind.config.ts.eta", 
          contents: `import type { Config } from 'tailwindcss'

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
        primary: {
          DEFAULT: '<%= it.theme.primary || "hsl(222.2 84% 4.9%)" %>',
          foreground: 'hsl(210 40% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(222.2 84% 4.9%)',
        },
        accent: {
          DEFAULT: '<%= it.theme.accent || "hsl(210 40% 96%)" %>',
          foreground: 'hsl(222.2 84% 4.9%)',
        },
      },
    },
  },
  plugins: [],
}
export default config` 
        },
        { 
          path: "next.config.js.eta", 
          contents: `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
<% if (it.features.includes("seo")) { %>
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
<% } %>
}

module.exports = nextConfig` 
        },
        { 
          path: "tsconfig.json.eta", 
          contents: `{
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
}` 
        },
        { 
          path: "README.md.eta", 
          contents: `# <%= it.Name %>

<%= it.description || "A modern Next.js application with Tailwind CSS built with Drive Labs" %>

## Features

<% for (const feature of it.features) { %>- **<%= feature.charAt(0).toUpperCase() + feature.slice(1) %>** - <%= feature %> functionality
<% } %>

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
<% if (it.features.includes("auth")) { %>- **Authentication**: Supabase<% } %>
<% if (it.features.includes("stripe")) { %>- **Payments**: Stripe<% } %>
<% if (it.features.includes("forms")) { %>- **Forms**: React Hook Form + Zod<% } %>

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
<%= it.nameParam %>/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
<% for (const page of it.pages) { %>├── app<%= page.route === "/" ? "" : page.route %>/
│   └── <%= page.route === "/" ? "page" : page.route.slice(1).split("/").join("-") %>.tsx
<% } %>├── package.json
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
\`\`\`

## Pages

<% for (const page of it.pages) { %>- **<%= page.route %>** - <%= page.purpose %>
<% } %>

## Environment Variables

<% if (it.features.includes("auth")) { %>Create a \`.env.local\` file with:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`
<% } %><% if (it.features.includes("stripe")) { %>Create a \`.env.local\` file with:
\`\`\`
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
\`\`\`
<% } %>

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
<% if (it.features.includes("auth")) { %>- [Supabase Documentation](https://supabase.com/docs)<% } %>
<% if (it.features.includes("stripe")) { %>- [Stripe Documentation](https://stripe.com/docs)<% } %>

## Deploy

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com).

---

Built with ❤️ by [Drive Labs](https://drivelabs.dev)` 
        }
      ];
    
    case "next-shadcn":
      return [
        { 
          path: "package.json.eta", 
          contents: `{
  "name": "<%= it.nameParam %>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"<% if (it.features.includes("auth")) { %>,
    "db:push": "supabase db push",
    "db:reset": "supabase db reset"<% } %>
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.263.1"<% if (it.features.includes("auth")) { %>,
    "@supabase/supabase-js": "^2.38.0"<% } %><% if (it.features.includes("stripe")) { %>,
    "stripe": "^14.0.0"<% } %><% if (it.features.includes("forms")) { %>,
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0"<% } %>
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "typescript": "^5.0.0"
  }
}` 
        },
        { 
          path: "app/layout.tsx.eta", 
          contents: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '<%= it.Name %>',
  description: '<%= it.description || "A beautiful Next.js application with shadcn/ui" %>',
<% if (it.features.includes("seo")) { %>
  keywords: ['<%= it.features.join("', '") %>'],
  authors: [{ name: 'Drive Labs' }],
  openGraph: {
    title: '<%= it.Name %>',
    description: '<%= it.description || "A beautiful Next.js application with shadcn/ui" %>',
    type: 'website',
  },
<% } %>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          {children}
        </div>
      </body>
    </html>
  )
}` 
        },
        { 
          path: "app/page.tsx.eta", 
          contents: `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Mail, 
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Built with shadcn/ui
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-6">
              Welcome to <%= it.Name %>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              <%= it.description || "A stunning Next.js application built with shadcn/ui components, featuring beautiful design and modern functionality." %>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

<% if (it.features.includes("auth")) { %>
      {/* Authentication Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Authentication
                </CardTitle>
                <CardDescription>
                  Secure user authentication powered by Supabase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Button className="w-full">
                  Sign In
                </Button>
                <Button variant="outline" className="w-full">
                  Sign Up
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
<% } %>

<% if (it.features.includes("forms")) { %>
      {/* Contact Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-slate-600">We'd love to hear from you. Send us a message!</p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="contact" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message here..." rows={4} />
                    </div>
                    <Button className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="support" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe your issue..." rows={4} />
                    </div>
                    <Button className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Submit Support Request
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
<% } %>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Amazing Features</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover the powerful features that make <%= it.Name %> stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<% for (const feature of it.features) { %>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
<% if (feature === "auth") { %>
                  <Lock className="w-6 h-6 text-white" />
<% } else if (feature === "forms") { %>
                  <Mail className="w-6 h-6 text-white" />
<% } else if (feature === "seo") { %>
                  <Zap className="w-6 h-6 text-white" />
<% } else if (feature === "stripe") { %>
                  <Shield className="w-6 h-6 text-white" />
<% } else { %>
                  <Star className="w-6 h-6 text-white" />
<% } %>
                </div>
                <CardTitle><%= feature.charAt(0).toUpperCase() + feature.slice(1) %></CardTitle>
                <CardDescription>
                  <%= feature === "auth" ? "Secure authentication and user management" : 
                      feature === "forms" ? "Beautiful forms with validation" :
                      feature === "seo" ? "Search engine optimization" :
                      feature === "stripe" ? "Payment processing made easy" :
                      feature + ' functionality' %>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
<% } %>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5★</div>
              <div className="text-blue-100">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using <%= it.Name %> to build amazing applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              <Heart className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-slate-900">
              <Users className="w-4 h-4 mr-2" />
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}` 
        },
        { 
          path: "app/globals.css.eta", 
          contents: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}` 
        },
        { 
          path: "components/ui/button.tsx.eta", 
          contents: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }` 
        },
        { 
          path: "components/ui/card.tsx.eta", 
          contents: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }` 
        },
        { 
          path: "lib/utils.ts.eta", 
          contents: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}` 
        },
        { 
          path: "tailwind.config.ts.eta", 
          contents: `import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config` 
        },
        { 
          path: "README.md.eta", 
          contents: `# <%= it.Name %>

<%= it.description || "A stunning Next.js application built with shadcn/ui components" %>

## ✨ Features

<% for (const feature of it.features) { %>- **<%= feature.charAt(0).toUpperCase() + feature.slice(1) %>** - <%= feature === "auth" ? "Secure authentication with Supabase" : 
    feature === "forms" ? "Beautiful forms with validation" :
    feature === "seo" ? "Search engine optimization" :
    feature === "stripe" ? "Payment processing" :
    feature + ' functionality' %>
<% } %>

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
<% if (it.features.includes("auth")) { %>- **Authentication**: Supabase<% } %>
<% if (it.features.includes("stripe")) { %>- **Payments**: Stripe<% } %>
<% if (it.features.includes("forms")) { %>- **Forms**: React Hook Form + Zod<% } %>

## 🎨 Design System

This template includes a complete design system with:

- **Color Palette**: Carefully crafted color scheme with dark mode support
- **Typography**: Inter font with proper sizing and spacing
- **Components**: Pre-built shadcn/ui components
- **Layout**: Responsive grid system
- **Animations**: Smooth transitions and hover effects

## 🛠️ Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   \`\`\`

2. **Run the development server**:
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   \`\`\`

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
<%= it.nameParam %>/
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout with Inter font
│   └── page.tsx             # Homepage with all sections
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── badge.tsx
│       ├── checkbox.tsx
│       └── tabs.tsx
├── lib/
│   └── utils.ts             # Utility functions
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json
└── next.config.js
\`\`\`

## 🎯 Key Sections

### Hero Section
- Gradient text effect
- Call-to-action buttons
- Badge with sparkle icon

### Features Section
- Grid layout with cards
- Icon integration with Lucide React
- Hover effects and animations

### Authentication Section
- Clean login/signup forms
- Supabase integration ready
- Form validation

### Contact Forms
- Tabbed interface
- Multiple form types
- Professional styling

### Stats Section
- Gradient background
- Key metrics display
- Responsive grid

### CTA Section
- Dark theme
- Multiple action buttons
- Compelling copy

## 🔧 Customization

### Colors
The color scheme is defined in \`app/globals.css\` using CSS variables:

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... more colors */
}
\`\`\`

### Components
All components are built with shadcn/ui and can be customized:

\`\`\`tsx
<Button variant="outline" size="lg">
  Custom Button
</Button>
\`\`\`

### Layout
The layout is fully responsive and uses Tailwind's grid system:

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Content */}
</div>
\`\`\`

## 🌙 Dark Mode

Dark mode is fully supported with automatic theme switching:

\`\`\`css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark colors */
}
\`\`\`

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: Two column grid
- **Desktop**: Three column grid
- **Large screens**: Optimized spacing

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Works out of the box
- **Railway**: Easy deployment
- **Docker**: Container ready

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Drive Labs](https://drivelabs.dev)

**Ready to build something amazing?** 🚀` 
        }
      ];
    
    case "remix":
      // TODO: Implement remix template
      return [];
    
    default:
      throw new Error(`Unsupported stack: ${stack}`);
  }
}
