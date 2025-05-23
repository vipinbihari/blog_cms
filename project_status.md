# Project Status: Blog CMS Implementation

This document tracks the implementation status of all functions in the blog CMS system. It serves as a reference for existing functionality and should be consulted before implementing new features.

## Core Components

### Project Structure

**Implementation Status**: Completed

The basic structure of the Astro project has been implemented, following the architecture specified in the PRD. This includes:

- `astro.config.mjs` for Astro configuration with MDX, React, Tailwind, and SEO integrations
- `tailwind.config.mjs` for styling configuration
- `tsconfig.json` for TypeScript configuration
- Directory structure according to PRD

## Function Documentation Template

For consistency, all implemented functions should be documented using the following format:

```
### functionName(arg1: type, arg2: type, ...): returnType

**Description**: Brief description of what the function does.

**Arguments**:
- `arg1` (type): Description of the first argument
- `arg2` (type): Description of the second argument
...

**Returns**: Description of what the function returns

**Dependencies**: List of other functions or modules this function depends on

**Example Usage**:
```code
// Example code showing how to use the function
```

**Implementation Status**: [Completed/In Progress/Planned]
```

## Modules

### Content Management

**Implementation Status**: Completed

- Content collections have been configured with Zod schema validation for posts
- Frontmatter schema for blog posts includes title, slug, date, excerpt, tags, category, author, heroImage, and optional quiz array
- **All blog posts are exclusively stored in `src/content/posts/`** (the legacy `content/posts/` directory has been removed)
- Netlify CMS config properly configured to use `src/content/posts/` as the folder for new posts
- Standardized image paths and formats with proper error handling for missing images
- Placeholder images (via placehold.co) are used for missing hero images, OpenGraph images, and author avatars to prevent 404s and infinite requests
- Sample post on P/E ratio with frontmatter including quiz questions

### Components

**Implementation Status**: Completed

- `Header.astro`: Site header with navigation and theme toggle
- `Footer.astro`: Site footer with navigation links, social media, and newsletter signup
- `FormattedDate.astro`: Utility component for formatting dates
- `ThemeToggle.jsx`: React component for toggling between light and dark modes
- `Quiz.jsx`: Interactive quiz component that renders questions from post frontmatter
- `PageNavigation.astro`: Reusable pagination control component for all paginated pages
- `RelatedPosts.astro`: Component that displays related post suggestions based on tags and categories
- `ShareButtons.jsx`: React component that provides social media sharing functionality for blog posts
- `AuthorBio.astro`: Component that displays information about the post author with social links and robust fallback for missing images (uses placehold.co if avatar is missing)
- `TableOfContents.jsx`: React component that automatically generates navigation for long-form articles, scopes only to blog post content headings, and highlights active sections while scrolling
- `ReadingProgress.jsx`: React component that shows a progress bar indicating reading position in articles
- `ResponsiveImage.astro`: Component that optimizes images for different screen sizes and improves loading performance
- `NewsletterSignup.astro`: Component that allows users to subscribe to the blog's newsletter

### Layouts

**Implementation Status**: Completed

- `BaseLayout.astro`: Core layout component used across all pages, handles common HTML structure, meta tags, SEO and imports global CSS
- `PostLayout.astro`: Blog post layout that extends BaseLayout, handles rendering of post content, metadata, quiz component, and uses robust fallback for missing images and URLs

### Pages

**Implementation Status**: Completed

- `index.astro`: Homepage with featured posts and category sections
- `posts/[slug].astro`: Dynamic route for individual blog posts
- `posts/index.astro`: Redirect to first page of blog archive
- `posts/page/[page].astro`: Paginated blog archive showing all posts chronologically
- `categories/index.astro`: Page listing all available categories with post counts
- `categories/[category]/[page].astro`: Paginated category archives showing posts by category
- `tags/index.astro`: Page listing all available tags with post counts
- `tags/[tag]/[page].astro`: Paginated tag archives showing posts by tag
- `404.astro`: Custom error page with suggested posts for better user experience
- `rss.xml.js`: RSS feed generation with custom XSL styling for better readability

### CSS and Styling

**Implementation Status**: Completed

- Global CSS with Tailwind integration
- Custom CSS variables for theming (light/dark mode)
- Utility classes for common styling patterns
- Typography styling for content

### CMS Integration

**Implementation Status**: Completed

