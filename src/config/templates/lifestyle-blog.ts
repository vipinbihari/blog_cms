/**
 * Lifestyle Blog Template Configuration
 * 
 * Example configuration for a lifestyle blog.
 * Copy this to current-config.ts and customize as needed.
 */

import type { BlogConfig } from '../blog-template';
import { THEME_PRESETS, NICHE_PRESETS } from '../blog-template';

const siteName = 'My Lifestyle Blog'; // Placeholder

export const LIFESTYLE_BLOG_CONFIG: BlogConfig = {
  // Site Identity
  site: {
    name: siteName,
    tagline: 'Inspiration for a Beautiful Life',
    description: 'Your daily dose of lifestyle tips, travel, food, and wellness.',
    url: 'https://example-lifestyle.com',
    author: 'Lifestyle Blogger',
    email: 'hello@example-lifestyle.com',
    language: 'en',
    locale: 'en-US',
  },

  // Branding & Visual Identity
  branding: {
    logo: {
      light: '/images/lifestyle-logo-light.svg', // Placeholder
      dark: '/images/lifestyle-logo-dark.svg',   // Placeholder
      alt: `${siteName} Logo`,
      width: 180,
      height: 40,
    },
    favicon: '/favicon-lifestyle.svg', // Placeholder
    ogImage: '/images/og-lifestyle.jpg', // Placeholder
    appleTouchIcon: '/images/apple-touch-icon-lifestyle.png', // Placeholder
  },

  // Theme Configuration (Example: using a preset or custom)
  theme: {
    colors: {
      primary: THEME_PRESETS.blue.primary, // Changed from pink as it's not defined
      secondary: THEME_PRESETS.blue.secondary,
    },
    typography: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
      fontSizes: {
        base: '16px',
        headings: {
          h1: '2.3rem',
          h2: '1.8rem',
          h3: '1.5rem',
          h4: '1.2rem',
        },
      },
    },
    spacing: {
      container: '1180px',
      section: '3.5rem',
    },
  },

  // Layout Configuration
  layout: {
    postPerPage: 9,
    featuredPostsCount: 3,
    relatedPostsCount: 3,
    latestPostsOnHomepage: 5,
    breadcrumbSeparator: '›',
    heroConfig: {
      title: `Welcome to ${siteName}`,
      subtitle: 'Discover inspiration for travel, food, wellness, and more.',
      ctaButton1: { text: 'Latest Posts', url: '/posts/page/1' },
      ctaButton2: { text: 'About Me', url: '/about' },
    }
  },

  // Navigation Configuration
  navigation: {
    header: [...(NICHE_PRESETS.lifestyle?.navigation || [
      { label: 'Home', href: '/' },
      { label: 'Travel', href: '/categories/travel/page/1' },
      { label: 'Food', href: '/categories/food/page/1' },
      { label: 'Wellness', href: '/categories/wellness/page/1' },
      { label: 'About', href: '/about' },
    ])],
    // Ensure the array is mutable by spreading it
    footer: [
      {
        title: 'Explore',
        links: [
          { label: 'Travel Guides', href: '/categories/travel/page/1' },
          { label: 'Recipes', href: '/categories/food/page/1' },
          { label: 'Wellness Tips', href: '/categories/wellness/page/1' },
        ],
      },
      {
        title: 'About',
        links: [
          { label: 'About Me', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sitemap', href: '/sitemap.xml' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`
  },
  
  // Social Media Links (Top Level)
  social: [
    {
      platform: 'instagram',
      url: 'https://instagram.com/YourLifestyleHandle',
      label: 'Follow on Instagram',
    },

    {
      platform: 'facebook',
      url: 'https://facebook.com/YourLifestylePage',
      label: 'Like on Facebook',
    },
  ],

  // Content Categories
  categories: [
    'travel',
    'food',
    'wellness',
    'home-decor',
    'fashion',
    'personal-growth',
  ],

  // Default Tags
  defaultTags: [
    'inspiration',
    'lifestyle blog',
    'daily life',
    'tips',
  ],

  // Niche Configuration
  niche: {
    type: 'lifestyle',
    categories: ['travel', 'food', 'wellness', 'home-decor'],
    defaultTags: ['inspiration', 'tips'],
  },

  // SEO Configuration
  seo: {
    defaultTitle: siteName,
    titleTemplate: `%s | ${siteName}`,
    robotsDirectives: ['index,follow'],
    twitterHandle: '@YourLifestyleHandle',
  },

  // Features Configuration
  features: {
    darkMode: true,
    sitemap: true,
  },

  // About Page Configuration (Placeholder)
  aboutPage: {
    title: `About ${siteName}`,
    description: `Learn more about ${siteName} and my journey.`,
    hero: {
      headline: "Living Life, One Adventure at a Time",
      subheadline: "Join me as I explore the world, share delicious recipes, and find joy in everyday moments.",
      ctaButton: { text: 'Get In Touch', href: '/contact' }
    },
    mission: {
        title: 'My Mission',
        text: 'To inspire and empower you to live your best life, full of joy, adventure, and well-being.',
        imageUrl: '/images/placeholder-mission.jpg',
        imageAlt: 'My Mission'
    }
    // Add other sections like whoWeAre, whatWeOffer, values, team, callToAction as needed
  },

  // Contact Page Configuration (Placeholder)
  contactPage: {
    title: 'Get In Touch',
    description: 'I love hearing from my readers! Reach out with any questions or collaborations.',
    email: {
      name: 'Email',
      address: 'hello@example-lifestyle.com',
    },
    phone: {
        name: 'Phone (Optional)',
        number: '',
        formattedNumber: ''
    },
    address: {
        name: 'Location (Optional)',
        location: ''
    },
    businessHours: {
        title: 'Availability',
        hours: [{days: 'Mon - Fri', hours: '9am - 5pm'}]
    },
    faqs: [
        {question: 'Do you accept guest posts?', answer: 'Not at this time, but thank you for your interest!'}
    ]
  },

  // Legal Pages Configuration (Placeholder)
  legalPages: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: '2025-01-01',
      sections: [
        { title: 'Introduction', content: 'This is our privacy policy...' },
      ],
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: '2025-01-01',
      sections: [
        { title: 'Agreement', content: 'By using this site, you agree to these terms...' },
      ],
    },
    disclaimer: {
        title: 'Disclaimer',
        lastUpdated: '2025-01-01',
        sections: [
            { title: 'General Information', content: 'All content is for informational purposes only...'}
        ]
    }
  },
};