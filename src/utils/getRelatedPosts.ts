/**
 * Utility to find related posts based on tags, categories, and other metadata
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
 * Get related posts based on post tags and category
 * @param currentPost - The current post to find related content for
 * @param allPosts - Array of all blog posts
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related posts sorted by relevance
 */
export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 3
): Post[] {
  const currentPostTags = currentPost.data.tags;
  const currentPostCategory = currentPost.data.category;
  
  // Calculate relevance score for each post
  const scoredPosts = allPosts
    .filter(post => post.id !== currentPost.id) // Exclude current post
    .map(post => {
      // Calculate tag match score
      const tagMatches = post.data.tags.filter(tag => 
        currentPostTags.includes(tag)
      ).length;
      
      // Check if the category matches
      const categoryMatch = post.data.category === currentPostCategory ? 1 : 0;
      
      // Calculate total relevance score
      // Category match has higher weight than tag matches
      const score = tagMatches + (categoryMatch * 2);
      
      return { post, score };
    })
    .filter(item => item.score > 0) // Only include posts with at least one match
    .sort((a, b) => b.score - a.score) // Sort by score (highest first)
    .slice(0, limit) // Limit the number of results
    .map(item => item.post); // Extract just the post objects
  
  return scoredPosts;
}

/**
 * Get suggested posts for 404 page
 * @param allPosts - Array of all blog posts
 * @param limit - Maximum number of posts to suggest (default: 3)
 * @returns Array of recent posts
 */
export function getSuggestedPosts(
  allPosts: Post[],
  limit: number = 3
): Post[] {
  // Sort posts by date (most recent first)
  return allPosts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit);
}