- Netlify CMS configuration with enhanced content model matching blog post schema
- Predefined selectable options for categories, tags, and authors
- Editorial workflow with draft, review, and publish states
- Rich content editing with markdown support
- Site settings management through the CMS
- User-friendly admin interface with helpful hints and validation
- Local backend support for development

### SEO

**Implementation Status**: Completed

- Integration with astro-seo for metadata management
- OpenGraph and Twitter card configurations for posts and homepage
- RSS feed for content syndication
- Automatic sitemap generation through @astrojs/sitemap integration

### Build Scripts

**Implementation Status**: Completed

- `prebuild.js`: Script that runs before the main Astro build process

### Utils

**Implementation Status**: Completed

- `getRelatedPosts.ts`: Functions to find related posts based on tags, categories, and other metadata
- `seoUtils.ts`: Functions for generating SEO metadata, OpenGraph tags, and Twitter cards
- `dateUtils.ts`: Functions for formatting and manipulating dates
- `contentUtils.ts`: Functions for content organization and filtering

### General UI/UX Enhancements

**Implementation Status**: In Progress

- **Implemented placeholder images for `heroImage` in `PostLayout.astro`, `index.astro` (featured posts), `RelatedPosts.astro`, category archive pages (`src/pages/categories/[category]/[page].astro`), and tag archive pages (`src/pages/tags/[tag]/[page].astro`) to prevent 404s and improve visual consistency.**
- **Updated OpenGraph image fallbacks in `PostLayout.astro`, category archive pages, and tag archive pages to use placeholder images.**
- **Corrected post link generation from `post.data.slug` to `post.slug` in `index.astro`, `RelatedPosts.astro`, category, and tag archive pages for consistency with Astro's `getCollection` API.**
- **Added AI-powered blog post generation capability as a separate module under the `/llm` directory with its own server setup, API, and UI components. This module is completely isolated from the main blog and designed to be deployed independently on a separate server.**

### CI/CD

**Implementation Status**: Completed

- GitHub Actions workflow configured for automatic deployment to GitHub Pages
- Deployment triggered on pushes to the main branch
- Build workflow includes dependencies installation and static site generation

## Component Functions

### Quiz.jsx Component

#### handleSelectOption(questionIndex: number, optionIndex: number): void

**Description**: Handles user selection of an answer option for a quiz question

**Arguments**:
- `questionIndex` (number): Index of the question being answered
- `optionIndex` (number): Index of the selected option

**Returns**: void

**Dependencies**: React state management (useState)

**Implementation Status**: Completed

#### handleSubmitQuiz(): void

**Description**: Calculates score and shows results when user submits quiz

**Arguments**: None

**Returns**: void

**Dependencies**: React state management (useState)

**Implementation Status**: Completed

#### handleResetQuiz(): void

**Description**: Resets the quiz state to allow retaking the quiz

**Arguments**: None

**Returns**: void

**Dependencies**: React state management (useState)

**Implementation Status**: Completed

#### handleShareResults(): void

**Description**: Shares quiz results via Web Share API or copies to clipboard

**Arguments**: None

**Returns**: void

**Dependencies**: Browser Web Share API or clipboard API

**Implementation Status**: Completed

### ThemeToggle.jsx Component

#### toggleTheme(): void

**Description**: Toggles between light and dark theme and stores preference in localStorage

**Arguments**: None

**Returns**: void

**Dependencies**: React state management (useState), localStorage API

**Implementation Status**: Completed



### ShareButtons.jsx Component

#### copyToClipboard(): Promise<void>

**Description**: Copies the current page URL to clipboard and shows a success message

**Arguments**: None

**Returns**: Promise<void>

**Dependencies**: Web Clipboard API

**Implementation Status**: Completed

### TableOfContents.jsx Component

#### generateTOC(): void

**Description**: Scans the article content for headings and builds a navigation structure

**Arguments**: None

**Returns**: void

**Dependencies**: DOM manipulation, React state management (useState, useEffect)

**Implementation Status**: Completed

#### trackActiveHeading(): void

**Description**: Tracks the currently visible heading as the user scrolls through the article

**Arguments**: None

**Returns**: void

**Dependencies**: Browser scroll events, React state management (useState, useEffect)

**Implementation Status**: Completed

### ReadingProgress.jsx Component

#### updateReadingProgress(): void

