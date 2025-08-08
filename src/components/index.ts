/**
 * Component Library
 * =================
 * Centralized export for all components organized by domain/functionality.
 */

// Core UI Components
export * from './core';

// ============================================================================
// ORGANIZED COMPONENT EXPORTS
// ============================================================================

// Domain-specific exports from organized barrels
export * from './core';
export * from './navigation';
export * from './content';

// ============================================================================
// ADDITIONAL COMPONENT EXPORTS
// ============================================================================

// Layout Components
export { default as ConfigurableHeader } from './layout/ConfigurableHeader.astro';
export { default as ConfigurableFooter } from './layout/ConfigurableFooter.astro';

// SEO Components
export { default as PWAHead } from './seo/PWAHead.astro';

// Feature Components (remaining)
export { default as PageNavigation } from './features/PageNavigation.astro';

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// Legacy direct exports for components that may be imported by existing code
// Note: These should eventually be replaced with the organized barrel exports
export { default as FormattedDate } from './ui/FormattedDate.astro';
export { default as Logo } from './ui/Logo.astro';
export { default as PostCard } from './ui/PostCard.astro';
export { default as ResponsiveImage } from './ui/ResponsiveImage.astro';
export { default as SearchBar } from './ui/SearchBar.jsx';
export { default as SocialLinks } from './ui/SocialLinks.astro';
export { default as ThemeToggle } from './ui/ThemeToggle.jsx';
export { default as Video } from './ui/Video.astro';

// Navigation components (maintain legacy imports)
export { default as Navigation } from './ui/Navigation.astro';
// Note: Also available as Navigation from './navigation' barrel export
