import type { BlogPost, SearchResult } from '../../types';
import { getAllPosts } from './queries';

/**
 * Simple text search for posts
 * 
 * @param query - Search query string
 * @returns Promise resolving to array of matching blog posts
 * @throws Will return empty array if query is invalid or posts cannot be fetched
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    // Validate input
    if (!query || typeof query !== 'string' || !query.trim()) {
      return [];
    }
    
    const posts = await getAllPosts();
    if (!Array.isArray(posts)) {
      console.warn('searchPosts: getAllPosts did not return an array');
      return [];
    }
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    if (searchTerms.length === 0) {
      return [];
    }
    
    return posts.filter(post => {
      try {
        const searchableText = [
          post.data?.title || '',
          post.data?.excerpt || '',
          ...(post.data?.tags || []),
          post.data?.category || '',
          post.data?.author || ''
        ].join(' ').toLowerCase();
        
        // Post matches if it contains all search terms
        return searchTerms.every(term => searchableText.includes(term));
      } catch (error) {
        console.warn(`searchPosts: Error processing post ${post.id}:`, error);
        return false;
      }
    });
  } catch (error) {
    console.error('searchPosts: Search operation failed:', error);
    return [];
  }
}

/**
 * Advanced search with scoring
 * 
 * @param query - Search query string
 * @returns Promise resolving to array of search results with scores and match information
 * @throws Will return empty array if query is invalid or posts cannot be fetched
 */
export async function searchPostsWithScore(query: string): Promise<SearchResult[]> {
  try {
    // Validate input
    if (!query || typeof query !== 'string' || !query.trim()) {
      return [];
    }
    
    const posts = await getAllPosts();
    if (!Array.isArray(posts)) {
      console.warn('searchPostsWithScore: getAllPosts did not return an array');
      return [];
    }
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    if (searchTerms.length === 0) {
      return [];
    }
    
    const results: SearchResult[] = [];
    
    posts.forEach(post => {
      try {
        let score = 0;
        const matches: string[] = [];
        
        // Search in title (highest weight)
        const titleMatches = searchTerms.filter(term => 
          (post.data?.title || '').toLowerCase().includes(term)
        );
        if (titleMatches.length > 0) {
          score += titleMatches.length * 3;
          matches.push('title');
        }
        
        // Search in excerpt
        const excerptMatches = searchTerms.filter(term => 
          (post.data?.excerpt || '').toLowerCase().includes(term)
        );
        if (excerptMatches.length > 0) {
          score += excerptMatches.length * 2;
          matches.push('excerpt');
        }
        
        // Search in tags
        const tagMatches = searchTerms.filter(term => 
          (post.data?.tags || []).some(tag => tag.toLowerCase().includes(term))
        );
        if (tagMatches.length > 0) {
          score += tagMatches.length * 1.5;
          matches.push('tags');
        }
        
        // Search in category
        const categoryMatches = searchTerms.filter(term => 
          (post.data?.category || '').toLowerCase().includes(term)
        );
        if (categoryMatches.length > 0) {
          score += categoryMatches.length;
          matches.push('category');
        }
        
        if (score > 0) {
          results.push({ post, score, matches });
        }
      } catch (error) {
        console.warn(`searchPostsWithScore: Error processing post ${post.id}:`, error);
      }
    });
    
    // Sort by score (highest first), then by date (newest first)
    return results.sort((a, b) => {
      try {
        if (a.score !== b.score) {
          return b.score - a.score;
        }
        const aTime = a.post?.data?.date?.getTime() || 0;
        const bTime = b.post?.data?.date?.getTime() || 0;
        return bTime - aTime;
      } catch (error) {
        console.warn('searchPostsWithScore: Error sorting results:', error);
        return 0;
      }
    });
  } catch (error) {
    console.error('searchPostsWithScore: Search operation failed:', error);
    return [];
  }
}

/**
 * Get suggestions based on partial query
 * 
 * @param query - Partial query string for suggestions
 * @param limit - Maximum number of suggestions to return (default: 5)
 * @returns Promise resolving to array of suggestion strings
 * @throws Will return empty array if query is invalid or posts cannot be fetched
 */
export async function getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
  try {
    // Validate input
    if (!query || typeof query !== 'string' || query.length < 2) {
      return [];
    }
    
    if (typeof limit !== 'number' || limit < 1) {
      limit = 5;
    }
    
    const posts = await getAllPosts();
    if (!Array.isArray(posts)) {
      console.warn('getSearchSuggestions: getAllPosts did not return an array');
      return [];
    }
    
    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();
    
    posts.forEach(post => {
      try {
        // Add matching tags
        const tags = post.data?.tags || [];
        tags.forEach(tag => {
          if (tag && typeof tag === 'string' && tag.toLowerCase().includes(queryLower)) {
            suggestions.add(tag);
          }
        });
        
        // Add matching categories
        const category = post.data?.category || '';
        if (category && category.toLowerCase().includes(queryLower)) {
          suggestions.add(category);
        }
        
        // Add matching title words (for longer words)
        if (query.length >= 3) {
          const title = post.data?.title || '';
          const titleWords = title.toLowerCase().split(' ');
          titleWords.forEach(word => {
            if (word && word.includes(queryLower) && word.length > 3) {
              suggestions.add(word);
            }
          });
        }
      } catch (error) {
        console.warn(`getSearchSuggestions: Error processing post ${post.id}:`, error);
      }
    });
    
    return Array.from(suggestions).slice(0, limit);
  } catch (error) {
    console.error('getSearchSuggestions: Suggestions operation failed:', error);
    return [];
  }
} 