# 🚀 Universal Blog Template System

A **highly configurable, multi-niche blog template** built with Astro, TypeScript, and Tailwind CSS. Transform this into any type of blog (technology, lifestyle, finance, food, travel, etc.) with just configuration changes.

## ✨ Features

### 🎨 **Multi-Niche Support**
- **5 Pre-built Niches**: Technology, Lifestyle, Finance, Food, Travel
- **Custom Niches**: Create your own with custom categories and navigation
- **Switch Instantly**: Change niche with simple configuration updates

### 🎭 **Complete Theming System**
- **4 Pre-built Themes**: Blue, Green, Purple, Orange color schemes
- **Custom Themes**: Define your own color palettes
- **Dark Mode**: Automatic dark/light mode switching
- **Typography Control**: Customizable fonts and sizes

### 🎯 **Configurable Branding**
- **Logo Support**: Image logos with light/dark variants or text-only
- **Brand Colors**: Primary, secondary, and accent color schemes
- **Social Integration**: 8+ social platforms with custom icons

### 📝 **Legal Pages Support**
- **Privacy Policy**: Fully configurable privacy policy page
- **Terms of Service**: Customizable terms of service page
- **Disclaimer**: Industry-specific disclaimer page
- **Centralized Management**: All legal content managed through configuration
- **Navigation**: Dynamic header and footer navigation

### 📰 **Enhanced Content Curation**
- **Manual Featured Posts**: Handpick articles to showcase on your homepage using a simple `featured: true` flag in the post's frontmatter.
- **Separate Latest Posts Grid**: The homepage now intelligently displays a dedicated section for your newest content, distinct from featured articles, ensuring visitors always see fresh posts.
- **Improved Homepage Layout**: Clearer separation between curated featured content and chronological latest posts for a better user experience.

### 📱 **Modern Web Standards**
- **TypeScript**: Full type safety and IntelliSense
- **Responsive Design**: Mobile-first with touch-friendly interactions
- **Performance**: Optimized images, lazy loading, and fast builds
- **SEO Optimized**: Meta tags, structured data, sitemaps
- **Accessibility**: WCAG compliant with ARIA labels
- **Enhanced UI Components**: Modernized share buttons and improved dark mode contrast for key elements.

### 🔧 **Developer Experience**
- **Hot Reload**: Instant updates during development
- **Build Optimization**: Automatic image optimization and asset bundling
- **Type Safety**: Comprehensive TypeScript interfaces
- **Component Library**: Reusable, configurable components

## 🚀 Quick Start

### 1. **Choose Your Niche**

Pick from pre-built templates or create custom:

```bash
# Technology Blog
cp src/config/templates/technology-blog.ts src/config/my-config.ts

# Lifestyle Blog  
cp src/config/templates/lifestyle-blog.ts src/config/my-config.ts

# Or start with current config
cp src/config/current-config.ts src/config/my-config.ts
```

### 2. **Update Configuration**

Edit `src/config/current-config.ts`:

```typescript
// Replace the export
export { TECHNOLOGY_BLOG_CONFIG as BLOG_CONFIG } from './my-config';
```

### 3. **Customize Your Brand**

Edit `my-config.ts`:

```typescript
export const MY_BLOG_CONFIG: BlogConfig = {
  site: {
    name: 'Your Blog Name',
    tagline: 'Your Tagline',
    description: 'Your description',
    url: 'https://yourdomain.com/',
    author: 'Your Name',
    email: 'your@email.com',
  },
  
  branding: {
    // Add your logo or use text-only
    // logo: {
    //   light: '/images/your-logo.svg',
    //   dark: '/images/your-logo-dark.svg',
    //   alt: 'Your Brand',
    // },
  },
  
  theme: {
    colors: {
      primary: THEME_PRESETS.blue.primary,   // Choose theme
      secondary: THEME_PRESETS.blue.secondary,
    },
  },
  
  // ... rest of configuration
};
```

### 4. **Run Development Server**

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to see your blog!

