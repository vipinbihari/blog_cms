# FinHux Blog CMS

A highly configurable, multi-niche blog template built with Astro, TypeScript, and Tailwind CSS. Originally created as a stock market blog, it has been transformed into a universal blog template system that supports multiple niches with zero hardcoding.

## 🚀 Features

### Core Features
- **🔧 Configuration-Driven**: Everything configurable via single config file - no hardcoding
- **📱 Multi-Niche Support**: Technology, Lifestyle, Finance, Food, Travel blogs
- **🎨 Theme System**: 4 pre-built color schemes (Blue, Green, Purple, Orange)
- **📈 Progressive Web App (PWA)**: Auto-generated PWA with offline support
- **🖼️ Advanced Image System**: Custom zoom modal, WebP optimization, responsive sizing
- **🌙 Dark Mode**: Full dark mode support with automatic switching
- **🔍 Search System**: Advanced search with scoring and suggestions
- **📊 SEO Optimized**: Meta tags, structured data, sitemaps

### Technical Features
- **⚡ Performance**: Static site generation with Lighthouse optimization
- **🔒 Type Safety**: Full TypeScript with comprehensive interfaces
- **📦 Modular Architecture**: Feature-based utilities and reusable components
- **🛠️ Developer Experience**: Hot reload, instant preview of configuration changes
- **🔄 Content Management**: Separated content architecture via symlinks

## 📋 Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: For content repository management

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd blog_cms

# Install dependencies
npm install
```

### 2. Content Setup

```bash
# Create symlink to your content repository
# Replace with your actual content repository path
ln -sf /path/to/your/blog_content/content ./src/content
ln -sf /path/to/your/blog_content/public/images ./public/images
```

### 3. Configuration

Edit `src/config/current-config.ts` to customize your blog:

```typescript
export const BLOG_CONFIG: BlogConfig = {
  site: {
    name: 'Your Blog Name',
    tagline: 'Your Blog Tagline',
    description: 'Your blog description',
    url: 'https://yourblog.com',
    // ... more config
  },
  // ... theme, branding, navigation, etc.
};
```

### 4. Development

```bash
# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

### 5. Build & Deploy

```bash
# Optimize images (optional, runs automatically during build)
npm run optimize-images

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
blog_cms/
├── src/
│   ├── config/           # Configuration system
│   │   ├── current-config.ts    # Active blog configuration
│   │   └── blog-template.ts     # Template interfaces & presets
│   ├── lib/              # Utility functions
│   │   ├── content/      # Content queries & search
│   │   ├── seo/          # SEO utilities
│   │   └── images/       # Image processing
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route definitions
│   └── content/          # Blog posts (symlinked)
├── public/               # Static assets
│   └── images/           # Images (symlinked)
└── dist/                 # Built output
```

## ⚙️ Configuration Guide

### Site Configuration

```typescript
site: {
  name: 'Your Site Name',           // Used in title, PWA name
  tagline: 'Your Tagline',          // Subtitle/description
  description: 'Site description',   // Meta description
  url: 'https://yoursite.com',      // Canonical URL
  author: 'Author Name',            // Default post author
  email: 'contact@yoursite.com',    // Contact email
  language: 'en',                   // Language code
  locale: 'en-US'                   // Locale for dates
}
```

### Theme Configuration

```typescript
theme: {
  colors: {
    primary: THEME_PRESETS.green.primary,    // Choose: blue, green, purple, orange
    secondary: THEME_PRESETS.green.secondary
  },
  darkMode: true    // Enable/disable dark mode
}
```

### Navigation Configuration

```typescript
navigation: {
  header: [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/categories/category-name/page/1' },
    // ... more nav items
  ],
  footer: [
    {
      title: 'Section Title',
      links: [
        { label: 'Link', href: '/link' },
        // ... more links
      ]
    }
  ]
}
```

## 🎨 Available Themes

- **Blue**: Professional, corporate look
- **Green**: Finance, eco-friendly themes
- **Purple**: Creative, tech-focused
- **Orange**: Energy, food, lifestyle

## 📱 PWA Configuration

The PWA system auto-generates based on your existing configuration:

```typescript
pwa: {
  enabled: true,
  name: `${siteName} - ${tagline}`,     // Auto-derived
  themeColor: undefined,                // Uses theme.colors.primary[600]
  backgroundColor: undefined,           // Uses theme.colors.primary[50]
  icons: 'auto',                       // Auto-generates from branding.logo
  shortcuts: 'auto'                    // Auto-generates from navigation
}
```

## 🖼️ Image Management

### Image Resolutions

```typescript
imageResolutions: {
  card: 320,           // Thumbnail images
  content: 640,        // Content images
  zoom: 1280,          // Zoom modal images
  additional: [1920],  // High-res displays
  formats: ['webp', 'original'],  // Output formats
  quality: { webp: 80, jpg: 80 }  // Quality settings
}
```

### Optimize Images

```bash
# Optimize all images
npm run optimize-images

# Images are automatically optimized during build
npm run build
```

## 📝 Content Management

### Blog Posts

Create MDX files in `src/content/posts/`:

```yaml
---
title: "Your Post Title"
excerpt: "Brief description"
date: 2025-01-01
category: "your-category"
tags: ["tag1", "tag2"]
featured: true
author: "Author Name"
heroImage: "uploads/your-image.jpg"
---

Your content here...
```

