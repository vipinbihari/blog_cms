# FinHux Blog CMS - Technical Specification

This document provides a comprehensive technical overview of the FinHux Blog CMS codebase, including all files, functions, their arguments, return values, and usage patterns.

## 🏗️ Architecture Overview

The project follows a modular, configuration-driven architecture built on Astro with TypeScript. Key architectural principles:

- **Configuration-driven**: Single source of truth in `src/config/current-config.ts`
- **Modular utilities**: Feature-based organization in `src/lib/`
- **Type safety**: Comprehensive TypeScript interfaces
- **Static generation**: Build-time optimization with Astro
- **Separated content**: Content managed via symlinks to external repository

## 📁 File Structure and Purposes

### Configuration Files

#### `src/config/blog-template.ts`
**Purpose**: Core template interfaces, type definitions, and theme presets

**Key Exports**:
- `BlogConfig`: Main configuration interface
- `THEME_PRESETS`: Pre-defined color schemes (blue, green, purple, orange)
- `SiteConfig`, `BrandingConfig`, `ThemeConfig`: Sub-configuration interfaces
- `PWAConfig`, `ImageResolutionsConfig`: Feature-specific interfaces

#### `src/config/current-config.ts`
**Purpose**: Active blog configuration - the single source of truth

**Key Export**:
- `BLOG_CONFIG`: Complete blog configuration object implementing `BlogConfig` interface

**Configuration Sections**:
- Site identity (name, description, URL, author)
- Branding (logos, favicons, social images)
- Theme (colors, typography, dark mode)
- Navigation (header, footer links)
- Social links (all social media profiles)
- Layout settings (post counts, hero configuration)
- Legal pages (about, privacy, terms, disclaimer)
- PWA configuration (auto-generated from other settings)
- Image processing settings

### Utility Libraries (`src/lib/`)

#### `src/lib/index.ts`
**Purpose**: Central barrel export for all utilities

**Exports**:
- All content utilities (queries, search)
- SEO utilities
- Image utilities
- Type definitions
- Current blog configuration

#### Content Utilities (`src/lib/content/`)

##### `src/lib/content/index.ts`
**Purpose**: Barrel export for content-related utilities

**Exports**:
- `getAllPosts`: Function to fetch all blog posts
- `getFeaturedPosts`: Function to fetch featured posts
- `getLatestPosts`: Function to fetch latest posts
- `getPostsByCategory`: Function to fetch posts by category
- `getPostsByTag`: Function to fetch posts by tag
- `getPostsByYear`: Function to fetch posts grouped by year
- `getCategoryStats`: Function to get category statistics
- `getTagStats`: Function to get tag statistics
- `getRelatedPosts`: Function to get related posts
- `searchPosts`: Function for basic post search
- `searchPostsWithScore`: Function for advanced scored search
- `getSearchSuggestions`: Function for search auto-complete

##### `src/lib/content/queries.ts`
**Purpose**: Core content querying and data retrieval functions

**Functions**:

```typescript
async function getAllPosts(): Promise<BlogPost[]>
```
- **Arguments**: None
- **Returns**: Array of all blog posts sorted by date (newest first)
- **Error Handling**: Returns empty array on error, logs to console

```typescript
async function getFeaturedPosts(limit: number = BLOG_CONFIG.layout.featuredPostsCount ?? 3): Promise<BlogPost[]>
```
- **Arguments**: `limit` (optional number, defaults to config value)
- **Returns**: Array of posts marked as featured, limited to specified count
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getLatestPosts(limit: number = 3, excludeIds: string[] = []): Promise<BlogPost[]>
```
- **Arguments**: 
  - `limit`: Maximum number of posts to return
  - `excludeIds`: Array of post IDs to exclude
- **Returns**: Array of latest posts excluding specified IDs
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getPostsByCategory(category: string): Promise<BlogPost[]>
```
- **Arguments**: `category` - Category slug to filter by
- **Returns**: Array of posts in the specified category
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getPostsByTag(tag: string): Promise<BlogPost[]>
```
- **Arguments**: `tag` - Tag slug to filter by
- **Returns**: Array of posts containing the specified tag
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getPostsByYear(): Promise<PostsByYear>
```
- **Arguments**: None
- **Returns**: Object with years as keys and arrays of posts as values
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getCategoryStats(): Promise<CategoryStats[]>
```
- **Arguments**: None
- **Returns**: Array of objects with category, count, and latestPost
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getTagStats(): Promise<TagStats[]>
```
- **Arguments**: None
- **Returns**: Array of objects with tag, count, and posts array
- **Error Handling**: Inherits from `getAllPosts()`

