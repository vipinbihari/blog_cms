import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Replace this with your GitHub username and repository name
  // Format: https://<username>.github.io/<repository-name>
  site: 'https://vipinbihari.github.io/blog_cms',
  // If you plan to deploy to a subfolder, add base with the subfolder path
  // base: '/YOUR_REPOSITORY_NAME',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: { path: './tailwind.config.mjs' },
    }),
    react(),
  ],
  // Content collections are now standard (no longer experimental)
  // Output as static site for GitHub Pages
  output: 'static',
});
