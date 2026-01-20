import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // 使用 Edge Runtime 提升全球访问速度

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return new NextResponse('Domain is required', { status: 400 });
  }

  const providers = [
    `https://favicon.pub/api/${domain}?s=128`,
    `https://api.iowen.cn/favicon/${domain}.png`,
    `https://unavatar.io/${domain}?fallback=false`,
    `https://favicon.rss.ink/v1/${domain}`,
    `https://icon.horse/icon/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ];

  try {
    const response = await Promise.any(
      providers.map(async (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

        try {
          const res = await fetch(url, {
            signal: controller.signal,
            next: { revalidate: 2592000 }, // 30天缓存
          });
          
          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error(`Failed to fetch from ${url}: ${res.status}`);
          }

          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.startsWith('image/')) {
            throw new Error(`Invalid content type from ${url}: ${contentType}`);
          }

          const buffer = await res.arrayBuffer();
          // 简单的长度检查，防止空文件
          if (buffer.byteLength < 50) {
            throw new Error(`Image too small from ${url}`);
          }

          return { buffer, contentType };
        } catch (e) {
          clearTimeout(timeoutId);
          throw e;
        }
      })
    );

    return new NextResponse(response.buffer, {
      headers: {
        'Content-Type': response.contentType || 'image/png',
        'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    // 所有 providers 都失败
    return new NextResponse('Not Found', { status: 404 });
  }
}
