<% if (stack === "next-tailwind" || stack === "next-shadcn") { %>import './globals.css'<% } %>

export default function HomePage() {
  return (
    <main<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="container mx-auto px-4 py-8"<% } %>>
      <h1<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="text-4xl font-bold text-center mb-8"<% } %>>
        Welcome to <%= title(name) %>
      </h1>
      
      <p<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="text-lg text-center text-gray-600 mb-8"<% } %>>
        <%= description || `A modern ${stack} application built with Drive Labs` %>
      </p>

<% if (hasFeature(features, "auth")) { %>
      <div<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="max-w-md mx-auto"<% } %>>
        <h2<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="text-2xl font-semibold mb-4"<% } %>>Authentication</h2>
        <p<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="text-gray-600 mb-4"<% } %>>
          Sign in or create an account to get started.
        </p>
        <div<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="space-y-2"<% } %>>
          <button<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"<% } %>>
            Sign In
          </button>
          <button<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"<% } %>>
            Sign Up
          </button>
        </div>
      </div>
<% } %>

<% if (hasFeature(features, "forms")) { %>
      <div<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="max-w-md mx-auto mt-8"<% } %>>
        <h2<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="text-2xl font-semibold mb-4"<% } %>>Contact Form</h2>
        <form<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="space-y-4"<% } %>>
          <div>
            <label<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="block text-sm font-medium mb-1"<% } %>>Name</label>
            <input<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="w-full border border-gray-300 rounded px-3 py-2"<% } %> type="text" />
          </div>
          <div>
            <label<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="block text-sm font-medium mb-1"<% } %>>Email</label>
            <input<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="w-full border border-gray-300 rounded px-3 py-2"<% } %> type="email" />
          </div>
          <button<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"<% } %> type="submit">
            Submit
          </button>
        </form>
      </div>
<% } %>

      <div<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="mt-12 text-center"<% } %>>
        <h2<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="text-2xl font-semibold mb-4"<% } %>>Features</h2>
        <div<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="grid grid-cols-2 md:grid-cols-4 gap-4"<% } %>>
<% for (const feature of features) { %>
          <div<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="p-4 border rounded-lg"<% } %>>
            <h3<% if (stack === "next-tailwind" || stack === "next-shadcn") { %> className="font-semibold"<% } %>><%= title(feature) %></h3>
          </div>
<% } %>
        </div>
      </div>
    </main>
  )
}
