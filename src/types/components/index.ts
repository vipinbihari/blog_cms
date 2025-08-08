/**
 * Component Types
 * ===============
 * Type definitions for all UI components and their props.
 */

import type { BlogPost, Author } from '../content';

// ============================================================================
// LAYOUT COMPONENT TYPES
// ============================================================================

/**
 * Base layout component props
 */
export interface BaseLayoutProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalURL?: URL | string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

/**
 * Post layout component props
 */
export interface PostLayoutProps {
  post: BlogPost;
  content?: any;
  relatedPosts?: BlogPost[];
  showAuthor?: boolean;
  showRelated?: boolean;
  showComments?: boolean;
}

// ============================================================================
// NAVIGATION COMPONENT TYPES
// ============================================================================

/**
 * Navigation item structure
 */
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavigationItem[];
  active?: boolean;
}

/**
 * Navigation component props
 */
export interface NavigationProps {
  items: NavigationItem[];
  variant: 'horizontal' | 'mobile' | 'sidebar';
  class?: string;
  showIcons?: boolean;
  maxDepth?: number;
}

/**
 * Header component props
 */
export interface HeaderProps {
  navigation: NavigationItem[];
  logo?: {
    src: string;
    alt: string;
    href?: string;
  };
  showSearch?: boolean;
  showThemeToggle?: boolean;
  sticky?: boolean;
}

/**
 * Footer component props
 */
export interface FooterProps {
  navigation?: NavigationItem[];
  social?: SocialLink[];
  copyright?: string;
  showNewsletter?: boolean;
  showBackToTop?: boolean;
}

// ============================================================================
// CONTENT COMPONENT TYPES
// ============================================================================

/**
 * Post card component props
 */
export interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showReadTime?: boolean;
  imageSize?: 'small' | 'medium' | 'large';
}

/**
 * Author bio component props
 */
export interface AuthorBioProps {
  author: Author;
  variant?: 'inline' | 'card' | 'minimal';
  showSocial?: boolean;
  showBio?: boolean;
  showAvatar?: boolean;
}

/**
 * Related posts component props
 */
export interface RelatedPostsProps {
  posts: BlogPost[];
  currentPost: BlogPost;
  title?: string;
  limit?: number;
  variant?: 'grid' | 'list' | 'carousel';
}

// ============================================================================
// INTERACTIVE COMPONENT TYPES
// ============================================================================

/**
 * Search bar component props
 */
export interface SearchBarProps {
  placeholder?: string;
  variant?: 'default' | 'minimal' | 'expanded';
  showSuggestions?: boolean;
  showFilters?: boolean;
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: string) => void;
}

/**
 * Theme toggle component props
 */
export interface ThemeToggleProps {
  variant?: 'button' | 'switch' | 'dropdown';
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  position?: 'left' | 'right';
}

/**
 * Share buttons component props
 */
export interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  platforms?: ('twitter' | 'facebook' | 'linkedin' | 'reddit' | 'whatsapp' | 'email')[];
  variant?: 'buttons' | 'dropdown' | 'floating';
  showCounts?: boolean;
}

/**
 * Reading progress component props
 */
export interface ReadingProgressProps {
  target?: string | Element;
  variant?: 'bar' | 'circle' | 'percentage';
  position?: 'top' | 'bottom' | 'sidebar';
  showPercentage?: boolean;
}

// ============================================================================
// MEDIA COMPONENT TYPES
// ============================================================================

/**
 * Responsive image component props
 */
export interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  class?: string;
  showCaption?: boolean;
  caption?: string;
  zoom?: boolean;
}

/**
 * Video component props
 */
export interface VideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  class?: string;
}

// ============================================================================
// UTILITY COMPONENT TYPES
// ============================================================================

/**
 * Formatted date component props
 */
export interface FormattedDateProps {
  date: Date | string;
  format?: 'short' | 'medium' | 'long' | 'relative';
  locale?: string;
  showTime?: boolean;
  class?: string;
}

/**
 * Social links component props
 */
export interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'icons' | 'buttons' | 'text';
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
  openInNewTab?: boolean;
}

/**
 * Logo component props
 */
export interface LogoProps {
  src?: string;
  alt?: string;
  href?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  text?: string;
  variant?: 'default' | 'minimal' | 'text-only';
}

// ============================================================================
// SOCIAL AND EXTERNAL TYPES
// ============================================================================

/**
 * Social media link structure
 */
export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'github' | 'instagram' | 'youtube' | 'discord' | 'email' | 'website';
  url: string;
  username?: string;
  label?: string;
  icon?: string;
}

// ============================================================================
// FORM COMPONENT TYPES
// ============================================================================

/**
 * Newsletter signup component props
 */
export interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: 'inline' | 'modal' | 'sidebar';
  showPrivacyNote?: boolean;
  onSubscribe?: (email: string) => void;
}

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Theme mode type
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Theme configuration
 */
export interface ThemeConfig {
  defaultTheme: Theme;
  enableSystemTheme: boolean;
  storageKey: string;
  attribute: string;
  themes: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}
