'use client';

import { useState, useEffect } from 'react';

interface SiteIconProps {
  domain: string;
  title: string;
}

export function SiteIcon({ domain, title }: SiteIconProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 图标源列表：优先使用国内访问速度快的源
  const sources = [
    `https://api.iowen.cn/favicon/${domain}.png`,
    `https://ico.kzw.io/${domain}.png`,
    `/api/favicon?domain=${domain}`, // 本地代理 (包含 Google, Unavatar, iowen 等)
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`, // 客户端直连 Google
    `https://favicon.pub/api/${domain}?s=128`, // 备用 (favicon.pub)
  ];

  const currentSrc = sources[srcIndex];

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (!domain || hasError) {
    return (
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
        {title.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative w-8 h-8 flex-shrink-0">
      {/* 占位符/加载状态 */}
      {!isLoaded && (
        <div className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
      )}
      
      <img
        src={currentSrc}
        alt={title}
        className={`w-8 h-8 rounded-lg shadow-sm group-hover:scale-110 transition-all duration-300 bg-white object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