**Description**: Calculates and updates the reading progress percentage based on scroll position

**Arguments**: None

**Returns**: void

**Dependencies**: Browser scroll events, React state management (useState, useEffect)

**Implementation Status**: Completed



#### handleSubmit(e: Event): void



**Arguments**:
- `e` (Event): Form submission event

**Returns**: void

**Dependencies**: React state management (useState)

**Implementation Status**: Completed

#### handleLike(id: number): void



**Arguments**:


**Returns**: void

**Dependencies**: React state management (useState)

**Implementation Status**: Completed

### PageNavigation.astro Component

**Description**: Reusable pagination control component that provides consistent navigation UI for all paginated pages

**Props**:
- `page` (Object): The Astro pagination object that contains:
  - `url.prev` (string | undefined): URL to the previous page
  - `url.next` (string | undefined): URL to the next page
  - `currentPage` (number): Current page number
  - `lastPage` (number): Total number of pages

**Usage**:
```astro
<PageNavigation page={page} />
```

**Implementation Status**: Completed

## Astro Routes

### getStaticPaths(): Object[]

**Description**: Generates static paths for all blog posts during build

**Arguments**: None

**Returns**: Array of objects with params and props for each blog post

**Dependencies**: `getCollection` from Astro content API

**Implementation Status**: Completed

### getStaticPaths({ paginate }): Object[]

**Description**: Generates paginated static paths for category pages during build

**Arguments**:
- `paginate` (Function): Astro's paginate helper function

**Returns**: Array of paginated routes with params and props for each category page

**Dependencies**: `getCollection` from Astro content API, Astro's pagination system

**Implementation Status**: Completed

### Utils Functions

#### getRelatedPosts.ts

##### getRelatedPosts(currentPost: Post, allPosts: Post[], limit: number = 3): Post[]

**Description**: Gets related posts based on post tags and category

**Arguments**:
- `currentPost` (Post): The current post to find related content for
- `allPosts` (Post[]): Array of all blog posts
- `limit` (number): Maximum number of related posts to return (default: 3)

**Returns**: Array of related posts sorted by relevance

**Implementation Status**: Completed

##### getSuggestedPosts(allPosts: Post[], limit: number = 3): Post[]

**Description**: Gets suggested posts for 404 page

**Arguments**:
- `allPosts` (Post[]): Array of all blog posts
- `limit` (number): Maximum number of posts to suggest (default: 3)

**Returns**: Array of recent posts

**Implementation Status**: Completed

#### contentUtils.ts

##### groupPostsByYear(posts: Post[]): Record<string, Post[]>

**Description**: Groups blog posts by year for archive views

**Arguments**:
- `posts` (Post[]): Array of blog posts

**Returns**: Object with years as keys and arrays of posts as values

**Implementation Status**: Completed

##### getFeaturedPosts(posts: Post[], limit: number = 4): Post[]

**Description**: Gets featured posts (newest and with highest quality content)

**Arguments**:
- `posts` (Post[]): Array of blog posts
- `limit` (number): Maximum number of featured posts to return

**Returns**: Array of featured posts

**Implementation Status**: Completed

##### getPostsByCategory(posts: Post[], category: string): Post[]

**Description**: Filters posts by category

**Arguments**:
- `posts` (Post[]): Array of blog posts
- `category` (string): Category to filter by

**Returns**: Array of posts in the specified category

**Implementation Status**: Completed

##### getPostsByTag(posts: Post[], tag: string): Post[]

**Description**: Filters posts by tag

**Arguments**:
- `posts` (Post[]): Array of blog posts
- `tag` (string): Tag to filter by

**Returns**: Array of posts with the specified tag

**Implementation Status**: Completed

##### searchPosts(posts: Post[], query: string): Post[]

**Description**: Searches posts by keyword

**Arguments**:
- `posts` (Post[]): Array of blog posts
- `query` (string): Search query

**Returns**: Array of posts matching the search query

**Implementation Status**: Completed

#### dateUtils.ts

##### formatDate(date: Date, formatStyle: 'long' | 'medium' | 'short' = 'long'): string

**Description**: Formats a date for display

**Arguments**:
- `date` (Date): Date to format
- `formatStyle` (string): Optional format style (default: 'long')

**Returns**: Formatted date string

**Implementation Status**: Completed

##### getRelativeTime(date: Date, baseDate: Date = new Date()): string

