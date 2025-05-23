/**
 * Utility functions for content organization and filtering
 */

// Define our own types since we can't import from astro:content directly
interface PostFrontmatter {
  title: string;
  slug: string;
  date: Date;
  excerpt: string;
  tags: string[];
  category: string;
  author: string;
  heroImage: string;
  quiz?: {
    q: string;
    options: string[];
    answer: number;
  }[];
}

type Post = {
  id: string;
  slug: string;
  body: string;
  collection: 'posts';
  data: PostFrontmatter;
};

/**
 * Group posts by year for archive views
 * @param posts - Array of blog posts
 * @returns Object with years as keys and arrays of posts as values
 */
export function groupPostsByYear(posts: Post[]): Record<string, Post[]> {
  const postsByYear: Record<string, Post[]> = {};
  
  posts.forEach(post => {
    const year = post.data.date.getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });
  
  // Sort posts within each year
  Object.keys(postsByYear).forEach(year => {
    postsByYear[year].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  });
  
  return postsByYear;
}

/**
 * Get featured posts (newest and with highest quality content)
 * @param posts - Array of blog posts
 * @param limit - Maximum number of featured posts to return
 * @returns Array of featured posts
 */
export function getFeaturedPosts(posts: Post[], limit: number = 4): Post[] {
  // In a real implementation, we might have additional criteria for featuring posts
  // Such as a "featured" flag in the frontmatter or posts with most views
  // For now, we'll just use the newest posts
  return posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit);
}

/**
 * Get posts by category
 * @param posts - Array of blog posts
 * @param category - Category to filter by
 * @returns Array of posts in the specified category
 */
export function getPostsByCategory(posts: Post[], category: string): Post[] {
  return posts
    .filter(post => post.data.category === category)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Get posts by tag
 * @param posts - Array of blog posts
 * @param tag - Tag to filter by
 * @returns Array of posts with the specified tag
 */
export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts
    .filter(post => post.data.tags.includes(tag))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Search posts by keyword
 * @param posts - Array of blog posts
 * @param query - Search query
 * @returns Array of posts matching the search query
 */
export function searchPosts(posts: Post[], query: string): Post[] {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  if (searchTerms.length === 0) return [];
  
  return posts.filter(post => {
    const searchableText = [
      post.data.title,
      post.data.excerpt,
      ...post.data.tags,
      post.data.category
    ].join(' ').toLowerCase();
    
    // Post matches if it contains all search terms
    return searchTerms.every(term => searchableText.includes(term));
  });
}
