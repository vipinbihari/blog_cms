# StockSage: Finance & Trading Blog CMS

## Overview

StockSage is a modern, SEO-optimized blogging platform built with Astro, designed specifically for finance and stock market content. This platform offers fast performance, excellent SEO capabilities, interactive features like quizzes, and a system via Netlify CMS.

## Key Features

### Content Management
- Netlify CMS integration with intuitive content editing
- MDX support for rich, interactive content
- Categorization with tags and primary categories
- Editorial workflow with draft, review, and publish states
- **All blog posts are now stored in `src/content/posts/` for Astro Content Collections compatibility**
- **Netlify CMS is configured to save new posts in `src/content/posts/`**
- **Robust placeholder images (via placehold.co) are used for missing hero images, OpenGraph images, and author avatars to prevent 404s and infinite requests**

### Interactive Elements
- Interactive quiz component with scoring and sharing
- Responsive images with optimization for different devices
- Table of contents for long-form articles
- Reading progress indicator
- Social media sharing integration

### User Experience
- Light and dark mode with persistent user preference
- Responsive design optimized for all devices
- Client-side search with fuzzy matching
- Related posts suggestions based on content similarity

- Newsletter signup for audience building

### SEO Optimization
- Built-in SEO with astro-seo integration
- OpenGraph and Twitter card metadata
- RSS feed with custom XSL styling
- Automatic sitemap generation
- Structured data for rich search results

### Performance
- Static site generation for incredibly fast loading
- Optimized images with responsive sizing
- Minimal JavaScript with partial hydration
- High Lighthouse scores across all metrics

### Architecture
- Built with Astro for optimal performance
- React components for interactive elements
- TailwindCSS for styling
- TypeScript for type safety
- Modular component structure for maintainability

## Getting Started

### Prerequisites
- Node.js (version 16.x or higher)
- npm (version 8.x or higher)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/blog_cms.git
   cd blog_cms
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Access the blog at `http://localhost:4321`
5. Access the CMS at `http://localhost:4321/admin`

### Building for Production

```bash
npm run build
```

The static site will be generated in the `dist` directory, ready to be deployed to any static hosting service.

## Usage

### Content Management

#### Creating a New Post

1. Navigate to the CMS at `/admin` and log in
2. Go to "Posts" collection and click "New Posts"
3. Fill in the required fields:
   - Title: The post title
   - Slug: URL-friendly version of the title (lowercase, hyphens)
   - Publish Date: When to publish the post
   - Excerpt: A brief summary for listings and SEO
   - Tags: Select relevant tags from the predefined list
   - Category: Select the primary category for the post
   - Author: Select from the available authors
   - Hero Image: Upload a featured image for the post
4. Write your content in the Markdown/MDX editor
5. Optionally add quiz questions in the Quiz section
6. Preview your post with the "Preview" button
7. Save as draft, or publish directly

#### Using the Editorial Workflow

The CMS supports a complete editorial workflow:

1. **Draft**: Initial content creation
2. **Review**: For editorial review and feedback
3. **Ready**: Approved and ready to publish

#### Managing Site Settings

Site settings can be modified through the CMS:

1. Navigate to "Site Settings" collection in the CMS
2. Edit the "General Settings" entry to update:
   - Site title and description
   - Logo and favicon
   - Default social sharing image (OG image)

### Working with Components

#### Adding Quizzes to Posts

Quizzes can be added in the frontmatter of your posts:

```yaml
quiz:
  - q: "What is the P/E ratio?"
    options:
      - "Price to Earnings Ratio"
      - "Profit to Equity Ratio"
      - "Performance Evaluation Ratio"
      - "Public Equity Ratio"
    answer: 0  # Index of the correct answer (0 = first option)
```

## Directory Structure

```
blog_cms/
├── public/             # Static assets
│   ├── admin/         # Netlify CMS configuration
│   └── images/        # Image assets
├── src/
│   ├── components/    # UI components
│   ├── content/       # Content collections (blog posts)
│   ├── data/          # Site settings and data
│   ├── layouts/       # Page layouts
│   ├── pages/         # Astro page components
│   ├── scripts/       # Utility scripts
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── astro.config.mjs   # Astro configuration
├── package.json       # Project dependencies
└── tailwind.config.mjs # Tailwind CSS configuration
```

## Technologies Used

- **Astro**: Fast, modern static site generator
- **React**: For interactive components
- **TailwindCSS**: Utility-first CSS framework
- **MDX**: Markdown with JSX support for interactive content
- **Netlify CMS**: Headless CMS for content management
- **Lunr.js**: Client-side search library

## Deployment

This blog CMS is designed to be deployed to Netlify, which provides both hosting and CMS functionality:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Enable Netlify Identity for CMS authentication
4. Enable Git Gateway for the CMS to commit changes

## Contributing

Contributions are welcome! Please check the project_status.md file for a comprehensive overview of all implemented functions and features before adding new functionality.

## License

MIT


## Project Status

For current implementation status and available functions, please refer to the [Project Status](./project_status.md) document.

## License

MIT
