/**
 * Image Path Resolver
 * ------------------
 * This helper resolves image paths between the separated content repository and the main codebase.
 * 
 * It handles the structure where:
 * - Content lives in a separate repository
 * - Images are fetched from /content/uploads/ during build
 * - Public image paths are served from /images/uploads/
 */

/**
 * Resolves a content image path to the correct public URL
 * 
 * @param path - Path to an image in the content repository 
 * @returns The public URL path for the image
 * @throws Returns a fallback path if input is invalid
 * 
 * @example
 * resolveContentImagePath('content/uploads/stock-analysis/chart.jpg')
 * // returns '/images/uploads/stock-analysis/chart.jpg'
 * 
 * resolveContentImagePath('/images/authors/avatar.jpg')
 * // returns '/images/authors/avatar.jpg'
 */
export function resolveContentImagePath(path: string): string {
  try {
    // Input validation
    if (!path || typeof path !== 'string') {
      console.warn('resolveContentImagePath: Invalid path provided:', path);
      return '/images/placeholder.jpg'; // Fallback image
    }
    
    const trimmedPath = path.trim();
    if (!trimmedPath) {
      console.warn('resolveContentImagePath: Empty path provided');
      return '/images/placeholder.jpg';
    }
    
    // Convert paths like "content/uploads/image-name/file.jpg" to "/images/uploads/image-name/file.jpg"
    if (trimmedPath.startsWith('content/uploads/')) {
      return trimmedPath.replace(/^content\/uploads/, '/images/uploads');
    }
    
    // Convert paths like "uploads/image-name/file.jpg" to "/images/uploads/image-name/file.jpg"
    if (trimmedPath.startsWith('uploads/')) {
      return trimmedPath.replace(/^uploads/, '/images/uploads');
    }
    
    // For paths already starting with /images/ (including author images), return them as is
    if (trimmedPath.startsWith('/images/')) {
      return trimmedPath;
    }
    
    // If path is already a full URL, return as is
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
      return trimmedPath;
    }
    
    // For any other path without a specific format, assume it's relative to the uploads directory
    // Only happens for legacy content that doesn't follow the current structure
    const sanitizedPath = trimmedPath.replace(/^\/+/, ''); // Remove leading slashes
    return `/images/uploads/${sanitizedPath}`;
  } catch (error) {
    console.error('resolveContentImagePath: Error resolving path:', error, { path });
    return '/images/placeholder.jpg'; // Fallback on error
  }
}

/**
 * Resolves the optimized image path given a source path and target width
 * 
 * @param src - Source path of the image
 * @param width - Target width of the optimized image in pixels
 * @returns The optimized image path with WebP format
 * @throws Returns a fallback path if input is invalid
 * 
 * @example
 * getOptimizedImagePath('/images/uploads/chart.jpg', 640)
 * // returns '/images/optimized/uploads/chart-640.webp'
 * 
 * getOptimizedImagePath('authors/avatar.png', 320)
 * // returns '/images/optimized/authors/avatar-320.webp'
 */
export function getOptimizedImagePath(src: string, width: number): string {
  try {
    // Input validation
    if (!src || typeof src !== 'string') {
      console.warn('getOptimizedImagePath: Invalid src provided:', src);
      return '/images/placeholder-320.webp'; // Fallback
    }
    
    if (!width || typeof width !== 'number' || width <= 0) {
      console.warn('getOptimizedImagePath: Invalid width provided:', width);
      width = 640; // Default fallback width
    }
    
    const trimmedSrc = src.trim();
    if (!trimmedSrc) {
      console.warn('getOptimizedImagePath: Empty src provided');
      return '/images/placeholder-320.webp';
    }
    
    // If the src is already optimized, return as is
    if (trimmedSrc.includes('/images/optimized/')) {
      return trimmedSrc;
    }
    
    // Remove leading slash if present
    let cleanSrc = trimmedSrc.startsWith('/') ? trimmedSrc.slice(1) : trimmedSrc;
    
    // Remove leading 'images/' if present to avoid double /images/
    if (cleanSrc.startsWith('images/')) {
      cleanSrc = cleanSrc.slice('images/'.length);
    }
    
    // Validate that we have a clean source path
    if (!cleanSrc) {
      console.warn('getOptimizedImagePath: No valid path after cleaning:', src);
      return '/images/placeholder-320.webp';
    }
    
    // Remove file extension and build optimized path
    // cleanSrc should be e.g. 'authors/vipin-bihari.webp' or 'uploads/foo.jpg'
    const pathWithoutExt = cleanSrc.replace(/\.[^.]+$/, '');
    
    // Ensure width is a valid integer
    const validWidth = Math.max(1, Math.floor(width));
    
    return `/images/optimized/${pathWithoutExt}-${validWidth}.webp`;
  } catch (error) {
    console.error('getOptimizedImagePath: Error generating optimized path:', error, { src, width });
    return '/images/placeholder-320.webp'; // Fallback on error
  }
}
