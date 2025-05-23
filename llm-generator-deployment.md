# LLM Blog Generator - Deployment Guide

This document provides instructions for deploying the AI Blog Generator module separately from the main StockSage blog website. The AI generator is designed to run on a different server with its own environment variables and configuration.

## Overview

The AI Blog Generator module helps content creators produce blog posts for the StockSage platform by leveraging OpenAI's language models. The generator produces content in the exact `.mdx` format required by the main blog platform, complete with proper frontmatter, image prompts, and structured content.

## Files & Structure

The AI generator module consists of the following key files:

- `/src/llm/blogGenerator.ts` - Core logic for OpenAI API integration
- `/src/pages/api/generate-blog.ts` - API endpoint for the generator
- `/src/components/GenerateForm.jsx` - React component for the generator UI
- `/src/pages/generate_with_llm.astro` - Astro page hosting the generator UI

## Deployment Instructions

### Prerequisites

1. Node.js (v16+)
2. npm or yarn
3. OpenAI API key
4. Separate hosting environment (different from main blog)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blog_cms.git llm-generator
   cd llm-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # Make sure to install the OpenAI package
   npm install openai
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Optional: Remove unnecessary blog components**
   Since this is a standalone tool, you can optionally remove components not needed for the generator:
   ```bash
   # This is optional and advanced - only do this if you want a minimal deployment
   # Be careful not to remove dependencies of the generator
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

6. **Deploy to your hosting platform**
   Deploy the built files from the `dist` directory to your chosen hosting platform.
   
   For example, with Netlify:
   ```bash
   netlify deploy --prod
   ```
   
   With Vercel:
   ```bash
   vercel --prod
   ```

## Access Control

Since this tool should only be accessible to authorized content creators, consider implementing one of these access control methods:

1. **Password protection**:
   - Use Netlify password protection or similar service on your hosting platform

2. **Basic authentication**:
   - Implement HTTP Basic Auth using middleware

3. **IP restrictions**:
   - Limit access to specific IP addresses if your team works from fixed locations

## Usage Workflow

1. Content creator accesses the separate AI generator deployment
2. They enter topic description and reference materials
3. The generator produces an `.mdx` file with proper structure
4. The content is manually reviewed and edited as needed
5. The `.mdx` file is added to the main blog's content repository
6. The main blog is rebuilt and deployed with the new content

## Maintenance

- Keep the OpenAI API key secure and rotate it periodically
- Update the system prompt in `blogGenerator.ts` if the blog's requirements change
- Monitor API usage to manage costs
- Regularly update dependencies

## Troubleshooting

- If you encounter CORS issues, ensure your API routes are correctly configured
- For OpenAI API errors, check the API key and request format
- If the generated content doesn't match the blog's format, update the system prompt

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Astro Documentation](https://docs.astro.build/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
