'use client';

import { siteConfig } from "@/data/siteConfig";
import { ExternalLink, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const ThemeIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />;
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-10 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteConfig.avatar && (
              <img 
                src={siteConfig.avatar} 
                alt={siteConfig.author} 
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600 dark:to-cyan-400">
              {siteConfig.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-medium"
              title={mounted ? `当前模式: ${theme === 'system' ? '跟随系统' : theme === 'dark' ? '深色' : '浅色'}` : '加载中'}
            >
              <ThemeIcon />
              <span className="hidden sm:inline">
                {mounted ? (theme === 'system' ? '跟随系统' : theme === 'dark' ? '深色模式' : '浅色模式') : '...'}
              </span>
            </button>
            {siteConfig.social.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
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
          {siteConfig.avatar && (
            <div className="mb-6 flex justify-center">
              <img 
                src={siteConfig.avatar} 
                alt={siteConfig.author} 
                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-gray-900 dark:text-white">
            {siteConfig.description}
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            一个简单、优雅的导航网站，收集最优质的开发者资源。
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {siteConfig.categories.map((category) => (
            <section key={category.title} id={category.title}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 border-l-4 border-primary pl-4 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors text-gray-900 dark:text-gray-100">
                        {item.name}
                      </h4>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
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
      <footer className="border-t mt-20 py-12 bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by <a href="https://nextjs.org" className="hover:text-primary underline">Next.js</a> & <a href="https://vercel.com" className="hover:text-primary underline">Vercel</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
