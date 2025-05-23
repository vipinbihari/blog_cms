/**
 * Prebuild script that runs before the main Astro build process.
 * Currently handles:
 * - Generating the search index
 */

import { generateSearchIndex } from './generate-search-index.js';

async function prebuild() {
  try {
    console.log('Running prebuild tasks...');
    
    // Generate search index
    await generateSearchIndex();
    
    console.log('Prebuild tasks completed successfully!');
  } catch (error) {
    console.error('Error during prebuild:', error);
    process.exit(1);
  }
}

prebuild();
