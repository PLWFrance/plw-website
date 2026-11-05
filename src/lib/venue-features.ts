import { z } from 'astro/zod';
import source from '../data/venue-features.json' with { type: 'json' };

// Values are persistent content identifiers and also the website's display text.
// Labels/categories may change without rewriting saved venue selections.
export const featureCatalogueSchema = z.object({
  categories: z.array(z.string().trim().min(1)).min(1),
  features: z.array(z.object({
    value: z.string().trim().min(1),
    label: z.string().trim().min(1),
    category: z.string().trim().min(1),
    wordpress: z.object({
      taxonomy: z.string().min(1),
      termId: z.number().int().positive(),
      slug: z.string().min(1),
    }).optional(),
  }).strict()).min(1),
}).strict().superRefine((catalogue, ctx) => {
  if (new Set(catalogue.categories).size !== catalogue.categories.length)
    ctx.addIssue({ code: 'custom', message: 'Duplicate feature category.' });
  const values = new Set<string>();
  const terms = new Set<string>();
  for (const feature of catalogue.features) {
    if (!catalogue.categories.includes(feature.category))
      ctx.addIssue({ code: 'custom', message: `Unknown category: ${feature.category}` });
    if (values.has(feature.value))
      ctx.addIssue({ code: 'custom', message: `Duplicate feature value: ${feature.value}` });
    values.add(feature.value);
    if (feature.wordpress) {
      const key = `${feature.wordpress.taxonomy}:${feature.wordpress.termId}`;
      if (terms.has(key)) ctx.addIssue({ code: 'custom', message: `Duplicate WordPress term: ${key}` });
      terms.add(key);
    }
  }
});

export const featureCatalogue = featureCatalogueSchema.parse(source);
export const amenities = featureCatalogue.features.map(feature => feature.value);
export const featureOptions = featureCatalogue.categories.flatMap(category =>
  featureCatalogue.features.filter(feature => feature.category === category)
    .map(feature => ({ value: feature.value, label: `${category} / ${feature.label}` })),
);
