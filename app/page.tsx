'use client';

import { siteConfig, LinkItem } from "@/data/siteConfig";
import { ExternalLink, Sun, Moon, Monitor, Search, Menu, X, Hash, ChevronUp, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { SiteIcon } from "./components/SiteIcon";

function SiteCard({ item }: { item: LinkItem }) {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  
  const domain = useMemo(() => {
    try {
      return new URL(item.url).hostname;
    } catch (e) {
      return '';
    }
  }, [item.url]);

  useEffect(() => {
    const checkConnectivity = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 增加到8秒
      
      try {
        // 优先使用 fetch no-cors 尝试
        await fetch(item.url, { 
          mode: 'no-cors', 
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        setStatus('online');
      } catch (e) {
        // 如果 fetch 失败（可能是由于严格的 CORS 或其他原因），
        // 尝试使用图片加载作为保底检测方式，因为图片加载受 CORS 限制较小
        const img = new Image();
        img.onload = () => setStatus('online');
        img.onerror = () => setStatus('offline');
        // 尝试加载该域名的 favicon.ico，这通常是允许跨域读取的资源
        img.src = `${item.url}/favicon.ico?t=${Date.now()}`;
        
        // 再次设置一个保底超时，如果图片加载也卡住了
        setTimeout(() => {
          if (status === 'loading') setStatus('offline');
        }, 5000);
      } finally {
        clearTimeout(timeoutId);
      }
    };

    checkConnectivity();
  }, [item.url, domain]);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 bg-card-bg rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <SiteIcon domain={domain} title={item.name} />
          <h4 className="text-lg font-semibold group-hover:text-primary transition-colors text-foreground truncate max-w-[180px]">
            {item.name}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
          ) : status === 'online' ? (
            <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              在线
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] font-medium text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              离线
            </div>
          )}
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 min-h-[40px]">
        {item.description}
      </p>
    </a>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [runtime, setRuntime] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    // 计算运行时间
    const timer = setInterval(() => {
      const start = new Date(siteConfig.siteStartDate || "2026-01-20").getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRuntime(`${days}天 ${hours}时 ${minutes}分 ${seconds}秒`);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollToTop = () => {
    const duration = 500;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for smooth effect
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      
      window.scrollTo(0, start * (1 - easeOutCubic(progress)));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return siteConfig.categories;
    
    const query = searchQuery.toLowerCase();
    return siteConfig.categories.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description?.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0);
  }, [searchQuery]);

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
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card-bg border-r border-card-border z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-card-border justify-between">
          <span className="font-bold text-lg">快速导航</span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-4rem)]">
          {siteConfig.categories.map((category) => (
            <a
              key={category.title}
              href={`#${category.title}`}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <Hash className="w-4 h-4 text-gray-400 group-hover:text-primary" />
              <span className="font-medium">{category.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Layout */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-30 border-card-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors active:scale-95"
                aria-label="打开菜单"
              >
                <Menu className="w-6 h-6" />
              </button>
              {siteConfig.avatar && (
                <img 
                  src={siteConfig.avatar} 
                  alt={siteConfig.author} 
                  className="w-8 h-8 rounded-full border border-card-border hidden sm:block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600 dark:to-cyan-400 truncate">
                {siteConfig.title}
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="搜索工具或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-card-border rounded-xl leading-5 bg-search-bg text-search-text placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                title={mounted ? `当前模式: ${theme === 'system' ? '跟随系统' : theme === 'dark' ? '深色' : '浅色'}` : '加载中'}
              >
                <ThemeIcon />
              </button>
              <div className="hidden md:flex items-center gap-2">
                {siteConfig.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          {!searchQuery && (
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
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-foreground">
                {siteConfig.description}
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                一个简单、优雅的导航网站，收集最优质的开发者资源。
              </p>
            </div>
          )}

          {/* Search Results / Categories */}
          <div className="space-y-16">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <section key={category.title} id={category.title} className="scroll-mt-24">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 border-l-4 border-primary pl-4 text-foreground">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {category.items.map((item) => (
                      <SiteCard key={item.name} item={item} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">未找到匹配项</h3>
                <p className="text-gray-500">尝试使用其他关键词搜索</p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t mt-auto py-12 border-card-border bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</p>
            {runtime && (
              <p className="mt-2 text-sm font-medium text-primary/80">
                本站已运行: {runtime}
              </p>
            )}
            <p className="mt-2 text-xs opacity-70">
              Powered by <a href="https://nextjs.org" className="hover:text-primary underline">Next.js</a> & <a href="https://vercel.com" className="hover:text-primary underline">Vercel</a>
            </p>
          </div>
        </footer>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-300 z-50 hover:bg-primary-hover hover:scale-110 active:scale-95 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="回到顶部"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
