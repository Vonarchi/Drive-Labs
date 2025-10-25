# <%= title(name) %>

<%= description || `A modern ${stack} application built with Drive Labs` %>

## Features

<% for (const feature of features) { %>- **<%= title(feature) %>** - <%= sentence(feature) %> functionality
<% } %>

## Tech Stack

- **Framework**: <%= stack %>
<% if (stack === "next-tailwind" || stack === "next-shadcn") { %>- **Styling**: Tailwind CSS<% } %>
<% if (hasFeature(features, "auth")) { %>- **Authentication**: Supabase<% } %>
<% if (hasFeature(features, "stripe")) { %>- **Payments**: Stripe<% } %>
<% if (hasFeature(features, "forms")) { %>- **Forms**: React Hook Form + Zod<% } %>

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
<%= kebab(name) %>/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
<% for (const page of pages) { %>├── app<%= page.route === "/" ? "" : page.route %>/
│   └── <%= kebab(routeToComponent(page.route)) %>.tsx
<% } %><% if (hasFeature(features, "auth")) { %>├── components/
│   └── auth/
│       ├── login-form.tsx
│       └── signup-form.tsx
<% } %><% if (hasFeature(features, "forms")) { %>├── components/
│   └── ui/
│       └── form.tsx
<% } %>├── package.json
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## Pages

<% for (const page of pages) { %>- **<%= page.route %>** - <%= page.purpose %>
<% } %>

## Environment Variables

<% if (hasFeature(features, "auth")) { %>Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
<% } %><% if (hasFeature(features, "stripe")) { %>Create a `.env.local` file with:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```
<% } %>

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
<% if (stack === "next-tailwind" || stack === "next-shadcn") { %>- [Tailwind CSS Documentation](https://tailwindcss.com/docs)<% } %>
<% if (hasFeature(features, "auth")) { %>- [Supabase Documentation](https://supabase.com/docs)<% } %>
<% if (hasFeature(features, "stripe")) { %>- [Stripe Documentation](https://stripe.com/docs)<% } %>

## Deploy

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com).

---

Built with ❤️ by [Drive Labs](https://drivelabs.dev)
