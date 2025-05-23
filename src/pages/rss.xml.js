import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { format } from 'date-fns';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );
  
  return rss({
    title: 'StockSage | Stock Market Analysis and Education',
    description: 'Expert analysis and practical lessons on Indian and global stock markets, breaking news, and technical & fundamental analysis.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/posts/${post.data.slug}/`,
      categories: post.data.tags,
      // Custom fields for RSS extension
      customData: `
        <author>${post.data.author}</author>
        <category>${post.data.category}</category>
        ${post.data.heroImage ? `<media:content url="${new URL(post.data.heroImage, context.site)}" medium="image" />` : ''}
      `
    })),
    // Add XML namespace for media content
    xmlns: {
      media: 'http://search.yahoo.com/mrss/'
    },
    // Set custom stylesheets
    stylesheet: '/rss/styles.xsl'
  });
}
