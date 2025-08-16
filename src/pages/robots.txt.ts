import type { APIRoute } from 'astro';
import { BLOG_CONFIG } from '../config/current-config';

export const GET: APIRoute = () => {
  // Generate dynamic robots.txt with absolute sitemap URL
  const robotsContent = `User-agent: *
Allow: /

# Sitemap with absolute URL for better SEO
Sitemap: ${BLOG_CONFIG.site.url}/sitemap.xml

# Additional directives for SEO optimization
Crawl-delay: 1

# Site information
# Site: ${BLOG_CONFIG.site.name}
# Description: ${BLOG_CONFIG.site.description}
`;

  return new Response(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};
