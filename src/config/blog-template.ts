/**
 * Blog Template Configuration System
 * 
 * This configuration file allows complete customization of the blog
 * for different niches, themes, and branding requirements.
 */

// Base configuration interface
export interface FeaturesConfig {
  analytics?: {
    provider: string;
    trackingId?: string;
  };
  darkMode?: boolean;
  sitemap?: boolean;
}

export interface HeroConfigImage {
  src: string;
  alt: string;
}

export interface HeroCtaButton {
  text: string;
  url: string;
}

export interface HeroConfig {
  title?: string;
  subtitle?: string;
  ctaButton1?: HeroCtaButton;
  ctaButton2?: HeroCtaButton;
  image?: HeroConfigImage;
  showImage?: boolean;
}

export interface BlogConfig {
  // Site Identity
  site: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    author: string;
    email: string;
    language: string;
    locale: string;
  };
  
  // Branding & Visual Identity
  branding: {
    logo?: {
      light: string;
      dark?: string;
      alt: string;
      width?: number;
      height?: number;
    };
    favicon: string;
    ogImage: string;
    appleTouchIcon?: string;
    placeholderImageService?: string;
  };
  
  // Theme Configuration
  theme: {
    colors: {
      primary: ColorScale;
      secondary: ColorScale;
      accent?: ColorScale;
    };
    typography: {
      fontFamily: {
        sans: string[];
        serif?: string[];
        mono?: string[];
      };
      fontSizes: {
        base: string;
        headings: {
          h1: string;
          h2: string;
          h3: string;
          h4: string;
        };
      };
    };
    spacing: {
      container: string;
      section: string;
    };
    borderRadius?: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    boxShadow?: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    /**
     * The default theme for the site (e.g., 'light', 'dark', or 'system').
     */
    defaultTheme?: 'light' | 'dark' | 'system';
  };
  
  // Layout & Navigation
  layout: {
    postPerPage: number;
    featuredPostsCount?: number; // Number of featured posts to fetch
    relatedPostsCount?: number; // Number of related posts to show on a post page
    latestPostsOnHomepage?: number; // Number of latest posts to show on the homepage
    breadcrumbSeparator?: string;
    comments?: boolean;
    commentsProvider?: 'disqus' | 'giscus' | 'hyvor' | 'none';
    heroConfig?: HeroConfig; // Configuration for the homepage hero section
  };
  navigation: {
    header: NavigationItem[];
    footer: FooterSection[];
    // Social links are now managed globally via the top-level BLOG_CONFIG.social array
  };
  footer: {
    sections?: FooterSection[];
    copyright?: string;
    showPostsLink?: boolean;
    showTagsLink?: boolean;
    showCategoryLink?: boolean;
  };
  
  // Post Configuration
  categories: string[];
  defaultTags: string[];
  postDefaults?: {
    layouts?: Record<string, string>;
    templateContent?: string;
  };
  
  // Social Media & Integrations
  social: SocialLink[];
  integrations?: {
    googleAnalytics?: string;
    googleTagManager?: string;
    mailchimpSubscribeUrl?: string;
    disqusShortname?: string;
  };
  
  // SEO & Advanced
  seo?: {
    defaultTitle: string;
    titleTemplate: string;
    robotsDirectives?: string[];
    openGraph?: {
      type: string;
      locale: string;
      [key: string]: any;
    };
    twitterHandle?: string;
  };
  
  // Niche-specific configuration
  niche: {
    type: 'finance' | 'technology' | 'lifestyle' | 'food' | 'travel' | 'health' | 'education' | 'business' | 'custom';
    categories: string[];
    defaultTags: string[];
  };
  
  // Content Configuration
  content?: {
    showReadingTime?: boolean;
    showTableOfContents?: boolean;
    enableComments?: boolean;
    enableNewsletter?: boolean;
  };
  
  // Features Configuration
  features?: FeaturesConfig;
  
  aboutPage?: AboutPageConfig; // Optional configuration for the About Us page
  contactPage?: ContactPageConfig; // Optional configuration for the Contact page
  legalPages: LegalPagesConfig; // Required configuration for legal pages
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavigationItem[];
}

interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'facebook' | 'instagram' | 'youtube' | 'discord' | 'custom';
  url: string;
  label: string;
  icon?: string;
}

