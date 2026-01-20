import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // 使用 Edge Runtime 提升全球访问速度

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return new NextResponse('Domain is required', { status: 400 });
  }

  // 服务端尝试获取图标的来源列表
  const providers = [
    `https://unavatar.io/${domain}?fallback=false`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icon.horse/icon/${domain}`,
    `https://favicon.rss.ink/v1/${domain}`,
  ];

  for (const url of providers) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 86400 }, // 缓存 24 小时
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType || 'image/png',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        });
      }
    } catch (e) {
      continue;
    }
  }

  // 如果所有 provider 都失败，返回 404 让前端回退到文字头像
  return new NextResponse('Not Found', { status: 404 });
}
