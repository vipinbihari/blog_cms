import type { BlogPost } from '../../types';
import { BLOG_CONFIG } from '../../config/current-config';

/**
 * Generate enhanced Article structured data for Google Discover and rich snippets
 * Implements latest 2025 requirements including 1200px+ images and proper schema
 */
export function generateArticleStructuredData(post: BlogPost, url: string) {
  // Generate multiple image formats for Google Discover (16:9, 4:3, 1:1 aspect ratios)
  const generateImageUrls = (heroImage: string) => {
    const basePath = heroImage.replace(/\.[^.]+$/, '');
    const baseUrl = heroImage.startsWith('http') ? heroImage : `${BLOG_CONFIG.site.url.replace(/\/$/, '')}${heroImage.startsWith('/') ? '' : '/'}${heroImage}`;
    
    return [
      // High-resolution versions for Google Discover (minimum 1200px wide)
      `${basePath}-1600.webp`, // 16:9 aspect ratio (1600x900)
      `${basePath}-1200.webp`, // 4:3 aspect ratio (1200x900) 
      `${basePath}-1200-square.webp`, // 1:1 aspect ratio (1200x1200)
      baseUrl, // Original image as fallback
    ];
  };

  const images = post.data.heroImage 
    ? generateImageUrls(post.data.heroImage)
    : [`https://placehold.co/1600x900/0d9488/ffffff?text=${encodeURIComponent(post.data.title)}`];

  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article', // Article type for Google Discover eligibility
    '@id': url,
    headline: post.data.title,
    alternativeHeadline: post.data.excerpt,
    description: post.data.excerpt,
    
    // High-quality images for Google Discover (minimum 1200px wide)
    image: post.data.heroImage ? [
      `${BLOG_CONFIG.site.url}${post.data.heroImage.replace(/\.(jpg|jpeg|png)$/, '-1350.webp')}`,
      `${BLOG_CONFIG.site.url}${post.data.heroImage.replace(/\.(jpg|jpeg|png)$/, '-750.webp')}`,
      `${BLOG_CONFIG.site.url}${post.data.heroImage.replace(/\.(jpg|jpeg|png)$/, '-350.webp')}`,
    ] : [],
    
    // Enhanced author information
    author: {
      '@type': 'Person',
      name: post.data.author,
      url: `${BLOG_CONFIG.site.url}about/`,
      // Add author image if available in config
      ...(BLOG_CONFIG.branding.logo && {
        image: {
          '@type': 'ImageObject',
          url: `${BLOG_CONFIG.site.url}${BLOG_CONFIG.branding.logo.light}`,
        },
      }),
    },
    
    // Publisher with high-quality logo (required for Google Discover)
    publisher: {
      '@type': 'Organization',
      name: BLOG_CONFIG.site.name,
      url: BLOG_CONFIG.site.url,
      logo: {
        '@type': 'ImageObject',
        url: `${BLOG_CONFIG.site.url}${BLOG_CONFIG.branding.logo.light}`,
        width: 600,
        height: 60,
      },
      // Add social media profiles for E-A-T
      sameAs: BLOG_CONFIG.social?.filter(link => link.url).map(link => link.url) || [],
    },
    
    // Required dates for Google Discover
    datePublished: post.data.date.toISOString(),
    dateModified: post.data.updatedDate?.toISOString() || post.data.date.toISOString(),
    
    // Article specific fields for categorization
    articleSection: post.data.category,
    articleBody: post.body || '',
    keywords: post.data.tags.join(', '),
    wordCount: post.body?.length || 1000,
    
    // Main entity of the page
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
      name: post.data.title,
      description: post.data.excerpt,
    },
    
    // Enhanced properties for rich results
    inLanguage: BLOG_CONFIG.site.language,
    about: {
      '@type': 'Thing',
      name: post.data.category,
      sameAs: `${BLOG_CONFIG.site.url}categories/${post.data.category}/`,
    },
    
    // Interaction statistics (if available)
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ReadAction',
      userInteractionCount: 0, // You can track this dynamically
    },
    
    // Potential action for engagement
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [url],
      },
      {
        '@type': 'ShareAction',
        target: [url],
        agent: {
          '@type': 'Person',
          name: 'Reader',
        },
      },
    ],
  };
  
  return articleData;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{name: string; url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite structured data with SearchAction
 */
export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BLOG_CONFIG.site.url}#website`,
    url: BLOG_CONFIG.site.url,
    name: BLOG_CONFIG.site.name,
    description: BLOG_CONFIG.site.description,
    publisher: {
      '@type': 'Organization',
      name: BLOG_CONFIG.site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BLOG_CONFIG.site.url}${BLOG_CONFIG.branding.logo.light}`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BLOG_CONFIG.site.url}search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate enhanced FAQ structured data from quiz questions
 * Includes detailed answers and proper formatting for rich results
 */
export function generateFAQStructuredData(quiz: Array<{question: string; options: string[]; correctAnswer: number}>) {
  if (!quiz || quiz.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BLOG_CONFIG.site.url}#faq`,
    name: 'Frequently Asked Questions',
    description: 'Test your knowledge with these quiz questions',
    mainEntity: quiz.map((q, index) => ({
      '@type': 'Question',
      '@id': `${BLOG_CONFIG.site.url}#faq-${index + 1}`,
      name: q.question,
      text: q.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `<p><strong>सही उत्तर:</strong> ${q.options[q.correctAnswer]}</p><p><strong>विकल्प:</strong></p><ul>${q.options.map((option, idx) => 
          `<li${idx === q.correctAnswer ? ' style="font-weight: bold; color: green;"' : ''}>${option}</li>`
        ).join('')}</ul>`,
        upvoteCount: 0,
        dateCreated: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: BLOG_CONFIG.site.name,
        },
      },
    })),
    // Additional properties for better context
    publisher: {
      '@type': 'Organization',
      name: BLOG_CONFIG.site.name,
      url: BLOG_CONFIG.site.url,
    },
    inLanguage: BLOG_CONFIG.site.language || 'hi-IN',
  };
}

/**
 * Generate HowTo structured data for tutorial posts
 */
export function generateHowToStructuredData(
  title: string,
  description: string,
  steps: Array<{name: string; text: string}>,
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    totalTime: totalTime || 'PT10M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate Review structured data for product/service reviews
 */
export function generateReviewStructuredData(
  itemName: string,
  itemType: 'Product' | 'Service' | 'Organization',
  rating: number,
  maxRating: number = 5,
  reviewBody: string,
  author: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemType,
      name: itemName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: maxRating,
    },
    reviewBody: reviewBody,
    author: {
      '@type': 'Person',
      name: author,
    },
  };
}

/**
 * Generate Person structured data for author pages
 */
export function generatePersonStructuredData(author: {
  name: string;
  bio?: string;
  image?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    image: author.image,
    sameAs: [
      author.social?.twitter,
      author.social?.linkedin,
      author.social?.github,
    ].filter(Boolean),
  };
}
