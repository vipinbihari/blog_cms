/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format a date for display
 * @param date - Date to format
 * @param formatStyle - Optional format style (default: 'long')
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatStyle: 'long' | 'medium' | 'short' = 'long'): string {
  // Using native Intl.DateTimeFormat for localized date formatting
  const options: Intl.DateTimeFormatOptions = 
    formatStyle === 'long' 
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : formatStyle === 'medium'
      ? { year: 'numeric', month: 'short', day: 'numeric' }
      : { year: 'numeric', month: '2-digit', day: '2-digit' };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Get relative time (e.g., "2 days ago")
 * @param date - Date to format
 * @param baseDate - Date to compare against (default: current date)
 * @returns Relative time string
 */
export function getRelativeTime(date: Date, baseDate: Date = new Date()): string {
  const diffInMilliseconds = baseDate.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  if (diffInYears > 0) {
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  } else {
    return 'just now';
  }
}

/**
 * Create a machine-readable ISO date string for structured data
 * @param date - Date to format
 * @returns ISO date string
 */
export function getISODate(date: Date): string {
  return date.toISOString();
}

/**
 * Get year and month for archive URLs
 * @param date - Date to format
 * @returns Object with year and month strings
 */
export function getYearMonth(date: Date): { year: string; month: string } {
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0')
  };
}
