/**
 * ReadingProgress component
 * Displays a progress bar showing how far a user has scrolled through an article
 * Progress reaches 100% when the user reaches the ShareButtons component
 */

import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Function to find the ShareButtons container
    const findShareButtonsContainer = () => {
      // First try to find the specific div that contains the ShareButtons
      // This is more reliable than looking for the component itself
      const shareButtonsContainer = document.querySelector('article div.border-t:has(div[class*="ShareButtons"])');
      if (shareButtonsContainer) return shareButtonsContainer;
      
      // Secondary approach: find by text content or adjacent structure
      const allDivs = document.querySelectorAll('article > div.md\\:w-3\\/4 > article > div.border-t');
      for (const div of allDivs) {
        if (div.textContent.includes('Share') || div.querySelector('[aria-label*="share"]')) {
          return div;
        }
      }
      
      // Last resort: try to find by class name patterns common in ShareButtons implementations
      return document.querySelector('article div[class*="share"], article div[class*="Share"]');
    };
    
    // Initialize progress tracking
    const updateReadingProgress = () => {
      // Get article content element
      const article = document.querySelector('article');
      if (!article) return;
      
      // Get the main content area (the div that contains the actual blog content)
      const contentArea = article.querySelector('.content');
      if (!contentArea) return;
      
      // Find the ShareButtons container
      const shareButtonsContainer = findShareButtonsContainer();
      if (!shareButtonsContainer) {
        // If ShareButtons not found, use default calculation
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const scrollPosition = scrollY - contentArea.offsetTop;
        const totalScrollable = contentArea.scrollHeight - windowHeight;
        const progress = Math.max(0, Math.min(100, (scrollPosition / totalScrollable) * 100));
        setReadingProgress(progress);
        return;
      }
      
      // Get the end point (where ShareButtons start)
      const contentEndPoint = shareButtonsContainer.offsetTop;
      
      // Get the starting point (where content begins)
      const contentStartPoint = contentArea.offsetTop;
      
      // Calculate height of content excluding components after ShareButtons
      const contentHeight = contentEndPoint - contentStartPoint;
      
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // If we've scrolled past the end of content, set progress to 100%
      if (scrollY + windowHeight >= contentEndPoint) {
        setReadingProgress(100);
        return;
      }
      
      // Calculate how far we've scrolled within the content area
      const scrollPosition = Math.max(0, scrollY - contentStartPoint);
      
      // Calculate total scrollable distance (content height minus window height, but not less than 0)
      const totalScrollable = Math.max(0, contentHeight - windowHeight);
      
      // Calculate progress percentage (avoid division by zero)
      const progress = totalScrollable > 0 ? 
        Math.max(0, Math.min(100, (scrollPosition / totalScrollable) * 100)) : 
        scrollY >= contentStartPoint ? 100 : 0;
      
      setReadingProgress(progress);
    };

    // Add scroll event listener with debounce for better performance
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateReadingProgress, 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateReadingProgress); // Also update on resize
    
    // Run on DOM content changes (might help with dynamic content loading)
    const observer = new MutationObserver(updateReadingProgress);
    const article = document.querySelector('article');
    if (article) {
      observer.observe(article, { childList: true, subtree: true });
    }
    
    // Initialize progress
    // Slight delay to ensure DOM is fully rendered
    setTimeout(updateReadingProgress, 100);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateReadingProgress);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-primary-600 dark:bg-primary-400 transition-all duration-100 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
