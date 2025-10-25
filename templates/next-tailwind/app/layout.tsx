import type { Metadata } from 'next'
<% if (stack === "next-tailwind" || stack === "next-shadcn") { %>import './globals.css'<% } %>

export const metadata: Metadata = {
  title: '<%= title(name) %>',
  description: '<%= description || `A modern ${stack} application` %>',
<% if (hasFeature(features, "seo")) { %>
  keywords: ['<%= join(features, "', '") %>'],
  authors: [{ name: 'Drive Labs' }],
  openGraph: {
    title: '<%= title(name) %>',
    description: '<%= description || `A modern ${stack} application` %>',
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
      <body<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="min-h-screen bg-background font-sans antialiased"<% } %>>
        {children}
      </body>
    </html>
  )
}