**Description**: Gets relative time (e.g., "2 days ago")

**Arguments**:
- `date` (Date): Date to format
- `baseDate` (Date): Date to compare against (default: current date)

**Returns**: Relative time string

**Implementation Status**: Completed

##### getISODate(date: Date): string

**Description**: Creates a machine-readable ISO date string for structured data

**Arguments**:
- `date` (Date): Date to format

**Returns**: ISO date string

**Implementation Status**: Completed

##### getYearMonth(date: Date): { year: string; month: string }

**Description**: Gets year and month for archive URLs

**Arguments**:
- `date` (Date): Date to format

**Returns**: Object with year and month strings

**Implementation Status**: Completed

### LLM Module

#### Blog Generation

##### generateBlogPostFromLLM(topicDescription: string, youtubeLink?: string, blogLinks?: string[], model?: AIModel): Promise<string>

**Description**: Generates a complete blog post in MDX format using the specified AI model

**Arguments**:
- `topicDescription` (string): Description of the blog topic
- `youtubeLink` (string, optional): Reference YouTube video link
- `blogLinks` (string[], optional): Array of reference blog links
- `model` (AIModel, optional): AI model to use (OpenAI GPT-4o or Google Gemini 2.5 Pro)

**Returns**: Promise resolving to MDX content string

**Dependencies**:
- OpenAI API
- Google Gemini API

**Implementation Status**: Completed

### Image Generation Module

#### Image Generation

##### generateImage(prompt: string, size?: ImageSize, qualityOrOutputPath?: ImageQuality | string, outputPath?: string): Promise<string>

**Description**: Generates an image using OpenAI's GPT Image 1 model based on a text prompt

**Arguments**:
- `prompt` (string): Text description of the image to generate
- `size` (ImageSize, optional): Size of the image to generate (default: 1024x1024)
- `qualityOrOutputPath` (ImageQuality | string, optional): Either the quality setting or the output path
- `outputPath` (string, optional): Path where the generated image should be saved

**Available Image Sizes**:
- `SQUARE`: 1024x1024 (Square format - cheapest option)
- `PORTRAIT`: 1024x1536 (Portrait/tall format)
- `LANDSCAPE`: 1536x1024 (Landscape/wide format)

**Available Quality Settings**:
- `HIGH`: Highest quality with more detail ($0.167-$0.25 per image)
- `MEDIUM`: Medium quality, balanced between detail and speed ($0.042-$0.063 per image)
- `LOW`: Lower quality but faster generation ($0.011-$0.016 per image)
- `AUTO`: Automatically select the best quality (default)

**Pricing Matrix**:

| Quality | 1024x1024 | 1024x1536 | 1536x1024 |
|---------|-----------|-----------|----------|
| Low     | $0.011    | $0.016    | $0.016   |
| Medium  | $0.042    | $0.063    | $0.063   |
| High    | $0.167    | $0.25     | $0.25    |


**Returns**: Promise resolving to image URL or file path (if outputPath provided)

**Dependencies**:
- OpenAI API

**Example Usage**:
```typescript
// Generate and save an image with default quality (AUTO)
await generateImage(
  'A professional illustration of cryptocurrency trading in India',
  ImageSizes.SQUARE,
  'public/images/hero-images/crypto-trading.png'
);

// Generate high quality landscape image (most expensive option)
await generateImage(
  'A professional illustration of cryptocurrency trading in India',
  ImageSizes.LANDSCAPE,
  ImageQuality.HIGH,
  'public/images/hero-images/crypto-trading-hd.png'
);

// Generate low quality portrait image (cost-effective option)
await generateImage(
  'A professional illustration of cryptocurrency trading in India',
  ImageSizes.PORTRAIT,
  ImageQuality.LOW,
  'public/images/hero-images/crypto-trading-portrait.png'
);
```

**Implementation Status**: Completed

## Database Schema

The application uses Astro Content Collections instead of a traditional database. The schema is defined in:

```typescript
// src/content/config.ts
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    author: z.string(),
    heroImage: z.string(),
    quiz: z.array(
      z.object({
        q: z.string(),
        options: z.array(z.string()),
        answer: z.number()
      })
    ).optional()
  })
});
```

**Note**: The `slug` field is automatically generated by Astro based on the file name, so it's not included in the schema.

**Implementation Status**: Completed