// Contact Page Configuration
interface ContactPageConfig {
  title: string;
  description: string;
  email: {
    name: string;
    address: string;
    icon?: string;
  };
  phone: {
    name: string;
    number: string;
    formattedNumber: string;
    icon?: string;
  };
  address: {
    name: string;
    location: string;
    icon?: string;
  };
  businessHours: {
    title: string;
    hours: Array<{
      days: string;
      hours: string;
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// New interfaces for About Page content
interface AboutPageCtaButton {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'outline'; // Style for different button appearances
}

interface AboutPageSectionText {
  title: string;
  content: string; // Can include simple HTML for formatting if needed
}

interface AboutPageHeroSection {
  headline: string; // Can include HTML for spans, e.g., "Text <span class='...'>Emphasized</span>"
  subheadline: string;
  ctaButton: AboutPageCtaButton;
}

interface AboutPageMissionSection {
  title: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
}

interface AboutPageOfferItem {
  icon: string; // Could be emoji or SVG path
  title: string;
  description: string;
}

interface AboutPageTeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  // socialLinks?: SocialLink[]; // Future enhancement
}

interface AboutPageValue {
  icon: string; // Could be emoji or SVG path
  name: string;
  description: string;
}

export interface AboutPageConfig {
  title: string; // SEO Title for the about page
  description: string;
  hero?: AboutPageHeroSection;
  mission?: AboutPageMissionSection;
  whoWeAre?: AboutPageSectionText;
  whatWeOffer?: {
    title: string;
    items: AboutPageOfferItem[];
  };
  values?: {
    title: string;
    items: AboutPageValue[];
  };
  team?: {
    title: string;
    members: AboutPageTeamMember[];
  };
  callToAction?: {
    headline: string;
    subheadline: string;
    buttons: AboutPageCtaButton[];
  };
}

// Legal Pages Configuration
export interface LegalPagesConfig {
  privacy: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  terms: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  disclaimer: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
}

// Pre-built theme configurations
export const THEME_PRESETS = {
  blue: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
  },
  green: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    secondary: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09',
    },
  },
  purple: {
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21b6',
      900: '#581c87',
      950: '#3b0764',
    },
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
  },
  orange: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
    secondary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006',
    },
  },
} as const;

// Niche-specific configurations
export const NICHE_PRESETS = {
  finance: {
    categories: ['technical-analysis', 'fundamental-analysis', 'market-news', 'investment-strategy', 'portfolio-management'],
    defaultTags: ['investing', 'stocks', 'market-analysis', 'finance', 'trading'],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Technical Analysis', href: '/categories/technical-analysis' },
      { label: 'Fundamental Analysis', href: '/categories/fundamental-analysis' },
      { label: 'Market News', href: '/categories/market-news' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  technology: {
    categories: ['web-development', 'mobile-apps', 'ai-ml', 'cybersecurity', 'cloud-computing', 'devops'],
    defaultTags: ['programming', 'development', 'technology', 'coding', 'software'],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Web Dev', href: '/categories/web-development' },
      { label: 'Mobile', href: '/categories/mobile-apps' },
      { label: 'AI/ML', href: '/categories/ai-ml' },
      { label: 'Tutorials', href: '/categories/tutorials' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  lifestyle: {
    categories: ['health-fitness', 'relationships', 'personal-growth', 'home-garden', 'fashion-style'],
    defaultTags: ['lifestyle', 'wellness', 'personal-development', 'tips', 'inspiration'],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Health & Fitness', href: '/categories/health-fitness' },
      { label: 'Relationships', href: '/categories/relationships' },
      { label: 'Personal Growth', href: '/categories/personal-growth' },
      { label: 'Home & Garden', href: '/categories/home-garden' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  food: {
    categories: ['recipes', 'cooking-tips', 'nutrition', 'restaurant-reviews', 'food-culture'],
    defaultTags: ['food', 'recipes', 'cooking', 'nutrition', 'culinary'],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Recipes', href: '/categories/recipes' },
      { label: 'Cooking Tips', href: '/categories/cooking-tips' },
      { label: 'Nutrition', href: '/categories/nutrition' },
      { label: 'Reviews', href: '/categories/restaurant-reviews' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  travel: {
    categories: ['destinations', 'travel-tips', 'budget-travel', 'luxury-travel', 'food-travel'],
    defaultTags: ['travel', 'destinations', 'adventure', 'culture', 'exploration'],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Destinations', href: '/categories/destinations' },
      { label: 'Travel Tips', href: '/categories/travel-tips' },
      { label: 'Budget Travel', href: '/categories/budget-travel' },
      { label: 'Luxury Travel', href: '/categories/luxury-travel' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
} as const;

// Export current configuration (this will be the active config)
export { BLOG_CONFIG } from './current-config';

// Utility functions for theme and config management
export const createTheme = (colors: { primary: ColorScale; secondary: ColorScale; accent?: ColorScale }) => colors;
export const createNavigation = (items: NavigationItem[]) => items;
export const createFooterSections = (sections: FooterSection[]) => sections; 