/**
 * Type System Index
 * =================
 * Centralized export for all type definitions in the FinHux Blog CMS.
 * Organized by domain for better maintainability and discoverability.
 */

// ============================================================================
// CONTENT TYPES
// ============================================================================
export type {
  // Core content types
  BlogPost,
  BlogPostData,
  PostWithSlug,

  // Search and filtering types
  SearchResult,
  SearchOptions,
  SearchSuggestion,

  // Aggregation and stats types
  PostsByYear,
  PostsByMonth,
  CategoryStats,
  TagStats,
  AuthorStats,

  // Pagination types
  PaginationResult,
  PaginationOptions,

  // Author and social types
  Author,
  AuthorSocialLinks,

  // Content interaction types
  QuizQuestion,
  Quiz,
  QuizResult,

  // Content metadata types
  ReadingTime,
  TOCEntry,
  ContentAnalytics,
} from './content/index';

// Import CollectionEntry directly from Astro
export type { CollectionEntry } from 'astro:content';

// ============================================================================
// COMPONENT TYPES
// ============================================================================
export type {
  // Layout component types
  BaseLayoutProps,
  PostLayoutProps,

  // Navigation component types
  NavigationItem,
  NavigationProps,
  HeaderProps,
  FooterProps,

  // Content component types
  PostCardProps,
  AuthorBioProps,
  RelatedPostsProps,

  // Interactive component types
  SearchBarProps,
  ThemeToggleProps,
  ShareButtonsProps,
  ReadingProgressProps,

  // Media component types
  ResponsiveImageProps,
  VideoProps,

  // Utility component types
  FormattedDateProps,
  SocialLinksProps,
  LogoProps,

  // Social and external types
  SocialLink,

  // Form component types
  NewsletterSignupProps,

  // Theme types
  Theme,
  ThemeConfig,
} from './components';

// ============================================================================
// VALIDATION AND ERROR TYPES
// ============================================================================
export type {
  ValidationResult,
  ErrorType,
  BlogCMSError,
} from '../lib/validation';

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS
// ============================================================================
// Re-export commonly used types from the old location for backward compatibility
// These maintain existing import paths while the system transitions

// Content types (legacy compatibility)
export type {
  BlogPost as LegacyBlogPost,
  BlogPostData as LegacyBlogPostData,
  SearchResult as LegacySearchResult,
  PostsByYear as LegacyPostsByYear,
  CategoryStats as LegacyCategoryStats,
  TagStats as LegacyTagStats,
  PaginationResult as LegacyPaginationResult,
  Author as LegacyAuthor,
  Theme as LegacyTheme,
} from './content';

// Component types (legacy compatibility)
export type {
  BaseLayoutProps as LegacyBaseLayoutProps,
  PostLayoutProps as LegacyPostLayoutProps,
} from './components';

// ============================================================================
// TYPE UTILITIES
// ============================================================================

/**
 * Utility type to make all properties optional
 */
export type Optional<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Utility type to make specific properties required
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type to make specific properties optional
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type for strict object types
 */
export type Exact<T> = {
  [K in keyof T]: T[K];
} & {
  [K in Exclude<string, keyof T>]: never;
};

/**
 * Utility type for deep readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Utility type for nullable values
 */
export type Nullable<T> = T | null;

/**
 * Utility type for values that can be undefined
 */
export type Maybe<T> = T | undefined;

/**
 * Utility type for API response wrapper
 */
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
};