```typescript
async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]>
```
- **Arguments**: 
  - `currentPost`: The current post to find related posts for
  - `limit`: Maximum number of related posts to return
- **Returns**: Array of related posts based on category, tags, and slug keywords
- **Error Handling**: Inherits from `getAllPosts()`
- **Scoring Algorithm**: 
  - Category match: 20 points
  - Tag match: 10 points each
  - Slug keyword match: 5 points each

##### `src/lib/content/search.ts`
**Purpose**: Advanced search functionality with scoring and suggestions

**Functions**:

```typescript
async function searchPosts(query: string): Promise<BlogPost[]>
```
- **Arguments**: `query` - Search query string
- **Returns**: Array of posts matching all search terms
- **Error Handling**: 
  - Validates input (non-empty string)
  - Returns empty array for invalid input
  - Handles malformed post data gracefully
  - Logs warnings for debugging
- **Search Logic**: Searches title, excerpt, tags, category, author

```typescript
async function searchPostsWithScore(query: string): Promise<SearchResult[]>
```
- **Arguments**: `query` - Search query string
- **Returns**: Array of search results with posts, scores, and match information
- **Error Handling**: 
  - Comprehensive input validation
  - Individual post processing protection
  - Safe sorting with fallback values
  - Detailed error logging
- **Scoring System**:
  - Title matches: 3 points each
  - Excerpt matches: 2 points each
  - Tag matches: 1.5 points each
  - Category matches: 1 point each

```typescript
async function getSearchSuggestions(query: string, limit: number = 5): Promise<string[]>
```
- **Arguments**: 
  - `query` - Partial query string (minimum 2 characters)
  - `limit` - Maximum suggestions to return
- **Returns**: Array of suggestion strings
- **Error Handling**: 
  - Input validation for query length and limit
  - Type checking for all inputs
  - Individual post processing protection
- **Suggestion Sources**: Tags, categories, title words (3+ characters)

#### Image Utilities

##### `src/lib/imagePathResolver.ts`
**Purpose**: Image path resolution and optimization utilities

**Functions**:

```typescript
function resolveContentImagePath(path: string): string
```
- **Arguments**: `path` - Image path from content repository
- **Returns**: Public URL path for the image
- **Error Handling**: 
  - Input validation (non-empty string)
  - Fallback to placeholder image on error
  - Path sanitization and trimming
  - URL validation for external links
- **Path Transformations**:
  - `content/uploads/...` → `/images/uploads/...`
  - `uploads/...` → `/images/uploads/...`
  - Preserves `/images/...` paths
  - Handles external URLs

```typescript
function getOptimizedImagePath(src: string, width: number): string
```
- **Arguments**: 
  - `src` - Source image path
  - `width` - Target width in pixels
- **Returns**: Optimized image path with WebP format
- **Error Handling**: 
  - Input validation for both parameters
  - Width validation (positive number)
  - Path sanitization and cleaning
  - Fallback dimensions and paths
- **Optimization Logic**:
  - Generates WebP format paths
  - Removes duplicate `/images/` segments
  - Validates and cleans file extensions
  - Ensures integer width values

##### `src/lib/slugify.ts`
**Purpose**: URL slug generation utility

**Functions**:

```typescript
function slugifyTag(value: string): string
```
- **Arguments**: `value` - String to convert to URL-safe slug
- **Returns**: URL-safe slug string
- **Error Handling**: 
  - Input validation (non-empty string)
  - Fallback to "untitled" for invalid input
  - Length limiting (100 characters max)
  - Unicode normalization
