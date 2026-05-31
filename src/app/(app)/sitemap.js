import { getPayload } from 'payload';
import configPromise from '../../../payload.config';

export default async function sitemap() {
  let dynamicRoutes = [];

  try {
    const payload = await getPayload({ config: configPromise });
    
    // Fetch dynamic blog posts
    const posts = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      }
    });

    dynamicRoutes = posts.docs.map((post) => ({
      url: `https://vonporat.com/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || new Date()).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
  }

  const baseUrl = 'https://vonporat.com';

  const staticRoutes = [
    '',
    '/about',
    '/music',
    '/art',
    '/projects',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
