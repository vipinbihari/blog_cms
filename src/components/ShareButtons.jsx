/**
 * ShareButtons component
 * Provides social media sharing functionality for blog posts
 */

import React, { useState } from 'react';

const ShareButtons = ({ title, url, description, tags = [] }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Generate hashtags for Twitter from post tags
  const hashtags = tags.map(tag => tag.replace(/-/g, '')).join(',');
  
  // Social media share URLs
  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  };
  
  // Handle copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Share this article</h3>
      
      <div className="flex flex-wrap gap-2">
        {/* Twitter */}
        <a 
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#1DA1F2] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on Twitter"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        
        {/* Facebook */}
        <a 
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>
        
        {/* LinkedIn */}
        <a 
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        
        {/* Reddit */}
        <a 
          href={socialLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#FF4500] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on Reddit"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-2.5-5.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm5 0c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
            <path d="M12 13.75c-2.068 0-3.75-1.682-3.75-3.75S9.932 6.25 12 6.25s3.75 1.682 3.75 3.75-1.682 3.75-3.75 3.75z" />
          </svg>
        </a>
        
        {/* Copy URL Button */}
        <button 
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full hover:opacity-90 transition-opacity relative"
          aria-label="Copy link"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          
          {/* Copy success indicator */}
          {copySuccess && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Copied!
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
