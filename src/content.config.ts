import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { venueSchema } from './lib/venue-schema';

const venues = defineCollection({
  loader: glob({
    pattern: '**/*.md', base: './src/content/venues',
    // Stable source identity; URL slugs are validated separately, including duplicates.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: venueSchema,
});
export const collections = { venues };