### 5. **Build & Deploy**

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── config/
│   │   ├── blog-template.ts      # Core template system
│   │   ├── current-config.ts     # Active configuration
│   │   └── templates/            # Pre-built templates
│   │       ├── technology-blog.ts
│   │       └── lifestyle-blog.ts
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── ConfigurableHeader.astro
│   │   │   └── ConfigurableFooter.astro
│   │   └── ui/                   # UI components
│   │       ├── Logo.astro
│   │       ├── Navigation.astro
│   │       ├── SocialLinks.astro
│   │       └── ThemeToggle.jsx
│   ├── content/
│   │   └── posts/                # Blog posts (MDX)
│   ├── lib/                      # Utilities
│   │   ├── content/              # Content queries
│   │   ├── seo/                  # SEO utilities  
│   │   ├── images/               # Image processing
│   │   └── pagination/           # Pagination
│   └── pages/                    # Route pages
├── public/                       # Static assets
├── BLOG_TEMPLATE_GUIDE.md        # Detailed setup guide
└── BLOG_TEMPLATE_TRANSFORMATION.md # Transformation summary
```

## 🎨 Pre-built Templates

### Technology Blog
```typescript
// Green theme, developer-focused
categories: ['web-development', 'mobile-apps', 'ai-ml', 'devops']
features: ['comments', 'syntax-highlighting', 'github-integration']
```

### Lifestyle Blog  
```typescript
// Purple theme, wellness-focused
categories: ['health-fitness', 'relationships', 'personal-growth']
features: ['newsletter', 'social-sharing', 'instagram-integration']
```

### Finance Blog
```typescript
// Blue theme, professional
categories: ['technical-analysis', 'fundamental-analysis', 'market-news']
features: ['charts', 'data-visualization', 'professional-layout']
```

### Food Blog
```typescript
// Orange theme, visual-focused
categories: ['recipes', 'cooking-tips', 'nutrition', 'reviews']
features: ['image-galleries', 'recipe-cards', 'pinterest-integration']
```

### Travel Blog
```typescript
// Blue theme, adventure-focused  
categories: ['destinations', 'travel-tips', 'budget-travel']
features: ['maps', 'photo-galleries', 'itineraries']
```

## 🔧 Configuration Options

### Site Identity
```typescript
site: {
  name: 'Blog Name',              // Site title
  tagline: 'Your Tagline',        // Optional subtitle
  description: 'Description',     // Meta description
  url: 'https://example.com/',    // Base URL
  author: 'Author Name',          // Default author
  email: 'contact@example.com',   // Contact email
  language: 'en',                 // Language code
  locale: 'en_US',               // Locale for i18n
}
```

### Branding & Design
```typescript
branding: {
  logo: {
    light: '/images/logo.svg',    // Light mode logo
    dark: '/images/logo-dark.svg', // Dark mode logo (optional)
    alt: 'Logo Alt Text',
    width: 180,
    height: 40,
  },
  favicon: '/favicon.svg',
  ogImage: '/images/og-image.jpg',
}
```

### Theme System
```typescript
theme: {
  colors: {
    primary: THEME_PRESETS.blue.primary,     // Primary colors
    secondary: THEME_PRESETS.blue.secondary, // Secondary colors
    accent: THEME_PRESETS.green.primary,     // Optional accent
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      serif: ['Georgia', 'serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
}
```

### Feature Toggles
```typescript
features: {
  darkMode: true,                 // Enable dark mode
  search: true,                   // Enable search
  rss: true,                      // Generate RSS feed
  sitemap: true,                  // Generate sitemap
  analytics: {                    // Analytics setup
    provider: 'google',
    id: 'G-XXXXXXXXXX',
  },
}
```

## 🎯 Use Cases

### Tech Companies
- **Developer Blogs**: Technical tutorials and insights
- **Product Announcements**: Feature releases and updates  
- **Documentation**: API docs and guides
- **Open Source**: Project updates and community

### Content Creators
- **Personal Brands**: Lifestyle and personal development
- **Food Bloggers**: Recipes and cooking content
- **Travel Bloggers**: Destinations and travel tips
- **Fitness Coaches**: Health and wellness content

### Businesses
- **Company Blogs**: Industry insights and thought leadership
- **Marketing**: Content marketing and customer education
- **Support**: Help articles and tutorials
- **Community**: User-generated content and forums

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Popular Hosting Options
- **Vercel**: Zero-config deployment with `vercel`
- **Netlify**: Drag-and-drop or Git integration
- **GitHub Pages**: Free hosting for public repos
- **AWS S3**: Scalable static hosting
- **Cloudflare Pages**: Fast global CDN

## 📚 Documentation

- **`BLOG_TEMPLATE_GUIDE.md`** - Comprehensive setup guide (300+ lines)
- **`BLOG_TEMPLATE_TRANSFORMATION.md`** - Complete transformation summary  
- **Template Examples** - Ready-to-use configurations
- **Type Definitions** - Full TypeScript support

## 🛠️ Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run optimize-images # Optimize images
```

### Requirements
- **Node.js** 18+ 
- **npm** or **yarn**
- **Modern browser** with ES6+ support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see `LICENSE` file for details.

## 🆘 Support

- **Issues**: GitHub Issues for bugs and feature requests
- **Discussions**: GitHub Discussions for questions
- **Documentation**: Check `BLOG_TEMPLATE_GUIDE.md` for detailed setup

---

## 🌟 What Makes This Special

1. **Zero Hardcoding**: Everything configurable through TypeScript
2. **Type Safety**: Full TypeScript support prevents errors
3. **Performance**: Optimized builds with image compression
4. **Accessibility**: WCAG compliant with proper ARIA labels
5. **SEO**: Dynamic meta tags, structured data, sitemaps
6. **Developer Experience**: Hot reload, easy customization
7. **Scalability**: Multiple blogs from same codebase

**Ready to create your blog?** Start with `BLOG_TEMPLATE_GUIDE.md` for detailed instructions!

## 🎉 Example Blogs

- **TechInsight** (Technology): Green theme, developer-focused
- **LifeVibe** (Lifestyle): Purple theme, wellness-focused  
- **StockSage** (Finance): Blue theme, market analysis
- **Your Blog** (Custom): Any theme, any niche

Transform this template into **your perfect blog** in minutes!
