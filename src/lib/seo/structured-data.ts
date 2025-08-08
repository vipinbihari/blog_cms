import type { BlogPost } from '../../types';
import { BLOG_CONFIG } from '../../config/current-config';

/**
 * Generate enhanced Article structured data for Google Discover and rich snippets
 */
export function generateArticleStructuredData(post: BlogPost, url: string) {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article', // More specific than BlogPosting for news/articles
    '@id': url,
    headline: post.data.title,
    alternativeHeadline: post.data.excerpt,
    description: post.data.excerpt,
    
    // Images for Google Discover (requires 1200px wide images)
    image: post.data.heroImage ? [
      post.data.heroImage,
      post.data.heroImage.replace(/\.\w+$/, '-1200.webp'), // High-res version
      post.data.heroImage.replace(/\.\w+$/, '-640.webp'),  // Medium version
    ] : `https://placehold.co/1200x630?text=${encodeURIComponent(post.data.title)}`,
    
    // Author information
    author: {
      '@type': 'Person',
      name: post.data.author,
      url: `${BLOG_CONFIG.site.url}about/`,
    },
    
    // Publisher with logo (required for Google Discover)
    publisher: {
      '@type': 'Organization',
      name: BLOG_CONFIG.site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BLOG_CONFIG.site.url}${BLOG_CONFIG.branding.logo.light}`,
        width: 600,
        height: 60,
      },
    },
    
    // Dates
    datePublished: post.data.date.toISOString(),
    dateModified: post.data.updatedDate?.toISOString() || post.data.date.toISOString(),
    
    // Article specific fields
    articleSection: post.data.category,
    keywords: post.data.tags.join(', '),
    wordCount: post.body?.length || 1000,
    
    // Main entity
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    
    // Additional properties for rich snippets
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'ReadAction',
      target: url,
    },
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
 * Generate FAQ structured data from quiz questions
 */
export function generateFAQStructuredData(quiz: Array<{question: string; options: string[]; correctAnswer: number}>) {
  if (!quiz || quiz.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: quiz.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.options[q.correctAnswer],
      },
    })),
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
