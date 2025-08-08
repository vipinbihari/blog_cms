// Content utilities
export * from './content';

// SEO utilities
export * from './seo';

// Image utilities
export * from './images';

// Pagination utilities
export * from './pagination';

// Utility functions
export * from './utils';

// Validation and error handling utilities
export * from './validation';

// Legacy exports for backward compatibility
export { slugifyTag } from './utils/slugify';
export { resolveContentImagePath, getOptimizedImagePath } from './imagePathResolver';

// Re-export commonly used types
export type {
  BlogPost,
  BlogPostData,
  PostsByYear,
  CategoryStats,
  TagStats,
  SearchResult,
  PaginationResult,
  BaseLayoutProps,
  PostLayoutProps,
  Theme,
  Author,
} from '../types';

// Re-export blog configuration
export { BLOG_CONFIG, getCurrentConfig, getThemeColors } from '../config/current-config';
export type { BlogConfig } from '../config/blog-template'; 