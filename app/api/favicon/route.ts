import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // 使用 Edge Runtime 提升全球访问速度

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return new NextResponse('Domain is required', { status: 400 });
  }

  const providers = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://unavatar.io/${domain}?fallback=false`,
  ];

  // 优先尝试 Google (Vercel 环境下 Google 通常最快且质量最高)
  try {
    const googleUrl = providers[0];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // Google 2秒超时

    const res = await fetch(googleUrl, {
      signal: controller.signal,
      next: { revalidate: 2592000 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.google.com/',
      },
    });
    
    clearTimeout(timeoutId);

    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.startsWith('image/')) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 50) {
           return new NextResponse(buffer, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=604800',
            },
          });
        }
      }
    }
  } catch (e) {
    // Google 失败，继续尝试其他
    console.error('Google favicon fetch failed:', e);
  }

  try {
    // 如果 Google 失败，尝试其他高质量源 (Unavatar)
    const response = await Promise.any(
      providers.slice(1).map(async (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 

        try {
          const res = await fetch(url, {
            signal: controller.signal,
            next: { revalidate: 2592000 }, 
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
