import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="glass-card p-12 text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          💎 Liquid Glass UI
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          A next-generation SaaS UI Framework — Input &amp; Element Layer
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/common/component"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-300/30 hover:bg-purple-300/50 border border-purple-300/30 text-purple-700 dark:text-purple-300 font-medium transition-all duration-200 hover:scale-105"
          >
            Input System →
          </Link>
          <Link
            href="/common/element"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-300/30 hover:bg-blue-300/50 border border-blue-300/30 text-blue-700 dark:text-blue-300 font-medium transition-all duration-200 hover:scale-105"
          >
            Element System →
          </Link>
        </div>
      </div>
    </main>
  );
}
