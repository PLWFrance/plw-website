interface VenueRecord {
  id: string;
  data: { slug?: string; published: boolean; featured: boolean; name: string };
}

export function venueSlug(venue: Pick<VenueRecord, 'id'> & { data: { slug?: string } }): string {
  return venue.data.slug || venue.id;
}

export function publishedVenues<T extends VenueRecord>(venues: T[]): T[] {
  const slugs = new Set<string>();
  for (const venue of venues) {
    const slug = venueSlug(venue);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid venue URL slug: ${slug}`);
    if (slugs.has(slug)) throw new Error(`Duplicate venue URL slug: ${slug}`);
    slugs.add(slug);
  }
  return venues.filter(venue => venue.data.published)
    .sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.name.localeCompare(b.data.name, 'en'));
}
