import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const venues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/venues' }),
  schema: z.object({
    name: z.string(), region: z.string(), summary: z.string(),
    fictional: z.boolean(), image: z.string(), imageAlt: z.string(),
    setting: z.string(), atmosphere: z.string(),
  }),
});
export const collections = { venues };
