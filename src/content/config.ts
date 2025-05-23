import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  extensions: ['.md', '.mdx'],
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    author: z.string(),
    heroImage: z.string(),
    quiz: z.array(
      z.object({
        q: z.string(),
        options: z.array(z.string()),
        answer: z.number()
      })
    ).optional()
  })
});

export const collections = {
  'posts': postsCollection
};