### Categories

Configure available categories in your config:

```typescript
categories: [
  'technical-analysis',
  'fundamental-analysis',
  'market-news'
]
```

## 🔍 Search System

Built-in search features:
- **Full-text search**: Searches title, excerpt, tags, category
- **Weighted scoring**: Title matches scored higher than tag matches
- **Search suggestions**: Auto-complete based on tags and categories
- **Static search index**: Generated at build time for instant search

## 🚀 Deployment

### Static Hosting (Recommended)

```bash
# Build the project
npm run build

# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - Cloudflare Pages
# - GitHub Pages
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run optimize-images  # Optimize images
npm run update-content   # Update content from repository
```

## 🔧 Customization

### Adding New Niches

1. Copy an existing config template
2. Modify site details, theme, navigation
3. Update categories for your niche
4. Customize social links and branding

### Custom Components

Add components to `src/components/` and import in layouts:

```typescript
---
import CustomComponent from '../components/CustomComponent.astro';
---

<CustomComponent />
```

### Custom Styling

The project uses Tailwind CSS. Customize in:
- `tailwind.config.mjs`: Theme customization
- Theme presets in `src/config/blog-template.ts`

## 🐛 Troubleshooting

### Common Issues

**Build fails**: Check TypeScript errors with `npx tsc --noEmit`

**Images not showing**: Verify symlinks are created correctly

**PWA not working**: Ensure HTTPS in production

**Search not working**: Check search index generation in build output

### Development Tips

- Use `npm run dev` for hot reload during development
- Check browser console for detailed error messages
- Verify configuration syntax in `current-config.ts`
- Test PWA functionality with production build

## 📄 Technical Documentation

For detailed technical documentation about files, functions, and architecture, see `technical_spec.md`.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check existing issues in the repository
- Create a new issue with detailed description
- Include configuration and error messages
- **🎨 Perfect Theme Integration**: PWA colors automatically match your chosen theme preset
- **✨ High-Quality Graphics**: Uses your high-resolution ogImage (512px) for splash screens
- **📵 Native App Experience**: Standalone mode provides true native feel without browser UI
- **🔄 Auto-Generated Assets**: Icons and shortcuts automatically generated from branding and navigation
- **🌐 Offline Support**: Basic offline functionality with service worker caching
- **⚙️ Multi-Niche Ready**: Adapts automatically to finance, tech, lifestyle, food, travel blogs

### PWA Configuration
```typescript
// Ultra-minimal PWA setup in src/config/current-config.ts
pwa: {
  enabled: true,
  description: 'Your niche-specific description',
  categories: ['finance', 'education', 'business'], // Niche-specific
  // Everything else auto-generated from existing config! 🎉
  icons: 'auto', shortcuts: 'auto', themeColor: undefined
}
```

**📚 Documentation**: See `PWA_CONFIGURATION_GUIDE.md` for complete setup instructions

---

## 6  Project Structure (Top-Level)

```
├── content/               # Content submodule (symlink from blog_content repo)
│   ├── posts/             # Blog posts in MDX format
│   └── uploads/           # Blog post images
├── public/                # Static assets (images, icons, fonts…)
├── src/
│   ├── components/        # .astro components
│   ├── config/            # Typed configuration system
│   ├── content/           # Content collection config
│   ├── lib/               # Reusable TS utilities (SEO, images…)
│   ├── pages/             # Route definitions
│   └── types/             # Shared TS types
└── tailwind.config.mjs    # Tailwind design tokens
```

A deeper technical breakdown lives in **`technical_implementation.md`**.

### 6.2 Content Architecture

This blog uses a separated content architecture:

- **Blog code** lives in this repository
- **Blog content** (posts and images) lives in a separate repository (`/blog_content`)

The content is integrated using symbolic links:
- `/blog_content/posts` → `/blog_cms/src/content/posts`
- `/blog_content/uploads` → `/blog_cms/public/images/uploads`

This separation allows:
- Independent versioning of content and code
- Easier content management and editing
- Automated rebuilds when content changes (via GitHub Actions)

---

## 6.1 Carousel & Card Interactivity

- The homepage carousels (featured/latest posts) support smooth drag scrolling and clickable post cards.
- **Featured posts carousel only shows posts with `featured: true`.** There is no fallback to regular posts if there are not enough featured posts.
- **Fully clickable post cards:** The entire post card is now clickable to navigate to the post. Category links still maintain their specific functionality when clicked.
- **Consistent theme colors:** Post dates now use primary theme colors (matching author name styling) for visual consistency across the site.
- **Navigation dots** below each carousel match the number of posts and show post numbers for clarity.
- **Dark mode accessibility:** All carousel controls and dots have high-contrast colors in dark mode.
- **Known issue:** If you add custom wrappers around `PostCard`, ensure they do not block pointer events.

---

## 7  Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Static production build |
| `npm run preview` | Preview production build locally |
| `npm run optimize-images` | Pre-optimise images for best Lighthouse scores |

---

## 8  Support & Contributing

• Open an Issue or Discussion on GitHub.  
• PRs are welcome – please follow conventional commits and include tests where practical.

---

#### License

MIT © Your Name
