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
 * Converts a content repository image path to the corresponding public URL path.
 *
 * Resolves various content image path formats to the standardized public URL used in the application. Handles legacy and current path structures, as well as absolute URLs.
 *
 * @param path - The image path from the content repository.
 * @returns The resolved public URL path for the image.
 */
export function resolveContentImagePath(path: string): string {
  // Convert paths like "content/uploads/image-name/file.jpg" to "/images/uploads/image-name/file.jpg"
  if (path.startsWith('content/uploads/')) {
    return path.replace(/^content\/uploads/, '/images/uploads');
  }
  
  // Convert paths like "uploads/image-name/file.jpg" to "/images/uploads/image-name/file.jpg"
  if (path.startsWith('uploads/')) {
    return path.replace(/^uploads/, '/images/uploads');
  }
  
  // For paths already starting with /images/ (including author images), return them as is
  if (path.startsWith('/images/')) {
    return path;
  }
  
  // If path is already a full URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // For any other path without a specific format, assume it's relative to the uploads directory
  // Only happens for legacy content that doesn't follow the current structure
  return `/images/uploads/${path}`;
}