- **Processing Steps**:
  - Convert to lowercase
  - Unicode normalization (NFD)
  - Remove diacritics
  - Replace non-alphanumeric with hyphens
  - Remove leading/trailing hyphens
  - Collapse multiple hyphens

#### SEO Utilities (`src/lib/seo/`)

##### `src/lib/seo/index.ts`
**Purpose**: SEO-related utility functions

**Functions** (commonly implemented):
- Meta tag generation
- Structured data creation
- Canonical URL handling
- Open Graph tag generation

### Page Components (`src/pages/`)

#### `src/pages/search-index.json.ts`
**Purpose**: Build-time endpoint generating static search index

**Export**:
```typescript
async function GET(): Promise<Response>
```
- **Arguments**: None (Astro endpoint)
- **Returns**: JSON response with search index
- **Content**: Array of posts with slug, title, excerpt, tags, category, date
- **Usage**: Client-side search functionality

#### Route Structure
- **Dynamic Routes**: `[...slug].astro` for flexible routing
- **Category Pages**: `/categories/[category]/page/[page].astro`
- **Tag Pages**: `/tags/[tag]/index.astro`
- **Post Pages**: `/posts/[slug]/index.astro`
- **Archive Pages**: `/archives/[year]/index.astro`

### Layouts (`src/layouts/`)

#### `src/layouts/BaseLayout.astro`
**Purpose**: Base HTML structure and meta tags

**Features**:
- HTML document structure
- Meta tag management
- CSS/JS inclusion
- Theme integration
- PWA head tags

#### `src/layouts/PostLayout.astro`
**Purpose**: Individual post layout

**Features**:
- Post content rendering
- Hero image handling
- Author information
- Related posts
- Social sharing
- Comments integration

### Components (`src/components/`)

#### Component Structure
```
src/components/
├── common/          # Shared UI components
├── seo/            # SEO-specific components
├── features/       # Feature-specific components
├── navigation/     # Navigation components
└── content/        # Content display components
```

#### Key Components

##### Navigation Components
- **Header**: Main site navigation
- **Footer**: Site footer with links
- **Breadcrumbs**: Page navigation trail

##### Content Components
- **PostCard**: Post preview cards
- **PostMeta**: Post metadata display
- **PostContent**: MDX content rendering
- **SearchBox**: Search input component

##### Feature Components
- **ImageZoom**: Custom image zoom modal
- **PWAHead**: PWA meta tags and service worker
- **ThemeToggle**: Dark/light mode switcher

### Build Scripts (`src/scripts/`)

#### `src/scripts/optimizeImages.js`
**Purpose**: Image optimization during build process

**Functions**:
```javascript
async function optimizeImage(inputPath, outputDir, config)
```
- **Arguments**: 
  - `inputPath` - Source image file path
  - `outputDir` - Output directory path
  - `config` - Image configuration object
- **Returns**: Promise resolving when optimization complete
- **Features**:
  - Multiple resolution generation
  - Format conversion (WebP, original)
  - Quality optimization
  - Caching via timestamps

```javascript
function getImageConfig()
```
- **Arguments**: None
- **Returns**: Image configuration from current config
- **Purpose**: Dynamic configuration loading

#### `src/scripts/prebuild.js`
**Purpose**: Pre-build setup and directory creation

**Functions**:
```javascript
function createDirectories(dirs)
```
- **Arguments**: `dirs` - Array of directory paths to create
- **Returns**: Promise resolving when directories created
- **Purpose**: Ensure required directories exist before build

### Type Definitions (`src/types/`)

#### `src/types/content.ts`
**Purpose**: Content-related type definitions

**Key Types**:
```typescript
interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    excerpt: string;
    date: Date;
    category: string;
    tags: string[];
    featured?: boolean;
    author: string;
    heroImage?: string;
  };
}

interface SearchResult {
  post: BlogPost;
  score: number;
  matches: string[];
}

interface CategoryStats {
  category: string;
  count: number;
  latestPost?: BlogPost;
}

interface TagStats {
  tag: string;
  count: number;
  posts: BlogPost[];
}

interface PostsByYear {
  [year: string]: BlogPost[];
}
```

## 🔧 Configuration Reference

