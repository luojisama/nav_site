import { siteConfig } from "@/data/siteConfig";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              {siteConfig.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {siteConfig.social.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            {siteConfig.description}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            一个简单、优雅的导航网站，收集好用的资源，网站。
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {siteConfig.categories.map((category) => (
            <section key={category.title} id={category.title}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold group-hover:text-blue-500 transition-colors">
                        {item.name}
                      </h4>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by <a href="https://nextjs.org" className="hover:text-gray-900 dark:hover:text-gray-100 underline">Next.js</a> & <a href="https://vercel.com" className="hover:text-gray-900 dark:hover:text-gray-100 underline">Vercel</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
