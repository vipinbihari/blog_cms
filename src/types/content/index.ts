/**
 * Content Types
 * =============
 * Consolidated type definitions for all content-related functionality.
 */

import type { CollectionEntry as AstroCollectionEntry } from 'astro:content';

// ============================================================================
// CORE CONTENT TYPES
// ============================================================================

/**
 * Re-export Astro's CollectionEntry for convenience
 */
export { type CollectionEntry } from 'astro:content';

/**
 * Blog post data type (from Astro content config)
 */
export interface BlogPostData {
  title: string;
  description: string;
  date: Date;
  category: string;
  tags: string[];
  author?: string;
  featured?: boolean;
  draft?: boolean;
  image?: string;
  imageAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  excerpt?: string;
  readingTime?: number;
  wordCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalURL?: string;
  lastModified?: Date;
}

/**
 * Core blog post type - alias for Astro's CollectionEntry to ensure compatibility
 */
export type BlogPost = AstroCollectionEntry<'posts'>;

/**
 * Extended post type with additional computed fields
 */
export interface PostWithSlug {
  slug: string;
  id: string;
  collection: 'posts';
  data: BlogPostData;
  body: string;
}

// ============================================================================
// SEARCH AND FILTERING TYPES
// ============================================================================

/**
 * Search result with relevance scoring
 */
export interface SearchResult {
  post: BlogPost;
  score: number;
  matches: string[];
  relevanceReason?: string;
}

/**
 * Advanced search options
 */
export interface SearchOptions {
  query: string;
  categories?: string[];
  tags?: string[];
  authors?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  limit?: number;
  sortBy?: 'relevance' | 'date' | 'title';
}

/**
 * Search suggestions result
 */
export interface SearchSuggestion {
  text: string;
  type: 'tag' | 'category' | 'title' | 'author';
  count?: number;
}

// ============================================================================
// AGGREGATION AND STATS TYPES
// ============================================================================

/**
 * Posts grouped by year
 */
export interface PostsByYear {
  [year: string]: BlogPost[];
}

/**
 * Posts grouped by month
 */
export interface PostsByMonth {
  [yearMonth: string]: BlogPost[];
}

/**
 * Category statistics and metadata
 */
export interface CategoryStats {
  category: string;
  count: number;
  latestPost?: BlogPost;
  description?: string;
  slug?: string;
}

/**
 * Tag statistics and metadata
 */
export interface TagStats {
  tag: string;
  count: number;
  posts: BlogPost[];
  description?: string;
  slug?: string;
  relatedTags?: string[];
}

/**
 * Author statistics and metadata
 */
export interface AuthorStats {
  author: string;
  count: number;
  posts: BlogPost[];
  latestPost?: BlogPost;
  bio?: string;
  avatar?: string;
  social?: AuthorSocialLinks;
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

/**
 * Generic pagination result
 */
export interface PaginationResult<T = any> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page: number;
  limit: number;
  offset?: number;
}

// ============================================================================
// AUTHOR AND SOCIAL TYPES
// ============================================================================

/**
 * Author social media links
 */
export interface AuthorSocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  email?: string;
}

/**
 * Complete author information
 */
export interface Author {
  name: string;
  bio?: string;
  avatar?: string;
  social?: AuthorSocialLinks;
  slug?: string;
  verified?: boolean;
}

// ============================================================================
// CONTENT INTERACTION TYPES
// ============================================================================

/**
 * Quiz question structure
 */
export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Complete quiz structure
 */
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore?: number;
  timeLimit?: number;
}

/**
 * Quiz attempt result
 */
export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent?: number;
  passed: boolean;
}

// ============================================================================
// CONTENT METADATA TYPES
// ============================================================================

/**
 * Reading time estimation
 */
export interface ReadingTime {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Table of contents entry
 */
export interface TOCEntry {
  id: string;
  text: string;
  level: number;
  slug: string;
  children?: TOCEntry[];
}

/**
 * Content analytics
 */
export interface ContentAnalytics {
  views?: number;
  shares?: number;
  likes?: number;
  comments?: number;
  readingTime?: ReadingTime;
  lastUpdated?: Date;
}


