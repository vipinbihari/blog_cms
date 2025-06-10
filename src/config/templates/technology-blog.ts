/**
 * Technology Blog Template Configuration
 * 
 * Example configuration for a technology/programming blog.
 * Copy this to current-config.ts and customize as needed.
 */

import type { BlogConfig } from '../blog-template';
import { THEME_PRESETS, NICHE_PRESETS } from '../blog-template';

export const TECHNOLOGY_BLOG_CONFIG: BlogConfig = {
  // Site Identity
  site: {
    name: 'TechInsight',
    tagline: 'Programming, Development & Innovation',
    description: 'Latest insights on web development, mobile apps, AI/ML, and emerging technologies.',
    url: 'https://techinsight.dev/',
    author: 'Your Name',
    email: 'contact@techinsight.dev',
    language: 'en',
    locale: 'en_US',
  },
  
  // Branding & Visual Identity
  branding: {
    logo: {
      light: '/images/logo-light.svg',
      dark: '/images/logo-dark.svg',
      alt: 'TechInsight Logo',
      width: 200,
      height: 40,
    },
    favicon: '/favicon.svg',
    ogImage: '/images/og-image.jpg',
    appleTouchIcon: '/images/apple-touch-icon.png',
  },

  layout: {
    postPerPage: 10,
    breadcrumbSeparator: '/',
    comments: false,
    commentsProvider: 'none',
    latestPostsOnHomepage: 6
  },
  footer: {
    sections: [],
    copyright: "© 2025 TechInsight. All rights reserved.",
    showPostsLink: true,
    showTagsLink: true,
    showCategoryLink: true
  },
  categories: ['programming', 'web development', 'ai', 'mobile apps', 'technology'],
  defaultTags: ['javascript', 'typescript', 'astro', 'react', 'webdev'],
  
  // Theme Configuration (Green theme for tech)
  theme: {
    colors: {
      primary: THEME_PRESETS.green.primary,
      secondary: THEME_PRESETS.green.secondary,
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Fira Code', 'Monaco', 'monospace'],
      },
      fontSizes: {
        base: '16px',
        headings: {
          h1: '2.25rem',
          h2: '1.5rem',
          h3: '1.25rem',
          h4: '1.125rem',
        },
      },
    },
    spacing: {
      container: '1280px',
      section: '4rem',
    },
  },
  
  // Navigation Configuration
  navigation: {
    header: [...NICHE_PRESETS.technology.navigation],
    footer: [
      {
        title: 'Development',
        links: [
          { label: 'Web Development', href: '/categories/web-development' },
          { label: 'Mobile Apps', href: '/categories/mobile-apps' },
          { label: 'DevOps', href: '/categories/devops' },
          { label: 'AI/ML', href: '/categories/ai-ml' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Tutorials', href: '/categories/tutorials' },
          { label: 'Tools', href: '/categories/tools' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'GitHub', href: 'https://github.com/yourusername', external: true },
          { label: 'Discord', href: 'https://discord.gg/yourserver', external: true },
          { label: 'Newsletter', href: '/newsletter' },
        ],
      },
    ],
    social: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/techinsight',
        label: 'Follow us on Twitter',
      },
      {
        platform: 'github',
        url: 'https://github.com/techinsight',
        label: 'Check our GitHub',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/company/techinsight',
        label: 'Connect on LinkedIn',
      },
      {
        platform: 'discord',
        url: 'https://discord.gg/techinsight',
        label: 'Join our Discord',
      },
    ],
  },
  
  // Content Configuration
  content: {
    postsPerPage: 12,
    featuredPostsCount: 4,
    relatedPostsCount: 3,
    showReadingTime: true,
    showTableOfContents: true,
    enableComments: true,
    enableNewsletter: true,
  },
  
  // Feature Toggles
  features: {
    darkMode: true,


    sitemap: true,

  },
  
  // SEO Configuration
  seo: {
    defaultTitle: 'TechInsight',
    titleTemplate: '%s | TechInsight',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'TechInsight',
    },
  },
  
  // Social Media Links
  social: [
    {
      platform: 'twitter',
      url: 'https://twitter.com/techinsight',
      label: 'Follow us on Twitter',
    },
    {
      platform: 'github',
      url: 'https://github.com/techinsight',
      label: 'Check our GitHub',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/company/techinsight',
      label: 'Connect on LinkedIn',
    },
  ],
  
  // Legal Pages
  legalPages: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: '2025-01-01',
      sections: [
        {
          title: 'Information Collection',
          content: 'We collect information to provide better services to our users.'
        },
        {
          title: 'Data Usage',
          content: 'We use the collected information to provide, maintain, and improve our services.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: '2025-01-01',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By accessing our services, you agree to be bound by these terms.'
        },
        {
          title: 'User Responsibilities',
          content: 'Users are responsible for maintaining the confidentiality of their account.'
        }
      ]
    },
    disclaimer: {
      title: 'Disclaimer',
      lastUpdated: '2025-01-01',
      sections: [
        {
          title: 'Limitation of Liability',
          content: 'We are not liable for any damages arising from the use of our services.'
        },
        {
          title: 'External Links',
          content: 'Our website may contain links to external sites that are not operated by us.'
        }
      ]
    },
  },
  
  // Contact Page Configuration
  contactPage: {
    title: 'Contact TechInsight',
    description: 'Get in touch with the TechInsight team. We welcome your questions, feedback, and inquiries about our technology insights and development resources.',
    email: {
      name: 'Email Us',
      address: 'contact@techinsight.dev',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
    },
    phone: {
      name: 'Call Us',
      number: '+12025550187',
      formattedNumber: '+1 (202) 555-0187',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>`
    },
    address: {
      name: 'Our Office',
      location: '123 Tech Avenue, San Francisco, CA 94107, USA',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
    },
    businessHours: {
      title: 'Business Hours',
      hours: [
        { days: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
        { days: 'Saturday - Sunday', hours: 'Closed' }
      ]
    },
    faqs: [
      {
        question: 'Do you provide custom development services?',
        answer: 'TechInsight provides general technology insights and educational content. We do not offer custom development services. Our content is for informational and educational purposes only.'
      },
      {
        question: 'How can I contribute to TechInsight?',
        answer: 'We welcome guest contributions from technology experts and experienced developers. Please use the contact form to pitch your article idea, and our editorial team will review it and get back to you.'
      },
      {
        question: 'How often is content updated on TechInsight?',
        answer: 'We publish new articles regularly, with technology news updates typically posted daily. Technical tutorials and in-depth educational content are added on a weekly basis.'
      },
      {
        question: 'What are your business hours?',
        answer: 'Our team is available Monday to Friday, 9:00 AM - 5:00 PM PT. We are closed on weekends.'
      }
    ]
  },
  
  // Niche-specific configuration
  niche: {
    type: 'technology',
    categories: [...NICHE_PRESETS.technology.categories],
    defaultTags: [...NICHE_PRESETS.technology.defaultTags],
  },
}; 