### Main Configuration Structure
```typescript
interface BlogConfig {
  site: SiteConfig;
  branding: BrandingConfig;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  social: SocialLink[];
  layout: LayoutConfig;
  about: AboutPageConfig;
  legal: LegalPagesConfig;
  pwa: PWAConfig;
  imageResolutions: ImageResolutionsConfig;
  contact: ContactPageConfig;
}
```

### Theme Presets
```typescript
THEME_PRESETS = {
  blue: { primary: {...}, secondary: {...} },
  green: { primary: {...}, secondary: {...} },
  purple: { primary: {...}, secondary: {...} },
  orange: { primary: {...}, secondary: {...} }
}
```

## 🚀 Build Process

### Build Steps
1. **Pre-build**: Create necessary directories
2. **Image Optimization**: Generate responsive images
3. **Content Processing**: Process MDX files
4. **Static Generation**: Generate HTML pages
5. **PWA Generation**: Create manifest and service worker
6. **Search Index**: Generate static search index

### Available Scripts
```json
{
  "dev": "astro dev",
  "build": "node src/scripts/prebuild.js && npm run optimize-images && astro build",
  "preview": "astro preview",
  "optimize-images": "node src/scripts/optimizeImages.js",
  "update-content": "Content update script"
}
```

## 🔍 Search System Architecture

### Search Index Generation
1. **Build Time**: `search-index.json.ts` generates static index
2. **Content**: Includes slug, title, excerpt, tags, category, date
3. **Client Side**: JavaScript loads and searches index
4. **Performance**: No server-side search required

### Search Algorithms
1. **Basic Search**: All terms must match (AND logic)
2. **Scored Search**: Weighted scoring by content type
3. **Suggestions**: Prefix matching on tags/categories

## 🖼️ Image Processing Pipeline

### Image Resolutions
- **Card**: 320px (thumbnails)
- **Content**: 640px (post content)
- **Zoom**: 1280px (zoom modal)
- **Additional**: 1920px (high-res displays)

### Format Support
- **WebP**: Primary format for modern browsers
- **Original**: Fallback format preservation
- **Quality**: Configurable per format

### Processing Flow
1. **Input**: Original images from content repository
2. **Processing**: Generate multiple resolutions and formats
3. **Caching**: Skip already processed images
4. **Output**: Organized in `/public/images/optimized/`

## 🌐 PWA System

### Auto-Generation Features
- **Icons**: Generated from branding configuration
- **Colors**: Derived from theme colors
- **Shortcuts**: Generated from navigation links
- **Manifest**: Dynamic creation from site config

### Service Worker Features
- **Offline Support**: Cache static assets
- **Install Prompt**: Custom installation UI
- **Update Handling**: Automatic updates

## 📊 Performance Optimizations

### Build-Time Optimizations
- **Static Generation**: All pages pre-rendered
- **Image Optimization**: Multiple formats and sizes
- **CSS Purging**: Unused styles removed
- **Code Splitting**: Optimal bundle sizes

### Runtime Optimizations
- **Lazy Loading**: Images loaded on demand
- **Caching**: Client-side caching strategies
- **WebP Detection**: Format selection based on support
- **Search Index**: Static JSON for instant search

## 🔒 Type Safety

### TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **Interface Definitions**: Comprehensive type coverage
- **Generic Types**: Reusable type patterns
- **Error Handling**: Typed error responses

### Key Interfaces
- Configuration interfaces for all settings
- Content interfaces for posts and metadata
- Component prop interfaces
- API response interfaces

## 🛠️ Development Workflow

### Hot Reload
- **Configuration Changes**: Instant preview
- **Content Changes**: Automatic regeneration
- **Style Changes**: Live CSS updates
- **Component Changes**: Fast refresh

### Debugging
- **Error Logging**: Comprehensive console output
- **Type Checking**: Real-time TypeScript validation
- **Build Feedback**: Detailed build information
- **Performance Monitoring**: Lighthouse integration

This technical specification provides the foundation for understanding and extending the FinHux Blog CMS codebase. All functions include robust error handling, input validation, and comprehensive logging for production reliability.
