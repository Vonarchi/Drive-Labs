import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-center">
        CreamCode – AI Web App Generator
      </h1>
      <p className="max-w-lg text-center text-muted-foreground">
        Generate production-grade web applications with one click. Define your idea,
        preview instantly, and deploy to Vercel.
      </p>
      <Link
        href="/dashboard"
        className="rounded-md bg-brand px-5 py-3 text-white hover:bg-brand-700 transition-colors"
      >
        Open Dashboard
      </Link>
    </main>
  );
}
