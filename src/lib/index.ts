// Content utilities
export * from './content/queries';
export * from './content/search';

// SEO utilities
export * from './seo/utils';

// Image utilities
export * from './images/utils';

// Pagination utilities
export * from './pagination/utils';

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
} from '../types/content';

// Re-export blog configuration
export { BLOG_CONFIG, getCurrentConfig, getThemeColors } from '../config/current-config';
export type { BlogConfig } from '../config/blog-template'; 