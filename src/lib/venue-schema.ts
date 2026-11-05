import { z } from 'astro/zod';
import { amenities } from './venue-features.ts';
export { amenities } from './venue-features.ts';

const optionalText = z.preprocess(value => value == null ? '' : value, z.string().trim().default(''));
const optionalNumber = z.preprocess(
  value => value === '' || value == null ? undefined : value,
  z.number().int().nonnegative().optional(),
);
const imagePath = z.string().regex(
  /^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:avif|webp|png|jpe?g|svg)$/i,
  'Use an uploaded local image under /images/ with a safe filename.',
);
const optionalImage = z.preprocess(value => value == null ? '' : value, z.union([imagePath, z.literal('')]).default(''));
const optionalUrl = z.preprocess(value => value == null ? '' : value,
  z.union([z.url({ protocol: /^https$/ }), z.literal('')]).default(''));
const list = <T extends z.ZodType>(item: T) => z.preprocess(value => value == null ? [] : value, z.array(item).default([]));

export const ceremonyOptions = ['Symbolic ceremony', 'Religious ceremony', 'Civil ceremony (verify legal eligibility)'] as const;

export const venueSchema = z.object({
  name: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  region: z.string().trim().min(1),
  location: optionalText,
  // Keep the original fields and Markdown body compatible with the first prototype.
  setting: optionalText,
  atmosphere: optionalText,
  fictional: z.boolean().default(true),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  slug: z.preprocess(value => value === '' || value == null ? undefined : value,
    z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.').optional()),
  image: imagePath,
  imageAlt: z.string().trim().min(1),
  imagePlaceholder: z.boolean().default(true),
  gallery: list(z.object({
    image: imagePath,
    alt: z.string().trim().min(1),
    caption: optionalText,
    placeholder: z.boolean().default(true),
  })),
  video: z.preprocess(value => value == null ? {} : value, z.object({
    url: optionalUrl,
    thumbnail: optionalImage,
    thumbnailAlt: optionalText,
    placeholder: z.boolean().default(true),
  }).superRefine((video, ctx) => {
    if (video.thumbnail && !video.thumbnailAlt) ctx.addIssue({ code: 'custom', path: ['thumbnailAlt'], message: 'Describe the thumbnail image.' });
    if (video.thumbnail && !video.url) ctx.addIssue({ code: 'custom', path: ['url'], message: 'Add the video URL or remove its thumbnail.' });
  })),
  externalGalleryUrl: optionalUrl,
  facilities: list(z.string().trim().min(1)),
  amenities: list(z.enum(amenities)),
  guestCapacity: optionalNumber,
  accommodation: z.preprocess(value => value == null ? {} : value, z.object({
    sleeps: optionalNumber,
    bedrooms: optionalNumber,
    details: optionalText,
  })),
  ceremonyOptions: list(z.enum(ceremonyOptions)),
  ceremonyDetails: optionalText,
  keyInformation: list(z.object({ label: z.string().trim().min(1), value: z.string().trim().min(1) })),
  additionalInformation: optionalText,
  specialOffers: list(z.object({ title: z.string().trim().min(1), description: z.string().trim().min(1) })),
  seo: z.preprocess(value => value == null ? {} : value, z.object({ title: optionalText, description: optionalText })),
});
