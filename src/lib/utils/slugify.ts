/**
 * Creates a URL-safe slug from any string by:
 * - Converting to lowercase
 * - Replacing special characters with hyphens
 * - Removing leading/trailing hyphens
 * - Replacing multiple consecutive hyphens with a single one
 * 
 * @param value - The string to slugify
 * @returns A URL-safe slug string
 * @throws Returns a fallback slug if input is invalid
 * 
 * @example
 * slugifyTag('Technical Analysis')
 * // returns 'technical-analysis'
 * 
 * slugifyTag('Stock Market & Investment!')
 * // returns 'stock-market-investment'
 * 
 * slugifyTag('हिंदी Text with 中文')
 * // returns 'text-with'
 */
export function slugifyTag(value: string): string {
  try {
    // Input validation
    if (!value || typeof value !== 'string') {
      console.warn('slugifyTag: Invalid value provided:', value);
      return 'untitled'; // Fallback slug
    }
    
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      console.warn('slugifyTag: Empty value provided after trimming');
      return 'untitled';
    }
    
    // Perform slugification with enhanced processing
    const slug = trimmedValue
      .toLowerCase()
      .normalize('NFD') // Normalize unicode characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
    
    // Ensure we have a valid slug
    if (!slug || slug.length === 0) {
      console.warn('slugifyTag: Resulted in empty slug for value:', value);
      return 'untitled';
    }
    
    // Limit slug length to prevent excessively long URLs
    const maxLength = 100;
    if (slug.length > maxLength) {
      const truncated = slug.substring(0, maxLength).replace(/-[^-]*$/, '');
      return truncated || 'untitled';
    }
    
    return slug;
  } catch (error) {
    console.error('slugifyTag: Error slugifying value:', error, { value });
    return 'untitled'; // Fallback on error
  }
}
