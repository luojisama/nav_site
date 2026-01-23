import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.title,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'https://blog.shiro.team/avatar.png',
        sizes: 'any',
        type: 'image/png',
      }
    ],
  };
}