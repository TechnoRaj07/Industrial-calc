import { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/calculators/data';
import { BLOG_POSTS } from '@/lib/blog/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://industrialcalc.app';

  const staticPages = [
    '',
    '/calculators',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclaimer',
    '/verify',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const calculatorPages = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...blogPages];
}
