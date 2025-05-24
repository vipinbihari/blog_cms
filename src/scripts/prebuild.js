/**
 * Prebuild script that runs before the main Astro build process.
 * Handles preparation tasks for the build, including image optimization setup.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

async function prebuild() {
  try {
    console.log('Running prebuild tasks...');
    
    // Create public directories if they don't exist to avoid build errors
    ensureDirectoryExists(path.resolve(rootDir, 'public'));
    ensureDirectoryExists(path.resolve(rootDir, 'public/images'));
    
    // Create a .nojekyll file to ensure GitHub Pages doesn't process the site with Jekyll
    createNojekyllFile();

    // Ensure the images directory has proper permissions
    ensureDirectoryExists(path.resolve(rootDir, 'src/assets'));
    ensureDirectoryExists(path.resolve(rootDir, 'src/assets/images'));
    
    // Copy images from public/images/uploads to src/assets/images for optimization
    const uploadsDir = path.resolve(rootDir, 'public/images/uploads');
    if (fs.existsSync(uploadsDir)) {
      console.log('Processing images for optimization...');
      copyImagesToAssets(uploadsDir, path.resolve(rootDir, 'src/assets/images'));
    }
    
    console.log('Prebuild tasks completed successfully!');
  } catch (error) {
    console.error('Error during prebuild:', error);
    process.exit(1);
  }
}

/**
 * Ensures a directory exists, creating it if necessary
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Creates a .nojekyll file to prevent GitHub Pages from using Jekyll
 */
function createNojekyllFile() {
  const nojekyllPath = path.resolve(rootDir, 'public/.nojekyll');
  if (!fs.existsSync(nojekyllPath)) {
    console.log('Creating .nojekyll file for GitHub Pages');
    fs.writeFileSync(nojekyllPath, '');
  }
}

/**
 * Recursively copies images from source directory to the assets directory for optimization
 * @param {string} sourceDir - Source directory containing images
 * @param {string} targetDir - Target directory for images in assets
 */
function copyImagesToAssets(sourceDir, targetDir) {
  try {
    // Get all files in the source directory
    const files = fs.readdirSync(sourceDir, { withFileTypes: true });
    
    // Process each file/directory
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, file.name);
      
      if (file.isDirectory()) {
        // Create the directory in the target location
        ensureDirectoryExists(targetPath);
        // Recursively process subdirectories
        copyImagesToAssets(sourcePath, targetPath);
      } else {
        // Check if it's an image file
        const ext = path.extname(file.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'].includes(ext)) {
          // Create target directory if it doesn't exist
          ensureDirectoryExists(path.dirname(targetPath));
          
          // Copy the file
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`Copied ${sourcePath} to ${targetPath} for optimization`);
        }
      }
    }
  } catch (error) {
    console.error(`Error copying images: ${error.message}`);
  }
}

prebuild();
