/**
 * Navigation Components
 * ====================
 * Components related to site navigation, headers, and footers.
 */

// Main navigation component
export { default as Navigation } from './Navigation.astro';

// Re-export navigation-related components from layout
export { default as ConfigurableHeader } from '../layout/ConfigurableHeader.astro';
export { default as ConfigurableFooter } from '../layout/ConfigurableFooter.astro';
